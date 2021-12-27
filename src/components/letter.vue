<template>
  <div class="letter">
    <audio src="../assets/meetyou.mp3" autoplay></audio>
    <div class="letter-contain" ref="contain" v-html="contain"></div>
  </div>
</template>

<script>
export default {
  name: "Letter",
  data() {
    return {
      contain: "",
      tempContain: `<p>致亲爱的杨丽娜宝贝：</p>
        <p>我们已经相识4604天，相恋一周年啦～</p>
        <p>喜欢春天的森林公园，夏天的水上乐园，秋天的三宝日出，冬天的迪士尼，还有每一天的你，
            终于集满了有你的春夏秋冬，一年中，我们也发生了不少争吵，但是每次过后都让我们更加亲密，
            或许过了这所谓的磨合期，我们就会减少争吵的次数吧。</p>
        <p>我们绕了这么一圈才遇到我比谁都更明白你的重要，每每想起初中传纸条的那个时候，
            就觉得现在的我们能牵着手说话很奇妙，那时候青涩的我们都已经长大啦，现在的我比那时候的自己
          更加懂得怎么去爱你了。</p>
          `
    };
  },
  mounted() {
    var str = this.tempContain;
    // 正则替换代码行之间添加的多个空格，不去除换行输出会有明显的停顿：实际是在输出多个空格
    str = str.replace(/(\s){2,}/g, "$1");
    var index = 0;
    var timer = () => {
      var current = str.slice(index, index + 1);
      // html标签完整输出,如：<p>
      if (current == "<") {
        index = str.indexOf(">", index) + 1;
      } else {
        index++;
      }
      //位运算符: 根据setInterval运行奇偶次来判断是否加入下划线字符“_”，使输入效果更逼真
      if (index < str.length - 1) {
        //打印字符倒数第2个字符开始，不加下划线字符，以防止结束符可能会多输出一下划线字符
        this.contain = str.substring(0, index) + (index & 1 ? "_" : "");
      } else {
        this.contain = str.substring(0, index);
        clearTimeout(timer);
      }
    };
    setInterval(timer, 200);
  }
};
</script>

<style scoped lang="less">
.letter-contain {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 90vh;
  width: 90vw;
  overflow: hidden;
  transform: translate(-50%, -50%);
  border: 1px solid white;
  border-radius: 5px;
  padding: 10px;
  color: white;
  line-height: 1.5em;
}
</style>
