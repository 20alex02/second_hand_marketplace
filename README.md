# Bazos

## Authors
 - [Alex Popovič] - backend
 - [Radim Kaděra] - organization, backend
 - [Romana Gažová] - frontend
 - [Jan Rašovský] - frontend

## Requirements 
Node - v21.7.2
PostgreSQL - v16.3


## Installation guide
Setup database: https://www.postgresql.org/docs/current/tutorial-createdb.html
In backend folder create .env file, fill DATABASE_URL, SECRET and PORT (should match the port used in BASE_URL from frontend/src/services/base.ts)
After running seed paths to images get created. Create those images (car1.jpg, apartment1.jpg, guitar1.jpg, guitar2.jpg) in /backend/src/images folder
```
cd second_hand_marketplace
nvm use 21.7.2
npm i
cd frontend
npm i
cd ../backend 
npm i
npm run seed
cd ..
npm run dev
```