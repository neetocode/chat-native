const INITAL_STATE = {
    contatos: [],
    chats: {},
    ipServer: "192.168.0.103:43284/TrabalhoWebSocket/",
    conectado: false,
    usuario: null,
    token: null
}

export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case 'ALTER_IPSERVER':
            return { ...state, ipServer: action.payload }

        case 'MESSAGE_RECEIVED':
            return { ...state, chats: action.payload }
        case 'SYSTEM':
            return { ...state, chats: action.payload }
        case 'AUTHENTICATION':
            return { ...state, usuario: action.payload }
        case 'USERS':
            return { ...state, contatos: action.payload }

        case 'WS_CONECTADO':
            console.log('WS_CONECTADO')
            console.log(action.payload)
            return { ...state, conectado: true }
        case 'WS_NOVA_MENSAGEM':
            debugger
            console.log('WS_NOVA_MENSAGEM')
            console.log(action.payload)
            return { ...state }
        case 'WS_ERROR':
            console.log('WS_ERROR')
            console.log(action.payload)
            return { ...state }
        case 'SET_TOKEN':
            return { ...state, token: action.payload }


        default:
            return state
    }
}