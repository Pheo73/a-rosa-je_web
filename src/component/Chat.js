import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import useStore from "../store/Store";

export default function Chat() {
  const { username } = useParams();
  const location = useLocation();
  const { offerId, plantName } = location.state || {};
  const { token, user } = useStore();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(username);

  useEffect(() => {
    // Fetch existing messages
    // This is where you'd typically make an API call to get the chat history
  }, [offerId, token]);

  useEffect(() => {
    // Fetch list of conversations
    // This is where you'd typically make an API call to get the list of conversations
    setConversations([
      { username: 'user1', plantName: 'Plant 1' },
      { username: 'user2', plantName: 'Plant 2' },
      { username: 'user3', plantName: 'Plant 3' },
    ]);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Send message to the server
      // This is where you'd typically make an API call to send the message
      setMessages([...messages, { sender: user.username, content: newMessage }]);
      setNewMessage('');
    }
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
              key={conv.username}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                activeConversation === conv.username ? 'bg-gray-200' : ''
              }`}
              onClick={() => setActiveConversation(conv.username)}
            >
              <p className="font-medium">{conv.username}</p>
              <p className="text-sm text-gray-600">{conv.plantName}</p>
            </div>
          ))}
        </aside>
        
        <main className="flex-1 flex flex-col bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold">Chat with {activeConversation}</h1>
            <p className="text-gray-600">Regarding plant: {plantName}</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === user.username ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === user.username
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
            />
            <button
              onClick={handleSendMessage}
              className="bg-[#464C44] text-white px-4 py-2 rounded-r-lg hover:bg-[#3E9B2A]"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}