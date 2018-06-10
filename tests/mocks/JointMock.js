import JointStructure from '../../src/editor/JointStructure.js';

const JointMock = (name) => {
    const jointMock = new JointStructure({});
    jointMock.x = 0;
    jointMock.y = 0;
    jointMock.jointName = name;
    jointMock.fatherDistance = 1;
    jointMock.angleToFather = 2;
    jointMock.connectedJoints = [];
    return jointMock;
}

export default JointMock;