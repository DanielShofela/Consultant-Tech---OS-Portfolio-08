
import React from 'react';
import { useWindowManager } from '../hooks/useWindowManager';
import { APPS } from '../constants';

interface DockProps {
    openApps: { [appId: string]: boolean };
}

const Dock: React.FC<DockProps> = ({ openApps }) => {
    const { openWindow } = useWindowManager();

    return (
        <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center items-center">
            <div className="flex items-end space-x-4 bg-gray-900/50 backdrop-blur-lg p-3 rounded-xl border border-white/10 shadow-lg">
                {APPS.map((app) => (
                    <div key={app.id} className="relative flex flex-col items-center">
                        <button
                            onClick={() => openWindow(app.id)}
                            className="p-2 rounded-lg hover:bg-cyan-500/20 transition-all duration-200"
                            title={app.name}
                        >
                            {app.icon}
                        </button>
                        {openApps[app.id] && <div className="absolute -bottom-2 w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>}
                    </div>
                ))}
            </div>
        </footer>
    );
};

export default Dock;
