npm install -f
npm run build-test

pm2 delete todolist-backend:5041
pm2 start npm --name "todolist-backend:5041" -- start --attach
