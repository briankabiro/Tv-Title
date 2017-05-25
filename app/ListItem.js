import {
	Image,
	TouchableOpacity,
	StyleSheet,
	View,
	Text
} from 'react-native'
import React from 'react'
const ListItem = ({text, imageUrl}) => {
	const image = imageUrl

	return(
		<TouchableOpacity>
			<View  source= {styles.mediaObject}>
				<Image source = {{uri:imageUrl}} style={styles.image} />
				<Text style={styles.text}>{text}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default ListItem;

const styles = StyleSheet.create({
	mediaObject:{
		flex:1,
		alignItems:'center',
		flexDirection:'row',
		marginBottom:10
	},
	text:{flex:1},
	image:{
		backgroundColor:'grey',
		height:40,
		width:40,
		marginRight:16
	}
})