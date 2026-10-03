<script lang="js">
    import { onMount } from 'svelte';
    import Topbar from '../webpack/topbar.svelte';
    const page = 'home';

    let githubRepos = $state([]);
    
    let engineVersionBuild = $state('null');
    const engineVersionURL = 'https://raw.githubusercontent.com/Team-SolarEngine/Solar-Engine-Archive/main/gitVersion.txt';
    
    async function fetchEngineVersion() {
        try {
            const response = await fetch(engineVersionURL);
            
            if (response.ok) {
                engineVersionBuild = (await response.text()).trim();
                console.log('Engine version fetched successfully:', engineVersionBuild);
            } else {
                console.error('Failed to fetch engine version. Status:', response.status);
                engineVersionBuild = 'null';
            }
        } catch (error) {
            console.error('Exception while fetching engine version:', error);
            engineVersionBuild = 'null';
        }
    }

    async function fetchGithubRepos() {
      const response = await fetch("/api/github?type=repos")
      if (response.ok) { githubRepos = (await response.json()).data; }
      else { console.error('Failed to fetch GitHub repos. Status:', response.status); githubRepos_error = true; }
    }

    let downloadButtons = $derived([
      { name: `Download Engine ${engineVersionBuild}`, url: 'https://github.com/Team-SolarEngine/Solar-Engine-Archive/releases/latest' },
      { name: `Go to Engine Repository`, url: 'https://github.com/Team-SolarEngine/Solar-Engine-Archive' },
      { name: `Go to GitHub Organization`, url: 'https://github.com/Team-SolarEngine' },
      { name: `Join Discord Server`, url: 'https://discord.gg/RaHmP5fgyA' },
    ])

    const contributors = [
      { name: 'Daveberry', url: 'https://codedave.pages.dev/', role: 'Former developer. Creator of the engine, and lead developer of the website.', avatar: 'https://codedave.pages.dev/assets/images/Daveberry%20Wave.png', circlePFP: false },
      { name: 'VideoBot', url: 'https://video-bot.netlify.app/', role: 'Lead developer. Creator of the engine.', avatar: 'https://video-bot.netlify.app/images/VideoBot.png', circlePFP: true },
      { name: 'BaranMuzu', url: 'https://baranmuzu.netlify.app/', role: 'Invited former developer.', avatar: 'https://baranmuzu.netlify.app/assets/images/baransleep.png', circlePFP: false },
      { name: 'Char', url: 'https://github.com/CharGoldenYT', role: 'Invited lead developer.', avatar: 'https://avatars.githubusercontent.com/u/73309364?v=4?s=400', circlePFP: true },
    ]

    const mainRepos = [
      "Solar-Engine-Archive",
      "Solar-Website",
      "solar-lanucher",
      "solar-pending-shares-py",
      "setup-solarfiles",
    ]

    onMount(() => {
        fetchEngineVersion();
    });

    let promise = fetchGithubRepos();
</script>

