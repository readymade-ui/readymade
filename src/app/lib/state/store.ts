import { BehaviorSubject, Observable } from 'rxjs';

export interface AbstractState {
    [key: string]: any;
}

export class Store {

    public state$: Observable<AbstractState>;
    private _state$: BehaviorSubject<AbstractState>;

    constructor(initialState: AbstractState) {
        this._state$ = new BehaviorSubject(initialState);
        this.state$ = this._state$.asObservable() as Observable<AbstractState>;
    }

    get state(): AbstractState {
        return this._state$.getValue();
    }

    public setState(nextState: AbstractState): void {
        this._state$.next(nextState);
    }

}
