$(document).ready(() => {
  textArea();
});

//This can be refactored;
const textArea = () => {
 const maxChars = $('#tweet-text').attr('maxlength');
  $('textarea').keydown(() => {
    let charsRemain = $('#tweet-text').val().length;
    let remaining = parseInt(maxChars-charsRemain);
    $('output.counter').text(remaining);
  })
  $('textarea').keyup(() => {
    let charsRemain = $('#tweet-text').val().length;
    let remaining = parseInt(maxChars-charsRemain);
    $('output.counter').text(remaining);
  });
};
