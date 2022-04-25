import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerCard:{
        marginBottom:30,
        borderWidth: 0,
    },
    containerIcon:{
        position:"absolute",
        top: -30,
        left: -30,
        zIndex: 1,
    },
    restaurantImage:{
        width: "100%",
        height: 200
    },
    titleRating:{
        flexDirection:"row",
        justifyContent: "space-between",
        marginTop: 10
    },
    title:{
        fontSize:20,
        fontWeight:"bold"
    },
    description:{
        color:"#c2c2c2",
        marginTop: 0,
        textAlign: "justify"
    }
})