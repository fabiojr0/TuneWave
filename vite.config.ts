import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    replace({
      'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
      'process.env.CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET),
      'process.env.REDIRECT_URI': JSON.stringify(process.env.REDIRECT_URI),
    },),
  ],
})