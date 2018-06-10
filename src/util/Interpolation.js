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

        const oldFather = this.frameArray[this.frameNumber1].findJoint(previousJointFrame.fatherJointName);
        const newFather = this.frameArray[this.frameNumber2].findJoint(nextJointFrame.fatherJointName);

        if(!oldFather || !newFather) {
            this.standardInterpolator = new StandardInterpolator(this.frameNumber1, this.frameNumber2, this.frameArray);
            this.standardInterpolator.load(previousJointFrame,nextJointFrame);
            return;
        }

        if(oldFather == undefined)
            console.log("MIOU NO OLD "+previousJointFrame.jointName);

        if(newFather == undefined)
            console.log("MIOU NO NEW "+nextJointFrame.jointName);

        const oldAngleToFather = SuckMath.angleBetweenPoints(previousJointFrame.x, previousJointFrame.y, oldFather.x, oldFather.y);
        const newAngleToFather = SuckMath.angleBetweenPoints(nextJointFrame.x, nextJointFrame.y, newFather.x, newFather.y);

        this.fatherDistance1 = SuckMath.distanceBetweenPoints(previousJointFrame.x, previousJointFrame.y, oldFather.x, oldFather.y);
        this.fatherDistance2 = SuckMath.distanceBetweenPoints(nextJointFrame.x, nextJointFrame.y, newFather.x, newFather.y);

        this.movePerFrame = (oldAngleToFather - newAngleToFather) / this.frameDifference;
    }

    apply(affectedJoint, frameLoop, frameNumber) {

        if(this.standardInterpolator) {
            this.standardInterpolator.apply(affectedJoint, frameLoop, frameNumber);
            return;
        }

        const father =  this.frameArray[frameNumber].findJoint(affectedJoint.fatherJointName);
        let currentAngle = SuckMath.angleBetweenPoints(affectedJoint.x, affectedJoint.y, father.x, father.y);
        currentAngle -= this.movePerFrame * frameLoop;
        const newPos = SuckMath.circleMovement(father.x, father.y, currentAngle, this.fatherDistance1);
        affectedJoint.x = newPos[0];
        affectedJoint.y = newPos[1];
    }
}

module.exports = {

    StandardInterpolator: StandardInterpolator,
    AngleInterpolator: AngleInterpolator,

    doInterpolation: (frameNumber1, frameNumber2, frameArray, tagFrames, Interpolator) => {

        if(!Interpolator)
            Interpolator = AngleInterpolator;
            
        frameArray[frameNumber1].joints.forEach(oldJoint => {
            const newJoint = frameArray[frameNumber2].findJoint(oldJoint.jointName);

            if(newJoint == undefined || oldJoint == undefined)
                return false;

         
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
               
                interpolation.apply(affectedJoint, loops, i);
                loops++;
            }

        });
    }
};