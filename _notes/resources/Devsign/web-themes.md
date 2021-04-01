## What I want is choice in the matter of themes.

- What if you could walk into a field of flowers and then with a blink, change the whole field into any flower of any color or fragrance you like. #toExpand

As a user I want to see an new interface, choose a color palette I like, either by choosing a color and having the interface fill in the blanks, or by choosing a harmoniously design palette.

- Either way I want the site/app/interface to remember my preference when I return.
- And I would love the interface to predict whether I prefer a certain discrete look (like "dark mode" or "light mode") so I don't have to make that choice again at all.

## All aboard the logic train

- When a guests arrives we check for past prefs.
  - If they have localStorage prefs from us, we use those.
    - `window.localStorage.getItem('theme')`
  - If they have matchMedia prefs, we use those.
    - `window.matchMedia("(prefers-color-scheme: ${theme-name}").matches`
  - If they don't have prefs, we can play with the [[browser-time]]
    - and if we know the local time of day, we use day or night mode
    - and we can't know the local time, we use default mode
- If the user sets a theme preference or chooses a theme, we save and apply the pref
  - Store the value in localStorage
    - `window.localStorage.setItem('theme', 'theme-name')`
  - Apply the pref throughout the app
    - as a `[data-theme]` on the HTMLElement
    - as a `.theme-${name}` class on the `body`

## Back to the Station - the theme switch on [[nameless]]

```javascript
checkThemePref() {
    let savedTheme, mediaPref, dayOrNight;
    const tiempo = new Date().getHours();
    if (window.localStorage) { savedTheme = localStorage.getItem("theme") || "default" }
    if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
        mediaPref = window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day"
    }
    if (tiempo) dayOrNight = tiempo < 7 && tiempo > 19 ? "night" : "day";

    return savedTheme || mediaPref || dayOrNight;
}
```

On [[nameless]] I got to feeling that the themes ought to feel natural, to evoke familiar fundamental conditions: light and dark, day and night, wet and dry, sea and sky and land. Here in [[commonplace]] we're exploring this further, and more easily thanks to the [next-themes](https://github.com/pacocoursey/next-themes) library. Yes I've ripped out my handroll and gone with the herd 😝

[//begin]: # "Autogenerated link references for markdown compatibility"
[browser-time]: browser-time "browser time"
[commonplace]: ../../projects/commonplace "Commonplace"
[//end]: # "Autogenerated link references"