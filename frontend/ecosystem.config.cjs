/* eslint-disable no-undef */
module.exports = {
  apps: [
    {
      name: "talent_lens",
      cwd: "/app/dist",
      script: "serve",
      instances: "max", // Use all available CPU cores
      exec_mode: "cluster", // Enable clustering mode
      autorestart: true,
      max_memory_restart: "2G",
      env: {
        NODE_ENV: "production",
        VITE_UPLOADFILES_API:
          process.env.VITE_UPLOADFILES_API || "http://localhost:5095",
        VITE_RequestTime: process.env.VITE_RequestTime || 300000,
        VITE_AMBIENT: process.env.VITE_AMBIENT || "local",
        VITE_MAXFILES_UPLOAD: process.env.VITE_MAXFILES_UPLOAD || 10,
        VITE_UPLOADFILES_WEBSOCKET:
          process.env.VITE_UPLOADFILES_WEBSOCKET || "ws://localhost:5095/ws",
        VITE_PLATFORM_API_URL:
          process.env.VITE_PLATFORM_API_URL || "http://auth:8080",
        VITE_APP_AUTH_STRATEGY: process.env.VITE_APP_AUTH_STRATEGY || "api",
        PM2_SERVE_PATH: "/app/dist",
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: "true",
      },
      log_file: "/app/logs/output.log",
      error_file: "/app/logs/error.log",
      out_file: "/app/logs/output.log",
      merge_logs: true,
      time: true,
    },
  ],
};
