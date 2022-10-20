const addAction = (text: string) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    let minutes = date.getMinutes();
    let newMinutes;

    if(minutes < 10) {
        newMinutes = '0' + minutes;
    } else {
        newMinutes = minutes.toString();
    }
    return {
        text,
        year,
        month,
        day,
        hour,
        newMinutes
    }
}

export default addAction;