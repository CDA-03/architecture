# Configuration et installation de TypeScript 

## Sommaire

### Qu'est-ce que TypeScript ?
### Typage statique
### Maintenance

### Installation et configuration

1. Utilsez le Starter avec Docker ou une installation direct sur vos machines pour avoir TS, voir à la fin du document [install](#installation-et-configuration) pour cette installation.
2. Utilisez docker, avec la commande docker-compose pour démarrer le projet et construire les images dans le projet **Starter**, tapez les lignes de code suivantes dans le dossier Starter, tout devrait s'installer correctement. 

Quelques commandes utiles pour la suite si vous décidez de partir avec Docker

```bash
# Construction et lancement des images en tache de fond
docker-compose up -d 

# Pour se connecter au conteneur avec le bash (vérifiez que vous l'avez une fois dans votre conteneur echo $SHELL)
docker exec -it solid bash

# Dans le conteneur pour compiler et tester un fichier TS 
npx nodemon --watch test.ts --exec 'ts-node' test.ts
```

:rocket:

## Qu'est-ce que TypeScript ?

TypeScript est un langage de programmation open source développé par Microsoft. 

Il s'agit d'un sur-ensemble de JavaScript, ce qui signifie que tout code JavaScript valide est également du code TypeScript. 

Cependant, TypeScript offre des fonctionnalités supplémentaires qui ajoutent de la puissance et de la flexibilité au développement d'application.

>[NOTE]
>L'une des caractéristiques principales de TypeScript est le support du typage statique. 

Contrairement à JavaScript, où les types de variables sont déterminés à l'exécution, TypeScript permet de spécifier le type des variables lors de la phase de développement. Cela permet de détecter et de corriger les erreurs potentielles dans le processus de développement.


## Installation et configuration

1. Utilisez la version de Node.js LTS, voir sur le site Node.js

:shell:

```bash
# version LTS
nvm use 20.11.0
```

1. Intialisez le projet (le cours) : lessons

>[!NOTE]
>TypeScript est installé en tant que devDependencies
   
:shell:

```bash
mkdir lessons && cd lessons && npm init -y 

npm install typescript --save-dev
npm install nodemon ts-node-dev --save-dev
```  

Créez un dossier src, puis initialisez le projet avec la commande `tsc --init`

:rocket:

> [!TIP]
> Le fichier tsconfig.json configure l'installation de TypeScript

```json
{
  "compilerOptions": {
    "target": "ESNext",                                  
    "module": "commonjs",                                 
    //"moduleResolution": "bundler",                    
    "outDir": "./dist",                                  
    "esModuleInterop": true,                             
    "strict": true,                                      
    "skipLibCheck": true                                
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Modifiez maintenant le fichier package.json, ajoutez la ligne suivante dans la partie script :

```json
"scripts": {
    "dev": "nodemon --watch './**/*.ts' --exec 'ts-node' src/main.ts"
  },
```

:shell:

```json
npm run dev
```

## Arborescence pour notre cours 

```txt
/
├── package.json
├── src
│   └── main.ts
├── tests
│   ├── main.spec.ts
│   └── duck.spec.ts
└── tsconfig.json
```

## En ligne de commande

Dans votre projet utiliser la commande suivante 

```ts
nodemon --watch './**/*.ts' --exec 'ts-node' src/Exercices/main.ts
```
