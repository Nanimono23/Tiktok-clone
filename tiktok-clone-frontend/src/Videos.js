import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        axios.get(`${apiBaseUrl}/videos`)
            .then(response => {
                console.log(response.data);
                setVideos(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the videos!', error);
            });
    }, [apiBaseUrl]);

    return (
        <div className="Videos">
            <h1>Videos</h1>
            <div>
                {videos.map(video => (
                    <div key={video._id} className="Video-item">
                        <h2>{video.title}</h2>
                        <p>{video.description}</p>
                        <video controls playsInline>
                            <source src={video.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {video.affiliate_url && (
                            <p>
                                <a href={video.affiliate_url} target="_blank" rel="noopener noreferrer">Affiliate Link</a>
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Videos;
