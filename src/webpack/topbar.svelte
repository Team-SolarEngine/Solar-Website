<script lang="js">
    import { onMount } from "svelte";

  let { page = '' } = $props();
  let openedPages = $state(false);

  const pages = [
    { "name": "Home", "url": "/"},
    { "name": "Wiki", "url": "/wiki"},
    { "name": "News", "url": "/news"},
    { "name": "Shares", "url": "/shares"},
    { "name": "About Engine", "url": "/about"}
  ]

  let width = $state(0);
  onMount(() => {
      width = window.innerWidth;
  });
</script>

<main>
    <div class="topbar" class:mobile={width <= 768}>
        {#if width >= 768}
            <div class="child">
                <div class="buttons">
                    {#each pages as _page}
                        <a href={_page.url} class:active={page === _page.name.toLowerCase()}>{_page.name}</a>
                    {/each}
                </div>
            </div>
        {:else}
            <div class="child" onclick={() => openedPages = !openedPages} style="cursor: pointer;">
                <div class="buttons" style="flex-direction: row; width: 100%;">
                    <!-- FUCK YOU AND YOUR STUPID ICONS I MADE MY OWN HAMBURGER MENU!!!!!!!!!! -->
                    <div style="
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        gap: 5px;
                    ">
                        {#each Array(3)  as _, i}
                            <div style="
                                background-color: white;
                                border-radius: 5px;
                                width: 1.5rem;
                                height: 2px;
                            "></div>
                        {/each}
                    </div>

                    {#each pages as _page}
                        {#if page === _page.name.toLowerCase()}
                            <span>{_page.name}</span>
                        {/if}
                    {/each}
                </div>
            </div>

            {#if openedPages}
                <div class="child">
                    <div class="buttons" style="flex-direction: column; width: 100%;">
                        {#each pages as _page}
                            {#if page != _page.name.toLowerCase()}
                                <a href={_page.url} class:active={page === _page.name.toLowerCase()}>{_page.name}</a>
                            {/if}
                        {/each}
                    </div>
                </div>
            {/if}
        {/if}
    </div>
</main>

<style>
    .topbar {
        position: fixed;
        width: 100%;
        z-index: 1000;

        display: flex;
        justify-content: center;

        .child {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 10px;

            padding: 0.85rem 1rem;
            background-color: rgba(0, 0, 0, 0.15);
            backdrop-filter: blur(10px);
            border-radius: 20px;

            @media screen and (max-width: 768px) { border-top: 2px solid var(--border); }
        }

        .buttons {
            display: flex;
            gap: 0.85rem;
            text-align: center;
            @media screen and (max-width: 768px) { overflow-x: auto; }

            a {
                color: white;
                text-decoration: none;
                padding: 0.75rem 1.5rem;
                scale: 1;
                transition: all 0.2s;
                border-radius: 20px;
                background-color: rgba(40, 40, 40, 0.25);

                border-top: 2px solid var(--border);
                border-bottom: 2px solid transparent;
            } a:hover {
                scale: 1.1;

                border-top: 2px solid transparent;
                border-bottom: 2px solid var(--border);
            } a.active {
                background-color: rgba(40, 40, 40, 0.75);
            }
        }
    }

    .mobile {
        flex-direction: column;
    }
</style>
