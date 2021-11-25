import * as ajax from './ajax.js';

const url = 'https://run.mocky.io/v3/7788ab97-468e-4d1f-863f-01f905770d12'
ajax.get(url, onProductGet)

const itemsCards = document.querySelector(".page_content");

function onProductGet (responseText) {
  let data = JSON.parse(responseText);
  //console.log(data)
  showCard(data);
  // showSale(data);
}

function showCard (data) {
  itemsCards.innerHTML = ""
  data.forEach((item, index) => {
    itemsCards.innerHTML += `
      <li class="product_container">
        <img class="product_img" src=${item.img} alt="" />
        <h3 class="product_title">${item.name}</h3>
        <p>
          <span class="product_price-real">
            $${item.priceReal}
          </span> 
          <span class="product_price-offer">
            $${item.priceOffer}
          </span>
        </p>
        <button class="button_add-cart" data-id=${index+1}>Add</button>
        </li>
        `
      });
}

