<script lang="js">
    import { onMount } from 'svelte';
    import Topbar from '../../webpack/topbar.svelte';
    import SharedItem from '../../webpack/sharedItem.svelte';
    import SubmitShare from '../../webpack/submitShare.svelte';
    const page = 'shares'

    const urlToFeatured = $state("https://raw.githubusercontent.com/Team-SolarEngine/test-repo/refs/heads/main/featured-repos.txt")
    let githubLinks = $state([]);

    let sharedLoading = $state(true)
    let sharedError = $state(false)
    
    async function getShareds() {
      const response = await fetch(urlToFeatured)
      const data = await response.text()
      let arr = data.trim().split("\n");
      for (let i = 0; i < arr.length; i++)
      {
        let item = arr[i];
        if (item.startsWith("//"))
        {
            arr.splice(i, 1);   
        }
      }
      return arr.filter(repo => repo.trim() !== "")
    }

    onMount(() => {
       githubLinks = getShareds()
    })
</script>

<main>
    <Topbar page={page}/>
    
    <div class="main">
        <div class="header">
            <span class="bigText">Community Shared Mods/Scripts</span>
            <span>This is where you can share your mods, or scripts, to the solar engine website!</span>
            <SubmitShare/>
        </div>

        <div class="sharedGroup">
            {#await githubLinks}
                <span>Loading the mods...</span>
            {:then data} 
                {#each data as ghl}
                    <SharedItem repoLines={ghl} />
                {/each}
            {:catch error}
                <span>Something went wrong..! ({error.message})</span>
            {/await}
        </div>
    </div>
</main>

<style>
    main {
        height: 100vh;
    }
    
    .main {
        padding-top: 6rem;
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
            align-items: stretch;
            flex-wrap: wrap;
            justify-content: center;
            gap: 5px;
        }
    }
</style>
