import {url} from "../js/constants.js"


export async function apiCall(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result
}

