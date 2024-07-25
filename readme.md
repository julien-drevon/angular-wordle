

C'est fait en angular, y a pas de logique de jeu pour l'instant, j'ai tout fait en tdd, j'ai mis de la clean archi, et c'est testable dans le storybook en utilisant les fake de tests

On pourra faire un vrai moteur de jeu et le connecter sans effort et sans changer le front et de pouvoir jouer dans le storybook.
On pourra montrer que l'on peeut carrement faire un serveur toujours sans rien changer



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
on ecrit les comportemet qui font emmergé le design applicatig et le view modele c'est à dire le use case qui init la grille puis on ecrit les comportement du templates. On ne s'occupe que de la grille

On ecrit la story, on corrige l'affichage du template

# refacto

on deplace les elements, on fait propre

# On ajoutte le presenter (clean archi)

une fois que le css est propre et que l'on a le viewModel, on fait emmerger le presenter si on souhaite faire de la clean archi, cette étape n'est pas indispensable en tant que telle.

# On ajoutte des comportement au jeu

une fois que le css est propre et que l'on a le viewModel, on fait emmerger le presenter si on souhaite faire de la clean archi, cette étape n'est pas indispensable en tant que telle.

On ajoute l'input et le boutton pour faire la proposition. On profite de refacto le design des méthodes si i y a besoin.
On corrige le css pour avoir quelque chose qui se rapproche de ce que l'on souhaite.

On fait le scenario une partie gagnante en quelques coup, on utilise un fake sans intelligence qui réalise le besoin. 
La story : "Partie gagnante en 2 coups exemple" utilise ce fake. 

On termine avec la partie perdante ebn utilisant un fake associé, on fait également une story pour vérifier.

# Debuter ajout d'un moteur

On va commencer par faire un peu de travail de refacto, on va creer un presenter abstrait  qui utilise la methodes view codée précédement, on va rendre la methode present abstraite.
On va implementé cette méthode en utilisant le précédent code, on verifie que rien n'a été cassé.

On créer un moteur dans un coin, qui est indépendant et a sa propore logique. (on peut faire ca en TDD london)

# Adapter l'engine

pour adapter l'engine on va créer un scénario qui va prendre l'engine et le "vrai" presenter qui sera utilisé dans le vrai jeu.
On fait emmerger un adapter qui implémente dans mon cas le IGameDriver et on ecrit nos objectif, on implémente ainsi la methode presentData de notre presenter.

# On verifie dans le storybook

Enfin on créer une story qui va faire appel a notre adapter et notre nouveau presenter, on lance et ca doit marcher !!!