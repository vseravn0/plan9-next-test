import axios from "axios"

export const fetchBooks = async (params:any):Promise<any> => {
     console.log(params)
     const {data:{count,results}} =  await axios.get('https://gutendex.com/books/', {params})
     return {count,results}
}

export const fetchSearchBook = async (params:any):Promise<any> => {
     const {data:{count,results}} =  await axios.get(`https://gutendex.com/books/?search=${params}`)
     return {count,results}
}
