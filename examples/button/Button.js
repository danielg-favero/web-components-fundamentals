'use strict';

import { getAttributesListString } from './getAttributesListString.js';

class Button extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
    }

    render() {
        const template = document.createElement('template')
        const icon = this.getAttribute('icon')
        const attributesString = getAttributesListString(this.attributes)

        // Slots funcionam como childrens no HTML
        template.innerHTML = `
            <base-button ${attributesString}>
                ${icon ? `<ion-icon name="${icon}"></ion-icon>` : ''}
                <span class="label">
                    <slot></slot>
                </span>
            </base-button>
        `

        this.shadowRoot.appendChild(
            template.content.cloneNode(true)
        )
    }

    connectedCallback() {
        this.render()
    }
}

customElements.define('custom-button', Button)