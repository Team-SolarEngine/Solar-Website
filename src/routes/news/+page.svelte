<script lang="js">
    import Topbar from '../../webpack/topbar.svelte';
    const page = 'news';
</script>
<main>
 <Topbar page={page}/>

  <span> This is where the Solar Engine news would go...<br><br>IF I HAD ONE!</span>
</main>

<style>
    span {
        left: 50%;
        top: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
    }
</style>
