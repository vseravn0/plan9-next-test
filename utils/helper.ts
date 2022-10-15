export const compare = (a1:string[], a2:string[]) => {
    return a1.length == a2.length && a1.every((v,i)=>v === a2[i])
}
