import {menuArray as dataArray} from './data.js'


function getProductosHTML(data) {
  let html = ''
  data.forEach(product => {
    let ingedientesHTML = 'Sasa'
    product.ingredients.forEach( ingr => {
      ingedientesHTML += `${ingr}, `
    })


    html += `
      <div class="product">
        <p class="emoji">${product.emoji}</p>
        <div>
          <h3>${product.name}</h3>
          <p>${ingedientesHTML}</p>
          <p class="precio">${product.price}€</p>  
        </div>
        <button class="add-btn">+</button>
      </div>
    `
  });
  return html
}

function render() {
  document.querySelector("#productos").innerHTML = getProductosHTML(dataArray)
}
 
render()