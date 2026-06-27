<!-- here goes the card and the popup thingy i guess -->
<script>
    import { marked } from "marked";
    
    let {
      logo = '',
      banner = '',
      readme = '',
      config = []
    } = $props();

    let doPopOver = $state(false)
    function togglePopover() {
      doPopOver = !doPopOver
      console.log(doPopOver)
    }
</script>

<div class="sharedItem" onclick={togglePopover}>
    <img src={logo} alt={config?.title} class="avatar"/>

    <div class="desc">
        <span class="title">{config?.title}</span>
        <span>{config?.description}</span>
        <a href={config?.madeByURL} class="madeBy" target="_blank">{config?.madeBy}</a>
    </div>
</div>

{#if doPopOver}
<div class="popoverModule">
    <div class="popoverUI">
        <span class="closeButton" onclick={togglePopover}>X</span>
        
        <img src={banner} alt={config?.title} class="banner"/>

        <div class="desc">
            <div class="info">
                <span class="title">{config?.title}</span>
                <span class="desc">{config?.description}</span>
                <a href={config?.madeByURL} class="madeBy" target="_blank">{config?.madeBy}</a>
            </div>
        </div>

        <div class="markdown">
            {@html marked(readme)}
        </div>

        <div class="links">
            {#if config?.externalURL}
                <a href={config?.externalURL}>Extenal Link</a>
            {/if}

            {#if config?.githubURL}
                <a href={config?.githubURL}>GitHub Link</a>
            {/if}

            {#if config?.downloadURL}
                <a href={config?.downloadURL}>Download Link</a>
            {/if}
        </div>
    </div>
</div>
{/if}

<style>
    .title { font-size: 1.5rem; }
    .madeBy { font-size: 0.75rem; color: rgba(255, 255, 255, 0.5); width: fit-content }
    
    .sharedItem {
        display: flex;
        gap: 5px;
        background-color: rgba(0, 0, 0, 0.25);
        border: 2px solid rgba(0, 0, 0, 0.5);
        padding: 15px 20px;
        width: 450px !important;
        border-radius: 10px;
        transition: border 100ms ease;
        @media screen and (max-width: 768px) { width: 100% !important; }

        &:hover { border: 2px solid var(--primary); }

        .avatar {
            --size: 75px;
            width: var(--size);
            height: var(--size);
        }
        
        .desc {
            display: flex;
            flex-direction: column;
        }
    }

    .popoverModule {
        position: fixed;
        left: 0; top: 0; bottom: 0; right: 0;
        background-color: rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(2px);

        .popoverUI {
            background-color: rgba(15, 15, 15);
            padding: 15px;
            border-radius: 10px;
            border: 2px solid var(--primary);
            max-width: 750px;
            @media screen and (max-width: 768px) { max-width: 100% !important; }
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;

            .closeButton {
                display: flex;
                justify-content: end;
                width: 100%;

                &:hover { cursor: pointer; }
            }

            .banner {
                width: 650px;
                border-radius: 15px;
                @media screen and (max-width: 768px) { width: 100% !important; }
            }

            .desc {
                display: flex;
                justify-content: space-between;
                width: 100%;

                .info {
                    display: flex;
                    flex-direction: column;

                    .desc {
                        width: 500px !important;
                        @media screen and (max-width: 768px) { width: 100% !important; }
                    }
                }
            }

            .markdown {
                background-color: rgba(0, 0, 0, 0.25);
                max-height: 200px;
                overflow-y: auto;
                padding: 0 10px;
                width: 95%;
                border-radius: 5px;

                :global(a) { color: aqua; }
            }

            .links {
                width: 100%;
                display: flex;
                justify-content: end;
                gap: 10px;

                a {
                    color: aqua;
                }
            }
        }
    }
</style>