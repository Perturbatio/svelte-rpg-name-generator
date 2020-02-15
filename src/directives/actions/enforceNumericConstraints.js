/**
 * Svelte listens to the 'input' event for value changes
 * so we fire the event ourselves if we've overridden the element value
 *
 * @param node {Element}
 */
function fireChange(node){
    node.dispatchEvent(new Event( 'input' ));
}

/**
 * Ensure that the number input doesn't
 * contain a value outside of the constraints
 *
 * @param node {Element}
 * @returns {{destroy(): void}}
 */
export default function(node) {
    const check = ({target}) => {
        let inputValue = (target.value !== '') ? parseInt( target.value ) : null
        let inputMin = (target.min !== '') ? parseInt( target.min ) : null
        let inputMax = (target.max !== '') ? parseInt( target.max ) : null

        if (inputMax !== null && inputValue > inputMax) {
            // if the value is greater than the max, it probably means the user typed it,
            // in which case, just trim the last character off  i.e. undo the last typed character
            target.value = target.value.substr(0,target.value.length-1)
            fireChange(node)
        } else if (inputValue === null || (inputMin !== null && inputValue < inputMin)) {
            target.value = inputMin
            fireChange(node)
        }
    }

    node.addEventListener( 'input', check )

    return {
        destroy() {
            node.removeEventListener( 'input', check )
        },
    }
}