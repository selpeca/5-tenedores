import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content:{
        backgroundColor:"#fff",
        marginVertical: 10,
        marginHorizontal: 15,
    },
    image:{
        height: 150,
        width: "100%"
    },
    infoContent:{
        paddingHorizontal:20,
        paddingTop: 15,
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center"
    },
    name:{
        fontSize:18,
        fontWeight:"bold"
    },
    description : {
        color: "#828282",
        fontSize: 12,
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 15,
    },
    medal:{
        marginRight: 5   
    },
    nameContent:{
        flexDirection:"row",
        alignItems: "center"
    }
});