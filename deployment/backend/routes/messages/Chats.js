const express = require('express');
const router = express.Router();
const pool = require("../../db");

// Get chat history for a specific user
router.get('/chats/:user_id', async (req, res) => {
  const userId = req.params.user_id;

  try {
    const result = await pool.query(
      `SELECT * FROM messages 
       WHERE from_user = $1 OR to_user = $1
       ORDER BY timestamp ASC`,
      [userId]
    );
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error getting messages for this user from the database:', error);
    res.status(500).json({ error: 'Failed to retrieve messages for this user. Please try again later.' });
  }
});

// Endpoint to get a user's full name based on type and id
router.get('/display-name/:user_type/:user_id', async (req, res) => {
  const { user_type, user_id } = req.params;
  try {
    let query, params;
    if (user_type === 'user') {
      query = 'SELECT full_name FROM users WHERE user_id = $1';
      params = [user_id];
    } else if (user_type === 'retailer') {
      query = 'SELECT full_name FROM retailers WHERE retailer_id = $1';
      params = [user_id];
    } else {
      return res.status(400).json({ error: 'Invalid user type' });
    }
    const result = await pool.query(query, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ full_name: result.rows[0].full_name });
  } catch (error) {
    console.error('Error fetching display name:', error);
    res.status(500).json({ error: 'Failed to fetch display name' });
  }
});

// Conversation route: Fetch conversation history between two users.
router.get('/conversation/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;
  
  try {
    const result = await pool.query(
      `SELECT * FROM messages
       WHERE (from_user = $1 AND to_user = $2)
          OR (from_user = $2 AND to_user = $1)
       ORDER BY timestamp ASC`,
      [user1, user2]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching conversation history:', error);
    res.status(500).json({ error: 'Failed to fetch conversation history. Please try again later.' });
  }
});

module.exports = router;