window.onload = function() {
    let container = document.getElementsByClassName('container')[0],
        input = document.getElementById('input'),
        addElement = document.getElementById('add'),
        removeElement = document.getElementById('remove'),
        divList = document.getElementsByTagName('div'),
        deep = document.getElementById('dfs'),
        bread = document.getElementById('bfs'),
        activeElement = null,
        task = [];
    //添加监听事件
    addElement.addEventListener('click', () => {
        let value = input.value;
        if (value && activeElement) {
            let item = document.createElement('div');
            item.className = 'box';
            item.innerHTML = `<p>${value}</p>`;
            activeElement.appendChild(item);
        } 
    });
    removeElement.addEventListener('click', () => {
        if (activeElement) {
            activeElement.remove();
            activeElement = null;
        }
    });
    input.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            let value = input.value;
            if (value && activeElement) {
                let item = document.createElement('div');
                item.className = 'box';
                item.innerHTML = `<p>${value}</p>`;
                activeElement.appendChild(item);
            } 
        }
    });
    document.addEventListener('mouseup', (e) => {
        let target = e.target;
        if (target.nodeName === 'P') {
            let re = target.parentNode;
            if (re.classList.contains('active')) {
                re.classList.remove('active');
                activeElement = null;
            } else if (!re.classList.contains('active') && activeElement === null) {
                re.classList.add('active');
                activeElement = re;
            }
        } else if (target.nodeName === 'DIV') {
            if (target.classList.contains('active')) {
                target.classList.remove('active');
                activeElement = null;
            } else if (!target.classList.contains('active') && activeElement === null) {
                target.classList.add('active');
                activeElement = target;
            }
        }
    });
    deep.addEventListener('click', () => {
        task = [];
        dfs(container, task);
        display();
    });
    bread.addEventListener('click', () => {
        task = bfs(container);
        display();
    });
    //显示函数
    function display() {
        for (let i = 0, len = task.length; i < len; i++) {
            setTimeout(() => {
                task[i].classList.add('active');
            }, i * 300);
            setTimeout(() => {
                task[i].classList.remove('active');
            }, i * 300 + 300);
        }
    }
    
    //前序遍历
    function dfs(root, task) {
        task.push(root);
        let child = root.firstElementChild;
        while (child) {
            dfs(child, task);
            child = child.nextElementSibling;
        }
    }
    function bfs(root) {
        let queue = [], task = [];
        queue.push(root);
        task.push(root);
        let cur = null;
        while (queue.length > 0) {
            cur = queue[0];
            let child = queue[0].firstElementChild;
            while (child) {
                queue.push(child);
                task.push(child);
                child = child.nextElementSibling;
            }
            queue.shift();
        }
        return task;
    }
};