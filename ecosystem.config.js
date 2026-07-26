module.exports = {
  apps: [
    {
      name: "pintsave-api",
      script: "./backend/dist/app.js",
      instances: "max",
      exec_mode: "cluster",
      env_production: {
        NODE_ENV: "production",
        PORT: 4000
      }
    }
  ]
};
