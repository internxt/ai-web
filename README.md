# AI Web

A modern React web application built with TypeScript and Vite, deployed on Cloudflare Pages.  
This document describes how to set up and run the development environment.

# Getting Started

## Installation

- Create a `.env` file by copying the `.env.template` provided in the repo (if applicable).
- Use `yarn` to install project dependencies.

## Scripts

### `yarn dev`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `yarn preview`

Serves the built application locally to preview the production output.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- Useful for testing the result of a production build.
- No hot reloading or development tools included.

> The preview command serves the latest build output, so if you haven't run build beforehand, it will either fail or serve outdated files.

### `yarn lint`

- Runs eslint linter

### `yarn test`

- Runs unit tests with [Vitest](https://vitest.dev/)

### `yarn build`

Builds the app for production to the `dist` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

### `yarn deploy`

Deploys the application to Cloudflare Pages.

Make sure you have configured your Cloudflare account with Wrangler CLI before deploying.

## Recommended VSCode Extensions

To speed up the development and maintenance of the project, it is recommended to use the following extensions for the IDE:

- Better Comments
- ESLint
- PostCSS Language Support
- Tailwind CSS IntelliSense
- GitLens
- Prettier
