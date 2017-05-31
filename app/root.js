import React, {Component} from 'react'
import {Navigator} from 'react-native'

import Main from './main'
import Episodes from './Episodes'
import ListItem from './ListItem'
import Radio from './radio'
import {StackNavigator} from 'react-navigation'


const Root = StackNavigator({
	Home:{
		screen:Main
	},
	Radio:{
		screen:Radio
	},
	ListItem:{
		screen:ListItem
	}
})

export default () => <Root />;