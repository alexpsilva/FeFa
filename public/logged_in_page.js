const eventByTag = Object.freeze({
    form: 'submit',
    button: 'click',
})

function addEventListenerByDataAttribute(dataAttribute, callback) {
    document.querySelectorAll(`[${dataAttribute}]`).forEach(element => {
        const event = eventByTag[element.tagName]
        element.addEventListener(event, () => callback(element))
    })
}

window.onload = function() {
    addEventListenerByDataAttribute('data-redirect-to', element => {
        let targetUrl = element.getAttribute('data-redirect-to')
        if (element.tagName === 'FORM') {
            targetUrl = `${targetUrl}?${new URLSearchParams(new FormData(element)).toString()}`
        }

        window.location.href = targetUrl
    })
}