class rangeInput {
    constructor(selector, options = {}) {
        this.container = document.querySelector(selector);
        if (!this.container) {
            this.container = document;
        }
        this.direction = options.direction || 'horizontal';
        this.value = options.initValue || 0;
        this.length = options.length ||
            (this.direction === 'horizontal' ? this.container.offsetWidth 
                : this.container.offsetHeight);
        this.step = options.step || '';
        this.maxValue = options.maxValue || 100;
        this.minValue = options.minValue || 0;
        if (this.minValue >= this.maxValue) {
            this.maxValue = 100;
            this.minValue = 0;
        }
        if (this.value > this.maxValue) {
            this.value = this.maxValue;
        }
        this.init();
        this.initParam();
        this.initEvent();
        this.container.appendChild(this.box);
    }
    init() {
        this.box = this.createItem('div', 'range-container');
        this.label = this.createItem('div', 'range-label');
        this.rangeInput = this.createItem('input', null, 'range', this.minValue, this.maxValue);
        this.box.appendChild(this.label);
        this.box.appendChild(this.rangeInput);
    }
    initEvent() {
        this.rangeInput.addEventListener('mousedown', (e) => {
            let target = e.target,
                value = target.value;
            target.classList.add('active');
            this.label.style.left = value / (this.maxValue - this.minValue) * (this.length - 15) - 2 + 'px';
            this.label.innerText = target.value;
            this.label.classList.add('active');
        });
        this.rangeInput.addEventListener('input', (e) => {
            let value = e.target.value;
            this.label.style.left = value / (this.maxValue - this.minValue) * (this.length - 15) - 2 + 'px';
            this.label.innerText = value;
        });
        this.rangeInput.addEventListener('mouseup', (e) => {
            e.target.classList.remove('active');
            this.label.classList.remove('active');
        });
    }
    initParam() {
        this.box.style.width = parseInt(this.length) + 'px';
        this.box.style.transform = this.direction === 'horizontal' ? '' : 'rotate(-90deg)';
        this.box.style.bottom = this.direction === 'horizontal' ? '' : '-10px';
        this.label.style.writingMode = this.direction === 'horizontal' ? '' : 'vertical-lr';
        this.container.style.position = 'relative';
        this.rangeInput.value = this.value;
        this.rangeInput.step = this.step;
    }
    createItem(tag, className, type, minValue, maxValue) {
        let item = document.createElement(tag);
        if (className) {
            item.className = className;
        }
        if (type) {
            item.setAttribute('type', type);
        }
        if (minValue) {
            item.setAttribute('min', minValue);
        }
        if (maxValue) {
            item.setAttribute('max', maxValue);
        }
        return item;
    }
    remove() {
        this.container.removeChild(this.box);
    }
}