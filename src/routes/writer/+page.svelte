<script>
    import { onMount } from 'svelte';
    import OverType from 'overtype';

    let {
        value = '',
        onChange = () => {}
    } = $props();
    
    let container;
    let editor;
    let markdown = `The quick brown fox jumps over the lazy dog.`

    let writer = ``
    let fileName = ``

    onMount(() => {
        [editor] = new OverType(container, {
            value: markdown,
            theme: 'dark',
            // toolbar: true,
            showStats: true,
            onChange: (value) => {
                markdown = value;
                onChange(markdown);
            }
        });
      
        return () => editor?.destroy();
    });

    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
        }
    }

    function getFormattedDate() {
        const date = new Date();
        const day = date.getDate();
        
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const year = date.getFullYear();
      
        return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
    }

    function downloadMD(type) {
        let realFileName = fileName.replace(/\s+/g, '%20')
            
        let format = `**Date**: ${getFormattedDate()} <br/>
**Creator**: ${writer} <br/>
**Raw File**: https://github.com/Team-SolarEngine/Solar-Website/blob/main/static/${type}/${realFileName}.md

---

${markdown}`

        const blob = new Blob([format], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName || `${realFileName}.md`;
        a.click();
        URL.revokeObjectURL(url);
    }
</script>

<main>
    <div class="editor" bind:this={container}></div>

    <div class="bottom">
        <input type="input" bind:value={writer} placeholder="Writer" />
        <input type="input" bind:value={fileName} placeholder="File Name" />
        <button onclick={() => downloadMD('news')}>Get News</button>
        <button onclick={() => downloadMD('wiki')}>Get Wiki</button>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        height: 100dvh;

        .editor {
            flex: 1;
        }

        .bottom {
            display: flex;
            input, button {
                width: 100%;
                padding: 8px;
                background: #1D2D3E;
                border: none;
                color: white;
                border-right: 1px solid #2a3f52;
                border-top: 1px solid #2a3f52;
                outline: none;
            } button {
                width: 200px;
                cursor: pointer;
            }
        }
    }
</style>