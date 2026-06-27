<script lang="js">
    import { onMount } from 'svelte';
    import Topbar from '../../webpack/topbar.svelte';
    import sharedItem from '../../webpack/sharedItem.svelte'
    import SharedItem from '../../webpack/sharedItem.svelte';
    const page = 'shares'

    const urlToFeatured = $state("https://raw.githubusercontent.com/Team-SolarEngine/test-repo/refs/heads/main/featured-repos.txt")
    let githubLinks = $state([]);

    let sharedLoading = $state(true)
    let sharedError = $state(false)
    
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
        sharedError = true
        return []
      } finally {
        sharedLoading = false
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
                    <SharedItem
                        logo={ghl.logo}
                        banner={ghl.banner}
                        readme={ghl.readme}
                        config={ghl.config}
                    />
                {/each}
            {:else if sharedError}
                <span>Failed to get mods...</span>
            {:else if sharedLoading}
                <span>Loading the mods...</span>
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
            text-align: center;
        }

        .sharedGroup {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
            gap: 5px;
        }
    }
</style>
