const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const { WebSocketServer } = require("ws");
require("dotenv").config();

const app = express();
const pool = require("./db");
const PORT = process.env.PORT || 5000;

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173", // Development
  "https://boostke.co.ke",
  "https://www.boostke.co.ke",
  "http://www.boostke.co.ke",
  "http://boostke.co.ke",
  // Add your actual domain here when you get it
  // "https://your-actual-domain.com",
  // "https://www.your-actual-domain.com",
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// Apply middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/uploads", express.static(path.join(__dirname, "./uploads")));

// Image proxy for handling missing images
const imageProxyRouter = require("./routes/images/imageProxy");
app.use("/uploads", imageProxyRouter);

// Image blob router for serving images as blob data
const imageBlobRouter = require("./routes/images/imageBlob");
app.use("/api/images", imageBlobRouter);

//Test Server
app.get("/api", (req, res) => {
  res.send("BOOSTKE server running ✅!");
});

//ROUTES
//admins routes
const adminHashRouter = require("./routes/admins/hashPassword");
const adminLoginRouter = require("./routes/admins/login");
const adminDeleteShopRouter = require("./routes/admins/deleteShop");
const adminEditRouter = require("./routes/admins/editProfile");
const adminResetRouter = require("./routes/admins/resetPassword");
const adminChangePasswordRouter = require("./routes/admins/changePassword");
const adminFetchUsersRouter = require("./routes/admins/fetchAllUsers");
app.use("/api/admin", adminHashRouter);
app.use("/api/admin", adminLoginRouter);
app.use("/api/admin/shop", adminDeleteShopRouter);
app.use("/api/admin", adminEditRouter);
app.use("/api/admin", adminResetRouter);
app.use("/api/admin", adminChangePasswordRouter);
app.use("/api/admin/all", adminFetchUsersRouter);

//registration routes
const usersRegistrationRouter = require("./routes/registration/users");
const retailersRegistrationRouter = require("./routes/registration/retailers");
const landlordsRegistrationRouter = require("./routes/registration/landlords");
app.use("/api/user", usersRegistrationRouter);
app.use("/api/retailer", retailersRegistrationRouter);
app.use("/api/landlord", landlordsRegistrationRouter);

//login routes
const usersLoginRouter = require("./routes/login/users");
const retailersLoginRouter = require("./routes/login/retailers");
const landlordsLoginRouter = require("./routes/login/landlords");
app.use("/api/user", usersLoginRouter);
app.use("/api/retailer", retailersLoginRouter);
app.use("/api/landlord", landlordsLoginRouter);

//google routes
const usersGoogleRegRouter = require("./routes/registration/users");
app.use("/api/auth", usersGoogleRegRouter);

//reset-password routes
const userResetRouter = require("./routes/users/resetPassword");
const retailerResetRouter = require("./routes/retailers/resetPassword");
const landlordResetRouter = require("./routes/landlords/resetPassword");
app.use("/api/user", userResetRouter);
app.use("/api/retailer", retailerResetRouter);
app.use("/api/landlord", landlordResetRouter);

// Blog routes
const blogRouter = require("./routes/blog/blog");
app.use("/api/blog", blogRouter);

//edit profile
const userEditRouter = require("./routes/users/editProfile");
const retailerEditRouter = require("./routes/retailers/editProfile");
const landlordEditRouter = require("./routes/landlords/editProfile");
app.use("/api/user", userEditRouter);
app.use("/api/retailer", retailerEditRouter);
app.use("/api/landlord", landlordEditRouter);

//users routes
const usersPostListingRouter = require("./routes/users/postListing");
const usersDeleteListingRouter = require("./routes/users/deleteListing");
const usersUpdateListingRouter = require("./routes/users/updateListing");
app.use("/api/user/post", usersPostListingRouter);
app.use("/api/user/delete", usersDeleteListingRouter);
app.use("/api/user/update", usersUpdateListingRouter);

//landlords routes
const landlordsPropertiesPostRouter = require("./routes/properties/postProperty");
const landlordsDeletePropertiesRouter = require("./routes/properties/deleteProperty");
const landlordsUpdatePropertiesRouter = require("./routes/properties/updateProperty");
const landlordsPropertiesPostedRouter = require("./routes/properties/fetchYourProperties");
app.use("/api/landlord/post", landlordsPropertiesPostRouter);
app.use("/api/landlord/posted", landlordsPropertiesPostedRouter);
app.use("/api/landlord/delete", landlordsDeletePropertiesRouter);
app.use("/api/landlord/update", landlordsUpdatePropertiesRouter);

//shop routes
const createShopRouter = require("./routes/shops/createShop");
const deleteShopRouter = require("./routes/shops/deleteShop");
const updateShopRouter = require("./routes/shops/updateShop");
const getShopRouter = require("./routes/shops/getShop");
const getShopListings = require("./routes/shops/retrieveShopListings");
const getAllShopsRouter = require("./routes/shops/getAllShops");
const createShopListingRouter = require("./routes/shops/createListings");
app.use("/api/shop", createShopRouter);
app.use("/api/shop", deleteShopRouter);
app.use("/api/shop", updateShopRouter);
app.use("/api/shop", getShopRouter);
app.use("/api/shops", getAllShopsRouter);
app.use("/api/shop", createShopListingRouter);
app.use("/api/shop", getShopListings);

