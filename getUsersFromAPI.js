async function getUsersFromAPI() {
    try { 
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const jsonData = await response.json();
        if(!response.ok || !Array.isArray(jsonData)) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return jsonData
            .filter(user => user.email.toLowerCase().endsWith(".org"))
            .map(user => user.username);
    } catch (err) {
        console.error(err);
        return [];
    }

}

// getUsersFromAPI().then(console.log);
module.exports = { getUsersFromAPI };