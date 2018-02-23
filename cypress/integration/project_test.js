describe('End To End Drill 2', () => {
    it('.should() - asses the page works properly', () => {
        cy.visit('https://top-albums-list.firebaseapp.com');

        cy.viewport('macbook-13')

        cy.title()
            .should('include', 'Top 500 Albums');

        cy.get('.rsButton')
            .click();
        cy.url().should('eq', 'https://top-albums-list.firebaseapp.com/rs_home.html');

        cy.get('#main > div > div.albumCoverBackground > ol > li')
            .should("have.length", 500);

        cy.get('#1').find('img')
            .click();
        cy.get('.modal-content').find('h4')
            .should('have.text', "The Beatles - Sgt. Pepper's Lonely Hearts Club Band");

        cy.get('#albumYear')
            .should('have.text', 'Album Year: 1967');

        cy.get('#rankNo')
            .should('have.text', 'Ranked No. 1 out of 500');

        cy.get('#trackListing > li:nth-child(1)')
            .should("have.length.gt", 0);

        cy.get('.close')
            .click();
        cy.url().should('eq', 'https://top-albums-list.firebaseapp.com/rs_home.html');

        cy.get(':nth-child(9) > a')
            .click();
        cy.url().should('eq', 'https://top-albums-list.firebaseapp.com/rs_home.html#300');

        cy.get('#320').find('img')
            .click();
        cy.get('.modal-content').find('h4')
            .should('have.text', 'Radiohead - Amnesiac');

        cy.get('#albumYear')
            .should('have.text', 'Album Year: 2001');

        cy.get('#rankNo')
            .should('have.text', 'Ranked No. 320 out of 500');

        cy.get('#trackListing > li:nth-child(1)')
            .should("have.length.gt", 0);

        cy.get('.close')
            .click();
        cy.url().should('eq', 'https://top-albums-list.firebaseapp.com/rs_home.html#300');

        cy.get(':nth-child(3) > a')
            .click();
        cy.url().should('eq', 'https://top-albums-list.firebaseapp.com/rs_home.html#main');

        cy.get('.landingPageLink')
            .click();
        cy.url().should('eq', 'https://top-albums-list.firebaseapp.com/index.html');



        cy.get('.nmeButton')
            .click();
        cy.url().should('eq', 'https://top-albums-list.firebaseapp.com/nme_home.html');

        cy.get('#main > div > div.albumCoverBackground > ol > li')
            .should("have.length", 500);

        cy.get('#1').find('img')
            .click();
        cy.get('.modal-content').find('h4')
            .should('have.text', 'The Smiths - The Queen Is Dead');

        cy.get('#albumYear')
            .should('have.text', 'Album Year: 1986');

        cy.get('#rankNo')
            .should('have.text', 'Ranked No. 1 out of 500');

        cy.get('#trackListing > li:nth-child(1)')
            .should("have.length.gt", 0);

        cy.get('.close')
            .click();
        cy.url().should('eq', 'https://top-albums-list.firebaseapp.com/nme_home.html');

        cy.get(':nth-child(9) > a')
            .click();
        cy.url().should('eq', 'https://top-albums-list.firebaseapp.com/nme_home.html#300');

        cy.get('#320').find('img')
            .click();
        cy.get('.modal-content').find('h4')
            .should('have.text', 'Tom Waits - Swordfishtrombones');

        cy.get('#albumYear')
            .should('have.text', 'Album Year: 1983');

        cy.get('#rankNo')
            .should('have.text', 'Ranked No. 320 out of 500');

        cy.get('#trackListing > li:nth-child(1)')
            .should("have.length.gt", 0);

        cy.get('.close')
            .click();
        cy.url().should('eq', 'https://top-albums-list.firebaseapp.com/nme_home.html#300');

        cy.get(':nth-child(3) > a')
            .click();
        cy.url().should('eq', 'https://top-albums-list.firebaseapp.com/nme_home.html#main');

        cy.get('.landingPageLink')
            .click();
        cy.url().should('eq', 'https://top-albums-list.firebaseapp.com/index.html');

    });
});