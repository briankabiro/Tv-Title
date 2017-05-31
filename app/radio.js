import {SegmentedControls } from 'react-native-radio-buttons'
import React, {Component} from 'react'
import {View, Text, ListView, Image, StyleSheet} from 'react-native'
import {getSeasons} from '../utils/fetch';
const placeholder = require("../assets/placeholder.png")
// radio js receives the data, on selected state load the data from that season with new link for episodes.js, add another function to fetch js that 
//returns only the episodes and then pass that to navigator so that options is populated
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
		const ImageUrl = (
			x.still_path ? {uri:"https://image.tmdb.org/t/p/w185" + x.still_path + ''} : placeholder
		)
		return (
			<View style={styles.eachEpisode}>
				<Image style={styles.image} source = {ImageUrl} />
				<View>
					<Text style={styles.title}>{x.name}</Text>
					<Text style={styles.seasonDetails}>S{x.season_number} - E{x.episode_number}</Text>
				</View>
			</View>
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
			<View>
				<Text style={{fontWeight:'500', color:'#2f4554', textAlign:'center'}}>Pick a Season</Text>
				<SegmentedControls
				 	options={ options }
				 	selectedTint={'white'}
				 	tint={'coral'}
				 	backTint={'white'}
				 	onSelection={ setSelectedOption.bind(this)}
				 	selectedOption={this.state.selectedOption}
				 />
				 <Text>Season {this.state.selectedOption || 'none'}</Text>
				<View style={{backgroundColor:'white'}}>	
					<Text style={styles.episodeHeader}>Episodes</Text>
					<ListView 
						style={{flex:1}}
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
	heading:{
		textAlign:'center',
		color:'white',
		padding:10,
		fontWeight:'500',
		fontSize:14
	},
	eachEpisode:{
		marginBottom:10,
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'white'
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
	episodeHeader:{
		fontSize:15,
		textAlign:'center',
		color:'purple'
	}
})