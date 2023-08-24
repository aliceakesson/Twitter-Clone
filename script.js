const textareaPost = document.getElementById('textareaPost');

var names = {'alice': 'alice åkesson'};
var profiles = {'alice': 'profile.png'};

const tweet = document.getElementById('tweet-replica');

const lightGrey = getComputedStyle(document.documentElement).getPropertyValue('--light-grey')

posts = []

// setInterval(run, 1000);

function run() {
    if(textareaPost.value.length > 0) {
        textareaPost.style.color = lightGrey;
    }
}

newPost('alice', 'This is a test post.');
newPost('alice', 'Anotha one');

function newPost(username, context) {
    var clone = tweet.cloneNode(true);

    document.getElementById('tweets').prepend(clone);
    clone.style.display = 'flex';

    clone.querySelector('.tweet-left img').src = profiles[username];
    clone.querySelector('.tweet-name').innerHTML = names[username];
    clone.querySelector('.tweet-username').innerHTML = "@" + username;
    clone.querySelector('.tweet-post').innerHTML = context;
}

