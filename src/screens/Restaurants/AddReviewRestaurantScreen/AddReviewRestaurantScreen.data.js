import * as Yup from "yup";
export function initialValues(){
    return {
        title:"",
        comment:"",
        rating:3,
    }
}

export function validationSchema(){
    return Yup.object({
        title: Yup.string().required("Campo obligatorio"),
        comment: Yup.string().required("Campo obligatorio"),
        rating: Yup.number().required("Campo obligatorio"),
    })
}