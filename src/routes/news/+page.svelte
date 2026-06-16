<script lang="js">
    import { onMount } from 'svelte';
    import { marked } from 'marked';
    import { markedHighlight } from 'marked-highlight';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github-dark.css';
    import Topbar from '../../webpack/topbar.svelte';

    marked.use(markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    }));

    const page = 'news';
    
    let loadGetNews = $state(true);
    let errorGetNews = $state(false);
    let loadNewsFile = $state(false);
    let errorNewsFile = $state(false);
    
    let newsMarkdown = $state(''); 
    /** @type {{ file: string, dateStr: string }[]} */
    let newsList = $state([]);

    async function getNews() {
        try {
            const response = await fetch("/api/getmarkdown?type=news&act=getMarkdowns");
            if (!response.ok) throw new Error();
            return await response.json();
        } catch {
            errorGetNews = true;
            return [];
        } finally {
            loadGetNews = false;
        }
    }
    
    /** @param {string} file */
    async function getNewsFile(file) {
        loadNewsFile = true;
        errorNewsFile = false;
        try {
            const response = await fetch(`/api/getmarkdown?type=news&act=getMarkdownFile&f=${encodeURIComponent(file)}`);
            if (!response.ok) throw new Error();
            return await response.json();
        } catch {
            errorNewsFile = true;
            return { content: `Failed to load article.` };
        } finally {
            loadNewsFile = false;
        }
    }

    /** @param {string} file */
    async function selectNews(file) {
        const data = await getNewsFile(file);
        newsMarkdown = data.content;
    }
    
    onMount(async () => {
        newsList = await getNews();
    });
</script>

<main class="page">
    <Topbar page={page}/>

    <div class="main">
        <div class="sidebar background">
            <h3>News</h3>
            {#if loadGetNews}
                <p>Loading...</p>
            {:else if errorGetNews}
                <p>Error loading news.</p>
            {:else}
                <div class="fileList">
                    {#each newsList as article}
                        <button class="fileButton" onclick={() => selectNews(article.file)}>
                            {article.file.replace('.md', '')}
                        </button>
                    {/each}
                </div>
            {/if}
        </div>

        <div class="content background">
            {#if loadNewsFile}
                <p>Loading content...</p>
            {:else if errorNewsFile}
                <p>Could not load content.</p>
            {:else if newsMarkdown}
                <article class="prose">
                    {@html marked.parse(newsMarkdown)}
                </article>
            {:else}
                <p>Select one of the few news we have.</p>
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

        .sidebar {
            min-width: 250px;
            padding: 15px;
            overflow-y: auto;
            border-right: 1px solid var(--border);
            background-color: rgba(255, 255, 255, 0.025);

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
                :global(a) { color: aqua; }
            }
        }
    }
</style>