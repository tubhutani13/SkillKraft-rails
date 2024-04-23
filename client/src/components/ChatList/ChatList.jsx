import React, { useState, useEffect } from 'react';
import './ChatList.scss';
import api from '../../utils/api';

const ChatList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const rooms = {
    "rooms": [
      {
        "id": 1,
        "user": {
          "id": 101,
          "name": "John Doe",
          "profile_picture": "https://example.com/profile_picture.jpg"
        },
        "last_message": "Hello there!",
        "last_message_time": "2024-02-12T10:30:00Z",
        "unread_messages": 2
      },
      {
        "id": 2,
        "user": {
          "id": 102,
          "name": "Jane Smith",
          "profile_picture": "https://example.com/profile_picture.jpg"
        },
        "last_message": "How are you?",
        "last_message_time": "2024-02-12T11:15:00Z",
        "unread_messages": 0
      },
      {
        "id": 3,
        "user": {
          "id": 103,
          "name": "Alice Johnson",
          "profile_picture": "https://example.com/profile_picture.jpg"
        },
        "last_message": "Good morning!",
        "last_message_time": "2024-02-12T09:00:00Z",
        "unread_messages": 0
      }
    ]
  }
  const [chatRooms, setChatRooms] = useState(rooms.rooms);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await api.get('/rooms');
        console.log(response.data);
        setChatRooms(response.data);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };

    fetchChatRooms();
  }, []);

  const toggleChatList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-list-container">
      {/* Chat list button */}
      <button className="chat-list-button" onClick={toggleChatList}>
        <span className="arrow">{isOpen ? '▼' : '▶'}</span>
        Chat
      </button>

      {/* Expanded chat list */}
      {isOpen && (
        <div className="chat-list-expanded">
          <ul className="chat-room-list">
            {chatRooms.map((room) => (
              <li key={room.id} className="chat-room-item">
                <img src={room.user.profile_picture} alt="Profile" className="chat-profile-picture" />
                <div className="room-details">
                  <div className="room-info">
                    <span className="room-name">{room.user.name}</span>
                    {room.unread_messages > 0 && (
                      <span className="unread-messages">{room.unread_messages}</span>
                    )}
                  </div>
                  <div className='message-details'>
                  <span className="last-message">{truncate(room.last_message)}</span>
                  <span className="time">{room.last_message_time}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Truncate the last message if it's too long
const truncate = (message) => {
  const maxLength = 30;
  return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
};


export default ChatList;
