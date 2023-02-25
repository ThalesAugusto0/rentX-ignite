module.exports = {
  preset: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescritp",
  ],
  plugin: [
    [
      "module-resolver",
      {
        alias: {
          "@modules/*": ["modules/*"],
          "@config/*": ["config/*"],
          "@shared/*": ["shared/*"],
          "@erros/*": ["erros/*"],
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
};
