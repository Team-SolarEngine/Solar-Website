<script lang="js">
    import { onMount } from 'svelte';
    import { marked } from 'marked';
    import Topbar from '../../webpack/topbar.svelte';

    const page = 'news';
    
    let loadGetNews = $state(true);
    let errorGetNews = $state(false);
    let loadNewsFile = $state(false);
    let errorNewsFile = $state(false);
    
    let newsMarkdown = $state(''); 
    let newsList = $state([]);     

    async function getNews() {
        try {
            const response = await fetch("/api/news?act=getNews");
            if (!response.ok) throw new Error();
            return await response.json();
        } catch {
            errorGetNews = true;
            return [];
        } finally {
            loadGetNews = false;
        }
    }
    
    async function getNewsFile(file) {
        loadNewsFile = true;
        errorNewsFile = false;
        try {
            const response = await fetch(`/api/news?act=getNewsFile&f=${encodeURIComponent(file)}`);
            if (!response.ok) throw new Error();
            return await response.json();
        } catch {
            errorNewsFile = true;
            return { content: `Failed to load article.` };
        } finally {
            loadNewsFile = false;
        }
    }

    async function selectNews(file) {
        const data = await getNewsFile(file);
        newsMarkdown = data.content;
    }
    
    onMount(async () => {
        newsList = await getNews();
    });
</script>

<main>
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
                    {#each newsList as file}
                        <button class="fileButton" onclick={() => selectNews(file)}>
                            {file.replace('.md', '')}
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
                <p>Select an article.</p>
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
            }
        }
    }
</style>