import SuckMath from './ISuckAtMath.js'
import JointStructure from '../editor/JointStructure.js'
import Events from '../ui/Events.js';
import EventType from '../events/EventType.js';

class Interpolator {
    constructor(frameNumber1, frameNumber2, frameArray) {
        this.apply = this.apply.bind(this);
        this.load = this.load.bind(this);
        this.frameNumber1 = frameNumber1;
        this.frameNumber2 = frameNumber2;
        this.frameArray = frameArray;
        this.frameDifference = frameNumber2 - frameNumber1;
    }
}

class StandardInterpolator extends Interpolator {

    constructor(frameNumber1, frameNumber2, frameArray) {
        super(frameNumber1, frameNumber2, frameArray);
    }

    load(previousJointFrame, nextJointFrame) {
        this.differenceX = (previousJointFrame.x - nextJointFrame.x) / this.frameDifference;
        this.differenceY = (previousJointFrame.y - nextJointFrame.y) / this.frameDifference;
    }

    apply(affectedJoint, frameLoop) {
        affectedJoint.x -= (frameLoop * this.differenceX);
        affectedJoint.y -= (frameLoop * this.differenceY);
    }
}

class AngleInterpolator extends Interpolator {

    constructor(frameNumber1, frameNumber2, frameArray) {
        super(frameNumber1, frameNumber2, frameArray);
    }

    load(previousJointFrame, nextJointFrame) {
        this.movePerFrame = (previousJointFrame.angleToFather - nextJointFrame.angleToFather) / this.frameDifference;
        console.log("WILL MOVE "+this.movePerFrame);
    }

    apply(affectedJoint, frameLoop) {
        /*
        let currentAngle = SuckMath.angleBetweenPoints(affectedJoint.x, affectedJoint.y, affectedJoint.fatherJoint.x, affectedJoint.fatherJoint.y);
        currentAngle -= this.movePerFrame * frameLoop;
        const newPos = SuckMath.circleMovement(affectedJoint.fatherJoint.x, affectedJoint.fatherJoint.y, currentAngle, affectedJoint.fatherDistance);
        affectedJoint.x = newPos[0];
        affectedJoint.y = newPos[1];
        */
    }
}

module.exports = {

    StandardInterpolator: StandardInterpolator,

    doInterpolation: (frameNumber1, frameNumber2, frameArray, tagFrames) => {
        let Interpolator = null;
        frameArray[frameNumber1].joints.forEach(oldJoint => {
            const newJoint = frameArray[frameNumber2].findJoint(oldJoint.jointName);

            if(newJoint == undefined || oldJoint == undefined)
                return false;

            Interpolator = StandardInterpolator;
            const interpolation = new Interpolator(frameNumber1, frameNumber2, frameArray);
            interpolation.load(oldJoint, newJoint);

            let loops = 1;
            for (var i = frameNumber1 + 1; i < frameNumber2; i++) {
                const affectedFrame = frameArray[i];

                if(tagFrames) {
                    Events.fire(EventType.FRAME_CHANGETYPE, {
                        newType: 'interpolation',
                        frameNumber: i
                    });
                    affectedFrame.type = 'Interpolation';
                }
                
                let affectedJoint = new JointStructure(oldJoint);
                if(!affectedFrame.findJoint(oldJoint.jointName)) {
                    affectedFrame.joints.push(affectedJoint);
                } else {
                    affectedFrame.joints[affectedFrame.joints.indexOf(affectedFrame.findJoint(oldJoint.jointName))] = affectedJoint;
                }
               
                interpolation.apply(affectedJoint, loops);
                loops++;
            }

        });
    }
};