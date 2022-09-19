import { sveltekit } from "@sveltejs/kit/vite";

const config = {
  plugins: [sveltekit()],
  optimizeDeps: {
    exclude: ["crypto", "buffer"]
  },
  ssr: {
    external: ["crypto", "buffer", "jsonwebtoken"]
  }
};

export default config;
