
describe('MyInputComponent Test', () => {

  beforeEach(() => {
    cy.visit('/test.html')
    cy.wait(1)
  })

  it('Displays input when focused', () => {
    cy.get('input[is="my-input"]').focus().invoke('val').should('contain', 'input')
  })

})

