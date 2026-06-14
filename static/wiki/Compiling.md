**Date**: 14th June 2026 <br/>
**Creator**: Daveberry Cricket Blueson <br/>
**Raw File**: https://github.com/Team-SolarEngine/Solar-Website/blob/main/static/wiki/Compiling.md

---

## To compile Solar Engine
You need the following tools:
- [Haxe](https://haxe.org/)
- [git](https://git-scm.com/install/)
- [Visual Studio 2019 Community](https://visualstudio.microsoft.com/vs/older-downloads/)
  - Only required for windows. For MacOS and Linux, you can pass this.
  - Required packages:
    - Desktop development with C++

## Once the required tools are set up
Run this command in the terminal to get all the dependencies:
```bash
haxelib git discord_rpc https://github.com/Aidan63/linc_discord-rpc
haxelib install flixel-addons 3.2.0 && haxelib set flixel-addons 3.2.0
haxelib install flixel-ui 2.5.0 && haxelib set flixel-ui 2.5.0
haxelib install flixel 5.5.0 && haxelib set flixel 5.5.0
haxelib install hscript 2.7.0 && haxelib set hscript 2.7.0
haxelib git hxCodec https://github.com/polybiusproxy/hxCodec
haxelib git hxcpp https://github.com/HaxeFoundation/hxcpp.git
haxelib install lime 8.1.0 && haxelib set lime 8.1.0
haxelib git linc_luajit https://github.com/superpowers04/linc_luajit
haxelib install openfl 9.5.1 && haxelib set openfl 9.5.1
```

If there's a prompt about `lime` needing installing as a command line tool, just press `y` to accept. This is required for the `lime` command to be available.

## Once all the dependencies are installed
Clone the Solar Engine repository:
```bash
git clone https://github.com/Team-SolarEngine/Solar-Engine-Archive.git
```

Change into the repository directory:
```bash
cd Solar-Engine-Archive
```

Compile and test the game:
```bash
lime test windows
```

If the game compiles and runs successfully, you're ready to start working on Solar Engine! If not and you're stuck on a error, you can ask for help in the [Solar Engine Discord](https://discord.gg/) or search for the error message online.
