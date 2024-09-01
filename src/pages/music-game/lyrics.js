const lyrics = [
  {
    starttime: 9,
    words: [
      {
        time: 9,
        word: "你好",
        expectedGesture: "你好",
        recognize: true,
        gif: "你好.gif",
      },
      {
        time: 10,
        word: "朋友",
        expectedGesture: "朋友",
        recognize: false,
        //gif: "你好.gif",
      },
      {
        time: 11,
        word: "很高兴",
        expectedGesture: "高兴",
        recognize: true,
        //gif: "你好.gif",
      },
      {
        time: 12,
        word: "认识",
        expectedGesture: "认识",
        recognize: true,
        gif: "见面.png",
      },
      {
        time: 13,
        word: "你",
        expectedGesture: "你",
        recognize: false,
        //gif: "你.jpg",
      },
      {
        time: 14,
        word: "感谢",
        expectedGesture: "感谢",
        recognize: true,
        gif: "感谢.gif",
      },
      {
        time: 14.5,
        word: "有",
        expectedGesture: "有",
        recognize: false,
        //gif: "null",
      },
      {
        time: 15,
        word: "你",
        expectedGesture: "你",
        recognize: true,
        gif: "你.jpg",
      },
      {
        time: 16,
        word: "请",
        expectedGesture: "请",
        recognize: false,
        //gif: "null",
      },
      {
        time: 17,
        word: "保持",
        expectedGesture: "保持",
        recognize: false,
        //gif: "你好.gif",
      },
      {
        time: 18,
        word: "快乐",
        expectedGesture: "快乐",
        recognize: true,
        //gif: "你好.gif",
      },
    ],
  },
  // Add more lines here
];

export default lyrics;

// [Verse 1]
// 你好，朋友，很高兴认识你，
// 感谢有你，请保持快乐，
// 我的名字叫张三，
// 好久不见，带着微笑。

// [Verse 2]
// 你好，朋友，让我们一起笑，
// 时光匆匆就这样过去了，
// 朋友们，一起来享受，
// 幸福快乐的每一天。

// [Chorus]
// 你好，朋友，再见会再相聚，
// 每次见面都是新的开始，
// 开心愉快的时光，
// 感谢有你在身边。

// [Verse 3]
// 春天到夏天，景色多美好，
// 秋风扫过冬日的霜雪，
// 岁月虽快，友情常在，
// 你我共享这份欢喜。

// [Bridge]
// 风轻轻吹过，云悠悠飘过，
// 远方的记忆，怎能忘记，
// 每次重逢都笑颜开，
// 友谊常在，不曾减退。

// [Chorus]
// 你好，朋友，再见总会再相聚，
// 每次见面都是新的开始，
// 开心愉快的时光，
// 每一天都如此精彩。
