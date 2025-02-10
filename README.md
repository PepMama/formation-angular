# Formation Angular v19

## Pré-requis
- Node.js (LTS)
```
node --version
```
- Angular CLI
```
npm install -g @angular/cli
```
- Git
```
git -v
```
- JAVA (OpenJDK >= 17)
```
java --version
```
- Visual Studio Code (+ extensions)
    - Angular Language Service
    - EditorConfig
    - Extension Pack for Java
    - Spring Boot Extension Pack
- L'extension de navigateur Angular DevTools

## Et c'est parti...
### Génération du projet
```
ng new kiosquitos --skip-tests
```
- stylesheet => Sass (SCSS)
- SSR / SSG => No (N)

Le flag `--skip-tests` permet de ne pas générer les fichiers `spec` : ils sont destinés aux tests automatisés, un sujet plus avancé que nous n'aborderons pas ici.

### Structure du projet

- `src` Le dossier le plus important de votre projet est peut-être le dossier src . Ce dossier contient la plupart des fichiers et dossiers sur lesquels vous travaillerez réellement pour créer votre application. Il existe d'autres fichiers et dossiers en dehors de celui-ci, mais vous n'aurez généralement pas besoin de les toucher beaucoup.
- `app` Vous trouverez le dossier app dans le dossier src, ce dossier a un niveau d'importance similaire. La majeure partie du code de votre application résidera dans ce dossier app. Au fur et à mesure que l'application se développe, nous ajouterons des dossiers de fonctionnalités supplémentaires à l'intérieur du dossier app.
- `app.component.ts`
- `app.component.html`
- `app.component.scss`

Ces éléments définissent le composant racine par défaut, qui est en quelque sorte le point d'entrée ou le conteneur de votre application. Ce composant racine unique contiendra l'intégralité de votre application et toutes les autres fonctionnalités que nous créons seront ajoutées à l'intérieur. Par défaut, nous avons trois fichiers distincts pour notre composant racine : un pour la classe/logique, un pour le modèle et un pour les styles.
- `app.config.ts`
- `app.routes.ts`

Les informations de routage de l'application sont définies dans `app.routes.ts`.

Le fichier `app.config.ts` définit diverses informations de configuration pour l'application. L'une de ces configurations fournit les routes que nous créons pour le routeur.

- `main.ts`

Ce fichier est responsable du démarrage de notre application. La méthode de démarrage prend en paramètre le composant racine et la config pour lancer l'application.

- `/public`

C'est un peu l'équivalent d'un dosser `/assets`, il est utilisé pour stocker les images / fonts / icônes / etc...

- `styles.scss`

C'est le fichier de style global, attention donc, les styles placés ici affecteront tous vos composants.

- `/dist`

Le dossier dist contient la sortie du processus de build (`ng build`) de l'application. Le code contenu dans ce dossier est le code qui est réellement exécuté lorsqu'un utilisateur utilise l'application. Il est important de ne pas modifier le code de ce dossier, car il sera écrasé à chaque fois qu'une nouvelle build est créée.

- `.editorconfig`

fichier utilisé par VScode pour formatter le code

- `.gitignore`

fichiers ignorés par Git

- `angular.json`

fichier de configuration du projet Angular

- `package.json`
- `package-lock.json`

fichiers de gestion des dépendances `npm`

- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.spec.json`

Ces 3 fichiers représentent la configuration de Typescript. Le 1er est la configuration globale, le 2ème la config propre au projet et le dernier la config pour les tests.

### Démarrer l’application
```
cd kiosquitos
ng serve
```
[http://localhost:4200/](http://localhost:4200/)

### Un peu de style
Ajoutons Bootstrap :
```bash
npm install bootstrap
```

Ouvrez le fichier `/src/styles.scss` et ajoutez
```css
@import 'bootstrap/dist/css/bootstrap.css';
```

Ouvrez le fichier `/src/app/app.component.html` et remplaçez tout par
```html
<main style="margin-top: 70px;">
  <h1 class="text-center">Kiosquitos</h1>
</main>
```

Ouvrez le fichier `/src/index.html` et changez
```html
<html lang="fr">
```

## C'est quoi un composant ?

[doc components](https://angular.dev/essentials/components)

Les composants sont les briques de notre application. Nous n'avons actuellement qu'un composant: le `root component`.
Le rôle principal de notre composant racine (`AppComponent`) est de servir de conteneur pour notre application. En règle générale, presque toutes les applications Angular ont un seul composant racine et à l'intérieur de ce composant racine se trouveront d'autres composants, qui pourraient également avoir d'autres composants, constituant ainsi un arbre de composants imbriqués.

```ts
@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
```

Un composant est en fait une classe Js surmonté d'un decorateur `@Component`, à l'intérieur duquel on trouve :
- selector : c'est le nom de la balise que nous utiliserons pour l'injecter dans le DOM
- imports : si vous avez besoin d'utiliser un autre composant à l'intérieur de celui-ci, il faut l'importer en mettant son nom dans les imports
- templateUrl : le html qui servira de template au composant
- styleUrl : le scss qui sera appliqué uniquement à ce composant

Les `@NgModule` ne sont plus utilisés, nous utiliserons maintenant des `standalone component`.

### Cycle de vie

Les composants ont un cycle de vie. Quand Angular doit afficher un composant, il commence par le construire et appelle donc le constructeur de la classe du composant. Ensuite, il passera les valeurs initiales des inputs au composant. Et enfin, si l’utilisateur navigue vers un autre composant alors il est détruit. Angular va nous permettre de réagir à ces différentes phases.

```ts
export class PizzaComponent implements OnInit, OnDestroy {
  constructor() {
    console.log("le composant est en cours de construction");
  }

  ngOnInit(): void {
    console.log("le composant est initialisé");
  }

  ngOnDestroy(): void {
    console.log("le composant va être détruit");
  }
}
```


## Templates et Signaux

### Ancienne méthode d'affichage

Avant les signaux voici comment on pouvait déclarer / afficher une variable dans un composant :

```ts
export class AppComponent {
  title = "kiosquito";
}
```
```html
<h1>{{ title }}</h1>
```

C'est ce qu'on appelle l'interpolation, la notation avec une double accolades indique à Angular qu'il s'agit d'une expression à évaluer. Ici le rendu sera :
```html
<h1>kiosquito</h1>
```

En cas de modification de la variable, le template sera mis à jour automatiquement.

### Nouvelle méthode

[doc signals](https://angular.dev/essentials/signals)

Angular est capable de détecter les modifications et les remplacements effectués sur variable JavaScript. Ce mécanisme, en revanche, est assez brutal. Il a un coût non négligeable en termes de performances, et comporte plusieurs inconvénients.

Depuis Angular 16, une révolution a démarré. Tout en supportant toujours ce mécanisme, Angular promeut maintenant un nouveau moyen de gérer l’état de l’application. Ce nouveau moyen élimine les inconvénients de l’approche brutale actuelle. Il rend la détection de changements plus efficace. Mais il impose aux développeurs d’utiliser des objets particuliers pour stocker l’état de leur application : des signaux.

- [ ] ouvrez le fichier `/src/app/app.component.ts` et modifiez la variable title

```ts
readonly title = signal("Kiosquitos");
```

Remarquez ici 2 choses :
- l'utilisation du mot-clé `signal` pour déclarer ma variable en tant que Signal
- le mot-clé `readonly`, il est conseillé de l'utiliser sur un Signal car pour réaffecter une variable Signal il ne faut surtout pas écraser le Signal existant. Le `readonly` vous protégera de cette erreur

- [ ] modifiez le fichier `/src/app/app.component.html`
```html
<h1 class="text-center">Commande de {{  title() }}</h1>
```

Ici la seule différence par rapport à une variable classique c'est qu'il faut appeler votre Signal comme on le fera avec une fonction, avec des `()`

#### Mise à jour du Signal

Pour mettre à jour la valeur d'un Signal il y a 2 méthodes :
```ts 
title.set("un p'tit kiosquito ?");
```

Cependant si vous voulez faire une modification basé sur la valeur précédente il faut utiliser `update`
```ts
title.update(title => title.toUpperCase()); 
```

#### Réagir aux changement des Signaux

Nous verrons un peu plus tard la puissance des Signaux avec `computed()` et `effect()`.

[doc computed](https://angular.dev/essentials/signals#computed-expressions)

## Création du composant de menu

Lorsque vous développez une application, vous souhaiterez éventuellement ajouter plus de pages/composants/services que ceux par défaut créés avec l'application. Pour créer davantage de composants, vous pouvez créer manuellement un nouveau dossier et ajouter les fichiers requis, ou vous pouvez simplement exécuter la commande `ng generate`  pour le faire automatiquement à votre place.

Angular CLI peut créer beaucoup de choses différentes pour nous, en voici quelques-unes :
- component
- directive
- service
- resolver
- pipe
- config
- environments
- guard

```bash
ng generate component menu
```

[doc navbar bootstrap](https://getbootstrap.com/docs/5.3/components/navbar/)

- [ ] remplacez tout dans le fichier `/src/app/menu/menu.component.html`

```html
<nav class="navbar navbar-expand-md">
  <div class="container">
    <a class="navbar-brand">
      <img src="images/logo-header.png" alt="le Kiosque à pizzas">
    </a>
    <button type="button" class="navbar-toggler">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="navbar" class="navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link">Nos pizzas</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

