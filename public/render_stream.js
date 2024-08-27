const contentSource = document.getElementById('content-source')

function copyToTarget (node) {
    const contentTargetId = node.getAttribute('stream-to')
    const contentTarget = document.getElementById(contentTargetId)
    if (!contentTarget) {
        console.error(`Target not found: ${contentTargetId}`)
        return
    }

    contentSource.removeChild(node)
    contentTarget.appendChild(node)
}

function watchAddedChildren (mutationList) {
    for (const mutation of mutationList) {
        if (mutation.type !== "childList") {
            continue
        }

        for (const node of mutation.addedNodes) {
            copyToTarget(node)
        }
    }
}

const observer = new MutationObserver(watchAddedChildren)
observer.observe(contentSource, {childList: true })

window.addEventListener('load', () => {
    observer.disconnect()
})