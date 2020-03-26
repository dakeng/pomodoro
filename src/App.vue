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
        <div class="item-container task-list-title">
          <i class="iconfont icon-plus"></i>
          <span>新建清单</span>
          <span></span>
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
          <div class="task-list">
            <div class="task-list-title">清单</div>
            <div class="task-list-item">
              <i class="icon-circle "></i>
              <p>看Electron文档</p>
            </div>
            <div class="task-list-item">
              <i class="icon-circle "></i>
              <p>吃饭睡觉吃饭睡觉吃饭睡觉吃饭睡觉</p>
            </div>
          </div>
        </div>
        <div class="task-add-container">
          <i class="iconfont icon-plus"></i>
          <input value="添加任务"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron');

export default {
  data() {
    return {
      curTaskTitle: '',
    }
  },

  methods: {
    onToolEvent(msg) {
      ipcRenderer.send('toolEvent', msg);
    },
    onTaskActivate(title) {
      console.log(title);
      this.curTaskTitle = title;
    }
  }
}
</script>

<style lang="scss">
@import '//at.alicdn.com/t/font_1712277_w7o4lsqwkqr.css';

html {
  height: 100%;
  // background-color: #2f5573;
}

body {
  margin: 0;
  height: 100%;
  display: flex;
}

p {
  margin: 0;
}

input {
    padding: 0;
    border: none;
    background: none;
    font-size: inherit;
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
  margin-top: 24px;
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
  padding-top: 24px;
  color: #ddd;

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
      margin-top: 6px;

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
  margin-top: 12px;

  .icon-plus {
    width: 24px;
    height: 24px;
    line-height: 24px;
    margin-right: 12px;
    flex: 0 0 auto;
  }

  input {
    color: #ddd;
  }
}
</style>
