import Events from '../events/Events'
import Interpolation from '../util/Interpolation.js'
import JointStructure from './JointStructure.js'
import deepmerge from 'deepmerge' 
import Frame from './Frame.js';
import EventType from '../events/EventType.js';

class Animation {
    constructor() {
        this.frameData = [];
        this.bodyToFrame = this.bodyToFrame.bind(this);
        this.loadFrameData = this.loadFrameData.bind(this);
        this.bodyToFrame = this.bodyToFrame.bind(this);
        this.getNextKeyFrame = this.getNextKeyFrame.bind(this);
        this.getPreviousKeyFrame = this.getPreviousKeyFrame.bind(this);
        this.addEmptyFrame = this.addEmptyFrame.bind(this);
        this.fillNewInterpolatedFrames = this.fillNewInterpolatedFrames.bind(this);
        Events.on(EventType.FRAME_CHANGETYPE, e => {
            var frameNumber = e.frameNumber;
            if(e.newType=='key')
                this.frameData[frameNumber].type = 'key';
        });
    }

    addEmptyFrame(frameIndex) {
        if(!frameIndex)
            frameIndex = 0;
        const lastFrame = this.frameData[frameIndex];
        let joints = undefined;
        if(lastFrame)
            joints = lastFrame.joints;
        const newFrame = new Frame(joints);
        this.frameData.splice(frameIndex+1, 0, newFrame);
    }

    getNextKeyFrame(frameNumber) {
        for (var i = frameNumber + 1; i < this.frameData.length; i++) {
            if (this.frameData[i].type == 'key') {
                return i;
            }
        }
    }

    getPreviousKeyFrame(frameNumber) {
        for (var i = frameNumber - 1; i >= 0; i--) {
            if (this.frameData[i].type == 'key') {
                return i;
            }
        }
    }

    // REWRITE THIS SHIT
    fillNewInterpolatedFrames(interpolationAmount, frames) {
        const newFrames = [];
        for (var i = 0; i < frames.length; i++) {
            const frame = frames[i];
            newFrames.push(frame);
            const newFrameIndex = i * interpolationAmount + i;
            if(i==frames.length-1) {
                break;
            }
            for (var j = 1; j <= interpolationAmount; j++) { 
                var newFrame = new Frame();
                frame.joints.forEach(joint => {
                    const newJoint = new JointStructure(joint);
                    newFrame.joints.push(newJoint);
                });
                newFrames.push(newFrame);
            }
        }
        for (var i = 1; i < frames.length; i++) {
            const index = i * interpolationAmount + i;
            Interpolation.doInterpolation(index - interpolationAmount - 1, index, newFrames);
        }
        return newFrames;
    }

    bodyToFrame(body, frameNumber) {
        const frame = this.frameData[frameNumber];
        frame.joints = [];
        Object.keys(body.jointSprites).forEach(jointName => {
            const jointSprite = body.jointSprites[jointName];
            const newJoint = new JointStructure(jointSprite);
            frame.joints.push(newJoint);
        });
    }

    frameToBody(body, frame) {
        frame.joints.forEach(jointStructure => {
            const jointSprite = body.jointSprites[jointStructure.jointName];
            jointSprite.x = jointStructure.x;
            jointSprite.y = jointStructure.y;
            jointSprite.oldX = jointSprite.x;
            jointSprite.oldY = jointSprite.y;
            jointSprite.jointStructure = new JointStructure(jointStructure);
        });
    }

    loadFrameData(body, frameNumber) {;
        const frame = this.frameData[frameNumber];
        this.frameToBody(body, frame);
    }

}

export default Animation;