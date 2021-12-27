<template>
  <div class="diary">
    <div class="diary-btn">
      <el-button icon="el-icon-edit" circle type="danger" @click="toEdit"></el-button>
    </div>
    <router-link
      tag="div"
      v-for="(item) in diayies"
      :key="item.id"
      :to="{ name: 'dayedit', params: { id: item.number, title: item.title } }"
    >
      <div class="diary-data">{{ item.updated_at.replace('T', ' ').slice(0, 19) }}</div>
      <el-card class="diary-card">
        <!-- <i class="el-icon-close diary-del" @click.stop="diaryDel(item.id)"></i> -->
        <div style="overflow:auto">
          <pre>{{ item.body }}</pre>
        </div>
      </el-card>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "diaries",
  data() {
    return {
      diayies: [],
    };
  },
  created() {
    // this.$axios.get("/allDiary?type=0").then((res) => {
    //   this.diayies = res.data;
    // });
    this.$axios.get('https://gitee.com/api/v5/repos/Younglina/mypig/issues?access_token=32864eebd6e0c93a3fc3407d9307d3fe&state=open&sort=created&direction=desc&page=1&per_page=20').then(({ data }) => {
      this.diayies = data
    })
  },
  methods: {
    toEdit() {
      this.$router.push("/dayedit");
    },
    diaryDel(id) {
      console.log(111);
    },
  },
  beforeRouteLeave(to, from, next) {
    let idx = to.params.index;
    this.$store.commit("setCont", this.diayies[idx]);
    next();
  },
};
</script>

<style lang="less" scoped>
.diary {
  width: 80vw;
  padding: 0 10vw;
  overflow: auto;
  padding-top: 20px;
  font-size: 12px;
  height: calc(100% - 100px);
  .diary-data {
    text-align: left;
    padding: 5px 2px;
  }
  .diary-btn {
    z-index: 100;
    position: fixed;
    bottom: 30px;
    right: 30px;
  }
}
.diary-card {
  margin-bottom: 20px;
  position: relative;
  pre {
    text-align: left;
  }
  .diary-del {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
.el-card {
  background-color: transparent;
}
</style>