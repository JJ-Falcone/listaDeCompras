let listaDeItens = [] 
let itemAEditar

const form = document.getElementById('form-itens')
const formInput = document.getElementById('receber-item')
const ulItens = document.getElementById('lista-de-itens')
const ulItensComprados = document.getElementById('itens-comprados')
const listaRecuperada = localStorage.getItem('listaDeItens')

function atualizaLocalStorage() {
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens))
}

if(listaRecuperada) {
    listaDeItens = JSON.parse(listaRecuperada)
    mostrarItens()
}

form.addEventListener('submit', function (evento) {
    evento.preventDefault()
    salvarItem()
    mostrarItens()
    formInput.focus()
})

function salvarItem() {
    const comprasItem = formInput.value
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toLowerCase() === comprasItem.toLowerCase())

    if(checarDuplicado){
        console.log('Item já adicionado anteriormente');
    } else{
        listaDeItens.push({
            valor: comprasItem,
            checar: false
        })
    }
    
    formInput.value = ''
}

function mostrarItens () {
    ulItens.innerHTML = ''
    ulItensComprados.innerHTML = ''

    listaDeItens.forEach((elemento, index) =>{

        if(elemento.checar){
           ulItensComprados.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" checked class="is-clickable" />  
                        <span class="itens-comprados is-size-5">${elemento.valor}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>`
        } else{

            ulItens.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" class="is-clickable" />
                        <input type="text" class="is-size-5" value="${elemento.valor}" disabled></input>
                    </div>
                    <div>
                        ${index === Number(itemAEditar) ?'<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>`
            }
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    inputsCheck.forEach((input) => {
        input.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentNode.parentNode.getAttribute('data-value');
            listaDeItens[valorDoElemento].checar = evento.target.checked
            mostrarItens()
        })
    })

    const deletarObjeto = document.querySelectorAll('.deletar')

    deletarObjeto.forEach((input) => {
        input.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentNode.parentNode.getAttribute('data-value');
            listaDeItens.splice(valorDoElemento, 1)
            mostrarItens()
        })
    })

    const editarItens = document.querySelectorAll('.editar')

    editarItens.forEach((input) => {
        input.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentNode.parentNode.getAttribute('data-value');
            mostrarItens()
            document.querySelector(`[data-value='${itemAEditar}'] input[type="text"]`).removeAttribute('disabled')
            document.querySelector(`[data-value='${itemAEditar}'] input[type="text"]`).focus()
        })
    })

    atualizaLocalStorage()

}

function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value='${itemAEditar}'] input[type="text"]`) 
    listaDeItens[itemAEditar].valor = itemEditado.value
    itemAEditar = -1
    mostrarItens()
    
} 