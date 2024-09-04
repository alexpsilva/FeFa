const contentSource = document.getElementById('content-source')

function removeAllChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild)
    }
}

function copyToTarget (node) {
    const contentTargetId = node.getAttribute('data-stream-to')
    const contentTarget = document.getElementById(contentTargetId)
    if (!contentTarget) {
        console.error(`Target not found: ${contentTargetId}`)
        return
    }

    // Clear the target before copying
    while (contentTarget.firstChild) {
        contentTarget.removeChild(contentTarget.firstChild)
    }

    // Copy each element from the source to the target
    while (node.firstChild) {
        contentTarget.parentNode.insertBefore(node.firstChild, contentTarget)
    }

    // Clean up wrappers
    contentTarget.parentNode.removeChild(contentTarget)
    contentSource.removeChild(node)
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