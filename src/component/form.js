import React, {useState, useEffect} from 'react';
import ReturnMovies from './returnMovies';

export const FormComponent = () => {
    const [returnMovies, setReturnMovie] = useState([]);
    const [movieText, setMovie] = useState('');
    const [queryString, setQuery] = useState('best man');
    const key = 'e25361da';
     //function to update name
     const updateMovie = (e) => {
        setMovie(e.target.value); 
    }

    const updateQuery = e => {
        e.preventDefault();
        setQuery(movieText);
    }
    
    useEffect(() => {
        fetch(`http://www.omdbapi.com/?apikey=${key}&s=${queryString}`)
        .then(res => res.json())
        .then(resMovie => {
            setReturnMovie(resMovie);
            setMovie('');
            console.log(returnMovies);
        })
        .catch(err => {
            console.log(err);
        })
    }, [queryString, returnMovies])

    return(
       <div>
            <form id="movieForm" onSubmit={updateQuery}>
                <div className="form-group">
                    <label>Enter a search word</label>
                    <input type="text" className="form-control" value={movieText} onChange = {updateMovie} name="movieText" placeholder="Enter a movie keyword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {
                returnMovies.map(returnMovie => (
                    <ReturnMovies />
                ))
            }
       </div>
    )
}