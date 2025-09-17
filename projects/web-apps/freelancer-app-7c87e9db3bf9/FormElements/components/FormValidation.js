export const ErrorMessage = (validation, min, max) => {
    switch(validation){
        case "alphanumeric": return "Please enter alphanumeric characters only"

        case "alphabetic": return "Please enter alphabets only"

        case "alphabets": return "Please enter alphabets only"

        case "numbers": return "Please enter only numeric values"

        case "phone": return "Please enter valid phone numeric"

        case "numeric": return "Please enter only numeric values"

        case "numberic": return "Please enter only numeric values"

        case "currency": return "Please enter only numeric values like n.xx"
        
        case "url": return "Please enter the valid URL"

        case "email": return "Please enter a valid Email"

        case "numberRange": return "Please enter a value within range " + min + " and " + max

        default: return null
    }
}

export const Validation = (type, text) => {
    switch(type){
        case "alphanumeric": return /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(text)

        case "alphabetic": return /^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/.test(text)

        case "alphabets": return /^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/.test(text)

        case "numbers": return /^(|-?\d+)$/.test(text)

        case "numeric": return /^[0-9_]*$/.test(text)

        case "numberic": return /^[0-9_]*$/.test(text)

        case "url": return text.length > 0 ? /(https?:\/\/)?(www\.)?[a-z0-9-]+\.(com|org)(\.[a-z]{2,3})?/.test(text) : true

        case "currency": return /^\d*\.?\d{0,2}$/.test(text)

        case "email": return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(text)

        default: return true
    }
}