<main>
    <Topbar page={page}/>

    <div class="hero">
        <div class="child">
            <img src="assets/icon.png" width="150">
            <h1>Solar FNF Team</h1>
            <span>The team that <i>tries</i> to do it's thing.</span>
        </div>

        <div class="bottom">
            scroll down to see what we do!
        </div>
    </div>

    <div class="main">
        <div class="mainContent pad">
            <section class="info">
                <div class="left">
                    <h1>The FNF Solar Team!</h1>
                </div>
                <div class="right">
                    <img src="/assets/arrowDOWN0.png" alt="Arrow Down" width="100" height="100"/>
                    <section style="display: flex; flex-direction: column; gap: 15px;">
                        <span>
                            The FNF Solar Team
                            <span class="small">formerly known as Universe Team</span>
                            is a team of people who wants to make FNF modding a <i>little</i> better.
                        </span>

                        <span>
                            That's not to say we're different from Codename, Psych, and V-slice. We just
                            want to make an engine that has customization and <i>some</i> new features.
                        </span>

                        <span>
                            This team also expands other than <i>just</i> making a FNF engine! We make
                            a dedicated FNF launcher too. Which is supported with Gamebanana!
                        </span>
                    </section>
                </div>
            </section>
            
            <section class="downloads">
                {#each downloadButtons as button}
                    <a
                        href={button.url}
                        target="_blank"
                    >
                        {button.name}
                    </a>
                {/each}
            </section>
        </div>
        
        <div class="meetthedevs pad">
            <div class="title">
                <span class="bigboi">Meet the devs!</span>
                <span>The developers and contributors behind Solar Engine.</span>
            </div>
            <div class="devs">
                {#each contributors as contributor}
                    <a class="dev" href={contributor.url}>
                        <img src={contributor.avatar} alt={contributor.name} class:circlePFP={contributor.circlePFP} width="150">
                        <h2 class={contributor.name.toLowerCase()}>
                            {contributor.name}
                        </h2>
                        <p>{contributor.role}</p>
                    </a>
                {/each}
            </div>
        </div>

        <div class="githubRepos pad">
            <div class="title">
                <span class="bigboi">GitHub Repositories</span>
                <span>The repositories with the higher opacity are the ones that are activly being maintained.</span>
                <span>Check em' out. Or don't.</span>
            </div>
            <div class="repoGroup">
                {#await promise}
                    <span>Loading repositories...</span>
                {:then _} 
                    {#each githubRepos as repo}
                        <a
                            class="repoCard"
                            class:mainRepos={mainRepos.includes(repo.name)}
                            href={repo.url}
                            target="_blank"
                        >
                            <div class="repoInfo">
                                <span class="bigText">{repo.name}</span>

                                {#if repo.description}
                                    <p>{repo.description}</p>
                                {:else}
                                    <p>No description available.</p>
                                {/if}
                            </div>
                            
                            <div class="repoDetails">
                                <span class="{repo.stars === 0 ? 'zeroStars' : ''}">{repo.stars} stars</span>
                                <span class="{repo.forks === 0 ? 'zeroStars' : ''}">{repo.forks} forks</span>
                            </div>
                        </a>
                        {/each}
                {:catch error}
                    <span>Failed to fetch repositories; {error.message}</span>
                {/await}
            </div>
        </div>
    </div>
</main>

<style>
    @keyframes sine {
        0% {
            transform: translateY(10rem);
        }
        50% {
            transform: translateY(calc(10rem - 20px));
        }
        100% {
            transform: translateY(10rem);
        }
    }

    @keyframes backdropillusion {
        to { background-position: top 118px left 118px; }
    }

    .hero {
        background: linear-gradient(to bottom, #191919, #222);
        height: 100vh;
        display: flex;
        justify-content: center;
        flex-direction: column;

        position: relative;
        isolation: isolate;

        .child {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .bottom {
            display: flex;
            flex-direction: column;
            align-items: center;
            transform: translateY(125px);
            animation: sine 2s ease-in-out infinite;
        }

        &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0.05;
            z-index: -1;
            background: url('/assets/checkers.png');
            animation: backdropillusion 5s linear infinite;
        }
    }

    .main {
        --margin_from_others: 10px;
        margin-bottom: 20px;
        padding: 10px;

        .mainContent {
            display: flex;
            flex-direction: column;

            .info {
                margin-bottom: 10px;

                .right {
                    display: flex;
                    gap: 15px;
                    
                    img {
                        animation: spin 1s linear infinite;
                    }
                }
            }
            
            .downloads {
                display: flex;
                flex-direction: row;
                @media screen and (max-width: 768px) { flex-direction: column; }
                justify-content: center;
                gap: 10px;
                
                a {
                    text-decoration: none;
                    color: white;
                    text-align: center;
                    background-color: rgba(0, 0, 0, 0.25);
                    padding: 10px;

                    border-radius: 20px;
                    border-top: 2px solid var(--border);
                    border-bottom: 2px solid transparent;

                    transition: all 200ms ease-in-out;
                } a:hover {
                    background-color: rgba(0, 0, 0, 0.5);
                    scale: 1.05;

                    border-top: 2px solid transparent;
                    border-bottom: 2px solid var(--border);
                }
            }
        }

        .meetthedevs {
            margin-top: var(--margin_from_others);
            .devs {
                display: flex;
                flex-direction: row;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
                
                .dev {
                    width: 15rem;
                    text-align: center;
                    text-decoration: none;
                    color: white;

                    transition: all 100ms linear;
                    border-top: 2px solid transparent;
                    border-bottom: 2px solid transparent;
                    padding: 5px 0;
                    border-radius: 20px;

                    .circlePFP {
                        border-radius: 50%;
                    }
                    
                    .daveberry { color: #008BFF; }
                    .videobot { color: #00FFFF; }
                    .baranmuzu { color: #00FF00; }
                    .char { color: #FF8800; }

                    &:hover {
                        scale: 1.05;
                        border-top: 2px solid rgba(255, 255, 255, 0.25);
                        border-bottom: 2px solid rgba(255, 255, 255, 0.25);
                    }
                }
            }
        }

        .githubRepos {
            margin-top: var(--margin_from_others);
            .repoGroup {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                gap: 10px;
                align-items: stretch;

                .repoCard {
                    --background-rc: rgba(0, 0, 0, 0.25);
                    --border-rc: rgba(0, 0, 0, 0.5);
                    --red-rc: rgba(225, 0, 0, 0);

                    text-decoration: none;
                    color: white;
                    background-color: var(--background-rc);
                    padding: 10px 15px;
                    border-radius: 20px;
                    transition: border 0.1s ease;
                    border-left: 2px solid var(--border-rc);
                    border-right: 2px solid var(--border-rc);
                    width: 300px !important;
                    @media screen and (max-width: 768px) { width: 100% !important; }
                    display: flex;
                    flex-direction: column;
                    height: auto;
                    align-self: auto;
                    rotate: 2deg;
                    opacity: 0.5;
                    &.mainRepos { rotate: -2deg; opacity: 1; }

                    &:hover {
                        --border-rc: var(--secondary);
                        --red-rc: rgba(225, 0, 0, 1);
                        
                        border-left: 2px solid var(--border-rc);
                        border-right: 2px solid var(--border-rc);
                        opacity: 1;
                    }

                    .repoInfo {
                        flex: 1;
                    }

                    .repoDetails {
                        display: flex;
                        align-items: center;
                        gap: 5px;

                        span {
                            background-color: var(--background-rc);
                            border-bottom: 5px solid var(--border-rc);
                            padding: 5px 10px;
                            border-radius: 20px;
                            transition: border 0.1s ease;
                        } span:last-child { transition-delay: 0.1s; }
                        .zeroStars { border-color: var(--red-rc); }
                    }
                }
            }
        }
    }
    
    @keyframes spin {
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }
    
    @media screen and (max-width: 768px) {
        .main {
            .mainContent {
                flex-direction: column;
            }
        }
        
        .meetthedevs {
            .devs {
                flex-direction: column;
                align-items: center;
            }
        }
    }

    .title {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;

        .bigboi {
            font-size: 2rem;
        }
    }

    .background {
        background-color: rgba(0, 0, 0, 0.2);
        padding: 10px;
        border-radius: 20px;
        border-top: 1px solid var(--border);
    }
    .pad { padding: 10px; }
</style>
