
import React from 'react';
import { WindowManagerProvider, useWindowManager } from './hooks/useWindowManager';
import Dock from './components/Dock';
import Window from './components/Window';
import { APPS } from './constants';
import NotificationArea from './components/NotificationArea';

const Desktop: React.FC = () => {
    const { windows, openApps, focusWindow, closeWindow, minimizeWindow } = useWindowManager();

    return (
        <div className="w-screen h-screen bg-gray-900 text-white font-sans overflow-hidden select-none bg-[url('https://picsum.photos/1920/1080?grayscale&blur=5')] bg-cover bg-center">
            <main className="w-full h-full">
                {windows.map((win) => {
                    const AppContent = APPS.find(app => app.id === win.appId)?.component;
                    if (win.state === 'closed' || !AppContent) return null;

                    return (
                        <Window
                            key={win.id}
                            id={win.id}
                            title={win.title}
                            position={win.position}
                            size={win.size}
                            zIndex={win.zIndex}
                            state={win.state}
                            onClose={() => closeWindow(win.id)}
                            onFocus={() => focusWindow(win.id)}
                            onMinimize={() => minimizeWindow(win.id)}
                        >
                            <AppContent windowId={win.id} />
                        </Window>
                    );
                })}
            </main>
            <NotificationArea />
            <Dock openApps={openApps} />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <WindowManagerProvider>
            <Desktop />
        </WindowManagerProvider>
    );
};

export default App;
