import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useFormik } from 'formik'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { initialValues, validationSchema } from './RegisterForm.data'
import { styles } from './RegisterForm.styles'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(true);
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange:false,
        onSubmit: async (formValue) =>{
            try{
                const auth = getAuth();
                await createUserWithEmailAndPassword(auth, formValue.email, formValue.password)
            }catch(error){
                Toast.show({
                    type:"error",
                    position:"bottom",
                    text1:"Error al crear usuario"
                })
            }
                navigation.goBack();
        }
    });

    const showHiddenPassword = () => { setShowPassword(!showPassword) }

  return (
    <View style={styles.content}>
        <Input 
            placeholder='Correo eletronico'
            containerStyle={styles.input}
            rightIcon={<Icon type='material-community' name="at" iconStyle={styles.icon} />}
            onChangeText = {text => { formik.setFieldValue("email", text) }}
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
        <Input 
            placeholder='Repetir contraseña'
            containerStyle={styles.input}
            secureTextEntry={showPassword}
            onChangeText = {text => { formik.setFieldValue("repeatPassword", text) }}
            errorMessage={formik.errors.repeatPassword}
        />
        <Button 
            buttonStyle={styles.btn} 
            containerStyle={styles.btnContainer}
            title="Registrar" 
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
            />
    </View>
  )
}