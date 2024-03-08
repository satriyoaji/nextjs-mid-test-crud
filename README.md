## Fullstack Mid Developer Test

### Guidelines

Prerequisite:
- Docker
- Node
- npm or Yarn (with npx)

#### Installation & Running
1. Run `yarn install` or `npm install` 
2. Copy file `.env.example` to `.env` for application variables 
3. Fill out the DB connection config based on your Dockerized Postgres DB (docker compose file is on `docker-compose.yml` file) 
4. Run the DB migration using command `npx prisma migrate dev --name init`
5. Run the app containers using Docker compose
```cmd
docker-compose up -d
```
then wait e minute for the service running until success.
Then Run the app using command `yarn dev` or `npm run dev`. For the default, The service will be available on `localhost:3000` on your local 
