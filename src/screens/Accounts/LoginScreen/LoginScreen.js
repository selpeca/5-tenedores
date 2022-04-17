import { View, ScrollView } from 'react-native'
import React from 'react'
import { styles } from './LoginScreen.styles'
import { Image, Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils'
import { LoginForm } from '../../../components/Auth'
export function LoginScreen() {
  const navigation = useNavigation();
  const goToRegister = () =>{
    navigation.navigate( screen.account.register )
  }

  return (
    <ScrollView>
      <Image source={require('../../../../assets/img/5-tenedores-letras-icono-logo.png')} 
      style={styles.image}
      />
      <View style={styles.content}>
        <LoginForm/>
        <Text style={styles.textRegister}>
          ¿Aún no tienes cuenta? <Text style={styles.btnRegister} onPress={() => {goToRegister()}}>Registrarse</Text>
        </Text>
      </View>
    </ScrollView>
  )
}