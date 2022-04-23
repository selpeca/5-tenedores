import React, { useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import { Avatar, Icon, Text } from 'react-native-elements';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import * as ImagePicker from "expo-image-picker"
import { v4 as uuid } from 'uuid'
import { LoadingModal } from '../../../Shared'
import { styles } from './UploadImagesForm.styles'

export function UploadImagesForm(props) {
    const {formik} = props;
    const [loading, setLoading] = useState(false)

    const openGallery = async () =>{
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        })
        if(!result.cancelled){
            setLoading(true);
            uploadImage(result.uri)
        }
    }

    const uploadImage = async (uri) =>{
        const response = await fetch(uri);
        const blob = await response.blob()

        const storage = getStorage();
        const storageRef = ref(storage, `restaurants/${uuid()}`)

        uploadBytes(storageRef, blob).then( (snapshot) =>{
            updatePhotosRestaurant(snapshot.metadata.fullPath);
            setLoading(false);

        })

    }

    const updatePhotosRestaurant = async (imagePath) =>{
        const storage = getStorage();
        const imageRef= ref(storage, imagePath);

        const imageUrl = await getDownloadURL(imageRef);
        formik.setFieldValue("images",[ ...formik.values.images, imageUrl ]);
    }

    const removeImage = (img) => {
        Alert.alert(
            "Eliminar imágen",
            "Estás seguro?",
            [
                {
                    text: "cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () =>{
                        const result = formik.values.images.filter((image) => image !== img )
                        formik.setFieldValue("images",result);
                    }
                },
            ],
            { cancelable: false }
        )
    }
    return (
        <>
            <ScrollView style={styles.viewImage} horizontal showsHorizontalScrollIndicator={false}>
                <Icon 
                    type='material-community'
                    name='camera'
                    color="#a7a7a7"
                    containerStyle={styles.containerIcon}
                    onPress={openGallery}
                />
                {formik.values.images.map((image) =>{
                    return <Avatar
                        key={image}
                        source={{uri:image}}
                        style={styles.imageStyle}
                        onPress={() => removeImage(image)}
                    />
                })}
            </ScrollView>
            <Text style={styles.error}>{formik.errors.images}</Text>
            <LoadingModal show={loading} text="Cargando imágen"/>
        </>
    )
}