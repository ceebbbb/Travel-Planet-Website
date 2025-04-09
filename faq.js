document.addEventListener('DOMContentLoaded', function() {
    let categoryTabs = document.querySelectorAll('.category-tab');
    let faqCategories = document.querySelectorAll('.faq-category');
    let faqQuestions = document.querySelectorAll('.faq-question');
  
    // Toggle FAQ answer open/close //
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        question.classList.toggle('active');
        let answer = question.nextElementSibling;
  
        if (question.classList.contains('active')) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = 0;
        }
      });
    });
  
    // Category tab clicks //
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs //
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        let category = tab.dataset.category;
  
        // Hide categories //
        faqCategories.forEach(cat => {
          cat.classList.remove('active');
        });
  
        // Show the selected category or all //
        if (category === 'all') {
          faqCategories.forEach(cat => cat.classList.add('active'));
        } else {
          document.querySelector(`.faq-category[data-category="${category}"]`).classList.add('active');
        }
      });
    });
  
    // If all categories tab is active, then all categories will be shown //
    const activeTab = document.querySelector('.category-tab.active');
    if (activeTab && activeTab.dataset.category === 'all') {
      faqCategories.forEach(category => category.classList.add('active'));
    }
  });  
