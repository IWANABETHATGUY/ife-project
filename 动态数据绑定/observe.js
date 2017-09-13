class Events {
    constructor() {
        this.events = {};
    }
    on(event, callback) {
        if (this.events[event]) {
            this.events[event].push(callback);
        } else {
            this.events[event] = [callback];
        }
    }
    off(event) {
        if (this.events[event] && this.events.hasOwnProperty(event)) {
            delete this.events.event;
        }
    }
    emit(event, ...arg) {
        if (this.events[event] && this.events.hasOwnProperty(event)) {
            for (let i = 0, len = this.events[event].length; i < len; i++) {
                this.events[event][i](...arg);
            }
        }
    }
}
class Observer {
    constructor(data) {
        this.data = data;
        this.walk(this.data);
        this.eventBus = new Events();
    }
    $watch(attr, callback) {
        this.eventBus.on(attr, callback);
    }
    walk(obj) {
        let val = null;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                val = obj[key];
                if (typeof val === 'object') {
                    new Observer(val);
                } 
                this.convert(key, val);
            }
        }
    }
    convert(key, val) {
        let _this = this;
        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            writeable:true,
            get:() => {
                if (typeof val !== 'object') {
                    console.log(`你访问了${key}`);
                }
                return val;
            },
            set:(newVal) => {
                console.log(`你设置了${key},新的值为${newVal}`);
                _this.eventBus.emit(key, val, newVal);
                val = newVal;
                if (typeof newVal === 'object') {
                    new Observer(val);
                }
                
            }
        });
    }
}

let data = {
    shit:'good',
    user: {
        name: 'liangshaofeng',
        age: '24'
    },
    address: {
        city: 'beijing'
    }
};

let app = new Observer(data);
app.$watch('shit', function(age, newAge) {
    console.log(`年龄从${age}变成了${newAge}`);
});