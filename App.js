// U92725213

import React, { useState } from 'react';
import './App.css';

const movies = [
  { id: 1, title: 'Movie 1' },
  { id: 2, title: 'Movie 2' },
  { id: 3, title: 'Movie 3' },
];

function App() {
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [rating, setRating] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleRateMovie = (rating) => {
    setRating(rating);
    alert(`You rated ${selectedMovie.title} with ${rating} stars!`);
  };

  const handleMovieChange = (e) => {
    const movie = movies.find(m => m.id === parseInt(e.target.value));
    setSelectedMovie(movie);
    setRating(null);
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploadMessage('Image uploaded successfully!');
      setTimeout(() => setUploadMessage(''), 2000);
    }, 2000);
  };

  return (
    <div className="App">
      <div className="toolbar">
        <MovieSelector movies={movies} onMovieChange={handleMovieChange} />
        <RateMovieButton movie={selectedMovie} onRate={handleRateMovie} />
        <UploadButton onUpload={handleUpload} uploading={uploading} />
      </div>
      {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
    </div>
  );
}

const MovieSelector = ({ movies, onMovieChange }) => (
  <select onChange={onMovieChange}>
    {movies.map(movie => (
      <option key={movie.id} value={movie.id}>{movie.title}</option>
    ))}
  </select>
);

const RateMovieButton = ({ movie, onRate }) => (
  <div>
    <span>Rate {movie.title}: </span>
    {[1, 2, 3, 4, 5].map(star => (
      <button key={star} onClick={() => onRate(star)}>
        {star} {star === 1 ? 'Star' : 'Stars'}
      </button>
    ))}
  </div>
);

const UploadButton = ({ onUpload, uploading }) => (
  <button onClick={onUpload} disabled={uploading}>
    {uploading ? 'Uploading...' : 'Upload Image'}
  </button>
);

export default App;
