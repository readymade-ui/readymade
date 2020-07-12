/// <reference types="cypress" />

describe('MyButtonComponent Test', () => {

  beforeEach(() => {
    cy.visit('/test.html');
    cy.wait(1);
  });

  it('Displays outline when clicked', () => {
    cy.get('button[is="my-button"]').click();
    cy.get('button[is="my-button"]').should('have.css', 'box-shadow', 'rgb(255, 105, 180) 0px 0px 0px 0px');
  });

  it('Displays Click', () => {
    cy.get('button[is="my-button"]').contains('Click');
  });

  it('Controls MyListComponent with BroadcastChannel API', () => {
    cy.get('button[is="my-button"]').click();
    cy.get('my-list').shadow().get('my-item').invoke('attr', 'state').should('contain', '--selected');
  });

});
