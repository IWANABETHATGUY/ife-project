let canvas = document.getElementById('canvas'),
    ele = document.getElementById('selector'),
    ctx = canvas.getContext('2d'),
    img = new Image(),
    isSelect = false,
    selectBounding = {};
    // drawImage(ctx, './image/2.jpg');
    //添加事件函数
canvas.addEventListener('mousedown', (e) => {
    if (isSelect) {
        initRect();
    }
    ele.style.display = 'inline';
    isSelect = true;
    selectBounding.x1 = e.clientX;
    selectBounding.y1 = e.clientY;
        
});
canvas.addEventListener('mouseup', (e) => {
    canvas.style.cursor = 'default';
    isSelect = false;
});
canvas.addEventListener('mousemove', (e) => {
    e.preventDefault();
    if (isSelect) {
        
        selectBounding.x2 = e.clientX;
        selectBounding.y2 = e.clientY;
        let x = selectBounding.x1 > selectBounding.x2 ? selectBounding.x2 : selectBounding.x1,
            y = selectBounding.y1 > selectBounding.y2 ? selectBounding.y2 : selectBounding.y1,
            w = Math.abs(selectBounding.x1 - selectBounding.x2),
            h = Math.abs(selectBounding.y1 - selectBounding.y2);
        drawRect( x, y, w, h);
    }
});
//声明函数
function drawImage(ctx, src) {
    img.src = src;
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}
function initRect() {
    ele.style.width = 0;
    ele.style.height = 0;
}
function drawRect(x, y, w, h) {  
    ele.style.left = x + 'px';
    ele.style.top = y + 'px';
    ele.style.width = w + 'px';
    ele.style.height = h + 'px';
}