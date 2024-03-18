import { createContext, useState } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [messageText, setMessageText] = useState('');

  const handleMessage = (response) => {
    setMessage(response);
    if ( response?.data?.message) {
      setMessageText(response.data?.message);
    } else if (response.data?.messages) {
      const messagesArray = Object.values(response.data.messages);
      const messagesList = messagesArray.map((message, index) => (
        <li key={index}>{message}</li>
      ));
      setMessageText(<ul>{messagesList}</ul>);
    } else {
      setMessageText(response?.data?.message || 'An unexpected error occurred.');
    }
  };

  const clearMessage = () => {
    setMessage(null);
    setMessageText('');
  };

  return (
    <MessageContext.Provider value={{ message, messageText, handleMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext