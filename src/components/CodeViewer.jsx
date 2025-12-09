import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Download, Play, Copy, Code, FileCode } from 'lucide-react';
import useStore from '../store/useStore';
import axios from 'axios';

const CodeViewer = () => {
    const { generatedCode, generateCode, nodes, startSimulation, simulationState } = useStore();
    const [isVisible, setIsVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerateCode = () => {
        generateCode();
        setIsVisible(true);
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadCode = () => {
        const blob = new Blob([generatedCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `satellite_mission_${Date.now()}.py`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleRunSimulation = async () => {
        if (nodes.length === 0) {
            alert('Adicione blocos à área de missão antes de executar a simulação!');
            return;
        }

        const code = generateCode();
        startSimulation();

        try {
            const response = await axios.post('/api/execute', { code });
            console.log('Simulation result:', response.data);
            alert('✅ Simulação executada com sucesso!\n\n' + response.data.output);
        } catch (error) {
            console.error('Error running simulation:', error);

            // Modo demonstração se o backend não estiver disponível
            alert('⚠️ Backend não disponível.\n\n' +
                'O código foi gerado com sucesso, mas para executá-lo você precisa:\n' +
                '1. Instalar Python (veja PYTHON_SETUP.md)\n' +
                '2. Executar: python server/app.py\n\n' +
                'Por enquanto, você pode copiar ou baixar o código gerado!');
        }
    };

    if (!isVisible) {
        return (
            <div className="fixed bottom-6 right-6 flex gap-3 z-10">
                <button
                    onClick={handleGenerateCode}
                    disabled={nodes.length === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                    <Code size={20} />
                    <span className="font-semibold">Gerar Código Python</span>
                </button>

                <button
                    onClick={handleRunSimulation}
                    disabled={nodes.length === 0 || simulationState.isRunning}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                    <Play size={20} />
                    <span className="font-semibold">
                        {simulationState.isRunning ? 'Simulando...' : 'Executar Simulação'}
                    </span>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-gray-900 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col border border-cyan-700">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-cyan-900/50 to-purple-900/50">
                    <div className="flex items-center gap-3">
                        <FileCode size={24} className="text-cyan-400" />
                        <div>
                            <h2 className="text-xl font-bold text-white">Código Python Gerado</h2>
                            <p className="text-sm text-gray-400">Missão do Nanossatélite</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                        Fechar
                    </button>
                </div>

                {/* Code Content */}
                <div className="flex-1 overflow-auto p-4">
                    {generatedCode ? (
                        <SyntaxHighlighter
                            language="python"
                            style={vscDarkPlus}
                            customStyle={{
                                margin: 0,
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                            showLineNumbers
                        >
                            {generatedCode}
                        </SyntaxHighlighter>
                    ) : (
                        <div className="text-center text-gray-500 py-12">
                            <Code size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Nenhum código gerado ainda</p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between p-4 border-t border-gray-700 bg-gray-800">
                    <div className="text-sm text-gray-400">
                        {nodes.length} bloco(s) na missão
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleCopyCode}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                        >
                            <Copy size={18} />
                            {copied ? 'Copiado!' : 'Copiar'}
                        </button>
                        <button
                            onClick={handleDownloadCode}
                            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                        >
                            <Download size={18} />
                            Download
                        </button>
                        <button
                            onClick={handleRunSimulation}
                            disabled={simulationState.isRunning}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                            <Play size={18} />
                            {simulationState.isRunning ? 'Executando...' : 'Executar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeViewer;