- [ ] modifiez le fichier `/src/app/app.component.html`, ajoutez tout en haut le menu
```html
<app-menu></app-menu>
<main style="margin-top: 70px;">
[...]
```

- [ ] n'oubliez pas d'ajouter l'import du `MenuComponent` dans le fichier `/src/app/app.component.ts`
```ts
imports: [RouterOutlet, MenuComponent],
```

- [ ] dans `/src/styles.scss` ajoutez
```scss
:root {
  --kiosq-color-primary: #174d35;
  --kiosq-color-primary-contrast: #ffffff;
  --kiosq-color-primary-shade: #14442f;
  --kiosq-color-primary-tint: #2e5f49;

  --kiosq-color-secondary: #960118;
  --kiosq-color-secondary-contrast: #ffffff;
  --kiosq-color-secondary-shade: #840115;
  --kiosq-color-secondary-tint: #a11a2f;

  --kiosq-color-tertiary: #f89902;
  --kiosq-color-tertiary-contrast: #000000;
  --kiosq-color-tertiary-shade: #da8702;
  --kiosq-color-tertiary-tint: #f9a31b;
}
```

- [ ] dans `/src/app/menu/menu.component.scss` ajoutez
```scss
.navbar-brand img {
  height: 50px;
}

.nav-link {
  font-weight: bold;
  color: var(--kiosq-color-primary);

  &:hover {
    color: var(--kiosq-color-secondary);
  }
}
```

- [ ] dans le dossier `public` ajoutez un dossier `images`, ajoutez dedans `logo-header.png`. Toutes les images statiques seront à déposer dans ce dossier.

### Ouverture / fermeture du menu

