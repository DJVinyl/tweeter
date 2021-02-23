$(document).ready(() => {
  textArea();
});


const textArea = () => {
 const maxChars = $('#tweet-text').attr('maxlength');
  $('textarea').keydown(() => {
    let charsRemain = $('#tweet-text').val().length;
    let remaining = parseInt(maxChars-charsRemain);
    //const counter = $('<output></output>');
    //counter.html(`${remaining}`);
    console.log(maxChars, charsRemain, remaining);
    $('output.counter').text(remaining);
  })
  // console.log(total);
  // console.log(testarea);

};
