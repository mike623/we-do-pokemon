/** @type {import('next').NextConfig} */
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");
const nextConfig = {
  images: {
    domains: ["play.pokemonshowdown.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.plugins.push(new WindiCSSWebpackPlugin());
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
};

module.exports = nextConfig;
