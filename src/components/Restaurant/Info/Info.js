import React from 'react'
import { View } from 'react-native'
import { Icon, ListItem, Text } from 'react-native-elements'
import { Map } from '../../Shared/Map/Map'
import { styles } from './Info.styles'

export function Info(props) {
    const {restaurant} = props
    const listInfo =[
        {
            text: restaurant.address,
            iconType: "material-community",
            iconName: "map-marker",
        },
        {
            text: restaurant.phone,
            iconType: "material-community",
            iconName: "phone",
        },
        {
            text: restaurant.email,
            iconType: "material-community",
            iconName: "at",
        },
    ]

    return (
        <View style={styles.content}>
            <Text style={styles.title}>Información del restaurante</Text>
            <Map location={restaurant.location} name={restaurant.name}/>
            {listInfo.map((r, key) => {
                return <ListItem key={key} bottomDivider>
                    <Icon type={r.iconType} name={r.iconName} color="#00a680"/>
                    <ListItem.Content>
                        <ListItem.Title>{r.text}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            })}
        </View>
    )
}