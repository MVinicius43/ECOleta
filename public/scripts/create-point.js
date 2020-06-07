function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() } )
    .then( (states) => { 
        
        for ( const state of states ) {
             ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) => { return res.json() } )
    .then( (cities) => {

        for ( city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
         
        citySelect.disabled = false

    })
}

document.querySelector("select[name=uf]")
        .addEventListener("change", getCities)

// Ítens de coleta
// Pegar todos os li`s

const itensToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=itens]")

let selectedItens = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // add ou remover uma classe  com js
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verifica se existe itens selecionados, se sim pegar os itens selecionados
    const alreadySelected = selectedItens.findIndex( item => {
        const itemFound = item == itemId  // isso será true ou false
        return itemFound
    })

    // se já estiver selecionado
    if ( alreadySelected != -1 ) {
        // tirar da selecao
        const filteredItens = selectedItens.filter( item => {
            const itemIsDifferent = item != itemId  // false
            return itemIsDifferent
        })

        selectedItens = filteredItens
    } else {
        // se não estiver selecionado
        // add à selecao
        selectedItens.push(itemId)
    }

    //atualiza o campo escondido com os itens selecionados
    collectedItens.value = selectedItens
}