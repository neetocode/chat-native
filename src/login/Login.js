import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FormLabel, FormInput, Button, Icon, FormValidationMessage } from 'react-native-elements'


class Login extends React.Component {
    state = {
        login: '',
        senha: ''
    }
    alterLogin(login) {
        this.setState({ login })
    }

    alterSenha(senha) {
        this.setState({ senha })
    }

    entrar(){
        console.log(this.state)
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon name="chat" iconStyle={styles.iconChat}/>


                <View style={styles.containerInputs}> 
                    <FormLabel>Login</FormLabel>
                    <FormInput containerStyle={{}} multiline={true} placeholder="Digite seu login" onChangeText={this.alterLogin.bind(this)} />

                    <FormLabel>Senha</FormLabel>
                    <FormInput multiline={false} placeholder="Digite sua senha" onChangeText={this.alterSenha.bind(this)} secureTextEntry={true} />
                    <FormValidationMessage labelStyle={{textAlign:'center'}}>Login ou senha inválida</FormValidationMessage>

                    <Button
                        style={{marginTop:20}}
                        iconRight
                        icon={{ name: 'send' }}
                        title='ENTRAR'
                        onPress={this.entrar.bind(this)}
                        />
                </View>
            </View>
        )
    }

}



export default Login


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40

    },
    containerInputs: {
        width: '120%'
    },
    iconChat:{
        color:'gray',
        fontSize:36,
        marginBottom:10
    }
})