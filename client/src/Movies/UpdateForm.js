import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    const movieToEdit = props.movies.find(
        movie => `${movie.id}` === props.match.params.id
    )
    // console.log(props.movies, movieToEdit);
    if (movieToEdit) {
      setMovie(movieToEdit);
    }
  }, [props.movies, props.match.params.id]);

  const handleChange = e => {
    setMovie({
        ...movie,
        [e.target.name]: e.target.value
    });
  };

  const handleStars = index => e => {
    e.preventDefault();
    const newStars = [...movie.stars];
    newStars[index] = e.target.value;
    setMovie({
        ...movie,
        stars: newStars
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the movie
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res)
        props.updateMovies(res.data)
        props.history.push(`/movies/${movie.id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='flex'>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          value={movie.title}
        />

        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="Director"
          value={movie.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={handleChange}
          placeholder="Metascore"
          value={movie.metascore}
        />

        <input
          type="text"
          name="stars"
          onChange={handleStars}
          placeholder="Stars"
          value={movie.stars}
        />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
