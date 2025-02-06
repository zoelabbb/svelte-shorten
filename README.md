# URL Shortener

A simple and fast URL shortener built with SvelteKit.

## Features

- 🔗 Shorten long URLs into short, shareable links
- 📊 Track shortened URLs
- 🚀 Fast and lightweight
- 🔒 Secure and reliable

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/zoelabbb/svelte-shorten.git
cd svelte-shorten.git
```

### 2. Install Dependencies

```bash
pnpm install  # or npm install or yarn install
```

### 3. Start Development Server

```bash
pnpm run dev  # or npm run dev or yarn dev
```

Open your browser and visit `http://localhost:5173` to see the app in action.

## Building for Production

To build the app for production, run:

```bash
pnpm run build  # or npm run build or yarn build
```

You can preview the production build with:

```bash
pnpm run preview  # or npm run preview or yarn preview
```

## Deployment

To deploy the app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## API Endpoints

- `POST /shorten` - Shortens a given URL
- `GET /:shortUrl` - Redirects to the original URL

## License

This project is licensed under the MIT License.
