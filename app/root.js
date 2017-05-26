import React, {Component} from 'react'
import {Navigator} from 'react-native'

import Main from './main'
import Episodes from './Episodes'

export default class Root extends Component{
	renderScene(route, navigator){
		if( route.id === 'MAIN'){
			return <Main navigator = {navigator} />
		}else if(route.id === 'EPISODES'){
			return <Episodes navigator={navigator} />
		}
	}
	render(){
		return(
			<Navigator
				style={{ flex: 1 }}
				initialroute = {{ id: 'MAIN', title: 'Episode Title Search'}}
				renderScene = {this.renderScene}
				navigationBar = { NavigationBar }
			 />
		)
	}
}