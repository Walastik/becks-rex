// js/main.js

/**
 * A reusable function to fetch HTML content from a file and insert it into a specified element.
 * @param {string} filePath - The path to the HTML template file.
 * @param {string} elementId - The ID of the element where the HTML will be inserted.
 * @param {function} callback - An optional function to run after the template is loaded.
 */
function loadTemplate(filePath, elementId, callback) {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById(elementId).innerHTML = html;
      // If a callback function was provided, execute it now.
      if (callback) {
        callback();
      }
    })
    .catch((error) => {
      console.error(`Error loading template from ${filePath}:`, error);
      document.getElementById(elementId).innerHTML =
        '<p>Error loading content.</p>';
    });
}

document.addEventListener('DOMContentLoaded', function () {
  // Load the navigation bar and then initialize the theme switcher.
  // We pass `initializeThemeSwitcher` as the callback function.
  loadTemplate(
    'templates/navbar.html',
    'navbar-placeholder',
    initializeThemeSwitcher
  );

  // Load the footer. No callback is needed for this one.
  loadTemplate('templates/footer.html', 'footer-placeholder');
});
