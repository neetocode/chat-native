import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { alterIpServer } from './../general/generalActions'

class Configuracao extends React.Component {
    state = {
        ipServer: this.props.ipServer
    }
    render() {
        debugger
        let isInicio = false
        if(this.props.navigation.state.params){
            if(this.props.navigation.state.params.inicio) isInicio = true
        }
        return (
            <View style={styles.container}>
                <FormLabel>IP do servidor</FormLabel>
                <FormInput
                    onChangeText={(ipServer)=>this.setState({ipServer})}
                    value={this.state.ipServer}
                />
                <Button
                    title='Salvar'
                    buttonStyle={{backgroundColor: this.props.ipServer !== this.state.ipServer ? 'green':'gray'}}
                    disabled={this.props.ipServer === this.state.ipServer}
                    onPress={()=> this.props.alterIpServer(this.state.ipServer)}
                />
                {isInicio?
                <Button
                    title='Voltar'
                    onPress={()=> this.props.navigation.navigate('login')}
                />
                :
                null}
            </View>
        )
    }

}
const mapStateToProps = state => ({
    ipServer: state.general.ipServer
})
const mapDispatchToProps = dispatch => bindActionCreators({ alterIpServer }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Configuracao)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:10
    }
})