// vite.config.js
import { defineConfig } from "file:///opt/Taipei-City-Dashboard-FE/node_modules/vite/dist/node/index.js";
import vue from "file:///opt/Taipei-City-Dashboard-FE/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import viteCompression from "file:///opt/Taipei-City-Dashboard-FE/node_modules/vite-plugin-compression/dist/index.mjs";
var isDockerCompose = process?.env.DOCKER_COMPOSE === "true";
var serverConfig = isDockerCompose ? {
  // Docker Compose override config
  headers: { "X-Robots-Tag": "noindex, nofollow" },
  host: "0.0.0.0",
  port: 80,
  // 如有需要可變更 port
  proxy: {
    "/api/dev": {
      target: "http://dashboard-be:8080",
      changeOrigin: true,
      rewrite: (path) => path.replace("/dev", "/v1")
    }
  }
} : {
  headers: { "X-Robots-Tag": "noindex, nofollow" },
  host: "0.0.0.0",
  port: 80,
  proxy: {
    "/api": {
      target: "https://citydashboard.taipei/api/v1",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, "")
    },
    "/geo_server": {
      target: "https://citydashboard.taipei/geo_server/",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/geo_server/, "")
    }
  }
};
var vite_config_default = defineConfig({
  plugins: [vue(), viteCompression()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    },
    chunkSizeWarningLimit: 1600
  },
  base: "/",
  server: serverConfig
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvb3B0L1RhaXBlaS1DaXR5LURhc2hib2FyZC1GRVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL29wdC9UYWlwZWktQ2l0eS1EYXNoYm9hcmQtRkUvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL29wdC9UYWlwZWktQ2l0eS1EYXNoYm9hcmQtRkUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xuXG4vLyBcdTU2MTdcdThBNjZcdThCODBcdTUzRDZcdTc0QjBcdTU4ODNcdThCOEFcdTY1NzhcdUZGMENcdTgyRTVcdTRFMERcdTVCNThcdTU3MjhcdTUyNDdcdTU2REVcdTUwQjMgZmFsc2VcbmxldCBpc0RvY2tlckNvbXBvc2UgPSBwcm9jZXNzPy5lbnYuRE9DS0VSX0NPTVBPU0UgPT09IFwidHJ1ZVwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbmNvbnN0IHNlcnZlckNvbmZpZyA9IGlzRG9ja2VyQ29tcG9zZVxuICA/IHtcbiAgICAgIC8vIERvY2tlciBDb21wb3NlIG92ZXJyaWRlIGNvbmZpZ1xuICAgICAgaGVhZGVyczogeyAnWC1Sb2JvdHMtVGFnJzogJ25vaW5kZXgsIG5vZm9sbG93JyB9LFxuICAgICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gICAgICBwb3J0OiA4MCwgLy8gXHU1OTgyXHU2NzA5XHU5NzAwXHU4OTgxXHU1M0VGXHU4QjhBXHU2NkY0IHBvcnRcbiAgICAgIHByb3h5OiB7XG4gICAgICAgIFwiL2FwaS9kZXZcIjoge1xuICAgICAgICAgIHRhcmdldDogXCJodHRwOi8vZGFzaGJvYXJkLWJlOjgwODBcIixcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShcIi9kZXZcIiwgXCIvdjFcIilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgOiB7XG4gICAgICBoZWFkZXJzOiB7ICdYLVJvYm90cy1UYWcnOiAnbm9pbmRleCwgbm9mb2xsb3cnIH0sXG4gICAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICAgIHBvcnQ6IDgwLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgXCIvYXBpXCI6IHtcbiAgICAgICAgICB0YXJnZXQ6IFwiaHR0cHM6Ly9jaXR5ZGFzaGJvYXJkLnRhaXBlaS9hcGkvdjFcIixcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sIFwiXCIpXG4gICAgICAgIH0sXG4gICAgICAgIFwiL2dlb19zZXJ2ZXJcIjoge1xuICAgICAgICAgIHRhcmdldDogXCJodHRwczovL2NpdHlkYXNoYm9hcmQudGFpcGVpL2dlb19zZXJ2ZXIvXCIsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9nZW9fc2VydmVyLywgXCJcIilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKSwgdml0ZUNvbXByZXNzaW9uKCldLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBpZFxuICAgICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAuc3BsaXQoXCJub2RlX21vZHVsZXMvXCIpWzFdXG4gICAgICAgICAgICAgIC5zcGxpdChcIi9cIilbMF1cbiAgICAgICAgICAgICAgLnRvU3RyaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTYwMCxcbiAgfSxcbiAgYmFzZTogXCIvXCIsXG4gIHNlcnZlcjogc2VydmVyQ29uZmlnLFxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5USxTQUFTLG9CQUFvQjtBQUN0UyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxxQkFBcUI7QUFHNUIsSUFBSSxrQkFBa0IsU0FBUyxJQUFJLG1CQUFtQjtBQUV0RCxJQUFNLGVBQWUsa0JBQ2pCO0FBQUE7QUFBQSxFQUVFLFNBQVMsRUFBRSxnQkFBZ0Isb0JBQW9CO0FBQUEsRUFDL0MsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxZQUFZO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixjQUFjO0FBQUEsTUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsUUFBUSxLQUFLO0FBQUEsSUFDL0M7QUFBQSxFQUNGO0FBQ0YsSUFDQTtBQUFBLEVBQ0UsU0FBUyxFQUFFLGdCQUFnQixvQkFBb0I7QUFBQSxFQUMvQyxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixjQUFjO0FBQUEsTUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsSUFDOUM7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxNQUNSLGNBQWM7QUFBQSxNQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxpQkFBaUIsRUFBRTtBQUFBLElBQ3JEO0FBQUEsRUFDRjtBQUNGO0FBRUosSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztBQUFBLEVBQ2xDLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGFBQWEsSUFBSTtBQUNmLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixtQkFBTyxHQUNKLFNBQVMsRUFDVCxNQUFNLGVBQWUsRUFBRSxDQUFDLEVBQ3hCLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFDWixTQUFTO0FBQUEsVUFDZDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsRUFDekI7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLFFBQVE7QUFDVixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
