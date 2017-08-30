var fortuneCookies = [
    "먹다 죽은 귀신이 때깔도 좋다",
    "이왕이면 다홍치마",
    "초록은 동색",
    "아니땐 굴뚝에서 연기나랴",
    "가는 말이 고와야 오는 말이 곱다",

];

exports.getFortune = function () {
    var idx = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[idx];
};