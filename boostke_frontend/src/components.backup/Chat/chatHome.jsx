import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useWebSocket from "react-use-websocket";
import Avatar from "@mui/material/Avatar";

const CH = () => {
  const axiosPrivate = useAxiosPrivate();

  const currentUserId = JSON.parse(localStorage.getItem("user")).user_id;

  // Expect route parameters to include the selected other user's id and type.
  // For example: /shopping/chat/:recipientId/:recipientType
  const { title, timestamp, listingId, recipientId, recipientType } =
    useParams();

  // State for the current input, conversation messages, and partner's display name.
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [partnerName, setPartnerName] = useState("Loading...");

  // State for popup notifications.
  const [popupMessage, setPopupMessage] = useState(null);

  // Ref for scrolling the chat container.
  const messagesEndRef = useRef(null);

  // 1. Fetch the chat partner's display name.
  useEffect(() => {
    if (recipientId && recipientType) {
      axiosPrivate
        .get(`/message/display-name/${recipientType}/${recipientId}`)
        .then((res) => {
          setPartnerName(res.data.full_name);
        })
        .catch((err) => {
          console.error("Error fetching partner display name:", err);
          setPartnerName("Unknown");
        });
    }
  }, [recipientId, recipientType, axiosPrivate]);

  // 2. Fetch the conversation history between the current user and the selected partner.
  useEffect(() => {
    if (currentUserId && recipientId) {
      axiosPrivate
        .get(`/message/conversation/${currentUserId}/${recipientId}`)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) =>
          console.error("Error fetching conversation history:", err)
        );
    }
  }, [currentUserId, recipientId, axiosPrivate]);

  // 3. Connect to the WebSocket server using the current user's id.
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `ws://api.boostke.co.ke/ws?userId=${currentUserId}`,
    {
      onOpen: () => console.log("Connected to WebSocket"),
      onError: (e) => console.error("WebSocket error:", e),
      shouldReconnect: () => true, // Automatically reconnect on connection loss.
    }
  );

  // 4. Listen for incoming messages via WebSocket.
  useEffect(() => {
    if (lastJsonMessage !== null) {
      // Determine if the new message is relevant to this conversation.
      const isRelevant =
        (lastJsonMessage.from === String(currentUserId) &&
          lastJsonMessage.to === String(recipientId)) ||
        (lastJsonMessage.from === String(recipientId) &&
          lastJsonMessage.to === String(currentUserId));

      if (isRelevant) {
        setMessages((prev) => [...prev, lastJsonMessage]);

        // If the incoming message is from the other user, show a popup.
        if (lastJsonMessage.from !== String(currentUserId)) {
          setPopupMessage(lastJsonMessage);
          // Remove the popup after 3 seconds.
          setTimeout(() => {
            setPopupMessage(null);
          }, 3000);
        }
      }
    }
  }, [lastJsonMessage, currentUserId, recipientId]);

  // 5. Scroll to the bottom of the chat whenever messages update.
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 6. Function to handle sending a message.
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      // Construct the message object.
      const msg = {
        from: String(currentUserId),
        to: String(recipientId),
        from_user_type: "user", // Assuming the current user is always a "user"
        to_user_type: recipientType,
        text: message.trim(),
      };

      // Send the message via WebSocket.
      sendJsonMessage(msg);

      // Optimistically add the message locally.
      setMessages((prev) => [...prev, msg]);

      // Clear the input field.
      setMessage("");
    }
  };

  const getDDMMTT = (timestamp) => {
    // Create a new Date object
    const date = new Date(timestamp);

    // Get the day, month, and formatted time
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0"); // Get hours and ensure two digits
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Get minutes and ensure two digits

    // Format the date and time
    const formattedDate = `${day}/${month}`;
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedTime} ${formattedDate}`;
  };

  const getImageUrl = (messages, listingId) => {
    const message = messages.find((msg) => msg.listing_id == listingId);
    return message ? message.listing_image_url : null;
  };

  return (
    <div className="chat-container">
      <div className="flex items-center gap-2 p-2 md:p-4">
        <Avatar alt="Remy Sharp" src={getImageUrl(messages, listingId)} />
        <p>{title}</p>
      </div>

      <div className="chat-messages">
        {messages.map(
          (msg, index) =>
            listingId == msg.listing_id && (
              <div
                key={index}
                className={`chat-message ${
                  msg.from_user == currentUserId ? "sent" : "received"
                }`}
              >
                <div className="message-content">{msg.text}</div>
                <div className="message-meta">
                  {msg.from_user == currentUserId
                    ? `${getDDMMTT(timestamp)} : You`
                    : `${partnerName} : ${getDDMMTT(timestamp)}`}
                </div>
              </div>
            )
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chat-input">
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      {popupMessage && (
        <div className="popup-notification">
          <strong>
            New message from{" "}
            {popupMessage.from === String(currentUserId) ? "You" : partnerName}
          </strong>
        </div>
      )}
    </div>
  );
};

export default CH;

// import React, { useEffect, useState, useRef } from 'react';
// import useWebSocket from 'react-use-websocket';

// const CH = () => {

//   const userId = 0;
//   const recipientId = 0;

//   // State for the current input and the list of messages
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   // New state for popup notification
//   const [popupMessage, setPopupMessage] = useState(null);

//   // Reference for scrolling the chat container to the bottom.
//   const messagesEndRef = useRef(null);

//   // Connect to the WebSocket server with the userId query parameter.
//   const { sendJsonMessage, lastJsonMessage } = useWebSocket(
//     `ws://localhost:5000/ws?userId=${userId}`,
//     {
//       onOpen: () => console.log('Connected to WebSocket'),
//       onError: (e) => console.error('WebSocket error:', e),
//       shouldReconnect: () => true, // automatically reconnect on connection loss
//     }
//   );

//   // When a new message arrives via WebSocket, update the messages list.
//   useEffect(() => {
//     if (lastJsonMessage !== null) {
//       // Append the received message to our local state.
//       setMessages((prev) => [...prev, lastJsonMessage]);

//       // If the message is not sent by you, trigger a popup.
//       if (lastJsonMessage.from !== userId) {
//         setPopupMessage(lastJsonMessage);
//         // Remove the popup after 3 seconds.
//         setTimeout(() => {
//           setPopupMessage(null);
//         }, 3000);
//       }
//     }
//   }, [lastJsonMessage, userId]);

//   // Scroll to the bottom of the chat whenever messages update.
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   // Function to handle sending a message.
//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim() !== '') {
//       // Create the message object.
//       const msg = {
//         from: String(userId),
//         to: String(recipientId),
//         from_user_type: 'user',
//         to_user_type: null,
//         text: message.trim(),
//       };

//       // Send the message via WebSocket.
//       sendJsonMessage(msg);

//       // Add the message locally so the sender sees it immediately.
//       setMessages((prev) => [...prev, msg]);

//       // Clear the input field.
//       setMessage('');
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <p>Chat with {recipientId}</p>
//       </div>

//       <div className="chat-messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`chat-message ${
//               msg.from == userId ? 'sent' : 'received'
//             }`}
//           >
//             <div className="message-content">{msg.text}</div>
//             <div className="message-meta">
//               {msg.from == userId ? 'You' : msg.from}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSendMessage} className="chat-input">
//         <input
//           type="text"
//           value={message}
//           placeholder="Type a message..."
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>

//       {popupMessage && (
//         <div className="popup-notification">
//           <strong>New message from {popupMessage.from}</strong>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CH;
