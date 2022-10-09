import {useState} from "react";
import axios from "axios";
import Intersection from "@components/app/IntersectionObserver";

export default function Books() {
    const [books, setBooks] = useState<any>([]);

    let count = 0;
    let page = 1;

    const fetchBooks = async () => {
        const {data} = await axios.get('https://gutendex.com/books/',{params:{page}})
        count = data.count
        if(books.length < count){
            setBooks(books => [...books,...data.results])
            page += 1
        }
    }

    return (
    <>
        <ul>
            {books.map((item:any) => {
                return (
                    <li key={item.id}>
                        {item.id}
                    </li>
                )
            })}
        </ul>
        <Intersection emit={fetchBooks}/>
    </>
    )
}


