**Date**: 14th June 2026 <br/>
**Creator**: Daveberry Cricket Blueson <br/>
**Raw File**: https://github.com/Team-SolarEngine/Solar-Website/blob/main/static/wiki/Modcharting.md

---

Here's how to use the modcharting tool.

# NOTES:
- We did not make the modchart tool. Original developers goes to [TheZoroForce](https://github.com/TheZoroForce240/FNF-Modcharting-Tools) and [EdwhakKB](https://github.com/EdwhakKB/FNF-Modcharting-Tools). All props go to them.
- The modchart editor does not combine with `.lua`. Having both is fine, but the Modchart editor doesn't show the `.lua` events.
- The instructions here may change when 1.0.0 launches.

There are two ways to create a modchart. Using the modchart editor, or using pure code with `.lua` files.

## Modchart Editor
When launched into a song, press `9` in your keybind (or a different keybind you set in your controls) to open the modchart editor. Here's what the modchart editor looks like:

<img src="/wiki/pictures/Modcharting_Preview.png" alt="Modchart Editor" width="800"/>

Things you need to know:
- The top is the events for all the modcharts events you've placed.
- The main content is where you edit the modchart events.
- The playstate arrows is for the preview when you check the modchart.

This is absolutely great for beginners learning on how to modchart or just not knowing how to code modcharts. But this is generally not flexible for people who go beyond the basics. Most advanced modcharts go to the next level:

## Pure Code with `.lua` files
### WARNING
This is not reccomended for people who just started learning modcharting. It requires a need for learning on how to code with `.lua` and the modcharting tool.

Inside of a `data` song file. Example: `assets/data/dad-battle/`, create a `modchart.lua` file. Once inside of the file, you're gonna need to copy the following for a template:
```lua
-- Q: Why onCreatePost instead of onStepHit or onBeatHit?
-- A: The modchart tool handles the event timeline and is much better. Ease events dont get screwed up when lag spikes occur or when you skip time (also onStepHit and onBeatHit is just bad in general...)
function onCreatePost()
    addModcharts()
    startModchartEvents()
end

function addModcharts()
    startMod('reverse', 'ReverseModifier', '', -1)
    --       ^-------^  ^---------------^  ^^  ^^  
    --         Name        Class          Type  ↳ Playfields
    --                                  > player        > -1 = all playfields
    --                                  > opponent
    --                                  > lane
end

function startModchartEvents()
    --    Duration
    --  Beat |   Easing
    --   vv  v  v-------v
    ease(15, 2, 'expoOut', [[
        1, reverse
    ]])
    --  ^  ^-----^
    --Value Name
end
```

---

If you can't read (for some reason), check out these videos and also an example.
- How to use the modchart editor: https://www.youtube.com/watch?v=sO_MZjhmuiY
- Using `lua` to for making modcharts: https://www.youtube.com/watch?v=j8B9xo4tM_g
  - Part 2: https://www.youtube.com/watch?v=hXC80EUsadE
- Creating custom modifies in HScript: https://www.youtube.com/watch?v=0wAi7aUI4hY
- Code examples: https://github.com/EdwhakKB/FNF-Modcharting-Tools/blob/main/examples/psych/script.lua

They're great for learning how to make modcharts. If you're ever stuck, feel free to ask for help in the [Discord server](https://discord.gg/RaHmP5fgyA)! All developers there *might* be active and *might* be happy to help.
