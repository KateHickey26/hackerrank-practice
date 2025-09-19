// Fetch all users from
// 👉 https://jsonplaceholder.typicode.com/users
// Return an array of usernames where the email ends with .org.

async function getOrgUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const jsonData = await response.json()

    return jsonData.filter(user => user.email.endsWith(".org")).map(user => user.username)
}

getOrgUsers().then(console.log)