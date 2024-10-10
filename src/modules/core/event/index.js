export class ReadymadeEventTarget extends EventTarget {}
export class EventDispatcher {
  constructor(context, channelName) {
    this.target = context;
    this.channels = {
      default: new BroadcastChannel('default'),
    };
    if (channelName) {
      this.setChannel(channelName);
    }
    this.events = {};
  }
  get(eventName) {
    return this.events[eventName];
  }
  set(eventName, ev) {
    this.events[eventName] = ev;
    return this.get(eventName);
  }
  emit(ev) {
    if (typeof ev === 'string') {
      ev = this.events[ev];
    }
    this.target.dispatchEvent(ev);
  }
  broadcast(ev, name) {
    if (typeof ev === 'string') {
      ev = this.events[ev];
    }
    this.target.dispatchEvent(ev);
    const evt = {
      bubbles: ev.bubbles,
      cancelBubble: ev.cancelBubble,
      cancelable: ev.cancelable,
      defaultPrevented: ev.defaultPrevented,
      detail: ev.detail,
      timeStamp: ev.timeStamp,
      type: ev.type,
    };
    if (name) {
      this.channels[name].postMessage(evt);
    } else {
      this.channels.default.postMessage(evt);
    }
  }
  setChannel(name) {
    this.channels[name] = new BroadcastChannel(name);
    this.channels[name].onmessage = (ev) => {
      for (const prop in this.target.elementMeta?.eventMap) {
        if (prop.includes(name) && prop.includes(ev.data.type)) {
          this.target[this.target.elementMeta?.eventMap[prop].handler](ev.data);
        }
      }
    };
  }
  removeChannel(name) {
    this.channels[name].close();
    delete this.channels[name];
  }
}
