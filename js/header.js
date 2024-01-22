/*
  This file is a placeholder for your component's JavaScript code.
  Rename this component.js file to the name of your component.
  Develop the functionality for your component in this file.
  At the end of our project, we will move all of the component JavaScript into one main.js file.
*/


// FOR BUTTON DROP DOWN

// Make a function that will drop down a menu.
// Clickable, and hover. (will go away when not clicked?)

// IF CLICKED, THEN MENU SHOWS. MENU STAYS WHEN IS HOVERED. WHEN YOU MOVE OFF MENU THEN IT COLLAPSE.


// <div="menu-container"
// <button="mobile-menu

var mobileMenu = document.getElementById('mobile-menu');
var navLinks = document.getElementById('nav-links-container');
// X button
var mobileClose = document.getElementById('mobileClose');
// Hamburger
var mobileOpen = document.getElementById('mobileOpen');

console.log('mobile-menu');

mobileMenu.addEventListener("click", function () {
  // Toggle Menu Appear
  navLinks.classList.toggle('hidden');
  mobileClose.classList.toggle('hidden');
  mobileOpen.classList.toggle('hidden');
});

