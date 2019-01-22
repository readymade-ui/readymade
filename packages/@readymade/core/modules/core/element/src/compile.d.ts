import { ElementMeta } from './../../decorator/index';
interface StateChange {
    [key: string]: {
        previousValue: any;
        newValue: any;
    };
}
declare function bindTemplate(): void;
declare function bindTemplateNodes(): void;
declare function compileTemplate(elementMeta: ElementMeta, target: any): void;
export { StateChange, bindTemplate, bindTemplateNodes, compileTemplate };
