
describe('TemplateRepeater Test', () => {

  beforeEach(() => {
    cy.visit('/test');
    cy.wait(100);
  });

  it('Displays TemplateRepeater', () => {
    cy.get('app-testbed').shadow().find('r-repeatr').should('exist');
  });

  it('Displays r-repeatr from existing set by object', () => {
    cy.get('app-testbed').shadow().find('r-repeatr').first()
                         .find('li').last().contains('Item 5');
  });

  it('Displays r-repeatr from existing set by array', () => {
    cy.get('app-testbed').shadow().find('r-repeatr').last()
                        .find('li').last().contains('five');
  });

  it('Displays template from r-repeat set by object', () => {
    cy.get('app-testbed').shadow().find('ul.is--large').first()
                        .find('li').last().contains('Item 5');
  });

  it('Displays template from r-repeat set by array', () => {
    cy.get('app-testbed').shadow().find('ul.is--large').last()
                        .find('li').last().contains('five');
  });

});
