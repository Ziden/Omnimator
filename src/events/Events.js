class Events {

    constructor() {
        this.listeners = {};
        this.fire = this.fire.bind(this);
        this.on = this.on.bind(this);
    }
    fire (eventName, args)  {
        if(this.listeners[eventName] !== undefined)
            this.listeners[eventName].forEach(e => e(args));
    }
    on (eventName, callback) {
        if(this.listeners[eventName] !== undefined)
            this.listeners[eventName].push(callback);
        else
            this.listeners[eventName] = [callback];
    }
};

const events = new Events();
export default events;