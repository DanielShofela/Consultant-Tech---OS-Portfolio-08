
import React, { useState, useRef, useEffect } from 'react';
import type { WindowInstance } from '../types';

interface WindowProps extends Omit<WindowInstance, 'appId' | 'title'> {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    onFocus: () => void;
    onMinimize: () => void;
}

const Window: React.FC<WindowProps> = ({ id, title, position, size, zIndex, state, children, onClose, onFocus, onMinimize }) => {
    const [currentPosition, setCurrentPosition] = useState(position);
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement>(null);
    const [isMaximized, setIsMaximized] = useState(false);
    const [preMaximizeState, setPreMaximizeState] = useState({ position, size });

    useEffect(() => {
      if (state === 'open') {
        onFocus();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMaximized) return;
        onFocus();
        setIsDragging(true);
        const windowRect = windowRef.current?.getBoundingClientRect();
        if (windowRect) {
            dragOffset.current = {
                x: e.clientX - windowRect.left,
                y: e.clientY - windowRect.top,
            };
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setCurrentPosition({
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const toggleMaximize = () => {
      if (isMaximized) {
        setCurrentPosition(preMaximizeState.position);
        setIsMaximized(false);
      } else {
        setPreMaximizeState({ position: currentPosition, size });
        setCurrentPosition({ x: 0, y: 0 });
        setIsMaximized(true);
      }
    }
    
    const windowStyle: React.CSSProperties = {
        left: isMaximized ? 0 : currentPosition.x,
        top: isMaximized ? 0 : currentPosition.y,
        width: isMaximized ? '100%' : size.width,
        height: isMaximized ? '100%' : size.height,
        zIndex: zIndex,
        display: state === 'minimized' ? 'none' : 'flex',
    };

    return (
        <div
            ref={windowRef}
            id={id}
            className="absolute flex flex-col bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg shadow-2xl border border-cyan-500/30 overflow-hidden transition-all duration-100"
            style={windowStyle}
            onMouseDown={onFocus}
        >
            <header
                className="flex items-center justify-between h-8 px-2 bg-gray-900/70 cursor-move"
                onMouseDown={handleMouseDown}
                onDoubleClick={toggleMaximize}
            >
                <span className="text-sm font-bold text-gray-300">{title}</span>
                <div className="flex items-center space-x-2">
                    <button onClick={onMinimize} className="w-4 h-4 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors"></button>
                    <button onClick={toggleMaximize} className="w-4 h-4 bg-green-400 rounded-full hover:bg-green-500 transition-colors"></button>
                    <button onClick={onClose} className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-600 transition-colors"></button>
                </div>
            </header>
            <main className="flex-1 p-2 overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default Window;
