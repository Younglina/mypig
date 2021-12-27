<template>
  <div class="photos-main">
    <el-button size="small" @click="$refs.uploadInput.click()">选择文件</el-button>
    <el-button size="small" @click="uploadImg()">开始上传</el-button>
    <input type="file" ref="uploadInput" accept="image" v-show="false" @change="choseImg" multiple />
    <div @click="handleImg" class="images-div-main">
      <div v-for="(item,index) in images" :key="item.content" class="images-div">
        <i class="el-icon-close diary-del" :data-id="index" data-type="del"></i>
        <img v-lazy="item.content" :data-id="index" alt class="photos-img" />
      </div>
    </div>
    <div v-show="viewImg" class="view-img" @click="isShow = false; viewImg = null">
      <img :src="viewImg" alt="preview" @click="isShow = false" />
    </div>
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      images: [],
      imageFiles: [],
      viewImg: "",
      isShow: false,
      successUpload: [],
      commonHead: '	https://izaya-1256042946.cos.ap-chengdu.myqcloud.com/'
    };
  },
  mounted() {
    this.myCos = new COS({
      SecretId: "AKIDwhBPM2SbT4PTGm21jA6pIWUDgtra3HFw",
      SecretKey: "TgbFemdDZhZBXfXAYhaDaiaCYpqb6LM7",
    });
    this.fetchImgs();
  },
  methods: {
    fetchImgs() {
      // this.$axios.get("/allDiary?type=1").then(res => {
      //   this.images = [...this.images, ...res.data];
      // });
      this.myCos.getBucket({
        Bucket: "izaya-1256042946",
        Region: "ap-chengdu",
        Prefix: 'mypig/',           /* Prefix表示列出的object的key以prefix开始，非必须 */
      }, (err, data) => {
        console.log(err || data.Contents);
        this.images = data.Contents.slice(1).map(item => {
          item.content = this.commonHead + item.Key
          return item
        })
      });
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
      }
      return { content: url };
    },
    choseImg(e) {
      //  let imgURL =  e.target.files
      let tempUrl = [],
        tempFile = [];
      for (let file of e.target.files) {
        tempFile.push(file);
        tempUrl.unshift(this.getObjectURL(file));
      }
      this.images = [...tempUrl, ...this.images];
      this.imageFiles = tempFile;
    },
    handleImg(e) {
      if (e.target.dataset.type) {
        this.images.splice(e.target.dataset.index, 1);
      } else {
        this.viewImg = e.target.currentSrc;
        this.isShow = true;
      }
    },
    async uploadImg() {
      if (this.imageFiles.length === 0) {
        this.$message.warning({
          message: "还没有选择图片噢～🥰",
          center: true,
          customClass: "warn-message",
          duration: 1000
        });
        return false;
      }
      let uploadImgPromise = await new Promise((resolve, rej) => {
        for (let file of this.imageFiles) {
          this.myCos.putObject(
            {
              Bucket: "izaya-1256042946",
              Region: "ap-chengdu",
              Key: `mypig/${file.name}`,
              StorageClass: "STANDARD",
              Body: file, // 上传文件对象
              onProgress: progressData => {
                // self.user.avator = progressData.Location;
                console.log(file.name);
              }
            },
            (err, data) => {
              console.log(err || data);
              console.log(data.Location);
              this.successUpload.push("http://" + data.Location);
              if (this.successUpload.length === this.imageFiles.length)
                resolve();
            }
          );
        }
      });
      let date = new Date();
      let data = this.successUpload.map(item => {
        return {
          date: date.toLocaleDateString(),
          content: item,
          timestamp: date.getTime() + "",
          type: 1
        };
      });
      // this.$axios.post("/insert", { data: data, type: 1 }).then(res => {
      //   if (res.data.success) {
      //     this.$message.success({
      //       message: "上传成功～🥰",
      //       center: true,
      //       customClass: "warn-message",
      //       duration: 1000
      //     });
      //     this.imageFiles = [];
      //     // setTimeout(() => {
      //     //   this.$router.push("/diaries");
      //     // }, 1100);
      //   } else {
      //     this.$message.error({
      //       message: res.data.result,
      //       center: true,
      //       customClass: "warn-message",
      //       duration: 1000
      //     });
      //   }
      // });
    }
  }
};
</script>

<style lang="less" >
.photos-main {
  height: calc(100% - 100px);
  overflow: auto;
}
.photo-upload .el-upload {
  background-color: #ffffff26;
  border-radius: 50%;
  border: 1px solid gainsboro;
  color: white;
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.photos-img {
  width: 45vw;
  height: 45vw;
  padding: 5px;
  border-radius: 5px;
}
.view-img {
  position: absolute;
  top: 0;
  background-color: #000000b0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 80%;
  }
}
.images-div-main {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .images-div {
    position: relative;
    .diary-del {
      position: absolute;
      top: 10px;
      right: 10px;
      color: white;
      background-color: #00000070;
    }
  }
}
</style>