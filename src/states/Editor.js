
import Phaser from 'phaser'
import Joint from '../editor/Joint.js'
import Body from '../editor/Body.js'
import Animation from '../editor/Animation.js'
import AnimationPlayer from '../editor/AnimationPlayer'
import Events from '../ui/Events.js'
import {
    UI,
    renderUI
} from '../ui/Index.jsx'
import EditorListener from '../editor/EditorListener.js';
import EventType from '../events/EventType.js';

export default class extends Phaser.State {

    create() {
        this.update = this.update.bind(this);
        this.viewwingFrame = 0;
        this.body = new Body(game.camera.width / 2, game.camera.height / 2);
        this.animation = new Animation(this.body);
        this.animationPlayer = null;
        this.UI = renderUI();
        this.listener = new EditorListener(this, this.animation, this.body);
        Events.fire(EventType.FRAME_ADD);
    }

    render() {

        if(this.highlightSprite) {
            window.game.debug.spriteBounds(this.highlightSprite);
        }

        Object.values(this.body.jointSprites).forEach(joint => {
            joint.linesToConnectedJoints.forEach(line => {
                window.game.debug.geom(line);
            });
        })
    }

    update() {
        if(this.animationPlayer != null) {
            this.animationPlayer.update();
        }
    }

}