const textareaPost = document.getElementById('textareaPost');

var names = {'alice': 'alice åkesson'};
var profiles = {'alice': 'profile.png'};

const tweet = document.getElementById('tweet-replica');

const lightGrey = getComputedStyle(document.documentElement).getPropertyValue('--light-grey')
const pink = getComputedStyle(document.documentElement).getPropertyValue('--pink');

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

    const likeDiv = clone.querySelector('.tweet-like');
    likeDiv.addEventListener('click', e => {
        const heart = likeDiv.querySelector('i');
        if(heart.classList.contains('fa-regular')) {
            heart.classList.remove('fa-regular');
            heart.classList.add('fa-solid');
            likeDiv.style.color = pink; 

            const likeP = likeDiv.querySelector('p');
            const amountOfLikes = parseInt(likeP.innerHTML);
            if(amountOfLikes == 0) 
                likeP.style.visibility = 'visible';
            likeP.innerHTML = amountOfLikes + 1;
        } else {
            heart.classList.remove('fa-solid');
            heart.classList.add('fa-regular');
            likeDiv.style.color = lightGrey;

            const likeP = likeDiv.querySelector('p');
            const amountOfLikes = parseInt(likeP.innerHTML);
            if(amountOfLikes == 1) 
                likeP.style.visibility = 'hidden';
            likeP.innerHTML = amountOfLikes - 1;
        }
    });
}