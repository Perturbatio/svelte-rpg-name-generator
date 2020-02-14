function dispatchChange(node){
    node.dispatchEvent(new Event( 'input' ));

}
export default function(node) {
    const check = (e) => {
        let target = e.target
        let inputValue = (target.value !== '') ? parseInt( target.value ) : null
        let inputMin = (target.min !== '') ? parseInt( target.min ) : null
        let inputMax = (target.max !== '') ? parseInt( target.max ) : null

        if (inputMax !== null && inputValue > inputMax) {
            target.value = target.value.substr(0,target.value.length-1)
            dispatchChange(node)
        } else if (inputValue === null || (inputMin !== null && inputValue < inputMin)) {
            target.value = inputMin
            dispatchChange(node)
        }
    }
    node.addEventListener( 'input', check )

    return {
        destroy() {
            node.removeEventListener( 'input', check )
        },
    }
}