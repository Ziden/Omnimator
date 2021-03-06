import Events from '../events/Events';
import EventType from '../events/EventType.js';
//import Bone from './Bone.js';
import BoneStructure from './BoneStructure.js';
import SuckMath from '../util/ISuckAtMath.js';

const addBonesToJoint = jointSprites => {
    const allBones = [];
    Object.values(jointSprites).forEach(jointSprite => { 
        const jointBones = {};
        var connected = jointSprite.jointStructure.connectedJoints;
        connected.forEach(connectedJointName => {
            const connectedJoint = jointSprites[connectedJointName].jointStructure;
            var boneName = connectedJoint.jointName;
            var boneStructure = new BoneStructure(boneName);
            var angle = -SuckMath.angleBetweenJoints(connectedJoint, jointSprite) + 90;
            boneStructure.angle = angle;
            var distance = SuckMath.distanceBetweenJoints(connectedJoint, jointSprite);
            boneStructure.length = distance; 
            jointSprite.jointStructure.bones[boneName] = boneStructure;
            boneStructure.connectedJoints = [jointSprite.jointStructure, connectedJoint];
            allBones.push(boneStructure);
        });
    });
    return allBones;
}

const updateBones = joint => {
    var connected = joint.connectedJointSprites;
    connected.forEach(connectedJoint => {
       var jointBones = joint.jointStructure.bones;
       if(jointBones[connectedJoint.jointStructure.jointName]) {
           var bone = jointBones[connectedJoint.jointStructure.jointName];
           bone.sprite.x = joint.x;
           bone.sprite.y = joint.y;
           var angle = -SuckMath.angleBetweenJoints(connectedJoint, joint) + 90;
           bone.angle = angle;
           bone.sprite.angle = angle;
           var distance = SuckMath.distanceBetweenJoints(connectedJoint, joint);
           bone.sprite.height = distance; 
           bone.length = distance;
       }
    });
}


module.exports = {
    addBonesToJoints: addBonesToJoint,
    updateBones: updateBones
}