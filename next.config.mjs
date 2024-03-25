// next.config.mjs

export default {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next',
              outputPath: 'static',
              name: '[name].[ext]',
            },
          },
        ],
      });
      return config;
    },
  };
  