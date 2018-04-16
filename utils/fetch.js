import { TMDB_API_KEY } from './api.js'

export function get(url){
	return fetch(url)
		.then((response) => response.json());
}

export function searchFor(query){
	console.log(query)
	const requestUrl = (
		'https://api.themoviedb.org/3/search/tv?api_key=' + TMDB_API_KEY + '&language=en-US&query='+ query + ''
	)
  console.log('ia m request url', requestUrl)
	return get(requestUrl)
		.then((res) => {
			const tvShows = res.results ? res.results : []
			return tvShows
	})
}

export function find(id){
	//add another 
	var showDataUrl = 'https://api.themoviedb.org/3/tv/' + id + '?api_key=' + TMDB_API_KEY + '&language=en-US'
  console.log(showDataUrl)
	return get(showDataUrl)
		.then((showData) => {
			var seasons = showData.number_of_seasons
			var seasonArray = [];
			for(i=1; i<=showData.number_of_seasons; i++){
				seasonArray.push(i)
			}
			console.log(seasonArray)
			return seasonArray
		}).catch((err)=> {
		console.error("error at find function",err)
	})
}

export function getSeasons(season,id){
	console.log("these are the seasons and id",season, id)
	var seasonUrl = (
		'https://api.themoviedb.org/3/tv/' + id + '/season/' + season + '?api_key=' + TMDB_API_KEY + '&language=en-US'	
	)
	return get(seasonUrl).then((seasonData) => {
		console.log("this is seasondata",seasonData)
		return seasonData
	}).catch((err) => {
		console.error("Error at get seasons function",err)
	})
}