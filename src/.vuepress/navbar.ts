import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/posts/Java-Tech-Stack/",
  "/posts/CS/",
  "/posts/ML/",
  {
    text: "TensorFlow",
    icon: "book",
    prefix: "/TensorFlow",
    children: [{
        text: "TensorFlow",
        icon: "pen-to-square",
        link: "/posts/TensorFlow/",
      },{
        text: "TFF",
        icon: "pen-to-square",
        link: "/posts/TensorFlow/TensorFlow-Federated/",
      }],
  },
  "/projects/",
  // {
  //   text: "博文",
  //   icon: "pen-to-square",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "苹果",
  //       icon: "pen-to-square",
  //       prefix: "apple/",
  //       children: [
  //         { text: "苹果1", icon: "pen-to-square", link: "1" },
  //         { text: "苹果2", icon: "pen-to-square", link: "2" },
  //         "3",
  //         "4",
  //       ],
  //     },
  //   ],
  // },
]);
