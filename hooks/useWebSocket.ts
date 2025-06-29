import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export default function useWebSocket() {
    const [isStatusUpdated, setIsStatusUpdated] = useState<boolean>(false);

    useEffect(() => {
        const newSocket: Socket = io('wss://saas.khlod.aait-d.com:3087/socket.io/?EIO=4&transport=websocket');
        newSocket.on('statusUpdate', (data: unknown) => {
            console.log('Status updated:', data);
            setIsStatusUpdated(true);
        });

        newSocket.on('connect', () => {
            console.log('Connected to Socket.IO server!');
        });

        newSocket.on('disconnect', (reason: Socket.DisconnectReason) => {
            console.log('Disconnected from Socket.IO server:', reason);
        });

        newSocket.on('connect_error', (error: Error) => {
            console.error('Socket.IO connection error:', error);
        });

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, []);

    return { isStatusUpdated, setIsStatusUpdated };
}