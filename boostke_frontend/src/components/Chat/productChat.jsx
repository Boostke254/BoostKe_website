import Chat from "@mui/icons-material/Message";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";

const MessageSeller = ({ listing }) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, loading } = useAuth(); // include loading

  // console.log("User:", user);
  // console.log("Is Authenticated:", isAuthenticated);

  const navigate = useNavigate();

  const from_id = JSON.parse(localStorage.getItem("user"))?.user_id;
  const from_type = "user";
  let to_id = listing.user_id || listing.retailer_id;
  let to_type = listing.user_id ? "user" : "retailer";

  const { sendJsonMessage } = useWebSocket(
    `ws://api.boostke.co.ke/ws?userId=${from_id}`,
    {
      onOpen: () => console.log("Connected to WebSocket"),
      onError: (e) => console.error("WebSocket error:", e),
      shouldReconnect: () => true,
    }
  );

  const handleChat = () => {
    if (loading) return; // wait until auth state is resolved

    if (!isAuthenticated) {
      alert("To chat with the seller, you must log in first!");
      navigate("/login");
      return;
    }
    setOpen(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const msg = {
        from: String(from_id),
        to: String(to_id),
        from_user_type: String(from_type),
        to_user_type: String(to_type),
        text: message.trim(),
        listing_ID: listing.listing_id,
        listing_IMG_URL: listing.photos[0],
        listing_title: listing.title,
      };

      sendJsonMessage(msg);
      setMessage("");
      setOpen(false);
      alert(
        "Message successfuly sent to seller, check your messages for any replies!"
      );
    }
  };

  return (
    <>
      <button
        onClick={handleChat}
        disabled={loading}
        className={`w-full text-white flex justify-center bg-amber-400 p-2 gap-2 cursor-pointer ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <Chat /> Chat with Seller
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[450px] bg-white p-4 rounded-md shadow-lg">
          <Typography variant="h6">Message Vendor</Typography>
          <TextField
            fullWidth
            label="Type message here..."
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#FFA500",
              "&:hover": { backgroundColor: "#E69500" },
            }}
            onClick={handleSendMessage}
          >
            Send Message
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default MessageSeller;
