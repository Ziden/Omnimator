import Events from '../ui/Events.js'
import Interpolation from '../util/Interpolation.js'

class Animation {

    constructor(editor) {
        this.frameData = [];
        this.saveFrameData = this.saveFrameData.bind(this);
        this.loadFrameData = this.loadFrameData.bind(this);
        this.interpolateFrames = this.interpolateFrames.bind(this);
        this.getNextKeyFrame = this.getNextKeyFrame.bind(this);
        this.getPreviousKeyFrame = this.getPreviousKeyFrame.bind(this);
        this.addEmptyFrame = this.addEmptyFrame.bind(this);
        this.frameToBody = this.frameToBody.bind(this);
        this.fillNewInterpolatedFrames = this.fillNewInterpolatedFrames.bind(this);

        Events.on('onMakeKeyframe', frameNumber => {
            this.frameData[frameNumber].keyFrame = true;
        });
    }

    addEmptyFrame(frameNumber) {
        const newFrame = new Frame();
        this.frameData.push(newFrame);
    }

    getNextKeyFrame(frameNumber) {
        for (var i = frameNumber + 1; i < this.frameData.length; i++) {
            if (this.frameData[i].keyFrame) {
                return i;
            }
        }
    }

    getPreviousKeyFrame(frameNumber) {
        for (var i = frameNumber - 1; i >= 0; i--) {
            if (this.frameData[i].keyFrame) {
                return i;
            }
        }
    }

    fillNewInterpolatedFrames(interpolationAmount, frames) {
        const newFrames = new Array(frames.length + (frames.length * interpolationAmount) - interpolationAmount);
        for (let i = 0; i < frames.length; i++) {
            const frame = frames[i];
            const newFrameIndex = i * interpolationAmount + i;
            for (var j = 0; j <= interpolationAmount; j++) {
                var newFrame = new Frame();
                frame.joints.forEach(joint => newFrame.joints.push(Object.assign({}, joint)));
                newFrames[newFrameIndex + j] = newFrame;
            }
        }
        for (var i = 1; i < frames.length; i++) {
            const index = i * interpolationAmount + i;
            this.interpolateFrames(index - interpolationAmount - 1, index, newFrames);
        }
        return newFrames;
    }

    interpolateFrames(frameNumber1, frameNumber2, frameArray) {
        Interpolation.doInterpolation(frameNumber1, frameNumber2, frameArray);
    }

    saveFrameData(body, frameNumber) {
        const frame = this.frameData[frameNumber];
        frame.joints = [];
        Object.values(body.joints).forEach(joint => {
            frame.joints.push({
                x: joint.x,
                y: joint.y,
                jointName: joint.jointName,
                fatherJoint: joint.fatherJoint ? {x: joint.fatherJoint.x, y:joint.fatherJoint.y} : null,
                fatherDistance: joint.fatherDistance,
                angleToFather: joint.getAngleToFather()
            });
        });
    }

    frameToBody(body, frame) {
        frame.joints.forEach(joint => {
            const bodyJoint = body.joints[joint.jointName];
            bodyJoint.x = joint.x;
            bodyJoint.y = joint.y;
            bodyJoint.oldX = joint.x;
            bodyJoint.oldY = joint.y;
        });
    }

    loadFrameData(body, frameNumber) {;
        const frame = this.frameData[frameNumber];
        this.frameToBody(body, frame);
    }

}

class Frame {

    constructor() {
        this.keyFrame = false;
        this.joints = [];
        this.findJoint = this.findJoint.bind(this);
    }

    findJoint(jointName) {
        return this.joints.filter(j => j.jointName==jointName)[0];
    }

}

export default Animation;