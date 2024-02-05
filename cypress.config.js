const {defineConfig} = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://qauto.forstudy.space',

        specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}"
    },
})