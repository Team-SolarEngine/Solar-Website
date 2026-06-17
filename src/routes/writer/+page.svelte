<script>
    let text = $state('');
    let creator = $state('');
    let fileName = $state('');

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
    
    function copyToClipboard(type) {
      let realFileName = fileName.replace(/\s+/g, '%20')
      
      let format = `**Date**: ${getFormattedDate()} <br/>
**Creator**: ${creator} <br/>
**Raw File**: https://github.com/Team-SolarEngine/Solar-Website/blob/main/static/${type}/${realFileName}.md

---

${text}
`
      navigator.clipboard.writeText(format);
    }
</script>

<main>
    <span>welcome to this stupid shit lmao</span>
    <textarea placeholder="We've gotten some improvements... bla bla bla hello world!" bind:value={text}></textarea>
    <section>
        <input type="text" placeholder="Creator" bind:value={creator} />
        <input type="text" placeholder="File name" bind:value={fileName} />
    </section>
    <section>
        <button onclick={() => copyToClipboard("wiki")}>Copy for Wiki</button>
        <button onclick={() => copyToClipboard("news")}>Copy for news</button>
    </section>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        gap: 20px;

        textarea, input, button {
            background-color: rgba(0, 0, 0, 0.2);
            border: none;
            color: white;
            padding: 10px;
            border-radius: 10px;
            transition: box-shadow 0.1s ease-in-out;
        } textarea:focus, input:focus, button:hover {
            outline: none;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        textarea {
            min-height: 250px;
            min-width: 400px;
        }

        section {
            display: flex;
            gap: 10px;
        }
    }
</style>