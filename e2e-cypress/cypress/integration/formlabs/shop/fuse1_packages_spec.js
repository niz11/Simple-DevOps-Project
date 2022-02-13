import fuseWorkflowEssentialsPackage from '../../../fixtures/Fuse1Packages/fuse_1_workflow_essentials_package.json';
import fuseHighEfficiencyPackage from '../../../fixtures/Fuse1Packages/fuse_1_high_efficiency_package.json';
import fuseMaxThroughputPackage from '../../../fixtures/Fuse1Packages/fuse_1_max_throughput_package.json';
import fuseBuildYourOwnPackage from '../../../fixtures/Fuse1Packages/fuse_1_build_your_own_package.json';
beforeEach(() => {
  //Visit HOST
  cy.visit(
    Cypress.env('HOST') +
      '/store/3d-printers/fuse-1-build-your-own-package/#/package/'
  );
});
describe('Fuse 1 configuration flow', () => {
  it('Test Fuse 1 Workflow Essentials Package', () => {
    //Step 1: Go with default Fuse 1 Workflow Essentials Package
    cy.get('a[href="#/customize/"]').click();

    //Step 2: Customise, Check default selected products and their prices

    //Check Fuse 1 Printer 120V
    var product = fuseWorkflowEssentialsPackage.defaultSelectedProducts;
    cy.checkProductData(1, product[0].id, product[0].name, product[0].price, 1);

    //Check Fuse 1 Build Chamber 120V
    cy.checkProductData(2, product[1].id, product[1].name, product[1].price, 1);

    //Check Fuse 1 Powder Cartridge
    cy.checkProductData(4, product[2].id, product[2].name, product[2].price, 1);

    //Check Fuse 1 Printer Stand
    cy.checkProductData(5, product[3].id, product[3].name, product[3].price, 1);

    //Check Nylon 12 Powder 6 kg
    cy.checkProductData(6, product[4].id, product[4].name, product[4].price, 3);

    //Check Fuse Shift 120V
    cy.checkProductData(8, product[5].id, product[5].name, product[5].price, 1);

    //Step 3:Select Service plan
    //Go with default selected Fuse Shift 120V
    cy.log('Step 3:Select Service plan');

    cy.get('a[href="#/service/"]').click();

    var servicePlan =
      fuseWorkflowEssentialsPackage.fuseAndShiftPremiumServicePlans;

    //Check Fuse and Sift Premium Service 1 Year plan
    cy.checkServicePlan(1, servicePlan[0].name, servicePlan[0].price);

    //Check Fuse and Sift Premium Service 2 Year plan
    cy.checkServicePlan(2, servicePlan[1].name, servicePlan[1].price);

    //Check Fuse and Sift Premium Service 3 Year plan
    cy.checkServicePlan(3, servicePlan[2].name, servicePlan[2].price);

    //Step back and deselect Fuse Shift 120V
    cy.get('a[href="#/customize/"]').click({ force: true });
    cy.get('span[class^="ProductOptionControl_title"]').eq(7).click();

    //Test service plans price for only fuse 1 selected
    cy.get('a[href="#/service/"]').click();
    var fuseServicePlan = fuseWorkflowEssentialsPackage.fusePremiumServicePlans;
    var productCardPosition = 1;
    cy.get(fuseServicePlan).each((item, index) => {
      cy.checkServicePlan(
        productCardPosition,
        fuseServicePlan[index].name,
        fuseServicePlan[index].price
      );
      cy.log(item);
      productCardPosition++;
    });
  });
  it('Test Fuse 1 High Efficiency Package', () => {
    //Step 1: Select and go with Fuse 1 High Efficiency Package
    cy.get('span').contains('Fuse 1 High Efficiency Package').click();
    cy.get('a[href="#/customize/"]').click();

    //Step 2: Customise, Check default selected products and their prices

    //Check Fuse 1 Printer 120V
    var product = fuseHighEfficiencyPackage.defaultSelectedProducts;
    cy.checkProductData(1, product[0].id, product[0].name, product[0].price, 1);

    //Check Fuse 1 Build Chamber 120V
    cy.checkProductData(2, product[1].id, product[1].name, product[1].price, 1);

    //Check Fuse 1 Build Chamber 120V
    cy.checkProductData(3, product[2].id, product[2].name, product[2].price, 1);

    //Check Fuse 1 Powder Cartridge
    cy.checkProductData(4, product[3].id, product[3].name, product[3].price, 2);

    //Check Fuse 1 Printer Stand
    cy.checkProductData(5, product[4].id, product[4].name, product[4].price, 1);

    //Check Nylon 12 Powder 6 kg
    cy.checkProductData(6, product[5].id, product[5].name, product[5].price, 4);

    //Check Fuse Shift 120V
    cy.checkProductData(8, product[6].id, product[6].name, product[6].price, 1);

    //Step 3:Select Service plan
    //Go with default selected Fuse Shift 120V
    cy.log('Step 3:Select Service plan');

    cy.get('a[href="#/service/"]').click();

    var servicePlan = fuseHighEfficiencyPackage.fuseAndShiftPremiumServicePlans;

    //Check Fuse and Sift Premium Service 1 Year plan
    cy.checkServicePlan(1, servicePlan[0].name, servicePlan[0].price);

    //Check Fuse and Sift Premium Service 2 Year plan
    cy.checkServicePlan(2, servicePlan[1].name, servicePlan[1].price);

    //Check Fuse and Sift Premium Service 3 Year plan
    cy.checkServicePlan(3, servicePlan[2].name, servicePlan[2].price);

    //Step back and deselect Fuse Shift 120V
    cy.get('a[href="#/customize/"]').click({ force: true });
    cy.get('span[class^="ProductOptionControl_title"]').eq(7).click();

    //Test service plans price for only fuse 1 selected
    cy.get('a[href="#/service/"]').click();
    var fuseServicePlan = fuseHighEfficiencyPackage.fusePremiumServicePlans;
    var productCardPosition = 1;
    cy.get(fuseServicePlan).each((item, index) => {
      cy.checkServicePlan(
        productCardPosition,
        fuseServicePlan[index].name,
        fuseServicePlan[index].price
      );
      cy.log(item);
      productCardPosition++;
    });
  });
  it('Test Fuse 1 Maximum Throughput Package', () => {
    //Step 1: Select and go with Fuse 1 Maximum Throughput Package
    cy.get('span').contains('Fuse 1 Maximum Throughput Package').click();
    cy.get('a[href="#/customize/"]').click();

    //Step 2: Customise, Check default selected products and their prices

    //Check Fuse 1 Printer 120V
    var product = fuseMaxThroughputPackage.defaultSelectedProducts;
    cy.checkProductData(1, product[0].id, product[0].name, product[0].price, 2);

    //Check Fuse 1 Build Chamber 120V
    cy.checkProductData(2, product[1].id, product[1].name, product[1].price, 2);

    //Check Fuse 1 Build Chamber 120V
    cy.checkProductData(3, product[2].id, product[2].name, product[2].price, 2);

    //Check Fuse 1 Powder Cartridge
    cy.checkProductData(4, product[3].id, product[3].name, product[3].price, 4);

    //Check Fuse 1 Printer Stand
    cy.checkProductData(5, product[4].id, product[4].name, product[4].price, 2);

    //Check Nylon 12 Powder 6 kg
    cy.checkProductData(
      6,
      product[5].id,
      product[5].name,
      product[5].price,
      10
    );

    //Check Fuse Shift 120V
    cy.checkProductData(8, product[6].id, product[6].name, product[6].price, 2);

    //Step 3:Select Service plan
    //Go with default selected Fuse Shift 120V
    cy.log('Step 3:Select Service plan');

    cy.get('a[href="#/service/"]').click();

    var servicePlan = fuseMaxThroughputPackage.fuseAndShiftPremiumServicePlans;

    //Check Fuse and Sift Premium Service 1 Year plan
    cy.checkServicePlan(1, servicePlan[0].name, servicePlan[0].price);

    //Check Fuse and Sift Premium Service 2 Year plan
    cy.checkServicePlan(2, servicePlan[1].name, servicePlan[1].price);

    //Check Fuse and Sift Premium Service 3 Year plan
    cy.checkServicePlan(3, servicePlan[2].name, servicePlan[2].price);

    //Step back and deselect Fuse Shift 120V
    cy.get('a[href="#/customize/"]').click({ force: true });
    cy.get('span[class^="ProductOptionControl_title"]').eq(7).click();

    //Test service plans price for only fuse 1 selected
    cy.get('a[href="#/service/"]').click();
    var fuseServicePlan = fuseMaxThroughputPackage.fusePremiumServicePlans;
    var productCardPosition = 1;
    cy.get(fuseServicePlan).each((item, index) => {
      cy.checkServicePlan(
        productCardPosition,
        fuseServicePlan[index].name,
        fuseServicePlan[index].price
      );
      cy.log(item);
      productCardPosition++;
    });
  });
  it('Test Fuse 1 Build Your Own Package', () => {
    //Step 1: Select and go with Fuse 1 Maximum Throughput Package
    cy.get('span').contains('Fuse 1 Build Your Own Package').click();
    cy.get('a[href="#/customize/"]').click();

    //Step 2: Customise, Check default selected products and their prices

    //Check Fuse 1 Printer 120V
    var product = fuseBuildYourOwnPackage.defaultSelectedProducts;
    cy.checkProductData(1, product[0].id, product[0].name, product[0].price, 1);

    //Check Fuse 1 Build Chamber 120V
    cy.checkProductData(2, product[1].id, product[1].name, product[1].price, 1);

    //Step 3:Select Service plan
    //Test service plans price for only fuse 1 selected
    cy.get('a[href="#/service/"]').click();
    var fuseServicePlan = fuseBuildYourOwnPackage.fusePremiumServicePlans;
    var productCardPosition = 1;
    cy.get(fuseServicePlan).each((item, index) => {
      cy.checkServicePlan(
        productCardPosition,
        fuseServicePlan[index].name,
        fuseServicePlan[index].price
      );
      cy.log(item);
      productCardPosition++;
    });
  });
});
