import Joint from './Joint.js';

class Body {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.buildDefaultStickman = this.buildDefaultStickman.bind(this);
        this.joints = this.buildDefaultStickman(x,y);
    }

    buildDefaultStickman(x, y) {
        const joints = {}
        joints.central = new Joint(x, y);
        joints.neck = joints.central.pushJoint(0, -50);
        joints.head = joints.neck.pushJoint(0, -40);
        joints.leftElbow = joints.neck.pushJoint(-50, 0);
        joints.leftHand = joints.leftElbow.pushJoint(-50, -20);
        joints.rightElbow = joints.neck.pushJoint(50, 0);
        joints.rightHand = joints.rightElbow.pushJoint(50, -20);
        joints.leftLeg = joints.central.pushJoint(-10, 50);
        joints.leftFoot = joints.leftLeg.pushJoint(-10, 50);
        joints.rightLeg = joints.central.pushJoint(10, 50);
        joints.rightFoot = joints.rightLeg.pushJoint(10, 50);

        Object.keys(joints).forEach(jointName => {
            const joint = joints[jointName];
            joint.jointName = jointName;
        });

        return joints;
    }

    update() {
        Object.values(window.getState().body.joints).forEach(j => { 
            j.updateLines() 
        });
    }


}

export default Body;