import {
  Component,
  css,
  CustomElement,
  html,
  State
} from './../../../modules/core';

export class GridState {
  public grid: string[] = [];
}

export const _gridState = new GridState();

@Component({
  selector: 'r-grid',
  style: css`
    :host {
      display: grid;
      grid-template-columns: repeat(16, 20px);
      grid-template-rows: auto;
      column-gap: 10px;
      row-gap: 10px;
    }
  `,
  template: html`
    <div no-attr>{{grid[0]}}</div>
    <div no-attr>{{grid[1]}}</div>
    <div no-attr>{{grid[2]}}</div>
    <div no-attr>{{grid[3]}}</div>
    <div no-attr>{{grid[4]}}</div>
    <div no-attr>{{grid[5]}}</div>
    <div no-attr>{{grid[6]}}</div>
    <div no-attr>{{grid[7]}}</div>
    <div no-attr>{{grid[8]}}</div>
    <div no-attr>{{grid[9]}}</div>
    <div no-attr>{{grid[10]}}</div>
    <div no-attr>{{grid[11]}}</div>
    <div no-attr>{{grid[12]}}</div>
    <div no-attr>{{grid[13]}}</div>
    <div no-attr>{{grid[14]}}</div>
    <div no-attr>{{grid[15]}}</div>
    <div no-attr>{{grid[16]}}</div>
    <div no-attr>{{grid[17]}}</div>
    <div no-attr>{{grid[18]}}</div>
    <div no-attr>{{grid[19]}}</div>
    <div no-attr>{{grid[20]}}</div>
    <div no-attr>{{grid[21]}}</div>
    <div no-attr>{{grid[22]}}</div>
    <div no-attr>{{grid[23]}}</div>
    <div no-attr>{{grid[24]}}</div>
    <div no-attr>{{grid[25]}}</div>
    <div no-attr>{{grid[26]}}</div>
    <div no-attr>{{grid[27]}}</div>
    <div no-attr>{{grid[28]}}</div>
    <div no-attr>{{grid[29]}}</div>
    <div no-attr>{{grid[30]}}</div>
    <div no-attr>{{grid[31]}}</div>
    <div no-attr>{{grid[32]}}</div>
    <div no-attr>{{grid[33]}}</div>
    <div no-attr>{{grid[34]}}</div>
    <div no-attr>{{grid[35]}}</div>
    <div no-attr>{{grid[36]}}</div>
    <div no-attr>{{grid[37]}}</div>
    <div no-attr>{{grid[38]}}</div>
    <div no-attr>{{grid[39]}}</div>
    <div no-attr>{{grid[40]}}</div>
    <div no-attr>{{grid[41]}}</div>
    <div no-attr>{{grid[42]}}</div>
    <div no-attr>{{grid[43]}}</div>
    <div no-attr>{{grid[44]}}</div>
    <div no-attr>{{grid[45]}}</div>
    <div no-attr>{{grid[46]}}</div>
    <div no-attr>{{grid[47]}}</div>
    <div no-attr>{{grid[48]}}</div>
    <div no-attr>{{grid[49]}}</div>
    <div no-attr>{{grid[50]}}</div>
    <div no-attr>{{grid[51]}}</div>
    <div no-attr>{{grid[52]}}</div>
    <div no-attr>{{grid[53]}}</div>
    <div no-attr>{{grid[54]}}</div>
    <div no-attr>{{grid[55]}}</div>
    <div no-attr>{{grid[56]}}</div>
    <div no-attr>{{grid[57]}}</div>
    <div no-attr>{{grid[58]}}</div>
    <div no-attr>{{grid[59]}}</div>
    <div no-attr>{{grid[60]}}</div>
    <div no-attr>{{grid[61]}}</div>
    <div no-attr>{{grid[62]}}</div>
    <div no-attr>{{grid[63]}}</div>
    <div no-attr>{{grid[64]}}</div>
    <div no-attr>{{grid[65]}}</div>
    <div no-attr>{{grid[66]}}</div>
    <div no-attr>{{grid[67]}}</div>
    <div no-attr>{{grid[68]}}</div>
    <div no-attr>{{grid[69]}}</div>
    <div no-attr>{{grid[70]}}</div>
    <div no-attr>{{grid[71]}}</div>
    <div no-attr>{{grid[72]}}</div>
    <div no-attr>{{grid[73]}}</div>
    <div no-attr>{{grid[74]}}</div>
    <div no-attr>{{grid[75]}}</div>
    <div no-attr>{{grid[76]}}</div>
    <div no-attr>{{grid[77]}}</div>
    <div no-attr>{{grid[78]}}</div>
    <div no-attr>{{grid[79]}}</div>
    <div no-attr>{{grid[80]}}</div>
    <div no-attr>{{grid[81]}}</div>
    <div no-attr>{{grid[82]}}</div>
    <div no-attr>{{grid[83]}}</div>
    <div no-attr>{{grid[84]}}</div>
    <div no-attr>{{grid[85]}}</div>
    <div no-attr>{{grid[86]}}</div>
    <div no-attr>{{grid[87]}}</div>
    <div no-attr>{{grid[88]}}</div>
    <div no-attr>{{grid[89]}}</div>
    <div no-attr>{{grid[90]}}</div>
    <div no-attr>{{grid[91]}}</div>
    <div no-attr>{{grid[92]}}</div>
    <div no-attr>{{grid[93]}}</div>
    <div no-attr>{{grid[94]}}</div>
    <div no-attr>{{grid[95]}}</div>
    <div no-attr>{{grid[96]}}</div>
    <div no-attr>{{grid[97]}}</div>
    <div no-attr>{{grid[98]}}</div>
    <div no-attr>{{grid[99]}}</div>
    <div no-attr>{{grid[100]}}</div>
    <div no-attr>{{grid[101]}}</div>
    <div no-attr>{{grid[102]}}</div>
    <div no-attr>{{grid[103]}}</div>
    <div no-attr>{{grid[104]}}</div>
    <div no-attr>{{grid[105]}}</div>
    <div no-attr>{{grid[106]}}</div>
    <div no-attr>{{grid[107]}}</div>
    <div no-attr>{{grid[108]}}</div>
    <div no-attr>{{grid[109]}}</div>
    <div no-attr>{{grid[110]}}</div>
    <div no-attr>{{grid[111]}}</div>
    <div no-attr>{{grid[112]}}</div>
    <div no-attr>{{grid[113]}}</div>
    <div no-attr>{{grid[114]}}</div>
    <div no-attr>{{grid[115]}}</div>
    <div no-attr>{{grid[116]}}</div>
    <div no-attr>{{grid[117]}}</div>
    <div no-attr>{{grid[118]}}</div>
    <div no-attr>{{grid[119]}}</div>
    <div no-attr>{{grid[120]}}</div>
    <div no-attr>{{grid[121]}}</div>
    <div no-attr>{{grid[122]}}</div>
    <div no-attr>{{grid[123]}}</div>
    <div no-attr>{{grid[124]}}</div>
    <div no-attr>{{grid[125]}}</div>
    <div no-attr>{{grid[126]}}</div>
    <div no-attr>{{grid[127]}}</div>
  `
})
class RGridComponent extends CustomElement {
  constructor() {
    super();
  }

  @State()
  public getState() {
    return _gridState;
  }

  public refreshGrid() {
    const grid = [];
    for (let i = 0; i < 128; i++) {
      grid[i] = Math.floor(Math.random() * 128) + 1;
    }
    this.setState('grid', grid);
  }

  public animateGrid() {
    this.refreshGrid();
    window.requestAnimationFrame(this.animateGrid.bind(this));
  }

  public connectedCallback() {
    this.animateGrid();
  }
}

export { RGridComponent };
