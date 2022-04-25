import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { v4 as uuid } from 'uuid'
import { getAuth } from 'firebase/auth'
import { doc, setDoc, getDocs, query, where, collection, deleteDoc } from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import { styles } from './BtnFavorite.styles'
import { db } from '../../../utils/firebase'
import { async } from '@firebase/util'
export function BtnFavorite(props) {
    const {idRestaurant} = props
    const auth = getAuth();
    const [isFavorite, setIsFavorite] = useState(undefined)
    const [isReload, setIsReload] = useState(false);

    useEffect(() => {
        (async()=>{
            const response = await getFavorites()
            if(response.length > 0){
                setIsFavorite(true)
            }else{
                setIsFavorite(false)

            }
        })()
    }, [idRestaurant, isReload])

    const getFavorites = async() =>{
        const q = query(
            collection(db,"favorites"),
            where("idRestaurant","==",idRestaurant),
            where("id_user","==",auth.currentUser.uid),
        )
        const result = await getDocs(q)
        return result.docs
    }

    const addFavorite = async() =>{
        try {
            const idFavorite = uuid()
            const data ={
                id: idFavorite,
                idRestaurant: idRestaurant,
                id_user: auth.currentUser.uid,
            }
            await setDoc(doc(db,"favorites", idFavorite), data);
            onReload();
        } catch (error) {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "Error al guardar en favoritos",
                text2: error.message 
            })
        }
    }
    const removeFavorite = async() =>{
        try {
            const response = await getFavorites()
            response.forEach( async r =>{
                await deleteDoc(doc(db, "favorites", r.id))
                onReload();
            })
        } catch (error) {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "Error al guardar en favoritos",
                text2: error.message 
            })
        }
    }
    const onReload = () => setIsReload(prevState => !prevState)
    return (
        <View style={styles.content}>
           <Icon
               type='material-community'
               name={isFavorite?'heart':'heart-outline'}
               color={isFavorite? "#f00":"#000"}
               size={35}
               onPress={isFavorite? removeFavorite : addFavorite}
           />
        </View>
    )
}