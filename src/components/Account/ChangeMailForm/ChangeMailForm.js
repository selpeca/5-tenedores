import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useFormik } from 'formik'
import {getAuth, EmailAuthProvider, reauthenticateWithCredential, updateEmail} from 'firebase/auth'
import { styles } from './ChangeMailForm.styles'
import Toast from 'react-native-toast-message'
import { initialValues, validationScheme } from './ChangeMailForm.data'

export function ChangeMailForm(props) {
    const { onCloseOpenModal, onReload } = props;
    const [showPassword, setShowPassword] = useState(true);
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationScheme(),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                const currentUser = getAuth().currentUser;

                const credentials = EmailAuthProvider.credential(currentUser.email, formValue.password);
                reauthenticateWithCredential(currentUser, credentials);
                await updateEmail(currentUser, formValue.email);
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

    const showHiddenPassword = () => { setShowPassword(!showPassword) }

    return (
        <View style={styles.content}>
            <Input placeholder='Email'
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
                onChangeText={text => { formik.setFieldValue("email", text) }}
                errorMessage={formik.errors.email}
            />
            <Input 
                placeholder='Contraseña'
                containerStyle={styles.input}
                secureTextEntry={showPassword}
                rightIcon={<Icon type='material-community' name={showPassword ? "eye-off-outline" : "eye-outline"} iconStyle={styles.icon} onPress={showHiddenPassword} />}
                onChangeText = {text => { formik.setFieldValue("password", text) }}
                errorMessage={formik.errors.password}
            />
            <Button
                title="Cambiar correo"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}