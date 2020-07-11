
describe('MyListComponent Test', () => {

  beforeEach(() => {
    cy.visit('/test.html')
  })

  it('Displays four instances of MyItemComponent', () => {
    cy.get('my-list').shadow().get('my-item').should('have.length', 4)
  })

  it('Selects the last item when clicked', () => {
    cy.get('my-list').shadow().get('li').first().click('left')
    cy.get('my-list').shadow().get('li').last().click('left')
    cy.get('my-list').shadow().get('my-item').last().invoke('attr', 'state').should('contain', '--selected')
  })

})

