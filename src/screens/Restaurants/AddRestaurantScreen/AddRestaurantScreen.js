import { useFormik } from 'formik'
import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { initialValues, validationSchema } from './AddRestaurantScreen.data'
import { InfoForm, UploadImagesForm } from '../../../components/Restaurants/AddRestaurant'
import { styles } from './AddRestaurantScreen.styles'
import { v4 as uuid } from 'uuid'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../utils/firebase'
import { useNavigation } from '@react-navigation/native'

export function AddRestaurantScreen() {
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuid();
        newData.createdAt = new Date();
        // const myDb = doc(db,"restaurants", newData.id);
        // await setDoc(myDb, newData);
        await setDoc(doc(db,"restaurants", newData.id), newData);

        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  });
  return (
    <View>
      <InfoForm formik={formik} />
      <UploadImagesForm formik={formik} />
      <Button
        title="Crear restarante"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}