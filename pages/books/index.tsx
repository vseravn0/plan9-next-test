import {useContext, useEffect, useState} from "react";
import usePreviouse from "../../hooks/UsePrevious";
import Intersection from "@components/app/IntersectionObserver";
import {fetchBooks, fetchSearchBook} from "../../api/restServices/books";
import useDebounce from "../../hooks/UseDebounce";
import LocaleProvider from "@components/localeProvider";
import Link from "next/link";
import Image from "next/image";

export default function Books() {
    const [books, setBooks] = useState<any>([]);
    const [search, setSearch] = useState<any>('');
    const [locale] = useContext(LocaleProvider)

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
    }

    const handler = async (e) => {
        const result = await fetchSearchBook(e.target.value, {languages: locale.join(',')});
        setBooks(result.results)
    }

    const debouncedHandler = useDebounce(handler, 1500)

    return (
        <>
            <p>{search}</p>
            <input onChange={debouncedHandler}/>
            <ul>
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
                            <li key={item.id} onClick={() => getBook(item.id)}>
                                <img src={item.formats['image/jpeg']} alt={item.title}/>
                                <span>{item.title}</span>
                                <span>{item.authors[0]?.name}</span>
                                <span>{item.download_count}</span>
                            </li>
                        </Link>
                    )
                })}
            </ul>
            <Intersection emit={getBooks}/>
        </>
    )
}


