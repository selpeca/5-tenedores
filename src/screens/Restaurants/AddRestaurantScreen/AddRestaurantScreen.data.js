import * as Yup from "yup";
export function initialValues(){
    return {
        name:"",
        address:"",
        phone:"",
        email:"",
        description:"",
        location: null,
        images: []
    }
}

export function validationSchema(){
    return Yup.object({
        name: Yup.string().required("Campo obligatorio"),
        address: Yup.string().required("Campo obligatorio"),
        phone: Yup.string().required("Campo obligatorio"),
        email: Yup.string().email("El email no es correcto").required("El email es obligatorio"),
        description: Yup.string().required("Campo obligatorio"),
        location: Yup.object().required("La localización es requerida"),
        images: Yup.array().min(1,"Se requiere al menos una imágen").required("La imágen es requerida")
    })
}