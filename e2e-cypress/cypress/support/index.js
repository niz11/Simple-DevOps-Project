// Import all available commands
import './commands';
import './search/search_commands'
import './shop/checkout_commands'
import './user/user_account_commands'
import './shop/package_configuration_flow'
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
