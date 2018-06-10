import JointMock from './JointMock.js';

const LegFeetBody = () => 
{
    const body = {
        jointSprites: {
            center: {
                x:0,
                y:0
            },
            leg: {
                x:0,
                y:0
            },
            feet: {
                x:0,
                y:0
            }
        },
        update: () =>{},
        getJointStructureName(jointSprite) {
            Object.keys(this.jointSprites).forEach(jointName => {
                const jointSpr = this.jointSprites[jointName];
                if(jointSpr == jointSprite) 
                    return jointName;
            });
            return null;
        }
    };
    body.getJointStructureName = body.getJointStructureName.bind(body);
    body.jointSprites.feet.jointStructure = new JointMock('feet');
    body.jointSprites.leg.jointStructure = new JointMock('leg');
    body.jointSprites.center.jointStructure = new JointMock('center');
    body.jointSprites.feet.fatherJointName = "leg";
    body.jointSprites.leg.fatherJointName = "center";
    body.jointSprites.leg.jointStructure.connectedJoints = ["feet"];
    body.jointSprites.center.jointStructure.connectedJoints = ["leg"];
    return body;
};

module.exports = {
    LegFeetBody: LegFeetBody
}