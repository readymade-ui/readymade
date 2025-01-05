export interface RdLegacyControl {
  type: string;
  name: string;
  selector: string;
  orient?: string;
  stops?: number[];
  min?: number | number[];
  max?: number | number[];
  isActive?: boolean;
  hasUserInput?: boolean;
  hasRemoteInput?: boolean;
  currentValue?: number | string | Array<number> | Array<string>;
  position?: string;
  x?: number;
  y?: number;
  height?: number;
  width?: number;
  size?: string;
  timeStamp?: Date | number;
  snapToCenter?: boolean;
  gridArea?: string;
  placeSelf?: string;
  transform?: string;
  numberType?: 'int' | 'float';
  label?: string;
  channel?: string;
}

export interface RdControl<A> {
  type?: string;
  name: string;
  isActive?: boolean;
  hasUserInput?: boolean;
  hasRemoteInput?: boolean;
  currentValue?: number | string | Array<number> | Array<string> | boolean;
  timeStamp?: Date | number;
  attributes?: A;
}

export interface RdControlSurfaceElement<C> {
  label?: string;
  selector: string;
  style?: Partial<CSSStyleDeclaration>;
  classes?: Array<string>;
  control: C;
  channel?: string;
  hint?: {
    template: string;
  };
  displayValue?: boolean;
}

export interface RdControlSurface {
  label?: string;
  name?: string;
  style?: Partial<CSSStyleDeclaration>;
  classes?: Array<string>;
  controls: Array<RdControlSurfaceElement<any>>;
}
