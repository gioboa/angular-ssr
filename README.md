<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/1016365/10639063/138338bc-7806-11e5-8057-d34c75f3cafc.png" alt="Universal Angular" height="320"/>
</p>

> Server-Side Rendering for Angular

A minimal Angular starter for Universal JavaScript using TypeScript and Webpack

> Angular Universal repo -> [**angular/universal**](https://github.com/angular/universal)  
> this demo is built following the [Angular-CLI Wiki guide](https://github.com/angular/angular-cli/wiki/stories-universal-rendering)

---

### You can use two different Server Side Rendering method

> Build Time Prerender(prerender) -> prerender.ts

> Server Side Rendering -> server.ts

---

### Installation

* `npm install` or `yarn`

### Development (Client-side only rendering)

* run `npm run start` which will start `ng serve`

### Production (also for testing SSR/Pre-rendering locally)

**`npm run build:ssr && npm run serve:ssr`** - Compiles your application and spins up a Node Express to serve your Universal application on `http://localhost:4000`.

**`npm run build:prerender && npm run serve:prerender`** - Compiles your application and prerenders your applications files, spinning up a demo http-server so you can view it on `http://localhost:8080`
**Note**: To deploy your static site to a static hosting platform you will have to deploy the `dist/browser` folder, rather than the usual `dist`
