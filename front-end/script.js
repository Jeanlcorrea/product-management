const tbody = document.querySelector('tbody')
var produto = document.getElementById("produtoInput").value = ''


let itens
let id

function obterProduto() {

  var produto = document.getElementById("produtoInput").value;

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {

        var apiData = JSON.parse(xhr.responseText);

        insertItem(apiData);
      } else {

        var mensagemDeErro = "Ocorreu um erro na solicitação."; // Mensagem de erro padrão

        try {

          var erroDaAPI = JSON.parse(xhr.responseText);
          if (erroDaAPI.error) {
            mensagemDeErro = erroDaAPI.error;
          }
        } catch (e) {
          // Se não for possível analisar a resposta da API, mantenha a mensagem de erro padrão
        }

        alert(mensagemDeErro); 
      }
    }
  };

  xhr.open("GET", "http://127.0.0.1:8000/productmanagement/" + produto, true);

  xhr.send();

  var produto = document.getElementById("produtoInput").value = ''

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id += 1

}


function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(apiData, index) {
  let tr = document.createElement('tr')
 
  tr.innerHTML = `
    <td>${apiData.product_name}</td>
    <td>R$ ${apiData.price}</td>
    <td>${apiData.brand}</td>
    <td>${apiData.category}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
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
