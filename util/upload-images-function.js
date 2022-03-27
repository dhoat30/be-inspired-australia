import axios from "axios";

async function uploadImages(url, formData, headers) {
    let response
    await fetch(url, {
        method: "POST",
        headers,
        body: formData
    }).then(res => res.json())
        .then(res => response = res)
        .catch(err => response = err)
    return response

}

export default uploadImages