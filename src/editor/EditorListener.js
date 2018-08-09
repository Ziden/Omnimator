import Events from '../events/Events';
import EventType from '../events/EventType.js'
import AnimationPlayer from '../editor/AnimationPlayer.js';
import Interpolation from '../util/Interpolation.js';
import { onDragUpdate as updateJoint } from './JointFunctions.js';
import HotKeys from './HotKeys.js';

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
        Events.on(EventType.BONE_CLICK, this.onBoneClick.bind(this));
        Events.on(EventType.ANIMATION_STOP, this.onAnimationStop.bind(this));
        Events.on(EventType.BONE_UPDATE, this.onBoneUpdate.bind(this));
    }

    onBoneUpdate(boneUpdateEvent) {
        const {
            bone, length
        } = boneUpdateEvent;
        bone.height = length;
        bone.boneStructure.length = length;
        const connectedFurtherJoint = bone.connectedJoints[1];

        connectedFurtherJoint.fatherDistance = length;
        updateJoint(connectedFurtherJoint);
    }

    onBoneClick(clickedBone) {
        this.editor.highlightSprite = clickedBone;
        Events.fire(EventType.DISPLAY_PROPERTIES, {type:'bone', property: clickedBone});
    }

    onJointClick(clickedJoint) {
        this.editor.highlightSprite = clickedJoint;
        Events.fire(EventType.DISPLAY_PROPERTIES, {type:'joint', property: clickedJoint});
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
        if(frame.type !== 'key') {
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
        let interpolationIndex = undefined;
        if(this.getCurrentFrame().type.indexOf('Interpolator') != -1) {
            interpolationIndex = this.editor.viewwingFrame -1;   
        } else if(this.getCurrentFrame().type=='key') {
            interpolationIndex = this.editor.viewwingFrame;   
        }
        if(interpolationIndex !== undefined) {
            const nextKeyFrame = this.animation.getNextKeyFrame(this.editor.viewwingFrame);
            const previousKeyFrame = this.animation.getPreviousKeyFrame(this.editor.viewwingFrame);
    
            if (nextKeyFrame != undefined) {
                Interpolation.doInterpolation(interpolationIndex, nextKeyFrame, this.animation.frameData, true);
            }
    
            if (previousKeyFrame != undefined) {
                Interpolation.doInterpolation(previousKeyFrame, interpolationIndex, this.animation.frameData, true);
            }
        }
    }

    getCurrentFrame() {
        return this.animation.frameData[this.editor.viewwingFrame];
    }
}

export default EditorListener;