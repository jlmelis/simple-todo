/// <reference types="Cypress" />

describe('Main page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });
});

describe('Add todo', () => {
  it('allows a new todo to  be created', () => {
    cy.visit('/');

    cy.get('#add-todo')
      .type('add cypress todo')
      .should('have.value', 'add cypress todo')
      .type('{enter}');

    cy.get('.todo-title')
      .should('contain.text', 'add cypress todo');
  });
});

