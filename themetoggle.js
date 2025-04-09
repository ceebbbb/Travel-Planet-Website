// DARK MODE WITH JQUERY //
$(document).ready(function() {
    // Saved theme preference //
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
        $("body").addClass("dark-mode");
    }
    
    // Toggle button JHTML//
    function createToggleButton() {
        const toggle = $("<div>").addClass("theme-toggle").html(`
            <input type="checkbox" id="theme-toggle-checkbox" ${$("body").hasClass("dark-mode") ? "checked" : ""}>
            <label for="theme-toggle-checkbox">
                <span class="toggle-icon">🌙</span>
                <span class="toggle-icon">☀️</span>
                <span class="toggle-track"></span>
            </label>
        `);
        
        // Adding toggle button to nav bar //
        const navLinks = $(".nav-links");
        if (navLinks.length) {
            const toggleLi = $("<li>").addClass("theme-toggle-container").append(toggle);
            navLinks.append(toggleLi);
            // Checking & changing toggle //
            $("#theme-toggle-checkbox").on("change", function() {
                const isDark = $(this).is(":checked");
                $("body").toggleClass("dark-mode", isDark);
                localStorage.setItem("theme", isDark ? "dark" : "light");
            });
        }
    }
    createToggleButton();
});