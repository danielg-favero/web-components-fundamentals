'use strict';

class BaseButton extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
    }

    render() {
        const template = document.createElement('template')
        const variant = this.getAttribute('variant')
        const onClick = this.getAttribute('onClick')
        const className = this.getAttribute('class')

        // Slots funcionam como childrens no HTML
        template.innerHTML = `
            <style>
                @import "./styles.css";
            </style>
            <button type="button" class="button ${className} variant-${variant || 'primary'}" onclick="${onClick && onClick + "()"}">
                <slot></slot>
            </button>
        `

        this.shadowRoot.appendChild(
            template.content.cloneNode(true)
        )
    }

    connectedCallback() {
        this.render()
    }
}

customElements.define('base-button', BaseButton)