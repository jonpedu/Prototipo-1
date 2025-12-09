import React, { useState } from 'react';
import { Save, FolderOpen, Trash2, Upload, Wifi, WifiOff, Cpu } from 'lucide-react';
import useStore from '../store/useStore';
import { flowToXML, loadXMLFile, downloadXML } from '../utils/xmlUtils';
import { connectSerial, disconnectSerial, uploadCode } from '../utils/serialConnection';

const Toolbar = () => {
    const {
        nodes,
        edges,
        clearWorkspace,
        setNodes,
        setEdges,
        generatedCode,
        isConnected,
        setIsConnected,
        setSerialPort,
        addSerialLog,
        selectedBoard,
        setSelectedBoard
    } = useStore();

    const [isConnecting, setIsConnecting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleConnect = async () => {
        if (isConnected) {
            await disconnectSerial();
            setIsConnected(false);
            setSerialPort(null);
            addSerialLog('Desconectado do dispositivo');
        } else {
            setIsConnecting(true);
            try {
                const port = await connectSerial();
                setSerialPort(port);
                setIsConnected(true);
                addSerialLog('Conectado ao ESP32 com sucesso!');
            } catch (error) {
                addSerialLog(`Erro: ${error.message}`);
                alert('Erro ao conectar: ' + error.message);
            } finally {
                setIsConnecting(false);
            }
        }
    };

    const handleUpload = async () => {
        if (!isConnected) {
            alert('Conecte-se ao dispositivo primeiro!');
            return;
        }

        if (!generatedCode) {
            alert('Gere o código primeiro usando o botão "Gerar Código"');
            return;
        }

        setIsUploading(true);
        try {
            await uploadCode(generatedCode);
            addSerialLog('Código carregado com sucesso!');
            alert('Código carregado no ESP32!');
        } catch (error) {
            addSerialLog(`Erro no upload: ${error.message}`);
            alert('Erro ao carregar código: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSaveProject = () => {
        try {
            const xmlString = flowToXML(nodes, edges);
            downloadXML(xmlString, `cansat_mission_${Date.now()}.xml`);
        } catch (error) {
            alert('Erro ao salvar projeto: ' + error.message);
        }
    };

    const handleLoadProject = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const { nodes: loadedNodes, edges: loadedEdges } = await loadXMLFile(file);
            setNodes(loadedNodes);
            setEdges(loadedEdges);
            alert('Projeto carregado com sucesso!');
        } catch (error) {
            alert('Erro ao carregar projeto: ' + error.message);
        }
    };

    const handleClearWorkspace = () => {
        if (confirm('Deseja realmente limpar toda a área de missão? Esta ação não pode ser desfeita.')) {
            clearWorkspace();
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 px-6 py-3 flex items-center justify-between shadow-lg">
            {/* Logo e Título */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
                    🛰️
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg">CanSat Programmer</h1>
                    <p className="text-xs text-gray-400">PION Educational Kit</p>
                </div>
            </div>

            {/* Board Selector e Status de Conexão */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Cpu size={18} className="text-gray-400" />
                    <select
                        value={selectedBoard}
                        onChange={(e) => setSelectedBoard(e.target.value)}
                        className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none text-sm"
                    >
                        <option value="ESP32">ESP32</option>
                        <option value="ESP32-S2">ESP32-S2</option>
                        <option value="ESP32-C3">ESP32-C3</option>
                    </select>
                </div>

                {/* Status de Conexão */}
                <div className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                    <span className="text-gray-300">
                        {isConnected ? 'Conectado' : 'Desconectado'}
                    </span>
                </div>
            </div>

            {/* Estatísticas */}
            <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300">{nodes.length} Blocos</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">{edges.length} Conexões</span>
                </div>
            </div>

            {/* Ações */}
            <div className="flex items-center gap-2">
                {/* Conectar/Desconectar */}
                <button
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className={`flex items-center gap-2 px-4 py-2 ${isConnected
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-green-600 hover:bg-green-700'
                        } text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isConnected ? <WifiOff size={18} /> : <Wifi size={18} />}
                    <span>{isConnecting ? 'Conectando...' : (isConnected ? 'Desconectar' : 'Conectar')}</span>
                </button>

                {/* Upload para ESP32 */}
                <button
                    onClick={handleUpload}
                    disabled={!isConnected || isUploading || nodes.length === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Upload size={18} />
                    <span>{isUploading ? 'Carregando...' : 'Upload'}</span>
                </button>

                {/* Abrir XML */}
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors cursor-pointer">
                    <FolderOpen size={18} />
                    <span>Abrir</span>
                    <input
                        type="file"
                        accept=".xml"
                        onChange={handleLoadProject}
                        className="hidden"
                    />
                </label>

                {/* Salvar XML */}
                <button
                    onClick={handleSaveProject}
                    disabled={nodes.length === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save size={18} />
                    <span>Salvar</span>
                </button>

                {/* Limpar */}
                <button
                    onClick={handleClearWorkspace}
                    disabled={nodes.length === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Trash2 size={18} />
                    <span>Limpar</span>
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