[Binding de propriété](https://angular.dev/essentials/templates#setting-dynamic-properties-and-attributes)

[Événements](https://angular.dev/essentials/templates#handling-user-interaction)

En mode mobile, un bouton apparait, celui-ci doit permettre l'ouverture / fermeture du menu.

Pour cela, nous devons ajouter dynamiquement la classe `collapse` à la div identifiée par l’id `navbar`. Cette classe doit être ajoutée lorsque l’on clique une première fois sur le bouton, puis enlevée lorsque l’on clique la deuxième fois (afin de refermer le menu).

- [ ] ajouter un signal `navbarCollapsed` dans le composant, initialisé à vrai (le menu est fermé par défaut)
- [ ] ajouter un écouteur de clic sur le bouton qui appelle une méthode `toggleNavbar()` de notre composant
- [ ] écrire cette méthode pour qu’elle passe le signal `navbarCollapsed` du composant de vrai à faux, ou de faux à vrai
- [ ] la classe collapse devrait être ajoutée dynamiquement sur la div avec l’id navbar grâce à `[class.collapse]` ou à la directive ngClass dans le template, en fonction de la valeur du signal `navbarCollapsed`

Dans `/src/app/menu/menu.component.ts` ajoutez
```ts
readonly navbarCollapsed = signal(true);
```

Dans `/src/app/menu/menu.component.html` modifiez
```html
<button type="button" class="navbar-toggler" (click)="toggleNavbar()">
```

Dans `/src/app/menu/menu.component.ts` ajoutez
```ts
toggleNavbar() {
  this.navbarCollapsed.update(isCollapsed => !isCollapsed);
}
```

Dans `/src/app/menu/menu.component.html` modifiez
```html
<div id="navbar" class="navbar-collapse" [class.collapse]="navbarCollapsed()">
```

## Liste des pizzas

Créez un nouveau composant pour afficher la liste des pizzas.

```bash
ng generate component pizzas
```

Pour représenter notre liste de pizzas nous allons avoir besoin d'un signal `pizzas`, qui contiendra un tableau de pizzas. Il faut pouvoir représenter un objet `pizza`, pour cela on utilise une `interface` TypeScript.

> Une interface (ou model) est un moyen de représenter des données dans votre application. En TypeScript, nous pouvons avoir des types comme `string` et `number`, mais en créant une interface personnalisée appelée `PizzaModel` créons un nouveau type que nous pouvons utiliser. 

- [ ] créez un dossier `models` dans `/src/app`
- [ ] dans ce dossier créez un fichier `pizza.model.ts` avec dedans le code suivant

```ts
export interface PizzaModel {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  vegetarian: boolean;
}
```

Maintenant vous pouvez créer le signal `pizzas`, on utilisera une fausse liste de pizzas pour commencer.

Dans `/src/app/pizzas/pizzas.component.ts` ajoutez
```ts
readonly pizzas = signal<PizzaModel[]>([
  {
    id: 1,
    name: "Fromage",
    description: "Sauce tomate (tomates 100% Italiennes), Mozzarella, Emmental fondu",
    price: 5,
    category: "Kiosquitos",
    vegetarian: true
  },
  {
    id: 2,
    name: "Jambon",
    description: "Sauce tomate (tomates 100% Italiennes), Jambon supérieur",
    price: 5,
    category: "Kiosquitos",
    vegetarian: false
  }
]);
```

[doc control-flow](https://angular.dev/guide/templates/control-flow)

> Dans les précédentes versions d'Angular, pour gérer une boucle for il fallait utiliser la directive structurelle `NgFor` comme ceci :
```html
<li *ngFor="let user of users; trackBy: trackByFn">
  {{user}}
</li>
```

> Alors que sur les nouvelles versions :
```html
<ul class="user-badge-list">
  @for (badge of badges(); track badge.id) {
    <li class="user-badge">{{badge.name}}</li>
  }
</ul>
```

Dans le template `/src/app/pizzas/pizzas.component.html` vous pouvez maintenant utiliser un `for` pour afficher les pizzas.
```html
<ul>
  @for (pizza of pizzas(); track pizza.id) {
    <li><span class="h4">{{ pizza.name }}</span>
      <ul>
        <li>description: {{ pizza.description }}</li>
        <li>prix: {{ pizza.price }} €</li>
        <li>veggie: {{ pizza.vegetarian ? 'oui':'non' }}</li>
      </ul>
    </li>
  } @empty {
    <div class="alert alert-danger" style="width: fit-content;" role="alert">
      Aucune pizza, c'est triste
    </div>
  }
</ul>
```

Pour afficher le composant, n'oubliez pas de l'ajouter dans `/src/app/app.component.html`
```html
[...]
<h1 class="text-center">Commande de {{  title() }}</h1>
  <app-pizzas></app-pizzas>
[...]
```

Vérifiez également que l'import du composant est correct dans `/src/app/app.component.ts`
```ts
imports: [RouterOutlet, MenuComponent, PizzasComponent],
```

## Détails de la pizza

Afin de faire ça plus proprement nous allons maintenant créer un composant pizza qui va s'occuper d’afficher la pizza en détail.

```bash
ng generate component pizza
```

[doc input](https://angular.dev/api/core/input?tab=usage-notes)

> Les inputs sont ce qui permet à un composant ou de recevoir des informations de son composant parent. Ils sont comme des paramètres d’une fonction.

Dans ce composant `/src/app/pizza/pizza.component.ts` rajoutez un input obligatoire de type `PizzaModel` qui representera notre pizza à afficher

```ts
readonly pizza = input.required<PizzaModel>();
```

Nous allons installer la célèbre librairie d'icônes `fontawesome`

```bash
npm install @fortawesome/fontawesome-free
```

Ajoutez l'import dans `/src/styles.scss`

```scss
@import 'bootstrap/dist/css/bootstrap.css';
@import '@fortawesome/fontawesome-free/css/all.css';
```

Dans le template `/src/app/pizzas/pizzas.component.html` il faut maintenant retirer tout ce qui représente le détail d'une pizza et ajouter le composant `PizzaComponent`. Nous allons également modifier la liste ul et la remplacer par un `list-group` de Bootstrap. Le composant pour afficher les détails de la pizza attend obligatoirement un input `pizza`, n'oubliez pas de lui passer les données de la pizza.

```html
<div class="list-group">
  @for (pizza of pizzas(); track pizza.id) {
    <app-pizza [pizza]="pizza"></app-pizza>
  } @empty {
    <div class="alert alert-danger mx-auto mt-3" role="alert">
      Aucune pizza, c'est triste
    </div>
  }
</div>
```

Vérifiez que le `PizzaComponent` et bien importé dans `/src/app/pizzas/pizzas.component.ts`

```ts
imports: [PizzaComponent],
```

[doc @if](https://angular.dev/api/core/@if)

Ajoutez le template de la pizza dans `/src/app/pizza/pizza.component.html`

```html
<div class="list-group-item py-3">
  @if(pizza().vegetarian){
    <div class="vegetarian">
      <i class="fa-solid fa-leaf"></i>
      <span class="small">Végétarienne</span>
    </div>
  }
  <div class="d-flex w-100">
    <div class="me-auto">
      <h6 class="mb-1 name">{{ pizza().name }}</h6>
      <p class="desc small">{{ pizza().description }}</p>
      <span class="badge rounded-pill p-2">{{ pizza().price | currency:'EUR' }}</span>
    </div>
    <div class="d-flex align-items-center ps-5 pe-2">
      <button class="btn btn-circle">
        <i class="fa-solid fa-pizza-slice"></i>
      </button>
    </div>
  </div>
</div>
```

[doc currency pipe](https://angular.dev/api/common/CurrencyPipe?tab=usage-notes)

> Souvent, les données brutes n’ont pas la forme exacte que l’on voudrait afficher dans la vue. On a envie de les transformer, les formater, les tronquer, etc. On utilise pour cela l'élément `pipe`, il est possible d'en créer soi-même mais Angular en propose déjà, prêt à l'emploi, comme `currency`.

Notez la syntaxe du if pour tester et afficher si c'est une pizza végétarienne. Mais également l'utilisation du pipe `currency` qui permet de formater une somme d'argent dans une devise souhaitée. Pour pouvoir utiliser un pipe il faut l'importer dans `/src/app/pizza/pizza.component.ts`

```ts
imports: [CurrencyPipe],
```

Ajoutez un peu de style pour votre pizza dans `/src/app/pizza/pizza.component.scss`

```scss
.list-group-item {
  border-width: 1px 0 0;
  border-color: var(--kiosq-color-tertiary-tint);

  .vegetarian {
    position: absolute;
    top: -1px;
    right: 3rem;
    color: white;
    background-color: #189D67;
    border-bottom-right-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
    height: 1.5rem;
    display: flex;
    padding: 0 0.75rem 0.1rem 0.75rem;
    align-items: center;

    span {
      margin-left: 0.5rem;
      color: white;
    }
  }

  .name {
    color: var(--kiosq-color-primary);
    text-transform: uppercase;
  }

  .desc {
    color: #041F14;
  }

  .badge {
    border: 1px solid #e6e8ee;
    background-color: #f5f9fb;
    color: #041F14;
    font-weight: bold;
  }

  .btn {
    color: white;
    background-color: var(--kiosq-color-tertiary);

    &.btn-circle {
      width: 34px;
      height: 34px;
      padding: 6px 0px;
      border-radius: 18px;
      text-align: center;
      font-size: 15px;
      line-height: 1.3;
    }

    &:active {
      background-color: var(--kiosq-color-secondary);
    }
  }
}
```

[doc @let](https://angular.dev/api/core/@let#)

Ajoutez maintenant une en-tête pour chaque catégorie. Dans `/src/app/pizzas/pizzas.component.html`, juste au dessus du composant pizza, ajoutez

```html
@let previousCategory = $first ? null : pizzas()[$index-1].category;
@if(pizza.category !== previousCategory){
  <div class="item-divider">{{ pizza.category }}</div>
}
<app-pizza [pizza]="pizza"></app-pizza>
```

Notez ici l'utilisation d'une variable de template @let afin de garder en mémoire la catégorie précédente. Ainsi que des variables exposées par la boucle @for :
- $first : boolean, est-ce que c'est le 1er tour de boucle
- $index : number, index de la boucle
- il existe aussi $last, $even, $odd

Ajoutez le style pour l'élément item-divider dans `/src/app/pizzas/pizzas.component.scss`

```scss
.item-divider {
  background-color: var(--kiosq-color-primary);
  padding: 1rem;
  text-transform: uppercase;
  font-weight: 700;
  color: white;
  border-color: var(--kiosq-color-secondary);
  border-bottom-width: 6px;
  border-bottom-style: solid;
}
```

## Internationalisation

En utilisant le pipe `currency`, Angular a formaté le prix d'une manière un peu spéciale, "à l'américaine". C'est normal Angular est configuré en mode US. Cela affecte aussi les dates, qui, si vous utilisez le pipe `date`, affichera les mois en anglais. Pour remedier à tout ça on va lui indiquer que l'on veut la version FR.

Dans `/src/app/app.config.ts` modifiez

```ts
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import '@angular/common/locales/global/fr';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
};
```

Notez ici l'import de la local fr et le changement de la variable LOCAL_ID en fr-FR.

## Pizza service

À terme, nous irons récupérer la liste avec un appel HTTP auprès du serveur. Ce genre de traitement est généralement encapsulé dans un service.

Créez le service de récupération des pizzas

[doc Service](https://angular.dev/essentials/dependency-injection#)

```bash
ng generate service pizza
```

- [ ] dans ce service `/src/app/pizza.service.ts` créez une méthode `pizzasList()` de type `PizzaModel[]` afin de renvoyer une liste de 2 pizzas (celles qui sont dans votre composant `PizzasComponent`)

```ts
pizzasList(): PizzaModel[] {
  return [
    {
      id: 1,
      name: "Fromage",
      description: "Sauce tomate (tomates 100% Italiennes), Mozzarella, Emmental fondu",
      price: 5,
      category: "Kiosquitos",
      vegetarian: true
    },
    {
      id: 2,
      name: "Jambon",
      description: "Sauce tomate (tomates 100% Italiennes), Jambon supérieur",
      price: 5,
      category: "Kiosquitos",
      vegetarian: false
    }
  ]
}
```

Vous allez maintenant utiliser ce service dans votre `PizzasComponent`

- [ ] supprimez le tableau de pizzas dans le signal pizzas, votre IDE ne sera pas content
- [ ] injectez votre `PizzaService`
- [ ] initialisez la liste des pizzas (du signal pizzas) avec ce que renvoie la méthode pizzasList() du service.

Dans `/src/app/pizzas/pizzas.component.ts` vous avez donc

```ts
private readonly pizzaService = inject(PizzaService);
readonly pizzas = signal<PizzaModel[]>(this.pizzaService.pizzasList());
```

## Les Observables (RxJS)

Un appel de données au serveur n'est évidemment jamais immédiat, même dans les meilleures conditions réseau vous aurez une latence, le temps d'envoi/retour de la requête. C'est une opération asynchrone, vous faîtes la demande, le serveur vous répond ensuite. Pour cela on utilise des Observables. Un Observable est un flux de données, la plupart du temps asynchrone qui représente des événements ou des valeurs qui varient dans le temps. Afin de s'habituer à ce mode de fonctionnement, nous allons simuler un appel serveur en transformant notre tableau de pizzas en Observable. Pour cela nous utiliserons une librairie (RxJS) qui est spécialisée dans la manipulation des Observables.

- [ ] transformez votre tableau de pizzas en Observable (avec of)

Mais of() renvoie les résultats immédiatement. Dans la vraie vie, les résultats vont prendre un peu de temps pour revenir, alors ajoutons un opérateur appelé delay, pour retarder les résultats.

- [ ] ajoutez l'opérateur `delay` pour retarder l'arrivée des résultats de 2s

```ts
pizzasList(): Observable<PizzaModel[]> {
  return of([
    {
      id: 1,
      name: "Fromage",
      description: "Sauce tomate (tomates 100% Italiennes), Mozzarella, Emmental fondu",
      price: 5,
      category: "Kiosquitos",
      vegetarian: true
    },
    {
      id: 2,
      name: "Jambon",
      description: "Sauce tomate (tomates 100% Italiennes), Jambon supérieur",
      price: 5,
      category: "Kiosquitos",
      vegetarian: false
    }
  ]).pipe(delay(2000));
}
```

On peut altérer les Observables grâce à la méthode `pipe()` et ainsi lui passer des opérateurs tel que `map`, `filter`, `delay`, etc.

Dans `PizzasComponent` le Signal pizzas ne fonctionne plus car on lui passe un Observable et non plus un tableau de pizzas. Il n'est pas possible de passer un Observable en entrée d'un Signal, par contre, il est possible de transformer un Observable en Signal avec la méthode `toSignal()`.

Dans `/src/app/pizzas/pizzas.component.ts` modifier la déclaration du Signal pizzas

```ts
readonly pizzas = toSignal(this.pizzaService.pizzasList());
```

Dans le template `/src/app/pizzas/pizzas.component.html` vous trouverez une erreur, le Signal pizzas() peut maintenant être undefined. Car ce nouveau Signal provient d'un Observable qui n'a pas pour obligation d'avoir une valeur immediatement. En attendant de recevoir la valeur forcement le Signal sera undefined. Il faut donc prévoir ce cas, pour cela on utilise l'opérateur `?.`, appelé "optional chaining operator" (opérateur de chaînage optionnel). Placé juste après un Signal (par exemple), il va tester si celui-ci n'est pas undefined. Dans le cas contraire il ne lèvera pas d'erreur si vous tentez d'accèder à ses propriétés.

```ts
@let previousCategory = $first ? null : pizzas()?.[$index-1]?.category;
```

## Requêtes vers une API

[doc HTTP client](https://angular.dev/guide/http)

Essayons maintenant de requêter une vraie API. Lancez `kiosquito-provider` et essayez l'URL suivante: http://localhost:8080/api/products

Avant toute chose il faut activer le module http d'Angular: `provideHttpClient`. Dans `/src/app/app.config.ts` ajoutez `provideHttpClient()`

```ts
    [...]
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideHttpClient()
  ]
```

Dans `/src/app/pizza.service.ts`

- [ ] injectez le service `HttpClient`
- [ ] videz la méthode `pizzasList()`
- [ ] utilisez la méthode `get()` du service `HttpClient` pour faire appel à l'API http://localhost:8080/api/products

```ts
private readonly http = inject(HttpClient);

pizzasList(): Observable<PizzaModel[]> {
  return this.http.get<PizzaModel[]>("http://localhost:8080/api/products");
}
```

## Configurer des environnements

[doc environnements](https://angular.dev/tools/cli/environments#)

Nous avons placé une URL absolue pour faire appel à l'API. Celle-ci ne sera pas la même une fois en production et nous n'allons pas nous amuser à changer toutes les URL d'API à la main. Vous allez donc créez des environnements.

```bash
ng generate environments
```

Après avoir exécuté cette commande, un répertoire `src/environments/` sera créé dans votre projet. Par défaut, vous aurez un fichier environment.ts qui est configuré pour la production.

Dans `/src/environments/environment.development.ts` et `/src/environments/environment.ts` ajoutez

```ts
export const environment = {
  apiURL: 'http://localhost:8080/api'
};
```

Notez ici que l'on met la même URL dans les 2 fichiers, mais évidemment elle devra être différente dans un cas concret.

Dans `/src/app/pizza.service.ts` modifiez l'appel de l'API

```ts
import { environment } from '../environments/environment';
[...]
return this.http.get<PizzaModel[]>(`${environment.apiURL}/products`);
```

Attention à l'importation, remarquez le `environment` sans plus de précision. C'est Angular qui va se charger d'importer le bon fichier prod / dev.

## Le Routeur

[doc Routeur](https://angular.dev/guide/routing/router-reference#)


Jusqu’ici nous avons ajouté nos composants directement dans le composant principal. Maintenant on aimerait créer une nouvelle page dans notre application : par exemple accéder au composant `PizzasComponent` à l’URL `/pizzas`, et que la page d’accueil affiche un autre composant `HomeComponent`. Pour cela vous allez utiliser le `RouterModule` et pour commencer il va falloir modifier le composant racine `/src/app/app.component.html`

```html
<app-menu></app-menu>
<main>
  <router-outlet></router-outlet>
</main>
```

Dans `/src/app/app.component.ts`

- [ ] retirez l'importation de `PizzasComponent`
- [ ] supprimez le Signal title, il n'a plus d'utilité

Le but du `RouterModule` est de répondre à une URL et d'utiliser le `RouterOutlet` pour injecter le composant lié à cette URL. C'est pour cela que rien ne s'affiche, il faut configurer les routes.

La configuration des routes s'effectue dans le fichier `/src/app/app.routes.ts`

```ts
export const routes: Routes = [
  { path: 'pizzas', component: PizzasComponent }
];
```

Le `path` représente l'URL par rapport à l'URL racine (ex: monSite.uphf.fr/pizzas) et le `component` le composant qui sera instancié à l'appel de cette URL (ici `PizzasComponent` qui lui appelera `PizzaComponent`).

### L'accueil

Maintenant que la route `/pizzas` est configurée nous n'avons plus rien quand on arrive sur le site (à part le menu présent tout le temps).

- [ ] créez un composant `HomeComponent`
- [ ] configurer une route pour que celui-ci s'affiche au lancement du site

```bash
ng generate component home
```

Dans `/src/app/app.routes.ts`

```ts
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pizzas', component: PizzasComponent }
];
```

Pour le template, utilisez :

```html
<section id="header">
  <picture>
    <source srcset="images/home.jpg" media="(min-width: 640px)">
    <img src="images/home_mobile.jpg">
  </picture>
</section>
<section id="find-us">
  <p class="text-center px-3 h5 text-white">Trouvez le kiosque près de chez vous pour découvrir la carte des pizzas</p>
  <a class="btn btn-lg text-white mt-3">CHERCHER</a>
</section>
<section id="company">
  <div class="container">
    <div class="row row-cols-2 row-cols-md-4 g-3 text-center">
      <div class="col">
        <div class="card justify-content-center">
          <div class="mt-4">
            <i class="fa-solid fa-shop fa-2x"></i>
          </div>
          <div class="card-body">
            <h5 class="card-title h6">Notre histoire</h5>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card justify-content-center">
          <div class="mt-4">
            <i class="fa-solid fa-pepper-hot fa-2x"></i>
          </div>
          <div class="card-body">
            <h5 class="card-title h6">Nos ingrédients</h5>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card justify-content-center">
          <div class="mt-4">
            <i class="fa-solid fa-medal fa-2x"></i>
          </div>
          <div class="card-body">
            <h5 class="card-title h6">Démarche qualité</h5>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card justify-content-center">
          <div class="mt-4">
            <i class="fa-solid fa-hand-holding-heart fa-2x"></i>
          </div>
          <div class="card-body">
            <h5 class="card-title h6">Philosophie & engagements</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

Et comme style :

```scss
#header {
  height: 450px;

  picture,
  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
}

#find-us {
  padding: 3rem 0;
  background-color: var(--kiosq-color-tertiary);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .btn {
    background-color: var(--kiosq-color-secondary);
    border: 0;
    border-radius: 23px;
    font-size: 1rem;
  }
}

#company {
  background-color: var(--kiosq-color-primary);
  padding: 3rem 0;
}

.card {
  background-color: #103a29;
  height: 185px;
  border: 0;
  border-radius: 0;
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, .15);

  i {
    color: var(--kiosq-color-tertiary);
    height: 35px;
  }

  .card-title {
    color: white;
  }

  .card-body {
    flex: 0 1 auto;
  }
}
```

[doc RouterLink](https://angular.dev/api/router/RouterLink?tab=usage-notes)

Les routes sont configurées mais pour y accéder il faut passer directement par l'URL, ce qui n'est pas pratique, nous allons configurer des liens.

- [ ] dans `/src/app/home/home.component.html` complétez le lien pour permettre de naviguer vers `PizzasComponent`, en utilisant `routerLink` pour générer le lien (n’oubliez pas d’ajouter `RouterLink` aux imports du composant)

- [ ] dans le menu faîtes de même pour qu'un clic sur le `navbar-brand` renvoie sur l'accueil et qu'un clic sur le lien "Nos pizzas" renvoie vers `PizzasComponent`

`/src/app/home/home.component.html`

```html
<a routerLink="/pizzas" class="btn btn-lg text-white mt-3">CHERCHER</a>
```

`/src/app/menu/menu.component.html`

```html
<a routerLink="/" class="navbar-brand">
[...]
<a routerLink="/pizzas" class="nav-link" (click)="toggleNavbar()">Nos pizzas</a>
```

Notez que l'on rajoute ici `(click)="toggleNavbar()"`, le `MenuComponent` étant indépendant du changement de page, le menu reste dans l'état où vous l'avez laissé. Si vous l'avez ouvert suivi d'un clic dans un item du menu, le composant en dessous du menu change mais le menu restera ouvert si vous ne lui indiquez pas de se fermer.

## Création du panier

Il est temps de créer le panier pour contenir nos pizzas.

```bash
ng generate component cart-shopping
```

- [ ] ajoutez ce nouveau composant dans le template du composant `PizzaComponent`
- [ ] n'oubliez pas d'ajouter l'import de `CartShoppingComponent` dans `PizzaComponent`

`/src/app/pizzas/pizzas.component.html`

```html
    <div class="alert alert-danger mx-auto mt-3" role="alert">
      Aucune pizza, c'est triste
    </div>
  }
</div>
<app-cart-shopping></app-cart-shopping>
```

`/src/app/pizzas/pizzas.component.ts`

```ts
imports: [PizzaComponent, CartShoppingComponent],
```

### Modal Bootstrap

Pour le panier on utilisera un [composant Modal de Bootstrap](https://getbootstrap.com/docs/5.3/components/modal/).

Dans le template `/src/app/cart-shopping/cart-shopping.component.html` ajoutez
```html
<button id="openBtn" type="button" class="btn">
  <i class="fa-solid fa-cart-shopping fa-2x"></i>
</button>

<div class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">PANIER</h4>
        <button type="button" class="btn-close"></button>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</div>

<div class="modal-backdrop fade"></div>
```

Et pour le style `/src/app/cart-shopping/cart-shopping.component.scss`

```scss
.modal-backdrop {
  display: none;
}

.modal-dialog {
  box-shadow: 5px 5px var(--kiosq-color-primary-shade);

  .modal-content {
    border: 0;
    border-radius: 0;
  }
}

#openBtn {
  position: fixed;
  bottom: 14px;
  right: 14px;
  background-color: var(--kiosq-color-secondary-tint);
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, .15);
  color: white;
  border-radius: 3px;
  height: 72px;
  width: 72px;
}
```

[doc viewChild](https://angular.dev/api/core/viewChild?tab=usage-notes)

La 1ère étape pour afficher la modale est d'ajouter le style `display:'block'` sur l'élément qui a la classe `modal` puis lui ajouter la classe `show`

- [ ] ajoutez un évènement `click` sur le bouton qui appelera une fonction `openModal()` que vous créerez dans le composant
- [ ] créez une variable locale `#cartModal` sur l'élément avec la classe `modal`
- [ ] créez une requête de vue avec `viewChild` pour cibler `cartModal`
- [ ] utilisez cette variable (Signal) avec la méthode `nativeElement` pour changer le style `display` à `block`, dans la méthode `openModal()`
- [ ] créez un Signal `isModalOpen` de type `boolean`, initialisé à `false`
- [ ] dans la méthode `openModal()` changez la valeur du Signal à `true`
- [ ] dans le template ajoutez de manière dynamique la classe `show` sur la modale, grâce au Signal `isModalOpen`
- [ ] créez une méthode `closeModal()` associé au `click` sur le bouton `btn-close` et dedans passez le Signal à `false` et le `display` à `none`

Le `modal-backdrop` fonctionne exactement de la même manière que la modale, il faut le passer en `display:'block'`, lui rajouter dynamiquement la classe `show` et inversement lors de la fermeture.

- [ ] faîtes apparaitre / disparaitre le backdrop

Ce qui donne :

`/src/app/cart-shopping/cart-shopping.component.html`

```html
<button id="openBtn" type="button" class="btn" (click)="openModal()">
  <i class="fa-solid fa-cart-shopping fa-2x"></i>
</button>

<div class="modal fade" [class.show]="isModalOpen()" #cartModal>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">PANIER</h4>
        <button type="button" class="btn-close" (click)="closeModal()"></button>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</div>

<div class="modal-backdrop fade" [class.show]="isModalOpen()" #modalBackdrop></div>
```

`/src/app/cart-shopping/cart-shopping.component.ts`

```ts
readonly cartModal = viewChild.required<ElementRef>('cartModal');
readonly modalBackdrop = viewChild.required<ElementRef>('modalBackdrop');
readonly isModalOpen = signal(false);

openModal(): void {
  this.cartModal().nativeElement.style.display = "block";
  this.modalBackdrop().nativeElement.style.display = "block";
  this.isModalOpen.set(true);
}

closeModal(): void {
  this.isModalOpen.set(false);
  this.cartModal().nativeElement.style.display = "none";
  this.modalBackdrop().nativeElement.style.display = "none";
}
```

Il reste 2 choses que vous pouvez améliorer. La fermeture du panier est très brutal, il n'y a pas de transition. Quand vous enlevez la classe `show` une transition se déclanche (150ms), le problème ici est que l'on passe la modale / backdrop à display none immédiatement, sans laisser le temps à la transition de se finir correctement.

- [ ] rajoutez un `setTimeout()` pour décaler l'application du display:'none' pour la modale et le backdrop lors de la fermeture

Bonus : Remarquez que lorsque la modale est ouverte vous pouvez toujours scroller bien qu'il ne soit plus possible d'intéragir avec les items de la liste. Cependant ce n'est pas le comportement normal, en principe même le scroll est désactivé, c'est ce que vous allez faire. Pour cela il faut appliquer le style `overflow:'hidden'` sur le `body`. Dans ce composant nous n'avons pas accès directement à cet élément, mais il existe un service permettant d'y accéder.

- [ ] injectez le service `Renderer2`
- [ ] utilisez ses méthodes `setStyle()` et `removeStyle()` pour ajouter / enlever `overflow:'hidden'` sur l'élément `document.body`

`/src/app/cart-shopping/cart-shopping.component.ts`

```ts
export class CartShoppingComponent {
  private readonly renderer = inject(Renderer2);
  readonly cartModal = viewChild.required<ElementRef>('cartModal');
  readonly modalBackdrop = viewChild.required<ElementRef>('modalBackdrop');
  readonly isModalOpen = signal(false);

  openModal(): void {
    this.renderer.setStyle(document.body, "overflow", "hidden");
    this.cartModal().nativeElement.style.display = "block";
    this.modalBackdrop().nativeElement.style.display = "block";
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    setTimeout(() => {
      this.renderer.removeStyle(document.body, "overflow");
      this.cartModal().nativeElement.style.display = "none";
      this.modalBackdrop().nativeElement.style.display = "none";
    }, 150);
  }
}
```

## Ajout dans le panier

### Faire remonter l'information

[doc output](https://angular.dev/api/core/output?tab=usage-notes)

La 1ère étape est de réagir au clic sur le bouton panier. Donc dans le composant `PizzaComponent` :

- [ ] ajouter un évènement `click` sur le bouton associé à une méthode `addToCartClick()`
- [ ] émettre un événement custom `onAddToCartClick` grâce à un `output<PizzaModel>()`

Dans `/src/app/pizza/pizza.component.html`

```html
<button class="btn btn-circle" (click)="addToCartClick()">
```

Dans `/src/app/pizza/pizza.component.ts`

```ts
readonly pizza = input.required<PizzaModel>();
readonly onAddToCartClick = output<PizzaModel>();

addToCartClick(): void {
  this.onAddToCartClick.emit(this.pizza());
}
```

### Interception de la pizza

Il faut maintenant récupérer la pizza dans `PizzasComponent`.

- [ ] sur l'élément `<app-pizza>` capturez l'évènement `onAddToCartClick` et lancez une méthode `addToCart($event)`
- [ ] dans `PizzasComponent` créez la méthode `addToCart` avec comme paramètre `pizza` de type `PizzaModel`

`/src/app/pizzas/pizzas.component.html`

```html
<app-pizza [pizza]="pizza" (onAddToCartClick)="addToCart($event)"></app-pizza>
```

`/src/app/pizzas/pizzas.component.ts`

```ts
addToCart(pizza: PizzaModel) {
  console.log(pizza);
}
```

### Stockage du panier dans un service

Afin de stocker les données du panier nous allons utiliser un service

- [ ] créez un nouveau service : `cart`

```bash
ng generate service cart
```

Dans le panier nous n'allons pas stocker directement une liste de pizzas. Il nous faudrait un objet un peu plus complexe qui puisse contenir une quantité (si je prends plusieurs fois la même pizza...gourmand(e) ou pourquoi pas un commentaire pour indiquer des suppléments). Nous allons créer un nouvel objet nommé `CartItemModel`.

Créez un nouveau fichier `/src/app/models/cart-item.model.ts` puis ajoutez :

```ts
import { PizzaModel } from "./pizza.model";

export interface CartItemModel {
  product: PizzaModel;
  quantity: number;
  comment: string;
}
```

Dans `PizzasComponent` :

- [ ] injectez le service `CartService` dans une variable `cartService` 
- [ ] dans `addToCart` utilisez ce service et appelez sa méthode `addToCart` (qui n'existe pas encore) en lui passant la pizza

```ts
private readonly cartService = inject(CartService);
readonly pizzas = toSignal(this.pizzaService.pizzasList());

addToCart(pizza: PizzaModel) {
  this.cartService.addToCart(pizza);
}
```

Revenons dans le `CartService`, voici les objectifs :

- [ ] créez un Signal `cartItems` de type `CartItemModel[]` afin de contenir les éléments du panier
- [ ] créez une méthode `addToCart` qui prend en paramètre un `PizzaModel`, dans celle-ci :
- - [ ] il faut tester si la pizza existe déjà, si non mettez à jour le Signal pour l'ajouter
- - [ ] si elle est déjà présente, mettez à jour cette pizza dans le Signal pour changer la `quantity + 1`
- [ ] enfin exposez le Signal en `asReadonly` dans un nouveau Signal `getCartItems`

Dans `/src/app/cart.service.ts`

```ts
private readonly cartItems = signal<CartItemModel[]>([]);
readonly getCartItems = this.cartItems.asReadonly();

addToCart(pizza: PizzaModel): void {
  if (this.cartItems().find(item => item.product.id === pizza.id)) {
    this.cartItems.update(cartItems => {
      return cartItems.map(item => item.product.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item)
    });
  } else {
    this.cartItems.update(cartItems => [...cartItems, { product: pizza, quantity: 1, comment: "" }]);
  }
}
```

## Alimentation du panier

Les pizzas sont bien dans le panier, en tout cas dans le service, cependant l'utilisateur ne le voit pas. C'est ce que vous allez faire maintenant.

- [ ] injectez `CartService`
- [ ] dans le template ajoutez un for pour afficher le nom et la quantité des produits du panier

`/src/app/cart-shopping/cart-shopping.component.ts`

```ts
readonly cartService = inject(CartService);
```

`/src/app/cart-shopping/cart-shopping.component.html`

```html
<div class="modal-body">
  @for (cartItem of cartService.getCartItems(); track cartItem.product.id) {
    {{cartItem.product.name}} - {{cartItem.quantity}}
  }
</div>
```

## Création des éléments du panier

```bash
ng generate component cartShoppingItem
```

- [ ] dans `CartShoppingItemComponent` ajoutez un input obligatoire de type `CartItemModel` nommé `cartItemModel`

```ts
readonly cartItemModel = input.required<CartItemModel>();
```

- [ ] dans `/src/app/cart-shopping/cart-shopping.component.html` appellez le `CartShoppingItemComponent` en lui passant `cartItem`

`/src/app/cart-shopping/cart-shopping.component.html`

```html
<div class="modal-body p-0">
  <div class="list-group">
    @for (cartItem of cartService.getCartItems(); track cartItem.product.id) {
      <app-cart-shopping-item [cartItem]="cartItem"></app-cart-shopping-item>
    } @empty {
      <div class="alert alert-danger mx-auto mt-3" role="alert">
        Le panier est vide, c'est triste
      </div>
    }
  </div>
</div>
```

Pour le template et le style, nous utiliserons à-peu-près la même chose que pour la liste des pizzas.

`/src/app/cart-shopping-item/cart-shopping-item.component.html`

```html
<div class="list-group-item py-3">
  <div class="d-flex w-100">
    <div class="me-auto">
      <h6 class="mb-2 name">{{ cartItem().product.name }}</h6>
      <span class="badge rounded-pill p-2">{{ cartItem().product.price | currency:'EUR' }}</span>
    </div>
    <div class="d-flex align-items-center ps-5 pe-2">
      <button class="btn btn-circle">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  </div>
</div>
```

`/src/app/cart-shopping-item/cart-shopping-item.component.scss`

```scss
.list-group-item {
  border-width: 1px 0 0;
  border-color: var(--kiosq-color-tertiary-tint);

  .name {
    color: var(--kiosq-color-primary);
    text-transform: uppercase;
  }

  .badge {
    border: 1px solid #e6e8ee;
    background-color: #f5f9fb;
    color: #041F14;
    font-weight: bold;
  }

  .btn {
    color: white;
    background-color: var(--kiosq-color-secondary-tint);

    &.btn-circle {
      width: 34px;
      height: 34px;
      padding: 6px 0px;
      border-radius: 18px;
      text-align: center;
      font-size: 15px;
      line-height: 1.3;
    }
  }
}
```
### Suppression d'un élément du panier

- [ ] sur le bouton ajoutez une réaction à un click avec une méthode `removeFromCartClick()`, créez cette méthode dans le composant
- [ ] ajoutez un output de type number nommé `onRemoveFromCartClick` et appelez la méthode emit pour envoyer l'id

`/src/app/cart-shopping-item/cart-shopping-item.component.ts`

```ts
readonly cartItemModel = input.required<CartItemModel>();
readonly onRemoveFromCartClick = output<number>();

removeFromCartClick(): void {
  this.onRemoveFromCartClick.emit(this.cartItem().product.id);
}
```

- [ ] dans `/src/app/cart-shopping/cart-shopping.component.html` captez l'événement `onRemoveFromCartClick` et lancez une méthode `removeFromCart($event)`
- [ ] créez la méthode dans `CartShoppingComponent`
- [ ] dans `CartService` ajoutez une méthode `removeFromCart(pizzaId: number)` qui met à jour `cartItems` grâce à l'utilisation de `filter()`
- [ ] dans la méthode `removeFromCart` de `CartShoppingComponent` faîtes appel à la méthode `removeFromCart` de `CartService`


`/src/app/cart-shopping/cart-shopping.component.html`

```html
<app-cart-shopping-item [cartItem]="cartItem" (onRemoveFromCartClick)="removeFromCart($event)"></app-cart-shopping-item>
```

`/src/app/cart-shopping/cart-shopping.component.ts`

```ts
removeFromCart(pizzaId: number): void {
  this.cartService.removeFromCart(pizzaId);
}
```

`/src/app/cart.service.ts`

```ts
removeFromCart(pizzaId: number) {
  this.cartItems.update(cartItems => cartItems.filter(item => item.product.id !== pizzaId));
}
```

### Modification de la quantité

En plus de la suppression, on veut pouvoir modifier la quantité de chaque élément du panier. Il faut donc rajouter 2 boutons +/- et afficher la quantité.

- [ ] modifiez le template du panier pour afficher le bouton poubelle si la quantité = 1, si > 1 on affiche à la place le bouton -1 et tout le temps visible le bouton +1
- [ ] entre les 2 boutons affichez la quantité

`/src/app/cart-shopping-item/cart-shopping-item.component.html`

```html
<div class="d-flex align-items-center ps-5 pe-2">
  @if (cartItem().quantity === 1){
    <button class="btn btn-circle" (click)="removeFromCartClick()">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  } @else if (cartItem().quantity > 1) {
    <button class="btn btn-circle">
      <i class="fa-solid fa-minus"></i>
    </button>
  }
  <span class="badge rounded-pill fs-6 mx-2">{{cartItem().quantity}}</span>
  <button class="btn btn-circle">
    <i class="fa-solid fa-plus"></i>
  </button>
</div>
```

- [ ] sur les boutons +1/-1, au click faîtes appel à une méthode `updateQuantityClick` avec dedans la quantité + 1 ou -1
- [ ] créez cette méthode dans le composant
- [ ] ajoutez un `output` nommé `onUpdateQuantityClick` de type `{ pizzaId: number, quantity: number }`
- [ ] dans la méthode précédemment créée appelez la méthode `emit` en lui passant l'id de la pizza et la quantité

```html
<button class="btn btn-circle" (click)="updateQuantityClick(cartItem().quantity - 1)">
[...]
<button class="btn btn-circle" (click)="updateQuantityClick(cartItem().quantity + 1)">
```

```ts
readonly onUpdateQuantityClick = output<{ pizzaId: number, quantity: number }>();
[...]
updateQuantityClick(quantity: number): void {
  this.onUpdateQuantityClick.emit({ pizzaId: this.cartItem().product.id, quantity });
}
```

- [ ] dans le `CartShoppingComponent` capter l'événement `onUpdateQuantityClick` pour lancer la méthode `updateQuantity($event)`
- [ ] créez la méthode `updateQuantity` avec comme paramètre `pizza: { pizzaId: number, quantity: number }`
- [ ] dans cette méthode appelez la méthode `updateQuantity` (qui n'existe pas encore) du `cartService` en passant en paramètre l'id de la pizza et la quantité

`/src/app/cart-shopping/cart-shopping.component.html`

```html
<app-cart-shopping-item [cartItem]="cartItem"
  (onRemoveFromCartClick)="removeFromCart($event)"
  (onUpdateQuantityClick)="updateQuantity($event)"></app-cart-shopping-item>
```

`/src/app/cart-shopping/cart-shopping.component.ts`

```ts
updateQuantity(pizza: { pizzaId: number, quantity: number }): void {
  this.cartService.updateQuantity(pizza.pizzaId, pizza.quantity);
}
```

`/src/app/cart.service.ts`

```ts
updateQuantity(pizzaId: number, quantity: number) {
  this.cartItems.update(cartItems => cartItems.map(item => item.product.id === pizzaId ? { ...item, quantity } : item));
}
```

## Quantité et total

Il faudrait maintenant afficher le total dans le panier et pourquoi pas afficher la quantité totale sur le bouton du panier.

- [ ] dans `CartService` créez 2 méthodes (computed Signal) `getCartItemsCount` et `getTotal` avec l'aide de `reduce()` pour calculer le nombre d'élément total dans le panier et le prix total

```ts
readonly getCartItems = this.cartItems.asReadonly();
getCartItemsCount = computed(() => this.cartItems().reduce((total, item) => total + item.quantity, 0));
getTotal = computed(() => this.cartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0));
```

Ajoutez maintenant la quantité sur le bouton panier et un nouveau bouton pour passer la commande avec dedans le total :

`/src/app/cart-shopping/cart-shopping.component.html`

```html
<button id="openBtn" type="button" class="btn" (click)="openModal()">
  <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-success">
    {{cartService.getCartItemsCount()}}
  </span>
  <i class="fa-solid fa-cart-shopping fa-2x"></i>
</button>
[...]
<div class="modal-footer">
  <div class="d-grid gap-2 col-8 mx-auto">
    <button class="btn btn-order" type="button" [disabled]="!cartService.getCartItemsCount()">
      Commander ({{cartService.getTotal() | currency:'EUR' }})
    </button>
  </div>
</div>
```

`/src/app/cart-shopping/cart-shopping.component.scss`

```scss
.btn-order {
  background-color: var(--kiosq-color-tertiary);
  color: white;
  font-weight: bold;
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, .15);

  &:active {
    background-color: var(--kiosq-color-secondary);
  }
}
```

`/src/app/cart-shopping/cart-shopping.component.ts`

```ts
imports: [CartShoppingItemComponent, CurrencyPipe],
```

## Ajout d'un bouton de suppression du panier sur la liste des produits

À partir de la liste des produits, nous pouvons ajouter au panier. Mais si par exemple j'ai fait une erreur et que je veux le supprimer, je dois forcement passer par le composant panier, puis cliquer sur supprimer. Est-ce qu'on ne pourrait pas faciliter la vie de l'utilisateur en lui proposant directement la suppression.

- [ ] dans `PizzaComponent` ajoutez dans le template un bouton suppression (comme celui dans `CartShoppingItemComponent`)
- [ ] sur ce bouton ajoutez un événement click qui lancera la méthode `removeFromCartClick`
- [ ] créez cette méthode dans le composant
- [ ] créez un output nommé `onRemoveFromCartClick`
- [ ] dans la méthode `removeFromCartClick`, utilisez la méthode `emit` de `onRemoveFromCartClick` en lui passant l'id de la pizza

`/src/app/pizza/pizza.component.html`

```html
<div class="d-flex align-items-center ps-5 pe-2">
  <button class="btn btn-circle btn-trash" (click)="removeFromCartClick()">
    <i class="fa-solid fa-trash-can"></i>
  </button>
  [...]
</div>
```

`/src/app/pizza/pizza.component.scss`

```scss
&.btn-trash {
  background-color: var(--kiosq-color-secondary-tint);
}
```

`/src/app/pizza/pizza.component.ts`

```ts
readonly onRemoveFromCartClick = output<number>();

[...]

removeFromCartClick(): void {
  this.onRemoveFromCartClick.emit(this.pizza().id);
}
```

- [ ] dans le template de `PizzasComponent` captez l'événement `onRemoveFromCartClick` pour lancer la méthode `removeFromCart($event)`
- [ ] créez cette méthode dans le composant avec comme paramètre `pizzaId`
- [ ] dans celle-ci lancer la méthode `removeFromCart` de `cartService` en lui passant l'id de la pizza

`/src/app/pizzas/pizzas.component.html`

```html
<app-pizza [pizza]="pizza"
  (onAddToCartClick)="addToCart($event)"
  (onRemoveFromCartClick)="removeFromCart($event)"></app-pizza>
```

`/src/app/pizzas/pizzas.component.ts`

```ts
removeFromCart(pizzaId: number): void {
  this.cartService.removeFromCart(pizzaId);
}
```

Cela fonctionne, cependant nous nous retrouvons maintenant avec 2 boutons en même temps l'ajout au panier et la suppression, ce n'est pas l'idéal. Le mieux serait d'avoir le bouton de suppression uniquement si la pizza est déjà dans mon panier (et vice versa).

Dans `/src/app/models/pizza.model.ts` ajoutez :

```ts
export interface PizzaWithIsOnCartModel extends PizzaModel {
  isOnCart: boolean;
}
```

Nous allons faire des modifications dans `/src/app/pizzas/pizzas.component.ts`, remplacez la ligne suivante :

```ts
readonly pizzas = toSignal(this.pizzaService.pizzasList());
```

par

```ts
private readonly pizzasList = toSignal(this.pizzaService.pizzasList());
```

C'est le même appel à la méthode `pizzasList` de `pizzaService`, on change juste son nom et sa portée. On ne va plus exposer directement cette donnée dans le template.
`pizzaService.pizzasList()` renvoie un tableau de `PizzaModel` mais maintenant on voudrait plutôt un tableau de `PizzaWithIsOnCartModel` pour savoir si la pizza est dans le panier (grâce à la propriété `isOnCart`). Il va donc falloir créer un nouveau Signal à partir de `pizzasList`.

```ts
readonly pizzas: Signal<PizzaWithIsOnCartModel[] | undefined> = computed(() => this.pizzasList()?.map(pizza => {
  const isOnCart = !!this.cartService.getCartItems().find(item => item.product.id === pizza.id);
  return { ...pizza, isOnCart }
}));
```

- [ ] dans `PizzaComponent` changer le type de l'input en `<PizzaWithIsOnCartModel>`

```ts
readonly pizza = input.required<PizzaWithIsOnCartModel>();
[...]

addToCartClick(): void {
  const { isOnCart, ...pizzaWithoutIsOnCartModel } = this.pizza();
  this.onAddToCartClick.emit(pizzaWithoutIsOnCartModel);
}
```

Maintenant vous disposez de la propriété `isOnCart` sur le Signal `pizza()` vous pouvez l'utiliser pour afficher soit le bouton de suppression ou le bouton d'ajout.

`/src/app/pizza/pizza.component.html`

```html
<div class="d-flex align-items-center ps-5 pe-2">
  @if(pizza().isOnCart){
    <button class="btn btn-circle btn-trash" (click)="removeFromCartClick()">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  } @else {
    <button class="btn btn-circle" (click)="addToCartClick()">
      <i class="fa-solid fa-pizza-slice"></i>
    </button>
  }
</div>
```

Il reste cependant un petit problème, le type du output est `<PizzaModel>` hors maintenant ce qui est renvoyé est un `<PizzaWithIsOnCartModel>`. Nous allons créer une nouvelle variable avec toutes les propriétés de `<PizzaWithIsOnCartModel>` SAUF `isOnCart`. Pour cela on va utiliser l'affectation destructurée (ou par décomposition) combiné à l'opérateur `Rest` :

```ts
addToCartClick(): void {
  const { isOnCart, ...pizzaWithoutIsOnCartModel } = this.pizza();
  this.onAddToCartClick.emit(pizzaWithoutIsOnCartModel);
}
```

## Enregistrement de la commande

- [ ] dans le template du `CartShoppingComponent` ajoutez sur le bouton un événement click qui va lancer une méthode `saveOrder()`
- [ ] créez cette méthode dans le composant

`/src/app/cart-shopping/cart-shopping.component.html`

```html
<button class="btn btn-order" type="button"
  [disabled]="!cartService.getCartItemsCount()"
  (click)="saveOrder()">
```

`/src/app/cart-shopping/cart-shopping.component.ts`

```ts
saveOrder() {
  console.log(this.cartService.getCartItems());
}
```

### Création du service order

- [ ] créez un nouveau service pour gérer les commandes

```bash
ng generate service order
```

- [ ] injectez `HttpClient`
- [ ] créez une méthode `saveOrder(cartItems: CartItemModel[])`
- [ ] dans celle-ci faîtes un POST vers `/api/orders/{userUid}` en lui passant comme données la liste des produits du panier

> Remarquez que dans l'url vous allez passer directement votre uid, évidemment dans un cas réél ça ne sera pas le cas. Cela poserait un très gros problème de sécurité si l'url était interceptée puis modifiée. Quand vous vous identifiez (dans un cas réél), vous recevez un AuthToken qui est une chaine de caractères complexe qui vous identifie auprès du back. C'est ce token qu'il faut envoyer, il sera en mesure de vous identifier et de récupérer votre uid (si il ne le possède pas il pourra faire une requête LDAP par exemple).

### Utilisation du service order

Maintenant que le service est prêt vous pouvez l'utiliser dans `CartShoppingComponent`

- [ ] injectez `OrderService`
- [ ] dans la méthode `saveOrder` appelez la méthode `saveOrder` de `OrderService`

```ts
readonly orderService = inject(OrderService);

[...]

saveOrder() {
  this.orderService.saveOrder(this.cartService.getCartItems()).subscribe({
    next: () => console.log("commande enregistrée"),
    error: () => console.log("erreur dans l'enregistrement de la commande")
  });
}
```

### Création de l'interface order

La méthode `saveOrder` de `OrderService` renvoie un `Observable<Object>` car vous n'avez pas spécifié le type du retour. C'est ennuyeux car si je veux manipuler la réponse l'IDE n'aura aucune idée du type d'objet retourné et le compilateur ne pourra pas m'avertir si je manipule mal cet objet.

- [ ] créez le fichier `/src/app/models/order.model.ts`

```ts
export interface OrderModel {
  id: number;
  userUid: string;
  createdOn: string;
  status: "ORDERED" | "DELIVERED";
  totalPrice: number;
  numberOfProducts: number;
  orderProducts: CartItemModel[];
}
```

- [ ] dans `OrderService` vous pouvez maintenant modifier le type de retour

```ts
saveOrder(cartItems: CartItemModel[]): Observable<OrderModel> {
  return this.http.post<OrderModel>(`${environment.apiURL}/orders/gdeudon`, cartItems);
}
```

## Vider le panier

Une fois que nous avons enregistré la commande, il faut vider le panier.

- [ ] dans `CartService` ajoutez une méthode `cleanCart` pour vider le panier

```ts
cleanCart() {
  this.cartItems.set([]);
}
```

- [ ] appelez cette méthode dans `CartShoppingComponent`

```ts
next: () => {
  console.log("commande enregistrée");
  this.cartService.cleanCart();
},
```

## Un petit toast ?

Avertissons l'utilisateur de l'enregistrement de sa commande

```bash
ng generate component toast
```

`/src/app/toast/toast.component.ts`

```ts
export class ToastComponent {
  readonly message = input<string>();
  readonly isShow = computed(() => !!this.message());
}
```

`/src/app/toast/toast.component.html`

```html
<div class="toast position-fixed bottom-0 end-0 m-3" [class.show]="isShow()" role="alert">
  <div class="toast-body">
    {{message()}}
  </div>
</div>
```

`/src/app/toast/toast.component.scss`

```scss
.toast {
  z-index: var(--bs-toast-zindex);
  background-color: var(--kiosq-color-secondary);
  color: white;
}
```

Il suffit ensuite de l'ajouter dans le `CartShoppingComponent`

`/src/app/cart-shopping/cart-shopping.component.html`

```html
<div class="modal-backdrop fade" [class.show]="isModalOpen()" #modalBackdrop></div>

<app-toast [message]="toastMessage()"></app-toast>
```


```ts
readonly toastMessage = signal<string>("");

[...]

saveOrder() {
    next: () => {
      this.cartService.cleanCart();
      this.toastMessage.set("commande enregistrée");
      setTimeout(() => { this.toastMessage.set("") }, 2500);
    },
```
