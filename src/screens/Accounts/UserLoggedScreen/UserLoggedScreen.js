import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { InfoUser } from '../../../components/Account/InfoUser/InfoUser'
import { getAuth, signOut } from 'firebase/auth'
import { LoadingModal } from '../../../components'
import { styles } from './UserLoggedScreen.styles'
import { Button } from 'react-native-elements'

export function UserLoggedScreen() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  
  const logout = async () =>{
    const auth = getAuth();
    await signOut(auth)
  }
  return (
    <View>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnStyle}
        titleStyle={styles.btnTextStyle}
        onPress={logout}
      />
      <LoadingModal show={loading} text={loadingText} />
    </View>
  )
}