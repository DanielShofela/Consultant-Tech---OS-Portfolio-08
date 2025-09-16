
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useWindowManager } from '../../hooks/useWindowManager';
import { callGemini } from '../../services/geminiService';

interface Line {
    type: 'input' | 'output' | 'error' | 'ai';
    text: string;
}

const TerminalApp: React.FC<{windowId: string}> = () => {
    const [lines, setLines] = useState<Line[]>([{ type: 'output', text: "Welcome to Consultant OS Terminal. Type 'help' for commands." }]);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isProcessing, setIsProcessing] = useState(false);
    const endOfLinesRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { addNotification } = useWindowManager();

    const scrollToBottom = () => {
        endOfLinesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [lines]);

    const handleCommand = useCallback(async (command: string) => {
        const newLines: Line[] = [...lines, { type: 'input', text: `$ ${command}` }];
        setLines(newLines);

        const [cmd, ...args] = command.trim().split(' ');

        setIsProcessing(true);
        let output: Line[] = [];

        try {
            switch (cmd) {
                case 'help':
                    output = [
                        { type: 'output', text: "Available commands:" },
                        { type: 'output', text: "  help          - Show this help message." },
                        { type: 'output', text: "  ls            - List files in the current directory." },
                        { type: 'output', text: "  cat [file]    - Display content of a file." },
                        { type: 'output', text: "  about         - Display information about me." },
                        { type: 'output', text: "  contact       - Show contact information." },
                        { type: 'output', text: "  ask \"[query]\" - Ask the consultant AI a question." },
                        { type: 'output', text: "  clear         - Clear the terminal screen." },
                    ];
                    break;
                case 'ls':
                    output = [
                        { type: 'output', text: "Projects/  Documents/" }
                    ];
                    break;
                case 'cat':
                    output = [{ type: 'error', text: `cat: ${args[0] || 'file'}: No such file or directory. Try 'ls' first.` }];
                    break;
                case 'about':
                    output = [
                        { type: 'output', text: "Systemic Interface Consultant & Senior Frontend Engineer." },
                        { type: 'output', text: "Expert in React, TypeScript, and integrating advanced AI like Gemini." },
                    ];
                    break;
                case 'contact':
                    navigator.clipboard.writeText("contact@consultant.tech").then(() => {
                        addNotification("Email copied to clipboard!", 'success');
                    });
                    output = [{ type: 'output', text: "Email: contact@consultant.tech (copied to clipboard)" }];
                    break;
                case 'ask':
                    const query = command.substring(command.indexOf(' ') + 1).replace(/^"|"$/g, '');
                     if (!query || query === 'ask') {
                        output = [{ type: 'error', text: 'usage: ask "[your question]"' }];
                        break;
                    }
                    setLines(prev => [...prev, { type: 'input', text: `$ ${command}` }]);
                    const aiResponse = await callGemini(query);
                    output = [{ type: 'ai', text: aiResponse }];
                    break;
                case 'clear':
                    setLines([]);
                    setIsProcessing(false);
                    return;
                case '':
                    break;
                default:
                    output = [{ type: 'error', text: `command not found: ${cmd}` }];
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
            output = [{ type: 'error', text: `Error: ${errorMessage}` }];
        }
        
        setLines(prev => [...prev, ...output]);
        setIsProcessing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lines]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isProcessing) {
            const command = input.trim();
            if (command) {
                setHistory(prev => [command, ...prev]);
                setHistoryIndex(-1);
            }
            handleCommand(command);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            if (historyIndex < history.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(history[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(history[newIndex]);
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if(e.key === 'l' && e.ctrlKey){
            e.preventDefault();
            setLines([]);
        }
    };
    
    return (
        <div className="bg-black text-white font-mono text-sm h-full flex flex-col p-2" onClick={() => inputRef.current?.focus()}>
            <div className="flex-1 overflow-y-auto pr-2">
                {lines.map((line, index) => (
                    <div key={index} className="whitespace-pre-wrap">
                        {line.type === 'input' && <span className="text-gray-400">{line.text}</span>}
                        {line.type === 'output' && <span className="text-gray-200">{line.text}</span>}
                        {line.type === 'error' && <span className="text-red-500">{line.text}</span>}
                        {line.type === 'ai' && <span className="text-cyan-400">{line.text}</span>}
                    </div>
                ))}
                <div ref={endOfLinesRef} />
            </div>
            <div className="flex items-center mt-2">
                <span className="text-cyan-400 mr-2">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-gray-200 w-full"
                    autoFocus
                    disabled={isProcessing}
                />
            </div>
        </div>
    );
};

export default TerminalApp;
