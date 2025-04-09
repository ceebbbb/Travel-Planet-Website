// BLOG POST READ MORE FUNCTION //

document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.querySelectorAll('.read-more-btn');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            let articleId = this.getAttribute('data-article');
            let article = document.getElementById(articleId);

            if (article) {
                if (article.classList.contains('collapsed')) {
                    article.classList.remove('collapsed');
                    this.textContent = 'Read Less';
                } else {
                    article.classList.add('collapsed');
                    this.textContent = 'Read More';
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Handle blog form submission
    let blogForm = document.getElementById('blogForm');
  
    if (blogForm) {
      blogForm.addEventListener('submit', function (e) {
        e.preventDefault();
  
        let title = document.getElementById('title').value;
        let body = document.getElementById('body').value;
        let responseMsg = document.getElementById('responseMessage');
  
        responseMsg.innerText = "Submitting post...";
  
        let postData = {
          title: title,
          body: body
        };
  
        fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        })
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to send post');
          }
          return res.json();
        })
        .then(data => {
          responseMsg.innerText = "Post submitted successfully!";
          displayBlogPost(data);
          blogForm.reset();
        })
        .catch(err => {
          console.error('Error:', err);
          responseMsg.innerText = "Something went wrong. Try again.";
        });
      });
    }
  
    // Load latest posts on page load
    let blogPosts = document.getElementById('blogPosts');
  
    if (blogPosts) {
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        .then(res => {
          if (!res.ok) {
            throw new Error('Could not fetch posts');
          }
          return res.json();
        })
        .then(posts => {
          blogPosts.innerHTML = '';
  
          if (posts.length === 0) {
            blogPosts.innerHTML = '<p>No posts found.</p>';
            return;
          }
  
          posts.forEach(post => {
            displayBlogPost(post);
          });
        })
        .catch(err => {
          console.error('Fetch error:', err);
          blogPosts.innerHTML = '<p>Failed to load posts.</p>';
        });
    }
  
    // Show blog post on the page
    function displayBlogPost(post) {
      let container = document.getElementById('blogPosts');
      if (!container) return;
  
      let postDiv = document.createElement('div');
      postDiv.className = 'user-blog-post';
  
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;
  
      container.prepend(postDiv); // Add post to top
    }
  });