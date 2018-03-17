import JointStructure from '../src/editor/JointStructure.js';
import Animation from '../src/editor/Animation.js';
import Frame from '../src/editor/Frame.js';
import {
    equalJoints,
    assertJointEqual
} from './TestUtils.js';
import {
    LegFeetBody
} from './mocks/BodyMock.js';
import JointFunctions from '../src/editor/JointFunctions.js';

describe("Animation Tests", () => {

    let animation = new Animation();
    let feet = new JointStructure({
        jointName: 'feet',
        connectedJoints: [],
        x: 1,
        y: 1
    });
    let leg = new JointStructure({
        jointName: 'leg',
        connectedJoints: [feet],
        x: 0,
        y: 0
    });

    beforeEach(() => {
        animation = new Animation();
        leg.connectedJoints = [feet];
        feet.connectedJoints = [];
    });

    test('Test add frame', () => {
        animation.addEmptyFrame();
        expect(animation.frameData.length).toBe(1);
    });

    test('Test Animation replicating joints', () => {
        animation.addEmptyFrame();
        animation.frameData[0].joints = [feet, leg];
        animation.addEmptyFrame();
        expect(animation.frameData[1].joints.length).toBe(2);
        expect(animation.frameData[1].joints.filter(j => j.jointName == "leg").length).toBe(1);
        expect(animation.frameData[1].joints.filter(j => j.jointName == "feet").length).toBe(1);
    });

    test('Test Animation duplicating new joint instances', () => {
        animation.addEmptyFrame();
        animation.frameData[0].joints = [feet, leg];
        animation.addEmptyFrame();
        expect(animation.frameData[0].joints[0]).not.toBe(animation.frameData[1].joints[0]);
        expect(animation.frameData[0].joints[0].jointName).toBe(animation.frameData[1].joints[0].jointName);
    });

    test('Test JointSprite to JointStructure Save', () => {
        const body = new LegFeetBody();
        animation.addEmptyFrame();
        animation.bodyToFrame(body, 0);
        expect(animation.frameData[0].joints.length).toBe(3);
    });

    test('Test Load', () => {
        const body = new LegFeetBody();
        const frame = new Frame([body.jointSprites.leg.jointStructure]);
        animation.frameData.push(frame);
        animation.frameData[0].joints[0].x = 123;
        animation.loadFrameData(body, 0);
        expect(body.jointSprites.leg.x).toBe(123);
    })

    test('Test Save Properties', () => {
        const body = new LegFeetBody();
        body.jointSprites.leg.x = 50;
        body.jointSprites.leg.jointStructure.x = 50;
        animation.addEmptyFrame();
        animation.bodyToFrame(body, 0);
        assertJointEqual(animation.frameData[0].findJoint("leg"), body.jointSprites.leg.jointStructure);
    });

    test('Test New Frame Have All Joint Info', () => {
        animation.addEmptyFrame();
        animation.frameData[0].joints = [feet, leg];
        animation.addEmptyFrame();
        const otherFrame = animation.frameData[1];
        animation.frameData[0].joints.forEach((joint, i) => {
            expect(equalJoints(joint, otherFrame.joints[i])).toBe(true);
        });
    });

    test('Joint saving joint names', () => {
        animation.addEmptyFrame();
        const body = new LegFeetBody();
        animation.bodyToFrame(body, 0);
        animation.addEmptyFrame();
        expect(animation.frameData[0].joints[0].jointName).toBe('center');
    });


    test('Save/Load keeping info correct', () => {
        animation.addEmptyFrame();
        const body = new LegFeetBody();
        body.jointSprites.leg.x = 10;
        animation.bodyToFrame(body, 0);

        expect(animation.frameData[0].findJoint("leg").x).toBe(10);

        const newBody = new LegFeetBody();
        animation.loadFrameData(newBody, 0);

        expect(newBody.jointSprites.leg.x).toBe(10);
        expect(newBody.jointSprites.leg.jointStructure.x).toBe(10);
    });

    test('Save/Load keeping info correct on next frame', () => {
        animation.addEmptyFrame();
        const body = new LegFeetBody();
        body.jointSprites.leg.x = 10;
        animation.bodyToFrame(body, 0);
        animation.addEmptyFrame();

        const newBody = new LegFeetBody();
        animation.loadFrameData(newBody, 1);

        expect(newBody.jointSprites.leg.x).toBe(10);
        expect(newBody.jointSprites.leg.jointStructure.x).toBe(10);
    });

    test('Test Load Frame Data on New Frame', () => {

        const body = new LegFeetBody();
        const legSprite = body.jointSprites.leg;

        animation.addEmptyFrame();
        animation.addEmptyFrame();
        
        legSprite.x = 25;
        animation.bodyToFrame(body, 1);
        legSprite.x = 50;
        animation.loadFrameData(body, 1);
        expect(body.jointSprites.leg).not.toBe(undefined);
        assertJointEqual(body.jointSprites.leg.jointStructure.x, 25);
    });

});