const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dim: "#15202B",
                "dim-border": "#38444D",
                "dim-grey": "#8899A6",
                "dim-reply-link": "#425364",
                primary: "#1D9BF0",
            },
            fontFamily: {
                display: [
                    "Twitter Chirp",
                    // 'Arial',
                    ...defaultTheme.fontFamily.sans,
                ],
            },
            fontSize: {
                "13px": "13px",
                "14px": "14px",
                "15px": "15px",
                "20px": "20px",
                "23px": "23px",
                base: ["16px", "24px"],
                lg: ["20px", "28px"],
                xl: ["24px", "32px"],
            },
        },
    },
    plugins: [],
};
