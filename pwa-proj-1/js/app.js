window.addEventListener('load', async () => {
    await loadPosts();
});

async function loadPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=11');
    const data = await res.json();

    const container = document.querySelector('#posts');
    container.innerHTML = data.map(toCard).join('\n');
}

function toCard(posts) {
    return `
        <div class="card">
            <div class="card-title">
            
</div>
        </div>
    `


}