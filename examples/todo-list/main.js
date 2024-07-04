'use strict';

class TodoList extends HTMLElement {
    constructor(){
        // Sempre chamar super() no início do construtor
        super()

        const shadow = this.attachShadow({ mode: 'open' })
        const container = document.createElement('div')

        container.innerHTML = `
            <h3>${this.title}</h3>
            <ul id="list">
                ${this.items.map(item => `
                    <li>
                        ${item}
                        <button class="remove-item-button">&ominus;</button>
                    </li>    
                `)}
            </ul>
            <div>
                <label for="add-new-item-input">Adicionar</label>
                <input id="add-new-item-input" type="text">
                <button id="add-new-item-button">&oplus;</button>
            </div>
        `

        this.addItem = this.addItem.bind(this)
        this.removeItem = this.removeItem.bind(this)

        shadow.appendChild(container)
    }

    addItem(e) {
        const input = this.shadowRoot.querySelector('#add-new-item-input')
        const list = this.shadowRoot.querySelector('#list')

        if(!input.value) return

        const item = document.createElement('li')
        const removeItemButton = document.createElement('button')
        const childrenLength = list.children.length

        item.textContent = input.value
        removeItemButton.setAttribute('class', 'remove-item-button')
        removeItemButton.innerHTML = '&ominus;'

        this.handleRemoveItemListeners([removeItemButton])
        
        list.appendChild(item)
        list.children[childrenLength].appendChild(removeItemButton)

        input.value = ''
    }

    removeItem(e) {
        e.target.parentNode.remove()
    }

    // Retornar o valor do atributo título
    get title() {
        return this.getAttribute('title') || '';
    }

    // Retornar a lista de items
    get items() {
        const items = []

        // Os items da lista são definidos como atributos na tag
        for (let attribute of this.attributes) {
            if (attribute.name.includes('item')) {
                items.push(attribute.value)
            }
        }

        return items
    }

    handleRemoveItemListeners(elements) {
        elements.forEach(element => {
          element.addEventListener('click', this.removeItem, false);
        });
    }
  

    // É chamado toda vez que esse elemento é adicionado ao documento
    connectedCallback() {
        console.log("Custom element added to page.");

        // Inicializar os botões de remover items
        const removeElementButtons = [...this.shadowRoot.querySelectorAll('.remove-item-button')];
        const addElementButton = this.shadowRoot.querySelector('#add-new-item-button');
        
        this.handleRemoveItemListeners(removeElementButtons)
        addElementButton.addEventListener('click', this.addItem, false)
    }

    // É chamado toda vez que esse elemento é removido do documento
    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    // É chamado toda vez que esse elemento é movido para um novo documento
    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    // É chamado toda vez que os atributos desse elemento são adicionados, removidos ou trocados
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}.`);
    }
}

customElements.define('todo-list', TodoList)
