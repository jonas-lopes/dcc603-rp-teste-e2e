describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Não adiciona tarefa vazia', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
        .type('{enter}');

    cy.get('[data-cy=todos-list]')
        .children()
        .should('have.length', 0);
  });

  it('Adiciona múltiplas tarefas e verifica a ordem', () => {
    cy.visit('');

    const tarefas = ['Estudar Laravel', 'Estudar React', 'Estudar Docker'];
    tarefas.forEach(tarefa => {
      cy.get('[data-cy=todo-input]').type(`${tarefa}{enter}`);
    });

    cy.get('[data-cy=todos-list]')
        .children()
        .should('have.length', 3)
        .then(items => {
          expect(items[0]).to.contain.text('Estudar Laravel');
          expect(items[1]).to.contain.text('Estudar React');
          expect(items[2]).to.contain.text('Estudar Docker');
        });
  });

  it('Marca e desmarca uma tarefa como concluída', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
        .type('Estudar Cypress{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
        .check()
        .should('be.checked');

    cy.get('[data-cy=todos-list] > li')
        .should('have.class', 'completed'); // se sua app aplica classe CSS

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
        .uncheck()
        .should('not.be.checked');

    cy.get('[data-cy=todos-list] > li')
        .should('not.have.class', 'completed');
  });

});