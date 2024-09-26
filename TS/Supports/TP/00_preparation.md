### Étape 1 : Initialiser le projet TypeScript

1. **Créer le projet et initialiser `package.json`** :

   Ouvrez un terminal et crée un nouveau dossier pour le projet, puis navigue à l'intérieur :

   ```bash
   mkdir Card
   cd Card
   ```

   Initialise un fichier `package.json` :

   ```bash
   npm init -y
   ```

   Cela crée un fichier `package.json` avec des valeurs par défaut.

2. **Installer TypeScript et Nodemon** (pour exécuter automatiquement le code après chaque modification) :

   ```bash
   npm install typescript --save-dev
   npm install nodemon ts-node --save-dev
   ```

   - `typescript` est le compilateur TS.
   - `ts-node` permet d'exécuter des fichiers TypeScript directement sans avoir besoin de les compiler au préalable.
   - `nodemon` redémarre automatiquement l'application à chaque modification.

3. **Initialiser un fichier `tsconfig.json`** (la configuration TypeScript) :

   Crée un fichier `tsconfig.json` en utilisant la commande suivante :

   ```bash
   npx tsc --init
   ```

   Cela crée un fichier `tsconfig.json` avec une configuration par défaut.

4. **Modifier `tsconfig.json`** pour structurer le projet et utiliser des options strictes :

   Ouvre le fichier `tsconfig.json` et modifie-le comme suit :

   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "CommonJS",
       "rootDir": "./src",
       "outDir": "./dist",
       "esModuleInterop": true,
       "forceConsistentCasingInFileNames": true,
       "strict": true,
       "skipLibCheck": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist"]
   }
   ```

   - **rootDir** : Indique que les fichiers TypeScript sources seront dans le dossier `src`.
   - **outDir** : Les fichiers compilés iront dans le dossier `dist`.
   - **strict** : Active toutes les options strictes de TypeScript.

### Étape 2 : Organiser la structure du projet

1. **Créer les dossiers de sources et de sorties** :

   Crée le dossier `src` qui contiendra les fichiers TypeScript.

   ```bash
   mkdir src
   ```

2. **Organiser les classes et les interfaces dans des sous-dossiers** :

   Crée une structure de dossiers dans `src` :

   ```bash
   mkdir src/services
   mkdir src/interfaces
   ```


### Étape 3 : Ajouter des scripts pour compiler et exécuter le projet

1. **Modifier `package.json`** pour ajouter un script permettant de compiler le projet et un autre pour l'exécuter avec `nodemon` :

   Dans le fichier `package.json`, ajoute les lignes suivantes sous `"scripts"` :

   ```json
   "scripts": {
     "build": "tsc",
     "start": "nodemon src/main.ts",
      "dev": "nodemon --watch ./**/*.ts --exec ts-node src/main.ts",

   }
   ```

2. **Compiler le projet** :

   Compile le projet en exécutant :

   ```bash
   npm run build
   ```

   Cela créera les fichiers JavaScript dans le dossier `dist`.

3. **Exécuter le projet en mode developpement** :

   Pour exécuter le projet avec `nodemon` (qui surveille les changements), lance la commande suivante :

   ```bash
   npm run dev
   ```

   Cela exécutera le fichier `main.ts` et affichera les résultats dans la console.


### Structure finale du projet

Le projet devrait ressembler à ceci :

```
Card/
├── dist/                     // Fichiers compilés
├── node_modules/
├── src/
│   ├── interfaces/
│   │   └── Storable.ts
│   ├── services/
│   └── main.ts
├── package.json
├── tsconfig.json
└── package-lock.json
```
