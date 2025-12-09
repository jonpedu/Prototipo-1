import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import useStore from '../store/useStore';
import { blockCategories } from '../utils/blockDefinitions';

const PropertiesPanel = () => {
    const { selectedNode, updateNodeProperties, deleteNode } = useStore();

    if (!selectedNode) {
        return (
            <div className="w-80 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex items-center justify-center">
                <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">⚙️</div>
                    <p className="text-sm">Selecione um bloco para configurar suas propriedades</p>
                </div>
            </div>
        );
    }

    const category = blockCategories[selectedNode.data.categoryKey];
    const block = category?.blocks.find(b => b.id === selectedNode.data.blockId);

    if (!block) return null;

    const handlePropertyChange = (propertyKey, value) => {
        updateNodeProperties(selectedNode.id, {
            [propertyKey]: value
        });
    };

    const handleDelete = () => {
        if (confirm('Deseja realmente deletar este bloco?')) {
            deleteNode(selectedNode.id);
        }
    };

    return (
        <div className="w-80 bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto shadow-2xl">
            {/* Cabeçalho */}
            <div
                className="p-4 border-b border-gray-700"
                style={{
                    background: `linear-gradient(135deg, ${block.color}40 0%, transparent 100%)`
                }}
            >
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-3xl">{block.icon}</span>
                        <div>
                            <h3 className="font-bold text-lg">{block.label}</h3>
                            <p className="text-xs text-gray-400 capitalize">{block.type}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleDelete}
                        className="p-1 hover:bg-red-500/20 rounded transition-colors"
                        title="Deletar bloco"
                    >
                        <X size={20} className="text-red-400" />
                    </button>
                </div>
            </div>

            {/* Propriedades */}
            <div className="p-4">
                <h4 className="font-semibold mb-4 text-cyan-400">Configurações</h4>

                {Object.entries(block.properties || {}).map(([key, property]) => (
                    <div key={key} className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            {property.label}
                        </label>

                        {property.type === 'select' && (
                            <select
                                value={selectedNode.data.properties[key] || property.default}
                                onChange={(e) => handlePropertyChange(key, e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                            >
                                {property.options.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        )}

                        {property.type === 'number' && (
                            <input
                                type="number"
                                min={property.min}
                                max={property.max}
                                step={property.step || 1}
                                value={selectedNode.data.properties[key] || property.default}
                                onChange={(e) => handlePropertyChange(key, parseFloat(e.target.value))}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                            />
                        )}

                        {property.type === 'text' && (
                            <input
                                type="text"
                                value={selectedNode.data.properties[key] || property.default}
                                onChange={(e) => handlePropertyChange(key, e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                            />
                        )}

                        {property.min !== undefined && property.max !== undefined && (
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>Min: {property.min}</span>
                                <span>Max: {property.max}</span>
                            </div>
                        )}
                    </div>
                ))}

                {/* Informações adicionais */}
                <div className="mt-6 pt-4 border-t border-gray-700">
                    <h4 className="font-semibold mb-3 text-cyan-400">Informações</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Entradas:</span>
                            <span className="font-medium">{block.inputs}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Saídas:</span>
                            <span className="font-medium">{block.outputs}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">ID do Nó:</span>
                            <span className="font-mono text-xs text-gray-500">
                                {selectedNode.id.substring(0, 12)}...
                            </span>
                        </div>
                    </div>
                </div>

                {/* Pré-visualização do código */}
                <div className="mt-6 pt-4 border-t border-gray-700">
                    <h4 className="font-semibold mb-3 text-cyan-400">Pré-visualização do Código</h4>
                    <div className="bg-gray-950 rounded-lg p-3 overflow-x-auto">
                        <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
                            {typeof block.code === 'function'
                                ? block.code(selectedNode.data.properties)
                                : block.code}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertiesPanel;
