<template>
  <div id="app">
    <div class="title-bar">
      <div class="title-bar-container">
        <div class="title-bar-name">Pomodoro</div>
        <div class="title-bar-tool">
          <i class="iconfont icon-min" v-on:click="onToolEvent('minimize')"></i>
          <i class="iconfont icon-max" v-on:click="onToolEvent('maximize')"></i>
          <i class="iconfont icon-close" v-on:click="onToolEvent('close')"></i>
        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="side-container">
        <div class="item-container user-container">
          <i class="iconfont icon-user"></i>
          <span>User</span>
        </div>
        <div class="task-container">
          <div class="item-container task-list-title"
            v-on:click="onTaskActivate('today')"
            :class="{activate: curTaskTitle=='today'}"
          >
            <i class="iconfont icon-star"></i>
            <span>任务</span>
            <span></span>
          </div>
          <div class="item-container task-list-title">
            <i class="iconfont icon-calendar"></i>
            <span>日程</span>
            <span></span>
          </div>
          <i class="line"></i>
        </div>
        <div class="tak-container add-list">
          <div class="item-container task-list-title">
            <i class="iconfont icon-plus"></i>
            <span>新建清单</span>
            <span></span>
          </div>
        </div>
        <div class="timer-container">
          <p class="timer-title">任务正在执行</p>
          <div class="timer">
            <div class="clock">
              <svg viewBox="0 0 500 500">
                <circle cx="250" cy="250" r="250" fill="#e85038" fill-opacity="0.4"></circle>
                <circle cx="250" cy="250" r="220" fill="#e85038"></circle>
                <text
                    x="250" y="250"
                    fill="#f6f7eb"
                    font-size="80"
                    font-family="Microsoft YaHei"
                    text-anchor="middle"
                    textLength="240"
                    dominant-baseline="central">
                    {{ timer && timer.timing ? timer.current : duration}}:00
                </text>
                <symbol id="dot">
                    <ellipse
                        cx="4" cy="16"
                        rx="4" ry="16"
                        fill="#FEC86C"
                        opacity="1">
                    </ellipse>
                </symbol>
                <use xlink:href="#dot" x="246" y="50" opacity=".2"/>
                <use xlink:href="#dot" x="246" y="50" transform="rotate(30, 250, 250)" opacity=".2"/>
                <use xlink:href="#dot" x="246" y="50" transform="rotate(60, 250, 250)" opacity=".2"/>
                <use xlink:href="#dot" x="246" y="50" transform="rotate(90, 250, 250)" opacity=".2"/>
                <use xlink:href="#dot" x="246" y="50" transform="rotate(120, 250, 250)" opacity=".2"/>
                <use xlink:href="#dot" x="246" y="50" transform="rotate(150, 250, 250)" opacity=".2"/>
                <use xlink:href="#dot" x="246" y="50" transform="rotate(180, 250, 250)" opacity=".2"/>
                <use xlink:href="#dot" x="246" y="50" transform="rotate(210, 250, 250)" opacity=".2"/>
                <use xlink:href="#dot" x="246" y="50" transform="rotate(240, 250, 250)" opacity=".2"/>
                <use xlink:href="#dot" x="246" y="50" transform="rotate(270, 250, 250)" opacity=".2"/>
                <use xlink:href="#dot" x="246" y="50" transform="rotate(300, 250, 250)" opacity=".2"/>
                <use xlink:href="#dot" x="246" y="50" transform="rotate(330, 250, 250)" opacity=".2"/>
                <use xlink:href="#dot" x="246" y="50" transform="rotate(360, 250, 250)" opacity=".2"/>
              </svg>
            </div>
            <i
              class="iconfont icon-timeout"
              v-if="timer && timer.timing && !timer.paused"
              v-on:click="onPause">
            </i>
            <i
              class="iconfont icon-play"
              v-else
              v-on:click="onStart(currentId)">
            </i>
            <i
              class="iconfont icon-stop"
              v-show="timer && timer.timing"
              v-on:click="onStop">
            </i>
          </div>
        </div>
      </div>
      <div class="main-container">
        <div class="task-title">
          <i class="iconfont icon-star"></i>
          <span>任务</span>
        </div>
        <div class="task-timer">
          <div class="task-timer-item">
            <div class="task-timer-count">0</div>
            <div class="task-timer-type">已用时（h）</div>
          </div>
          <div class="task-timer-item">
            <div class="task-timer-count">0</div>
            <div class="task-timer-type">已用时（h）</div>
          </div>
          <div class="task-timer-item">
            <div class="task-timer-count">0</div>
            <div class="task-timer-type">已用时（h）</div>
          </div>
          <div class="task-timer-item">
            <div class="task-timer-count">0</div>
            <div class="task-timer-type">已用时（h）</div>
          </div>
        </div>
        <div class="task-list-container">
          <ul class="task-list">
            <li
              v-for="task in taskList"
              :key="task.created"
              class="task-list-item"
            >
              <i class="iconfont icon-circle"></i>
              <p class="task-name">{{ task.name }}</p>
              <i
                class="iconfont icon-timeout" 
                v-if="timer && timer.timing && !timer.paused"
                v-on:click="onPause">
              </i>
              <i
                class="iconfont icon-play"
                v-else
                v-on:click="onStart(task.id)">
              </i>
              <i
                v-show="timer && timer.timing"
                class="iconfont icon-stop"
                v-on:click="onStop">
              </i>
              <i class="iconfont icon-delete" v-on:click="onDeleteTask(task.id)"></i>
            </li>
          </ul>
        </div>
        <div class="task-add-container">
          <i class="iconfont icon-plus"></i>
          <input placeholder="添加任务"
            v-model.trim="name"
            v-on:keyup.enter="onAddTask"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Timer from './timer';
