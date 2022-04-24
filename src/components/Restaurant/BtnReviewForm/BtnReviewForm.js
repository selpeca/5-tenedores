import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { styles } from './BtnReviewForm.styles'
import { useNavigation } from '@react-navigation/native'
import { db, screen } from '../../../utils'

export function BtnReviewForm(props) {
    const {idRestaurant} = props;
    const [hasLogged, setHasLogged] = useState(false)
    const [hasReview, setHasReview] = useState(false)
    const navigation = useNavigation();
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) =>{
            setHasLogged(user?true:false);
        });
    }, [])
    useEffect(() => {
      if (hasLogged) {
        const q = query(
          collection(db,"reviews"),
          where("idRestaurant","==",idRestaurant),
          where("user_id","==",auth.currentUser.uid),
        )
        onSnapshot(q, (snapshot) =>{
          if(snapshot.docs.length > 0) setHasReview(true)
        })
      }
    }, [hasLogged])
    

    const goToLogin = () =>{
        navigation.navigate(screen.account.tab,{
            screen: screen.account.login
        });
    }

    const goToAddReview = () =>{
        navigation.navigate(screen.restaurant.addReviewRestaurant,{
            idRestaurant
        });
    }
    if (hasLogged && hasReview) {
      return (<View style={styles.content}>
        <Text style={styles.textSendReview}>Ya has enviado una reseña de este restaurante</Text>
      </View>)
    }
        
  return (
    <View style={styles.content}>
      {hasLogged ? (
          <Button 
            title="Escribe una opinion" 
            icon={{ type:"material-community", name:"square-edit-outline", color:"#00a680" }}
            buttonStyle={styles.button}
            titleStyle={styles.btnText}
            onPress={goToAddReview}
            />
      ):(
        <Text style={styles.text}>
            Para escribir una opinión es necesario estar loggeado{" "}
            <Text style={styles.textClick} onPress={goToLogin}>pulsa AQUÍ para iniciar sesión.</Text>
        </Text>
      )}
    </View>
  )
}