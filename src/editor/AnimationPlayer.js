import Events from '../events/Events'
import EventType from '../events/EventType.js'

class AnimationPlayer {
    constructor(animation, body) {
        this.body = body;
        this.frame = 0;
        this.animation = animation;
        this.animationFrames = this.animation.frameData;
        this.update = this.update.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.interpolation = 5;
    }

    update() {
        const frame = this.frames[this.frame];
        if(frame==undefined)
            return this.stop();
        this.animation.frameToBody(this.body, frame);
        this.frame++;
        this.body.update();
        if(this.frame==this.frames.lenght)
            this.stop();
    }

    start() {
        this.frame = 0;
        const interpolatedFrames = this.animation.fillNewInterpolatedFrames(this.interpolation, this.animationFrames);
        this.frames = interpolatedFrames;
    }

    stop() {
        Events.fire(EventType.ANIMATION_STOP);
    }

}

export default AnimationPlayer;