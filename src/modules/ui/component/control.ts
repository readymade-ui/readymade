export interface RdControl {
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
}
