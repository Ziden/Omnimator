import Phaser from 'phaser'
import Events from '../ui/Events' 
import SuckMath from '../util/ISuckAtMath.js';

//    _\|/_      :D 
class Joint extends Phaser.Sprite {

    constructor(x,y) {
        super(window.game, x, y, "joint");
        this.pushJoint = this.pushJoint.bind(this);
        this.moveConnectedJoints = this.moveConnectedJoints.bind(this);
        this.getAngleToFather = this.getAngleToFather.bind(this);
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
        this.connectedJoints = [];
        this.linesToConnectedJoints = [];
        this.fatherJoint = null;
        this.fatherDistance = null;
        this.addJointToPhaser.bind(this)();
    }

    addJointToPhaser() {
        Phaser.Sprite.call(this, window.game, this.x, this.y, 'joint');
        window.game.add.existing(this);
        this.inputEnabled = true;
        this.input.useHandCursor=true;
        this.input.enableDrag(true);
        this.events.onDragStop.add(() => Events.fire("onAnimationChange"), window.getState());
        this.events.onDragUpdate.add(this.onDragUpdate, this);
        this.anchor.set(0.5);
    }

    pushJoint(x, y, graphics) {
        const newJoint = new Joint(this.x+x, this.y+y);
        this.connectedJoints.push(newJoint);
        newJoint.fatherJoint = this;
        newJoint.fatherDistance = SuckMath.distanceBetweenPoints(this.x, this.y, newJoint.x, newJoint.y);
        const line = new Phaser.Line(newJoint.x, newJoint.y, this.x, this.y);
        this.linesToConnectedJoints.push(line);
        return newJoint;
    }

    updateLines() {
        this.linesToConnectedJoints.forEach((line,i) => {
            const connectedJoint = this.connectedJoints[i];
            line.fromSprite(connectedJoint, this, false);
        });
    }

    moveConnectedJoints(x, y) {
        this.connectedJoints.forEach(joint => {
            joint.x += x;
            joint.y += y;;
            joint.oldX = joint.x;
            joint.oldY = joint.y;
            joint.moveConnectedJoints(x, y);
        });
    }

    onDragUpdate(e) {
        if(this.fatherJoint) {
            const angle = SuckMath.angleBetweenPoints(this.x, this.y, this.fatherJoint.x, this.fatherJoint.y);
            this.angle = angle;
            const newPosition = SuckMath.circleMovement(this.fatherJoint.x, this.fatherJoint.y, angle, this.fatherDistance);
            this.x = newPosition[0];
            this.y = newPosition[1];
        }
        if(this.connectedJoints.length > 0) {
            const differenceX = this.x - this.oldX;
            const differenceY = this.y - this.oldY;
            this.moveConnectedJoints(differenceX, differenceY);
        }  
        Events.fire('onJointMove', this);
        this.oldX = this.x;
        this.oldY = this.y;
    }

    getAngleToFather() {
        if(this.fatherJoint) {
            return SuckMath.angleBetweenPoints(this.x, this.y, this.fatherJoint.x, this.fatherJoint.y);
        }
        return 0;
    }
}

export default Joint;