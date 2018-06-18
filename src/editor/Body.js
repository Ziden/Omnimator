import Joint from './Joint.js';
import Bone from './Bone.js';
import { addBonesToJoints } from './BoneFunctions.js';
import { updateBones } from './BoneFunctions.js';

let size = 80;

if(window) {
    const screenSize = window.innerHeight;
    if(screenSize < 600) {
        size = 50;
    } else {
        size = 80;
    }
}

const size80 = size/5 * 4;
const size40 = size80 / 2;
const size20 = size40 / 2;
const size10 = size / 10;

class Body {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.buildDefaultStickman = this.buildDefaultStickman.bind(this);
        this.jointSprites = this.buildDefaultStickman(x,y);
        this.update = this.update.bind(this);
        this.getJointStructureName = this.getJointStructureName.bind(this);
    }

    getJointStructureName(jointSprite) {
        Object.keys(this.jointSprites).forEach(jointName => {
            const jointSpr = this.jointSprites[jointName];
            if(jointSpr == jointSprite) 
                return jointName;
        });
        return null;
    }

  
    buildDefaultStickman(x, y) {
        const jointSprites = {}
        jointSprites.central = new Joint(x, y, this, 'central');
        jointSprites.neck = jointSprites.central.pushJoint(0, -size, 'neck');
        jointSprites.head = jointSprites.neck.pushJoint(0, -size80, 'head');
        jointSprites.leftElbow = jointSprites.neck.pushJoint(-size, 0, 'leftElbow');
        jointSprites.leftHand = jointSprites.leftElbow.pushJoint(-size, -size40, 'leftHand');
        jointSprites.rightElbow = jointSprites.neck.pushJoint(size, 0, 'rightElbow');
        jointSprites.rightHand = jointSprites.rightElbow.pushJoint(size, -size40, 'rightHand');
        jointSprites.leftLeg = jointSprites.central.pushJoint(-size20, size, 'leftLeg');
        jointSprites.leftFoot = jointSprites.leftLeg.pushJoint(-size20, size, 'leftFoot');
        jointSprites.rightLeg = jointSprites.central.pushJoint(size20, size, 'rightLeg');
        jointSprites.rightFoot = jointSprites.rightLeg.pushJoint(size20, size, 'rightFoot');
        addBonesToJoints(jointSprites);
        Object.values(jointSprites).forEach(j => { 
            j.bringToTop() 
        });
        return jointSprites;
    }

    update() {
        Object.values(this.jointSprites).forEach(j => { 
            updateBones(j);
        });
    }


}

export default Body;