$(document).ready(() => {
  textArea();
  displayTopBtn();
  scrollToTop();
});

const textArea = () => {
  const maxChars = 140;
  let remaining = 140;
  $('textarea').keydown(() => {
    let charsRemain = $('#tweet-text').val().length;
    remaining = parseInt(maxChars - charsRemain);
    $('output.counter').text(remaining);
    if (remaining < 0) {
      $('output.counter').css({"color": "red"});
    } else {
      $('output.counter').css({"color": '#545149'});
    }
  });

  $('textarea').keyup(() => {
    let charsRemain = $('#tweet-text').val().length;
    remaining = parseInt(maxChars - charsRemain);
    $('output.counter').text(remaining);
    if (remaining < 0) {
      $('output.counter').css({"color": "red"});
    } else {
      $('output.counter').css({"color": "#545149"});
    }
  });
};

const displayTopBtn = () => {
  $(document).scroll(function() {
    if ($(window).scrollTop() > 100) {
      $("#myBtn").fadeIn();
    } else {
      $("#myBtn").fadeOut();
    }
  });
};

const scrollToTop = () => {
  $('#myBtn').click(function() {
    $('html, body').animate({scrollTop : 0},800);
    return false;
  });
};


