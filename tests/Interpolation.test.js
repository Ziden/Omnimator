import JointStructure from '../src/editor/JointStructure.js';
import Animation from '../src/editor/Animation.js';
import SuckMath from '../src/util/ISuckAtMath.js';
import {
    StandardInterpolator,
    AngleInterpolator,
    doInterpolation
} from '../src/util/Interpolation.js';
import {
    LegFeetBody
} from './mocks/BodyMock.js';

describe("Animation Tests", () => {

    let animation = new Animation();

    beforeEach(() => {
        animation = new Animation();
    });

    test('Test Simple Standard Interpolation', () => {
        var body = new LegFeetBody();
        animation.addEmptyFrame();
        animation.bodyToFrame(body, 0);
        for (var x = 0; x <= 19; x++)
            animation.addEmptyFrame();
        body.jointSprites.leg.x = 10;
        animation.bodyToFrame(body, 10);
        body.jointSprites.leg.x = 20;
        animation.bodyToFrame(body, 20);
        doInterpolation(0, 10, animation.frameData);
        doInterpolation(10, 20, animation.frameData);
        for (var x = 0; x <= 19; x++)
            expect(animation.frameData[x].findJoint("leg").x).toBe(x);
            
    });

    
    test('Test Simple Angle Interpolation', () => {
        var body = new LegFeetBody();

        animation.addEmptyFrame();
        animation.addEmptyFrame();
        animation.addEmptyFrame();

        body.jointSprites.leg.x = 10;
        body.jointSprites.leg.y = 0;
        animation.bodyToFrame(body, 0);

        expect(body.jointSprites.leg.x).toBe(10);
        expect(body.jointSprites.leg.y).toBe(0);
        expect(body.jointSprites.center.x).toBe(0);
        expect(body.jointSprites.center.y).toBe(0);
        const angleLegToCenter = SuckMath.angleBetweenJoints(body.jointSprites.leg, body.jointSprites.center);

        expect(angleLegToCenter).toBe(180);

        body.jointSprites.leg.x = 0;
        body.jointSprites.leg.y = 10;
        animation.bodyToFrame(body, 2);

        const angleLegToCenter2 = SuckMath.angleBetweenJoints(body.jointSprites.leg, body.jointSprites.center);
        expect(angleLegToCenter2).toBe(90);

        doInterpolation(0, 2, animation.frameData, false, AngleInterpolator);

        animation.loadFrameData(body, 1);

        const angleLegToCenter3 = SuckMath.angleBetweenJoints(body.jointSprites.leg, body.jointSprites.center);
        expect(angleLegToCenter3).toBe(180-45);

        expect(body.jointSprites.leg.x).toBe(5);
        expect(body.jointSprites.leg.y).toBe(5);
    });
    
    

    test('Test Interpolation Creating Joints', () => {
        var body = new LegFeetBody();
        animation.addEmptyFrame();
        animation.addEmptyFrame();
        animation.addEmptyFrame();
        body.jointSprites.leg.x = 10;
        animation.bodyToFrame(body, 0);
        body.jointSprites.leg.x = 20;
        animation.bodyToFrame(body, 2);
        doInterpolation(0, 2, animation.frameData);
        expect(animation.frameData[1].findJoint("leg").x).toBe(15);
    });
    
    test('Test Interpolation Creating Joints', () => {
        var body = new LegFeetBody();
        animation.addEmptyFrame();
        animation.addEmptyFrame();
        animation.addEmptyFrame();
        body.jointSprites.leg.x = 10;
        animation.bodyToFrame(body, 0);
        body.jointSprites.leg.x = 20;
        animation.bodyToFrame(body, 2);
        doInterpolation(0, 2, animation.frameData);
        expect(animation.frameData[1].findJoint("leg").x).toBe(15);
    });

    
    test('Test Interpolation Filling Frames', () => {
        var body = new LegFeetBody();
        animation.addEmptyFrame();
        animation.addEmptyFrame();
        body.jointSprites.leg.x = 10;
        animation.bodyToFrame(body, 0);
        body.jointSprites.leg.x = 20;
        animation.bodyToFrame(body, 1);
        const newFrames = animation.fillNewInterpolatedFrames(1, animation.frameData);
        expect(newFrames.length).toBe(3);
        expect(newFrames[1].findJoint("leg").x).toBe(15);
    });

    test('Test Interpolation Filling Creating Right Amount of Frames', () => {
        var body = new LegFeetBody();
        animation.addEmptyFrame();
        animation.addEmptyFrame();
        animation.bodyToFrame(body, 0);
        animation.bodyToFrame(body, 1);

        let newFrames = animation.fillNewInterpolatedFrames(1, animation.frameData);
        expect(newFrames.length).toBe(3);
        newFrames = animation.fillNewInterpolatedFrames(2, animation.frameData);
        expect(newFrames.length).toBe(4);
        newFrames = animation.fillNewInterpolatedFrames(3, animation.frameData);
        expect(newFrames.length).toBe(5);

        animation.addEmptyFrame();
        animation.bodyToFrame(body, 2);

        newFrames = animation.fillNewInterpolatedFrames(1, animation.frameData);
        expect(newFrames.length).toBe(5);
        newFrames = animation.fillNewInterpolatedFrames(2, animation.frameData);
        expect(newFrames.length).toBe(7);
        newFrames = animation.fillNewInterpolatedFrames(3, animation.frameData);
        expect(newFrames.length).toBe(9);
    });

    test('Test Interpolation Filling Doing Correct Interpolation', () => {
        var body = new LegFeetBody();
        animation.addEmptyFrame(0);
        animation.addEmptyFrame(1);
        animation.bodyToFrame(body, 0);
        body.jointSprites.leg.x = 10;
        animation.bodyToFrame(body, 1);
        animation.addEmptyFrame(2);
        body.jointSprites.leg.x = 20;
        animation.bodyToFrame(body, 2);
        const newFrames = animation.fillNewInterpolatedFrames(1, animation.frameData);

        expect(newFrames[1].findJoint("leg").x).toBe(5);
        expect(newFrames[3].findJoint("leg").x).toBe(15);
    });

});