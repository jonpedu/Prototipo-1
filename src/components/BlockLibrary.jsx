import React, { useState } from 'react';
import { blockCategories } from '../utils/blockDefinitions';
import { ChevronDown, ChevronRight } from 'lucide-react';

const BlockLibrary = ({ onBlockDragStart }) => {
    const [expandedCategories, setExpandedCategories] = useState(
        Object.keys(blockCategories).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    const toggleCategory = (categoryKey) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryKey]: !prev[categoryKey]
        }));
    };

    const handleDragStart = (event, blockId, categoryKey) => {
        event.dataTransfer.setData('blockId', blockId);
        event.dataTransfer.setData('categoryKey', categoryKey);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="w-80 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 overflow-y-auto shadow-2xl">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <span>🛰️</span>
                    <span>Biblioteca de Blocos</span>
                </h2>
                <p className="text-sm text-gray-400">
                    Arraste os blocos para a área de missão
                </p>
            </div>

            <div className="space-y-3">
                {Object.entries(blockCategories).map(([categoryKey, category]) => (
                    <div key={categoryKey} className="border border-gray-700 rounded-lg overflow-hidden">
                        {/* Cabeçalho da categoria */}
                        <button
                            onClick={() => toggleCategory(categoryKey)}
                            className="w-full px-4 py-3 flex items-center justify-between bg-gray-800 hover:bg-gray-750 transition-colors"
                            style={{
                                borderLeft: `4px solid ${category.color}`
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{category.icon}</span>
                                <span className="font-semibold">{category.name}</span>
                                <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                                    {category.blocks.length}
                                </span>
                            </div>
                            {expandedCategories[categoryKey] ? (
                                <ChevronDown size={20} />
                            ) : (
                                <ChevronRight size={20} />
                            )}
                        </button>

                        {/* Lista de blocos */}
                        {expandedCategories[categoryKey] && (
                            <div className="p-2 space-y-2 bg-gray-850">
                                {category.blocks.map((block) => (
                                    <div
                                        key={block.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, block.id, categoryKey)}
                                        className="cursor-move p-3 rounded-lg border-2 border-gray-700 hover:border-cyan-400 bg-gray-800 hover:bg-gray-750 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/30"
                                        style={{
                                            background: `linear-gradient(135deg, ${block.color}20 0%, transparent 100%)`
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{block.icon}</span>
                                            <div className="flex-1">
                                                <div className="font-medium text-sm">{block.label}</div>
                                                <div className="text-xs text-gray-400">
                                                    {block.inputs} entrada(s) • {block.outputs} saída(s)
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pré-visualização de propriedades */}
                                        {Object.keys(block.properties || {}).length > 0 && (
                                            <div className="mt-2 pt-2 border-t border-gray-700">
                                                <div className="text-xs text-gray-500">
                                                    Configurável: {Object.keys(block.properties).join(', ')}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Dicas */}
            <div className="mt-6 p-4 bg-cyan-900/30 border border-cyan-700 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span>💡</span>
                    <span>Dica</span>
                </h3>
                <p className="text-xs text-gray-300">
                    Arraste blocos para a área central, conecte-os e configure suas propriedades
                    clicando neles. O código Python será gerado automaticamente!
                </p>
            </div>
        </div>
    );
};

export default BlockLibrary;
