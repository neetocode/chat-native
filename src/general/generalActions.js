import axios from 'axios'

let ws

export const desconectaWs = () =>{
    return dispacth =>{
        
        if(ws) ws.close()
    }
}

export const conectarWs = token => {
    return (dispatch, state) => {
        ws = new WebSocket(`ws://${state().general.ipServer}chat?t=${token}`)

        ws.onopen = event => {
            dispatch({ type: 'WS_CONECTADO', payload: event.data })
        }

        ws.onmessage = event => {
            const frame = JSON.parse(event.data)
            switch (frame.type) {
                case 'message':
                    debugger
                    const chats = state().general.chats
                    let chat = chats[frame.userFrom.id]
                    if (!chat) chat = []
                    chat.push({
                        text: frame.message,
                        sameOrigin: frame.sameOrigin
                    })
                    const newChat = [].concat(chat)
                    const newChats = { ...chats, [frame.userFrom.id]: newChat }
                    dispatch({ type: 'MESSAGE_RECEIVED', payload: newChats })
                    break;
                case 'system':
                    
                    break;
                case 'authentication':
                    dispatch({type: 'AUTHENTICATION', payload: {
                        id: frame.id,
                        username: frame.username
                    }})
                    break;
                case 'users':
                    let users = JSON.parse(frame.data)
                    users = users.sort((a, b) => a.online ? -1 : 1)
                    console.log(state().general.usuario.id)
                    users = users.filter(user => user.id !== state().general.usuario.id)
                    dispatch({ type: 'USERS', payload: users })
                    break;
            }

        }

        ws.onerror = event => {
            dispatch({ type: 'WS_ERROR', payload: JSON.parse(event.data) })
        }

    }
}

// export const atualizarContatos = () => {
//     return {
//         type: 'CONTATOS_FETCHED',
//         payload: [
//             { "online": true, "id": "1", "username": "Miguel Neto" },
//             { "online": false, "id": "2", "username": "Tiago Oliveira" },
//             { "online": false, "id": "3", "username": "Jorge Rodrigues" },
//             { "online": false, "id": "4", "username": "George Leite" }
//         ]
//     }
// }

export const enviarMensagem = ({ mensagem, destino }) => {
    return dispatch =>{

        const frameSend = {
            message: mensagem,
            to: destino,
            type: 'message'
        }
        ws.send(JSON.stringify(frameSend))
        dispatch({type: 'MENSAGEM_ENVIADA', payload: frameSend})
    }
}