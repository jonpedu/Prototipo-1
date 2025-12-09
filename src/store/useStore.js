import { create } from 'zustand';
import { blockCategories, generateId, getDefaultProperties } from '../utils/blockDefinitions';

const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    selectedNode: null,
    generatedCode: '',
    serialPort: null,
    isConnected: false,
    serialLogs: [],
    selectedBoard: 'ESP32',
    simulationState: {
        isRunning: false,
        currentNode: null,
        logs: []
    },

    // Adicionar novo nó
    addNode: (blockId, categoryKey, position) => {
        const category = blockCategories[categoryKey];
        const block = category.blocks.find(b => b.id === blockId);

        if (!block) return;

        const newNode = {
            id: generateId(),
            type: 'customNode',
            position,
            data: {
                label: block.label,
                icon: block.icon,
                color: block.color,
                blockType: block.type,
                blockId: block.id,
                categoryKey,
                properties: getDefaultProperties(block),
                inputs: block.inputs,
                outputs: block.outputs
            }
        };

        set({ nodes: [...get().nodes, newNode] });
    },

    // Atualizar nós
    setNodes: (nodes) => set({ nodes }),

    // Atualizar edges
    setEdges: (edges) => set({ edges }),

    // Selecionar nó
    selectNode: (nodeId) => {
        const node = get().nodes.find(n => n.id === nodeId);
        set({ selectedNode: node });
    },

    // Atualizar propriedades do nó
    updateNodeProperties: (nodeId, properties) => {
        const nodes = get().nodes.map(node => {
            if (node.id === nodeId) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        properties: { ...node.data.properties, ...properties }
                    }
                };
            }
            return node;
        });
        set({ nodes });

        // Atualizar também o nó selecionado
        const selectedNode = get().selectedNode;
        if (selectedNode && selectedNode.id === nodeId) {
            set({ selectedNode: nodes.find(n => n.id === nodeId) });
        }
    },

    // Deletar nó
    deleteNode: (nodeId) => {
        set({
            nodes: get().nodes.filter(n => n.id !== nodeId),
            edges: get().edges.filter(e => e.source !== nodeId && e.target !== nodeId),
            selectedNode: get().selectedNode?.id === nodeId ? null : get().selectedNode
        });
    },

    // Gerar código Python
    generateCode: () => {
        const { nodes, edges } = get();

        // Ordenar nós topologicamente baseado nas conexões
        const sortedNodes = topologicalSort(nodes, edges);

        let code = `# Código gerado automaticamente para Nanossatélite
# Gerado em: ${new Date().toLocaleString('pt-BR')}

import time
from satellite_libs import *

def main():
    print("=== Iniciando Missão do Nanossatélite ===")
    
`;

        sortedNodes.forEach((node, index) => {
            const category = blockCategories[node.data.categoryKey];
            const block = category.blocks.find(b => b.id === node.data.blockId);

            if (block && block.code) {
                const generatedCode = typeof block.code === 'function'
                    ? block.code(node.data.properties)
                    : block.code;

                code += `    # Bloco ${index + 1}: ${node.data.label}\n`;
                code += generatedCode.split('\n').map(line => '    ' + line).join('\n');
                code += '\n\n';
            }
        });

        code += `    print("=== Missão Concluída ===")

if __name__ == "__main__":
    main()
`;

        set({ generatedCode: code });
        return code;
    },

    // Limpar workspace
    clearWorkspace: () => {
        set({
            nodes: [],
            edges: [],
            selectedNode: null,
            generatedCode: '',
            simulationState: {
                isRunning: false,
                currentNode: null,
                logs: []
            }
        });
    },

    // Simulação
    startSimulation: () => {
        set({
            simulationState: {
                isRunning: true,
                currentNode: null,
                logs: ['🚀 Simulação iniciada...']
            }
        });
    },

    stopSimulation: () => {
        set(state => ({
            simulationState: {
                ...state.simulationState,
                isRunning: false,
                currentNode: null
            }
        }));
    },

    addSimulationLog: (log) => {
        set(state => ({
            simulationState: {
                ...state.simulationState,
                logs: [...state.simulationState.logs, log]
            }
        }));
    },

    // Gerenciamento de conexão serial
    setSerialPort: (port) => set({ serialPort: port }),

    setIsConnected: (connected) => set({ isConnected: connected }),

    addSerialLog: (log) => {
        set(state => ({
            serialLogs: [...state.serialLogs, { timestamp: new Date().toISOString(), message: log }]
        }));
    },

    clearSerialLogs: () => set({ serialLogs: [] }),

    setSelectedBoard: (board) => set({ selectedBoard: board })
}));

// Função auxiliar para ordenação topológica
function topologicalSort(nodes, edges) {
    // Criar mapa de adjacências
    const graph = new Map();
    const inDegree = new Map();

    nodes.forEach(node => {
        graph.set(node.id, []);
        inDegree.set(node.id, 0);
    });

    edges.forEach(edge => {
        graph.get(edge.source).push(edge.target);
        inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
    });

    // Fila com nós sem dependências
    const queue = nodes.filter(node => inDegree.get(node.id) === 0);
    const sorted = [];

    while (queue.length > 0) {
        const node = queue.shift();
        sorted.push(node);

        const neighbors = graph.get(node.id) || [];
        neighbors.forEach(neighborId => {
            inDegree.set(neighborId, inDegree.get(neighborId) - 1);
            if (inDegree.get(neighborId) === 0) {
                const neighborNode = nodes.find(n => n.id === neighborId);
                if (neighborNode) queue.push(neighborNode);
            }
        });
    }

    return sorted;
}

export default useStore;
