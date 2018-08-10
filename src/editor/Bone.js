import Phaser from 'phaser'
import Events from '../events/Events' 
import EventType from '../events/EventType.js'
import BoneStructure from './BoneStructure.js';

class Bone extends Phaser.Sprite {
    constructor(x,y, body, name) {
        super(window.game, x, y, "bone");
        this.jointBody = body;
        this.boneStructure = new BoneStructure(name);
        this.x = x;
        this.y = y;
        this.addBoneToPhaser.bind(this)();
    }

    addBoneToPhaser() {
        Phaser.Sprite.call(this, window.game, this.x, this.y, 'bone');
        window.game.add.existing(this);
        this.inputEnabled = true;
        this.input.useHandCursor=true;
        this.events.onInputDown.add(() => Events.fire(EventType.BONE_CLICK, this), this);
        this.anchor.x = 0.5;
        this.anchor.y = 0;
    }
}

export default Bone;