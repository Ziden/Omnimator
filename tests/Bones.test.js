import JointStructure from '../src/editor/JointStructure.js';
import { equalJoints, assertJointEqual } from './TestUtils.js';
import { LegFeetBody } from './mocks/BodyMock.js';
import * as BoneFunctions from '../src/editor/BoneFunctions';

describe("Joint Tests", () => {

    const mockJoints = [];

    test('Test Bone Creation', () => {

        BoneFunctions.addBonesToJoints(Object.keys(LegFeetBody.jointSprites));

        expect(LegFeetBody.jointSprites.leg.boneSprites.lenght).toBe(1);
        
    });

});