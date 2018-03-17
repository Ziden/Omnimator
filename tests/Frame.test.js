import JointStructure from '../src/editor/JointStructure.js';
import Frame from '../src/editor/Frame.js';
import { equalJoints } from './TestUtils.js';

describe("Frame Tests", () => {

    let feet = new JointStructure({
        jointName: 'feet',
        connectedJoints : [],
        x: 5,
        y:5
    });
    let leg = new JointStructure({
        jointName: 'leg',
        connectedJoints : [feet],
        x: 10,
        y: 10
    });
    let frame = new Frame([leg, feet]);

    test('Frame create copy joint instances', () => {
        const otherFrame = new Frame(frame.joints);
        expect(otherFrame.joints[0]).not.toBe(frame.joints[0]);
        expect(otherFrame.joints[0].jointName).toBe(frame.joints[0].jointName);
    });

    test('Frame keep joint info', () => {
        const otherFrame = new Frame(frame.joints);
        frame.joints.forEach((joint, i) => {
            expect(equalJoints(joint, otherFrame.joints[i])).toBe(true);
        });
    });

});