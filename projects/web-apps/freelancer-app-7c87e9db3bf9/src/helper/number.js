const numberHelper = {};

numberHelper.rounded = ({ num, toFixed = 1 }) => {
    if (!num) return num;
    if (typeof num === "string") {
        num = parseFloat(num);
    }
    if (num - Math.floor(num) === 0) {
        num = Math.floor(num);
    } else {
        num = num.toFixed(toFixed);
    }
    return num;
};

export const num = {
    rounded,
};
