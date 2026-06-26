<script lang="js">
    import { onMount } from 'svelte';
    import Topbar from '../webpack/topbar.svelte';
    const page = 'home';

    let githubRepos = $state([]);
    let githubRepos_loading = $state(true);
    let githubRepos_error = $state(false);
    
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
      try {
        const response = await fetch("/api/github?type=repos")
        if (response.ok) { githubRepos = (await response.json()).data; }
        else { console.error('Failed to fetch GitHub repos. Status:', response.status); githubRepos_error = true; }
        githubRepos_loading = false;
      } catch (error) {
        console.error('Exception while fetching GitHub repos:', error);
        githubRepos_error = true;
      }
    }

    let downloadButtons = $derived([
      { name: `Download Latest ${engineVersionBuild}`, url: 'https://github.com/Team-SolarEngine/Solar-Engine-Archive/releases/latest' },
      { name: `Go to GitHub Repository`, url: 'https://github.com/Team-SolarEngine/Solar-Engine-Archive' },
      { name: `Go to GitHub Organization`, url: 'https://github.com/Team-SolarEngine' },
      { name: `Join Discord Server`, url: 'https://discord.gg/RaHmP5fgyA' },
    ])

    const contributors = [
      { name: 'Daveberry', url: 'https://codedave.pages.dev/', role: 'Former developer. Creator of the engine, and lead developer of the website.', avatar: 'https://codedave.pages.dev/assets/images/Daveberry%20Wave.png', circlePFP: false },
      { name: 'VideoBot', url: 'https://video-bot.netlify.app/', role: 'Lead developer. Creator of the engine.', avatar: 'https://video-bot.netlify.app/_app/immutable/assets/VideoBot.BjIP8NLq.png', circlePFP: true },
      { name: 'BaranMuzu', url: 'https://baranmuzu.netlify.app/', role: 'Invited former developer.', avatar: 'https://baranmuzu.netlify.app/assets/images/baransleep.png', circlePFP: false },
      { name: 'Char', url: 'https://vschar-official.com/', role: 'Invited lead developer.', avatar: 'https://avatars.githubusercontent.com/u/73309364?v=4?s=400', circlePFP: false },
    ]
    
    onMount(() => {
        fetchEngineVersion();
        fetchGithubRepos();
    });
</script>

<main>
    <Topbar page={page}/>
    
    <div class="main">
        <div class="mainContent background">
            <section class="info">
                <div class="left">
                    <h1>Welcome to Solar Engine</h1>
                </div>
                <div class="right">
                    <img src="/assets/arrowDOWN0.png" alt="Arrow Down" width="100" height="100"/>
                    <section>
                        <p>Solar Engine is a FNF Engine forked from the base game.</p>
                        <p>0.6 is the last major version of the Psych Fork, 1.0+ is forked from 0.2.8</p>
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
        
        <div class="background meetthedevs">
            <h1>Meet the devs!</h1>
            <div class="devs">
                {#each contributors as contributor}
                    <div class="dev">
                        <a href={contributor.url}>
                            <img src={contributor.avatar} alt={contributor.name} class:circlePFP={contributor.circlePFP} width="150">
                            <h2 class={contributor.name.toLowerCase()}>
                                {contributor.name}
                            </h2>
                            <p>{contributor.role}</p>
                        </a>
                    </div>
                {/each}
            </div>
        </div>

        <div class="background githubRepos">
            <h1>GitHub Repositories</h1>
            <div class="repoGroup">
                {#if githubRepos.length > 0}
                    {#each githubRepos as repo}
                        <a class="repoCard" href={repo.url}>
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
                                <span class="{repo.stars === 0 ? 'zeroStars' : ''}">{repo.forks} forks</span>
                            </div>
                        </a>
                    {/each}
                {:else if githubRepos_error}
                    <p>Failed to fetch repositories. Check the console for more details.</p>
                {:else if githubRepos_loading}
                    <p>Fetching the repositories...</p>
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
    .main {
        .mainContent {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            
            .info {
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
                flex-direction: column;
                justify-content: center;
                gap: 10px;
                
                a {
                    text-decoration: none;
                    color: white;
                    text-align: center;
                    background-color: rgba(0, 0, 0, 0.25);
                    padding: 10px;
                    border-radius: 5px;
                    transition:
                        background-color 100ms linear,
                        scale 100ms linear;
                } a:hover {
                    background-color: rgba(0, 0, 0, 0.5);
                    scale: 1.05;
                }
            }
        }

        .meetthedevs {
            .devs {
                display: flex;
                flex-direction: row;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
                
                .dev {
                    width: 15rem;
                    text-align: center;
                    
                    a {
                        text-decoration: none;
                        color: white;
                    } .circlePFP {
                        border-radius: 50%;
                    }
                    
                    .daveberry { color: #008BFF; }
                    .videobot { color: #00FFFF; }
                    .baranmuzu { color: #00FF00; }
                    .char { color: #FF8800; }
                }
            }
        }

        .githubRepos {
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
                    border-radius: 10px;
                    transition: border 0.1s ease;
                    border: 2px solid var(--border-rc);
                    width: 300px !important;
                    @media screen and (max-width: 768px) { width: 100% !important; }
                    display: flex;
                    flex-direction: column;
                    height: auto;
                    align-self: auto;

                    &:hover {
                        --border-rc: var(--secondary);
                        --red-rc: rgba(225, 0, 0, 1);
                        
                        border: 2px solid var(--border-rc);
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
                            border: 2px solid var(--border-rc);
                            padding: 5px 10px;
                            border-radius: 5px;
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
</style>