const { ipcRenderer } = require('electron');

// task
// {
//   id: '',
//   name: '',
//   created: '',
//   timers: 4,
//   finished: 1,
//   deadline: '',
//   isFinish: false,
//   belong: '',
// }

export default {
  data() {
    return {
      curTaskTitle: '',
      taskList: [],
      name: '',
      timer: null,
      duration: 25,
      currentId: null,
    }
  },

  methods: {
    onToolEvent(msg) {
      ipcRenderer.send('toolEvent', msg);
    },
    onTaskActivate(title) {
      console.log(title);
      this.curTaskTitle = title;
    },
    onAddTask() {
      const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      this.$db.get('taskList').insert(Object.assign({
        name: '',
        created: '',
        timers: 0,
        finished: 0,
        deadline: '',
        isFinish: false,
        belong: '',  
      }, {
        created: date,
        name: this.name,
      })).write();
      this.name = '';
      this.taskList = this.$db.get('taskList').value();
    },
    onDeleteTask(id) {
      this.$db.get('taskList').removeById(id).write();
      this.taskList = this.$db.get('taskList').value();
      // console.log(this.taskList);
    },
    onStart(id) {
      // 切换计时器 id不一致stop
      if (this.currentId !== id && this.timer) {
        this.timer.stop();
      }
      this.currentId = id;
      if (this.timer && this.timer.timing) {
        this.timer.paused && this.timer.play();
      } else {
        this.timer = new Timer(this.duration, 1).start();
      }
      console.log(this.timer);
    },
    onPause() {
      this.timer.pause();
    },
    onStop() {
      this.timer && this.timer.stop();
    }
  },

  created() {
    console.log(this.$db.get('taskList').value());
    this.taskList = this.$db.get('taskList').value();
  }
}
</script>

<style lang="scss">
@import '//at.alicdn.com/t/font_1712277_2o9gdja8gjb.css';

html {
  height: 100%;
  // background-color: #2f5573;
}

body {
  margin: 0;
  height: 100%;
  display: flex;
}

p, ul, li {
  margin: 0;
  padding: 0;
}

input {
    display: block;
    padding: 0;
    border: none;
    background: none;
    font-size: inherit;
    outline: none;
}

#app {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfont {
  font-size: 18px;
  font-style: normal;
}

