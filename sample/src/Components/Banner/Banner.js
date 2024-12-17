import React, { useEffect, useState } from 'react';
import { API_KEY, imageUrl } from '../../Constants/Constants';
import Youtube from 'react-youtube';
import axios from '../../axios';
import './Banner.css';

function Banner() {
    const [movie, setMovie] = useState(null);
    const [urlId, seturlId] = useState('');

    useEffect(() => {
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) => {
            const movies = response.data.results;
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            setMovie(randomMovie);
        });
    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    const handleBanner = (id) => {
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
            if (response.data.results.length !== 0) {
                seturlId(response.data.results[0]);
            } else {
                console.log('Trailer is not available...');
            }
        });
    };

    return (
        <>
            <div
                style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})` }}
                className="banner">
                <div className="content">
                    <h1 className="title">{movie ? movie.original_title || movie.name : ''}</h1>
                    <div className="banner-buttons">
                        <button onClick={() => handleBanner(movie.id)} className="button">
                            Play
                        </button>
                        <button className="button">My List</button>
                    </div>
                    <h1 className="description">{movie ? movie.overview : ''}</h1>
                </div>
                <div className="fade-bottom"></div>
            </div>

            {urlId && (
                <div className="youtube-container" onClick={() => seturlId('')}>
                    <Youtube opts={opts} videoId={urlId.key} />
                </div>
            )}
        </>
    );
}

export default Banner;
