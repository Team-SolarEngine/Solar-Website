<script lang="js">
  let { page = '' } = $props();

  const pages = [
    { "name": "Home", "url": "/"},
    { "name": "Wiki", "url": "/wiki"},
    { "name": "News", "url": "/news"},
    { "name": "Shares", "url": "/shares"},
  ]
</script>

<main class="topbar">
  <div class="buttons">
    {#each pages as _page}
      <a href={_page.url} class:active={page === _page.name.toLowerCase()}>{_page.name}</a>
    {/each}
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
            overflow-x: auto;

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
