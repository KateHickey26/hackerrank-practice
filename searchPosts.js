// Fetch posts from
// 👉 https://jsonplaceholder.typicode.com/posts
// Write a function that takes a search term (string) and returns an array of post titles that contain that term (case-insensitive).

async function searchPosts(searchTerm) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const jsonData = await response.json()
    return jsonData.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase())).map(post => post.title) 
}

searchPosts("qui").then(console.log)