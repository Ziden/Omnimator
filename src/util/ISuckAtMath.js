// gains small performance...????
const sqrt = Math.sqrt;
const atan = Math.atan2;
const sin = Math.sin;
const cos = Math.cos;
/////////////////////////

Math.degrees = function(radians) {
    return (radians * 180 / Math.PI) + 90;
};

const ISuckAtMath = {

    angleBetweenJoints(j1, j2) {
        return Math.degrees(ISuckAtMath.angleBetweenPoints(j1.x, j1.y, j2.x, j2.y));
    },

    distanceBetweenPoints: (x1, y1, x2,y2) => {
        return sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    },

    angleBetweenPoints: (x1, y1, x2, y2) => {
        return atan(x1-x2, y1-y2);
    },
    circleMovement: (centerX, centerY, angle, radius) => {
        return [
            centerX + sin(angle) * radius,
            centerY + cos(angle) * radius
        ];
    }

}

export default ISuckAtMath;