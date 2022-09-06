const defaultTheme = require("tailwindcss/defaultTheme");
const safeAreaPlugin = require("tailwindcss-safe-area");
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            sm: { raw: "(min-height: 500px) and (min-width:500px)" },
            md: "1020px",
            lg: "1110px",
            xl: "1298px",
        },
        extend: {
            colors: {
                dim: "#15202B",
                "dim-border": "#38444D",
                "dim-grey": "#8899A6",
                "dim-reply-link": "#425364",
                primary: "#1D9BF0",
                "off-white": "#F7F9F9",
            },
            fontFamily: {
                display: [
                    "Twitter Chirp",
                    // 'Arial',
                    ...defaultTheme.fontFamily.sans,
                ],
                sans: [
                    "Twitter Chirp",
                    // 'Arial',
                    ...defaultTheme.fontFamily.sans,
                ],
            },
            fontSize: {
                "13px": "13px",
                "14px": "14px",
                "15px": "15px",
                "17px": "17px",
                "20px": "20px",
                "23px": "23px",
                base: ["16px", "24px"],
                lg: ["20px", "28px"],
                xl: ["24px", "32px"],
            },
        },
    },
    plugins: [safeAreaPlugin],
};
