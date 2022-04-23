import * as Yup from 'yup';

export function initialValues() {
    return {
        password:"",
        passwordNew:"",
        repeatPasswordNew:"",
    };
}

export function validationScheme() {
    return Yup.object({
        password: Yup.string().required("La contraseña es obligatorio"),
        passwordNew: Yup.string().required("La contraseña es obligatorio"),
        repeatPasswordNew: Yup.string().required("La contraseña es obligatorio").oneOf([Yup.ref("passwordNew")], "Las contraseñas no coinciden"),
    })
}