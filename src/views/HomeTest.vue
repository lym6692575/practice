<template>
  <div class="container">
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
    };
  },

  methods: {
    // 移动方向
    changePosition(e) {
      let key = e.keyCode; // 根据不同按键实现不同的功能
      let topPosition = parseInt(this.topVar);
      let leftPositon = parseInt(this.leftVar);
      switch (key) {
        // up
        case 40:
          console.log(topPosition + 1 + "%");
          this.topVar = topPosition + 1 + "%";
          break;
        // down
        case 38:
          console.log(topPosition - 1 + "%");
          this.topVar = topPosition - 1 + "%";
          break;
        // left
        case 37:
          console.log(leftPositon - 1 + "%");
          this.leftVar = leftPositon - 1 + "%";
          break;
        // right
        case 39:
          console.log(leftPositon + 1 + "%");
          this.leftVar = leftPositon + 1 + "%";
          break;
        // up and left
        case 13 && 17:
          console.log("1");
          break;
        default:
          break;
      }
    },
  },

  created() {
    // 全局监听键盘按下事件
    var _this = this;
    document.onkeydown = function (e) {
      console.log(e.keyCode); // 取到按下的具体键
      _this.changePosition(e);
      // if (13 == key && e.ctrlKey) {
      //   console.log("1");
      // }
    };
  },
};
</script>


<style>
.container {
  position: relative;
  width: 800px;
  height: 800px;
}
.test-div {
  position: absolute;
  left: var(--left);
  top: var(--top);
  height: 40px;
  width: 40px;
  background: red;
}
</style>