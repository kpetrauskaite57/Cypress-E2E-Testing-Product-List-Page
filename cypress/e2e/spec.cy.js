describe('Shopping Cart Functionality', () => {
  beforeEach(() => {
    // Visit the product list page
    cy.visit('https://qa-practice.netlify.app/products_list');
  });

  it('should add a product to the cart', () => {
    cy.get('.product').first().find('.btn.btn-primary.shop-item-button').click();
    cy.get('.cart-items').should('contain', '1 item');
  });

  it('should remove a product from the cart', () => {
    cy.get('.product').first().find('.btn.btn-primary.shop-item-button').click();
    cy.get('.cart').find('.btn.btn-danger').click();
    cy.get('.cart-items').should('contain', '0 items');
  });

  it('should update product quantity in the cart', () => {
    cy.get('.product').first().find('.btn.btn-primary.shop-item-button').click();
    cy.get('.cart').find('.quantity-input').clear().type('2');
    cy.get('.cart-total-price').should('contain', 'Total: $1811.98');
  });

  it('should remove cart contents after page refresh', () => {
    cy.get('.product').first().find('.add-to-cart-btn').click();
    cy.reload();
    cy.get('.cart-total-price').should('contain', '$0');
  });

  it('should initiate the checkout process', () => {
    cy.get('.product').first().find('.btn.btn-primary.shop-item-button').click();
    cy.get('.section-header').find('.btn.btn-primary.btn-purchase').click();
    cy.url(https://qa-practice.netlify.app/products_list).should('include', 'Congrats! Your order of $905.99 has been registered!');
  });
});
