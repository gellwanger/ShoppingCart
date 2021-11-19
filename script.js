const newList = document.querySelector('ol');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  event.target.remove();
  shopCartSave.forEach((element, index) => {
    if (element.sku === sku) shopCartSave.splice(index, 1);
  });
  saveCartItems(JSON.stringify(shopCartSave));
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener); 
  // li.addEventListener('click', (event) => event.target.remove())
  
  return li;
}

function createProductItemElement(productItem) {
  const { sku, name, image } = productItem;
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', async () => {
    const fetchItemSaved = await fetchItem(sku);
    const liCartItem = createCartItemElement(fetchItemSaved);
    newList.appendChild(liCartItem);
    saveCartItems(JSON.stringify(shopCartSave));
  });
  
  section.appendChild(button);
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

async function searchProducts(product) {
  const searchData = await fetchProducts(product);
  const sectionItems = document.querySelector('.items');
  searchData.results.forEach((item) => {
    const itemObject = {
    sku: item.id,
    name: item.title,
    image: item.thumbnail,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
  document.querySelector('.loading').remove();
  return li;
}

const btnClear = document.querySelector('.empty-cart');
btnClear.addEventListener('click', () => {
  document.querySelector('.total-price').innerHTML = 90;
    newList.innerHTML = '';
    saveCartItems('');
});

window.onload = () => { 
  searchProducts('computador');
};