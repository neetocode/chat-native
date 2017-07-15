import axios from 'axios'

let ws

export const conectarWs = token => {
    return (dispatch, state) => {
        console.log('iniciando ws')
        console.log(`ws://${state().general.ipServer}chat?t=${token}`)
        ws = new WebSocket(`ws://${state().general.ipServer}chat?t=${token}`)

        ws.onopen = event => {
            dispatch({ type: 'WS_CONECTADO', payload: event.data })
        }

        ws.onmessage = event => {
            const frame = JSON.parse(event.data)
            switch (frame.type) {
                case 'message':
                    console.log(frame.userFrom.id)
                    console.log(frame.message)
                    const chats = state().general.chats
                    //const chatsNew = { ...chats, []}
                    //dispatch({type:'MESSAGE', payload: })
                    break;
                case 'system':

                    break;

                case 'authentication':
                    
                    break;
                case 'users':
                    let users = JSON.parse(frame.data)
                    users = users.sort((a, b) => a.online ? -1 : 1)
                    dispatch({ type: 'USERS', payload: users })
                    break;
            }

        }

        ws.onerror = event => {
            dispatch({ type: 'WS_ERROR', payload: JSON.parse(event.data) })
        }

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

export const mensagemRecebida = () => {
    return {
        type: 'MENSAGEM_RECEBIDA'
    }
}

export const enviarMensagem = ({ mensagem, destino }) => {
    return {
        type: 'MENSAGEM_ENVIADA'
    }
}