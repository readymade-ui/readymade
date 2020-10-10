
describe('MyInputComponent Test', () => {

  beforeEach(() => {
    cy.visit('/test');
    cy.wait(1);
  });

  it('Displays input when focused', () => {
    cy.get('app-testbed').shadow().find('input[is="my-input"]').focus().invoke('val').should('contain', 'input');
  });

});
