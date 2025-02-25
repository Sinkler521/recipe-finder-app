This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Assuming you have git and nodejs at your computer, use default command to clone the repository
```bash
git clone git@github.com:Sinkler521/recipe-finder-app.git
```
Open this project using any IDE (VSCode for example). You can use built-in terminal from here

Install all the dependencies from package.json:
```bash
npm install
# or
yarn
```

Create .env.local file in a root directory and define api key for proper promise work
you can do it here: https://spoonacular.com/food-api/docs#Authentication
```bash
NEXT_PUBLIC_SPOONACULAR_API_KEY=YOUR-API-KEY-HERE
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
