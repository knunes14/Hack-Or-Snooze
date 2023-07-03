"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  getAndShowStoriesOnStart();
}

$body.on("click", "#nav-all", navAllStories);

/** Add new story to body when user clicks Submit */

function navSubmitStoryClick(evt) {
  console.debug("navSubmitStoryClick", evt);
  hidePageComponents();
  $addStoryForm.show();
  $allStoriesList.show();
  $navSubmitStory.show();
}

$navSubmitStory.on("click", navSubmitStoryClick);


/** Show favorites in user profile when 'favorites' is clicked */

function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt)
  hidePageComponents();
  $listOfFavorites.show();
  putFavoritesListOnPage();
}

$body.on("click", "#nav-favorites", navFavoritesClick);

/** Show My Stories on clicking "my stories" */

function navUserStories(evt) {
  console.debug("navUserStories", evt);
  hidePageComponents();
  putUserStoriesOnPage();
  $ownStories.show();
}

$body.on("click", "#nav-user-stories", navUserStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
  $storiesContainer.hide();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").css('display', 'flex');;
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
} /* function does not require a click event binding because it is not directly associated with a specific user action. */