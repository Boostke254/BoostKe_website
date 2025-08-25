import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../css/chatbox.css";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

const Messages = () => {
  const axiosPrivate = useAxiosPrivate();
  const [chats, setChats] = useState([]);
  const [userNames, setUserNames] = useState({});

  // The current user's id (assumed available from context/localStorage)
  const currentUserId = JSON.parse(localStorage.getItem("user")).user_id;

  // 1. Fetch the entire chat history for the current user.
  useEffect(() => {
    const fetchChats = async () => {
      try {
        // Mark all messages as read first
        await axiosPrivate.put("/messages/mark-read");

        // Fetch chat history for current user
        const response = await axiosPrivate.get(
          `/message/chats/${currentUserId}`
        );
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchChats();
  }, [currentUserId, axiosPrivate]);

  // 2. Group messages by listing_id and conversation partner.
  //    For each message, determine the “other” user (depending on whether the current user is the sender or receiver)
  //    and then use a composite key: listing_id-otherUserType-otherUserId.
  const groupedChats = {};
  chats.forEach((message) => {
    // Identify the conversation partner.
    const otherUserId =
      message.from_user === currentUserId ? message.to_user : message.from_user;
    const otherUserType =
      message.from_user === currentUserId
        ? message.to_user_type
        : message.from_user_type;

    // Use both the listing id and the conversation partner for the key.
    const key = `${message.listing_id}-${otherUserType}-${otherUserId}`;

    // Keep only the latest message for each unique conversation thread.
    if (
      !groupedChats[key] ||
      new Date(message.timestamp) > new Date(groupedChats[key].timestamp)
    ) {
      groupedChats[key] = { ...message, otherUserId, otherUserType };
    }
  });

  // 3. For each unique conversation partner, fetch their display name (if not already cached).
  //    This could be used to show who you’re chatting with.
  useEffect(() => {
    Object.keys(groupedChats).forEach((key) => {
      if (!userNames[key]) {
        const { otherUserId, otherUserType } = groupedChats[key];
        axiosPrivate
          .get(`/message/display-name/${otherUserType}/${otherUserId}`)
          .then((res) => {
            setUserNames((prev) => ({ ...prev, [key]: res.data.full_name }));
          })
          .catch((err) => console.error("Error fetching display name:", err));
      }
    });
  }, [groupedChats, userNames, axiosPrivate]);

  // Convert the grouped object into a sorted array (most recent first).
  const conversationList = Object.keys(groupedChats)
    .map((key) => ({
      key,
      ...groupedChats[key],
      displayName: userNames[key] || "Loading...",
    }))
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  //console.log(conversationList)
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Sidebar content for both mobile and desktop
  const drawerContent = (
    <div>
      <div className="chat-header p-2">
        <p className="m-0 ">Messages</p>
      </div>
      <Divider />
      <List>
        {conversationList.map((conversation) => (
          <ListItem
            key={conversation.key}
            button
            // When an item is clicked on mobile, close the drawer.
            onClick={() => isMobile && setMobileOpen(false)}
          >
            <NavLink
              to={`/chat/${conversation.listing_title}/${conversation.timestamp}/${conversation.listing_id}/${conversation.otherUserId}/${conversation.otherUserType}`}
              className="chat flex items-center"
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              <img
                src={
                  conversation.listing_image_url ||
                  "https://placehold.co/600x400"
                }
                alt="Listing"
                className="chat-avatar me-2"
                style={{ width: "45px", height: "45px", borderRadius: "50%" }}
              />
              <div className="chat-details">
                <p className="chat-name m-0">
                  <strong>{conversation.listing_title}</strong>
                </p>
                <p className="chat-message m-0">{conversation.text}</p>
              </div>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="message_page">
      <div className="boostke_chat_container flex">
        {/* Mobile Hamburger Toggler */}
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            style={{
              position: "fixed",
              top: "5px",
              left: 5,
              background: "#fff",
              borderRadius: "4px",
              border: "2px solid #eee",
              zIndex: 1300,
            }}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Sidebar Section */}
        <nav className="sidebar">
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }} // Improves performance on mobile.
            >
              {drawerContent}
            </Drawer>
          ) : (
            <div
              className="chat-group-sidebar-container"
              style={{ width: "300px" }}
            >
              {drawerContent}
            </div>
          )}
        </nav>

        {/* Content Section */}
        <div className="content_section flex-grow-1 pb-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Messages;
