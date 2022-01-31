const path = require('path');
const { promisifyFunction } = require(path.join(process.cwd(), 'src/server/utility/promises'));

function Events() {
    const _this = this;
    this.events = new Map();

    this.addEvent = function (eventName) {
        if (!eventName || this.events.has(eventName)) return;
        this.events.set(eventName, []);
    }

    this.removeEvent = function (eventName) {
        this.events.delete(eventName);
    }

    this.subscribe = function(eventName, action) {
        if (this.events.has(eventName) && typeof action === 'function') {
            const eventQueue = this.events.get(eventName);
            eventQueue.push(action);
            
            const subscriptionToken = {
                eventName,
                index: eventQueue.length - 1
            };

            return subscriptionToken;
        }
        return null;
    }

    this.unsubscribe = function(subscriptionToken) {
        const { eventName, index } = subscriptionToken;
        
        if (!eventName || !Number.isInteger(index) || !this.events.has(eventName)) return;

        const eventQueue = this.events.get(eventName);
        eventQueue.splice(index, 1);
        this.events.set(eventName, eventQueue);
    }

    async function publish(eventName, eventData) {
        const eventQueue = _this.events.get(eventName);

        return await Promise.all(eventQueue.map(action => {
            return promisifyFunction(action, eventData);
        }));
    }

    this.emit = async function(eventName, eventData) {
        if (!eventName || !this.events.has(eventName)) return;
        
        return await publish(eventName, eventData);
    }
}

module.exports = new Events();