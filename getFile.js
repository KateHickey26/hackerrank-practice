// get a file from an api endpoint and stream it with a try catch

import fetch from 'node-fetch';

export async function getFile(url, options) {
    try {
        const res = await fetch(url, options);
        if(!res.ok) { // catches 404s and 500s
            throw new Error('HTTP error ' + res.status);
        }
        return res.body;
    } catch (err) { // only throws on network errors, not 404 or 500
        console.error('Fetch failed:', err.message);
        throw err;
    }
}

getFile('', {})
    .then(console.log)
    .catch(console.error);