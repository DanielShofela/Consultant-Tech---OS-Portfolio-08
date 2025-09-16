
import React from 'react';
import { useWindowManager } from '../hooks/useWindowManager';
import type { Notification as NotificationType } from '../types';

const Notification: React.FC<{ notification: NotificationType }> = ({ notification }) => {
    const baseClasses = "w-72 p-4 rounded-lg shadow-lg mb-4 text-sm font-medium transition-all duration-300 transform";
    const typeClasses = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
    };
    
    return (
        <div className={`${baseClasses} ${typeClasses[notification.type]}`}>
            {notification.message}
        </div>
    );
}

const NotificationArea: React.FC = () => {
    const { notifications } = useWindowManager();

    return (
        <div className="fixed top-5 right-5 z-[1000]">
            {notifications.map(n => <Notification key={n.id} notification={n} />)}
        </div>
    );
};

export default NotificationArea;
