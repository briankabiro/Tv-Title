import React, {Component} from 'react'
import {Navigator} from 'react-native'

import Main from './main'
import Episodes from './Episodes'
import ListItem from './ListItem'
import {StackNavigator} from 'react-navigation'

const Root = StackNavigator({
	Home:{
		screen:Main
	},
	Episodes:{
		screen:Episodes
	},
	ListItem:{
		screen:ListItem
	}
},{
	headerMode:'none'
})

export default () => <Root />;