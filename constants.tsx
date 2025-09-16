
import React from 'react';
import type { AppDefinition, FileSystemNode, Project } from './types';
import TerminalApp from './components/apps/TerminalApp';
import ProjectsApp from './components/apps/ProjectsApp';
import AboutApp from './components/apps/AboutApp';

// SVG Icons
export const TerminalIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
    </svg>
);

export const FolderIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

// App Definitions
export const APPS: AppDefinition[] = [
    {
        id: 'terminal',
        name: 'Terminal',
        icon: <TerminalIcon className="w-8 h-8" />,
        component: TerminalApp,
    },
    {
        id: 'projects',
        name: 'Projects',
        icon: <FolderIcon className="w-8 h-8" />,
        component: ProjectsApp,
    },
    {
        id: 'about',
        name: 'About Me',
        icon: <UserIcon className="w-8 h-8" />,
        component: AboutApp,
    },
];

// Project Data
export const PROJECTS: Project[] = [
    {
        id: 'proj-1',
        name: 'Synergize CRM',
        description: 'An intelligent CRM platform that leverages AI to predict customer churn and suggest engagement strategies.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Python', 'Gemini API', 'Tailwind CSS'],
        details: 'Developed the front-end architecture from scratch using React and TypeScript, focusing on a modular and scalable component library. Integrated Gemini API for natural language processing of customer feedback, providing actionable insights on a real-time dashboard. The backend is powered by Node.js for API services and Python for machine learning models.',
        imageUrl: 'https://picsum.photos/seed/proj1/800/600',
    },
    {
        id: 'proj-2',
        name: 'QuantumLeap Analytics',
        description: 'A data visualization tool for complex scientific data, offering interactive charts and 3D models.',
        technologies: ['D3.js', 'Three.js', 'React', 'WebAssembly'],
        details: 'Engineered a high-performance data visualization engine using D3.js for 2D charts and Three.js for 3D molecular models. Optimized rendering performance by offloading heavy computations to WebAssembly modules written in Rust. The interface allows researchers to manipulate and analyze large datasets fluidly in the browser.',
        imageUrl: 'https://picsum.photos/seed/proj2/800/600',
    },
    {
        id: 'proj-3',
        name: 'Automata CI/CD',
        description: 'A developer-friendly CI/CD pipeline automation tool with a focus on containerization and cloud-native deployments.',
        technologies: ['Go', 'Docker', 'Kubernetes', 'React', 'gRPC'],
        details: 'Led the design of a declarative YAML-based pipeline configuration system. The core service, written in Go, orchestrates Docker and Kubernetes resources to build, test, and deploy applications. The web-based dashboard, built with React, provides real-time logs, deployment status, and resource monitoring through a gRPC-web stream.',
        imageUrl: 'https://picsum.photos/seed/proj3/800/600',
    }
];

// File System Structure
export const FILE_SYSTEM: FileSystemNode[] = [
    {
        name: 'Projects',
        type: 'folder',
        children: [
            { name: 'synergize-crm.md', type: 'file', projectId: 'proj-1' },
            { name: 'quantum-leap.md', type: 'file', projectId: 'proj-2' },
            { name: 'automata-cicd.md', type: 'file', projectId: 'proj-3' },
        ],
    },
    {
        name: 'Documents',
        type: 'folder',
        children: [
            { name: 'resume.pdf', type: 'file' },
            { name: 'cover_letter.docx', type: 'file' },
        ]
    }
];
