import {useState, useEffect} from "react";
import axios from "axios";

export default function Books() {
    const [books, setBooks] = useState([]);

     useEffect(() => {
        const fetchBooks = async () => {
            const {data: {results}} = await axios.get('https://gutendex.com/books/')
            setBooks(results)
        }
        fetchBooks();
    },[])

    return (
        <ul>
            {books.map((item:any) => {
                return (
                <li key={item.id}>
                    {item.id}
                </li>
                )
            })}
        </ul>
    )
}


