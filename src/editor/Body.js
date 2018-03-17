import Joint from './Joint.js';

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
        jointSprites.neck = jointSprites.central.pushJoint(0, -50, 'neck');
        jointSprites.head = jointSprites.neck.pushJoint(0, -40, 'head');
        jointSprites.leftElbow = jointSprites.neck.pushJoint(-50, 0, 'leftElbow');
        jointSprites.leftHand = jointSprites.leftElbow.pushJoint(-50, -20, 'leftHand');
        jointSprites.rightElbow = jointSprites.neck.pushJoint(50, 0, 'rightElbow');
        jointSprites.rightHand = jointSprites.rightElbow.pushJoint(50, -20, 'rightHand');
        jointSprites.leftLeg = jointSprites.central.pushJoint(-10, 50, 'leftLeg');
        jointSprites.leftFoot = jointSprites.leftLeg.pushJoint(-10, 50, 'leftFoot');
        jointSprites.rightLeg = jointSprites.central.pushJoint(10, 50, 'rightLeg');
        jointSprites.rightFoot = jointSprites.rightLeg.pushJoint(10, 50, 'rightFoot');
        return jointSprites;
    }

    update() {
        Object.values(this.jointSprites).forEach(j => { 
            j.updateLines() 
        });
    }


}

export default Body;