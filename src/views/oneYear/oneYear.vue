<template>
  <div id="oneyear">
    <div id="background" class="wall"></div>
    <div id="midground" class="wall"></div>
    <div id="fore2ground" class="wall"></div>
    <div id="foreground" class="wall"></div>
    <div id="top" class="wall"></div>
    <div>
      <div class="image" @click="showContain" v-show="showLetter">
        <div class="letter-info">收到一封信，请点击查收哦～</div>
        <img src="~@/assets/heart.gif" class="letter-heart" alt="" />
        <div class="animated-mail">
          <div class="back-fold"></div>
          <div class="letter">
            <div class="letter-border"></div>
            <div class="letter-title"></div>
            <div class="letter-context"></div>
            <div class="letter-stamp">
              <div class="letter-stamp-inner"></div>
            </div>
          </div>
          <div class="top-fold"></div>
          <div class="body"></div>
          <div class="left-fold"></div>
        </div>
      </div>
    </div>
    <div v-if="!showLetter">
      <Letter />
    </div>
    <div>
      <el-button @click="backup">返回</el-button>
    </div>
  </div>
</template>

<script>
import Letter from "../../components/letter";
export default {
  data() {
    return {
      showLetter: true
    };
  },
  components: {
    Letter
  },
  methods: {
    showContain() {
      setTimeout(() => {
        this.showLetter = false;
      }, 1500);
    }
  },
  backup(){
    this.$router.go(-1)
  }
};
</script>

<style lang="less">
@import "./index.css";
@import "./letter.css";
body,
#year {
  overflow: hidden;
}
</style>
