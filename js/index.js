document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('github-form').addEventListener('submit', searchGitHub);
  
    function searchGitHub(e) {
      e.preventDefault();
      let searchText = document.getElementById('search').value;
      fetch(`https://api.github.com/search/users?q=${searchText}`)
        .then(res => res.json())
        .then(data => displayUsers(data))
        .catch(err => console.log(err));
    }
  
    function displayUsers(data) {
      let users = data.items;
      let output = '';
       users.forEach(function(user) {
        output += `
          <li>
            <img src="${user.avatar_url}" width="80px" />
            <a href="${user.html_url}" target="_blank">${user.login}</a>
          </li>
        `;
      });
  
      document.getElementById('user-list').innerHTML = output;
    }
  
    document.getElementById('user-list').addEventListener('click', getRepos);
  
    function getRepos(e) {
      let username = e.target.textContent;
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => res.json())
        .then(data => displayRepos(data))
        .catch(err => console.log(err));
    }
  
    function displayRepos(data) {
      let repos = data;
      let output = '';
  
      repos.forEach(function(repo) {
        output += `
          <li>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          </li>
        `;
      });
  
      document.getElementById('repos-list').innerHTML = output;
    }
  });