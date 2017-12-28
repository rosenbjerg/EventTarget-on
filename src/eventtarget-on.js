"use strict";

(() => {
    EventTarget.prototype.on = function (event, selector, handler, options) {
        let events = event.split();
        let func;
        let sType = typeof selector;
        if (arguments.length <= 3 && sType === 'function'){
            options = handler;
            handler = selector;
            func = (e) => {
                if (e.target === this) handler.call(e.target, e);
            };
        }
        else {
            func = (e) => {
                let target = tryGetMatch(this, selector, e.path);
                if (target) handler.call(target, e);
            };
        }
        if (this._eventListeners === undefined)
            this._eventListeners = [];
        events.forEach(ev => {
            this.addEventListener(ev, func, options);
            this._eventListeners.push({event: ev, handler: handler, func, options})
        });
        return this;
    };
    EventTarget.prototype.off = function (event, handler, options) {
        let handlers = this._eventListeners;
        if (options)
            handlers = handlers.filter(h => h.options === options);
        if (handler)
            handlers = handlers.filter(h => h.handler === handler);
        if (event){
            let events = event.split();
            handlers = handlers.filter(h => events.indexOf(h.event) !== -1);
        }
        handlers.forEach(h => this.removeEventListener(h.event, h.func, h.options));
        this._eventListeners = this._eventListeners.filter(l => !handlers.includes(l));
    };
    function tryGetMatch(parent, selector, path) {
        for (let i = 0, max = path.length; i < max; i++){
            if (path[i].matches(selector))
                return path[i];
            if (path[i] === parent)
                return false;
        }
        return false;
    }
})();