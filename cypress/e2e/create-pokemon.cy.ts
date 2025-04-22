describe('Formulario de creación de Pokémon', () => {
  it('debe completar el formulario y crear un Pokémon', () => {
    // Ir al home
    cy.visit('/home');

    // Esperar a que cargue al menos un Pokémon
    cy.get('app-pokemon-card', { timeout: 10000 }).should('exist');

    // Hacer clic en el botón o link para crear un nuevo Pokémon
    cy.contains('Crea tu Pokemon').click(); // Asegúrate de que este botón exista

    // Ya estás en /create-character con la data precargada

    // Nombre
    cy.get('input[formcontrolname="name"]').type('Mi Pokemon');

    // Tipo
    cy.get('p-select[formcontrolname="type"]')
      .click()
      .find('.p-select-list')
      .contains('grass')
      .click();

    // Peso
    cy.get('p-select[formcontrolname="weight"]')
      .click()
      .find('.p-select-list')
      .contains('3000 kg')
      .click();

    // Movimiento
    cy.get('p-select[formcontrolname="move"]')
      .click()
      .find('.p-select-list')
      .contains('scratch')
      .click();

    // Sprites
    cy.get('input[formcontrolname="sprite_front_default"]').type('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png');
    cy.get('input[formcontrolname="sprite_back_default"]').type('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/20.png');
    cy.get('input[formcontrolname="sprite_front_shiny"]').type('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/20.png');
    cy.get('input[formcontrolname="sprite_back_shiny"]').type('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/20.png');

    // Enviar el formulario
    cy.contains('button', 'Crear Pokemon').click();

    // Verificar que esta en la pagina de favoritos
    cy.contains('Limpiar Favoritos').should('be.visible');
  });
});
