
import React, { useState } from 'react';
import { FILE_SYSTEM, PROJECTS, FileIcon, FolderIcon } from '../../constants';
import type { FileSystemNode, Project } from '../../types';

interface Tab {
    id: string;
    title: string;
    projectId: string;
}

const ProjectDetail: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="p-4 bg-gray-900/50 rounded-lg h-full overflow-y-auto">
            <h2 className="text-3xl font-bold text-cyan-400 mb-4">{project.name}</h2>
            <img src={project.imageUrl} alt={project.name} className="w-full h-48 object-cover rounded-lg mb-4"/>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-100 mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                        <span key={tech} className="bg-cyan-900/50 text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{tech}</span>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-lg text-gray-100 mb-2">Details</h3>
                <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{project.details}</p>
            </div>
        </div>
    );
};

const FileSystemTree: React.FC<{ node: FileSystemNode; onFileClick: (projectId: string, fileName: string) => void; level?: number }> = ({ node, onFileClick, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleNodeClick = () => {
        if (node.type === 'folder') {
            setIsOpen(!isOpen);
        } else if (node.projectId) {
            onFileClick(node.projectId, node.name);
        }
    };
    
    const Icon = node.type === 'folder' ? FolderIcon : FileIcon;
    const iconColor = node.type === 'folder' ? 'text-cyan-400' : 'text-gray-400';

    return (
        <div style={{ paddingLeft: `${level * 16}px` }}>
            <div onClick={handleNodeClick} className="flex items-center py-1 cursor-pointer hover:bg-gray-700/50 rounded">
                <Icon className={`w-5 h-5 mr-2 ${iconColor}`} />
                <span>{node.name}</span>
            </div>
            {isOpen && node.children && (
                <div>
                    {node.children.map(child => <FileSystemTree key={child.name} node={child} onFileClick={onFileClick} level={level + 1} />)}
                </div>
            )}
        </div>
    );
}

const ProjectsApp: React.FC<{windowId: string}> = () => {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTabId, setActiveTabId] = useState<string | null>(null);

    const openTab = (projectId: string, fileName: string) => {
        const existingTab = tabs.find(tab => tab.projectId === projectId);
        if (existingTab) {
            setActiveTabId(existingTab.id);
        } else {
            const newTab: Tab = {
                id: `tab-${projectId}`,
                title: fileName,
                projectId,
            };
            setTabs([...tabs, newTab]);
            setActiveTabId(newTab.id);
        }
    };

    const closeTab = (tabId: string) => {
        const newTabs = tabs.filter(tab => tab.id !== tabId);
        setTabs(newTabs);
        if (activeTabId === tabId) {
            setActiveTabId(newTabs.length > 0 ? newTabs[0].id : null);
        }
    };

    const activeProject = PROJECTS.find(p => p.id === tabs.find(t => t.id === activeTabId)?.projectId);

    return (
        <div className="flex h-full bg-gray-800 text-gray-200">
            <aside className="w-1/3 max-w-xs bg-gray-900/50 p-2 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-2 px-2">Explorer</h3>
                {FILE_SYSTEM.map(node => <FileSystemTree key={node.name} node={node} onFileClick={openTab} />)}
            </aside>
            <main className="flex-1 flex flex-col">
                <div className="flex border-b border-gray-700">
                    {tabs.map(tab => (
                        <div key={tab.id} className={`flex items-center px-4 py-2 cursor-pointer ${activeTabId === tab.id ? 'bg-gray-800 border-b-2 border-cyan-400' : 'bg-gray-900/30'}`} onClick={() => setActiveTabId(tab.id)}>
                            <FileIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="text-sm">{tab.title}</span>
                            <button onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }} className="ml-3 text-gray-500 hover:text-white">×</button>
                        </div>
                    ))}
                </div>
                <div className="flex-1 p-2 overflow-auto">
                    {activeProject ? (
                        <ProjectDetail project={activeProject} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                           <p>Select a project from the explorer to view details.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProjectsApp;
