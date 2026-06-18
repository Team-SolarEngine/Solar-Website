**Date**: 14th June 2026 <br/>
**Creator**: Daveberry Cricket Blueson <br/>
**Raw File**: https://github.com/Team-SolarEngine/Solar-Website/blob/main/static/wiki/Common%20Issues.md

---

Here are some known/common issues with Solar Engines. These may be out of date, or new issues has arose somewhere. We are not fast enough to keep up, please shut up. But please tell us bugs in the [Discord server](https://discord.gg/RaHmP5fgyA), since we're mostly active there.

# NOTES
- Development is slow, everyone in the team is busy with IRL, don't come after us.
- [Char](https://vschar-official.com/) is the only person developing the Archived version of Solar Engine. | Hi Char here, I also have like 50 million unfinished projects that I bounce between lmao.

## Compiling Issues
### Unknown class MP4Handler
- Downgrade hxCodec to 2.5.1: `haxelib set hxCodec 2.5.1`

### `discord_rpc` fatal error C1083
- Error Output: `fatal error C1083: Cannot open include file: '../lib/discord-rpc/include/discord-rpc.h': No such file or directory"`
- Solution: Do NOT directly install discord_rpc, run `haxelib git discord_rpc https://github.com/Aidan63/linc_discord-rpc`

If you still get this error after using git, run `haxelib remove discord_rpc` then run `haxelib git discord_rpc https://github.com/Aidan63/linc_discord-rpc` again.

## Game Issues
### Windows:
- ~~Certain lua based HUD elements are not colored correctly/at all~~
  - Issue has been fixed. Update to 0.6.1
- ~~Changing volume crashes the game~~
  - Recent update has been fixed. Re-install 0.6.1 if you encounter this

### Universal:
- ~~Result Screen does not properly exit song in some cases~~
  - Issue has been fixed. Update to 0.6.1
