const xhr = new XMLHttpRequest;
const url = "https://api.github.com/orgs/";
const listElem = document.getElementById('resultList');

let projects = null;

document.getElementById('button')
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
}


function createResult(item) {
  let result = document.createElement('div');
  result.className = "result";
  result.id = item.id;
  result.innerHTML =
    '<p><b>Repo</b>: ' + item.name
    + '</p><p><b>Description</b>: ' + item.description
    + '</p><p><b>URL:</b> <a target="_BLANK" href="'
    + item.html_url + '">'
    + item.html_url + '</a></p>'
    + '<div class="btn btn-details">Details</div>'
  listElem.append(result);
}