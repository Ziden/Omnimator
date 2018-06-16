
class AnimationController {
    constructor(app, db) {
        this.db = db;
        app.route('/animation')
            .get(this.getAll.bind(this))
            .post(this.createAnimation.bind(this));
    
        app.route('/animation/animationId')
            .get(this.getOne.bind(this))
            .put(this.updateAnimation.bind(this))
            .delete(this.deleteAnimation.bind(this));
    }
    createAnimation(reqquest, response) {
        
    }
    getOne(request, response) {

    }
    getAll(reqquest, response) {
        this.db.find({}, (err, animations) => {
            response.json(animations);
        });
    }
    deleteAnimation(reqquest, response) {

    }
    updateAnimation(reqquest, response) {

    }
}

module.exports = AnimationController;