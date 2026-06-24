/**
 * Main App Initialization
 * Initializes all modules on page load
 */

import { initNavigation } from './navigation.js';
import { initLoginModal } from './modal.js';
import { initScrollAnimations } from './animations.js';
import { initFormHandlers } from './forms.js';
import { initRegForm } from './regform.js'; 
import { initVideoPlayer } from './videoplayer.js'; // Added here
import './webinarvideos.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    if (typeof initNavigation === 'function') initNavigation();
    if (typeof initLoginModal === 'function') initLoginModal();
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
    if (typeof initFormHandlers === 'function') initFormHandlers();
    if (typeof initRegForm === 'function') initRegForm();
    if (typeof initVideoPlayer === 'function') initVideoPlayer(); // Initialized here
  } catch (err) {
    // Log but do not break the rest of the page
    console.error('Initialization error:', err);
  }
});
