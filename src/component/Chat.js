import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
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
  const [chatInitiator, setChatInitiator] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.keys().next().value;

  const getMessages = useCallback(async (conversationId) => {
    try {
      const response = await fetch(`http://172.16.1.126:8000/api/conversations/${conversationId}/messages/`, {
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
      const response = await fetch(`http://172.16.1.126:8000/api/notifications/`, {
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

  const getConversation = async () => {
    try {
      const response = await fetch(`http://172.16.1.126:8000/api/conversations/`, {
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

  useEffect(() => {
    if (token) {
      getConversation();
      getNotifications();
    }
  }, [token, getNotifications, username]);

  const getChatCreator = async (conversation) => {
    if (activeConversation) {
      const responseCreator = await fetch(`http://172.16.1.126:8000/api/conversations/${conversation.id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!responseCreator.ok) {
        throw new Error("Erreur lors de la récupération des conversations.");
      }
      const dataCreator = await responseCreator.json();
      setChatInitiator(dataCreator)
    }
  }

  useEffect(() => {
    let intervalId;

    if (activeConversation) {
      const conversation = conversations.find(conv =>
        conv.participants.some(participant => participant.username === activeConversation.username)
      );
      getChatCreator(conversation);
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

      const response = await fetch(`http://172.16.1.126:8000/api/conversations/${conversation.id}/messages/`, {
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

  const handleStatusUpdate = async (guardian_applications, status) => {
    if (!activeConversation) return;

    try {
      const response = await fetch(`http://172.16.1.126:8000/api/guardian-applications/${guardian_applications.id}/update-status/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la mise à jour du statut: ${response.statusText}`);
      }

    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
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
  }, [getUser]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
              <p className="font-medium">{conv.participants.find((e) => e.username !== user.username).first_name}</p>
            </div>
          ))}
        </aside>

        {activeConversation ? (
          <main className="flex-1 flex flex-col bg-white rounded-lg shadow-md">
            <div className="p-4 border-b items-center">
              <div className='flex'>

              <h1 className="text-2xl font-bold">Discutez avec {activeConversation.first_name}</h1>

           


              <div className="ml-auto flex space-x-2">

                <FontAwesomeIcon
                  icon={faXmark}
                  className='hover:text-red-500 cursor-pointer my-auto ml-2'
                  onClick={() => { setActiveConversation(null) }}
                />
              </div>
              </div>
              {chatInitiator?.guardian_applications?.length !== 0 &&
                chatInitiator?.guardian_applications?.filter((e)=>e.status === "pending").map((offer) => (
                  <div className='flex mt-2'>
                  <p className='my-auto'>Nom de la plante : {offer.plant_name}</p>
                  <div key={offer.id} className='flex gap-2 ml-2'>
                    <button
                      onClick={() => handleStatusUpdate(offer, 'accepted')}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Accepter
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(offer, 'rejected')}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Refuser
                    </button>
                  </div>
                  </div>
                ))
              }
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 scrollbar-custom">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${message.sender_username === user.username ? 'text-right' : 'text-left'}`}
                >
                  <div className="inline-block group">
                    <div
                      className={`p-2 rounded-lg ${message.sender_username === user.username
                        ? 'bg-[#3E9B2A] text-white ml-auto'
                        : 'bg-gray-200 text-black'
                        } transition-opacity duration-200 w-fit`}
                    >
                      {message.content}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {formatDate(message.timestamp)}
                    </p>
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
                placeholder="Ecrivez votre message..."
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