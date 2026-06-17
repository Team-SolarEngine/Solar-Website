<script lang="js">
  let { page = '' } = $props();
</script>

<main class="topbar">
    <div class="buttons">
        <a href="/" class:active={page === 'home'}>Home</a>
        <a href="/wiki" class:active={page === 'wiki'}>Wiki</a>
        <a href="/news" class:active={page === 'news'}>News</a>
    </div>
</main>

<style>
    .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: rgba(25, 25, 25, 1);
        @media screen and (max-width: 768px) { justify-content: center; align-items: center; }
        
        .buttons {
            display: flex;
            gap: 0.5rem;
            
            a {
                color: white;
                text-decoration: none;
                padding: 0.75rem 1.5rem;
                scale: 1;
                transition: scale 0.2s;
                border-radius: 10px;
            } a:hover {
                scale: 1.1;
            } a.active {
                background-color: rgba(40, 40, 40, 1);
            }
        }
    }
</style>
