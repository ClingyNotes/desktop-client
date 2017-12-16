module.exports = {
    bail: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/dist/**"
    ],
    coverageDirectory: "./dist/coverage/",
};