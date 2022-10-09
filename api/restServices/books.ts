import axios from "axios"

export const fetchBooks = async (params:any):Promise<any> => {
     const {data:{count,results}} =  await axios.get('https://gutendex.com/books/',{params});
     return {count,results}
}
