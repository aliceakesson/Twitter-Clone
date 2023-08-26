var tweetIDCount = 0; 
var currentShowingTweet = -1; 
var currentShowingElement = null; 

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

document.getElementById('full-tweet-likes-icon').addEventListener('click', e => {
    const heart = document.getElementById('full-tweet-likes-icon');
        if(heart.classList.contains('fa-regular')) { // like tweet
            heart.classList.remove('fa-regular');
            heart.classList.add('fa-solid');
            heart.style.color = pink; 

            tweets[currentShowingTweet].likes.push(currentUser);
            console.log(tweets[currentShowingTweet]);

        } else { // dislike tweet 
            heart.classList.remove('fa-solid');
            heart.classList.add('fa-regular');
            heart.style.color = grey;

            const index = tweets[currentShowingTweet].likes.indexOf(currentUser);
            tweets[currentShowingTweet].likes.splice(index, 1);
            console.log(tweets[currentShowingTweet]);
                    
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

function showTweet(id) {
    document.getElementById('main-header').style.display = 'none';
    document.getElementById('tweet-header').style.display = 'flex';
    document.getElementById('create-post').style.display = 'none';
    document.getElementById('tweets').style.display = 'none';
    document.getElementById('full-tweet').style.display = 'block';

    currentShowingTweet = id; 
    const tweet = tweets[id];

    document.getElementById('full-tweet-name').innerHTML = users[tweet.username].name;
    document.getElementById('full-tweet-username').innerHTML = "@" + tweet.username;
    document.getElementById('full-tweet-profile').src = users[tweet.username].profile;

    document.querySelector('#full-tweet-content p').innerHTML = tweet.content;

    var noStatistic = true; 

    const amountOfLikes = tweet.likes.length;

    if(amountOfLikes == 0)
        document.getElementById('full-tweet-likes').style.display = 'none';
    else  {
        noStatistic = false; 
        document.getElementById('full-tweet-likes').style.display = 'block';

        if(amountOfLikes == 1)
            document.getElementById('full-tweet-likes').innerHTML = tweet.likes.length + " Like";
        else 
            document.getElementById('full-tweet-likes').innerHTML = tweet.likes.length + " Likes";

        const i = document.getElementById('full-tweet-likes-icon');  
        if(tweet.likes.indexOf(currentUser) > -1) {
            i.classList.remove('fa-regular');
            i.classList.add('fa-solid');
            i.style.color = pink;
        } else {
            i.classList.remove('fa-solid');
            i.classList.add('fa-regular');
            i.style.color = grey;
        }
    }

    if(noStatistic) 
        document.getElementById('full-tweet-statistic').style.display = 'none';
    else document.getElementById('full-tweet-statistic').style.display = 'flex';

}

document.querySelector('#tweet-header i').addEventListener('click', e => { // go back to Home 
    document.getElementById('main-header').style.display = 'block';
    document.getElementById('tweet-header').style.display = 'none';
    document.getElementById('create-post').style.display = 'block';
    document.getElementById('tweets').style.display = 'block';
    document.getElementById('full-tweet').style.display = 'none';

    const i = currentShowingElement.querySelector('.tweet-like i');
    if(tweets[currentShowingTweet].likes.indexOf(currentUser) > -1) {
        i.classList.remove('fa-regular');
        i.classList.add('fa-solid');
        i.style.color = pink;
    } else {
        i.classList.remove('fa-solid');
        i.classList.add('fa-regular');
        i.style.color = grey;
    }

    const p = currentShowingElement.querySelector('.tweet-like p');
    p.innerHTML = tweets[currentShowingTweet].likes.length;
    if(tweets[currentShowingTweet].likes.length == 0) {
        p.style.display = 'none';
    } else p.style.display = 'block';
});

function newPost(user, text) {
    var clone = tweetReplica.cloneNode(true);

    document.getElementById('tweets').prepend(clone);
    clone.style.display = 'flex';

    clone.querySelector('.tweet-left img').src = users[user].profile;
    clone.querySelector('.tweet-name').innerHTML = users[user].name;
    clone.querySelector('.tweet-username').innerHTML = "@" + user;
    clone.querySelector('.tweet-post').innerHTML = text;

    const d = new Date();

    const post = {id: tweetIDCount, username: user, time: d.getTime(), 
        content: text, comments: [], retweets: [], likes: []};
    tweets.push(post);

    clone.addEventListener('click', e => {
        showTweet(post.id);
        currentShowingElement = clone; 
    });

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
                if(tweets[i].id == post.id) {
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
                if(tweets[i].id == post.id) {
                    const index = tweets[i].likes.indexOf(currentUser);
                    tweets[i].likes.splice(index, 1);
                    console.log(tweets[i]);
                    break; 
                }
            }
        }

        const commentDiv = clone.querySelector('.tweet-comment');
        commentDiv.addEventListener('click', e => {
            showTweet(post.id);
        });
    });

    tweetIDCount++;
}