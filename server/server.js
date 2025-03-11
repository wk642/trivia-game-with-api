import express, { json } from 'express';
import cors from 'cors';
import retry429 from '../common/retry.js';
import { questions } from '../data/opentdb.js';
const app = express();
const port = 5000;

app.use(cors());
app.use(json());

app.get('/trivia', async (req, res) => {
    const { amount, category, difficulty, type } = req.query;

    // logging the user's parameters being passed in
    console.log("Amount:", req.query.amount);
    console.log("Category:", req.query.category);
    console.log("Difficulty:", req.query.difficulty);
    console.log("Type:", req.query.type);

    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

    // logging the url that is using
    console.log("Constructed URL:", url);

    try {
        const response = await retry429(url, questions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API response:", data);
        res.json(data);
    } catch (error) {
        console.error("Error fetching trivia questions:", error);
        res.status(500).json({ error: "Failed to fetch trivia questions." });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});