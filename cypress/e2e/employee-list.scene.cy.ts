describe('Employee-list specs', () => {
  it('Visit the employee-list page', () => {
    cy.visit('/employees');
  });

  it('Should search input has the focus when it clicks on it', () => {
    // Arrange

    // Act
    cy.visit('/employees');

    cy.findByRole('textbox').as('searchInput');

    cy.get('@searchInput').click();

    // Assert
    cy.get('@searchInput').should('have.focus');
  });

  it('Should return the employee when type the name in the search input', () => {
    // Arrange
    const employee = 'Dani';
    // Act
    cy.visit('/employees');
    cy.findByRole('textbox').as('searchInput');

    cy.get('@searchInput').type(employee);
    // Assert
    cy.get('@searchInput').should('have.value', employee);
    cy.findByRole('table').find('tbody tr').should('have.length', 1);
  });

  it('Should return empty table when the name of an employee that does not exist is typed in the input search', () => {
    // Arrange
    const employee = 'John';
    // Act
    cy.visit('/employees');

    cy.findByRole('textbox').as('searchInput');

    cy.get('@searchInput').type(employee);
    // Assert
    cy.get('@searchInput').should('have.value', employee);
    cy.findByRole('table').find('tbody tr').should('have.length', 0);
  });

  it('Should display left menu when click on the superior left button', () => {
    // Arrange

    // Act
    cy.visit('/employees');
    cy.findByTestId('MenuIcon').as('buttonMenu');
    cy.get('@buttonMenu').click();
    // Assert
    cy.findAllByRole('presentation').find('ul');
  });

  it('Should display right menu when click on the superior right button', () => {
    // Arrange

    // Act
    cy.visit('/employees');
    cy.findByTestId('AccountCircleIcon').as('buttonAccount');
    cy.get('@buttonAccount').click();
    // Assert
    cy.findByRole('menu');
  });

  it('Should return the table with 3 elements when click on right arrow', () => {
    // Arrange
    const labelTextRightArrow = 'Go to next page';

    // Act
    cy.visit('/employees');

    cy.findAllByLabelText(labelTextRightArrow).as('rightArrow');
    cy.get('@rightArrow').click();

    // Assert

    cy.findByRole('table').find('tbody tr').should('have.length', 3);
  });

  it('Should return the table with 5 elements when go back on the first page', () => {
    // Arrange
    const labelTextRightArrow = 'Go to next page';
    const labelTextLeftArrow = 'Go to previous page';
    // Act
    cy.visit('/employees');
    cy.findByLabelText(labelTextRightArrow).as('rightArrow');
    cy.get('@rightArrow').click();
    cy.findByLabelText(labelTextLeftArrow).as('leftArrow');
    cy.get('@leftArrow').click();
    // Assert
    cy.findByRole('table').find('tbody tr').should('have.length', 5);
  });

  it('Should navigate to second employee when click on edit second employee', () => {
    // Arrange

    // Act
    cy.visit('/employees');
    cy.findAllByRole('button').then(($buttons) => {
      $buttons[4].click();
    });
    // Assert
    cy.url().should('equal', 'http://localhost:8080/#/employees/2');
  });

  it('Should display the confirmation-dialog when click on delete first employee', () => {
    // Arrange

    // Act
    cy.visit('/employees');
    cy.findAllByRole('button').then(($buttons) => {
      $buttons[3].click();
    });
    // Assert
    cy.findByRole('dialog');
  });
});
