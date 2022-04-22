import React from 'react'
import { View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { useFormik } from 'formik'
import {getAuth, updateProfile} from 'firebase/auth'
import { initialValues, validationScheme } from './ChangeDisplayNameForm.data'
import { styles } from './ChangeDisplayNameForm.styles'
import Toast from 'react-native-toast-message'

export function ChangeDisplayNameForm(props) {
    const {onCloseOpenModal, onReload } = props;
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationScheme(),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                const {displayName} = formValue;
                const currentUser = getAuth().currentUser
                await updateProfile(currentUser, {displayName})
                onReload();
                onCloseOpenModal();

            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar el nombre/apellido",
                    text2: error.message
                })
            }
        }
    })
    return (
        <View style={styles.content}>
            <Input placeholder='Nombre y apellido'
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
                onChangeText = {text => { formik.setFieldValue("displayName", text) }}
                errorMessage={formik.errors.displayName}
            />
            <Button
                title="Cambiar nombre y apellidos"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}