import {RiEmotionUnhappyLine} from "react-icons/ri";
import styles from "./Empty.module.css"
export function Empety() {
    return (
        <div>
            <div className={styles.empty}>
            No results
           </div>
           <div className={styles.emoji}><RiEmotionUnhappyLine/></div>
        </div>
       
       
    )
}
