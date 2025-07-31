const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ✅ Use the correct path for your model
const Score = require('./scores');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection string
mongoose.connect('mongodb://localhost:27017/quizDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Error:', err));

// ✅ Route to save score
app.post('/submit-score', async (req, res) => {
  const { name, score } = req.body;
  try {
    const newScore = new Score({ name, score });
    await newScore.save();
    res.status(201).json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving score' });
  }
});

// ✅ Start server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
