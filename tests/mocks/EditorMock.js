import { LegFeetBody as BodyMock } from './BodyMock.js';
import Animation from '../../src/editor/Animation.js'
import EditorListener from '../../src/editor/EditorListener.js';

export default class {
    constructor() {
        this.viewwingFrame = 0;
        this.body = new BodyMock();
        this.animation = new Animation(this.body);
        this.animationPlayer = null;
        this.listener = new EditorListener(this, this.animation, this.body);
    }
}
