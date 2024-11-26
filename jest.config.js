module.exports = {
    transform: {
        '^.+\\.ts?$':'ts-jest',
    },
    testEnvironment: 'node',
    testRegex: './tests/.*\\.(test|spec)?\\.(js|ts)$',
    moduleFileExtensions: ['js', 'ts', 'json'],
    roots: ['<rootDir>/tests']
}