let container = document.getElementsByClassName('container')[0],
    list = document.getElementsByClassName('list')[0],
    mousedown = false,
    containerBox = container.getBoundingClientRect(),
    mouse = {};
container.addEventListener('mousedown', (e) => {
    let target = e.target,
        parent = target.parentNode.parentNode;
    console.log(parent);
    if (target.className === 'display-container') {
        mousedown = true;
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    } else if (target.className === 'top') {
        let f = list.firstElementChild;
        list.insertBefore(parent, f);
        parent.firstElementChild.style.right = '0';        
    } else if (target.className === 'remove') {
        list.removeChild(parent);
    }
});
container.addEventListener('mousemove', (e) => {
    const target = e.target,
        x = e.pageX,
        y = e.pageY,
        p = target.parentNode,
        result = p.getBoundingClientRect().right - containerBox.right;
    if (mousedown) {
        if (result >= 0 && result <= 200) {
            let r = document.defaultView.getComputedStyle(p, null).right;
            p.style.right = parseInt(r) + mouse.x - x + 'px';
        }
    }
    mouse.x = x, mouse.y = y;
    e.preventDefault();
});
container.addEventListener('mouseup', (e) => {
    if (e.target.className === 'display-container') {
        const target = e.target,
            p = target.parentNode,
            result = p.getBoundingClientRect().right - containerBox.right;
        p.classList.add('translate');
        setTimeout(() => {
            p.classList.remove('translate');
        }, 100);
        if (result >= 100) {
            p.style.right = '0';
        } else {
            p.style.right = '200px';
        }
    }
    mousedown = false;
});
container.addEventListener('mouseout', (e) => {
    if (e.target.className === 'display-container') {
        const target = e.target,
            p = target.parentNode,
            result = p.getBoundingClientRect().right - containerBox.right;
        p.classList.add('translate');
        setTimeout(() => {
            p.classList.remove('translate');
        }, 100);
        if (result >= 100) {
            p.style.right = '0';
        } else {
            p.style.right = '200px';
        }
    }
    mousedown = false;
});