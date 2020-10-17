declare class EventDispatcher {
    target: Element;
    events: {
        [key: string]: CustomEvent<any> | Event;
    };
    channels: {
        [key: string]: BroadcastChannel;
    };
    constructor(context: any, channelName?: string);
    get(eventName: string): Event | CustomEvent<any>;
    set(eventName: string, ev: CustomEvent<any> | Event): Event | CustomEvent<any>;
    emit(ev: Event | string): void;
    broadcast(ev: CustomEvent<any> | Event | string, name?: string): void;
    setChannel(name: string): void;
    removeChannel(name: string): void;
}
export { EventDispatcher };
