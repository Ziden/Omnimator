import SuckMath from './ISuckAtMath.js'

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
    }

    apply(affectedJoint, frameLoop) {
        let currentAngle = SuckMath.angleBetweenPoints(affectedJoint.x, affectedJoint.y, affectedJoint.fatherJoint.x, affectedJoint.fatherJoint.y);
        currentAngle += this.movePerFrame * frameLoop;
        const newPos = SuckMath.circleMovement(affectedJoint.fatherJoint.x, affectedJoint.fatherJoint.y, currentAngle, affectedJoint.fatherDistance);
        affectedJoint.x = newPos.x;
        affectedJoint.y = newPos.y;
    }
}

module.exports = {

    StandardInterpolator: StandardInterpolator,

    doInterpolation: (frameNumber1, frameNumber2, frameArray) => {
        let Interpolator = null;
        frameArray[frameNumber1].joints.forEach(oldJoint => {
            const newJoint = frameArray[frameNumber2].findJoint(oldJoint.jointName);

            if(!newJoint) {
                return;
            }

            Interpolator = StandardInterpolator;

            const interpolation = new Interpolator(frameNumber1, frameNumber2, frameArray);
            interpolation.load(oldJoint, newJoint);

            let loops = 1;
            for (var i = frameNumber1 + 1; i < frameNumber2; i++) {
                const affectedFrame = frameArray[i];
                let affectedJoint = affectedFrame.findJoint(oldJoint.jointName);
                if (!affectedJoint) {
                    affectedJoint = Object.assign({}, oldJoint);
                    affectedFrame.joints.push(affectedJoint);
                } else {
                    affectedJoint = Object.assign(affectedJoint, oldJoint);
                }
                interpolation.apply(affectedJoint, loops);
                loops++;
            }

        });
    }
};