import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { WindowInstance, WindowState, Notification } from '../types';
import { APPS } from '../constants';

interface WindowManagerContextType {
    windows: WindowInstance[];
    openApps: { [appId: string]: boolean };
    openWindow: (appId: string) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    notifications: Notification[];
    addNotification: (message: string, type: Notification['type']) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

const Z_INDEX_BASE = 10;
const Z_INDEX_STEP = 1;

export const WindowManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [windows, setWindows] = useState<WindowInstance[]>([]);
    const [openApps, setOpenApps] = useState<{ [appId: string]: boolean }>({});
    const [nextId, setNextId] = useState(0);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const getTopZIndex = useCallback(() => {
        if (windows.length === 0) return Z_INDEX_BASE;
        return Math.max(...windows.map(w => w.zIndex)) + Z_INDEX_STEP;
    }, [windows]);

    const focusWindow = useCallback((id: string) => {
        const topZIndex = getTopZIndex();
        setWindows(prev =>
            prev.map(win =>
                win.id === id
                    // FIX: Explicitly cast 'open' to WindowState to prevent type widening to string.
                    ? { ...win, zIndex: topZIndex, state: 'open' as WindowState }
                    : { ...win, zIndex: win.zIndex > Z_INDEX_BASE ? win.zIndex - 1 : win.zIndex }
            ).sort((a,b) => a.zIndex - b.zIndex)
        );

        const win = windows.find(w => w.id === id);
        if (win) {
            setOpenApps(curr => ({ ...curr, [win.appId]: true }));
        }

    }, [getTopZIndex, windows]);

    const openWindow = useCallback((appId: string) => {
        const existingWindow = windows.find(w => w.appId === appId && w.state !== 'closed');
        if (existingWindow) {
            focusWindow(existingWindow.id);
            return;
        }

        const app = APPS.find(a => a.id === appId);
        if (!app) return;

        const newWindow: WindowInstance = {
            id: `win-${nextId}`,
            appId,
            title: app.name,
            position: { x: 50 + (nextId % 10) * 20, y: 50 + (nextId % 10) * 20 },
            size: { width: 700, height: 500 },
            zIndex: getTopZIndex(),
            state: 'open',
        };

        setWindows(prev => [...prev, newWindow]);
        setOpenApps(prev => ({ ...prev, [appId]: true }));
        setNextId(prev => prev + 1);
    // FIX: Add missing dependency to useCallback.
    }, [nextId, windows, getTopZIndex, focusWindow]);

    const closeWindow = useCallback((id: string) => {
        setWindows(prev => {
            const win = prev.find(w => w.id === id);
            if (win) {
                setOpenApps(curr => ({ ...curr, [win.appId]: false }));
            }
            return prev.filter(w => w.id !== id);
        });
    }, []);
    
    const minimizeWindow = useCallback((id: string) => {
        setWindows(prev =>
            prev.map(win =>
                // FIX: Explicitly cast 'minimized' to WindowState to prevent type widening to string.
                win.id === id ? { ...win, state: 'minimized' as WindowState } : win
            )
        );
        const win = windows.find(w => w.id === id);
        if(win) {
             setOpenApps(curr => ({...curr, [win.appId]: false}));
        }
    }, [windows]);

    const addNotification = useCallback((message: string, type: Notification['type']) => {
        const newNotification: Notification = {
            id: `notif-${Date.now()}`,
            message,
            type
        };
        setNotifications(prev => [...prev, newNotification]);
        setTimeout(() => {
            setNotifications(n => n.filter(notif => notif.id !== newNotification.id));
        }, 5000);
    }, []);

    return (
        <WindowManagerContext.Provider value={{
            windows, openApps, openWindow, closeWindow, focusWindow, minimizeWindow, notifications, addNotification
        }}>
            {children}
        </WindowManagerContext.Provider>
    );
};

export const useWindowManager = (): WindowManagerContextType => {
    const context = useContext(WindowManagerContext);
    if (!context) {
        throw new Error('useWindowManager must be used within a WindowManagerProvider');
    }
    return context;
};
