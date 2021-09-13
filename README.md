## Planned Features

#### `/collector`
- Breakdown of professions and roles played by each player in the collector set
- Timeline of events - Start time => Each boss (with success rate and name and icon) => Finish time
- Sidebar with links to scrollable sections in the collector

#### `player`
- Can enter an account name to view stats for that specific player
- Boss breakdown with success rate and personalized deaths/downs, dps per class/role
- profession breakdown with avg dps per profession/role downs/deaths etc
- Recent Logs - 25 most recent 
- Collectors - list of all collectors that player is in - with basic info

#### `/logs`
- Browse all logs for a given account name
- select logs and create a collector from them (24h time span maximum)
- upload logs - take the file, give it to dps.report and return the json for processing

#### `/log?{permalink}`
- iframe in dps report for the given permalink

---------------------------------------

## Available Scripts
In the project directory, you can run:

### `npm run start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`
Builds and deploys that same local build to the gh-pages branch of this repo - which is then served on github pages - [here](https://scott-mueller.github.io/gw2-raid-dashboard)
