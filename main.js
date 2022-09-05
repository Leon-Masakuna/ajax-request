const form = document.querySelector("form");
const previewArea = document.querySelector(".preview-area");
const search = document.querySelector("#search");

form.addEventListener("submit", handleSearch);

function handleSearch(e) {
  e.preventDefault();
  const searchText = search.value;
  getResult(searchText);
}

/**
 *
 * Avec l'object XMLHttpRequest
 */
/* function getResult(searchText) {
    if (searchText) {
        const url = `https://api.github.com/users/${searchText}`;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        xhr.onload = function() {
            if (this.status === 200) {
                const { avatar_url, name } = JSON.parse(this.responseText);
                previewArea.innerHTML = getPreview(avatar_url, name);
            } else {
                previewArea.innerHTML = getError(searchText);
            }
        };
    }
} */

/**
 *
 * Avec l' api fetch
 */
function getResult(searchText) {
  if (searchText) {
    const url = `https://api.github.com/users/${searchText}`;
    fetch(url)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        const { avatar_url, name } = res;
        previewArea.innerHTML = getPreview(avatar_url, name);
      })
      .catch((e) => {
        previewArea.innerHTML = getError(searchText);
      });
  }
}

function getPreview(avatar_url, name) {
  return ` 
  <div class="content">
    <img src="${avatar_url}" alt="${name}" />
    <p>Profil de : ${name}</p>
  </div>`;
}

function getError(searchText) {
  return ` 
  <div class="content">
    <p>Aucun résultat trouvé concernant "${searchText}"</p>
  </div>`;
}
