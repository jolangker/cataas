import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: "#6F5E4F",
        secondary: "#FEFAE0",
        success: "#B0FFBD",
      },
      fontFamily: {
        indie: "'Indie Flower', cursive;",
      },
    },
  },
});
