import React from 'react'
import { Image } from 'react-native-elements'
import { RegisterForm } from '../../../components/Auth'
import { styles } from './RegisterScreen.styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image source={require('../../../../assets/img/5-tenedores-letras-icono-logo.png')} 
      style={styles.image}
      />
      <KeyboardAwareScrollView style={styles.content}>
        <RegisterForm/>
      </KeyboardAwareScrollView>
    </KeyboardAwareScrollView>
  )
}