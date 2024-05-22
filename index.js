const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

// MongoDBの接続
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MongoDB接続確認
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// ミドルウェア設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 動画モデルの作成
const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    videoUrl: String,
    uploadDate: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);

// 動画取得ルート
app.get('/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).send(err);
    }
});

// サーバー起動
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
