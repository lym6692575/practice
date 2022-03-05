<template>
  <div id="container" class="container bg-black">
    <button @click="test">停止移动</button>
    <button @click="showMark">输出mark</button>
    <button @click="addDiv">增加</button>
    <button @click="init">init</button>
    <div>长度:{{ this.headerState.length }}</div>
    <div id="head" class="head common" ref="head"></div>
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
      mark: [],
      // 方向控制
      key_pressed: {
        // up
        38: true,
        // down
        40: true,
        // left
        37: true,
        // right
        39: true,
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
    addDiv() {
      var newElement = document.createElement("div");
      document.getElementById("container").appendChild(newElement); //漏了这一句，否则行不通
      newElement.id = "newDiv";
      newElement.className = "common";
      newElement.setAttribute("name ", "newDivName");
    },
    // ============我是分割线===============

    //初始化
    init() {
      console.log(this.$refs.head.style);
      this.topVar = this.$refs.head.style.left = "400px";
      this.leftVar = this.$refs.head.style.top = "400px";
      console.log("topVar", this.topVar);
      console.log("leftVar", this.leftVar);
      this.record();
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

    // 通过改变direction改变移动方向
    changePoint(e) {
      let key = e.keyCode;
      let dd = this.key_pressed;
      // 控制方向状态唯一
      for (let key in dd) {
        if (dd[key] == true) {
          dd[key] = false;
        }
      }
      dd[key] = true;
      
      switch (key) {
        case 38:
          if (this.direction != null) {
            clearInterval(this.direction);
          }
          this.direction = setInterval(() => {
            this.$refs.head.style.top =
              parseInt(this.$refs.head.style.top) - 20 + "px";
            this.record();
          }, 150);
          break;
        case 40:
          if (this.direction != null) {
            clearInterval(this.direction);
          }
          this.direction = setInterval(() => {
            this.$refs.head.style.top =
              parseInt(this.$refs.head.style.top) + 20 + "px";
            this.record();
          }, 150);
          break;
        case 37:
          if (this.direction != null) {
            clearInterval(this.direction);
          }
          this.direction = setInterval(() => {
            this.$refs.head.style.left =
              parseInt(this.$refs.head.style.left) - 20 + "px";
            this.record();
          }, 150);
          break;
        case 39:
          if (this.direction != null) {
            clearInterval(this.direction);
          }
          this.direction = setInterval(() => {
            this.$refs.head.style.left =
              parseInt(this.$refs.head.style.left) + 20 + "px";
            this.record();
          }, 150);
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
      _this.changePoint(e);
    };
  },
  watch: {
    // 监听头部状态
    headerState: {
      deep: true,
      handler(newName) {
        console.log("newName", newName);
        // 上下移动
        if (newName.topVar) {
          if (parseInt(newName.topVar) > 860 || parseInt(newName.topVar) < 0) {
            this.$refs.head.style.left = "400px";
            this.ggState = true;
            debugger;
          }
        }

        // 左右移动
        if (newName.leftPositon) {
          if (
            parseInt(newName.leftVar) > 860 ||
            parseInt(newName.leftVar) < 0
          ) {
            this.$refs.head.style.left = "400px";
            this.ggState = true;
          }
        }
      },
    },
    ggState: {
      handler(newName) {
        if (newName == true) {
          alert("gg!");
          this.headerState.topVar = "50%";
          this.headerState.leftVar = "50%";
          this.test();
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
}
</style>