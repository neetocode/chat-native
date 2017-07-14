import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'


class Configuracao extends React.Component {
    // componentDidMount() {
    //     const resetAction = NavigationActions.reset({
    //         index: 0,
    //         actions: [
    //             NavigationActions.navigate({ routeName: 'Configuracao' }),
    //             NavigationActions.navigate({ routeName: 'Chat' })
    //         ]
    //     })
    //     this.props.navigation.dispatch(resetAction)
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text>Configuracao</Text>
            </View>
        )
    }

}


export default Configuracao

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})