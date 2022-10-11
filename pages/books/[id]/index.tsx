import {useRouter} from 'next/router'
import BookCard from "@components/ui/BookCard";

export default function PostPage() {
    const router = useRouter()

    return (
        <div className="flex justify-center">
            <BookCard
                img={router.query.img! as string}
                title={router.query.title! as string}
                author={router.query.author! as string}
                downloads={router.query.downloads! as string}
            />
        </div>
    )
}
