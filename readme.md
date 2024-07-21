


Les tests sont dans l'ordre de réalisation.

## first steps

# Create project  

```
ng new wordle 
```

# add storybook 
```
    cd wordle 
    npx storybook init
```

# utiliser jest

https://medium.com/@megha.d.parmar2018/angular-unit-testing-with-jest-2023-2676faa2e564


# premeir component : une case

```
     ng generate component wordle-case
```
## ecrire le code du comportement
ecrire le composant en TDD, ne pas ecrire le css.

## ecrire la story
on ecrit la premiere story
on lance le storybook :

```
     npm run storybook
```
on définit les styles
on ecrit toutes les story bad good placement en utlisant le storybook pour avoir un retour à l'affichage


# deuxieme component : une ligne
```
ng generate component wordle-line 
```
On fait apparaitre une ligne et la notion de WordleLetter. On refactorise pour avoir le for dans le template.
On affiche dans le storybook on modifie le style
On ajoute le comportement que toute la ligne est good.

# troisieme component : le jeu
```
ng generate component wordle-game 
```
on ecrit les comportemet qui font emmergé le design applicatig et le view modele, puis on ecrit les comportement du templates

# refacto

on deplace les elements, on fait propre

