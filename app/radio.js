import {SegmentedControls } from 'react-native-radio-buttons'
import React, {Component} from 'react'
import {View, Text, ListView, Image, StyleSheet, Dimensions} from 'react-native'
import {getSeasons} from '../utils/fetch';
import FadeIn from './fadeIn'
const placeholder = require("../assets/placeholder.png")

/*
listview doesn't display all items blocked by bottom screen
animation when loading the items to screen
handle empty array
*/
const {height, width} = Dimensions.get('window')

export default class Radio extends Component{
	constructor(props) {
	  super(props);
	  const dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2})
	  this.makeQuery = this.makeQuery.bind(this)
	  this.state = {
	  	episodes:dataSource
	  };
	}

	makeQuery = (season,id) => {
		 getSeasons(season,id)
		  .then((seasonData) => {
		  	this.setState({
		  		episodes: this.state.episodes.cloneWithRows(seasonData.episodes)
		  	})
		  }).catch((error) => {
		  	  throw error
		  })		
	}

	renderRow(x){
		//function that returns each episode data display in listview
		var ImageUrl = (
			x.still_path ? {uri:"https://image.tmdb.org/t/p/w185" + x.still_path + ''} : placeholder
		)
		return (
			<FadeIn delay = {x.episode_number * 25}>
				<View style={styles.eachEpisode}>
					<Image style={styles.image} source = {ImageUrl} />
					<View style={styles.episodeText}>
						<Text style={styles.title}>{x.name}</Text>
						<Text style={styles.seasonDetails}>S{x.season_number} - E{x.episode_number}</Text>
					</View>
				</View>
			</FadeIn>
		)	
	}

	render(){
		const options = this.props.navigation.state.params.seasonArray
		function setSelectedOption(selectedOption){
			this.setState({
				selectedOption,
			})//makequery search for that particular season here
			this.makeQuery(selectedOption,this.props.navigation.state.params.showId)
		}

		return(
			<View style={styles.container}>
				<Text style={{fontWeight:'300',marginTop:10,marginBottom:10, fontSize:15, color:'#2f4554', textAlign:'center'}}>Pick a Season</Text>
				<SegmentedControls
				 	options={ options }
				 	selectedTint={'white'}
				 	tint={'purple'}
				 	backTint={'white'}
				 	onSelection={ setSelectedOption.bind(this)}
				 	selectedOption={this.state.selectedOption}
				 	separatorTint={'#7E7E7C'}
				 	separatorWidth = {1}
				 	containerStyle = {{marginBottom:10}}		
				 	
				 />
				<View style={{backgroundColor:'white',flex:1}}>	
					<Text style={styles.episodeHeader}>Episodes</Text>
					<ListView 
						style={styles.listView}
						dataSource = {this.state.episodes}
						renderRow = {this.renderRow}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#f5f6f7'
	},
	eachEpisode:{
		marginBottom:10,
		flexDirection:'row',
		alignItems:'center'
	},
	image:{
		height:100,
		width:75,
		marginRight:15,
		marginLeft:20
	},
	title:{
		color:'#2f4554',
		fontSize:14
	},
	seasonDetails:{
		color:'#2f4554',
		fontSize:10
	},
	episodeText:{
		backgroundColor:'white'
	},
	episodeHeader:{
		fontSize:15,
		textAlign:'center',
		color:'purple',
		marginBottom:10
	}
})