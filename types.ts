
import React from 'react';

export type WindowState = 'open' | 'minimized' | 'closed';

export interface WindowInstance {
    id: string;
    appId: string;
    title: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
    state: WindowState;
}

export interface AppDefinition {
    id: string;
    name: string;
    icon: React.ReactNode;
    component: React.FC<{ windowId: string }>;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    details: string;
    imageUrl: string;
}

export interface FileSystemNode {
    name: string;
    type: 'folder' | 'file';
    children?: FileSystemNode[];
    projectId?: string;
}

export interface Notification {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}
