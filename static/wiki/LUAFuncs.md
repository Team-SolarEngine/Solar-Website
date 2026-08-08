**Date**: 8th August 2026 <br/>
**Creator**: CharGoldenYT <br/>
**Raw File**: https://github.com/Team-SolarEngine/Solar-Website/blob/main/static/wiki/LUAFuncs.md

---

# Custom LUA Funcs:

```haxe
windowSize(sizeX:Float, sizeY:Float, duration:Float, ease:String)
```

Sets the window size.

```haxe
windowSizeX(sizeX:Float, duration:Float, ease:String)
```

Ditto but only the Width

```haxe
windowSizeY(sizeY:Float, duration:Float, ease:String)
```

Ditto but only the Height

```haxe
windowPos(x:Float, y:Float, duration:Float, ease:String)
```

Sets the X and Y position of the window

```haxe
windowPosX(x:Float, duration:Float, ease:String)
```

Ditto, but just the X

```haxe
windowPosY(y:Float, duration:Float, ease:String)
```

Ditto but just the Y

```haxe
resetWindow(size:Bool, pos:Bool, duration:Float, ease:String)
```

resets the window

`size` : Whether to reset the window size

`pos` : Whether to reset the window's position

## Note: The following are upcoming functions in 0.6.2!

```haxe
getPref(prefName:String, defaultValue:Dynamic):Dynamic
```

gets the specified setting, and if it's not found returns the default value.

```haxe
setPref(prefName:String, newValue:Dynamic)
```

Sets the specified setting, if it exists.

```haxe
get_override(name:String)
```

let's you get an overrided setting if it exists.

```haxe
set_override(name:String, value:Dynamic)
```

overrides a setting if it is overrideable
