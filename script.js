const postsContainer = document.getElementById("posts-container");
const loader = document.getElementById("loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 2;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}_page${page}`
  );

  const data = await res.json();

  return data;
}

// Show posts in DOM
async function showPosts() {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `<div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-info">${post.body}</p>
    </div>`;
    postsContainer.appendChild(postEl);
  });
}

// Show loader and fetch more posts
function showLoader() {
  loader.classList.add("show");
  setTimeout(() => {
    setTimeout(() => {
      page++;
      showPosts();
    }, 250);
    loader.classList.remove("show");
  }, 750);
}

// Filter the posts
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  console.log("===== NEW LOOP =====");
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-info").innerText.toUpperCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

// Get the scroll input
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoader();
  }
});

// Filter the posts by the input
filter.addEventListener("input", filterPosts);

// Show initial posts
showPosts();
