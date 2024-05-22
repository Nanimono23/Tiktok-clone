const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    affiliate_url: String,
    uploadDate: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);

app.get('/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        console.log('Videos fetched successfully:', videos);
        res.status(200).json(videos);
    } catch (err) {
        console.error('Error fetching videos:', err);
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://192.168.0.165:${port}/`);
});
