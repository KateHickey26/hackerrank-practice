// given two arrays of objects, write a function that 
// merges them into a single array with no duplicate IDs

const arr1 = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}];
const arr2 = [{id: 2, name: "Bob"}, {id: 3, name: "Charlie"}, {id: 3, name: "Nicki"}];

function mergeAndDeduplicates(array1, array2) {
    const mergedArray = [...array1, ...array2]
    const uniqueArray = [] 
    const ids = new Set()

    mergedArray.forEach(item => {
        if (!ids.has(item.id)) {
            ids.add(item.id)
            uniqueArray.push(item)
        }
    })

    return uniqueArray
}

console.log(mergeAndDeduplicates(arr1, arr2))