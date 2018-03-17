import JointStructure from '../editor/JointStructure.js';

class Frame {

    constructor(jointArray) {
        this.type = 'none';
        this.joints = [];
        if(jointArray) {
            jointArray.forEach((j,i) => {
                this.joints[i] = (new JointStructure(j));
            });
        } 
        this.findJoint = this.findJoint.bind(this);
    }

    findJoint(jointName) {
        return this.joints.filter(j => j.jointName == jointName)[0];
    }

}

export default Frame;