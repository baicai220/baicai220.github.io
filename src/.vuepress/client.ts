import { defineClientConfig } from "vuepress/client";
import Blog from "./layouts/Blog.vue";
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";
import "vuepress-theme-hope/presets/squircle-blogger-avatar.scss"
import "vuepress-theme-hope/presets/hr-driving-car.scss"
import "vuepress-theme-hope/presets/bounce-icon.scss"
import  "vuepress-theme-hope/presets/left-blog-info.scss"


export default defineClientConfig({
  //...

  layouts: {
    // ...
    Blog,
  },

  setup: () => {
    setupTransparentNavbar({ type: "homepage" });
    // setupSnowFall();
  },
});