.title-bar {
  -webkit-app-region: drag;

  position: fixed;
  left: 0;
  right: 0;
  z-index: 999;

  height: 32px;
  line-height: 32px;
  color: #fff;
  // background: rgba($color: #fff, $alpha: .2);

  .title-bar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title-bar-name {
    padding: 0 12px;
  }

  .title-bar-tool {
    display: flex;
    align-items: center;

    i {
      -webkit-app-region: no-drag;
      padding: 0 12px;
      user-select: none;

      &:hover {
        background: rgba($color: #fff, $alpha: .1);
      }
    }
  }
}

.content-container {
  height: 100%;
  display: flex;

  .side-container, .main-container {
    padding-top: 48px;
  }

  .side-container {
    flex: 0 0 320px;
    background: #323232;
  }

  .main-container {
    flex: 1 1 auto;
    background: #222;
  }
}

.side-container {
  color: #ccc;
  display: flex;
  flex-direction: column;

  .item-container {
    padding: 0 12px;

    display: flex;

    i, span {
      line-height: 48px;
      vertical-align: middle;
      cursor: default;
    }

    i {
      padding: 0 12px;
    }

    &:hover {
      background: rgba($color: #fff, $alpha: .1);
    }

    &.activate {
      color: #e85038;
      font-weight: bold;
      background: rgba($color: #000, $alpha: .1);

      &::before {
        content: '';
        display: inline-block;
        width: 2px;
        margin: 8px 0 8px -2px;
        background: #e85038;
      }
    }
  }

  .line {
    display: block;
    margin: 12px 24px;
    height: 1px;
    background: rgba($color: #fff, $alpha: .2);
  }

  .add-list {
    flex: 1 1 auto;
  }
}

.timer-container {
  padding: 24px;
  text-align: center;

  .timer-title {
    line-height: 32px;
    background: rgba($color: #e85038, $alpha: .2);
    margin-bottom: 12px;
  }

  .timer {
    display: flex;
    align-items: center;

    .iconfont {
      font-size: 32px;
      color: #e85038;
      margin-left: 12px;

      &:hover {
        color: #b9402d;
      }
    }

    .clock {
      width: 120px;
    }
  }
}

.main-container {
  display: flex;
  flex-direction: column;
  padding: 24px;

  .task-title {
    color: #fff;
    font-size: 28px;

    .iconfont {
      font-size: 24px;
      padding: 0 12px;
    }
  }
}

.task-timer {
  background: rgba($color: #000, $alpha: .2);
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  margin: 24px 0;
  border-radius: 4px;

  .task-timer-item {
    text-align: center;

    .task-timer-count {
      color: #e85038;
      font-size: 28px;
    }

    .task-timer-type {
      color: #aaa;
      font-size: 14px;
    }
  }
}

.task-list-container {
  flex: 1 1 auto;
  color: #ddd;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  .task-list {
    .task-list-title {
      display: flex;
      line-height: 32px;

      &::before {
        content: '';
        display: inline-block;
        width: 2px;
        background: #fff;
        margin: 6px 12px 6px 0;
      }
    }

    .task-list-item {
      display: flex;
      align-items: center;
      background: rgba($color: #000, $alpha: .2);
      padding: 16px;
      border-radius: 4px;
      margin-bottom: 6px;

      &:hover {
        background: rgba($color: #fff, $alpha: .05);
      }

      &:last-child {
        margin-bottom: 0;
      }

      .task-name {
        flex: 1 1 auto;
      }

      .iconfont {
        font-size: 24px;
        color: #aaa;
        margin-right: 12px;

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          color: #e85038;
        }
      }

      .icon-circle {
        display: inline-block;
        width: 24px;
        height: 24px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2px solid #aaa;
        margin-right: 12px;
        flex: 0 0 auto;
      }
    }
  }
}

.task-add-container {
  color: #aaa;
  display: flex;
  align-items: center;
  background: rgba($color: #000, $alpha: .2);
  padding: 16px;
  border-radius: 4px;
  margin-top: 24px;

  .icon-plus {
    width: 24px;
    height: 24px;
    line-height: 24px;
    margin-right: 12px;
    flex: 0 0 auto;
  }

  input {
    color: #ddd;
    flex: 1 1 auto;
  }
}
</style>
