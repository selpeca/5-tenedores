import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import { getAuth, updateProfile } from "firebase/auth"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import * as ImagePicker from "expo-image-picker"
import { styles } from './InfoUser.styles'

export function InfoUser(props) {
    const { setLoading, setLoadingText } = props
    const { uid, photoURL, displayName, email } = getAuth().currentUser;
    const [avatar, setAvatar] = useState(photoURL)

    const changeAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3]
        })
        if(!result.cancelled) uploadImage(result.uri)
    }

    const uploadImage = async (uri) =>{
        setLoadingText('Actualizando avatar')
        setLoading(true)
        const response = await fetch(uri);
        const blob = await response.blob();

        const storage = getStorage();
        const storageRef = ref(storage, `avatar/${uid}`)

        uploadBytes(storageRef, blob).then( (snapshot) =>{
            updatePhotoUrl(snapshot.metadata.fullPath);
        })
        
    }

    const updatePhotoUrl = async (imagePath) =>{
        const storage = getStorage()
        const imageRef = ref(storage, imagePath)
        const imageUrl = await getDownloadURL(imageRef);
        const auth = getAuth();
        updateProfile(auth.currentUser, { photoURL: imageUrl })
        setAvatar(imageUrl)
        setLoading(false);


    }

    return (
        <View style={styles.content}>
            <Avatar 
                size="large"
                rounded
                containerStyle={styles.avatar}
                icon={{type:"material", name:"person"}}
                source={{uri:avatar}}
            >
                <Avatar.Accessory size={24} onPress={changeAvatar}/>
            </Avatar>
            <View>
                <Text style={styles.displayName}>{ displayName ?? "Anónimo" }</Text>
                <Text>{email}</Text>
            </View>
        </View>
    )
}