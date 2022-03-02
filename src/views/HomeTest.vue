<template>
  <div class="container bg-black">
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
    // 键盘按下
    onkeydown(key) {
      let topPosition = parseInt(this.topVar),
        leftPositon = parseInt(this.leftVar);
      switch (key) {
        case 40:
          console.log(topPosition + 1 + "%");
          this.topVar = topPosition + 1 + "%";
          break;
        case 38:
          console.log(topPosition - 1 + "%");
          this.topVar = topPosition - 1 + "%";
          break;
        case 37:
          console.log(leftPositon - 1 + "%");
          this.leftVar = leftPositon - 1 + "%";
          break;
        case 39:
          console.log(leftPositon + 1 + "%");
          this.leftVar = leftPositon + 1 + "%";
          break;
        default:
          break;
      }
    },

    test() {},
  },

  created() {
    // 全局监听键盘按下事件
    var _this = this;
    document.onkeydown = function (e) {
      // console.log(e); // 取到按下的具体键
      let key = e.keyCode; // 根据不同按键实现不同的功能
      // console.log(key);
      _this.onkeydown(key);
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