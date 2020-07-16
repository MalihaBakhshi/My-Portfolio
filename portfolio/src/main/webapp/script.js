// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */

function getComments() {
  fetch('/data').then(response => response.json()).then((comments) => {

    const commentsListElement = document.getElementById('comment-container');
    commentsListElement.innerHTML = '';
    commentsListElement.appendChild(
        createListElement('Comment 1: ' + comments[0]));
    commentsListElement.appendChild(
        createListElement('Comment 2: ' + comments[1]));
    commentsListElement.appendChild(
        createListElement('Comment 3: ' + comments[2]));
  });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}

$(document).ready(function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        document.body.classList.toggle('nav-open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.body.classList.remove('nav-open');
        });
    });

    $('#up').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 2000)
    });

    AOS.init({
        easing: 'ease',
        duration: 1800,
        once: true
    });
});