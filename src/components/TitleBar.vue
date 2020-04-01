<template>
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
</template>

<script>
const { ipcRenderer } = require('electron');

export default {
    methods: {
        onToolEvent(msg) {
            ipcRenderer.send('toolEvent', msg);
        }
    }
}
</script>

<style lang="scss">
.title-bar {
  -webkit-app-region: drag;

  position: fixed;
  left: 0;
  right: 0;
  z-index: 999;

  height: 32px;
  line-height: 32px;
  color: #fff;

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
</style>