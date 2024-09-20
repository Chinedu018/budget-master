const express = require('express');
const router = express.Router();

// Example route to get data
router.get('/data', async (req, res) => {
  try {
    // Sample response; replace with actual data retrieval
    res.json({ message: 'Data fetched successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

module.exports = router;
