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
@import '//at.alicdn.com/t/font_1712277_nf4b7m31uva.css';

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
  height: 32px;
  line-height: 32px;
  color: #fff;
  background: rgba($color: #fff, $alpha: .2);

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
        background: rgba($color: #fff, $alpha: .25);
      }
    }
  }
}
</style>
