export const url = (url: string) => {
    return `http://localhost:5000/api/${url}`;
} 

const fetchData = (method: 'get', url: string) => {
    return fetch(url, {
        method: method
    }).then((value) => value.json()).catch((err) => console.log(err))
}

export default fetchData;