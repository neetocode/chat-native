import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FormLabel, FormInput, Button, Icon, FormValidationMessage } from 'react-native-elements'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'

import { setToken } from './loginActions'


class Login extends React.Component {
    state = {
        login: '',
        senha: '',
        loginIncorreto: false,
        loading: false
    }

    alterLogin(login) {
        this.setState({ login })
    }

    alterSenha(senha) {
        this.setState({ senha })
    }

    async sendLogin() {
        const { navigation: { navigate }, setToken, ipServer } = this.props
        const { login, senha } = this.state
        debugger
        try {
            this.setState({
                loginIncorreto: false,
                loading: true
            })
            const result = await axios.post(`${ipServer}/webresources/login`, { usuario:login, senha })
            console.log(`${ipServer}/webresources/login`)
            debugger
            if (result.r) {
                setToken(result.data.token)
                navigate('mainFlux')
            } else {
                this.setState({
                    loginIncorreto: true,
                    senha: '',
                    loading: false
                })
            }
        } catch (ex) {
            console.log(ex)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon name="chat" iconStyle={styles.iconChat} />


                <View style={styles.containerInputs}>
                    <FormLabel>Login</FormLabel>
                    <FormInput containerStyle={{}} multiline={true} placeholder="Digite seu login" onChangeText={this.alterLogin.bind(this)} />

                    <FormLabel>Senha</FormLabel>
                    <FormInput multiline={false} placeholder="Digite sua senha" onChangeText={this.alterSenha.bind(this)} secureTextEntry={true} />
                    <FormValidationMessage labelStyle={{ textAlign: 'center' }}>Login ou senha inválida</FormValidationMessage>

                    <Button
                        style={{ marginTop: 20 }}
                        iconRight
                        icon={{ name: 'send' }}
                        title='ENTRAR'
                        onPress={this.sendLogin.bind(this)}
                    />
                </View>
            </View>
        )
    }

}

const mapDispatchToProps = dispatch => bindActionCreators({ setToken }, dispatch)
const mapStateToProps = state => ({
    ipServer: state.general.ipServer
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)


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
    iconChat: {
        color: 'gray',
        fontSize: 36,
        marginBottom: 10
    }
})