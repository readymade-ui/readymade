
describe('MyListComponent Test', () => {

  beforeEach(() => {
    cy.visit('/test');
  });

  it('Displays four instances of MyItemComponent', () => {
    cy.get('app-testbed').shadow().find('my-list').find('my-item').should('have.length', 4);
  });

  it('Selects the last item when clicked', () => {
    cy.get('app-testbed').shadow().find('my-list').find('li').first().click('left');
    cy.get('app-testbed').shadow().find('my-list').find('li').last().click('left');
    cy.get('app-testbed').shadow().find('my-list').find('my-item').last().invoke('attr', 'state').should('contain', '--selected');
  });

});
