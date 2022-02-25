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
      keyCodeArry: [],
    };
  },

  methods: {
    // 按下增加键盘监听数组keyCodeArry数据
    addKeyCodeArry(num, arr) {
      var check = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == num) {
          check = 1;
        }
      }
      if (check == 0) {
        arr.push(num);
      }
      return arr;
    },
    // 松开键盘清空键盘监听数组keyCodeArry数据
    deletKeyCodeArry(num, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == num) {
          arr.splice(i, 1);
        }
      }
      return arr;
    },
  },

  created() {
    // 全局监听键盘按下事件
    var _this = this;
    document.onkeydown = function (e) {
      let oEvent = e || event;
      let keyCode = oEvent.keyCode;
      _this.keyCodeArry = _this.addKeyCodeArry(keyCode, _this.keyCodeArry);
      console.log(_this.keyCodeArry);
    };
    document.onkeyup = function (e) {
      let oEvent = e || event;
      let keyCode = oEvent.keyCode;
      _this.keyCodeArry = _this.deletKeyCodeArry(keyCode, _this.keyCodeArry);
      console.log(_this.keyCodeArry);
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