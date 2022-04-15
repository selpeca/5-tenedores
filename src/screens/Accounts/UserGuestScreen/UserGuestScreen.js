import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Button, Image } from 'react-native-elements'
import { styles } from './UserGuestScreen.style'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils'


export function UserGuestScreen() {
  const navigation = useNavigation();
  const goToLogin = () =>{
    navigation.navigate( screen.account.login )
  }


  return (
    <ScrollView centerContent={true} style={styles.content}>
    <Image 
      source={require("../../../../assets/img/user-guest.jpg")}
      style={styles.image}
      />
      <Text style={styles.title}>Consultar perfil de 5 tenedores.</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut omnis in ipsa tempore fugit, error dignissimos eius ab illo dolore neque? Dolore odit cupiditate natus ipsam modi sequi explicabo. Suscipit?
      </Text>
      <Button buttonStyle={styles.btnStyle} title="Ver tu perfil" onPress={() =>{goToLogin()}}/>
    </ScrollView>
  )
}