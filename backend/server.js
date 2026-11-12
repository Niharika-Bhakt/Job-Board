
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const Application = mongoose.model(
    'Application',
    new mongoose.Schema({
        jobTitle: String,
        company: String,
        applicantName: String,
        date: String
    })
);

app.get('/', (req, res) => {
    res.send('Job Board Backend is Running!');
});

app.post('/api/applications', async (req, res) => {
    try {
        const newApp = new Application(req.body);
        await newApp.save();

        res.status(201).json({
            success: true,
            message: 'Application Saved!'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

app.get('/api/applications', async (req, res) => {
    try {
        const apps = await Application.find();
        res.status(200).json(apps);
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

async function startServer() {
    try {
        if (!MONGO_URI) {
            throw new Error('MONGO_URI missing in .env file');
        }

        await mongoose.connect(MONGO_URI);

        console.log('MongoDB Connected Successfully!');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error('Database Connection Failed:', err.message);
    }
}

startServer();
