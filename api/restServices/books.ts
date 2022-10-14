import axios from "axios"

interface IBooks {
     count: string,
     results: any[] // too lazy to count all the fields
}

interface IBooksParams {
     languages?: string,
     page?: number,
     ids?: string
}

export const fetchBooks = async (searchText:string,params:IBooksParams): Promise<IBooks> => {
     if(searchText){
          const result = await fetchSearchBooks(searchText,params)
          return result
     }
     const result = await fetchAllBooks(params)
     return result
}

export const fetchAllBooks = async (params: IBooksParams): Promise<IBooks> => {
     const {data: {count, results}}: { data: IBooks } = await axios.get('https://gutendex.com/books/', {params})
     return {count, results}
}

export const fetchSearchBooks = async (searchText: string, params: IBooksParams): Promise<IBooks> => {
     const {data: {count, results}}: { data: IBooks } = await axios.get(`https://gutendex.com/books/?search=${searchText}`, {params})
     return {count, results}
}
