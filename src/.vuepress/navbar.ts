import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/posts/java/",
  "/posts/cs/",
    {
    text: "机器学习",
    icon: "carbon:machine-learning-model",
    prefix: "/posts/ml/",
    children: [{
        text: "机器学习",
        icon: "carbon:machine-learning-model",
        link: "/posts/ml/",
      },{
        text: "深度学习",
        icon: "eos-icons:machine-learning",
        link: "/posts/deeplearning/",
      }],
  },
  {
    text: "TensorFlow",
    icon: "simple-icons:tensorflow",
    prefix: "/posts/tensorflow/",
    children: [{
        text: "TensorFlow",
        icon: "simple-icons:tensorflow",
        link: "/posts/tensorflow/",
      },{
        text: "TFF",
        icon: "book",
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
