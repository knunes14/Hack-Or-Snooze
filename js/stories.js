"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, favorites) {
  const hostName = story.getHostName();
  const favoriteStatus = favorites.includes(story.storyId) ? 'solid' : 'regular';

  const starHTML = getStarHTML(story, favoriteStatus);

  return $(`
    <li id="${story.storyId}">
      <div class="star">
        ${starHTML}
      </div>
      <a href="${story.url}" target="_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
    <hr>
  `);
}

function getStarHTML(story, favoriteStatus) {
  const starType = favoriteStatus === 'solid' ? 'fas' : 'far';

  return `
    <i class="${starType} fa-star"></i>
  `;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $ownStories.empty();

  if (currentUser.ownStories.length === 0) {
    $ownStories.append("<h5>No stories added by user yet!</h5>");
  } else {
    // loop through all of users stories and generate HTML for them
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup(story, currentUser.favorites);
      $ownStories.append($story);
    }
  }

  $ownStories.show();
}

/** Put Favorites list on page */

function putFavoritesListOnPage() {
  console.debug("putFavoritesListOnPage");

  $listOfFavorites.empty();

  if (currentUser.favorites.length === 0) {
    $listOfFavorites.append("<h5>No favorites added!</h5>");
  } else {
    // loop through all of users favorites and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story, currentUser.favorites);
      $listOfFavorites.append($story);
    }
  }
  $listOfFavorites.show();
}

/** Function called when users submit the add story form */

async function submitNewStory(evt) {
  evt.preventDefault();
  let newStory = await storyList.addStory(currentUser, {
    title: $titleName.val(),
    author: $authorName.val(),
    url: $storyUrl.val()
  });
  const $newStory = generateStoryMarkup(newStory);
  $allStoriesList.prepend($newStory);
  hidePageComponents();
  getAndShowStoriesOnStart();
}

$body.on('click', '#story-submit', submitNewStory);

/** Function called when user Favorites story */

async function favorite(evt) {
  let storyID = evt.target.parentElement.parentElement.getAttribute('id');
  let addedFavorite = await User.addToFavorites(currentUser.loginToken, currentUser.username, storyID);
  let solidStar = document.createElement('div');
  solidStar.setAttribute('class', 'star')
  solidStar.innerHTML = '<i class="fa-solid fa-star"></i>';
  evt.target.parentElement.parentElement.prepend(solidStar);
  favorites.push(storyID);
  localStorage.setItem('favorites', JSON.stringify(favorites))
  evt.target.parentElement.remove();
}

$body.on('click', '.fa-regular', favorite);

/** Function called when user Un-Favorites story */

async function unfavorite(evt) {
  let storyID = evt.target.parentElement.parentElement.getAttribute('id');
  let removedFavorite = await User.removeFromFavorites(currentUser.loginToken, currentUser.username, storyID);
  let emptyStar = document.createElement('div');
  emptyStar.setAttribute('class', 'star')
  emptyStar.innerHTML = '<i class="fa-regular fa-star"></i>';
  evt.target.parentElement.parentElement.prepend(emptyStar);
  favorites = favorites.filter(item => item !== storyID);
  localStorage.setItem('favorites', JSON.stringify(favorites))
  evt.target.parentElement.remove();
}

$body.on('click', '.fa-solid', unfavorite);











