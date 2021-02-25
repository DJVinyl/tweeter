/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(() => {
  $(".error-flag").hide();
  renderTweets(data);
  loadTweets();
  submitNewTweet()
});

const renderTweets = (tweets) => {
  $("ul").empty();
  for (let tweet of tweets) {
    let newTweet = createTweetElement(tweet);
    $("ul").prepend(newTweet);
  }
};

const createTweetElement = (tweetObj) => {
  const newTweet = $("<li></li>");
  let date = new Date(parseInt(tweetObj.created_at));
  date = date.toLocaleString();
  newTweet.html(`
  <section class="tweet-container">
    <article class="inner-container">
      <div class='name-bar'>
      <!-- ADD IMG Element here -->
        <div class='avatar'>
          <img src="${tweetObj.user.avatars}" />
          <h3 class="full-Name">${tweetObj.user.name}</h3>
        </div>
        <h3 class="tweeterUsername">${tweetObj.user.handle}</h3>
      </div>
      <a class="tweet-text">
        ${escape(tweetObj.content.text)}
      </a>
      <hr class= "separator">
      <footer class= "tweet-footer">
        <a class= 'tweet-date'>${date}</a>
        <a class= 'emblems'>like/share/flag</a>
      </footer>
    </article>
  </section>
  <footer class= 'feed-space'></footer>
  `);
  return newTweet;
};

const submitNewTweet = () => {
  $("form").submit((event) => {
    event.preventDefault();
    const url = "/tweets";
    const data = $("#tweet-text").val();
    const dataSent = { text: data };
    if (data.length <= 140){
      $.post(url, dataSent).then((req, response) => {
        loadTweets(); // Ensures that Tweets get posted
      });
    } else {
      $( ".error-flag" ).slideDown( "slow", function() {
      });
    }
  });
};

const loadTweets = () => {
  $("form").submit((event) => {
    event.preventDefault();
    const url = "/tweets";
    let $formSubmit = $("#tweet-text").val();
    $formSubmit = $formSubmit.trim();
    if ($formSubmit && $formSubmit.length <= 140) {
      $.get(url).then((req, response) => {
        $(".error-flag").hide();
        $("#tweet-text").val('') // clears the textarea
        renderTweets(req);
      });
    } else {
      $( ".error-flag" ).slideDown( "slow", function() {
      });
    }
  });
};

const escape =  function(str) {
  let a = document.createElement('a');
  a.appendChild(document.createTextNode(str));
  return a.innerHTML;
};