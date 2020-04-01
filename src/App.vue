<template>
  <div id="app">
    <title-bar></title-bar>

    <div class="content-container">

      <div class="side-container">
        <div class="item-container user-container">
          <i class="iconfont icon-user"></i>
          <span>User</span>
        </div>
        <div class="task-container">
          <div class="item-container task-list-title"
            @click="onTaskActivate('today')"
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
        
        <timer-clock
          :timer="timer"
          :duration="duration"
          :currentId="currentId"
          @on-start="onStart"
          @on-pause="onPause"
          @on-stop="onStop"
        >
        </timer-clock>

      </div>

      <div class="main-container">
        <div class="task-title">
          <i class="iconfont icon-star"></i>
          <span>任务</span>
        </div>
        
        <task-time-bar></task-time-bar>

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
                v-if="currentId===task.id && timer && timer.timing && !timer.paused"
                @click="onPause">
              </i>
              <i
                class="iconfont icon-play"
                v-else
                @click="onStart(task.id)">
              </i>
              <i
                v-show="currentId === task.id && timer && timer.timing"
                class="iconfont icon-stop"
                @click="onStop">
              </i>
              <i class="iconfont icon-delete" @click="onDeleteTask(task.id)"></i>
            </li>
          </ul>
        </div>
        <div class="task-add-container">
          <i class="iconfont icon-plus"></i>
          <input placeholder="添加任务"
            v-model.trim="name"
            @keyup.enter="onAddTask"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Timer from './timer';
import TitleBar from './components/TitleBar';
import TaskTimeBar from './components/TaskTimeBar';
import TimerClock from './components/TimerClock';

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
  components: {
    'title-bar': TitleBar,
    'task-time-bar': TaskTimeBar,
    'timer-clock': TimerClock,
  },

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
    },
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

  .add-list {
    flex: 1 1 auto;
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

.line {
  display: block;
  margin: 12px 24px;
  height: 1px;
  background: rgba($color: #fff, $alpha: .2);
}

.bg-red {
  background: #e85038;
}
</style>
