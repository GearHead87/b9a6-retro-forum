const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const loadPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    const posts = data.posts;
    displayPost(posts);
}

const loadLatestPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    const posts = data;
    displayLatestPost(posts);
}

const categorySearch = async () => {
    const searchField = document.getElementById('category-search');
    const searchText = searchField.value;
    // console.log(searchText);
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    const posts = data.posts;
    displayPost(posts);
};

const displayPost = async (posts) => {
    // console.log(posts);
    const postContainer = document.getElementById('post-container');
    postContainer.textContent = '';
    await loadingSpinner();
    // if no post is found
    if (!posts.length) {
        const postCard = document.createElement('div');
        postCard.classList = `bg-[#797DFC1A] flex flex-row p-5 gap-4 rounded-2xl`;
        postCard.innerHTML = `
            <p class="font-black text-4xl">No Post Found</p>
        `;
        postContainer.appendChild(postCard);
        // return;
    }

    posts.forEach(post => {
        // console.log(post);
        const postCard = document.createElement('div');
        postCard.classList = `bg-[#797DFC1A] flex flex-col lg:flex-row items-center p-5 gap-4 rounded-2xl`;
        postCard.innerHTML = `
                        <!-- Status -->
                        <div class="w-14 h-14 bg-white relative rounded-xl">
                            <img class="object-cover rounded-full" src="${post.image}">
                            <div class="size-3 ${post.isActive ? 'bg-green-400' : 'bg-red-400'}  rounded-full absolute right-0 -top-1"></div>
                        </div>
                        <!-- Article Main body -->
                        <div class="space-y-4">
                            <!-- Tag and Author -->
                            <div class="inline-flex gap-5 font-semibold text-sm">
                                <p># <span>${post.category}</span></p>
                                <p>Author : <span>${post.author.name}</span></p>
                            </div>
                            <!-- Heading -->
                            <div>
                                <h2 class="font-bold text-xl">${post.title}</h2>
                            </div>
                            <!-- description -->
                            <div>
                                <p class="text-base">${post.description} </p>
                            </div>
                            <!-- Article Information -->
                            <div class="flex flex-col lg:flex-row items-center justify-between">
                                <div class="flex items-center gap-2 lg:gap-4">
                                    <img src="images/tabler-message.svg">
                                    <p>${post.comment_count}</p>
                                    <img src="images/tabler-eye.svg">
                                    <p>${post.view_count}</p>
                                    <img src="images/tabler-clock.svg">
                                    <p>${post.posted_time} min</p>
                                </div>
                                <div>
                                    <button onclick="markAsRead('${post.id}')"><i><img src="images/email 1.svg"></i></button>
                                </div>
                            </div>
        `;
        postContainer.appendChild(postCard);
    })
}



const markAsRead = async (postId) => {
    // console.log(postId);

    const markContainer = document.getElementById('mark-container');

    // Get mark as read count
    const markCountElement = document.getElementById('mark-count');
    const markCount = markCountElement.innerText;
    let count = parseInt(markCount);
    // console.log(count);

    // get posts
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    const posts = data.posts;

    posts.forEach(post => {
        if (parseInt(postId) === post.id) {
            const markCard = document.createElement('div');
            markCard.classList = `bg-white inline-flex items-center m-4 p-3 rounded-xl`;
            markCard.innerHTML = `
                <p class="font-semibold text-balance w-3/4">${post.title}</p>
                <p class="inline-flex"><img src="images/tabler-eye.svg"><span>${post.view_count}</span></p>
            `;
            markContainer.appendChild(markCard);
            count += 1;
            markCountElement.innerText = count;
        }
    });
}

const displayLatestPost = (posts) => {
    // console.log(posts);
    const latestPostContainer = document.getElementById('latestpost-container');

    posts.forEach(post => {
        // console.log(post);
        const postCard = document.createElement('div');
        postCard.classList = `card bg-base-100 shadow-xl`;

        postCard.innerHTML = `
        <figure><img src="${post.cover_image}" /></figure>
        <div class="card-body">
            <div class="inline-flex gap-4"><img src="images/calender.svg"><span>${post.author?.posted_date || 'No publish date'}</span></div>
            <h2 class="card-title">${post.title}</h2>
            <p>${post.description}</p>
            <div class="flex flex-row gap-4">
                <img class="size-14 rounded-full"
                    src="${post.profile_image}">
                <div>
                    <p class="font-bold text-base">${post.author.name}</p>
                    <p>${post?.author?.designation || 'Unknown'}</p>
                </div>
            </div>
        </div>
        `;
        latestPostContainer.appendChild(postCard);
    });
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden');
    }

}

const loadingSpinner = async () => {
    toggleLoadingSpinner(true);
    await sleep(2000);
    toggleLoadingSpinner(false);
}

loadPost();
loadLatestPost();