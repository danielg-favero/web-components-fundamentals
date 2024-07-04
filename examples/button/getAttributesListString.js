export function getAttributesListString(attributes) {
    let attributesString = ""
    
    for(let i = 0; i < attributes.length; i++) {
        attributesString += attributes[i].localName + "='" + attributes[i].value + "' " 
    }

    return attributesString
}