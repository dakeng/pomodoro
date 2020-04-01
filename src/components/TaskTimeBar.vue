<template>
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
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
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
</style>