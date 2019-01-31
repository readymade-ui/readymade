// events

class EventDispatcher {
    public target: Element;
    public events: {
      [key: string]: CustomEvent<any> | Event
    };
    public channels: {
      [key: string]: BroadcastChannel
    };
    constructor(context: any, channelName?: string) {
      this.target = context;
			this.channels = {
        'default': new BroadcastChannel('default')
      };
      if (channelName) {
        this.setChannel(channelName);
      }
      this.events = {};
    }
    public get(eventName: string) {
      return this.events[eventName];
    }
    public set(eventName: string, ev: CustomEvent<any> | Event) {
      this.events[eventName] = ev;
      return this.get(eventName);
    }
    public emit(ev: Event | string) {
      if (typeof ev === 'string') ev = this.events[ev];
      this.target.dispatchEvent(ev);
    }
    public broadcast(ev: CustomEvent<any> | Event | string, name?: string) {
      if (typeof ev === 'string') ev = this.events[ev];
      this.target.dispatchEvent(ev);
      const evt = {
        bubbles: ev.bubbles,
        cancelBubble: ev.cancelBubble,
        cancelable: ev.cancelable,
        defaultPrevented: ev.defaultPrevented,
        detail: (<CustomEvent>ev).detail,
        timeStamp: ev.timeStamp,
        type: ev.type
      }; // TODO: figure out a better way to clone the event?
      (name) ? this.channels[name].postMessage(evt) : this.channels['default'].postMessage(evt);
    }
    public setChannel(name: string) {
      this.channels[name] = new BroadcastChannel(name);
      this.channels[name].onmessage = (ev) => {
          for (let prop in (<any>this.target).elementMeta.eventMap) {
            if (prop.includes(name) && prop.includes(ev.data.type)) {
              this.target[(<any>this.target).elementMeta.eventMap[prop].handler](ev.data);
            }
          }
      }
    }
    public removeChannel(name: string) {
      this.channels[name].close();
      delete this.channels[name];
    }
}


export  {
  EventDispatcher
}