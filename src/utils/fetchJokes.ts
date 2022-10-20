export const fetchJokes = (method: 'get', url: string) => {
    return fetch(url, {
        method
    }).then((value)=> value.json()).catch((err) => console.log(err))
}