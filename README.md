##Here will be all the necessary commands for this project and meaby some additional information as well

### Starting a new project

```powershell
npm create vite@latest {project folder name} -- --template react
cd {project folder name}
npm install
```

### Setting up a JSON server and axios

First go to your project root folder then run 

```powershell
npx json-server --port=3001 --watch db.json
```

then in the same folder run 

```powershell
npm install axios
npm install json-server --save-dev
```

then add this to your scripts inside the projects package.json file

```powershell
"server": "json-server -p3001 --watch db.json"
```

now you can run the server with

```powershell
npm run server
```



