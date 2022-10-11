import {useEffect, useState} from "react";
import usePreviouse from "../../hooks/UsePrevious";
import Intersection from "@components/app/IntersectionObserver";
import {fetchBooks, fetchSearchBook} from "../../api/restServices/books";
import useDebounce from "../../hooks/UseDebounce";
import {useLocalContext} from "@components/localeProvider";
import Link from "next/link";

export default function Books() {
    const [books, setBooks] = useState<any>([]);
    // const [search, setSearch] = useState<any>('');
    const {locale} = useLocalContext()

    let count = 0;
    let page = 1;

    const prevLocale = usePreviouse(locale)

    useEffect(() => {
        if (prevLocale !== locale) {
            setBooks([])
            const test = async () => {
                await getBooks()
            }
            test()
        }
    }, [locale])

    const getBooks = async () => {
        if (locale.length && prevLocale !== locale) {
            const result = await fetchBooks({page: page, languages: locale.join(',')})
            count = result.count
            if (books.length < count) {
                setBooks(books => [...books, ...result.results])
                page += 1
            }
        }
    }

    const getBook = async (id: string) => {
        await fetchBooks({ids: id})
        const booksRead = JSON.parse(localStorage.getItem('booksRead'))
        if(!booksRead) {
            localStorage.setItem('booksRead',JSON.stringify([id]))
            return
        }
        if(!booksRead.includes(id)){
            localStorage.setItem('booksRead',JSON.stringify([...booksRead,id]))
        }

    }

    const handler = async (e) => {
        const result = await fetchSearchBook(e.target.value, {languages: locale.join(',')});
        setBooks(result.results)
    }

    const debouncedHandler = useDebounce(handler, 1500)

    return (
        <>
            {/*<input onChange={debouncedHandler}/>*/}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-4">
                {books.map((item: any) => {
                    return (
                        <Link
                            key={item.id + 3}
                            href={{
                                pathname: `/books/${item.id}`, query: {
                                    title: item.title,
                                    authors: item.authors[0]?.name,
                                    downloads: item.download_count,
                                    img: item.formats['image/jpeg']
                                }
                            }
                            }>
                            <li className="p-3 border-2 rounded-md border-black flex flex-col text-center  h-auto w-56" key={item.id} onClick={() => getBook(item.id)}>
                                <img className="object-cover mb-3" src={item.formats['image/jpeg']} alt={item.title}/>
                                <span className="font-bold">{item.title}</span>
                                <span className="italic">{item.authors[0]?.name}</span>
                                <span className="underline">{item.download_count}</span>
                            </li>
                        </Link>
                    )
                })}
            </ul>
            <Intersection emit={getBooks}/>
        </>
    )
}


