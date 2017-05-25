import React, {Component} from 'react'
import {View,Text,StyleSheet,TextInput,ListView,StatusBar} from 'react-native';
import {debounce} from 'lodash';
import {searchFor} from '../utils/fetch';
import ListItem from './ListItem';

export default class Main extends Component{
	constructor(props) {
	  super(props);
	  const dataSource = new ListView.DataSource({
	  	rowHasChanged:(r1,r2) => r1 !== r2
	  })

	  this.state = {tvShows: dataSource};
	}
	makeQuery = debounce(query => {
		searchFor(query)
		  .then(shows => {
		  	this.setState({
		  		tvShows:this.state.tvShows.cloneWithRows(shows)
		  	})
		  }).catch((error) => {
		  		throw error
		  })		
	}, 400);

	renderRow = (show, id) => {
		const imageUrl = "https://image.tmdb.org/t/p/w92/" + show.poster_path + '';
		return (
			<ListItem
				text={show.name}
				imageUrl = {imageUrl}
			 />
		)
	}

	render(){
		return(
			<View style={styles.container}>
			<StatusBar barStyle="light-content" />
				<View style={styles.header}>
					<Text style={{color:'white',fontSize:25}}>Episode Title</Text>
				</View>
				<View style={styles.inputView}>
					<TextInput style={styles.searchBox} 
					onChangeText= { this.makeQuery}
					underlineColorAndroid = 'rgba(0, 0, 0, 0)'
					 />	
				</View>
				<ListView 
					dataSource = {this.state.tvShows}
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
	header:{
		backgroundColor:'dodgerblue',
		height:40,
		alignItems:'center',
		justifyContent:'center'
	},	
	searchBox:{
		height:40,
		borderColor:'black',
		borderWidth:2,
		fontWeight:'800',
		margin:10,
		width:200,
		justifyContent:'center'
	},
	inputView:{
		alignItems:'center'
	}
})