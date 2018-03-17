const equalJoints = (joint1, joint2) => {
    return (joint1.jointName) == (joint2.jointName) &&
        (joint1.fatherJointName) == (joint2.fatherJointName) &&
        (joint1.x) == (joint2.x) &&
        (joint1.y) == (joint2.y) &&
        (joint1.fatherDistance) == (joint2.fatherDistance) &&
        (joint1.angleToFather) == (joint2.angleToFather);
}

const assertJointEqual = (joint1, joint2) => {
    expect(joint1.jointName).toBe(joint2.jointName);
    expect(joint1.fatherJointName).toBe(joint2.fatherJointName);
    expect(joint1.x).toBe(joint2.x);
    expect(joint1.y).toBe(joint2.y);
    expect(joint1.fatherDistance).toBe(joint2.fatherDistance);
    expect(joint1.angleToFather).toBe(joint2.angleToFather);
}

module.exports = {
    equalJoints: equalJoints,
    assertJointEqual: assertJointEqual
}