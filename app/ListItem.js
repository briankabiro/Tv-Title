import {
	Image,
	TouchableOpacity,
	StyleSheet,
	View,
	Text
} from 'react-native'
import FadeIn from './fadeIn'
import React from 'react'
import {find} from '../utils/fetch';
import {debounce} from 'lodash';
import Episodes from './Episodes'
import Radio from './radio'

export default class ListItem extends React.Component{
	constructor(props) {
	  super(props);
	  this.makeQuery = this.makeQuery.bind(this)
	  this.state = {};
	}

	makeQuery = (id) => {
		 find(id)
		  .then((seasonArray) => {
		  	console.log("seasons Array",seasonArray)
		  	this.props.navigation.navigate("Radio", {seasonArray:seasonArray, showId:id})
		  }).catch((error) => {
		  	  throw error
		  })		
	}

	render(){
		return(
			<TouchableOpacity onPress={() => this.makeQuery(this.props.id)}>
				<FadeIn delay = {1 * 25}>
					<View style= {styles.mediaObject}>
						<Image source = {this.props.imageUrl} style={styles.image} />
						<Text style={styles.text}>{this.props.text}</Text>
					</View>
				</FadeIn>
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
		width:75
	},
	text:{
		color:'#2f4554',
		fontSize:15,
		flex:1,
		marginLeft:10
	}
})