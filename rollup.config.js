import cssbundle from "rollup-plugin-import-css";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/app.js",
  output: {
    dir: "dist",
    format: "iife",
  },
  plugins: [
    cssbundle({
      output: "assets/bundle.css", // Указываем путь и имя итогового файла
    }),
    nodeResolve(),
  ],
};
