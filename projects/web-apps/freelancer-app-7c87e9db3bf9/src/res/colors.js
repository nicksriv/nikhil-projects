const colors = {};

colors._helper = {}
colors._helper.hexToRGB = (hex, alpha) => {
    if (!hex) throw "hex value is not provided";

    if (hex.includes("#")) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        } else {
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }
    }

    const hexSplit = hex.split(",");
    if (hexSplit.length === 4 || hexSplit.length === 3) {
        let color = "";

        color += hexSplit[0];
        color += ",";
        color += hexSplit[1];
        color += ",";
        color += hexSplit[2];
        color += ",";
        color += alpha;
        color += ")";

        return color;
    }
};

// core colors
colors.white = "#ffffff";
colors.black = "#000000";

//border colors
colors.border = "#E0E3E9";
colors.chipBorder ="#4285F4"

// background colors
colors.background = {};
colors.background.default = colors.white;
colors.background.paper = colors.white;
colors.background.logOut = '#F7F8FA'
colors.background.disabled = colors._helper.hexToRGB(colors.black, 0.18);
colors.background.active = '#00DC23';
colors.background.chip='#E0F3FF';
colors.background.tab='#E7E7E7'
colors.background.apply="#2069A3"
colors.background.input='#F0F0F0'
colors.background.dispute='#FF981E'

// theme colors and variants
colors.primary = {};
colors.primary.main = "#2069A3";
colors.primary.light = colors._helper.hexToRGB(colors.primary.main, 0.6);
colors.primary.lightest = colors._helper.hexToRGB(colors.primary.main, 0.1);
colors.primary.contrastText = colors.white;
colors.primary.chips = "#00335B14";
colors.primary.link = "#4285F4";

colors.success = {};
colors.success.main = "#35B425";
colors.success.light = colors._helper.hexToRGB(colors.success.main, 0.6);
colors.success.lightest = colors._helper.hexToRGB(colors.success.main, 0.1);
colors.success.contrastText = colors.white;

// text related colors
colors.text = {};
colors.text.primary = "#202020";
colors.text.secondary = "#5C5C5C";
colors.text.disabled = colors._helper.hexToRGB(colors.black, 0.38);
colors.text.success = colors.success.main;
colors.text.info = "#00589D";
colors.text.placeHolder = "#7D97AB";
colors.text.error='#FF0000';
// colors.text.


colors.warning = {};
colors.warning.main = "#ed6c02";
colors.warning.light = "#ff9800";
colors.warning.lightest = "#e65100";
colors.warning.contrastText = colors.white;

colors.danger = {};
colors.danger.main = "#d32f2f";
colors.danger.light = "#ef5350";
colors.danger.lightest = "#c62828";
colors.danger.contrastText = colors.white;

export { colors };
