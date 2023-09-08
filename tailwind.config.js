
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
    content: ["./src/**/*.{astro,tsx,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Harmoney_Sans-Regular", ...defaultTheme.fontFamily.sans]
            }
        },
    },
    plugins: [require('@tailwindcss/typography')],
}