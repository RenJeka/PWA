window.addEventListener('load', async () => {
    // Проверка, поддерживает ли браузер ServiceWorker
    if ('serviceWorker' in navigator) {
        // Если ServiceWorker поддерживается браузером — тогда регистрируем его (віводим ошибки в случае ошибки)
        try {
            const registerInfo = await navigator.serviceWorker.register('/service-worker.js');
            // console.log('SW register success', registerInfo);
        } catch (e) {
            // console.error('SW register fail')
        }
    }
    await loadPosts();
});

async function loadPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=11');
    const data = await res.json();

    const container = document.querySelector('#posts');
    container.innerHTML = data.map(toCard).join('\n');
}

function toCard(post) {

    return `
        <div class="card">
            <div class="card-title">
                ${post.title}
            </div>
            <div class="card-body">
                ${post.body}
            </div>   
        </div>
    `
}
