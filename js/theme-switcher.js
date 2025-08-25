// js/theme-switcher.js

'use strict';

const getStoredTheme = () => localStorage.getItem('theme');
const setStoredTheme = (theme) => localStorage.setItem('theme', theme);

const getPreferredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }
  // Check user's OS preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const setTheme = (theme) => {
  if (
    theme === 'auto' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
};

const updateIcon = (theme) => {
  const switcherIcon = document.querySelector('#theme-switcher-btn i');
  if (switcherIcon) {
    // Check if the icon exists before trying to modify it
    if (theme === 'dark') {
      switcherIcon.classList.remove('bi-sun-fill');
      switcherIcon.classList.add('bi-moon-stars-fill');
    } else {
      switcherIcon.classList.remove('bi-moon-stars-fill');
      switcherIcon.classList.add('bi-sun-fill');
    }
  }
};

/**
 * Finds the theme switcher button and attaches the click event listener.
 * This function will be called by main.js after the navbar is loaded.
 */
function initializeThemeSwitcher() {
  // Set the theme on initial page load
  const initialTheme = getPreferredTheme();
  setTheme(initialTheme);
  updateIcon(initialTheme);

  const switcherBtn = document.querySelector('#theme-switcher-btn');

  if (switcherBtn) {
    switcherBtn.addEventListener('click', () => {
      const currentTheme = getStoredTheme() || getPreferredTheme();
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setStoredTheme(newTheme);
      setTheme(newTheme);
      updateIcon(newTheme);
    });
  }
}

// Call the function immediately on script load.
// It will set the theme, but the button listener will be re-initialized by main.js
initializeThemeSwitcher();
