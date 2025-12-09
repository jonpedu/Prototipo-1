import React, { useEffect, useRef } from 'react';
import useStore from '../store/useStore';
import { Terminal, AlertCircle, CheckCircle, Info } from 'lucide-react';

const SimulationViewer = () => {
    const { simulationState } = useStore();
    const logsEndRef = useRef(null);

    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [simulationState.logs]);

    if (!simulationState.isRunning && simulationState.logs.length === 0) {
        return null;
    }

    const getLogIcon = (log) => {
        if (log.includes('❌') || log.includes('ERRO')) return <AlertCircle size={16} className="text-red-400" />;
        if (log.includes('✅') || log.includes('Concluída')) return <CheckCircle size={16} className="text-green-400" />;
        return <Info size={16} className="text-cyan-400" />;
    };

    return (
        <div className="fixed bottom-6 left-6 w-96 bg-gray-900 border border-cyan-700 rounded-xl shadow-2xl z-40">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-cyan-900/50 to-purple-900/50">
                <div className="flex items-center gap-2">
                    <Terminal size={20} className="text-cyan-400" />
                    <h3 className="font-bold text-white">Console de Simulação</h3>
                </div>
                {simulationState.isRunning && (
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400">Executando</span>
                    </div>
                )}
            </div>

            {/* Logs */}
            <div className="h-64 overflow-y-auto p-4 bg-gray-950 font-mono text-sm">
                {simulationState.logs.map((log, index) => (
                    <div key={index} className="flex items-start gap-2 mb-2 text-gray-300">
                        {getLogIcon(log)}
                        <span className="flex-1">{log}</span>
                    </div>
                ))}
                <div ref={logsEndRef} />
            </div>
        </div>
    );
};

export default SimulationViewer;
