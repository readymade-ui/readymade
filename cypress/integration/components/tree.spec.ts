
describe('TreeComponent Test', () => {

  beforeEach(() => {
    cy.visit('/test');
    cy.wait(1);
  });

  it('Displays TreeComponent', () => {
    cy.get('app-testbed').shadow().find('x-tree').should('exist');
  });

});