//properties routes
const getAllPropertiesRouter = require("./routes/properties/getAllProperties");
const getFilteredPropertiesRouter = require("./routes/properties/filters");
app.use("/api/properties", getAllPropertiesRouter);
app.use("/api/filter", getFilteredPropertiesRouter);

//listings routes
const getAllListingsRouter = require("./routes/listings/allListings");
const getFilteredListingsRouter = require("./routes/listings/filters");
const getDistinctListingsCategoriesRouter = require("./routes/listings/distinctCategories");
const getUserListingDetailRouter = require("./routes/listings/UserGetListing");
const getRetailerListingDetailRouter = require("./routes/listings/RetailerGetListing");
app.use("/api/listings", getAllListingsRouter);
app.use("/api/filter", getFilteredListingsRouter);
app.use("/api/user/from-listings", getUserListingDetailRouter);
app.use("/api/retailer/from-listings", getRetailerListingDetailRouter);
app.use("/api/listings", getDistinctListingsCategoriesRouter);

//search routes
const searchListingRouter = require("./routes/listings/search");
const searchPropertyRouter = require("./routes/properties/search");
const searchShopRouter = require("./routes/shops/search");
const universalSearchRouter = require("./routes/search/universal");
app.use("/api/listings", searchListingRouter);
app.use("/api/properties", searchPropertyRouter);
app.use("/api/shops", searchShopRouter);
app.use("/api/search", universalSearchRouter);

//messages
const MessagesRouter = require("./routes/messages/Chats");
const sendMessageRouter = require("./routes/messages/Contact");
app.use("/api/message", sendMessageRouter);
app.use("/api/message", MessagesRouter);

//count or stats routes
const countAllUsersRouter = require("./routes/stats/users");
const countAllRetailersRouter = require("./routes/stats/retailers");
const countAllLandlordsRouter = require("./routes/stats/landlords");
const countAllListingsRouter = require("./routes/stats/listings");
const countAllPropertiesRouter = require("./routes/stats/properties");
const countAllShopsRouter = require("./routes/stats/shops");
const countAllUnreadMessagesRouter = require("./routes/stats/unreadMessages");
const countAllCategoriesRouter = require("./routes/stats/categories");
app.use("/api/users", countAllUsersRouter);
app.use("/api/retailers", countAllRetailersRouter);
app.use("/api/landlords", countAllLandlordsRouter);
app.use("/api/listings", countAllListingsRouter);
app.use("/api/properties", countAllPropertiesRouter);
app.use("/api/shops", countAllShopsRouter);
app.use("/api/categories", countAllCategoriesRouter);
app.use("/api/messages", countAllUnreadMessagesRouter);

//mpesa routes
const mpesaRouter = require("./routes/mpesa/mpesa");
app.use("/api/mpesa", mpesaRouter);

//cart routes
const cartRouter = require("./routes/cart/cart");
app.use("/api/cart", cartRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

//web sockets for messaging
// Create an HTTP server using Express
const server = http.createServer(app);

// ======= WebSocket Server Setup =======

// Create a WebSocket server that attaches to our HTTP server.
// Clients should connect to ws://yourserver.com/ws?userId=YOUR_USER_ID
const wss = new WebSocketServer({ server, path: "/ws" });

// In-memory map to track connected clients by their user id.
const clients = new Map();

wss.on("connection", (ws, req) => {
  // Parse query parameters from the URL.
  // For example, if a client connects to ws://localhost:5000/ws?userId=123,
  // then userId will be "123"
  const query = req.url.split("?")[1];
  const params = new URLSearchParams(query);
  const userId = params.get("userId");

  if (userId) {
    // Store the connection in the clients map.
    clients.set(userId, ws);
    console.log(`New WebSocket connection for userId: ${userId}`);
  } else {
    console.log("Connection attempted without a userId parameter");
  }

  // When a message is received from a client
  ws.on("message", async (data) => {
    try {
      // Expect the incoming message to be a JSON string.
      // For example:
      // { "from": "123", "to": "456", "text": "Hello!" }
      console.log(JSON.parse(data));
      const msg = JSON.parse(data);

      // Save the message into the database.
      // Adjust the query/columns as needed for your schema.
      await pool.query(
        "INSERT INTO messages (from_user, to_user, from_user_type, to_user_type, text, timestamp, listing_id, listing_image_url, listing_title) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          msg.from,
          msg.to,
          msg.from_user_type,
          msg.to_user_type,
          msg.text,
          new Date(),
          msg.listing_ID,
          msg.listing_IMG_URL,
          msg.listing_title,
        ]
      );

      // Optionally, send the message to the recipient if they are connected.
      const recipientSocket = clients.get(msg.to);
      if (
        recipientSocket &&
        recipientSocket.readyState === recipientSocket.OPEN
      ) {
        recipientSocket.send(JSON.stringify(msg));
      }
    } catch (error) {
      console.error("Error processing incoming message:", error);
    }
  });

  // Cleanup when a client disconnects
  ws.on("close", () => {
    if (userId) {
      clients.delete(userId);
      console.log(`WebSocket disconnected for userId: ${userId}`);
    }
  });
});

// ======= Start the HTTP & WebSocket Server =======
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
