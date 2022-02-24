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
    changePosition(key) {
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
  },

  created() {
    // 全局监听键盘按下事件
    var _this = this;
    document.onkeydown = function (e) {
      console.log(e); // 取到按下的具体键
      let key = window.event.keyCode; // 根据不同按键实现不同的功能
      console.log(key);
      _this.changePosition(key);
    };
  },
};
</script>


<style>
.container {
  position: relative;
  width: 100%;
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