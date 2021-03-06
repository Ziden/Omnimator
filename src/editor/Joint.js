import Phaser from 'phaser'
import Events from '../events/Events' 
import SuckMath from '../util/ISuckAtMath.js';
import JointStructure from './JointStructure.js';
import EventType from '../events/EventType.js'
import { onDragUpdate , dragConnectedJoints } from './JointFunctions.js';

//    _\|/_      :D 
class Joint extends Phaser.Sprite {
    constructor(x,y, body, name) {
        super(window.game, x, y, "joint");
        this.jointBody = body;
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
        this.fatherJointName = null;
        this.connectedJointSprites = [];
        this.boneSprites = [];
        const jointStructure = new JointStructure(this);
        jointStructure.sprite = this;
        this.jointStructure = jointStructure;
        this.jointStructure.jointName = name;
        this.pushJoint = this.pushJoint.bind(this);
        this.getFatherJointStructure = this.getFatherJointStructure.bind(this);
        this.addJointToPhaser.bind(this)();
    }
    
    getFatherJointStructure() {
        if(this.jointStructure.fatherJointName) {
            return this.jointBody.jointSprites[this.jointStructure.fatherJointName].jointStructure;
        }
    }

    addJointToPhaser() {
        Phaser.Sprite.call(this, window.game, this.x, this.y, 'joint');
        window.game.add.existing(this);
        this.inputEnabled = true;
        this.input.useHandCursor=true;
        this.input.enableDrag(true);
        //this.scale.setTo(2, 2);
        this.events.onDragStop.add(()  => Events.fire(EventType.ANIMATION_CHANGE), window.getState());
        this.events.onInputDown.add(() => Events.fire(EventType.JOINT_CLICK, this), this);
        this.events.onDragUpdate.add(e => { onDragUpdate(this,e); }, this);
        this.anchor.set(0.5);
        this.z = 1;
    }

    pushJoint(x, y, name) {
        const newJoint = new Joint(this.x+x, this.y+y, this.jointBody, name);
        this.jointStructure.connectedJoints.push(newJoint.jointStructure.jointName);
        this.connectedJointSprites.push(newJoint);
        newJoint.jointStructure.fatherJointName = this.jointStructure.jointName;
        newJoint.fatherDistance = SuckMath.distanceBetweenPoints(this.x, this.y, newJoint.x, newJoint.y);
        return newJoint;
    }
}

export default Joint;