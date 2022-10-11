import { useRouter } from 'next/router'

export default function PostPage() {
    const router = useRouter()

    return (
        <>
            <h2>{router.query.title}</h2>
            <h3>{router.query.authors}</h3>
            <h4>{router.query.downloads}</h4>
            <h5>{router.query.img}</h5>
        </>
    )
}
