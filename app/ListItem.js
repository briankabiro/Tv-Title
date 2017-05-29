import {
	Image,
	TouchableOpacity,
	StyleSheet,
	View,
	Text
} from 'react-native'

import React from 'react'
import {find} from '../utils/fetch';
import {debounce} from 'lodash';
import Episodes from './Episodes'

export default class ListItem extends React.Component{
	constructor(props) {
	  super(props);
	  this.makeQuery = this.makeQuery.bind(this)
	  this.state = {};
	}

	makeQuery = (id) => {
		 find(id)
		  .then((episodes) => {
		  	console.log(episodes)
		  	this.props.navigation.navigate("Episodes", {seasonData:episodes, showId:id})
		  }).catch((error) => {
		  	  throw error
		  })		
	}

	render(){
		return(
			<TouchableOpacity onPress={() => this.makeQuery(this.props.id)}>
				<View style= {styles.mediaObject}>
					<Image source = {{uri:this.props.imageUrl}} style={styles.image} />
					<Text style={styles.text}>{this.props.text}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}



const styles = StyleSheet.create({
	mediaObject:{
		flex:1,
		flexDirection:'row',
		alignItems:'center',
		padding:10,
		borderBottomWidth:1,
		borderBottomColor:'#8e8e8e',
	},
	image:{
		backgroundColor:'grey',
		height:100,
		width:80,
	},
	text:{
		color:'#110622',
		fontSize:15,
		flex:1,
		marginLeft:10
	}
})