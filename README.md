## Fullstack Mid Developer Test

### Guidelines

Prerequisite:
- Docker
- Node
- npm or Yarn (with npx)

#### Installation & Running
1. Run `yarn install` and/or `npm install` 
2. Copy file `.env.example` to `.env` for application variables 
3. Fill out the env variables and DB connection config based on your Dockerized Postgres DB (docker compose file is on `docker-compose.yml` file)
4. Run the app containers using Docker compose
```cmd
docker-compose up -d
```
5. Run the DB migration using command `npx prisma migrate dev`
6. Then running seeders with command `npx prisma db seed` 
then wait e minute for the service running until success.
Then Run the app using command `yarn dev` or `npm run dev`. For the default, The service will be available on `localhost:3000` on your local 

#### Default User Login
email: `admin@mail.com`
password: `password123`
