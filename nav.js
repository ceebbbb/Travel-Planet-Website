// NAVBAR EFFECTS USING JQEURY //

$(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
        $("header").addClass("scrolled");
    } else {
        $("header").removeClass("scrolled");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu elements //
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        // Toggle active class on hamburger and nav links //
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Closes menu when clicking on a link //
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Only closing the menu if it's ope //
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
});