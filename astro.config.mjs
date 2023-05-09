import { defineConfig } from "astro/config";
import unocss from "@unocss/astro";
import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";
import presetAttributify from "@unocss/preset-attributify";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [
    unocss({
      injectReset: true,
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          // prefix: "icon-",
          scale: 1.2,
          extraProperties: {
            display: "inline-block",
            "vertical-align": "middle",
          },
        }),
      ],
      // rules: [
      //   [
      //     // 有指定方向的安全区
      //     /^safe-area-padding-(top|bottom|left|right|all)$/,
      //     ([, side]) =>
      //       side === "all"
      //         ? {
      //             padding:
      //               "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)",
      //           }
      //         : {
      //             [`padding-${side}`]: `env(safe-area-inset-${side})`,
      //           },
      //   ],
      // ],
    }),
    svelte(),
  ],
});
