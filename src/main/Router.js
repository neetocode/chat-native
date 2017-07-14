import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'

import Login from './../login/Login'
import Contatos from './../contatos/Contatos'
import Chat from './../chat/Chat'

const Router = TabNavigator({
    login: { screen: Login },
    mainFlux: {
        screen: StackNavigator({
            contatos: { screen: Contatos },
            chat: { screen: Chat }
        })
    }
}, {
        navigationOptions: {
            tabBarVisible: false 
        }
    }
)

export default Router