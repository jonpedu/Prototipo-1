import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data, selected }) => {
    return (
        <div
            className={`px-4 py-3 rounded-lg border-2 min-w-[180px] transition-all duration-200 ${selected ? 'border-cyan-400 shadow-lg shadow-cyan-400/50' : 'border-gray-300'
                }`}
            style={{
                backgroundColor: `${data.color}15`,
                borderColor: selected ? '#06b6d4' : data.color
            }}
        >
            {/* Handle de entrada */}
            {data.inputs > 0 && (
                <Handle
                    type="target"
                    position={Position.Left}
                    className="w-3 h-3 !bg-cyan-400 border-2 border-white"
                />
            )}

            {/* Conteúdo do nó */}
            <div className="flex items-center gap-2">
                <span className="text-2xl">{data.icon}</span>
                <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-800">{data.label}</div>
                    <div className="text-xs text-gray-500 capitalize">{data.blockType}</div>
                </div>
            </div>

            {/* Indicador de propriedades configuradas */}
            {Object.keys(data.properties || {}).length > 0 && (
                <div className="mt-2 text-xs text-gray-600 bg-white/50 rounded px-2 py-1">
                    {Object.keys(data.properties).length} propriedade(s)
                </div>
            )}

            {/* Handle de saída */}
            {data.outputs > 0 && (
                <Handle
                    type="source"
                    position={Position.Right}
                    className="w-3 h-3 !bg-cyan-400 border-2 border-white"
                />
            )}

            {/* Handle adicional para blocos com múltiplas saídas (ex: if/else) */}
            {data.outputs > 1 && (
                <Handle
                    type="source"
                    position={Position.Right}
                    id="output-2"
                    className="w-3 h-3 !bg-purple-400 border-2 border-white"
                    style={{ top: '70%' }}
                />
            )}
        </div>
    );
};

export default memo(CustomNode);
