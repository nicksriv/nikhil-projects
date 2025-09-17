import { differenceInSeconds } from 'date-fns';

export const convertHexToRGB = (hex) => {
    // check if it's a rgba
    if (hex.match('rgba')) {
        let triplet = hex.slice(5).split(',').slice(0, -1).join(',')
        return triplet
    }

    let c
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')

        return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')
    }
}

export function debounce(func, wait, immediate) {
    var timeout
    return function () {
        var context = this,
            args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }, wait)
        if (immediate && !timeout) func.apply(context, args)
    }
}

export function isMobile() {
    if (window) {
        return window.matchMedia(`(max-width: 767px)`).matches
    }
    return false
}

export function isMdScreen() {
    if (window) {
        return window.matchMedia(`(max-width: 1199px)`).matches
    }
    return false
}

function currentYPosition(elm) {
    if (!window && !elm) {
        return
    }
    if (elm) return elm.scrollTop
    // Firefox, Chrome, Opera, Safari
    if (window.pageYOffset) return window.pageYOffset
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop
    return 0
}

function elmYPosition(elm) {
    var y = elm.offsetTop
    var node = elm
    while (node.offsetParent && node.offsetParent !== document.body) {
        node = node.offsetParent
        y += node.offsetTop
    }
    return y
}

export function scrollTo(scrollableElement, elmID) {
    var elm = document.getElementById(elmID)

    if (!elmID || !elm) {
        return
    }

    var startY = currentYPosition(scrollableElement)
    var stopY = elmYPosition(elm)

    var distance = stopY > startY ? stopY - startY : startY - stopY
    if (distance < 100) {
        scrollTo(0, stopY)
        return
    }
    var speed = Math.round(distance / 50)
    if (speed >= 20) speed = 20
    var step = Math.round(distance / 25)
    var leapY = stopY > startY ? startY + step : startY - step
    var timer = 0
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout(
                (function (leapY) {
                    return () => {
                        scrollableElement.scrollTo(0, leapY)
                    }
                })(leapY),
                timer * speed
            )
            leapY += step
            if (leapY > stopY) leapY = stopY
            timer++
        }
        return
    }
    for (let i = startY; i > stopY; i -= step) {
        setTimeout(
            (function (leapY) {
                return () => {
                    scrollableElement.scrollTo(0, leapY)
                }
            })(leapY),
            timer * speed
        )
        leapY -= step
        if (leapY < stopY) leapY = stopY
        timer++
    }
    return false
}

export function getTimeDifference(date) {
    let difference = differenceInSeconds(new Date(), date)

    if (difference < 60) return `${Math.floor(difference)} sec`
    else if (difference < 3600) return `${Math.floor(difference / 60)} min`
    else if (difference < 86400) return `${Math.floor(difference / 3660)} h`
    else if (difference < 86400 * 30)
        return `${Math.floor(difference / 86400)} d`
    else if (difference < 86400 * 30 * 12)
        return `${Math.floor(difference / 86400 / 30)} mon`
    else return `${(difference / 86400 / 30 / 12).toFixed(1)} y`
}

export function generateRandomId() {
    let tempId = Math.random().toString()
    let uid = tempId.substr(2, tempId.length - 1)
    return uid
}

export function getQueryParam(prop) {
    var params = {}
    var search = decodeURIComponent(
        window.location.href.slice(window.location.href.indexOf('?') + 1)
    )
    var definitions = search.split('&')
    definitions.forEach(function (val, key) {
        var parts = val.split('=', 2)
        params[parts[0]] = parts[1]
    })
    return prop && prop in params ? params[prop] : params
}

export function classList(classes) {
    return Object.entries(classes)
        .filter((entry) => entry[1])
        .map((entry) => entry[0])
        .join(' ')
}

export const capitalizeFirstLetter = (str) => {
    try {
        if (typeof str === 'string') {
            if (str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            } else {
                return str;
            }
        } 
    } catch (error) {
        console.log(error)
    }
}
export const capitalize = ([first, ...rest], lowerRest = false) =>
    first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

export function validateEmail(value) {
    let error = false;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = true;
    }
    return error;
}
export function validateMobile(value) {
    let error = false;
    if (value && (value.length < 10 || value.length > 10)) {
        error = true;
    }
    return error;
}
export function validatePan(value) {
    let error = false;
    if (!/([A-Z]){5}([0-9]){4}([A-Z]){1}$/.test(value)) {
        error = true;
    }
    if (value.length > 10) {
        error = true;
    }
    return error;
}
export function validateAadhar(value) {
    let error = false;
    if (!/^\d{4}\d{4}\d{4}$/i.test(value)) {
        error = true;
    }
    return error;
}
export function validateIfsc(value) {
    let error = false;
    if (!/^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/i.test(value)) {
        error = true;
    }
    return error;
}
export function validatePin(value) {
    let error = false;
    if (value.length > 6 || value.length < 6) {
        error = true;
    }
    return error;
}
export function validateClientName(value) {
    let error = false;
    if (value.length < 3) {
        error = true;
    }
    return error;
}
export function validateName(value) {
    let error = false;
    if (value.length < 2) {
        error = true;
    }
    return error;
}
export function fieldLevelValidation(fieldName, fieldValue) {
    let isError = false;
    switch (fieldName) {
        case 'email':
        case 'personalEmail':
            isError = validateEmail(fieldValue);
            break;
        case 'clientName':
            isError = validateClientName(fieldValue);
            break;
        case 'anyName':
            isError = validateName(fieldValue);
            break;
        case 'mobile':
        case 'contactNumber':
        case 'phone':
            isError = validateMobile(fieldValue);
            break;
        case 'pinCode':
        case 'pin':
            isError = validatePin(fieldValue);
            break;
        case 'pan':
            isError = validatePan(fieldValue);
            break;
        case 'aadharNumber':
            isError = validateAadhar(fieldValue);
            break;
        case 'ifscCode':
            isError = validateIfsc(fieldValue);
            break;
        default:
            break;
    }
    return isError;
}
export function isEmpty(value) {
    return value === "";
}


export const parseCustomColumnData = ({ customColumnData, moduleColumns, subModuleIds }) => {
    const getColumnData = (columnName) => {
        const columnData = moduleColumns.find((item) => customColumnData[columnName]);
        return {
            subModule: subModuleIds.join(),
            column: columnData.columnId,
            reference: columnData.columnId
        };
    };

    return {
        name: customColumnData.name,
        operation: customColumnData.operation,
        first: getColumnData("firstColumn"),
        second: getColumnData("secondColumn")
    };
};


export function getShuffledData(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

export const modulesColorsArr = [
    '#FE4B7E',
    '#FF9104',
    '#FF4C22',
    '#FF4C22',
    '#FF4C22',
    '#D8BA15',
    '#B561E2',
]
