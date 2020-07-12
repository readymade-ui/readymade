
describe('MyTreeComponent Test', () => {

  beforeEach(() => {
    cy.visit('/test.html');
    cy.wait(1);
  });

  it('Displays TreeComponent', () => {
    cy.get('x-tree').should('exist');
  });

});
