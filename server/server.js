import express, { json } from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(json());

// keep running into 429 error fetching too many times
// couple of things to try to do to overcome this:
// store what's fetched into something so that I pull from there instead of refresh
// limit the number of times 
// if i see the 429 error just pull directly from backupQuestions
async function retry429(url, maxNumberOfRetries = 3, delay = 1000) {
    let numberOfRetries = 0;
    while (numberOfRetries < maxNumberOfRetries) {
        try {
            const response = await fetch(url);
            if (response.status === 429) {
                numberOfRetries++;
                console.log(`Too Many Requests (Retry ${numberOfRetries}/${maxNumberOfRetries}). Retrying in ${delay / 1000} seconds.`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
            } else {
                return response;
            }
        } catch (error) {
            console.error("Fetch error:", error);
            numberOfRetries++;
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }
    }
    throw new Error("Max retries exceeded.");
}

app.get('/trivia', async (req, res) => {
    console.log("Amount:", req.query.amount);
    console.log("Category:", req.query.category);
    console.log("Difficulty:", req.query.difficulty);
    console.log("Type:", req.query.type);

    const { amount, category, difficulty, type } = req.query;
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

    console.log("Constructed URL:", url);

    try {
        const response = await retry429(url);
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