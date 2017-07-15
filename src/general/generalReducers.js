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
        case 'MESSAGE':
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
        case 'CONTATOS_FETCHED':
            return { ...state }
        case 'MENSAGEM_RECEBIDA':
            return { ...state }
        case 'SET_TOKEN':
            console.log('SET_TOKEN')
            return { ...state, token: action.payload }


        default:
            return state
    }
}