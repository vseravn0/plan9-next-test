import {useEffect, useState, useRef} from "react";
import usePreviouse from "../../hooks/UsePrevious";
import {fetchBooks} from "../../api/restServices/books";
import useIntersectionObserver from "../../hooks/UseIntersectionObserver";
import useDebounce from "../../hooks/UseDebounce";
import {useLocalContext} from "@components/localeProvider";
import Link from "next/link";

import BookCard from "@components/ui/BookCard";

export default function Books() {
    const {locale} = useLocalContext()
    const [books, setBooks] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
    const [searchText, setSearchText] = useState<string>('');
    const elementRef = useRef<HTMLDivElement | null>(null)
    const entry = useIntersectionObserver(elementRef, {})

    let count:string | number = 0;

    const prevLocale = usePreviouse(locale)
    let prevPage = usePreviouse(page)
    const prevSearchText = usePreviouse(searchText)
    let isLoading = false

    function compare(a1:string[], a2:string[]) {
        return a1.length == a2.length && a1.every((v,i)=>v === a2[i])
    }

    const setDefaultFetchBooksState = () => {
        setPage(1);
        setBooks( []);
    }

    useEffect(() => {
        if(entry && entry?.isIntersecting && books.length !== 0){
            setPage(prevPage => prevPage + 1)
        }
    },[entry?.isIntersecting])

    useEffect(() => {
        if(prevLocale && !compare(locale,prevLocale) || prevSearchText !== searchText){
            setDefaultFetchBooksState()
        }
        if(prevPage !== page && !isLoading || prevSearchText !== searchText || prevLocale && !compare(locale,prevLocale)){
            getBooks()
        }
    }, [page,locale,searchText])

    async function getBooks(){
        isLoading = true
        try {
            const result = await fetchBooks(searchText,{page,languages:locale.join(',')})
            count = result.count
            if (books.length < count) {
                setBooks((books: any) => [...books, ...result.results])
            }
        } catch (e) {
            console.log(e)
        } finally {
            isLoading = false
        }
    }

    const handler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(() => e.target.value)
    }

    const debouncedHandler = useDebounce(handler, 500)

    return (
        <>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 mx-auto mb-14"
                   onChange={debouncedHandler}/>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-4">
                {books.map((item: any) => {
                    return (
                        <Link
                            key={item.id}
                            href={{
                                pathname: `/books/${item.id}`, query: {
                                    id: item.id,
                                    title: item.title,
                                    authors: item.authors[0]?.name,
                                    downloads: item.download_count,
                                    img: item.formats['image/jpeg']
                                }
                            }
                            }>
                            <li className="flex">
                                <BookCard
                                    id={item.id}
                                    img={item.formats['image/jpeg']}
                                    title={item.title}
                                    author={item.authors[0]?.name}
                                    downloads={item.download_count}
                                />
                            </li>
                        </Link>
                    )
                })}
            </ul>
            <div className="h-px w-full" ref={elementRef}/>
        </>
    )
}


