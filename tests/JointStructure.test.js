import JointStructure from '../src/editor/JointStructure.js';
import { equalJoints, assertJointEqual } from './TestUtils.js';
import { LegFeetBody } from './mocks/BodyMock.js';

describe("Joint Tests", () => {

    const mockJoints = [];

    beforeEach(() => {
        for (let i = 0; i < 10; i++) {
            const jointMock = new JointStructure({});
            jointMock.x = i;
            jointMock.y = i;
            jointMock.jointName = 'joint' + i;
            jointMock.fatherDistance = i;
            jointMock.angleToFather = i;
            jointMock.connectedJoints = [];

            if (i > 0) {
                mockJoints[i - 1].fatherJointName = jointMock.jointName;
                jointMock.connectedJoints.push(mockJoints[i - 1]);
            }

            mockJoints.push(jointMock);
        };
    });

    test('Not Loosing Connected Joint instance', () => {
        const joint = new JointStructure(mockJoints[0]);
        const father = mockJoints[1].connectedJoints[0];
        expect(joint).toBe(father);
    });

    test('Not Loosing Connected Joint instance', () => {
        const joint = mockJoints[0];
        const father = new JointStructure(mockJoints[1]).connectedJoints[0];
        expect(joint).toBe(father);
    });

    
    test('Not Loosing Connected Joint instance', () => {
        const joint =  new JointStructure(mockJoints[0]);
        const father = new JointStructure(mockJoints[1]).connectedJoints[0];
        expect(joint).toBe(father);
    });

    test.only('Test build from Body', () => {
        const body = new LegFeetBody();
        const legJointStructure = new JointStructure(body.jointSprites.leg);
        body.jointSprites.leg.jointStructure = legJointStructure;
        const leg =  new JointStructure(body.jointSprites.leg.jointStructure);
        assertJointEqual(body.jointSprites.leg.jointStructure, leg);
    });

    test('Test Cloning Values', () => {

        const joint = mockJoints[0];
        const newJoint = new JointStructure(joint);

        expect(equalJoints(joint, newJoint)).toBe(true);

        joint.connectedJoints.forEach((j, i) => {

            expect(equalJoints(j, newJoint.connectedJoints[i])).toBe(true);
        })
    });

});