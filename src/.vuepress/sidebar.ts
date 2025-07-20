import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "随便写写",
      icon: "streamline-ultimate-color:paper-write",
      prefix: "others/",
      link: "others/",
      children: "structure",
    },

    {
      text: "学习笔记",
      icon: "streamline-ultimate-color:notes-book",
      prefix: "posts/",
      children: "structure",
    },

    {
      text: "projects",
      icon: "ant-design:code-filled",
      prefix: "projects/",
      link: "projects/",
      children: "structure",
    },
    "intro",
    // {
    //   text: "github",
    //   icon: "mdi:github",
    //   link: "https://github.com/baicai220/baicai220.github.io",
    // },
  ],
});
