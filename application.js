var get_tweets = function() {
  var index = streams.home.length - 1; 
  while(index >= 0){
    var tweet = streams.home[index];
    var str_date = tweet.created_at.toLocaleString();
    var $tweet = $('<div id="tweets" class="tweet_style" data-user="' +tweet.user + '"></div>');
    $tweet.appendTo($('#all .messages'));

    var str_href = ("<a id='user_tweets' href='javascript:void(0)' data-user='" + 
      $tweet.data('user') + 
      "'>@" + $tweet.data('user') + 
      "</a> ");
    $tweet.append(str_href + '<span><small>' + str_date + '</small><br><span>' + tweet.message);

    index -= 1;
  }
};

var refresh_tweets = function() {
  $('button').on('click', function(){
    $('#all .messages #tweets').remove();
    $('#user .messages #tweets').remove();
    $('#user h3').text("Select user for tweets!");
    
    get_tweets();
    show_user_tweets();
  });
};

var show_user_tweets = function(){
  $('#all .messages div').on('click', '#user_tweets', function(){
    $('#user .messages #tweets').remove();
    var user = $(this).data('user');
    $('#user h3').text("Tweets from " + user);

    var user_index = streams.users[user];
    for (var tweet in user_index){
      var str_date = user_index[tweet].created_at.toLocaleString();
      var $tweet = $('<div id="tweets" class="tweet_style"></div>');
      $tweet.appendTo($('#user .messages'));
      $tweet.append('<span>@' + user + ', <small>' + str_date + '</small><br><span>' + user_index[tweet].message);
    }
  });
};

$(document).ready(function(){
  get_tweets();
  refresh_tweets();
  show_user_tweets();
});