/** @type {import('next').NextConfig} */
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");
const nextConfig = {
  images: {
    domains: ["play.pokemonshowdown.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.optimization.minimize = false;
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
  output: process.env.DOCKER === "true" ? "standalone" : undefined,
};

module.exports = nextConfig;
