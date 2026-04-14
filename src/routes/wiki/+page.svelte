<script lang="js">
    import Topbar from '../../webpack/topbar.svelte';
    const page = 'wiki';
</script>

<main>
    <Topbar page={page}/>

    <div class="main">
        <div class="mainContent background">
            <section class="info">
                The Wiki is not currently ready, take some commonly known bugs instead!<br>
                <br>
                <br>
                <b>Compiling Issues: </b><br>
                Unknown class MP4Handler |  Downgrade hxCodec to 2.5.1 <code>haxelib set hxCodec 2.5.1</code><br>
                <br>
                discord_rpc | "fatal error C1083: Cannot open include file: '../lib/discord-rpc/include/discord-rpc.h': No such file or directory" | do NOT directly install discord_rpc, run <code>haxelib git discord_rpc https://github.com/Aidan63/linc_discord-rpc</code> <br>
                <br>
                <br>
                <b>Game Issues: </b><br>
                <b> Windows: </b><br>
                <s>Certain lua based HUD elements are not colored correctly/at all</s> - Update to 0.6.1<br>
                <br>
                <b> Universal: </b><br>
                <s>Result Screen does not properly exit song in some cases</s> - Update to 0.6.1
            </section>
        <div>
    </div>
</main>

<style>
    .main {
        padding: 20px;
        
        code {
            background-color: rgba(0, 0, 0, 0.5);
        }
    }
</style>