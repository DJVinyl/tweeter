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
  submitNewTweet();
});

const renderTweets = (tweets) => {
  $("#tweet-list").empty();
  for (let tweet of tweets) {
    let newTweet = createTweetElement(tweet);
    $("#tweet-list").prepend(newTweet);
  }
};

const timeAgo = (current,previous) => {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = current - previous; // in milliseconds

  if (elapsed < msPerMinute) {
    let result = Math.round(elapsed / 1000);
    if (result === 1) {
      return result + " second ago";
    } else {
      return result + " seconds ago";
    }
  } else if (elapsed < msPerHour) {
    let result = Math.round(elapsed / msPerMinute);
    if (result === 1) {
      return result + " minute ago";
    } else {
      return result + " minutes ago";
    }
  } else if (elapsed < msPerDay) {
    let result = Math.round(elapsed / msPerHour);
    if (result === 1) {
      return result + " hour ago";
    } else {
      return result + " hours ago";
    }
  } else if (elapsed < msPerMonth) {
    let result = Math.round(elapsed / msPerDay);
    if (result === 1) {
      return "approximately "+ result + " day ago";
    } else {
      return "approximately "+ result + " days ago";
    }
  } else if (elapsed < msPerYear) {
    let result = Math.round(elapsed / msPerMonth);
    if (result === 1) {
      return "approximately "+ result + " month ago";
    } else {
      return "approximately "+ result + " months ago";
    }
  } else {
    let result = Math.round(elapsed / msPerYear);
    if (result === 1) {
      return "approximately "+ result + " year ago";
    } else {
      return "approximately "+ result + " years ago";
    }
  }
}


const createTweetElement = (tweetObj) => {
  const newTweet = $("<li></li>");
  let tweetDate = new Date(parseInt(tweetObj.created_at));
  let timeElapsed = timeAgo(Date.now(),tweetDate)
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
        <a class= 'tweet-date'>${timeElapsed}</a>
        <a class= 'emblems'>
          <img src='/images/heart.png' />
          <img src='/images/share.png' />
          <img src='/images/flags.png' />  
        </a>
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
    if (data.length <= 140) {
      $.post(url, dataSent).then((req, response) => {
        loadTweets(); // Ensures that Tweets get posted
      });
    } else {
      $(".error-flag").slideDown("slow", function() {
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
        renderTweets(req);
        $("#tweet-text").val(''); // clears the textarea
      });
    } else {
      $(".error-flag").slideDown("slow", function() {
      });
    }
  });
};

const escape =  function(str) {
  let a = document.createElement('a');
  a.appendChild(document.createTextNode(str));
  return a.innerHTML;
};