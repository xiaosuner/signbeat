import music1 from "../../assets/mp3/Greetings and Goodbyes.mp3";
import music2 from "../../assets/mp3/music02.mp3";

export const chapterData = [
  {
    chapter: '1',
    smallTitle: "Chapter 1",
    mainTitle: "基础的问好",
    description: "这是一个小的说明文字。",
    progress: 70,
    completed: true,
    learning: [
      {
        title: "Closed_Fist",
        gif: "https://www.seekpng.com/png/detail/37-372109_final-blends-fist-cartoon-png.png",
      },
      {
        title: "Open_Palm",
        gif: "https://thumbs.dreamstime.com/z/image-cartoon-human-hand-gesture-open-palm-waving-vector-illustration-isolated-white-background-60283111.jpg",
      },
      // {
      //   title: "Pointing_Up",
      //   gif: "https://image.pngaaa.com/441/1126441-middle.png",
      // },
      // {
      //   title: "Thumb_Down",
      //   gif: "https://cdn-icons-png.flaticon.com/512/10187/10187338.png",
      // },
      // {
      //   title: "Thumb_Up",
      //   gif: "https://static.vecteezy.com/system/resources/previews/000/553/899/original/vector-cartoon-hand-making-positive-thumbs-up-gesture.jpg",
      // },
      // {
      //   title: "Victory",
      //   gif: "https://th.bing.com/th/id/OIP.t8Mwhbq4I7WUdKUORpokFwHaEK?rs=1&pid=ImgDetMain",
      // },
      // {
      //   title: "ILoveYou",
      //   gif: "https://png.pngtree.com/png-vector/20221222/ourlarge/pngtree-cartoon-hand-drawn-i-love-you-gesture-line-illustration-vector-decoration-png-image_6487645.png",
      // },
    ],
    musicGame: [
      {
        name: "Beaver Creek",
        cover:
          "https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg",
        artist: "Aso, Middle School, Aviino",
        audio: music1,

        color: ["#205950", "#2ab3bf"],
        id: "001",
        active: true,
      },
      {
        name: "Daylight",
        cover:
          "https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg",
        artist: "Aiguille",
        audio: music2,
        color: ["#EF8EA9", "#ab417f"],
        id: "002",
        active: false,
      },
    ],
  },
  {
    chapter: '2',
    smallTitle: "Chapter 2",
    mainTitle: "加粗大标题2",
    description: "这是一个小的说明文字。",
    progress: 50,
    completed: false,

    learning: [
      // {
      //   title: "Closed_Fist",
      //   gif: "https://www.seekpng.com/png/detail/37-372109_final-blends-fist-cartoon-png.png",
      // },
      // {
      //   title: "Open_Palm",
      //   gif: "https://thumbs.dreamstime.com/z/image-cartoon-human-hand-gesture-open-palm-waving-vector-illustration-isolated-white-background-60283111.jpg",
      // },
      {
        title: "Pointing_Up",
        gif: "https://image.pngaaa.com/441/1126441-middle.png",
      },
      {
        title: "Thumb_Down",
        gif: "https://cdn-icons-png.flaticon.com/512/10187/10187338.png",
      },
      // {
      //   title: "Thumb_Up",
      //   gif: "https://static.vecteezy.com/system/resources/previews/000/553/899/original/vector-cartoon-hand-making-positive-thumbs-up-gesture.jpg",
      // },
      // {
      //   title: "Victory",
      //   gif: "https://th.bing.com/th/id/OIP.t8Mwhbq4I7WUdKUORpokFwHaEK?rs=1&pid=ImgDetMain",
      // },
      // {
      //   title: "ILoveYou",
      //   gif: "https://png.pngtree.com/png-vector/20221222/ourlarge/pngtree-cartoon-hand-drawn-i-love-you-gesture-line-illustration-vector-decoration-png-image_6487645.png",
      // },
    ],
    musicGame: [
      {
        name: "Beaver Creek",
        cover:
          "https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg",
        artist: "Aso, Middle School, Aviino",
        audio: music1,

        color: ["#205950", "#2ab3bf"],
        id: "001",
        active: true,
      },
      {
        name: "Daylight",
        cover:
          "https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg",
        artist: "Aiguille",
        audio: music2,
        color: ["#EF8EA9", "#ab417f"],
        id: "002",
        active: false,
      },
    ],
  },
];
