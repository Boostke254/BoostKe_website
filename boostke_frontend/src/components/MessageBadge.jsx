import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Badge, IconButton } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const MessageBadge = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const response = await axiosPrivate.get("/messages/count");

        setUnreadCount(response.data.unreadMessages);
      } catch (error) {
        console.error("Error fetching unread messages:", error);
      }
    };

    fetchUnreadMessages();

    // Optional: Poll every 30 seconds for real-time updates
    const interval = setInterval(fetchUnreadMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <NavLink to="/chat" className="block md:hidden messages">
        <Badge
          badgeContent={Number(unreadCount) || 0}
          color="error"
          showZero={false}
        >
          <MailIcon
            sx={{ fontSize: "18px" }}
            className="text-amber-600 text-2xl me-2"
          />
        </Badge>
      </NavLink>

      <NavLink to="/chat" className="hidden md:block messages">
        <Badge
          badgeContent={Number(unreadCount) || 0}
          color="error"
          showZero={false}
        >
          <MailIcon fontSize="20" className="text-amber-600 text-2xl me-2" />
        </Badge>
      </NavLink>
    </>
  );
};

export default MessageBadge;
