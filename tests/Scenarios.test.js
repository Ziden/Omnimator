import JointStructure from '../src/editor/JointStructure.js';
import Frame from '../src/editor/Frame.js';
import { equalJoints } from './TestUtils.js';
import EditorMock from './mocks/EditorMock.js';
import Events from '../src/ui/Events.js';
import EventType from '../src/events/EventType.js';
import JointMock from './mocks/JointMock.js';
import { LegFeetBody } from './mocks/BodyMock.js';

describe("Editor Tests", () => {

    let editor = new EditorMock();
    editor.body = new LegFeetBody();

    beforeEach(() => {
        Events.listeners = {};
        editor = new EditorMock();
    });

    const moveLegXTo = n => {
        editor.body.jointSprites.leg.x = n;
        Events.fire(EventType.JOINT_MOVE, editor.body.jointSprites.leg);
        Events.fire(EventType.ANIMATION_CHANGE)
    }

    const moveSpriteCreateFrameAndMoveAgain = (toFrame) => {
        moveLegXTo(15);
        Events.fire(EventType.FRAME_ADD);
        Events.fire(EventType.FRAME_SELECT, toFrame);
        moveLegXTo(45);
    }

    test('Scenario Weird 1', () => {
        Events.fire(EventType.FRAME_ADD);
        Events.fire(EventType.FRAME_SELECT, 0);

        expect(editor.body.jointSprites.leg.x).toBe(0);

        moveSpriteCreateFrameAndMoveAgain(1);

        Events.fire(EventType.FRAME_SELECT, 0);
        expect(editor.body.jointSprites.leg.x).toBe(15);
        expect(editor.body.jointSprites.leg.jointStructure.x).toBe(15);

        Events.fire(EventType.FRAME_SELECT, 1);
        expect(editor.body.jointSprites.leg.x).toBe(45);
        expect(editor.body.jointSprites.leg.jointStructure.x).toBe(45);

        moveSpriteCreateFrameAndMoveAgain(2);
        expect(editor.body.jointSprites.leg.x).toBe(45);
        expect(editor.body.jointSprites.leg.jointStructure.x).toBe(45);

        Events.fire(EventType.FRAME_SELECT, 1);
        expect(editor.body.jointSprites.leg.x).toBe(15);
        expect(editor.body.jointSprites.leg.jointStructure.x).toBe(15);

        Events.fire(EventType.FRAME_SELECT, 0);
    });

});