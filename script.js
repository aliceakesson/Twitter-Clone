const textareaPost = document.getElementById('textareaPost');

const lightGrey = getComputedStyle(document.documentElement).getPropertyValue('--light-grey')

posts = []

// setInterval(run, 1000);

function run() {
    if(textareaPost.value.length > 0) {
        textareaPost.style.color = lightGrey;
    }
}

newPost('alice', 'This is a test post.');

function newPost(username, context) {
    
}

