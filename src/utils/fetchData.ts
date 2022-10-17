import { Category } from "../store/mainReducer"

export const fetchData: (method: "get" | 'put' | 'post' | 'delete', url: string ) =>Promise<Array<Category>> = (method, url) => {
    return fetch(url, {
        method: method
    }).then((value) => value.json())
}