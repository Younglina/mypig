<template>
  <div id="app">
    <div class="nav-main">
      <div class="nav-div">
        <!-- <div>
          <img
            src="https://izaya-1256042946.cos.ap-chengdu.myqcloud.com/mypig.gif"
            alt="mypig"
            class="nav-gif"
          />
        </div>-->
        <ul class="nav-ul">
          <!-- <li @click="popMsg">🍉</li> -->
          <li v-for="item in navs" :key="item.path">
            <router-link class="nav-link" :to="item.path">{{ item.pathName }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <transition enter-active-class="animated fadeIn fast">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <!-- <div class="live2d-canvas">
      <canvas id="canvas" width="250" height="350"></canvas>
    </div>-->
  </div>
</template>

<script>
import "css-doodle";
import "./App.less";
// import { Application } from '@pixi/app';
// import { Renderer } from '@pixi/core';
// import { Ticker, TickerPlugin } from '@pixi/ticker';
// import { InteractionManager } from '@pixi/interaction';
// Application.registerPlugin(TickerPlugin);
// Live2DModel.registerTicker(Ticker);

// 注册 InteractionManager 以支持 Live2D 模型的自动交互
// Renderer.registerPlugin('interaction', InteractionManager);
import * as PIXI from 'pixi.js'
window.PIXI = PIXI;
const { Live2DModel } = require('pixi-live2d-display');
export default {
  name: "App",
  props: {},
  data() {
    return {
      navs: [
        {
          path: "/",
          pathName: "首页"
        },
        {
          path: "/diaries",
          pathName: "日志"
        },
        {
          path: "/photos",
          pathName: "照片"
        },
        {
          path: "/one-year",
          pathName: "一周年"
        }
      ],
      blackCat:
        "https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-hijiki/assets/hijiki.model.json",
      whiteCat:
        "https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-tororo/assets/tororo.model.json",
      // https://cdn.jsdelivr.net/gh/tomiaa12/kuangyx.cn-public/live2d/dollsfrontline/kp31_310/normal/model.json
      // https://cdn.jsdelivr.net/gh/tomiaa12/kuangyx.cn-public/live2d/dollsfrontline/welrod_1401/normal/model.json
      // https://cdn.jsdelivr.net/gh/tomiaa12/kuangyx.cn-public/live2d/dollsfrontline/hk416_805/normal/model.json
      // https://cdn.jsdelivr.net/gh/tomiaa12/kuangyx.cn-public/live2d/rem/model.json
      // https://cdn.jsdelivr.net/gh/tomiaa12/kuangyx.cn-public/live2d/dollsfrontline/95type_405/normal/model.json

    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initLive2d()
      this.initClickAnimate()
    })

  },
  methods: {
    async initLive2d() {
      const app = new PIXI.Application({
        view: document.getElementById('canvas'),
        autoStart: true,
        width: 120,
        height: 150,
        resolution: 1,
        transparent: true
      });
      // https://github.com/QiShaoXuan/live2DModel
      const model = await Live2DModel.from(this.blackCat);
      // app.renderer.backgroundColor = 0xffffff;
      app.renderer.autoResize = true;
      model.x = -1
      model.y = -20
      model.scale.set(0.08, 0.08);
      app.stage.addChild(model);
      // model.anchor.set(0.5, 0.5);
      // 交互
      model.on('hit', hitAreas => {
        if (hitAreas.includes('body')) {
          model.motion('tap_body');
        }
      });
    },
    initClickAnimate() {
      var coreSocialistValues = ["🍉", "💙", "💚", "💛", "💜", "🖤", "💕", "💖", "💗", "🐷", "🥰", "😘", "爱你哟", "😍"],
        index = Math.floor(Math.random() * coreSocialistValues.length);
      document.body.addEventListener('click', function (e) {
        if (e.target.tagName == 'A') {
          return;
        }
        var x = e.pageX,
          y = e.pageY,
          span = document.createElement('span');
        span.textContent = coreSocialistValues[index];
        index = (index + 1) % coreSocialistValues.length;
        span.style.cssText = ['z-index: 9999999; position: absolute; font-size: 14px; font-weight: bold; color: red; top: ', y - 20, 'px; left: ', x, 'px;'].join('');
        document.body.appendChild(span);
        animate(span);
      });
      function animate(el) {
        var i = 0,
          top = parseInt(el.style.top),
          id = setInterval(frame, 16.7);

        function frame() {
          if (i > 180) {
            clearInterval(id);
            el.parentNode.removeChild(el);
          } else {
            i += 2;
            el.style.top = top - i + 'px';
            el.style.opacity = (180 - i) / 180;
          }
        }
      };
    },
    popMsg() {

    }
  }
};
</script>

<style lang="less">
#app {
  overflow: hidden;
  position: relative;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
.nav-main {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  .nav-div {
    display: flex;
    align-items: center;
    padding: 5px 0;
    height: 60px;
    margin-bottom: 10px;
  }
  .nav-gif {
    width: 60px;
    height: 60px;
    margin-right: 20px;
  }
}
.nav-link {
  text-decoration: none;
  color: white;
}
.nav-ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    margin: 0 10px;
    min-width: 30px;
  }
}
.live2d-canvas {
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
