import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/styles/**/*.{css,scss,sass}",
    ],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },
        colors: {
            primary: "#05445E",
            secondary: "#189AB4",
            tertiary: "#75E6DA",
            accent: "#D4F1F4",
            white: "#FFFFFF",
            black: "#000000",
            gray: {
                100: "#FEFCFF",
                200: "#EDF2F7",
                300: "#E5E5E5",
                400: "#D4D4D4",
            },
            success: "#82DD55",
            error: "#E23636",
            warning: "#EDB95E"
        },
        fontFamily: {
            sans: ["Graphik", "sans-serif"],
            serif: ["Merriweather", "serif"],
            roboto: ["Roboto", "sans-serif"],
        },
        extend: {
            spacing: {
                "128": "32rem",
                "144": "36rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
        },
    },
    plugins: [],
};
export default config;
