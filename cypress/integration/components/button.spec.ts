/// <reference types="cypress" />

describe('MyButtonComponent Test', () => {
  beforeEach(() => {
    cy.visit('/test');
    cy.wait(1);
  });

  it('Displays outline when clicked', () => {
    cy.get('app-testbed').shadow().find('button[is="my-button"]').click();
    cy.get('app-testbed')
      .shadow()
      .find('button[is="my-button"]')
      .should('have.css', 'box-shadow', 'rgb(255, 105, 180) 0px 0px 0px 0px');
  });

  it('Displays Click', () => {
    cy.get('app-testbed')
      .shadow()
      .find('button[is="my-button"]')
      .contains('Click');
  });

  it('Controls MyListComponent with BroadcastChannel API', () => {
    cy.get('app-testbed').shadow().find('button[is="my-button"]').click();
    cy.get('app-testbed')
      .shadow()
      .find('my-item')
      .invoke('attr', 'state')
      .should('contain', '--selected');
  });
});
