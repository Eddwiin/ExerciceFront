/// <reference types="cypress" />

context("Books", () => {
    beforeEach(() => {
        cy.initApp()
        cy.location('pathname').should('include', 'books');
    })

    it('Vérifier que l\'objet retourné par l\'API est correct', () => {

        cy.get('@books').its('status').should('eq', 200)
        cy.get('@books').should(response => {
            expect(response.body.length).is.not.null;
            expect(response.body).to.not.be.empty
            expect(response.body[0]).to.have.all.keys('isbn', 'title', 'price', 'cover', 'synopsis')
            assert.isNumber(response.body[0]['price'])
        })
    })

    it('Faire une recherche via l\'autocomplete', () => {
        cy.get('.autocomplete__input')
            .type("Henri Potier et la")
            .get(".autocomplete__content")
            .find('li')
            .should('have.length', 2)
            .get('.books__content__card')
            .should('have.length', 2)
            .get('.autocomplete__input')
            .type('Henri Potier à l\'école des sorciers')
            .should('have.length', 1)
    })

    it('Sélectionner un livre dans les propositions de l\'autocomplete', () => {
        cy.get('.autocomplete__input')
            .type("Henri Potier et la")
            .get('.autocomplete__content__suggestion:first')
            .click({ force: true })
            .get('.books__content__card')
            .find('mat-card-title')
            .contains("Henri Potier et la Chambre des secrets")
    })

    it('Vérifier que le livre acheté a été ajouté au panier', () => {
        cy.get('.books__content')
            .find('mat-card-title')
            .contains('Henri Potier à l\'école des sorciers')
            .get('.books__content__card__btn')
            .find('button')
            .click({ multiple: true, force: true })
            .get('.books__content')
            .find('mat-card-title')
            .contains('Henri Potier et la Chambre des secrets')
            .get('.books__content__card__btn')
            .find('button')
            .click({ multiple: true, force: true })
            .get('.books__content')
            .find('mat-card-title')
            .contains('Henri Potier et l\'Ordre du phénix')
            .get('.books__content__card__btn')
            .find('button')
            .click({ multiple: true, force: true })
            .get('.mat-badge-content')
            .invoke('text')
            .then(parseInt)
            .should('be.eq', 21)

    })

})