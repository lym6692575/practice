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
      // 监听数组
      keyCodeArry: [],
      // 移动状态
      moveUp: false,
      down: false,
      left: false,
      right: false,
    };
  },

  methods: {
    // 全局监听键盘事件
    keyboardWatcher() {
      var _this = this;

      // 键盘按下
      document.onkeydown = function (e) {
        let oEvent = e || event;
        let keyCode = oEvent.keyCode;
        _this.keyCodeArry = _this.addKeyCodeArry(keyCode, _this.keyCodeArry);
      };

      // 键盘松开
      document.onkeyup = function (e) {
        let oEvent = e || event;
        let keyCode = oEvent.keyCode;
        _this.keyCodeArry = _this.deletKeyCodeArry(keyCode, _this.keyCodeArry);
      };
    },

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
      console.log(arr);
      return arr;
    },

    // 松开键盘清空键盘监听数组keyCodeArry数据
    deletKeyCodeArry(num, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == num) {
          arr.splice(i, 1);
        }
      }
      console.log(arr);
      return arr;
    },

    changePosition(arr) {
      let onChangeArr = arr;
      console.log(onChangeArr);
    },
  },

  created() {
    this.keyboardWatcher();
  },
  watch: {
    keyCodeArry() {
      let arr = this.keyCodeArry;
      // 当数组长度为1
      if (arr.length == 1) {
        // arr.sort();
        console.log(arr[0]);
        let key = arr[0];
        switch (key) {
          case 38:
            this.moveUp = true;
            console.log(this.moveUp);
            break;

          default:
            break;
        }
      } else if (arr.length == 0) {
        this.moveUp = false;
        console.log(this.moveUp);
      }
    },

    moveUp() {
      while (this.moveUp == true) {
        console.log("1");
      }
    },
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