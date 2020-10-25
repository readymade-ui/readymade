/// <reference types="cypress" />
import { EventDispatcher } from '../../../../src/modules/core/event';

let fromElement: HTMLElement;
let toElement: HTMLElement;
let uniElement: HTMLElement;
let event: CustomEvent;
let dispatcher: EventDispatcher;
let receiver: EventDispatcher;
let broadcaster: EventDispatcher;

describe('EventDispatcher Test', () => {

  beforeEach(() => {
    fromElement = document.createElement('div');
    toElement = document.createElement('div');
    uniElement = document.createElement('div');
    event = new CustomEvent('test', { detail: 'check' } );
    dispatcher = new EventDispatcher(fromElement, 'channel-one');
    receiver = new EventDispatcher(toElement, 'channel-one');
    broadcaster = new EventDispatcher(uniElement);
  });

  it('dispatcher has a target that equals fromElement', () => {
     expect(dispatcher.target).equals(fromElement);
  });

  it('dispatcher has channel name called channel-one', () => {
    expect(dispatcher.channels['channel-one'].name).equals('channel-one');
  });

  it('dispatcher stores a CustomEvent named test', () => {
    dispatcher.set('test', event);
    expect(dispatcher.events.test).equals(event);
  });

  it('dispatcher can add channel', () => {
    dispatcher.setChannel('new-channel');
    expect(dispatcher.channels['new-channel'].name).equals('new-channel');
  });

  it('dispatcher can remove channel', () => {
    dispatcher.setChannel('new-channel');
    dispatcher.removeChannel('new-channel');
    expect(dispatcher.channels['new-channel']).equals(undefined);
  });

  it('receiver has a target that equals toElement', () => {
    expect(receiver.target).equals(toElement);
  });

  it('broadcaster has a target that equals uniElement', () => {
    expect(broadcaster.target).equals(uniElement);
  });

  it('broadcaster has default channel name', () => {
    expect(broadcaster.channels.default.name).equals('default');
    expect(broadcaster.channels['channel-one']).equals(undefined);
  });

});
