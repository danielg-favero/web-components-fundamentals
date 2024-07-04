'use strict';

import { getAttributesListString } from "./getAttributesListString.js";

class IconButton extends HTMLElement {
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
            <base-button ${attributesString} class="icon">
                ${icon ? `<ion-icon name="${icon}"></ion-icon>` : ''}
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

customElements.define('icon-button', IconButton)