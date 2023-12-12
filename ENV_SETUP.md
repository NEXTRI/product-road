# Environment Variables

​Environment variables are distributed in various files. Please refer them carefully.

## {PROJECT_FOLDER}/.env

File is available in the project root folder​

```
# Database Settings
PGUSER=postgres
PGPASSWORD=postgres123
PGHOST=localhost
PGPORT=5433
PGDATABASE=product-road
DATABASE_URL=postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}
```
