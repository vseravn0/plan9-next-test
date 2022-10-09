import {useState} from "react";
import Intersection from "@components/app/IntersectionObserver";
import {fetchBooks} from "../../api/restServices/books";
import Link from "next/link";

export default function Books() {
    const [books, setBooks] = useState<any>([]);

    let count = 0;
    let page = 1;

    const getBooks = async () => {
        const result = await fetchBooks({page:page})
        count = result.count
        if(books.length < count){
            setBooks(books => [...books,...result.results])
            page += 1
        }
    }

    const getBook = async (id:string) => {
        const result = await fetchBooks({ids:id})
        console.log(result)
    }

    return (
    <>
        <ul>
            {books.map((item:any) => {
                return (
                  <Link key={item.id+3} href={`/books/${item.id}`}>
                      <li key={item.id} onClick={() => getBook(item.id)}>
                          {item.id}
                      </li>
                  </Link>
                )
            })}
        </ul>
        <Intersection emit={getBooks}/>
    </>
    )
}


