import { config as appConfig } from "@app/config";
const currencyHelper = {};

currencyHelper.format = (
    value = 0,
    options = { config: {} },
    locale = "en-IN"
) => {
    // NOTE:
    //      refer config document from below link
    //      link: https://www.techonthenet.com/js/number_tolocalestring.php
    const config = {
        currency: "INR",
        style: "currency",
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        ...options.config,
    };

    if (value === 0) {
        config.maximumFractionDigits = 0;
    }

    let fixedValue = Number(
        Number(value).toFixed(config.maximumFractionDigits)
    );
    return fixedValue.toLocaleString(locale, config);
};

export { currencyHelper };
