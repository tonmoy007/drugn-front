module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        env: {
            production: {
                plugins: [
                    'react-native-paper/babel',
                ],
            },
        },
        plugins: [
            'react-native-paper/babel',
            'babel-plugin-react-native-web',
            '@babel/plugin-proposal-export-namespace-from',
            'react-native-reanimated/plugin'
        ]
    };
};
