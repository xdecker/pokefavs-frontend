This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# PokéFavs Frontend

This is the frontend for **PokéFavs**, a web app to browse Pokémon, mark your favorites, and share your favorite lists with a unique code.

The app uses **Next.js, TailwindCSS, Zustand, and React**.  

It connects to two APIs:

1. **PokéAPI** → To fetch Pokémon lists and details.  
2. **PokéFavs Backend** → To save your selected favorites and retrieve them using a unique code.

## Project structure

```bash
app/                  # Next.js app folder (pages, layouts)
components/           # features components and Reusable UI components
interfaces/           # TypeScript interfaces
lib/                  # API helpers and their tests
  ├── pokeapi.ts      # Functions to fetch from PokéAPI
  └── pokefavsapi.ts  # Functions to save/retrieve favorites
providers/            # Providers like React Hot Toast
stores/               # Zustand stores
utils/                # Utility functions
```


## How it works

* The homepage lists Pokémon with pagination. You can mark them as favorites directly from the list.

* Clicking More Info on a Pokémon card takes you to a detail page where you can also add/remove it from favorites.

* The Favorites view shows all Pokémon you’ve selected, like a checkout. When you save, a modal appears with a unique code to copy. After confirming, your local favorites list is cleared.

* The sidebar has a counter showing how many favorites are currently selected.

## Favorites logic
* Uses Zustand to store selected favorites in memory (with persistence in localStorage).
* Functions: 
```ts
addFavorite(pokemon: SimplePokemon)       // Add Pokémon if not already in the list
removeFavorite(id: string)               // Remove by ID
clearFavorites()                          // Clear the list after saving
```

* The backend requires:

 - POST /favorites → To save your list and get a code.

 - GET /favorites/:code → To retrieve the list using the code.

* Stored favorites format:

```ts
interface SimplePokemon {
  id: string;
  name: string;
}
```

## How to run the project

### 1) Install dependencies
```bash
npm install
```

### 2) Run the development server
```bash
npm run dev
```

*Open your browser (maybe change port for disponibility):*
```http://localhost:3000```

### 3) Build for production
```bash
npm run build
npm start
```

### 4) Testing
* The project uses Vitest.

```bash
# Run all tests
npm run test:run

# Run in watch mode
npm run test

# Open the Vitest UI
npm run test:ui
```

## Notes
- PokéAPI is used for all Pokémon data, including sprites and details.
- Favorites are stored locally with Zustand and only sent to your backend when saved.
- The unique code allows sharing your favorite list with others.
- Pagination is done on the frontend by requesting batches of Pokémon from the API.
- Some of the latest Pokémon might not have images available yet

## Future Improvements
* Add filtering/search by type or name.
* Better error handling for API requests.
* Animations for adding/removing favorites.
* Mobile-first UI improvements.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
