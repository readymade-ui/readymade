describe('MyItemComponent Test', () => {
  beforeEach(() => {
    cy.visit('/test');
    cy.wait(1);
  });

  it('Displays the item message', () => {
    cy.get('app-testbed').shadow().find('my-item').first().contains('Item 1');
  });

  it('Displays selected when clicked', () => {
    cy.get('app-testbed')
      .shadow()
      .find('my-item')
      .first()
      .click('left')
      .invoke('attr', 'state')
      .should('contain', '--selected');
  });
});
