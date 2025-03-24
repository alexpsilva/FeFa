window.onload = function(){
    document.body.addEventListener("showToast", function(event){
        if(event.detail.type === "success"){
            console.log(`Success: ${event.detail.message}`);
        } else {
            console.log(`Normal: ${event.detail.message}`);
        }
    })
}

window.addEventListener("showToast", function(event){
    if(event.detail.type === "success"){
        console.log(`Success: ${event.detail.message}`);
    } else {
        console.log(`Normal: ${event.detail.message}`);
    }
})