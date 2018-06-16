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
        jointSprites.neck = jointSprites.central.pushJoint(0, -100, 'neck');
        jointSprites.head = jointSprites.neck.pushJoint(0, -80, 'head');
        jointSprites.leftElbow = jointSprites.neck.pushJoint(-100, 0, 'leftElbow');
        jointSprites.leftHand = jointSprites.leftElbow.pushJoint(-100, -40, 'leftHand');
        jointSprites.rightElbow = jointSprites.neck.pushJoint(100, 0, 'rightElbow');
        jointSprites.rightHand = jointSprites.rightElbow.pushJoint(100, -40, 'rightHand');
        jointSprites.leftLeg = jointSprites.central.pushJoint(-20, 100, 'leftLeg');
        jointSprites.leftFoot = jointSprites.leftLeg.pushJoint(-20, 100, 'leftFoot');
        jointSprites.rightLeg = jointSprites.central.pushJoint(20, 100, 'rightLeg');
        jointSprites.rightFoot = jointSprites.rightLeg.pushJoint(20, 100, 'rightFoot');
        return jointSprites;
    }

    update() {
        Object.values(this.jointSprites).forEach(j => { 
            j.updateLines() 
        });
    }


}

export default Body;