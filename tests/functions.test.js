import SuckMath from '../src/util/ISuckAtMath.js';

describe("Function Tests", () => {

    test('Test Angle 1', () => {
        
        var p1 = {
            x:0,
            y:0
        }

        var p2 = {
            x:10,
            y:0
        }

        var angle = SuckMath.angleBetweenJoints(p1, p2);
        expect(angle).toBe(0); 
    });

    test('Test Angle 2', () => {
        
        var p1 = {
            x:0,
            y:0
        }

        var p2 = {
            x:0,
            y:10
        }

        var angle = SuckMath.angleBetweenJoints(p1, p2);
        expect(angle).toBe(270);
            
    });

    test('Test Angle 3', () => {
        
        var p1 = {
            x:0,
            y:0
        }

        var p2 = {
            x:-10,
            y:0
        }

        var angle = SuckMath.angleBetweenJoints(p1, p2);
        expect(angle).toBe(180);
            
    });

    test('Test Angle 4', () => {
        
        var p1 = {
            x:0,
            y:0
        }

        var p2 = {
            x:0,
            y:-10
        }

        var angle = SuckMath.angleBetweenJoints(p1, p2);
        expect(angle).toBe(90);
            
    });

    test('Test Angle 5', () => {
        
        var p1 = {
            x:0,
            y:10
        }

        var p2 = {
            x:0,
            y:0
        }

        var angle = SuckMath.angleBetweenJoints(p1, p2);
        expect(angle).toBe(90);
            
    });


});