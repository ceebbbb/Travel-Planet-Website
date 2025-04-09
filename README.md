# Travel Planet Website Technical Report

## Project Title
**Company & Website name:** Travel Planet

## Project Description
Travel Planet is designed to help users discover their ideal holiday destination through interactive features and informative content. Users can explore a wide range of destinations, view images, read travel blogs, and submit booking inquiries via a contact form. The site enhances user experience through dynamic JavaScript-powered functionality, including search filters, form validation, FAQs, interactive UI elements, and theme toggles.

JavaScript plays a key role throughout the site, supporting a range of features such as:
- Dynamic image sliders and carousels
- Filtering and search systems
- Interactive modals and destination cards
- Form validation for newsletter and contact forms
- FAQ search and accordion interactions
- LocalStorage-based theme settings
- Fetching external blog content via API
- Responsive UI interactions using DOM manipulation and event handling

## Technologies Used
HTML, CSS, JavaScript | JS libraries: jQuery, Json

**APIs used:** https://jsonplaceholder.typicode.com/posts

### JSON Data Files
- **destinations.json** - This JSON file stores all the data related to travel destinations displayed on the Destinations Page. The file allows me to separate content from layout, making it easier to manage and update destination data without altering HTML or JavaScript directly. Using JavaScript, I fetch this data and dynamically generate destination cards on the page.

- **teamMembers.json** - This JSON file contains all the data for team members shown on the About Us Page. I use JavaScript to fetch this file and populate custom flip cards dynamically on the About Us page, keeping the content flexible and easy to maintain.

## Page Features Overview
- **Home Page:** Featured destinations, image slider, newsletter form, dark/light mode toggle, reviews carousel
- **Destinations Page:** Destination listings, search/filter functions, view details modal, favourite system
- **Travel Blog:** Fetch and display blog posts, load more functionality
- **About Us:** Team member flip cards with interactivity
- **Contact Page:** Interactive form with validation and event handling
- **FAQ Section:** Expandable Q&As, keyword-based search, and category filters

## JavaScript Concepts Used
- Arrays, Objects, Data Types
- Functions & High-order Functions
- Event Listeners & Query Selectors
- DOM Manipulation
- Strings & Loops (forEach, map, etc.)
- Fetch API & Promises
- JSON and external data handling
- Form Validation
- Local Storage
- jQuery (for dark/light mode & nav shrink effect)