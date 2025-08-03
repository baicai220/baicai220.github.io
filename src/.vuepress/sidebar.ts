import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "随便写写",
      icon: "streamline-ultimate-color:paper-write",
      prefix: "posts/others/",
      link: "posts/others/",
      collapsible: true,
      children: "structure",
    },
      {
      text: "学习笔记",
      icon: "streamline-ultimate-color:notes-book",
      collapsible: true,
      prefix: "posts/",
      link: "posts/",
      children: [
        {
          text: "Java技术栈",
          icon: "ri:java-line",
          prefix: "java-stack/",
          collapsible: true,
          link: "java-stack/",
          children: "structure",
        },
        {
          text: "计算机基础",
          icon: "hugeicons:ai-computer",
          prefix: "cs/",
          collapsible: true,
          link: "cs/",
          children: "structure",
        },
        {
          text: "机器学习",
          icon: "carbon:machine-learning-model",
          prefix: "ml/",
          collapsible: true,
          link: "ml/",
          children: "structure",
        },
        {
          text: "TensorFlow",
          icon: "simple-icons:tensorflow",
          prefix: "tensorflow/",
          collapsible: true,
          link: "tensorflow/",
          children: "structure",
          // children: [{
          //   text: "tensorflow-federated",
          //   icon: "simple-icons:tensorflow",
          //   collapsible: true,
          //   link: "tensorflow-federated/",
          //   prefix: "tensorflow-federated/",
          //   children: "structure",
          // }],
        },
      ],
    },
    {
      text: "看论文",
      icon: "streamline-ultimate:notes-paper-text-bold",
      prefix: "posts/papers/",
      collapsible: true,
      link: "posts/papers/",
      children: "structure",
    },

    {
      text: "projects",
      icon: "ant-design:code-filled",
      prefix: "posts/projects/",
      link: "posts/projects/",
      collapsible: true,
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
