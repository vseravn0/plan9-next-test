import {useEffect, useState} from "react";
import usePreviouse from "../../hooks/UsePrevious";
import IntersectionComponent from "@components/app/IntersectionComponent";
import {fetchBooks, fetchSearchBook} from "../../api/restServices/books";
import useDebounce from "../../hooks/UseDebounce";
import {useLocalContext} from "@components/localeProvider";
import Link from "next/link";

import BookCard from "@components/ui/BookCard";

export default function Books() {
    const [books, setBooks] = useState<any>([]);
    const {locale} = useLocalContext()

    let count:string | number = 0;
    let page:string | number = 1;

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
            <IntersectionComponent emit={getBooks}/>
        </>
    )
}


