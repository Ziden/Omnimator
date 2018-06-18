import Phaser from 'phaser'
import Events from '../events/Events' 
import SuckMath from '../util/ISuckAtMath.js';
import EventType from '../events/EventType.js'

class Bone extends Phaser.Sprite {
    constructor(x,y, body) {
        super(window.game, x, y, "bone");
        this.jointBody = body;
        this.x = x;
        this.y = y;
        this.addBoneToPhaser.bind(this)();
    }

    addBoneToPhaser() {
        Phaser.Sprite.call(this, window.game, this.x, this.y, 'bone');
        window.game.add.existing(this);
        this.inputEnabled = true;
        this.input.useHandCursor=true;
        this.anchor.x = 0.5;
        this.anchor.y = 0;
    }

}

export default Bone;