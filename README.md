# Stoneframe

A React application for browsing and filtering a collection of stone pictures and information.

## Features

- Browse a catalog of stones with images
- Filter by name, description, or SKU
- Filter by category
- Option to show/hide sold items
- Visual indicator for sold items
- Responsive design
- Click on stones to view detailed information
- "NEW" badges for items added within the last 2 months

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone this repository
   ```
   git clone https://github.com/yourusername/stoneframe-app.git
   cd stoneframe-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Run the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Data Structure

Stone data is stored with the following structure:

```typescript
interface Stone {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  sku: string;
  isSold: boolean;
  created_at: string; // ISO date string
}
```

## Adding New Stones

To add new stones to the catalog, edit the stone data array in `src/App.tsx`, following the existing format.

## Building for Production

```
npm run build
```

This will generate optimized production files in the `dist` folder.

## Deployment

The application is configured for deployment to GitHub Pages.

### Automatic Deployment with GitHub Actions

When you push changes to the main branch, the GitHub Actions workflow will automatically build and deploy the application to GitHub Pages.

### Manual Deployment

You can also deploy manually using the following command:

```
npm run deploy
```

This will build the application and deploy it to the `gh-pages` branch of your repository.

### Setting Up GitHub Pages

1. In your GitHub repository, go to Settings > Pages
2. Set the Source to "GitHub Actions"
3. Your site will be available at `https://yourusername.github.io/stoneframe-app/`

## License

MIT