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
//dark - 2f4554, greys 414646,lighter grey -  e4ddea, a5accb, 879b97, white bgs - f5f6f7
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
					<Text style={styles.title}>{x.name}</Text>
					<Text style={styles.seasonDetails}>S{x.season_number} - E{x.episode_number}</Text>
				</View>
			</View>
		)
	}

	render(){
		return(
			<View style={styles.container}>
				<View style={{elevation:4,backgroundColor:'purple',marginBottom:10}}>
					<Text style={styles.heading}>Episode Titles</Text>
				</View>
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
	}
})