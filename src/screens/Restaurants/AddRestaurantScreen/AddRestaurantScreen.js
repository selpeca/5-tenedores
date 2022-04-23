import { useFormik } from 'formik'
import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { initialValues, validationSchema } from './AddRestaurantScreen.data'
import { InfoForm, UploadImagesForm } from '../../../components/Restaurants/AddRestaurant'
import { styles } from './AddRestaurantScreen.styles'

export function AddRestaurantScreen() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
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