import {useRouter} from 'next/router'
import {useState, useEffect} from "react";
import BookCard from "@components/ui/BookCard";

export default function PostPage() {
    const router = useRouter()
    const [opacity, setOpacity] = useState<string>('opacity-100')

    const checkIsReadBook = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const storageBooks = JSON.parse(localStorage.getItem('booksRead'))
        if (storageBooks && storageBooks.includes(router.query.id as string)) {
            setOpacity('opacity-30')
        }
    }

    const setBookInStorage = (id: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const booksRead = JSON.parse(localStorage.getItem('booksRead'))
        if (!booksRead) {
            localStorage.setItem('booksRead', JSON.stringify([id]))
            return
        }
        if (!booksRead.includes(id)) {
            localStorage.setItem('booksRead', JSON.stringify([...booksRead, id]))
        }
    }

    useEffect(() => {
        checkIsReadBook()
        return () => {
            setBookInStorage(router.query.id as string)
        }
    }, [])

    return (
        <div className="flex justify-center">
            <BookCard
                className={`${opacity}`}
                img={router.query.img! as string}
                title={router.query.title! as string}
                author={router.query.author! as string}
                downloads={router.query.downloads! as string}
            />
        </div>
    )
}
