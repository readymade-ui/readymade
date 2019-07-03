import { Observable } from 'rxjs';
export interface AbstractState {
    [key: string]: any;
}
export declare class Store {
    state$: Observable<AbstractState>;
    private _state$;
    constructor(initialState: AbstractState);
    readonly state: AbstractState;
    setState(nextState: AbstractState): void;
}
