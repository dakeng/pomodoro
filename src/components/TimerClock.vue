<template>
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
                @click="$emit('on-pause')">
            </i>
            <i
                class="iconfont icon-play"
                v-else
                @click="$emit('on-start', currentId)">
            </i>
            <i
                class="iconfont icon-stop"
                v-show="timer && timer.timing"
                @click="$emit('on-stop')">
            </i>
        </div>
    </div>
</template>

<script>
export default {
    props: ['timer', 'duration', 'currentId'],
}
</script>

<style lang="scss">
.timer-container {
  padding: 12px 24px 24px;
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
</style>