import React from 'react'
import { StackNavigator } from 'react-navigation'

import Login from './../login/Login'
import Contatos from './../contatos/Contatos'
import Chat from './../chat/Chat'

const Router = StackNavigator({
    Login: { 
        screen: Login,
        path: 'login'
    },
    Contatos: { 
        screen: Contatos,
        path: 'app/contatos'
    },
    Chat: { 
        screen: Chat,
        path: 'app/chat'

    }
})

export default Router