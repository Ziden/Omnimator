import JointStructure from '../src/editor/JointStructure.js';
import Animation from '../src/editor/Animation.js';
import AnimationPlayer from '../src/editor/AnimationPlayer.js';
import {
    LegFeetBody
} from './mocks/BodyMock.js';

describe("Animation Tests", () => {

    let animation = new Animation();
    let body = null;
    beforeEach(() => {
        animation = new Animation();
        animation.addEmptyFrame();
        animation.addEmptyFrame();
        animation.addEmptyFrame();

        body = new LegFeetBody();
        animation.bodyToFrame(body, 0);
        body.jointSprites.leg.x = 10;
        animation.bodyToFrame(body, 1);
        body.jointSprites.leg.x = 20;
        animation.bodyToFrame(body, 2);
    });

    test('Test Basic Animation Player', () => {
        const animationPlayer = new AnimationPlayer(animation, body);
        animationPlayer.interpolation = 1;
        animationPlayer.start();

        for(let x = 0; x < animationPlayer.frames.length ; x++) {
            animationPlayer.update();
            expect(animationPlayer.frame).toBe(x+1);
            expect(body.jointSprites.leg.x).toBe(x * 5);
        }
        
    });

});