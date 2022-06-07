import { useEffect, useState } from "react";
import { get } from "../utils/httpClient";
import { MovieCard } from "./MovieCard";
import styles from "./MoviesGrid.module.css"
import { Spinner } from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Empety } from "./Empty";

export function MoviesGrid({search}) {
    const [movies, setMovies] = useState([]);
    const [isLoding, setIsLoding] = useState(true);
    const [page,setPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    useEffect(() => {
      setIsLoding(true);
      const searchUrl= search
      ? "/search/movie?query=" + search + "&page=" + page
      :"/discover/movie?page=" + page;
      get(searchUrl).then((data) => {
        setMovies((prevMovies)=>prevMovies.concat(data.results));
        sethasMore(data.page<data.total_page);
        setIsLoding(false);
      });
    }, [search,page]);
    
    if(!isLoding && movies.length===0){
      return <Empety/>
    }

  return (
    <InfiniteScroll 
    dataLength={movies.length} 
    hasMore={hasMore} 
    next={()=>setPage((prevPage)=>prevPage + 1)}
    loader={<Spinner/>}>
    <ul className={styles.moviesGrid}>
      {movies.map((movie)=>(
           <MovieCard key={movie.id} movie={movie}/>
      ))}
    </ul>
    </InfiniteScroll>
  );
}
