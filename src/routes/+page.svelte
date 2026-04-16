<script lang="js">
    import { onMount } from 'svelte';
    import Topbar from '../webpack/topbar.svelte';
    import Solar from '$lib/assets/arrowDOWN0.png'
    const page = 'home';

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
    
    onMount(() => {
        fetchEngineVersion();
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
                    <img src={Solar} alt="Arrow Down" width="100" height="100"/>
                    <section>
                        <p>Solar Engine is a FNF Engine forked from the base game.</p>
                        <p>Used to be a Psych Engine fork, but now transitioned to a base game fork.</p>
                    </section>
                </div>
            </section>
            
            <section class="downloads">
                <a
                    href="https://github.com/Team-SolarEngine/Solar-Engine-Archive/releases/latest/"
                    target="_blank"
                >
                    Download latest ({engineVersionBuild})
                </a>
                
                <a
                    href="https://github.com/Team-SolarEngine/Solar-Engine-Archive/"
                    target="_blank"
                >
                    Go to GitHub Repository
                </a>
                
                <a
                    href="https://github.com/Team-SolarEngine/"
                    target="_blank"
                >
                    Go to GitHub Organization
                </a>
            </section>
        </div>
        
        <div class="background meetthedevs">
            <h1>Meet the devs!</h1>
            <div class="devs">
                <div class="dev">
                    <a href="https://codedave.pages.dev/">
                        <img src="https://codedave.pages.dev/assets/images/Daveberry%20Wave.png" alt="Daveberry" width="150">
                        <h2 class="daveberry">Daveberry</h2>
                        <p>Former developer. Creator of the engine, and lead developer of the website.</p>
                    </a>
                </div>
                
                <div class="dev">
                    <a href="https://video-bot.netlify.app/">
                        <img src="https://video-bot.netlify.app/assets/images/VideoBot.png" alt="VideoBot" width="150" class="circlePFP">
                        <h2 class="videobot">VideoBot</h2>
                        <p>Lead developer. Creator of the engine.</p>
                    </a>
                </div>
                
                <div class="dev">
                    <a href="https://baranmuzu.netlify.app/">
                        <img src="https://baranmuzu.netlify.app/assets/images/baransleep.png" alt="Baran" width="150">
                        <h2 class="baran">Baran</h2>
                        <p>Invited former developer.</p>
                    </a>
                </div>
                
                <div class="dev">
                    <a href="https://vschar-official.com/">
                        <img src="https://avatars.githubusercontent.com/u/73309364?v=4?s=400" alt="Char" width="150">
                        <h2 class="char">Char</h2>
                        <p>Invited lead developer.</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .main {
        padding: 20px;
        
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
    }
    
    .meetthedevs {
        margin-top: 10px;
        
        .devs {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 10px;
            
            .dev {
                width: 15rem;
                text-align: center;
                
                a {
                    text-decoration: none;
                    color: white;
                } .circlePFP {
                    border-radius: 50%;
                }
                
                .daveberry {
                    color: #008BFF;
                } .videobot {
                    color: #00FFFF;
                } .baran {
                    color: #00FF00;
                } .char {
                    color: #FF8800;
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
