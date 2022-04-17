import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { styles } from './LoginForm.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './LoginForm.data'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import Toast from 'react-native-toast-message'
import { screen } from '../../../utils'
import { useNavigation } from '@react-navigation/native'


export function LoginForm() {
  const [showPassword, setShowPassword] = useState(true);
  const showHiddenPassword = () => { setShowPassword(!showPassword) }
  const navigation = useNavigation();


  const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange:false,
      onSubmit: async (formValue) =>{
          try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, formValue.email, formValue.password);
            navigation.navigate(screen.account.account)
          } catch (error) {
            Toast.show({
              type:"error",
              position: "bottom",
              text1:"Usuario o contraseña incorrecta"
            })
            
          }
      }
  });
  return (
    <View style={styles.content}>
      <Input
        placeholder='Correo electronico'
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
      <Button
            buttonStyle={styles.btn} 
            containerStyle={styles.btnContainer}
            title='Iniciar sesión'
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}/>
    </View>
  )
}