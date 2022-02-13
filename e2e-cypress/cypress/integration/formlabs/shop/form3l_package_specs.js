import form3lCompletePackage from '../../../fixtures/Form3lPackages/form_3l_complete_package.json';
beforeEach(() => {
  cy.visit(
    Cypress.env('HOST') + '/store/3d-printers/form-3l-package/#/package/'
  );
});

describe('Form 3L configuration flow', () => {
  it('Test the Form 3L Complate Package that default products are selected', () => {
    //Go with default packgae: Form 3L Complate Package
    cy.goToCustomizeStep();

    var product = form3lCompletePackage.defaultSelectedProducts;

    //Check Form 3L 3D printer
    cy.checkProductData(1, product[0].id, product[0].name, product[0].price, 1);

    //Check Form 3L resin tank v2
    cy.checkProductData(2, product[1].id, product[1].name, product[1].price, 1);

    cy.checkProductData(3, product[2].id, product[2].name, product[2].price, 1);
    cy.checkProductData(4, product[3].id, product[3].name, product[3].price, 1);
    cy.checkProductData(6, product[4].id, product[4].name, product[4].price, 1);
  });

  it('Test warranties that show up on the services match the post processing chosen', () => {
    //Go with default packgae: Form 3L Complate Package
    cy.goToCustomizeStep();

    //Go without any post processing chosen
    cy.log('Go without any post processing chosen');
    //Deselect Form Wash L and Form Cure L bundle: Item display card number = 6
    cy.deselectItem('6');
    cy.goToServicePlanStep();
    var servicePlan = form3lCompletePackage.servicePlans;
    cy.checkForm3lServicePlan(servicePlan, 1);

    //Go back and only add Form Wash L and check plan prices
    cy.log('Go back and only add Form Wash L and check plan prices');
    cy.goToCustomizeStep();
    cy.selectItem('8');
    cy.goToServicePlanStep();
    cy.checkForm3lServicePlan(servicePlan, 1);

    //Go back and only add Form Cure L 120V and check plan prices
    cy.log('Go back and only add Form Cure L 120V and check plan prices');
    cy.goToCustomizeStep();
    cy.deselectItem('8');
    cy.selectItem('9');
    cy.goToServicePlanStep();
    cy.checkForm3lServicePlan(servicePlan, 1);

    //Go back and add both individual wash l & cure l
    cy.log('Go back and add both individual wash l & cure l');
    cy.goToCustomizeStep();
    cy.selectItem('8');
    cy.goToServicePlanStep();
    cy.checkForm3lServicePlan(servicePlan, 1);

    //Go back and just add the wash l & cure l bundle
    cy.log('Go back and just add the wash l & cure l bundle');
    cy.goToCustomizeStep();
    cy.deselectItem('8');
    cy.deselectItem('9');
    cy.selectItem('6');
    cy.goToServicePlanStep();
    cy.checkForm3lServicePlan(servicePlan, 1);

    //Go back and add one more Form 3L 3D printer check service plan prices are double
    cy.goToCustomizeStep();
    cy.increaseQuantity(1, 1);

    //Check that the number of rinse bucket v2’s that the user can add is set to the number of printers
    cy.get('input[aria-label="Set quantity"]').eq(1).should('have.value', '2');

    //Check that service plan prices match with number of printers
    cy.goToServicePlanStep();
    cy.checkForm3lServicePlan(servicePlan, 2);
  });

  it('Test the Form 3L basic Package that default products are selected', () => {
    //Go with Form 3L Basic Package
    cy.get('span').contains('Form 3L Basic Package').click();
    cy.goToCustomizeStep();

    var product = form3lCompletePackage.defaultSelectedProducts;

    //Check Form 3L 3D printer is selected
    cy.checkProductData(1, product[0].id, product[0].name, product[0].price, 1);

    //Check Form 3L resin tank v2 is selected
    cy.checkProductData(2, product[1].id, product[1].name, product[1].price, 1);

    //Check Form 3L Build Platform is selected
    cy.checkProductData(3, product[2].id, product[2].name, product[2].price, 1);

    //Check Form 3L Finish Kit: Cleaning Tools is selected
    cy.checkProductData(4, product[3].id, product[3].name, product[3].price, 1);

    //Check Form Wash L and Form Cure L Bundle is selected
    cy.checkProductData(6, product[4].id, product[4].name, product[4].price, 1);
  });
});
