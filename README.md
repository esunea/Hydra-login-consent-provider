### API-DOMII-V2

#### FoalTS memento

```bash
# Dependencies
npm install -g @foal/cli

# Create a new application
foal createapp <AppName>

# Create a new entity
foal generate entity <EntityName>

# Create database migrations
npm run build:app
npm run migration:generate -- --name=<MigrationName>
npm run build:migrations
npm run migration:run

# Development mode
npm run develop
```
