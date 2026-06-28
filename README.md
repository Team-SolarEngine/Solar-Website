<!-- temporary readme till I get back home --> <!-- Fuck you dave (/j) I'm beating you to it! - Char -->

# [Solar Engine Website](https://solar-engine.netlify.app/)

## The official website for the Solar Engine | Built with Svelte.

The site is still under construction but it will be the host for the wiki as well as Solar Engine updates! Suggest things with the [Issues page](https://solarengine.net)
 or alternatively you can fork the website and make a pull request!

# TODOS:

- [ ] Make a wiki page on Engine Release
- [ ] Make a versions list with links that direct download the version
- [x] Actually add the news page

### Building the website from source

 Clone the repo then in the folder containing the website run the following:

```batch
pnpm install
pnpm run build
pnpm run preview
```

This will install all the neccassary files, build the website then host it at localhost.

> [!WARNING]
> We reccomending using `pnpm` for development, as it is faster and safer than `npm` nowadays.
