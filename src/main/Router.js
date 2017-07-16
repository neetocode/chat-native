import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'

import Login from './../login/Login'
import Contatos from './../contatos/Contatos'
import Chat from './../chat/Chat'
import Configuracao from './../configuracao/Configuracao'

const Router = TabNavigator({
    login: { screen: Login },
    configuracao: { screen: Configuracao },
    mainFlux: {
        screen: StackNavigator({
            contatos: { screen: Contatos },
            chat: { screen: Chat },
            configuracao: { screen: Configuracao }
        })
    }
}, {
        navigationOptions: {
            tabBarVisible: false,
        },
        initialRouteName: 'login'
    }
)

export default Router