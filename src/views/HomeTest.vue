<template>
  <div id="container" class="container bg-black">
    <button @click="test">停止移动</button>
    <button @click="showMark">输出mark</button>
    <button @click="addTail">增加尾巴</button>
    <button @click="showkey">showkey</button>
    <button @click="init">init</button>
    <div>长度:{{ this.headerState.length }}</div>
    <div id="head" class="head common" ref="head">H</div>
    <div v-for="(item, index) in mark" :key="index">
      <!-- {{ item }},{{ index }},{{ mark.length }}, mark.length-index-1
      {{ mark.length - index - 1 }} -->
      <div
        :id="'tail' + (index + 1)"
        class="common"
        :style="{
          top: mark[mark.length - index - 1][0],
          left: mark[mark.length - index - 1][1],
        }"
      >
        {{ index }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeTest",
  components: {},
  data() {
    return {
      // 头的属性
      headerState: {
        topVar: "",
        leftVar: "",
        length: 1,
      },
      // 移动历史
      // 先top 后 left
      mark: [],
      tail: [],
      // 方向控制
      key_pressed: {
        // up
        38: false,
        // down
        40: false,
        // left
        37: false,
        // right
        39: false,
      },
      // 存储持续移动的setInterval
      direction: null,

      // 游戏状态
      ggState: false,
    };
  },

  methods: {
    // 测试用
    test() {
      clearInterval(this.direction);
    },
    showMark() {
      console.log(this.mark);
    },
    showkey() {
      console.log(this.key_pressed);
      console.log(this.key_pressed[38]);
      console.log(this.key_pressed[39]);
    },

    // 添加div
    addTail() {
      let newElement = document.createElement("div");
      let divIndex = this.headerState.length;
      document.getElementById("container").appendChild(newElement); //漏了这一句，否则行不通
      newElement.id = "newDiv" + divIndex;
      newElement.className = "common";
      newElement.innerHTML = divIndex;
      // 新增的div的位置定位
      if (this.mark) {
        newElement.style.top = this.mark[this.mark.length - 2][0];
        newElement.style.left = this.mark[this.mark.length - 2][1];
      }
      // 修改length数据
      this.headerState.length++;
    },
    // ============我是分割线===============

    //初始化
    init() {
      // console.log(this.$refs.head.style);
      this.headerState.leftVar = this.$refs.head.style.top = "440px";
      this.headerState.topVar = this.$refs.head.style.left = "400px";
      this.record();
      clearInterval(this.direction);
      this.ggState = false;
      this.mark = [];

      for (let key in this.key_pressed) {
        this.key_pressed[key] = false;
      }
    },

    // 记录位置
    record() {
      let top = this.$refs.head.style.top;
      let left = this.$refs.head.style.left;
      // mark的最大长度以后改,为宽高像素除头部像素
      if (this.mark.length < 10) {
        this.mark.push([top, left]);
      } else {
        this.mark = this.mark.splice(1);
        this.mark.push([top, left]);
      }
    },

    // 刷新尾巴的位置
    refresh() {
      let length = this.headerState.length;
      let markLength = this.mark.length;
      for (let i = 1; i < length; i++) {
        const divname = "newDiv" + i;
        // console.log(divname);
        let div = document.getElementById(divname);
        // console.log(div.style);

        div.style.top = this.mark[markLength - i - 1][0];
        div.style.left = this.mark[markLength - i - 1][1];
      }
    },

    // 通过改变direction改变移动方向
    changePoint(e) {
      let key = e.keyCode;
      // 记录移动状态并确保状态唯一
      for (let key in this.key_pressed) {
        if (this.key_pressed[key] == true) {
          this.key_pressed[key] = false;
        }
      }
      this.key_pressed[key] = true;
      // 需要先记录再刷新
      switch (key) {
        case 38:
          if (this.direction != null) {
            clearInterval(this.direction);
          }
          this.direction = setInterval(() => {
            this.record();
            this.headerState.topVar = this.$refs.head.style.top =
              parseInt(this.$refs.head.style.top) - 40 + "px";
            this.refresh();
          }, 150);
          break;
        case 40:
          if (this.direction != null) {
            clearInterval(this.direction);
          }
          this.direction = setInterval(() => {
            this.record();
            this.headerState.topVar = this.$refs.head.style.top =
              parseInt(this.$refs.head.style.top) + 40 + "px";
            this.refresh();
          }, 150);
          break;
        case 37:
          if (this.direction != null) {
            clearInterval(this.direction);
          }
          this.direction = setInterval(() => {
            this.record();
            this.headerState.leftVar = this.$refs.head.style.left =
              parseInt(this.$refs.head.style.left) - 40 + "px";
            this.refresh();
          }, 150);
          break;
        case 39:
          if (this.direction != null) {
            clearInterval(this.direction);
          }
          this.direction = setInterval(() => {
            this.record();
            this.headerState.leftVar = this.$refs.head.style.left =
              parseInt(this.$refs.head.style.left) + 40 + "px";
            this.refresh();
          }, 150);
          break;
        default:
          break;
      }
    },
  },

  created() {},
  mounted() {
    // 全局监听键盘事件
    var _this = this;
    document.onkeydown = function (e) {
      let currentKey = e.keyCode;
      console.log(currentKey);
      if (
        (currentKey == 37 && _this.key_pressed[39] == false) ||
        (currentKey == 38 && _this.key_pressed[40] == false) ||
        (currentKey == 39 && _this.key_pressed[37] == false) ||
        (currentKey == 40 && _this.key_pressed[38] == false)
      )
        _this.changePoint(e);
    };
    this.init();
  },
  watch: {
    // 监听头部状态
    headerState: {
      deep: true,
      handler(newName) {
        // 上下移动
        if (newName.topVar) {
          if (parseInt(newName.topVar) > 760 || parseInt(newName.topVar) < 0) {
            this.ggState = true;
          }
        }

        // 左右移动
        if (newName.leftVar) {
          if (
            parseInt(newName.leftVar) > 760 ||
            parseInt(newName.leftVar) < 0
          ) {
            this.ggState = true;
          }
        }
      },
    },

    // 观测死亡状态
    ggState: {
      handler(newName) {
        if (newName == true) {
          alert("gg!");
          this.headerState.topVar = this.$refs.head.style.top = "50%";
          this.headerState.leftVar = this.$refs.head.style.left = "50%";
          this.test();
          this.init();
        }
      },
    },
  },
};
</script>


<style>
.bg-black {
  background-color: #d9d9d9;
}
.container {
  position: relative;
  width: 800px;
  height: 800px;
  margin: 0% auto;
  border-radius: 2%;
}
.common {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 40px;
  width: 40px;
  background: #262626;
  border-radius: 20%;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  line-height: 40px;
}
</style>