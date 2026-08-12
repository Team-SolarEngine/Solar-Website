<script>
    let doPopOver = $state(false);
    let githubUrl = $state('');
    let message = $state('');

    async function submitShares() {
      if (!githubUrl) return message = "WHAT IS WRONG WITH YOU.\nWHY ARE YOU BLUE.";

      try {
        const response = await fetch('https://solar-pendings.eu1.netbird.services/send_shares', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "url": githubUrl
          })
        })

        if (!response.ok) { message = `Something went wrong. Either the server has died, or something else went wrong... Please contact the developers!` }
        else { message = `Something went right! Your share is now pending...` }
      } catch(e) {
        message = e.message
      }
    }
    
    function togglePopover() { doPopOver = !doPopOver }
</script>

<main style="margin-top: 10px;">
    {#if !doPopOver}
        <button onclick={() => togglePopover()}>Submit a share</button>
    {:else}
        <div class="modal">
            <span>
                Looks like you're trying to submit a share. Nice! <br/>
                You should probably <a href="https://github.com/Team-SolarEngine/Solar-Website/blob/main/static/news/Shares%20Mods⁄Scripts.md">read this first</a>. <br/>
            </span>
            
            <input type="text" bind:value={githubUrl} placeholder="https://github.com/Team-SolarEngine/test-repo">

            <div>
                <button onclick={() => submitShares()}>Submit</button>
                <button onclick={() => togglePopover()}>Close Modal</button>
            </div>

            <span>{@html message.replace(/\n/g, '<br/>')}</span>
        </div>
    {/if}
</main>

<style>
    main {
        button, input {
            padding: 10px 15px;
            background-color: rgba(0, 0, 0, 0.25);
            border: 2px solid rgba(0, 0, 0, 0.5);
            color: white;
            font-family: funkin;
            border-radius: 5px;
            outline: none;
            &:hover, &:focus { border: 2px solid var(--primary); }
        }

        .modal {
            padding: 10px 15px;
            background-color: rgba(0, 0, 0, 0.25);
            border: 2px solid rgba(0, 0, 0, 0.5);
            color: white;
            border-radius: 5px;

            display: flex;
            flex-direction: column;
            gap: 10px;
            
            input { @media screen and (min-width: 768px) { width: 350px; } }
            a { color: aqua; }
        }
    }
</style>