import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import useStore from "../store/Store";
import Lottie from 'react-lottie';
import openChatAnimation from '../lottie/Animation - 1726684938322.json';
import NotificationSidebar from './shared/NotificationSidebar';

export default function Chat() {
  const { token, user, getUser } = useStore();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { username } = useParams();  // Get the username from the URL

  const getMessages = useCallback(async (conversationId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/conversations/${conversationId}/messages/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des messages.");
      }

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
    }
  }, [token]);

  const getNotifications = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/notifications/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des notifications.");
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des notifications :", error);
    }
  }, [token]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/conversations/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des conversations.");
        }
        const data = await response.json();
        setConversations(data);

        // Set active conversation based on URL parameter
        if (username) {
          const conversation = data.find(conv => 
            conv.participants.some(participant => participant.username === username)
          );
          if (conversation) {
            setActiveConversation(conversation.participants.find(p => p.username === username));
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des conversations :", error);
      }
    };

    if (token) {
      getConversation();
      getNotifications();
    }
  }, [token, getNotifications, username]);

  useEffect(() => {
    let intervalId;

    if (activeConversation) {
      const conversation = conversations.find(conv =>
        conv.participants.some(participant => participant.username === activeConversation.username)
      );
      if (conversation) {
        getMessages(conversation.id);
        
        intervalId = setInterval(() => {
          getMessages(conversation.id);
        }, 5000);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [activeConversation, conversations, getMessages]);

  const handleSendMessage = async () => {
    if (!activeConversation) return;

    try {
      const conversation = conversations.find(conv =>
        conv.participants.some(participant => participant.username === activeConversation.username)
      );

      if (!conversation) {
        throw new Error("Conversation non trouvée.");
      }

      const response = await fetch(`http://127.0.0.1:8000/api/conversations/${conversation.id}/messages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newMessage })
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message.");
      }

      setNewMessage('');
      getMessages(conversation.id);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: openChatAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#F5F5F5]">
      <header className="flex py-4 bg-[#1A2016]">
        <div className="mt-2">
          <button className="text-white text-[20px] font-[rubik-mono] ml-16">
            <Link to="/home">Home</Link>
          </button>
        </div>
        <div className="ml-auto mr-16">
          <div className="flex">
            <FontAwesomeIcon
              icon={faBell}
              color="white"
              size="1x"
              className="bg-[#464C44] p-2 rounded-full mr-3 cursor-pointer"
              onClick={() => setIsNotificationSidebarOpen(true)}
            />
            <Link to="/profil">
              <FontAwesomeIcon
                icon={faUser}
                size="1x"
                color="white"
                className="border border-white rounded-full p-3 mt-2"
              />
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden p-4">
        <aside className="w-64 bg-white rounded-lg shadow-md mr-4 overflow-y-auto">
          <h2 className="text-xl font-semibold p-4 border-b">Conversations</h2>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${activeConversation?.username === conv.participants.find(e => e.username !== user.username).username ? 'bg-gray-200' : ''
                }`}
              onClick={() => setActiveConversation(conv.participants.find(e => e.username !== user.username))}
            >
              <p className="font-medium">{conv.participants.find((e) => e.username !== user.username).username}</p>
            </div>
          ))}
        </aside>

        {activeConversation ? (
          <main className="flex-1 flex flex-col bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <h1 className="text-2xl font-bold">Discutez avec {activeConversation.username}</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 scrollbar-custom">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${message.sender_username === user.username ? 'text-right' : 'text-left'
                    }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${message.sender_username === user.username
                      ? 'bg-[#3E9B2A] text-white'
                      : ' bg-gray-200 text-black'
                      }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow border rounded-l-lg px-2 py-1"
                placeholder="Type your message..."
                disabled={!activeConversation}
              />
              <button
                onClick={handleSendMessage}
                className={`bg-[#464C44] text-white px-4 py-2 rounded-r-lg ${!activeConversation ? '' : 'hover:bg-[#3E9B2A]'}`}
                disabled={!activeConversation}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </main>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Lottie
              options={defaultOptions}
              height={500}
              width={700}
            />
          </div>
        )}
      </div>

      <NotificationSidebar
        isOpen={isNotificationSidebarOpen}
        onClose={() => setIsNotificationSidebarOpen(false)}
        notifications={notifications}
      />
    </div>
  );
}