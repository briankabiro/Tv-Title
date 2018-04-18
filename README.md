## TV Title

Tv title is an app that allows you to look at the names of the episodes of your favorite tv shows. 
#theprotectorofspoilers

## Setting up the project
1. `git clone https://github.com/briankabiro/Tv-Title.git`
2. Cd into `Tv Title` and run `yarn install`
3. The app needs an API key to run and one can get that by following the steps at:  `https://developers.themoviedb.org/3/getting-started/introduction`
4. Once you have the API key, paste it into `utils/api.js` so that it looks like this:
`export const TMDB_API_KEY = '<Your_API_KEY_here>';`
