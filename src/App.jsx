import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import Toolbar from './components/Toolbar';
import BlockLibrary from './components/BlockLibrary';
import FlowCanvas from './components/FlowCanvas';
import PropertiesPanel from './components/PropertiesPanel';
import CodeViewer from './components/CodeViewer';
import SimulationViewer from './components/SimulationViewer';

function App() {
    return (
        <ReactFlowProvider>
            <div className="h-screen w-screen flex flex-col overflow-hidden">
                {/* Toolbar */}
                <Toolbar />

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Block Library - Left Panel */}
                    <BlockLibrary />

                    {/* Flow Canvas - Center */}
                    <FlowCanvas />

                    {/* Properties Panel - Right Panel */}
                    <PropertiesPanel />
                </div>

                {/* Code Viewer Modal */}
                <CodeViewer />

                {/* Simulation Console */}
                <SimulationViewer />

                {/* Background Stars Effect */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 opacity-30">
                        {[...Array(50)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${2 + Math.random() * 3}s`
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </ReactFlowProvider>
    );
}

export default App;
