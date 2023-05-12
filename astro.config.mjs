import { defineConfig } from "astro/config";
import unocss from "@unocss/astro";
import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";
import presetAttributify from "@unocss/preset-attributify";
import svelte from "@astrojs/svelte";
import remToVwPreset from "./src/libs/uno/presetRem2vw";
import node from "@astrojs/node";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [unocss({
    injectReset: true,
    presets: [presetUno(), presetAttributify(), presetIcons({
      // prefix: "icon-",
      scale: 1.2,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle"
      }
    }), remToVwPreset()]
  }), svelte(), image()]
});