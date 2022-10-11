import axios from "axios"

interface IBooks {
     count: string,
     results: any[] // too lazy to count all the fields
}

interface IBooksParams {
     languages?: string[],
     page?: string,
     ids?: string
}

export const fetchBooks = async (params: IBooksParams): Promise<IBooks> => {
     const {data: {count, results}}: { data: IBooks } = await axios.get('https://gutendex.com/books/', {params})
     return {count, results}
}

export const fetchSearchBook = async (searchText: string, params: IBooksParams): Promise<IBooks> => {
     const {data: {count, results}}: { data: IBooks } = await axios.get(`https://gutendex.com/books/?search=${searchText}`, {params})
     return {count, results}
}
