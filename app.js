let treshold = window.innerWidth / 4
console.log(`Swipe treshold: ${treshold}px`);

document.querySelectorAll(".swipable").forEach((swipableItem, index) => {
    let touchstartX = 0
    let touchendX = 0
    let diff = 0;


    swipableItem.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX
        swipableItem.style.transition = "all 0s"
        // console.log(touchstartX);
    })
    swipableItem.addEventListener('touchmove', e => {
        // slider.
        // console.log(e.touches[0].screenX);
        diff = e.touches[0].screenX - touchstartX;
        // console.log(diff);
        swipableItem.style.transform = `translateX(${diff}px)`

    })

    swipableItem.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX
        swipableItem.style.transition = "all .5s"

        handleGesture(index)


    })
    function handleGesture(index) {
        let swipePath = "";
        if (touchendX < touchstartX) swipePath = "left";
        if (touchendX > touchstartX) swipePath = "right";

        if ((diff > treshold) || (diff < -treshold)) {
            console.log(`Item ${index}: Swiped ${swipePath}`)
            swipableItem.style.transition = "all .3s"
            if (swipePath == "left") {
                swipableItem.style.transform = `translateX(-${window.innerWidth}px)`
            } else {
                swipableItem.style.transform = `translateX(${window.innerWidth}px)`
            }
            setInterval(() => {
                swipableItem.style.height = "0px";
                swipableItem.style.padding = "0px";
                swipableItem.style.margin = "0px";
                setInterval(() => {
                    swipableItem.remove();
                }, 500);
            }, 500)
        } else {
            swipableItem.style.transform = `translateX(0px)`
        }
    }
})



