import React, {useState} from "react";
import MovieCards from "./movieCards.js";

export default function SearchMovies() {
    //states- input query, movies
    const [query, setQuery] = useState('');

    //create the state for movies, and update that state appropiate
    const [movies, setMovies] = useState([]);

    const cariFilm = async(e) => {
        e.preventDefault();
        console.log("Submitting");

        // const query = "Jurassic Park";
        const apiKey = "5aaa51cf2004e308459876ae13cfe4f1";
        // const lang = "en-US";
        const lang = "id";
        const adultMovies = false;
        const page = 1;

        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${lang}&query=${query}&page=${page}&include_adult=${adultMovies}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            setMovies(data.results);
        } catch(ex) {
            console.error(ex);
        }
    }

    return (
        <>
            <form className="form" onSubmit={cariFilm}>
                <label className="label" htmlFor="query">Judul Film</label>
                <input 
                    className="input" 
                    type="text" 
                    name="query" 
                    placeholder="contoh: Nikah Yuk!" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <button className="button" type="submit">Cari Film</button>
            </form>

            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCards movie={movie} key={movie.id} />
                ))}
            </div>
        </>
    )
}
