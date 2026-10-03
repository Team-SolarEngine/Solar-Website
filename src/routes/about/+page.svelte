<script>    
import Topbar from '../../webpack/topbar.svelte';
const page = 'about engine';
</script>

<main>
    <Topbar page={page}/>

    <div class="hero">
        <div class="main" style="margin-left: 20vw; margin-right: 20vw; color: #FF8800 background-color: #B8B8B8">
            Solar Engine is a from "scratch" engine built on top of Base 0.2.8 (The Newgrounds preview.)

            As of right now the only published version is a fork of Psych 0.6.3 that adds modcharting, as well as backports some features (like note rgb coloring) from 0.7+ <br>
            The only maintainer of the Fork is <a href="https://github.com/CharGoldenYT">CharGoldenYT</a><br><br>

            The new 0.2.8 based version will release as 1.0 and potentially be the last major update, with the rest of the updates focusing on small improvements and bugfixes.
        </div>
    </div>
</main>

<style>
    .main {
        --margin_from_others: 10px;
        margin-bottom: 20px;
        padding: 10px;

        .mainContent {
            display: flex;
            flex-direction: column;
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
    
    .pad { padding: 10px; }
    @keyframes backdropillusion {
    to { background-position: top 118px left 118px; }
}

    .background {
        background-color: rgba(0, 0, 0, 0.2);
        padding: 10px;
        border-radius: 20px;
        border-top: 1px solid var(--border);
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
</style>