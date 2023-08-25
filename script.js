tweetIDCount = 1; 

const textareaPost = document.getElementById('textareaPost');

var currentUser = 'alice';

var users = {
    'alice': {name: 'lallice', profile: 'profile.png'}
};
var tweets = [

];

const tweetReplica = document.getElementById('tweet-replica');

const postButton = document.getElementById('postButton');
postButton.addEventListener('click', e => {
    const text = document.querySelector('#create-post textarea').value;
    if(text.length > 0) {
        newPost(currentUser, text);
        document.querySelector('#create-post textarea').value = '';
    }
});

const lightGrey = getComputedStyle(document.documentElement).getPropertyValue('--light-grey');
const grey = getComputedStyle(document.documentElement).getPropertyValue('--grey')
const pink = getComputedStyle(document.documentElement).getPropertyValue('--pink');

// setInterval(run, 1000);

function run() {
    if(textareaPost.value.length > 0) {
        textareaPost.style.color = lightGrey;
    }
}

newPost(currentUser, 'This is a test post.');
newPost(currentUser, 'Anotha one');
newPost(currentUser, 'hi');

function showTweet() {
    console.log('click lcick');
}

function newPost(user, text) {
    var clone = tweetReplica.cloneNode(true);

    document.getElementById('tweets').prepend(clone);
    clone.style.display = 'flex';

    clone.querySelector('.tweet-left img').src = users[user].profile;
    clone.querySelector('.tweet-name').innerHTML = users[user].name;
    clone.querySelector('.tweet-username').innerHTML = "@" + user;
    clone.querySelector('.tweet-post').innerHTML = text;

    clone.addEventListener('click', showTweet);

    const likeDiv = clone.querySelector('.tweet-like');
    likeDiv.addEventListener('click', e => {
        e.stopPropagation();

        const heart = likeDiv.querySelector('i');
        if(heart.classList.contains('fa-regular')) { // like tweet
            heart.classList.remove('fa-regular');
            heart.classList.add('fa-solid');
            likeDiv.style.color = pink; 

            const likeP = likeDiv.querySelector('p');
            const amountOfLikes = parseInt(likeP.innerHTML);
            if(amountOfLikes == 0) 
                likeP.style.visibility = 'visible';

            likeP.innerHTML = amountOfLikes + 1;
            for(var i = 0; i < tweets.length; i++) {
                if(tweets[i].id == tweetIDCount) {
                    tweets[i].likes.push(currentUser);
                    console.log(tweets[i]);
                    break; 
                }
            }

        } else { // dislike tweet 
            heart.classList.remove('fa-solid');
            heart.classList.add('fa-regular');
            likeDiv.style.color = grey;

            const likeP = likeDiv.querySelector('p');
            const amountOfLikes = parseInt(likeP.innerHTML);
            if(amountOfLikes == 1) 
                likeP.style.visibility = 'hidden';

            likeP.innerHTML = amountOfLikes - 1;
            for(var i = 0; i < tweets.length; i++) {
                if(tweets[i].id == tweetIDCount) {
                    const index = tweets[i].likes.indexOf(currentUser);
                    tweets[i].likes.splice(index, 1);
                    console.log(tweets[i]);
                    break; 
                }
            }

        }
    });

    const d = new Date();

    const post = {id: tweetIDCount, username: user, time: d.getTime(), 
        context: text, comments: [], retweets: [], likes: []};
    tweets.push(post);
}