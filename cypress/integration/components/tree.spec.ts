
describe('TreeComponent Test', () => {

  beforeEach(() => {
    cy.visit('/test');
    cy.wait(100);
  });

  it('Displays TreeComponent', () => {
    cy.get('app-testbed').shadow().find('x-tree').should('exist');
  });

  it('Displays text set by array', () => {
    cy.get('app-testbed').shadow().find('x-tree')
                         .shadow().find('x-node').first()
                         .find('x-atom').shadow().contains('aaa');
  });

  it('Displays text set by nested array', () => {
    cy.get('app-testbed').shadow().find('x-tree')
                         .shadow().find('x-node').eq(1)
                         .find('x-atom').shadow().contains('fiz');
  });

  it('Displays text set by dot syntax', () => {
    cy.get('app-testbed').shadow().find('x-tree')
                         .shadow().find('x-node').eq(2)
                         .find('x-atom').shadow().contains('bbb');
  });

  it('Displays text set by shallow property', () => {
    cy.get('app-testbed').shadow().find('x-tree')
                         .shadow().find('x-node').eq(3)
                         .find('x-atom').shadow().contains('ccc');
  });

  it('Displays text set by string in setState()', () => {
    cy.get('app-testbed').shadow().find('x-tree')
                         .shadow().find('x-node').last()
                         .find('x-atom').shadow().contains('deep');
  });

});
