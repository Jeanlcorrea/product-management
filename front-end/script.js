const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sProduto = document.querySelector('#m-produto')
const sPreco = document.querySelector('#m-preco')
const sMarca = document.querySelector('#m-marca')
const sCategoria = document.querySelector('#m-categoria')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sProduto.value = itens[index].produto
    sPreco.value = itens[index].preco
    sMarca.value = itens[index].marca
    sCategoria.value = itens[index].categoria
    id = index
  } else {
    sProduto.value = ''
    sPreco.value = ''
    sMarca.value = ''
    sCategoria.value = ''
  }

}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.produto}</td>
    <td>R$ ${item.preco}</td>
    <td>${item.marca}</td>
    <td>${item.categoria}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {

  if (sProduto.value == '' || sPreco.value == '' || sMarca.value == '' || sCategoria == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].produto = sProduto.value
    itens[id].preco = sPreco.value
    itens[id].marca = sMarca.value
    itens[id].categoria = sCategoria.value
  } else {
    itens.push({'produto': sProduto.value, 'preco': sPreco.value, 'marca': sMarca.value, 'categoria': sCategoria.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()

// TESTANDO API

const apiUrl = `http://127.0.0.1:8000`;
const productName = 'alvejante'

const formData = new FormData();
formData.append('product_name', productName);


const url = `${apiUrl}/productmanagement/product?${formData}`;

fetch(url, {
  method: 'GET',
  headers: {

  },
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }
    return response.json();
  })
  .then(productData => {

    console.log('Dados do produto:', productData);
  })
  .catch(error => {
    console.error(error);
  });