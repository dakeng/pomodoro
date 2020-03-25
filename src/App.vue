<template>
  <div id="app">
    <div class="title-bar">
      <div class="title-bar-container">
        <div class="title-bar-name">Pomodoro</div>
        <div class="title-bar-tool">
          <i class="iconfont icon-min" v-on:click="toolEvent('minimize')"></i>
          <i class="iconfont icon-max" v-on:click="toolEvent('maximize')"></i>
          <i class="iconfont icon-close" v-on:click="toolEvent('close')"></i>
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
          <div class="item-container task-list-title">
            <i class="iconfont icon-star"></i>
            <span>今天</span>
            <span></span>
          </div>
          <div class="item-container task-list-title">
            <i class="iconfont icon-menu"></i>
            <span>明天</span>
            <span></span>
          </div>
          <div class="item-container task-list-title">
            <i class="iconfont icon-calendar"></i>
            <span>日历</span>
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
      
      </div>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron');

export default {
  methods: {
    toolEvent(msg) {
      ipcRenderer.send('toolEvent', msg);
    },
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
  }

  .main-container {
    flex: 1 1 auto;
    background: #26445c;
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
  }

  .line {
    display: block;
    margin: 12px 24px;
    height: 1px;
    background: rgba($color: #fff, $alpha: .2);
  }

  .task-list-title {

  }
}
</style>
