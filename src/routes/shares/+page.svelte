<script lang="js">
    import { onMount } from 'svelte';
    import Topbar from '../../webpack/topbar.svelte';
    const page = 'shares'

    const urlToFeatured = $state("https://raw.githubusercontent.com/Team-SolarEngine/test-repo/refs/heads/main/featured-repos.txt")
    let githubLinks = $state([]);
    
    async function getShareds() {
      try {
        const response = await fetch(urlToFeatured)
        const data = await response.text()
        const repoLines = data.trim().split("\n")

        const results = []
        for (const repo of repoLines) {
          if (!repo) continue
          const res = await fetch(`/api/shared?repo=${repo}`)
          const json = await res.json()
          
          if (json && json.config) {
            results.push(json)
          }
        }

        return results
      } catch(e) {
        console.error(e)
        return []
      }
    }

    onMount(async () => {
       githubLinks = await getShareds()
    })
</script>

<main>
    <Topbar page={page}/>
    
    <div class="main background">
        <div class="header">
            <span class="bigText">Community Shared Mods/Scripts</span>
            <span>This is where you can share your mods, or scripts, to the solar engine website!</span>
        </div>

        <div class="sharedGroup">
            {#if githubLinks}
                {#each githubLinks as ghl}
                    <div class="sharedItem">
                        <img src={ghl.logo} alt={ghl.config?.title} class="avatar"/>

                        <div class="desc">
                            <span class="title">{ghl.config?.title}</span>
                            <span>{ghl.config?.description}</span>
                        </div>
                    </div>
                {/each}
            {:else}
                <span>Failed to get repositories...</span>
            {/if}
        </div>
    </div>
</main>

<style>
    main {
        height: 100vh;
    }
    
    .main {
        display: flex;
        flex-direction: column;
        gap: 25px;
    
        .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 10px;
        }

        .sharedGroup {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-wrap: wrap;
            gap: 5px;

            .sharedItem {
                display: flex;
                gap: 5px;
                background-color: rgba(0, 0, 0, 0.25);
                border: 2px solid rgba(0, 0, 0, 0.5);
                padding: 15px 20px;
                width: 450px !important;
                border-radius: 10px;
                transition: border 100ms ease;

                &:hover { border: 2px solid var(--primary); }

                .avatar {
                    --size: 75px;
                    width: var(--size);
                    height: var(--size);
                }
                
                .desc {
                    display: flex;
                    flex-direction: column;

                    .title {
                        font-size: 1.5rem;
                    }
                }
            }
        }
    }
</style>
