export default class Timer {
    timerId = null;
    timing = false;
    paused = false;
    current = 0;
    duration = 0;

    constructor(duration, rate) {
        this.duration = duration;
        this.current = duration;
        this.rate = rate;
        return this;
    }

    start() {
        this.timerId = setInterval(() => {
            if (this.current > 0) {
                this.current -= 1;
            } else {
                this.stop();
            }
        }, this.rate * 1000);
        this.timing = true;
        return this;
    }

    play() {
        this.timerId = setInterval(() => {
            if (this.current > 0) {
                this.current -= 1;
            } else {
                this.stop();
            }
        }, this.rate * 1000);
        this.paused = false; 
        return this;
    }

    pause() {
        clearInterval(this.timerId);
        this.paused = true;
        return this;
    }

    stop() {
        clearInterval(this.timerId);
        this.timing = false;
        return this;
    }
}