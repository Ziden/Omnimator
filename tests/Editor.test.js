import JointStructure from '../src/editor/JointStructure.js';
import Frame from '../src/editor/Frame.js';
import { equalJoints } from './TestUtils.js';
import EditorMock from './mocks/EditorMock.js';
import Events from '../src/events/Events.js';
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

    test('Body gets updated with updated frame data from added frame', () => {
        Events.fire(EventType.FRAME_ADD);
        Events.fire(EventType.FRAME_SELECT, 0);
        editor.body.jointSprites.leg.x = 15;
        Events.fire(EventType.JOINT_MOVE, editor.body.jointSprites.leg);
        Events.fire(EventType.ANIMATION_CHANGE)
        Events.fire(EventType.FRAME_ADD);
        Events.fire(EventType.FRAME_SELECT, 1);

        expect(editor.animation.frameData[1].findJoint('leg').x).toBe(15);
    });

    
    test('Test saving correct joint names', () => {
        Events.fire(EventType.FRAME_ADD);
        Events.fire(EventType.FRAME_SELECT, 0);
        Events.fire(EventType.ANIMATION_CHANGE)
        Events.fire(EventType.FRAME_ADD);
        Events.fire(EventType.FRAME_SELECT, 1);

        expect(editor.animation.frameData[1].joints[0].jointName).toBe('center');
    });

    test('Marking keyframes correctly', () => {
        Events.fire(EventType.FRAME_ADD);
        Events.fire(EventType.JOINT_MOVE, editor.body.jointSprites.leg);
        expect(editor.animation.frameData[0].type).toBe('key');
    });

});