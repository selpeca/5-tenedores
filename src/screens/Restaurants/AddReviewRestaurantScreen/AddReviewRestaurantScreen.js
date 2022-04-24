import React from 'react'
import { View } from 'react-native'
import { AirbnbRating, Button, Input } from 'react-native-elements'
import { initialValues, validationSchema } from './AddReviewRestaurantScreen.data'
import { useFormik } from 'formik'
import { v4 as uuid } from 'uuid'
import { getAuth } from 'firebase/auth'
import { doc, setDoc, query, collection, where, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../../utils/firebase'
import Toast from 'react-native-toast-message'
import { styles } from './AddReviewRestaurantScreen.styles'
import { useNavigation } from '@react-navigation/native'


export function AddReviewRestaurantScreen(props) {
    const {idRestaurant} = props.route.params
    const navigation = useNavigation();
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth();
                const newData = formValue;
                newData.id = uuid();
                newData.idRestaurant = idRestaurant;
                newData.user_id = auth.currentUser.uid;
                newData.avatar = auth.currentUser.photoURL;
                newData.createdAt = new Date();
                
                await setDoc(doc(db,"reviews", newData.id), newData);
                await updateRestaurant();
                navigation.goBack();
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "No se pudo guardar su opinión"
                })
            }
        }
    });
    const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

    const updateRestaurant = async()=>{
        const q = query(
            collection(db,"reviews"),
            where("idRestaurant","==",idRestaurant)
        )
        onSnapshot(q, async (snapshot) =>{
            const reviews = snapshot.docs
            const arrayStarts = reviews.map((r) => r.data().rating )
            const media = average(arrayStarts)
            const restarantRef = doc(db, "restaurants", idRestaurant)
            await updateDoc(restarantRef, {
                ratingMedia: media
            })

        })
    }
    return (
        <View style={styles.content}>
            <View>
                <View style={styles.ratingContent}>
                    <AirbnbRating
                        count={5}
                        reviews={["Pésimo","Deficiente","Normal","Muy bueno", "Excelente"]}
                        defaultRating={formik.values.rating}
                        size={35}
                        onFinishRating={(rating) => formik.setFieldValue("rating",rating)}
                    />

                </View>
                <View>
                    <Input
                        placeholder='Título'
                        onChangeText={text => { formik.setFieldValue("title", text) }}
                        errorMessage={formik.errors.title}
                    />
                    <Input
                        placeholder='Comentario'
                        multiline
                        inputContainerStyle={styles.comment}
                        onChangeText={text => { formik.setFieldValue("comment", text) }}
                        errorMessage={formik.errors.comment}
                    />
                </View>
            </View>

            <Button
                title="Enviar opinión"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}