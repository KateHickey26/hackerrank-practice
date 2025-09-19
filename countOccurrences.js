// Given an input string e.g. 
// "the quick brown fox jumps over the lazy dog the quick fox"
// return an object with the count of each word e.g.
// {
//   the: 3,
//   quick: 2,
//   brown: 1,
//   fox: 2,
//   jumps: 1,
//   over: 1,
//   lazy: 1,
//   dog: 1
// }
// objects are unsorted so the order of the keys doesn't matter

async function countWordOccurences(inputPhrase) {
    const words = inputPhrase.split(" " )
    const wordCount = {}
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1
    })
    return wordCount
}

countWordOccurences("hello there the angel from my nightmare hello there and hello again angel").then(console.log)