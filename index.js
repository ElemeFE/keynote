const ajax = (path, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.open('get', path, true);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        callback(xhr.responseText);
      }
    }
  };
};

const init = menu => {
  let result = '';
  let data = JSON.parse(menu);
  data.list.forEach(function (value) {
    let html = `
      <li>
        <a class="author" title="${value.author}" href="${value.homepage}"><span>${value.author.replace(/(.).+$/, '$1')}</span></a>
        <a class="content" href="./detail.html?path=./markdown/${value.path}&title=${value.title}"><div class="arrow"></div>${value.title}</a>
        <div class="info-wrapper">
          <a class="icon icon-github" href="${value.homepage}"></a>
          <a class="icon icon-weibo" href="${value.weibo}"></a>
        </div>
      </li>`;
    result += html;
  });
  document.getElementById('list').innerHTML = result;
};

document.addEventListener('DOMContentLoaded', () => {
  ajax('./menu.json', init);
}, false);