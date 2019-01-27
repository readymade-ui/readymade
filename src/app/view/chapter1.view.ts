import { css, html, Component, CustomElement } from './../../modules/core/index.js';

@Component({
  selector: 'chapter1-view',
  template: html`
		<h3>Another View</h3>
		<a href="/">Home</a>
	`,
  style: css`

	`,
})
class ChapterOneView extends CustomElement {

  constructor() {
    super();
  }

}

customElements.define('chapter1-view', ChapterOneView );

export { ChapterOneView };
