class JointStructure {
    constructor(joint) {
        if (joint.jointStructure) {
            this.x = joint.x;
            this.y = joint.y;
            joint = joint.jointStructure;
        } else {
            this.x = joint.x;
            this.y = joint.y;
        }
        this.connectedJoints = [];
        this.jointName = joint.jointName;
        this.fatherJointName = joint.fatherJointName;
        this.fatherDistance = joint.fatherDistance;
        this.angleToFather = joint.angleToFather;
        if(joint.connectedJoints)
            joint.connectedJoints.forEach(j => this.connectedJoints.push(j));
    }
}

export default JointStructure;