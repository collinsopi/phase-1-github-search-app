document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('github-form');
  const searchInput = document.getElementById('search');
  const userList = document.getElementById('user-list');
  const repoList = document.getElementById('repos-list');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query === '') return;

    // Clear previous results
    userList.innerHTML = '';
    repoList.innerHTML = '';

    searchUsers(query);
  });

  // 🔍 Search GitHub Users
  function searchUsers(query) {
    fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(data => {
        data.items.forEach(user => {
          const li = document.createElement('li');

          li.innerHTML = `
            <img src="${user.avatar_url}" width="80" height="80" style="border-radius:50%">
            <p><strong>${user.login}</strong></p>
            <a href="${user.html_url}" target="_blank">Profile Link</a>
          `;

          li.addEventListener('click', () => {
            fetchUserRepos(user.login);
          });

          userList.appendChild(li);
        });
      });
  }

  //  Fetch User's Repositories
  function fetchUserRepos(username) {
    repoList.innerHTML = `<h3>${username}'s Repositories</h3>`;

    fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json())
      .then(repos => {
        repos.forEach(repo => {
          const li = document.createElement('li');
          li.innerHTML = `
            <p><strong>${repo.name}</strong></p>
            <a href="${repo.html_url}" target="_blank">View Repo</a>
          `;
          repoList.appendChild(li);
        });
      });
  }
});
