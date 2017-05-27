import React, {Component} from 'react' 
import {
	View,
	Text,
	ListView,
	Image,
	StyleSheet
} from 'react-native';
const placeholder = require("../assets/placeholder.png")

// way to render whole picture in view, find pictures to style listview better, add shadow to top view, add back button, add error message if not found

export default class Episodes extends Component{
	constructor(props) {
	  super(props);
	  const episodesArray = this.props.navigation.state.params.seasonData.episodes
      const dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2
      })
	  this.state = {
	  	episodes:dataSource.cloneWithRows(episodesArray)
	  };
	}

	renderRow(x){
		const ImageUrl = (
			x.still_path ? {uri:"https://image.tmdb.org/t/p/w185" + x.still_path + ''} : placeholder
		)
		return (
			<View style={styles.eachEpisode}>
				<Image style={styles.image} source = {ImageUrl} />
				<View>
					<Text>S{x.season_number} E{x.episode_number}</Text>
					<Text style={styles.title}>{x.name}</Text>
				</View>
			</View>
		)
	}

	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.heading}>Episode Titles</Text>
				<ListView 
					dataSource = {this.state.episodes}
					renderRow = {this.renderRow}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'white'
	},
	heading:{
		textAlign:'center',
		color:'purple',
		padding:10
	},
	image:{
		height:70,
		width:70,
		marginRight:15
	},
	eachEpisode:{
		marginBottom:10,
		flexDirection:'row',
		alignItems:'center'
	},
	title:{
		color:'#36454F',
		fontSize:15
	}
})