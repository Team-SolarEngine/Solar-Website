<script lang="js">
    import { onMount } from 'svelte';
    import { marked } from 'marked';
    import { markedHighlight } from 'marked-highlight';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github-dark.css';
    import Topbar from '../../webpack/topbar.svelte';

    marked.use(markedHighlight({
        langPrefix: 'hljs language',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    }));

    const page = 'wiki';
    
    let loadList = $state(true);
    let errorList = $state(false);
    let loadFile = $state(false);
    let errorFile = $state(false);
    
    let wikiContent = $state(''); 
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

    async function selectWiki(file) {
        const data = await getWikiFile(file);
        wikiContent = data.content;
    }
    
    onMount(async () => {
        wikiList = await getWikiList();
    });
</script>

<main class="page">
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
                <p>Welcome to the Solar Engine Wiki! You can find entries on the left.</p>
            {/if}
        </div>
    </div>
</main>

<style>
    .page {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .main {
        display: flex;
        flex: 1;
        min-height: 0;
        overflow: hidden;
        @media screen and (max-width: 768px) { flex-direction: column; }

        .sidebar {
            min-width: 250px;
            padding: 15px;
            overflow-y: auto;
            @media screen and (min-width: 768px) { border-right: 1px solid var(--border); }
            background-color: rgba(255, 255, 255, 0.025);

            h3 { margin-top: 0; }

            .fileList {
                display: flex;
                flex-direction: column;
                gap: 8px;
                max-height: 150px;

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
                :global(code) { background: rgba(0, 0, 0, 0.5); border-radius: 4px; }
                :global(a) { color: aqua; }
                :global(pre) {
                    background: rgba(0, 0, 0, 0.5);
                    border-radius: 4px;
                    padding: 15px;
                    margin-bottom: 1rem;
                    overflow-x: auto;
                    white-space: pre;
                }
                :global(pre code) {
                    background: none;
                    padding: 0;
                    border-radius: 0;
                }
            }
        }
    }
</style>
