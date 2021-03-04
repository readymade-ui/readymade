export interface RdControl {
  type: string;
  name: string;
  orient?: string;
  min?: number | number[];
  max?: number | number[];
  isActive?: boolean;
  hasUserInput?: boolean;
  hasRemoteInput?: boolean;
  currentValue?: any;
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
}
