import React, {Component} from 'react'
import {View,Text,StyleSheet,TextInput,ListView} from 'react-native';
import {debounce} from 'lodash';
import {searchFor} from '../utils/fetch';
import ListItem from './ListItem';
import Spinner from 'react-native-loading-spinner-overlay';
const placeholder = require("../assets/placeholder.png")
//slow react navigation transition on back button press

export default class Main extends Component{
	  static navigationOptions = {
	    title: 'Episode Title',
	    headerStyle:{
	    	backgroundColor:'purple',
	    	justifyContent:'center'
	    },
	    headerTitleStyle:{
	    	color:'white',
	    	alignSelf:'center'
	    }
	  }
	constructor(props) {
	  super(props);
	  const dataSource = new ListView.DataSource({
	  	rowHasChanged:(r1,r2) => r1 !== r2
	  })
	  this.state = {tvShows: dataSource, visible:false};
	}

	
	makeQuery = debounce(query => {
		this.setState({
			visible:!this.state.visible
		})
		searchFor(query)
		  .then(shows => {
		  	this.setState({
		  		tvShows:this.state.tvShows.cloneWithRows(shows),
		  		visible:!this.state.visible
		  	})
		  }).catch((error) => {
		  		throw error
		  })		
	}, 400);

	renderRow = (show, id) => {
		var shortenedUrl = "https://image.tmdb.org/t/p/w92/" + show.poster_path + '';
		var imageUrl = (
			show.poster_path ? {uri:shortenedUrl} : placeholder
		)
		return (
			<ListItem
				text={show.name}
				imageUrl = {imageUrl}
			 	id={show.id}
			 	navigation={this.props.navigation}
			 />
		)
	}

	render(){
		return(
			<View style={styles.container}>
				<Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color:'grey'}} />
				<View style={styles.inputView}>
					<TextInput style={styles.searchBox} 
					onChangeText= { this.makeQuery}
					underlineColorAndroid = 'rgba(0, 0, 0, 0)'
					selectionColor = "black"
					placeholder="Type the name of a tv series"
					 />	
				</View>
				<ListView 
					dataSource = {this.state.tvShows}
					renderRow = {this.renderRow}
					enableEmptySections={true}
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
	header:{
		backgroundColor:'#512DA8',
		height:40,
		alignItems:'center',
		justifyContent:'center'
	},	
	searchBox:{
		height:35,
		borderColor:'black',
		borderWidth:1,
		width:220,
		paddingBottom:2,
		borderRadius:2
	},
	inputView:{
		alignItems:'center',
		marginTop:10,
		marginBottom:10
	}
})