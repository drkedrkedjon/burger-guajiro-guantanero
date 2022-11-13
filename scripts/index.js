import {menuArray as dataArray} from './data.js'
const ticketArray = []
let descuento = false

document.addEventListener('click', function(e) {
  if(e.target.dataset.agregarticket) {
    agregarProducto(e.target.dataset.agregarticket)
  }
  if(e.target.dataset.btnremover) {
    ticketArray.length > 0 && removerProducto(e.target.dataset.btnremover)
  }

})
function removerProducto(uuidProducto) {
  const indice = ticketArray.findIndex( producto => producto.id === uuidProducto )
  ticketArray.splice(indice, 1)
  renderTicket()
}
function agregarProducto(uuidProducto) {
  ticketArray.push(dataArray.find( producto => producto.id === uuidProducto ))
  renderTicket()
}
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
        <button data-agregarticket="${product.id}" class="add-btn">+</button>
      </div>
    `
  });
  return html
}
function getTicketHtml(data) {
  const ticketActual = {
    precio: 0,
    tipoProducto: [],
    cantidadDescuento: 0,
    precioTotal: 0
  }
  let listadoHtml = ''

  ticketArray.forEach( producto => {
    ticketActual.precio += producto.price
    ticketActual.tipoProducto.push(producto.type)
    if( 
      ticketActual.tipoProducto.some( tipo => tipo === 'food') &&
      ticketActual.tipoProducto.some( tipo => tipo ===  'drink') 
      ) {
      descuento = true
      ticketActual.cantidadDescuento = (ticketActual.precio / 100 * 10).toFixed(2)
      ticketActual.precioTotal = ticketActual.precio - ticketActual.cantidadDescuento
    } else {
      descuento = false
      ticketActual.precioTotal = ticketActual.precio
    }

    listadoHtml += `
    <div class="producto-unico">
      <h3>${producto.name}</h3>
      <button data-btnremover="${producto.id}" class="btn-quitar">Remover</button>
      <p>${producto.price}</p>
    </div>
    `
  } )
  const html = `
  <h3>Su pedido</h3>
  
    <div id="producto-listado">
    ${listadoHtml}
    </div>  
    <div class="totales">
      <div class="totales-elemeto">
        <h3>Precio:</h3>
        <p>${ticketActual.precio}</p>
      </div>
      <div class="totales-elemeto">
        <p id="des-disponibe" class="no-disponible">Descuento combo: <span>10%</span></p>
        <p>${ticketActual.cantidadDescuento}</p>
      </div>
      <div class="totales-elemeto">
        <h3>Precio total:</h3>
        <p>${ticketActual.precioTotal}</p>
      </div>
      <button class="btn-pedido">Completar pedido</button>
  </div>
  `
  return html
}
function renderProductos() {
  document.querySelector("#productos").innerHTML = getProductosHTML(dataArray)
}
function renderTicket() {
  
  document.querySelector('#ticket').innerHTML = getTicketHtml(ticketArray)
  const descuentoParafo = document.querySelector('#des-disponibe')
  if (descuento) {
    descuentoParafo.classList.remove('no-disponible')
  } else if (!descuento) {
    descuentoParafo.classList.add('no-disponible')
  }
}
renderProductos()