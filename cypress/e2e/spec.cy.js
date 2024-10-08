describe('Shopping Cart Functionality', () => {
  beforeEach(() => {
    cy.visit('https://qa-practice.netlify.app/products_list');
  });

  it('Displays the shopping cart', () => {
    cy.get(".cart-row").should("be.visible");
  });

  it('Displays the purchase button', () => {
    cy.get(".btn.btn-primary.btn-purchase").should("be.visible");
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
    cy.get('.shop-item').first().find('.shop-item-button').click();
    cy.get('.cart-items .cart-row').should('have.length', 1);
    cy.get('.cart-total-price').should('not.contain', '$0');
  });
  
  it('should allow adding multiple units of the same product', () => {
    cy.get('.shop-item').first().find('.shop-item-button').click();
    cy.get('.cart-quantity-input').first().clear().type('2');
    cy.get('.cart-total-price').invoke('text').then((total) => {
      expect(parseFloat(total.replace('$', ''))).to.be.greaterThan(0);
    });
  });

    it('should remove a product from the cart', () => {
    cy.get('.shop-item').first().find('.shop-item-button').click();
    cy.get('.cart-items .cart-row').should('have.length', 1);
    cy.get('.cart-items .cart-row').first().find('.btn-danger').click();
    cy.get('.cart-items .cart-row').should('have.length', 0);
    cy.get('.cart-total-price').should('contain', '$0');
  });
  
  it('should prevent negative or zero quantity', () => {
    cy.get('.shop-item').first().find('.shop-item-button').click();
    cy.get('.cart-quantity-input').first().clear().type('0').type('{enter}');
    cy.get('.cart-quantity-input').should('have.value', '1');  
    cy.get('.cart-quantity-input').first().clear().type('-1').type('{enter}');
    cy.get('.cart-quantity-input').should('have.value', '1');  
  });
  
  it('should update product quantity in the cart', () => {
    cy.get('.shop-item').first().find('.shop-item-button').click();
    cy.get('.cart-quantity-input').first().clear().type('2').type('{enter}');
    cy.get('.cart-total-price').invoke('text').then((total) => {
      const firstTotal = parseFloat(total.replace('$', ''));
      cy.get('.cart-quantity-input').first().clear().type('3').type('{enter}');
      cy.get('.cart-total-price').invoke('text').then((newTotal) => {
        const updatedTotal = parseFloat(newTotal.replace('$', ''));
        expect(updatedTotal).to.be.greaterThan(firstTotal);
        expect(updatedTotal).to.not.equal(firstTotal);
      });
    });
  });
  it('should initiate the checkout process', () => {
    cy.get('.content-section').find('.shop-item-button').first().click();
    cy.get('.btn-purchase').click();
    cy.get('#message').should('contain', 'Congrats! Your order');  // Wait for confirmation message
    cy.get('#back_to_prods_list').click();
    cy.get('.cart-items .cart-row').should('have.length', 0);
  });
  
  it('should handle checkout process after a second purchase attempt', () => {
    cy.get('.content-section').find('.shop-item-button').first().click();
    cy.get('.btn-purchase').click();
    cy.get('#back_to_prods_list').click();
    cy.get('.cart-total-price').should('contain', '$0');
    cy.get('.content-section').find('.shop-item-button').first().click();
    cy.get('.btn-purchase').click();
    cy.get('#message').should('contain', 'Congrats! Your order of');
  });
})