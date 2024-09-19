import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import useStore from "../../store/Store";
import { useNavigate } from "react-router-dom";

function NotificationSidebar({ isOpen, onClose }) {
    const { token } = useStore();
    const [notifications, setNotifications] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://172.16.1.126:8000/api/notifications/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }

                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen, token]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const redirectChat = async (notification) => {
        try {
            const response = await fetch('http://172.16.1.126:8000/api/notifications/mark-all-read/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }
            navigate(`/chat/${notification.sender_username}`);


        } catch (error) {
            console.error('Error marking notification read', error);
        }
    }

    return (
        <div className={`fixed inset-y-0 right-0 w-80 bg-[#2A2A2A] shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
            <div className="flex justify-between items-center p-4 bg-[#3E3E3E]">
                <h2 className="text-lg font-[rubik-mono] text-white">NOTIFICATION</h2>
                <button onClick={onClose} className="text-white hover:text-gray-300">
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
            </div>
            <div className="overflow-y-auto h-full pb-20">
                {notifications?.map((notification) => (
                    <div key={notification.id} className=" mt-3 p-4 bg-[#3E3E3E] text-white mb-2 mx-2 rounded-lg cursor-pointer" onClick={() => { redirectChat(notification) }}>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-[#464C44] rounded-full mr-2"></div>
                            <div>
                                <p className="font-[rubik-mono] text-sm">{notification.sender_username}</p>
                                <p className="font-[poppins-regular] text-xs text-[#9E9E9E]">{notification.message_content}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-[#9E9E9E]">{formatDate(notification.created_at)}</span>
                            <div className={`w-2 h-2 ${notification.is_read ? 'bg-gray-500' : 'bg-[#3E9B2A]'} rounded-full`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotificationSidebar;