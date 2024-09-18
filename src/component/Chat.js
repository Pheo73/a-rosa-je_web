import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import useStore from "../store/Store";

export default function Chat() {
  const { token, user } = useStore();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState();
console.log(conversations);

  const getConversation = async (token) => {
    try {
      const response = await fetch(`http://172.16.1.126:8000/api/conversations/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

      });

      if (!response.ok) {
        throw new Error("Error fetching conversation:");
      }
      setConversations(await response.json())
    } catch (error) {
      console.error("Error fetching conversation:", error);
      throw error;
    }
  };

  useEffect(() => {
    getConversation(token)
  }, [token]);

  const handleSendMessage = async () => {
    try {
      const response = await fetch(`http://172.16.1.126:8000/api/conversations/${conversations.find(conv => conv.participants[0].username === activeConversation.username).id}/messages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(({ content: newMessage }))
      });

      if (!response.ok) {
        throw new Error("Error fetching conversation:");
      }
      getMessage();
      setNewMessage('');
    } catch (error) {
      console.error("Error fetching conversation:", error);
      throw error;
    }
  };
  
  const getMessage = async () => {
    try {
      const response = await fetch(`http://172.16.1.126:8000/api/conversations/${conversations.find(conv => conv.participants[0].username === activeConversation.username).id}/messages/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

      });

      if (!response.ok) {
        throw new Error("Error fetching conversation:");
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
      throw error;
    }
    try {
      const response = await fetch(`http://172.16.1.126:8000/api/conversations/${conversations.find(conv => conv.participants[0].username === activeConversation.username).id}/messages/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching conversation:");
      }
      setMessages(await response.json())
    } catch (error) {
      console.error("Error fetching conversation:", error);
      throw error;
    }
  }

  useEffect(() => {
    if (activeConversation !== undefined) {
      getMessage()
    }
  }, [activeConversation])

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
              className="bg-[#464C44] p-2 rounded-full mr-3"
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
              key={conv.participants[0].username}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${activeConversation === conv.participants[0] ? 'bg-gray-200' : ''
                }`}
              onClick={() => setActiveConversation(conv.participants[0])}
            >
              <p className="font-medium">{conv.participants[0].username}</p>
              {/* <p className="text-sm text-gray-600">{conv.participants[0].username.plantName}</p> */}
            </div>
          ))}
        </aside>

        <main className="flex-1 flex flex-col bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold">Discutez avec {activeConversation ? activeConversation.username : 'les autres utilisateurs'}</h1>
            {/* <p className="text-gray-600">Nom de la plante : {plantName}</p> */}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.sender === user.username ? 'text-right' : 'text-left'
                  }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${message.sender === user.username
                    ? 'bg-[#464C44] text-white'
                    : 'bg-gray-200 text-black'
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
              disabled={activeConversation === undefined}
            />
            <button
              onClick={handleSendMessage}
              className={`bg-[#464C44] text-white px-4 py-2 rounded-r-lg ${activeConversation === undefined ? '' : 'hover:bg-[#3E9B2A]'}`}
              disabled={activeConversation === undefined}

            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}