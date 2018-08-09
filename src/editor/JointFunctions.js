import Events from '../events/Events';
import EventType from '../events/EventType.js';
import SuckMath from '../util/ISuckAtMath.js';

const dragConnectedJoints = (jointSprite, x, y) => {
    jointSprite.connectedJointSprites.forEach(connectedJointSprite => {
        connectedJointSprite.oldX = connectedJointSprite.x;
        connectedJointSprite.oldY = connectedJointSprite.y;
        connectedJointSprite.x += x;
        connectedJointSprite.y += y;
        connectedJointSprite.jointStructure.x = connectedJointSprite.x;
        connectedJointSprite.jointStructure.y = connectedJointSprite.y;
        dragConnectedJoints(connectedJointSprite, x, y);
    });
};

const LIMIT_CIRCULAR_MOVEMENT = true;

const onDragUpdate = (jointSprite, e) => {

    if(LIMIT_CIRCULAR_MOVEMENT && jointSprite.jointStructure.fatherJointName) {
        const fatherJoint = jointSprite.getFatherJointStructure();
        const angle = SuckMath.angleBetweenPoints(jointSprite.x, jointSprite.y, fatherJoint.x, fatherJoint.y);
        jointSprite.angle = angle;
        console.log(jointSprite);
        console.log(fatherJoint);
        console.log("asdasdasd");
        const connectionBone = jointSprite.boneSprites[fatherJoint.jointName];
        console.log(connectionBone);
        const newPosition = SuckMath.circleMovement(fatherJoint.x, fatherJoint.y, angle, jointSprite.fatherDistance);
        jointSprite.x = newPosition[0];
        jointSprite.y = newPosition[1];
        jointSprite.jointStructure.x = newPosition[0];
        jointSprite.jointStructure.y = newPosition[1];
    }

    if (jointSprite.jointStructure.connectedJoints.length > 0) {
        const differenceX = jointSprite.x - jointSprite.oldX;
        const differenceY = jointSprite.y - jointSprite.oldY;
        dragConnectedJoints(jointSprite, differenceX, differenceY);
    }

    jointSprite.oldX = jointSprite.x;
    jointSprite.oldY = jointSprite.y;
    jointSprite.jointStructure.x = jointSprite.x;
    jointSprite.jointStructure.y = jointSprite.y;
    Events.fire(EventType.JOINT_MOVE, jointSprite);

};

module.exports = {
    onDragUpdate: onDragUpdate,
    dragConnectedJoints: dragConnectedJoints
}