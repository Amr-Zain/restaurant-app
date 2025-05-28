module.exports = {
  apps: [
    {
      name: "najid_website",

      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      args: "start -p 3014",

      script: "node_modules/next/dist/bin/next",
      env: {
        NODE_ENV: "production",
        PORT: 3014,
      },
    },
  ],
};
