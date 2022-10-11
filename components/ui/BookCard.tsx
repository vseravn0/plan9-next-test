interface IBookCard {
    id?: number,
    img: string,
    title: string,
    author: string,
    downloads: number | string,
    className?:string
}

export default function BookCard({id, img, title, author, downloads,className}: IBookCard) {

    return (
        <div className={`p-3 border-2 rounded-md border-black flex flex-col text-center  h-auto w-56 ${className}`} key={id}>
            <img className="object-cover mb-3" src={img} alt={title}/>
            <span className="font-bold">{title}</span>
            <span className="italic">{author}</span>
            <span className="underline">{downloads}</span>
        </div>
    )
}
