import React, { useCallback, useRef } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    addEdge,
    useNodesState,
    useEdgesState,
    Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import useStore from '../store/useStore';

const nodeTypes = {
    customNode: CustomNode
};

const FlowCanvas = () => {
    const reactFlowWrapper = useRef(null);
    const {
        nodes,
        edges,
        setNodes: setStoreNodes,
        setEdges: setStoreEdges,
        addNode,
        selectNode
    } = useStore();

    const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes);
    const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);

    // Sincronizar nodes do React Flow com a store
    React.useEffect(() => {
        setRfNodes(nodes);
    }, [nodes, setRfNodes]);

    // Sincronizar edges do React Flow com a store
    React.useEffect(() => {
        setRfEdges(edges);
    }, [edges, setRfEdges]);

    // Atualizar store quando nodes mudarem
    React.useEffect(() => {
        setStoreNodes(rfNodes);
    }, [rfNodes, setStoreNodes]);

    // Atualizar store quando edges mudarem
    React.useEffect(() => {
        setStoreEdges(rfEdges);
    }, [rfEdges, setStoreEdges]);

    const onConnect = useCallback(
        (params) => {
            const newEdge = {
                ...params,
                animated: true,
                style: { stroke: '#06b6d4', strokeWidth: 2 }
            };
            setRfEdges((eds) => addEdge(newEdge, eds));
        },
        [setRfEdges]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const blockId = event.dataTransfer.getData('blockId');
            const categoryKey = event.dataTransfer.getData('categoryKey');

            if (!blockId || !categoryKey) return;

            const position = {
                x: event.clientX - reactFlowBounds.left - 100,
                y: event.clientY - reactFlowBounds.top - 50,
            };

            addNode(blockId, categoryKey, position);
        },
        [addNode]
    );

    const onNodeClick = useCallback((event, node) => {
        selectNode(node.id);
    }, [selectNode]);

    const onPaneClick = useCallback(() => {
        selectNode(null);
    }, [selectNode]);

    return (
        <div ref={reactFlowWrapper} className="flex-1 h-full">
            <ReactFlow
                nodes={rfNodes}
                edges={rfEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-left"
            >
                <Background
                    color="#1e3a8a"
                    gap={20}
                    size={1}
                    style={{ backgroundColor: '#0a0e27' }}
                />
                <Controls
                    className="bg-gray-800 border border-gray-700"
                />
                <MiniMap
                    nodeColor={(node) => node.data.color}
                    className="bg-gray-800 border border-gray-700"
                    maskColor="rgba(10, 14, 39, 0.8)"
                />

                <Panel position="top-center" className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 px-6 py-3 rounded-lg border border-cyan-700 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🛰️</span>
                        <div>
                            <h1 className="text-white font-bold text-lg">Área de Missão do Nanossatélite</h1>
                            <p className="text-cyan-300 text-xs">Arraste e conecte blocos para programar sua missão</p>
                        </div>
                    </div>
                </Panel>

                {rfNodes.length === 0 && (
                    <Panel position="center" className="pointer-events-none">
                        <div className="text-center text-white/50 max-w-md">
                            <div className="text-6xl mb-4">🌌</div>
                            <h2 className="text-2xl font-bold mb-2">Área de Missão Vazia</h2>
                            <p className="text-sm">
                                Arraste blocos da biblioteca à esquerda para começar a programar sua missão espacial!
                            </p>
                        </div>
                    </Panel>
                )}
            </ReactFlow>
        </div>
    );
};

export default FlowCanvas;
