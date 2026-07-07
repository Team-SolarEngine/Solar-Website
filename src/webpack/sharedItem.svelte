<!-- here goes the card and the popup thingy i guess -->
<script>
    import { marked } from "marked";

    let { repoLines = '' } = $props();

    let data = $state(null);
    let pills = $state([]);

    let activeTab = $state('readme')
    let displayMarkdown = $derived(activeTab === 'readme' ? data?.readme : data?.changelog);
    
    let doPopOver = $state(false)
    function togglePopover() { doPopOver = !doPopOver }

    async function load() {
      if (!repoLines) throw new Error("No repo specified");
      const res = await fetch(`/api/shared?repo=${repoLines}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      if (!json?.config) throw new Error("Invalid response");
      data = json;
      buildPills(json.config);
    }

    function buildPills(config) {
      const isTruthy = (val) => ["yes", "y", "1"].includes(val);

      const pillRules = {
        canMessWithComputer: {
          true:  { text: "WILL MESS COMPUTER",  border: "rgba(210, 210, 0, 1)", bg: "rgba(180, 180, 0, 1)" },
          false: { text: "WON'T MESS COMPUTER", border: "rgba(0, 210, 0, 1)",   bg: "rgba(0, 180, 0, 1)" }
        },
        isOpenSource: {
          true:  { text: "OPEN SOURCE",         border: "rgba(0, 210, 0, 1)",   bg: "rgba(0, 180, 0, 1)" },
          false: { text: "NOT OPEN SOURCE",     border: "rgba(210, 0, 0, 1)",   bg: "rgba(180, 0, 0, 1)" }
        }
      };

      for (const [key, states] of Object.entries(pillRules)) {
        const isTrue = isTruthy(config[key]);
        const pillData = isTrue ? states.true : states.false;
        pills.push(pillData);
      }

      if (config.type) {
        pills.push({ "text": config.type, "border": "rgba(138, 0, 225, 1)", "bg": "rgba(168, 0, 255, 1)"})
      } else {
        pills.push({ "text": "Other...", "border": "rgba(138, 0, 225, 1)", "bg": "rgba(168, 0, 255, 1)"})
      }
    }

    let promise = load();
</script>

{#await promise}
    <div class="sharedItem"><span style="display: flex; justify-content: center;">Loading...</span></div>
{:then _}
    <div class="sharedItem" onclick={togglePopover}>
        <div class="important">
            <img src={data.logo} alt={data.config?.title} class="avatar"/>

            <div class="desc">
                <span class="title">{data.config?.title}</span>
                <span>{data.config?.description}</span>
                <a href={data.config?.madeByURL} class="madeBy" target="_blank">{data.config?.madeBy}</a>
            </div>
        </div>

        <div class="tags">
            {#each pills as pill}
                <span style="--si-border: {pill.border}; --si-bg: {pill.bg};" class="pill">
                    {pill.text}
                </span>
            {/each}
        </div>
    </div>

    {#if doPopOver}
    <div class="popoverModule">
        <div class="popoverUI">
            <span class="closeButton" onclick={togglePopover}>X</span>

            <img src={data.banner} alt={data.config?.title} class="banner"/>

            <div class="desc">
                <div class="info">
                    <span class="title">{data.config?.title}</span>
                    <span class="desc">{data.config?.description}</span>
                    <a href={data.config?.madeByURL} class="madeBy" target="_blank">{data.config?.madeBy}</a>
                </div>
            </div>

            <div class="markdown">
                {#if data.changelog != "Couldn't fetch changelog.md!"}
                    <div class="tabs">
                      <button
                        class:active={activeTab === 'readme'}
                        onclick={() => activeTab = 'readme'}
                      >
                        README
                      </button>
    
                      <button
                        class:active={activeTab === 'changelog'}
                        onclick={() => activeTab = 'changelog'}
                      >
                        Changelogs
                      </button>
                    </div>
                {/if}

                {@html marked(displayMarkdown)}
            </div>

            <div class="extraBottom">
                <div class="tags">
                    {#each pills as pill}
                        <span style="--si-border: {pill.border}; --si-bg: {pill.bg};" class="pill">
                            {pill.text}
                        </span>
                    {/each}
                </div>

                <div class="links">
                    {#if data.config?.externalURL}
                        <a href={data.config?.externalURL}>Extenal Link</a>
                    {/if}

                    {#if data.config?.githubURL}
                        <a href={data.config?.githubURL}>GitHub Link</a>
                    {/if}

                    {#if data.config?.downloadURL}
                        <a href={data.config?.downloadURL}>Download Link</a>
                    {/if}
                </div>
            </div>
        </div>
    </div>
    {/if}
{:catch e}
    <div class="sharedItem"><span style="color: red; display: flex; justify-content: center;">Failed to load: {e.message}</span></div>
{/await}

<style>
    .title { font-size: 1.5rem; }
    .madeBy { font-size: 0.75rem; color: rgba(255, 255, 255, 0.5); width: fit-content }

    .tags {
        display: flex;
        gap: 5px;

        .pill {
            background-color: var(--si-bg);
            border: 2px solid var(--si-border);
            padding: 5px;
            border-radius: 5px;
        }
    }

    .sharedItem {
        background-color: rgba(0, 0, 0, 0.25);
        border: 2px solid rgba(0, 0, 0, 0.5);
        padding: 15px 20px;
        width: 450px !important;
        border-radius: 10px;

        display: flex;
        flex-direction: column;
        gap: 10px;
        &:hover { border: 2px solid var(--primary); cursor: pointer; }

        .important {
            display: flex;
            gap: 5px;
            transition: border 100ms ease;
            @media screen and (max-width: 768px) { width: 100% !important; }

            .avatar {
                --size: 75px;
                width: var(--size);
                height: var(--size);
                border-radius: 5px;
            }

            .desc {
                display: flex;
                flex-direction: column;
            }
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
            width: 800px !important;
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
                width: 100%;
                border-radius: 15px;
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
                max-height: 400px;
                overflow-y: auto;
                padding: 0 10px;
                width: 95%;
                border-radius: 5px;

                :global(a) { color: aqua; }

                .tabs {
                    display: flex;
                    justify-content: center;
                    gap: 5px;
                    padding: 5px 0;
                    overflow: none;

                    button {
                        padding: 10px;
                        border: none;
                        background-color: rgba(0, 0, 0, 0.3);
                        color: white;
                        opacity: 0.5;
                        font-family: funkin;
                        width: 100%;
                        border-radius: 20px;
                        outline: none;

                        &:hover { cursor: pointer; }
                        &.active { opacity: 1; }
                    }
                }
            }

            .extraBottom {
                display: flex;
                @media screen and (max-width: 768px) { flex-direction: column; }
                width: 100%;
                align-items: center;
                gap: 10px;

                .tags { flex: 1; }

                .links {
                    display: flex;
                    justify-content: end;
                    gap: 10px;

                    a {
                        color: aqua;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>