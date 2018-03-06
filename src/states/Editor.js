/* globals __DEV__ */
import Phaser from 'phaser'
import Joint from '../editor/Joint.js'
import Body from '../editor/Body.js'
import Animation from '../editor/Animation.js'
import AnimationPlayer from '../editor/AnimationPlayer'
import Events from '../ui/Events.js'
import {
    UI,
    renderUI
} from '../ui/Index.jsx'
import React from 'react'

export default class extends Phaser.State {

    create() {

        this.update = this.update.bind(this);
        this.onFrameClick = this.onFrameClick.bind(this);
        this.onAddFrame = this.onAddFrame.bind(this);
        this.onAnimationChange = this.onAnimationChange.bind(this);
        this.onJointMove = this.onJointMove.bind(this);
        this.onAnimationPlay = this.onAnimationPlay.bind(this);
        this.onAnimationStop = this.onAnimationStop.bind(this);

        this.viewwingFrame = 0;
        this.body = new Body(game.camera.width / 2, game.camera.height / 2);
        this.animation = new Animation(this);
        this.animationPlayer = null;
        Events.on('onAddFrame', this.onAddFrame);
        Events.on('onAnimationChange', this.onAnimationChange);
        Events.on('onJointMove', this.onJointMove);
        Events.on('onFrameSelect', this.onFrameClick);
        Events.on('onAnimationPlay', this.onAnimationPlay);
        Events.on('onAnimationStop', this.onAnimationStop);

        this.UI = renderUI();

        Events.fire('onAddFrame'); // add first frame
       
    }

    onAnimationPlay() {
        this.animationPlayer = new AnimationPlayer(this.animation, this.body);
        this.animationPlayer.start();
    }

    onAnimationStop() {
        this.animationPlayer = null;
    }

    onJointMove(joint) {
        this.body.update();
        const frame = this.getCurrentFrame();
        if(!frame.keyFrame) {
            Events.fire('onMakeKeyframe', this.viewwingFrame);  
        }
    }

    onAnimationChange() {
        this.animation.saveFrameData(this.body, this.viewwingFrame);
        const frame = this.getCurrentFrame();

        const nextKeyFrame = this.animation.getNextKeyFrame(this.viewwingFrame);
        const previousKeyFrame = this.animation.getPreviousKeyFrame(this.viewwingFrame);

        if (nextKeyFrame != undefined) {
            this.animation.interpolateFrames(this.viewwingFrame, nextKeyFrame, this.animation.frameData);
        }

        if (previousKeyFrame != undefined) {
            this.animation.interpolateFrames(previousKeyFrame, this.viewwingFrame, this.animation.frameData);
        }
    }

    onFrameClick(frameNumber) {
        this.viewwingFrame = frameNumber;
        this.animation.loadFrameData(this.body, frameNumber);
        this.body.update();
    }

    onAddFrame(frameNumber) {
        this.animation.addEmptyFrame();
    }

    getCurrentFrame() {
        return this.animation.frameData[this.viewwingFrame];
    }

    render() {
        Object.values(this.body.joints).forEach(joint => {
            joint.linesToConnectedJoints.forEach(line => {
                window.game.debug.geom(line);
            });
        })
    }

    update() {
        if(this.animationPlayer != null) {
            this.animationPlayer.update();
        }
    }

}