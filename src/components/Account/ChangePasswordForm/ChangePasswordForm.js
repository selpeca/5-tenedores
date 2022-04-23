import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useFormik } from 'formik'
import {getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider} from 'firebase/auth'
import { styles } from './ChangePasswordForm.styles'
import Toast from 'react-native-toast-message'
import { initialValues, validationScheme } from './ChangePasswordForm.data'

export function ChangePasswordForm(props) {
    const { onCloseOpenModal } = props;
    const [showPassword, setShowPassword] = useState(true);
    const [showPassword2, setShowPassword2] = useState(true);
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationScheme(),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                const currentUser = getAuth().currentUser;

                const credentials = EmailAuthProvider.credential(currentUser.email, formValue.password);
                reauthenticateWithCredential(currentUser, credentials);
                await updatePassword(currentUser, formValue.passwordNew);
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

    const showHiddenPassword = () => { setShowPassword(!showPassword) }
    const showHiddenPassword2 = () => { setShowPassword2(!showPassword2) }
    
    return (
        <View style={styles.content}>
            <Input 
                placeholder='Contraseña actual'
                containerStyle={styles.input}
                secureTextEntry={showPassword}
                rightIcon={<Icon type='material-community' name={showPassword ? "eye-off-outline" : "eye-outline"} iconStyle={styles.icon} onPress={showHiddenPassword} />}
                onChangeText = {text => { formik.setFieldValue("password", text) }}
                errorMessage={formik.errors.password}
            />
            <Input 
                placeholder='Contraseña nueva'
                containerStyle={styles.input}
                secureTextEntry={showPassword2}
                rightIcon={<Icon type='material-community' name={showPassword2 ? "eye-off-outline" : "eye-outline"} iconStyle={styles.icon} onPress={showHiddenPassword2} />}
                onChangeText = {text => { formik.setFieldValue("passwordNew", text) }}
                errorMessage={formik.errors.passwordNew}
            />
            <Input 
                placeholder='Repetir contraseña nueva'
                containerStyle={styles.input}
                secureTextEntry={showPassword2}
                onChangeText = {text => { formik.setFieldValue("repeatPasswordNew", text) }}
                errorMessage={formik.errors.repeatPasswordNew}
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
  )
}