import { Category } from "../store/types"

export const fetchJokeCategories: (method: "get" , url: string ) =>Promise<Array<Category>> = (method, url) => {
    return fetch(url, {
        method: method
    }).then((value) => value.json()).catch((err) => console.log(err))
}