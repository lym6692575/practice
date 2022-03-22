<template>
  <div id="container" class="container bg-black">
    <button @click="test">停止移动</button>
    <button @click="showMark">showMark</button>
    <button @click="addTail">增加尾巴长度</button>
    <button @click="showheaderState">showheaderState</button>
    <button @click="showFoodState">showFoodState</button>
    <button @click="randomFoodPosition">randomFoodPosition</button>
    <button @click="init">init</button>
    <div>长度:{{ this.mark.length }}</div>
    <!-- 头 -->
    <div id="head" class="common head" ref="head">H</div>
    <!-- 尾巴 -->
    <div v-for="(item, index) in mark" :key="index">
      {{ item }},{{ index }}, mark.length-index-1
      {{ mark.length - index - 1 }}
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
    <div id="food" class="common food" ref="food">F</div>
  </div>
</template>

<script>
export default {
  name: "HomeTest",
  components: {},
  data() {
    return {
      // 头的位置
      headerState: {
        X: "",
        Y: "",
      },
      // 移动位置历史,先top 后 left
      mark: [],
      // 尾巴长度
      tailMax: 0,
      // 食物的属性
      foodState: {
        X: "",
        Y: "",
      },
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
      this.mark.forEach((e) => {
        console.log(e);
      });
    },
    showheaderState() {
      console.log(this.headerState);
    },
    showFoodState() {
      console.log(this.foodState);
    },

    // 刷新food随机位置
    randomFoodPosition() {
      let x = parseInt(20 * Math.random());
      let y = parseInt(20 * Math.random());
      console.log(x, y);

      this.foodState.X = this.$refs.food.style.top = x * 40 + "px";
      this.foodState.Y = this.$refs.food.style.left = y * 40 + "px";
    },

    // 增加尾巴
    addTail() {
      // 忘了这是啥了
      // let newElement = document.createElement("div");
      // let divIndex = this.headerState.length;
      // document.getElementById("container").appendChild(newElement); //漏了这一句，否则行不通
      // newElement.id = "newDiv" + divIndex;
      // newElement.className = "common";
      // newElement.innerHTML = divIndex;
      // // 新增的div的位置定位
      // if (this.mark) {
      //   newElement.style.top = this.mark[this.mark.length - 2][0];
      //   newElement.style.left = this.mark[this.mark.length - 2][1];
      // }
      // // 修改length数据
      // this.headerState.length++;
      this.tailMax++;
    },
    // ============我是分割线===============

    //初始化
    init() {
      // 头部
      this.headerState.X = this.$refs.head.style.top = "440px";
      this.headerState.Y = this.$refs.head.style.left = "400px";
      this.record();
      clearInterval(this.direction);
      this.ggState = false;
      this.mark = [];
      // 移动状态
      for (let key in this.key_pressed) {
        this.key_pressed[key] = false;
      }
      // 食物
      this.foodState.X = this.$refs.food.style.top = "280px";
      this.foodState.Y = this.$refs.food.style.left = "400px";
    },

    // 记录位置并实时判断尾巴的最大长度
    record() {
      let top = this.$refs.head.style.top;
      let left = this.$refs.head.style.left;
      // 当尾巴最大长度!=0，记录坐标位置
      if (this.tailMax != 0) {
        // 尾巴最大长度
        if (this.mark.length < this.tailMax && this.mark.length <= 10) {
          this.mark.push([top, left]);
        } else {
          this.mark = this.mark.splice(1);
          this.mark.push([top, left]);
        }
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
            this.headerState.X = this.$refs.head.style.top =
              parseInt(this.$refs.head.style.top) - 40 + "px";
          }, 150);
          break;
        case 40:
          if (this.direction != null) {
            clearInterval(this.direction);
          }
          this.direction = setInterval(() => {
            this.record();
            this.headerState.X = this.$refs.head.style.top =
              parseInt(this.$refs.head.style.top) + 40 + "px";
          }, 150);
          break;
        case 37:
          if (this.direction != null) {
            clearInterval(this.direction);
          }
          this.direction = setInterval(() => {
            this.record();
            this.headerState.Y = this.$refs.head.style.left =
              parseInt(this.$refs.head.style.left) - 40 + "px";
          }, 150);
          break;
        case 39:
          if (this.direction != null) {
            clearInterval(this.direction);
          }
          this.direction = setInterval(() => {
            this.record();
            this.headerState.Y = this.$refs.head.style.left =
              parseInt(this.$refs.head.style.left) + 40 + "px";
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
        if (newName) {
          let HX = parseInt(newName.X);
          let HY = parseInt(newName.Y);
          let FX = parseInt(this.foodState.X);
          let FY = parseInt(this.foodState.Y);
          // 判断死亡
          if (
            parseInt(HX) > 760 ||
            parseInt(HX) < 0 ||
            parseInt(HY) > 760 ||
            parseInt(HY) < 0
          ) {
            this.ggState = true;
          }
          // 观测头部是否撞到尾巴

          // 观测head吃food
          if (HX == FX && HY == FY) {
            this.randomFoodPosition();
            this.addTail();
          }
        }
      },
    },

    // 观测死亡状态
    ggState: {
      handler(newName) {
        if (newName == true) {
          alert("gg!");
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
.food {
  background: red;
}
</style>