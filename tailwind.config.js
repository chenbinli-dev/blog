
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
    content: ["./src/**/*.{astro,tsx,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans]
            }
        },
    },
    plugins: [],
}