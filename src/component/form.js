import React, {useState, useEffect, useCallback} from 'react';
import ReturnMovies from './returnMovies';

export const FormComponent = () => {
    const [returnMovies, setReturnMovie] = useState([]);
    const [movieText, setMovie] = useState('');
    const key = 'e25361da';
     //function to update name
     const updateMovie = (e) => {
        setMovie(e.target.value); 
    }

    const searchMovie = useCallback(
        () => {
            fetch(`http://www.omdbapi.com/?apikey=${key}&s=${movieText}`)
            .then(res => res.json())
            .then(resMovie => {
                setReturnMovie(resMovie);
                setMovie('');
                console.log(returnMovies);
            })
            .catch(err => {
                console.log(err);
            })
        },
        [movieText, returnMovies]
    )
    
    useEffect(() => {
        searchMovie();
    }, [searchMovie]);

    return(
       <div>
            <form id="movieForm" onSubmit={searchMovie}>
                <div className="form-group">
                    <label>Enter a search word</label>
                    <input type="text" className="form-control" value={movieText} onChange = {updateMovie} name="movieText" placeholder="Enter a movie keyword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            
       </div>
    )
}