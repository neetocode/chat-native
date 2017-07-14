import axios from 'axios'

let ws

export const conectarWs = token => {
    return async (dispatch, state) => {
        debugger
        ws = new WebSocket(`ws://${state().general.ipServer}/chat?t=${token}`)

        ws.onopen = event => {
            console.log(event)
            dispatch({type:'WS_CONECTADO'})
        }

        ws.onmessage = event => console.log(event)

        ws.onerror = event => console.log(event)

    }
}

export const atualizarContatos = () => {
    return {
        type: 'CONTATOS_FETCHED',
        payload: [
            { "online": true, "id": "1", "username": "Miguel Neto" },
            { "online": false, "id": "2", "username": "Tiago Oliveira" },
            { "online": false, "id": "3", "username": "Jorge Rodrigues" },
            { "online": false, "id": "4", "username": "George Leite" }
        ]
    }
}

export const mensagemRecebida = () =>{
    return {
        type: 'MENSAGEM_RECEBIDA'
    }
}

export const enviarMensagem = ({mensagem, destino}) =>{
    return {
        type: 'MENSAGEM_ENVIADA'
    }
}