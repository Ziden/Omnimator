import Events from '../events/Events';
import EventType from '../events/EventType.js';
import Bone from './Bone.js';
import SuckMath from '../util/ISuckAtMath.js';

const addBonesToJoint = jointSprites => {
    Object.values(jointSprites).forEach(joint => { 
        const jointBones = {};
        var connected = joint.connectedJointSprites;
        connected.forEach(connectedJoint => {
            var bone = new Bone(joint.x, joint.y, this);
            var angle = -SuckMath.angleBetweenJoints(connectedJoint, joint) + 90;
            bone.angle = angle;
            var distance = SuckMath.distanceBetweenJoints(connectedJoint, joint);
            bone.height = distance; 
            bone.z = 0;
            jointBones[connectedJoint.jointStructure.jointName] = bone;
            joint.boneSprites = jointBones;
        });
    });
}

const updateBones = joint => {
    var connected = joint.connectedJointSprites;
    connected.forEach(connectedJoint => {
       var jointBones = joint.boneSprites;
       if(joint.boneSprites[connectedJoint.jointStructure.jointName]) {
           var bone = joint.boneSprites[connectedJoint.jointStructure.jointName];
           bone.x = joint.x;
           bone.y = joint.y;
           var angle = -SuckMath.angleBetweenJoints(connectedJoint, joint) + 90;
           bone.angle = angle;
           var distance = SuckMath.distanceBetweenJoints(connectedJoint, joint);
           bone.height = distance; 
       }
    });
}


module.exports = {
    addBonesToJoints: addBonesToJoint,
    updateBones: updateBones
}