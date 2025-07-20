import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/posts/java/",
  "/posts/cs/",
  "/posts/ml/",
  {
    text: "TensorFlow",
    icon: "book",
    prefix: "/tensorflow",
    children: [{
        text: "TensorFlow",
        icon: "pen-to-square",
        link: "/posts/tensorflow/",
      },{
        text: "TFF",
        icon: "pen-to-square",
        link: "/posts/tensorflow/tensorflow-federated/",
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
