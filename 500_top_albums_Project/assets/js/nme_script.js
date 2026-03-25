// Import API utilities
import { safeFetch, showError, showLoading } from './utils/api.js';

// DOM element references
let albumCoverBackground = document.querySelector(".albumCoverBackground");
let albumCoverList = document.querySelector(".albumCoverList");
let modalContentCover = document.querySelector(".modal_content_cover");
let modalAlbumCover = document.querySelector(".modalAlbumCover");
let artistTitle = document.getElementById("artistTitle");
let albumYear = document.querySelector("#albumYear");
let rankNo = document.getElementById("rankNo");
let trackListing = document.querySelector("#trackListing");
let releaseUrl = document.querySelector("#releaseUrl");
let navLogo = document.querySelector(".navLogo");
let topOfPage = document.querySelector("#header_logo");
let pageBody = document.querySelector("#main");
let modal = document.getElementById("myModal");

/**
 * Loads and displays all albums
 */
async function loadAlbums() {
  try {
    // Show loading state
    showLoading(true);
    
    // Fetch data with error handling
    const [albums, images] = await Promise.all([
      safeFetch('https://api.discogs.com/lists/188784'),
      safeFetch('assets/data/nme_covers.json')
    ]);
    
    // Hide loading state
    showLoading(false);
    
    // Clear the list
    albumCoverList.innerHTML = '';
    
    // Render albums
    albums.items.forEach((album, index) => {
      const rank = index + 1;
      let newCover = document.createElement('li');
      let image = document.createElement('img');
      
      image.src = images[album.id];
      image.alt = `${album.display_title} album cover`;
      
      newCover.appendChild(image);
      newCover.classList.add('albumCover');
      newCover.setAttribute('id', rank);
      image.setAttribute('id', album.id);
      image.classList.add('thumbnail', 'rankNo' + rank);
      
      albumCoverList.appendChild(newCover);
      
      // Add click handler with error handling
      image.addEventListener('click', async function() {
        await showAlbumDetails(album, rank, images[album.id]);
      });
    });
    
  } catch (error) {
    console.error('Failed to load albums:', error);
    showError(error.message);
    showLoading(false);
  }
}

/**
 * Shows album details in modal
 * @param {Object} album - Album data
 * @param {number} rank - Album ranking
 * @param {string} imageUrl - Album cover URL
 */
async function showAlbumDetails(album, rank, imageUrl) {
  // Set basic info
  modalAlbumCover.src = imageUrl;
  modalAlbumCover.alt = `${album.display_title} album cover`;
  artistTitle.textContent = album.display_title;
  rankNo.textContent = 'Ranked No. ' + rank + ' out of 500';
  
  // Show modal
  openModal();
  
  // Clear and show loading for tracks
  trackListing.innerHTML = '<li style="color: white;">Loading tracks...</li>';
  
  try {
    const details = await safeFetch(album.resource_url);
    
    albumYear.textContent = 'Album Year: ' + (details.year || 'Unknown');
    releaseUrl.href = details.uri;
    
    // Clear loading
    trackListing.innerHTML = '';
    
    // Add tracks
    if (details.tracklist && details.tracklist.length > 0) {
      details.tracklist.forEach((track, trackIndex) => {
        let newTrack = document.createElement('li');
        newTrack.classList.add('albumTrack');
        newTrack.textContent = (trackIndex + 1) + '. ' + track.title;
        trackListing.appendChild(newTrack);
      });
    } else {
      trackListing.innerHTML = '<li>No track information available</li>';
    }
    
  } catch (error) {
    console.error('Failed to load album details:', error);
    trackListing.innerHTML = '<li style="color: #ff6b6b;">Failed to load tracks. Please try again.</li>';
  }
}

/**
 * Opens the modal
 */
function openModal() {
  modal.style.display = 'block';
  pageBody.style.overflow = 'hidden';
  
  // Set focus to modal for accessibility
  modal.setAttribute('tabindex', '-1');
  modal.focus();
}

/**
 * Closes the modal
 */
function closeModal() {
  modal.style.display = 'none';
  trackListing.innerHTML = '';
  pageBody.style.overflow = '';
}

/**
 * Initialize modal event handlers
 */
function initModalHandlers() {
  const closeButton = document.getElementsByClassName('close')[0];
  
  // Close button click
  closeButton.addEventListener('click', closeModal);
  
  // Click outside modal
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  // Escape key to close
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
  
  // Open modal when clicking album covers
  albumCoverBackground.addEventListener('click', (event) => {
    if (event.target.classList.contains('thumbnail')) {
      openModal();
    }
  });
}

// Initialize when DOM is ready
loadAlbums();
initModalHandlers();

// Smooth scroll navigation and sticky nav
$(document).ready(function () {
  // Sticky navigation with logo toggle
  let targetOffset = $(".albumCoverBackground").offset().top;

  $(window).scroll(function () {
    if ($(window).scrollTop() > targetOffset) {
      $(".navLogo").css({
        display: "inline",
      });
      $(".landingPageLink").css({
        display: "none",
      });
    } else {
      $(".navLogo").css({
        display: "none",
      });
      $(".landingPageLink").css({
        display: "inline",
      });
    }
  });

  $(document).on("scroll", onScroll);

  // Smoothscroll on click of Top Nav Button
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    $(document).off("scroll");

    $("a").each(function () {
      $(this).removeClass("active");
    });
    $(this).addClass("active");

    var target = this.hash;
    var $target = $(target);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top + 2,
        },
        500,
        "swing",
        function () {
          window.location.hash = target;
          $(document).on("scroll", onScroll);
        },
      );
  });
});

function onScroll(event) {
  let scrollPos = $(document).scrollTop();
}
