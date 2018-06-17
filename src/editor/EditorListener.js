import Events from '../ui/Events.js';
import EventType from '../events/EventType.js'
import AnimationPlayer from '../editor/AnimationPlayer.js';
import Interpolation from '../util/Interpolation.js';

class EditorListener {

    constructor(editor) {
        this.editor = editor;
        this.animation = editor.animation;
        this.body = editor.body;
        this.getCurrentFrame = this.getCurrentFrame.bind(this);
        Events.on(EventType.FRAME_ADD, this.onAddFrame.bind(this));
        Events.on(EventType.ANIMATION_CHANGE, this.onAnimationChange.bind(this));
        Events.on(EventType.JOINT_MOVE, this.onJointMove.bind(this));
        Events.on(EventType.FRAME_SELECT, this.onFrameClick.bind(this));
        Events.on(EventType.ANIMATION_PLAY, this.onAnimationPlay.bind(this));
        Events.on(EventType.JOINT_CLICK, this.onJointClick.bind(this));
        Events.on(EventType.ANIMATION_STOP, this.onAnimationStop.bind(this));
        if(window) {
            window.addEventListener('mousedown', this.onWindowClick.bind(this));
        }
    }

    onJointClick(clickedJoint) {
        this.editor.highlightSprite = clickedJoint;
    }

    onWindowClick(event) {
        if(event.target && event.target.tagName == 'CANVAS') {
            Events.fire(EventType.CLICK_NOWHERE);
        }
    }

    onAnimationPlay() {
        this.editor.animationPlayer = new AnimationPlayer(this.animation, this.body);
        this.editor.animationPlayer.start();
    }

    onAnimationStop() {
        this.editor.animationPlayer = null;
    }

    onJointMove(joint) {
        this.body.update();
        const frame = this.getCurrentFrame();
        if(frame.type!='key') {
            Events.fire(EventType.FRAME_CHANGETYPE, {
                frameNumber:this.editor.viewwingFrame,
                newType: 'key'
            });  
        }
        joint.jointStructure.x = joint.x;
        joint.jointStructure.y = joint.y;
    }

    onAnimationChange() {
        this.animation.bodyToFrame(this.body, this.editor.viewwingFrame);
        const frame = this.getCurrentFrame();

        const nextKeyFrame = this.animation.getNextKeyFrame(this.editor.viewwingFrame);
        const previousKeyFrame = this.animation.getPreviousKeyFrame(this.editor.viewwingFrame);

        if (nextKeyFrame != undefined) {
            Interpolation.doInterpolation(this.editor.viewwingFrame, nextKeyFrame, this.animation.frameData, true);
        }

        if (previousKeyFrame != undefined) {
            Interpolation.doInterpolation(previousKeyFrame, this.editor.viewwingFrame, this.animation.frameData, true);
        }
    }

    onFrameClick(frameNumber) {
        this.editor.viewwingFrame = frameNumber;
        this.animation.loadFrameData(this.body, frameNumber);
        this.body.update();
        const frame = this.animation.frameData[frameNumber];
        frame.id = this.animation.frameData.indexOf(frame);
        Events.fire(EventType.DISPLAY_PROPERTIES, {
            type: 'frame',
            property: frame
        });
    }

    onAddFrame(frameNumber) {
        this.animation.addEmptyFrame(this.editor.viewwingFrame);
        if(this.animation.frameData[this.editor.viewwingFrame].type=='Interpolation') {
            const nextKeyFrame = this.animation.getNextKeyFrame(this.editor.viewwingFrame);
            const previousKeyFrame = this.animation.getPreviousKeyFrame(this.editor.viewwingFrame);
    
            if (nextKeyFrame != undefined) {
                Interpolation.doInterpolation(this.editor.viewwingFrame-1, nextKeyFrame, this.animation.frameData, true);
            }
    
            if (previousKeyFrame != undefined) {
                Interpolation.doInterpolation(previousKeyFrame, this.editor.viewwingFrame-1, this.animation.frameData, true);
            }
        }
    }

    getCurrentFrame() {
        return this.animation.frameData[this.editor.viewwingFrame];
    }
}

export default EditorListener;