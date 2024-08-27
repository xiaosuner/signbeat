const lyrics = [
    {
        starttime: 9,
        words: [
            { time: 9, word: "你好", expectedGesture: "nihao", recognize: true, gif: "https://www.bing.com/images/search?view=detailV2&ccid=JNGo%2Fl9x&id=9D27B74E0C66B96C61D5AE91C0A7E74AF172311C&thid=OIP.JNGo_l9xYRBQHMHElSVrlQAAAA&mediaurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.24d1a8fe5f716110501cc1c495256b95%3Frik%3DHDFy8Urnp8CRrg%26riu%3Dhttp%253a%252f%252fpic.baike.soso.com%252fp%252f20140409%252fbki-20140409101029-415176077.jpg%26ehk%3DLZv9co%252fedfPxopFOZwy87s%252bjAefxVHkIQukOqXatkCU%253d%26risl%3D%26pid%3DImgRaw%26r%3D0&exph=165&expw=249&q=%E6%89%8B%E8%AF%AD%E4%BD%A0%E5%A5%BD&simid=607986504605450322&FORM=IRPRST&ck=1A08F076C6623DDEF6A27F12AB319F4A&selectedIndex=6&itb=0&cw=1339&ch=643&ajaxhist=0&ajaxserp=0" },
            { time: 10, word: "朋友", expectedGesture: "friend", recognize: false, gif: "https://www.bing.com/images/search?view=detailV2&ccid=uccTK6i6&id=B1C442122CBBE5DD59FA134CC8F507F4144BF786&thid=OIP.uccTK6i6--tRlYRfo797IwAAAA&mediaurl=https%3A%2F%2Fd.bmcx.com%2Fshouyu%2F_file%2F7%2F56fc20591abccceb.png&exph=150&expw=180&q=%E6%89%8B%E8%AF%AD%E6%9C%8B%E5%8F%8B&simid=608020954551964701&FORM=IRPRST&ck=6CFDE5CB1DF04C480F0D1851968EAFB2&selectedIndex=0&itb=0&cw=1339&ch=643&ajaxhist=0&ajaxserp=0" },
            { time: 11, word: "很高兴", expectedGesture: "happy", recognize: true, gif: "https://www.bing.com/images/search?view=detailV2&ccid=TSbZOPKu&id=3F49AEBCF09CCB8419C81CFF974826AE5575CB6C&thid=OIP.TSbZOPKuR2IkSflQt5a7XQHaDM&mediaurl=https%3A%2F%2Fimgs.zsbeike.com%2Fimgs%2FC%2FC10474%2Fc10474.0067.3%5B0aa69d591268%5D.jpg&exph=616&expw=1425&q=%E6%89%8B%E8%AF%AD%E9%AB%98%E5%85%B4&simid=607986706460930922&FORM=IRPRST&ck=090BE4721418D687374D82149785745A&selectedIndex=6&itb=0&cw=1339&ch=643&ajaxhist=0&ajaxserp=0" },
            { time: 12.2, word: "认识", expectedGesture: "meet", recognize: true, gif: "url" },
            { time: 12.8, word: "你", expectedGesture: "ni", recognize: true, gif: "url" },
            { time: 14, word: "感谢", expectedGesture: "thanks", recognize: true, gif: "https://www.bing.com/images/search?view=detailV2&ccid=nJd7sSH0&id=D7916F56A811BE387F684CE7BDDE6A79EECD0D0B&thid=OIP.nJd7sSH0z0ENPktyLsIBWAHaHt&mediaurl=https%3a%2f%2fbpic.588ku.com%2felement_origin_min_pic%2f19%2f04%2f29%2f83eb0fc802d65918bd4128ca494d775e.jpg&exph=677&expw=650&q=%e6%89%8b%e8%af%ad%e5%8a%a8%e5%9b%be&simid=608047776576319716&FORM=IRPRST&ck=BE83DF853799FE4A048439D42296503D&selectedIndex=0&itb=0&idpp=overlayview&ajaxhist=0&ajaxserp=0" },
            { time: 14.2, word: "有", expectedGesture: "have", recognize: false, gif: "url" },
            { time: 14.5, word: "你", expectedGesture: "ni", recognize: true, gif: "url" },
            { time: 15, word: "请", expectedGesture: "please", recognize: false, gif: "url" },
            { time: 16, word: "保持", expectedGesture: "keep", recognize: false, gif: "url" },
            { time: 16.5, word: "快乐", expectedGesture: "happy", recognize: true, gif: "url" },
        ]
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