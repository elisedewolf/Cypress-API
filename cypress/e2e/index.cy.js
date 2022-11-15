/// <reference types="cypress"/>

context('First api with Cypress', () => {
    describe('API in petsore', () => {
      it('GET request', () => {
        cy.request('https://petstore3.swagger.io/api/v3/pet/10')
        .then((response) => {
          expect(response).to.have.property('status', 200);
        });   

        cy.request('GET','https://petstore3.swagger.io/api/v3/pet/10')
        .then((response) => {
          expect(response.body).to.have.property('id', 10);
              });       
            });

        it('POST pet', () => {
          cy.fixture('postNewPet.json').then((newPet) => {
          cy.request('POST', 'https://petstore3.swagger.io/api/v3/pet',newPet)
          .then((response) => {
            expect(response).to.have.property('status', 200);
            expect(response.body).to.have.property('id', 55);
            expect(response.body).to.have.property('name', 'woef');
          });   
        });
      
      });
      it('intersept pet',()=>{
        cy.visit('https://petstore3.swagger.io/')
        cy.intercept('GET','https://petstore3.swagger.io/api/v3/pet/10',{fixture:'pet10.json'}).as('pet10')
        cy.get('#operations-pet-getPetById').within(() => {
          cy.get('.opblock-summary-control').click();
          cy.get('button').contains('Try it out').click();
          cy.get('input[placeholder="petId"]').type('10');
          cy.get('button[class="btn execute opblock-control__btn"]').click();
        });
        cy.wait('@pet10');
        });
      });
    });
  