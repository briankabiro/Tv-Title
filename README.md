## TV Title

Tv title is an app built with React Native that allows you to look at the names of the episodes of your favorite tv shows. 

## Demo
![Home screen](assets/screenshots/home_screen.png?raw=true "Home Screen")

![Search results](assets/screenshots/results.png?raw=true "Search results")

![Episode list](assets/screenshots/episode_list_1.png?raw=true "Episode list")

![Second Episode list](assets/screenshots/episode_list_2.png?raw=true "Second Episode list")



## Setting up the project

1. Run `git clone https://github.com/briankabiro/Tv-Title.git`

2. cd into `Tv Title` and run `yarn install` to install the dependencies

3. The app needs an API key to run and one can get that by following the steps at:  `https://developers.themoviedb.org/3/getting-started/introduction`

4. Once you have the API key, paste it into `utils/api.js` so that it looks like this:
`export const TMDB_API_KEY = '<Your_API_KEY_here>';`

5. Run `react-native start` to start the packager

6. Once the packager is up and running: run `react-native run-ios`/ `react-native run-android` depending on the platform you have setup. :smile:


## TODO
- [ ] Add random list of movies on home screen
- [ ] Load first season by default when a season is selected
- [ ] Check whether searching on keypress is better than searching when button is clicked
- [ ] Position text in the search bar
- [ ] Change `Episode Title` text to something better
