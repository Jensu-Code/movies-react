//atajo rf y tap
import styles from "./Search.module.css"
import { BsSearch } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
export function Search() {
    const query = useQuery();
    const search =query.get("search");
    const history = useHistory();//redireccionar la ruta
    
    const handleSubmit=(e)=>{
       e.preventDefault();
    };
    return (
        <form className={styles.searchContainer} onSubmit={handleSubmit}>
            <div className={styles.searchBox}>
                <input placeholder="Search-movies" 
                className={styles.searchInput} 
                type="text" 
                value={search==null? " ":search}
                onChange={(e)=>{
                     const value= e.target.value;
                     history.push("/?search="+value);
                }} 
                />
                <button className={styles.searchButton} type="submit"><BsSearch size={20}/></button>
            </div>
        </form>
    )
}

