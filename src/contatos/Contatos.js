import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { NavigationActions } from 'react-navigation'


class Contatos extends React.Component {
    // componentDidMount() {
    //     const resetAction = NavigationActions.reset({
    //         index: 0,
    //         actions: [
    //             NavigationActions.navigate({ routeName: 'Contatos' }),
    //             NavigationActions.navigate({ routeName: 'Chat' })
    //         ]
    //     })
    //     this.props.navigation.dispatch(resetAction)
    // }
    render() {
        return (
            <View style={styles.container}>
                <Text>Contatos</Text>
            </View>
        )
    }

}


export default Contatos

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})