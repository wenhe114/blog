export function showImg(src) {
    
    const maskEl=document.createElement("div")
    maskEl.style="top:0;left:0;bottom:0px;left:0px;position: fixed; background:rgba(20,20,20,0.65);";
    maskEl.classList.add("mask")
    const newImgEL=document.createElement("img")
    newImgEL.style="transform: translateY(-50%) translateX(-50%) scale(0.9);transition: 1s;max-width:100%;position:absolute;top: 50%;z-index: 11111;min-width:50%;left:50%;cursor: zoom-out;"
    newImgEL.src=src
    console.log(maskEl);
    maskEl.onclick=function () {
        closeImg(maskEl)
    }
    maskEl.append(newImgEL)
    document.body.append(maskEl)
}

export function closeImg(maskEl) {
    console.log(maskEl);
    document.body.removeChild(maskEl)
}