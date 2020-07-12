
describe('MyItemComponent Test', () => {

  beforeEach(() => {
    cy.visit('/test.html');
    cy.wait(1);
  });

  it('Displays the item message', () => {
    cy.get('my-item').first().shadow().contains('Item 1');
  });

  it('Displays selected when clicked', () => {
    cy.get('my-item').first().click('left').invoke('attr', 'state').should('contain', '--selected');
  });

});
