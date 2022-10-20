const getFromLocalStorage = (name: string) => {
    if (
        localStorage.getItem(name) &&
        localStorage.getItem(name)!.length >= 1
      ) {
        const elements = localStorage.getItem(name) as string;
        return JSON.parse(elements);
      } else {
        return [];
      }

      
}

export default getFromLocalStorage