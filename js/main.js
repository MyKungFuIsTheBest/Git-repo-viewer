const xhr = new XMLHttpRequest;
const url = "https://api.github.com/orgs/";
const listElem = document.getElementById('resultList');
const backdrop = document.getElementById('backdrop');
const modal = document.getElementById('modal');

let projects = null;

document.getElementById('searchButton')
  .addEventListener('click', function () {
    getProjects(document.getElementById('orgName').value);
  })

function getProjects(org) {
  xhr.open("GET", url + org + '/repos?per_page=100', true);
  xhr.responseType = 'json';
  xhr.send();
  xhr.onload = function () {
    if (xhr.status == 200) {
      projects = this.response;
      console.log(projects);
      refreshResultList(projects);
    } else {
      console.error('something went wrong')
    }
  }
}

function refreshResultList(projects) {
  listElem.innerHTML = '';
  projects.forEach(item => {
    createResult(item);
  })
  let buttons = [...document.getElementsByClassName('btn-details')];
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      openModal(button.parentElement.dataset);
    })
  })
}


function createResult(item) {
  let result = document.createElement('div');
  result.className = "result";
  result.id = item.id;
  result.dataset.stars = item.stargazers_count;
  result.dataset.name = item.name;
  result.dataset.size = item.size;
  result.dataset.url = item.url;
  result.dataset.ssh = item.ssh_url;
  result.dataset.git = item.git_url;
  let content =
    '<div class="result-title">' +
    '<p><b>Repo</b>: ' + item.name + '</p>' +
    '<div class="star"></div><p>' + item.stargazers_count + '</div>';
    if (item.description) content += '<p><b>Description</b>: ' + item.description + '</p>';
    content += '<div class="btn btn-details">Details</div>'

  result.innerHTML = content;
  listElem.append(result);
}

function openModal(item) {
  console.log(item)
  modal.innerHTML =
    '<p><b>' + item.name + '</b></p><hr/>' +
    '<p><b>URL: </b>' +
    '<a target="_BLANK" href="' + item.url + '">' +
    item.url + '</a></p>' +
    '<p><b>ssh: </b>' +
    '<a target="_BLANK" href="' + item.ssh + '">' +
    item.ssh + '</a></p>' +
    '<p><b>git: </b>' +
    '<a target="_BLANK" href="' + item.git + '">' +
    item.git + '</a></p>' +
    '<p><b>Size: </b>' + item.size + '</p>'
  modal.classList.add('visible');
  backdrop.classList.add('visible');
  backdrop.addEventListener('click', function() {
    closeModal();
  });
}

function closeModal() {
  modal.innerHTML = '';
  modal.classList.remove('visible');
  backdrop.classList.remove('visible');
}