<script lang="js">
    import { onMount } from 'svelte';
    import { marked } from 'marked';
    import Topbar from '../../webpack/topbar.svelte';

    const page = 'wiki';
    
    let loadList = $state(true);
    let errorList = $state(false);
    let loadFile = $state(false);
    let errorFile = $state(false);
    
    let wikiContent = $state(''); 
    /** @type {string[]} */
    let wikiList = $state([]);

    async function getWikiList() {
        try {
            const response = await fetch("/api/getmarkdown?type=wiki&act=getMarkdowns");
            if (!response.ok) throw new Error();
            return await response.json();
        } catch {
            errorList = true;
            return [];
        } finally {
            loadList = false;
        }
    }
    
    /** @param {string} file */
    async function getWikiFile(file) {
        loadFile = true;
        errorFile = false;
        try {
            const response = await fetch(`/api/getmarkdown?type=wiki&act=getMarkdownFile&f=${encodeURIComponent(file)}`);
            if (!response.ok) throw new Error();
            return await response.json();
        } catch {
            errorFile = true;
            return { content: `Failed to load article.` };
        } finally {
            loadFile = false;
        }
    }

    /** @param {string} file */
    async function selectWiki(file) {
        const data = await getWikiFile(file);
        wikiContent = data.content;
    }
    
    onMount(async () => {
        wikiList = await getWikiList();
    });
</script>

<main>
    <Topbar page={page}/>

    <div class="main">
        <div class="sidebar background">
            <h3>Wiki</h3>
            {#if loadList}
                <p>Loading...</p>
            {:else if errorList}
                <p>Error loading wiki.</p>
            {:else}
                <div class="fileList">
                    {#each wikiList as file}
                        <button class="fileButton" onclick={() => selectWiki(file)}>
                            {file.replace('.md', '')}
                        </button>
                    {/each}
                </div>
            {/if}
        </div>

        <div class="content background">
            {#if loadFile}
                <p>Loading content...</p>
            {:else if errorFile}
                <p>Could not load content.</p>
            {:else if wikiContent}
                <article class="prose">
                    {@html marked.parse(wikiContent)}
                </article>
            {:else}
                <p>Ouu shii 👀</p>
            {/if}
        </div>
    </div>
</main>

<style>
    .main {
        padding: 20px;
        display: flex;
        gap: 15px;
        height: 88vh;

        .sidebar {
            flex: 1;
            padding: 15px;
            overflow-y: auto;

            h3 { margin-top: 0; }

            .fileList {
                display: flex;
                flex-direction: column;
                gap: 8px;

                .fileButton {
                    background: none;
                    border: 1px solid transparent;
                    color: inherit;
                    text-align: left;
                    padding: 8px;
                    cursor: pointer;
                    transition: 0.2s;
                    border-radius: 4px;
                    font-family: funkin;

                    &:hover {
                        background: rgba(0, 0, 0, 0.2);
                    }
                }
            }
        }

        .content {
            flex: 3;
            padding: 20px;
            overflow-y: auto;

            .prose {
                :global(h1) { font-size: 2rem; margin-bottom: 1rem; }
                :global(p) { margin-bottom: 1rem; line-height: 1.6; }
                :global(code) { background: rgba(0, 0, 0, 0.5); border-radius: 4px; user-select: all; }
            }
        }
    }
</style>