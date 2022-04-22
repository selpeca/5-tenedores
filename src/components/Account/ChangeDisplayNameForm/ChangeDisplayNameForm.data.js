import * as Yup from 'yup';

export function initialValues() {
    return {
        displayName:"",
    };
}

export function validationScheme() {
    return Yup.object({
        displayName: Yup.string().required("El nombre y apellido son requeridos.")
    })
}