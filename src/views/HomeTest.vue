<template>
  <div class="container bg-black">
    <button @click="test">点我输出key_pressed</button>
    <div :style="{ '--top': topVar, '--left': leftVar }" class="test-div"></div>
  </div>
</template>

<script>
export default {
  name: "HomeTest",
  components: {},
  data() {
    return {
      topVar: "50%",
      leftVar: "50%",
      key_pressed: {
        setUp: false,
        setDown: false,
        setLeft: false,
        setRight: false,
      },
    };
  },

  methods: {
    test() {
      console.log(this.key_pressed);
    },
    // 键盘按下
    onkeydown(e) {
      // console.log(e); // 取到按下的具体键
      let key = e.keyCode; // 根据不同按键实现不同的功能
      // console.log(key);
      switch (key) {
        case 38:
          this.key_pressed.setUp = true;
          break;
        case 40:
          this.key_pressed.setDown = true;
          break;
        case 37:
          this.key_pressed.setLeft = true;
          break;
        case 39:
          this.key_pressed.setRight = true;
          break;
        default:
          break;
      }
    },

    // 键盘按下
    onkeyup(e) {
      // console.log(e); // 取到按下的具体键
      let key = e.keyCode; // 根据不同按键实现不同的功能
      // console.log(key);
      switch (key) {
        case 38:
          this.key_pressed.setUp = false;
          break;
        case 40:
          this.key_pressed.setDown = false;
          break;
        case 37:
          this.key_pressed.setLeft = false;
          break;
        case 39:
          this.key_pressed.setRight = false;
          break;
        default:
          break;
      }
    },
  },

  created() {
    // 全局监听键盘事件
    var _this = this;
    document.onkeydown = function (e) {
      _this.onkeydown(e);
    };
    document.onkeyup = function (e) {
      _this.onkeyup(e);
    };
  },
  watch: {
    topVar() {
      let topPosition = parseInt(this.topVar);
      if (topPosition > 95 || topPosition < 0) {
        console.log("出界了！");
      }
    },
    leftVar() {
      let leftPositon = parseInt(this.leftVar);
      if (leftPositon > 95 || leftPositon < 0) {
        console.log("出界了！");
      }
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
.test-div {
  position: absolute;
  left: var(--left);
  top: var(--top);
  height: 40px;
  width: 40px;
  background: #262626;
  border-radius: 20%;
}
</style>