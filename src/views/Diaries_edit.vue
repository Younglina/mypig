<template>
  <div>
    <!-- <el-date-picker
      v-model="diaryDate"
      type="date"
      align="center"
      placeholder="日期"
      value-format="yyyy-mm-dd"
      class="diary-date"
    ></el-date-picker>-->
    <el-input
      class="diary-content"
      type="textarea"
      :autosize="{ minRows: 12 }"
      placeholder="输入日志内容"
      v-model="diaryContent"
    ></el-input>
    <div>
      <div>
        <el-button icon="el-icon-back" circle type="danger" @click="goBack"></el-button>
        <el-button icon="el-icon-upload" circle type="danger" @click="saveDiary"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      diaryContent: null,
      diaryDate: null,
      diaryTiem: null,
      hasCont: false,
    };
  },
  activated() {
    if (this.$route.params.id) {
      this.diaryContent = this.$route.params.title
      this.hasCont = true
    } else {
      this.diaryContent = null
      this.hasCont = false
    }
  },
  methods: {
    async saveDiary() {
      if (this.diaryContent) {
        let data = {
          title: this.diaryContent.slice(0,5),
          body: this.diaryContent,
          access_token: '32864eebd6e0c93a3fc3407d9307d3fe',
          owner: 'Younglina',
          repo: 'mypig',
        };
        let resData = ''
        if (this.hasCont) {
          resData = await this.$axios.patch(`https://gitee.com/api/v5/repos/Younglina/issues/${this.$route.params.id}`, { ...data, number: this.$route.params.id })
        } else {
          resData = await this.$axios.post('https://gitee.com/api/v5/repos/Younglina/issues', data)
        }

        if (resData.status === 201 || resData.status === 200) {
          this.$message.success({
            message: "记得每天记录噢～🥰",
            center: true,
            customClass: "warn-message",
            duration: 1000
          });
          this.diaryContent = null;
          setTimeout(() => {
            this.$router.push("/diaries");
          }, 1100);
        } else {
          this.$message.error({
            message: '保存失败咯',
            center: true,
            customClass: "warn-message",
            duration: 1000
          });
        }
        //   this.$axios
        //     .post("/insert", data)
        //     .then(res => {
        //       if (res.data.success) {
        //         this.$message.success({
        //           message: "记得每天记录噢～🥰",
        //           center: true,
        //           customClass: "warn-message",
        //           duration: 1000
        //         });
        //         this.diaryContent = null;
        //         setTimeout(() => {
        //           this.$router.push("/diaries");
        //         }, 1100);
        //       } else {
        //         this.$message.error({
        //           message: res.data.result,
        //           center: true,
        //           customClass: "warn-message",
        //           duration: 1000
        //         });
        //       }
        //     });
      } else {
        this.$message.warning({
          message: "写点东西吧～🥰",
          center: true,
          customClass: "warn-message",
          duration: 1000
        });
      }
    },
    goBack() {
      this.$router.back()
    },
  }
};
</script>

<style lang="less">
.el-textarea__inner,
.warn-message,
.diary-date .el-input__inner {
  background-color: #ffffff66 !important;
}
.diary-content {
  margin: 20px 0;
}
</style>