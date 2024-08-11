describe('Shopping Cart Functionality', () => {
  beforeEach(() => {
    // Visit the product list page
    cy.visit('https://qa-practice.netlify.app/products_list');
  });

  it('Displays the shopping cart', () => {
    cy.get("section-header").should("be.visible");
});

it('Displays the purchase button', () => {
  cy.get("btn.btn-primary.btn-purchase").should("be.visible");
});

it('Displays the product list', () => {
  cy.get('.shop-item-title').should('be.visible');
});

  it('Displays the product price', () => {
    cy.get('.shop-item-price').should('be.visible');
  });

  it('Displays the add to cart button', () => {
    cy.get('.shop-item-button').should('be.visible');
  });

  it('should add a product to the cart', () => {
    cy.get('.shop-item-title').first().find('.shop-item-button').click();
    cy.get('.cart-total-price').should('contain', '$236.12');
  });

  it('should remove a product from the cart', () => {
    cy.get('.cart-items').first().find('.btn-danger').click();
    cy.get('.cart-total-price').should('contain', '$0');
  });

  it('should update product quantity in the cart', () => {
    cy.get('.shop-item-title').first().find('.shop-item-button').click();
    cy.get('.cart-total-price').should('contain', '$236.12');
    cy.get('.cart-quantity-input').first().clear().type('2');
    cy.get('.cart-total-price').should('contain', '$472.24');
  });


  it('should initiate the checkout process', () => {
    cy.get('.product').first().find('.btn.btn-primary.shop-item-button').click();
    cy.get('.section-header').find('.btn.btn-primary.btn-purchase').click();
    cy.url('https://qa-practice.netlify.app/products_list').should('include', 'Congrats! Your order of $905.99 has been registered!');
  });
});
