import { mockDatabase } from "./data.js";

/* Listening for the "DOMContentLoaded" event and integrating both the DOM  selector and the event listener function to ensure that the event fires properly */
document.addEventListener("DOMContentLoaded", function () {
  const changeReadStatus = document.querySelector(
    ".container__header--markread"
  );

  changeReadStatus.addEventListener("click", (e) => {
    changeNotificationStatus(mockDatabase);
  });

  notificationsCount.textContent = returnCount(mockDatabase);
});

// DOM Elements
const pageContent = document.querySelector(".page__content");
const notificationsCount = document.querySelector(".notifications__count");

/* This is the main function that renders the contents of the "mockDatabase" array to the DOM (stored in data.js). It is simply an array of objects containing all of the posts specified within the challenge. */
const renderItems = (item) => {
  let content = "";
  for (let i = 0; i < item.length; i++) {
    content += `
        <div class="notification__container  ${
          !item[i].read ? "unread" : "read"
        }">
        <img src=${
          item[i].avatarImage
        } class="notification__container--avatar" alt="Image of " ${
      item[i].user
    } />
            <div class="notification__container--group">
           
                <p><span class="user">${item[i].user}</span> ${
      item[i].action
    } <a href="#" class=${item[i].action.includes("post") ? "graytext" : ""}>${
      item[i].containsURL
    }</a><span class=${item[i].isOnline ? "online" : ""}></span></p>
                <p>${item[i].timing}</p>
                <div class="notification__container--message">
                ${renderContent(item[i])}
                
            </div>
            </div>
        </div>
    `;
  }
  pageContent.innerHTML = content;
};

/* This function checks all of the postings for messages or images, which are also stored in the userMessage portion of the object. If the userMessage entry is not blank and does not contain an image, the function will render the message content to the page. If it does contain an image, it will be displayed on the page. */
const renderContent = (itemToRender) => {
  if (
    itemToRender.userMessage.trim() !== "" &&
    !itemToRender.userMessage.includes("./assets/images")
  ) {
    return `<p class="usermessage__box">${itemToRender.userMessage}</p>`;
  } else if (itemToRender.userMessage.includes("./assets/images")) {
    return `<img src=${itemToRender.userMessage} alt="some text here" class="message__image" />`;
  } else {
    return "";
  }
};

/* Function that changes the status of all notifications to "read" */
const changeNotificationStatus = (item) => {
  for (let i = 0; i < item.length; i++) {
    if (!item[i].read) {
      item[i].read = true;
    }
  }
  // reset count & rerender page content
  notificationsCount.textContent = returnCount(mockDatabase);
  renderItems(mockDatabase);
};

/* Function to return count of notifications (unread items) */
const returnCount = (item) => {
  let count = 0;
  for (let i = 0; i < item.length; i++) {
    if (!item[i].read) {
      count++;
    }
  }
  return count;
};

renderItems(mockDatabase);
