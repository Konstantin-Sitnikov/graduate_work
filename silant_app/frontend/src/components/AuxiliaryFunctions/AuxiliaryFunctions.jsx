
export function getDataReferenceBooks(id, array) {
    if (array) {
        for (let item of array) {
            if (item.id === id) {
                if ("model" in item) {return item.model} 
                if ("username" in item) {return item.username}
                if ("name" in item) {return item.name }
        }}}
    }
    