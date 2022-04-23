import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import { MapForm } from '../MapForm'
import { styles } from './InfoForm.styles'

export function InfoForm(props) {
    const {formik} = props
    const [showMap, setShowMap] = useState(false)
    const onOpenCloseMap = () => setShowMap( prevState => !prevState )
    return (
        <>
            <View style={styles.content}>
                <Input
                    placeholder='Nombre'
                    containerStyle={styles.input}
                    // rightIcon={<Icon type='material-community' name="at" iconStyle={styles.icon} />}
                    onChangeText={text => { formik.setFieldValue("name", text) }}
                    errorMessage={formik.errors.name}
                />
                <Input
                    placeholder='Dirección'
                    containerStyle={styles.input}
                    rightIcon={{
                        type:'material-community',
                        name:"map-marker-radius",
                        color: getColorIconMap(formik),
                        onPress:onOpenCloseMap,
                    }}
                    onChangeText={text => { formik.setFieldValue("address", text) }}
                    errorMessage={formik.errors.address}
                />
                <Input
                    placeholder='Teléfono'
                    containerStyle={styles.input}
                    // rightIcon={<Icon type='material-community' name="at" iconStyle={styles.icon} />}
                    onChangeText={text => { formik.setFieldValue("phone", text) }}
                    errorMessage={formik.errors.phone}
                />
                <Input
                    placeholder='email'
                    containerStyle={styles.input}
                    // rightIcon={<Icon type='material-community' name="at" iconStyle={styles.icon} />}
                    onChangeText={text => { formik.setFieldValue("email", text) }}
                    errorMessage={formik.errors.email}
                />
                <Input
                    placeholder='Descripción'
                    multiline={true}
                    inputContainerStyle={styles.textArea}
                    // rightIcon={<Icon type='material-community' name="at" iconStyle={styles.icon} />}
                    onChangeText={text => { formik.setFieldValue("description", text) }}
                    errorMessage={formik.errors.description}
                />
            </View>
            <MapForm show={showMap} close={onOpenCloseMap} formik={formik}/>
        </>
    )
}

const getColorIconMap = (formik) =>{
    if (formik.errors.location) return "#ff0000"
    if (formik.values.location) return "#00a680"
    return "#c2c2c2"

}