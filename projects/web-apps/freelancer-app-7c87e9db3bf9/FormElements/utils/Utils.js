export const capitalizeFirstLetter = (str) => {
    try {
        if (typeof str === 'string')
            return str.charAt(0).toUpperCase() + str.slice(1);
        else
            return str.toString();
    } catch (error) {
        console.log(error)
    }
}