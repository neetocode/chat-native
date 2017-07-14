const INITAL_STATE = {
    contatos: [{ nome: 'Miguel Neto', online: true }],
    ipServer: "http://192.168.0.103:43284/TrabalhoWebSocket/",
    conectado: false,
    usuario: null,
    token: null
}

export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case 'WS_CONECTADO':
            return { ...state, conectado: true }
        case 'CONTATOS_FETCHED':
            return { ...state }
        case 'MENSAGEM_RECEBIDA':
            return { ...state }
        case 'SET_TOKEN':
            return { ...state, token: action.payload }


        default:
            return state
    }
}