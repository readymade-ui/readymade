// events

class EventDispatcher {
    public target: Element;
    public events: {
      [key: string]: CustomEvent<any> | Event
    };
    public channels: {
      [key: string]: BroadcastChannel
    };
    constructor(context) {
      this.target = context;
			this.channels = {
        'default': new BroadcastChannel('default')
      };
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
      if (!(<any>ev).detail) {
        (<any>ev) = { type: ev.type };
      } else {
        (<any>ev) = { type: ev.type, detail: (<any>ev).detail };
      }
      (name) ? this.channels[name].postMessage(ev) : this.channels['default'].postMessage(ev);
    }
    public setChannel(name: string) {
      this.channels[name] = new BroadcastChannel(name);
    }
    public removeChannel(name: string) {
      this.channels[name].close();
      delete this.channels[name];
    }
}


export  {
  EventDispatcher
}