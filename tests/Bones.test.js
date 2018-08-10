import JointStructure from '../src/editor/JointStructure.js';
import { equalJoints, assertJointEqual } from './TestUtils.js';
import { LegFeetBody } from './mocks/BodyMock.js';
import * as BoneFunctions from '../src/editor/BoneFunctions';

describe("Bone Tests", () => {

    Object.values = function(array) {
        return Object.keys(array).map(element => {
            return array[element];
        });
    }

    test('Test Bone Creation', () => {
        const body = new LegFeetBody();
        BoneFunctions.addBonesToJoints(body.jointSprites);
        const legBones = body.jointSprites.leg.jointStructure.bones;
        expect(legBones.feet).not.toBe(undefined);
    });

});