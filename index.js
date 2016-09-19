const DEFAULT_QUERY_PREFIX = '';
const DEFAULT_TEMPLATE_PATH = './detail.html?path=./markdown/';

const VALID_TYPES = {
  md: {
    queryPrefix: DEFAULT_QUERY_PREFIX,
    path: DEFAULT_TEMPLATE_PATH
  },
  html: {
    queryPrefix: '?',
    path: './html/'
  }
};

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
  let [templatePath, queryPrefix] = [DEFAULT_TEMPLATE_PATH, DEFAULT_QUERY_PREFIX];
  data.list.forEach(function (value) {
    templatePath = VALID_TYPES[value.type] ? VALID_TYPES[value.type].path : DEFAULT_TEMPLATE_PATH;
    queryPrefix = VALID_TYPES[value.type] ? VALID_TYPES[value.type].queryPrefix : DEFAULT_QUERY_PREFIX;

    value.path = templatePath + value.path + queryPrefix;

    let html = `
      <li>
        <a class="author" title="${value.author}" href="${value.homepage}"><span>${value.author.replace(/(.).+$/, '$1')}</span></a>
        <a class="content" href="${value.path}&title=${value.title}"><div class="arrow"></div>${value.title}</a>
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
