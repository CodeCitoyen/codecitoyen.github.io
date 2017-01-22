# Site de la Nuit du Code Citoyen

## Installation en local

Une fois que vous avez ruby d'installé sur votre machine :

```bash
bundle Install
```

Lancer le serveur (avec les spécificités de conf en local, qui se trouvent dans `_config.dev.yml`)
```bash
jekyll serve --config _config.yml,_config.dev.yml
```

Votre site est visible sur [localhost:4000](localhost:4000)


## Composants

Toutes les pages types issues du thème de base ([Lavar](http://preview.themeforest.net/item/lavar-portfolio-agency-jekyll-theme/full_screen_preview/15679321?ref=gundoel007)) se trouvent dnas le dossier `gabarits`.


## Resources

- Pour la configuration des liens sur des gh-pages : [Configuring Jekyll for User and Project GitHub Pages](http://downtothewire.io/2015/08/15/configuring-jekyll-for-user-and-project-github-pages/)
