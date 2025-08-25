// const express = require("express");
// // const unirest = require("unirest");
// //const pool = require("../../db");
// const axios = require("axios");

// const router = express.Router();

// const consumerKey = "oHagB8zcLnBA4MAZUGaRGOZvMpG6HpM6CEzAwqOFA3K1XMmX";
// const consumerSecret = "z7IjGteuEzs7UWhtiRFYDm5F0CpnYKPgFunbDDCwcJZhopkCNkf1JVbHbG7epZ5t";

// const generateTimestamp = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, "0");
//     const date = String(now.getDate()).padStart(2, "0");
//     const hours = String(now.getHours()).padStart(2, "0");
//     const minutes = String(now.getMinutes()).padStart(2, "0");
//     const seconds = String(now.getSeconds()).padStart(2, "0");
//     return `${year}${month}${date}${hours}${minutes}${seconds}`;
// };

// const generatePassword = (shortcode, passkey, timestamp) => {
//     const dataToEncode = `${shortcode}${passkey}${timestamp}`;
//     return Buffer.from(dataToEncode).toString("base64");
// };

// // Generate the Base64-encoded credentials
// const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

// // Function to get the access token
// async function getAccessToken() {
//     try {
//         const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
//             headers: {
//                 "Authorization": `Basic ${auth}`, // Pass the encoded credentials
//             },
//         });

//         console.log("Access Token:", response.data.access_token);
//         console.log("Expires In:", response.data.expires_in);

//         return response.data.access_token;
//     } catch (error) {
//         console.error("Error fetching access token:", error.response?.data || error.message);
//     }
// }

// // Endpoint to initiate STK push
// router.post("/initiateTransaction", async (req, res) => {
//     const { mobile, amount, accountReference, transactionDesc } = req.body;

//     try {
//         const timestamp = generateTimestamp();
//         const token = await getAccessToken();
//         const password = generatePassword(174379, "YourPasskeyHere", timestamp);

//         const response = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
//             BusinessShortCode: 174379,
//             Password: password,
//             Timestamp: timestamp,
//             TransactionType: "CustomerPayBillOnline",
//             Amount: amount,
//             PartyA: mobile,
//             PartyB: 174379,
//             PhoneNumber: mobile,
//             CallBackURL: "https://boostke.co.ke/profile",
//             AccountReference: accountReference,
//             TransactionDesc: transactionDesc,
//         }, {
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + token,
//             },
//         });

//         console.log("STK Push Response:", response.data);
//         res.json({ message: "Transaction initiated", response: response.data });
//     } catch (error) {
//         console.error("STK Push Error:", error.response?.data || error.message);
//         res.status(500).json({ message: "Failed to initiate STK push", error: error.response?.data || error.message });
//     }
// });

// module.exports = router;