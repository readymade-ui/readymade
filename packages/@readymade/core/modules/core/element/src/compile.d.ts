import { ElementMeta } from './../../decorator/index.js';
import { StateChange } from './../../component/index.js';
declare function bindTemplate(): void;
declare function bindTemplateNodes(): void;
declare function compileTemplate(elementMeta: ElementMeta, target: any): void;
export { StateChange, bindTemplate, bindTemplateNodes, compileTemplate };
