// VARIABLES
let allContainerCart = document.querySelector('.page_content');
let containerBuyCart = document.querySelector('.card-items');
let priceTotalBuy = document.querySelector('.price-total');
let countProductsCart = document.querySelector('.count-product');
let buyProducts = [];
let totalCart = 0;
let countProduct = 0;

// FUNCTIONS
loadEventListeners();
function loadEventListeners() {
  allContainerCart.addEventListener('click', addProduct);
  containerBuyCart.addEventListener('click', deleteProductCart);
}

function addProduct(e) {
  e.preventDefault();
  if (e.target.classList.contains('button_add-cart')) {
    const selectProduct = e.target.parentElement
    readTheContent(selectProduct);
  }
}

function deleteProductCart (e) {
  if (e.target.classList.contains('delete-product')) {
    const deleteIdProduct = e.target.getAttribute('data-id');

    buyProducts.forEach(value => {
      if (value.idProduct == deleteIdProduct) {
          let priceReduce = parseFloat(value.priceOfferProduct) * parseFloat(value.amount);
          totalCart =  totalCart - priceReduce;
          totalCart = totalCart.toFixed(2);
      }
  });

    buyProducts = buyProducts.filter( item => item.idProduct !== deleteIdProduct);
    countProduct--;
  }
  loadHtmlCart();
}

function readTheContent(product) {
  const prodReal = product.querySelector('.product_price-real').textContent.trim().split('$')[1];
  const prodOffer = product.querySelector('.product_price-offer').textContent.trim().split('$')[1];
  const infoProduct = {
    imageProduct: product.querySelector('.product_img').src,
    titleProduct: product.querySelector('.product_title').textContent, 
    priceRealProduct: prodReal,
    priceOfferProduct: prodOffer,
    idProduct: product.querySelector('.button_add-cart').getAttribute('data-id'),
    amount: 1
  };
  totalCart = parseFloat(totalCart) + parseFloat(infoProduct.priceOfferProduct);
  totalCart = totalCart.toFixed(2);

  const existProdInCart = buyProducts.some(product => product.idProduct === infoProduct.idProduct);
    if (existProdInCart) {
        const productArray = buyProducts.map(product => {
            if (product.idProduct === infoProduct.idProduct) {
                product.amount++;
                return product;
            } else {
                return product;
              }
            });
            buyProducts = [...productArray];
          } else {
            buyProducts = [...buyProducts, infoProduct]
            countProduct ++;
    }

  loadHtmlCart();
}

function loadHtmlCart () {
  clearHtmlCart()
  buyProducts.forEach( product => {
    const { imageProduct, titleProduct, priceRealProduct, priceOfferProduct, idProduct, amount } = product;
    const row = document.createElement('div');
    row.classList.add('item');
    row.innerHTML += `
      <img src=${imageProduct} alt=${titleProduct}>
      <div class="item-content">
        <h5>${titleProduct}</h5>
        <h5 class="cart-price">${priceOfferProduct}</h5>
        <h6>Quantity: ${amount}</h6>
      </div>
      <span class="delete-product" data-id=${idProduct}>X</span>
    `;
    containerBuyCart.appendChild(row);
  });
  priceTotalBuy.innerHTML = totalCart;
  countProductsCart.innerHTML = countProduct;
}

function clearHtmlCart () {
  containerBuyCart.innerHTML = "";
}