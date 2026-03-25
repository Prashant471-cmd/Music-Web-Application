import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../assets/AppLogo.png";
// import "./Album.css";

const Album = ({ token }) => {
  const { id } = useParams(); // Grabs the dynamic album ID from the URL
  const navigate = useNavigate();

  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      if (!token) return;

      try {
        const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch album');
        }

        const data = await response.json();
        setAlbum(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching album:", error);
        setIsLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [id, token]);

  if (isLoading) {
    return <div className="album-container" style={{ padding: '20px', color: 'white' }}>Loading album...</div>;
  }

  if (!album) {
    return <div className="album-container" style={{ padding: '20px', color: 'white' }}>Album not found.</div>;
  }

  return (
    <div className="album-container">
      {/* Header with Back Button, Custom Logo, and Icons */}
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>
            ←
          </button>
          <img src={logo} alt="Melo" className="header-logo" style={{ width: '90px', objectFit: 'contain' }} />
        </div>
        <div className="header-icons" style={{ display: 'flex', gap: '15px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5,1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 4c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/></svg>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.67 0-5.06-1.1-6.8-2.84.14-1.9 4.14-2.96 6.8-2.96s6.66 1.06 6.8 2.96C17.06 18.9 14.67 20 12 20z"/></svg>
        </div>
      </header>

      {/* Dynamic Album Cover */}
      <div className="album-cover-wrapper">
        <img src={album.images[0]?.url} alt={album.name} className="main-album-art" />
      </div>

      {/* Dynamic Album Info */}
      <div className="album-header-info">
        <h1 className="album-title">{album.name}</h1>
        <p className="album-artist">Album by {album.artists.map(a => a.name).join(', ')}</p>
      </div>

      {/* Action Buttons (Your SVGs) */}
      <div className="album-actions-row">
        <div className="action-icons" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>...</span>
        </div>
        <div className="big-play-btn" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </div>
      </div>

      {/* Dynamic Track List */}
      <div className="album-track-list">
        {album.tracks.items.map(track => (
          <div key={track.id} className="track-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <div className="track-text">
              <div className="list-title" style={{ fontSize: '1rem', fontWeight: 'bold' }}>{track.name}</div>
              <div className="list-subtitle" style={{ color: '#a0a0a0', fontSize: '0.85rem' }}>
                {track.artists.map(a => a.name).join(', ')}
              </div>
            </div>
            
            {/* Track Duration and Options */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>
                {Math.floor(track.duration_ms / 60000)}:
                {((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>...</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;