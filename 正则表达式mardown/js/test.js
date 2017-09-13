/**函数声明 */

let debounce = function(fn, wait) {
    let time;
    return function() {
        clearTimeout(time);
        time = setTimeout(fn, wait);
    };
};
let handler = debounce(function() {  // 输入防抖函数
    let source = textarea.value,
        result = '';
    result = source.split(/\n/);
    for (let i = 0, len = result.length; i < len; i++) {
        if (blockquotesTest.test(result[i])) {
            let j = i + 1;
            while (j < len && blockquotes.test(result[j])) {
                j++;
            }
            let item = result.splice(i, j - i);
            for (let k = 1, len = item.length; k < len; k++) {
                item[k] = item[k].replace(/^>/g, '');
            }
            result.splice(i, 0, item.join('<br>'));
        }
    }
    for (let i = 0, len = result.length; i < len; i++) {
        result[i] = result[i].replace(head, (match, p1, p2) => {
            return `<h${p1.length}>${p2}</h${p1.length}>`;
        });
        result[i] = result[i].replace(endLine, (match) => {
            return `<br>`;
        });
        result[i] = result[i].replace(blockquotes, (match, p1) => {
            return `<blockquote class="my-blockquote">${p1}</blockquote>`;
        });
        result[i] = result[i].replace(divideLine, (match, p1) => {
            return `<hr>`;
        });
        result[i] = result[i].replace(code, (match, p1) => {
            return `<pre><code>${p1}</code></pre>`;
        });
        result[i] = result[i].replace(em, (match, p1) => {
            return `<em>${p1}</em>`;
        });
        result[i] = result[i].replace(strong, (match, p1) => {
            return `<strong>${p1}</strong>`;
        });
    }
    result = result.join('');
    displayContainer.innerHTML = result;
}, 500);
/**正则表达式初始化 */

const head = /^(#{1,6})\s+(.*)/g,
    blockquotesTest = /^>\s+(.*)/,
    blockquotes = /^>\s+(.*)/g,
    endLine = /\s{2,}$/g,
    divideLine = /^-{3,}/g,
    code = /^\s*```(.*)/g,
    em = /\*(.*)\*/g,
    strong = /\*\*(.*)\*\*/g;
/** 变量初始化 */
const textarea = document.getElementsByClassName('textarea')[0],
    displayContainer = document.getElementsByClassName('display')[0];

textarea.addEventListener('input', () => {
    handler();
});



