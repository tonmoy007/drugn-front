module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo','module:metro-react-native-babel-preset',],
        env: {
            production: {
                plugins: [
                    'react-native-paper/babel',
                ],
            },
        },
        plugins: [
            'babel-plugin-react-native-web',
            '@babel/plugin-proposal-export-namespace-from',
            'react-native-reanimated/plugin'
        ]
    };
};
