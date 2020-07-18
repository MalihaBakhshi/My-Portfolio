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

function login() {
    fetch('/loginstatus').then(response => response.text()).then((loginstatus) => {
        if (loginstatus.substr(26, 5) == "Login") {
            $('#comments').hide();
            $('#logout').hide();
        }
        else {
            $('#login').hide();
        }
    });
}

function getComments() {
    console.log("a");
        fetch('/data').then(response => response.json()).then((comments) => {
            console.log(comments.length);
        for (var i = 0; i < comments.length; i++) {
            console.log(comments[i]);
        var html = "<p> Name: " + comments[i].username + "<br> Comment: " + comments[i].comment + "</p><hr>";
                $('#comment_container').append(html);
        }
    });
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