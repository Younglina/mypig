<template>
  <div class="home">
    <css-doodle grid="24x1" click-to-update class="css-doodle">
      :doodle {
      grid-row-gap: 2px;
      width: 100%; height: 8em;
      }
      @row(1) {
      background: @pick('#FEE3EC','#F9C5D5','#F999B7','#F2789F');
      width: 10px; height: @rand(10%, 100%);
      }
    </css-doodle>
    <div class="our-markday">
      <span class="our-day">相识</span>
      <span class="duration">{{ meeting }}</span>
    </div>
    <div class="our-markday">
      <span class="our-day">相恋</span>
      <span class="duration">{{ lovaDuration }}</span>
    </div>
    <div class="our-markday">
      <span class="our-day">结婚</span>
      <span class="duration">{{ marryDuration }}</span>
    </div>
    <!-- <h3>
      距离下次见面还有
      <span class="duration">{{ meeting }}</span> 
    </h3>-->
    <div v-if="one" class="one-div" :style="one.image">
      <h4>{{ one.text }}</h4>
    </div>
  </div>
</template>
<script>
// import { setInterval } from "timers";
export default {
  name: "home",
  props: {},
  data() {
    return {
      lovaDuration: 0,
      meeting: 0,
      one: 0,
      marryDuration: 0,
    };
  },
  mounted() {
    let loveDate = new Date() - new Date("2019-04-09 00:00:00");
    let { day, hours } = this.getDiffDay(loveDate);
    this.lovaDuration = `${day} 天 ${hours} 小时`;

    let meetingDate = new Date() - new Date("2007-09-01 10:00:00");
    let mday = this.getDiffDay(meetingDate);
    this.meeting = `${mday.day} 天 ${mday.hours} 小时`;

    let marryDate = new Date() - new Date("2021-10-02 12:00:00");
    let marryday = this.getDiffDay(marryDate);
    this.marryDuration = `${marryday.day} 天 ${marryday.hours} 小时`;

    const myDoodle = document.querySelector(".css-doodle");

    setInterval(() => { myDoodle.update(); }, 2000)
  },
  methods: {
    getDiffDay(loveDate) {
      let day = Math.floor(loveDate / (1000 * 60 * 60 * 24)),
        leave = loveDate % (1000 * 60 * 60 * 24),
        hours = Math.floor(leave / (1000 * 60 * 60));
      return { day, hours };
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .css-doodle {
    padding-bottom: 20px;
  }
  .our-markday {
    display: flex;
    justify-content: center;
    font-size: 20px;
  }
  .our-day {
    width: 40px;
    font-weight: bold;
  }
  .duration {
    color: white;
    width: 180px;
    padding-left: 10px;
    text-align: left;
  }
  .one-div {
    position: relative;
    height: 50%;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    text-align: left;
    margin: 0 5px;
    h4 {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
