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
  renderTweets(data);
  submitNewTweet();
});

const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    let newTweet = createTweetElement(tweet);
    $("ul").append(newTweet);
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
        <h3 class="full-Name">${tweetObj.user.name}</h3>
        <h3 class="tweeterUsername">${tweetObj.user.handle}</h3>
      </div>
        <a class="tweet">${tweetObj.content.text}</a>
        <hr class= "separator">
      <footer class= "tweet-date">${date}</footer>
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
    const dataSent = {text: data};
    console.log(dataSent);

    $.post(url,dataSent, (data, status) => {
      console.log('Status: ' + status);
    });

  })
};
