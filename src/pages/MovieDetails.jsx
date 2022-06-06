import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { get } from "../utils/httpClient";
// import movie from "./movie.json"
import styles from "./MovieDetails.module.css"
import placeholder from "../PlaceHolder.png"
export function MovieDetails(){
    const { movieId } = useParams();
    const [isLoading,setIsLoading]=useState(true);
    const [movie, setMovie] = useState(null);
    
    useEffect(() => {
      setIsLoading(true);
      get("/movie/" + movieId).then((data) => {
        setMovie(data);
        setIsLoading(false);
      });
    }, [movieId]);
    
    if(isLoading){
        return <Spinner/>
    }
    // if (!movie) {
    //   return null;
    // }
   const imageUrl=movie.poster_path 
         ?"http://image.tmdb.org/t/p/w500"+movie.poster_path
         :placeholder;
   return <div className={styles.detailsContainer}>
       <img  className={styles.movieImage + " " +styles.col } src={imageUrl} alt={movie.title}/>
       <div className={`${styles.col} ${styles.movieDetails}`}>
           <p className={styles.firtsItem}><strong>Title:</strong> {movie.title}</p>
           <p>
               <strong>Genres: </strong>
               {movie.genres.map(genre=>
                    genre.name
               ).join(", ")}
           </p>
           <p><strong>Description:</strong> {movie.overview}</p>
       </div>
   </div> 
}