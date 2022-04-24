import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore'
import { db } from '../../../utils'
import {Settings,DateTime} from 'luxon'
import 'intl'
import 'intl/locale-data/jsonp/es'
import { Loading } from '../../Shared'
import { styles } from './Reviews.styles'
import { AirbnbRating, Avatar, ListItem, Text } from 'react-native-elements'

export function Reviews(props) {
    const { idRestaurant } = props
    const [reviews, setReviews] = useState(null)
    Settings.defaultLocale = 'es-ES'
    useEffect(() => {
        const q = query(
            collection(db,"reviews"),
            where("idRestaurant","==",idRestaurant),
            orderBy("createdAt","desc")
        )
        onSnapshot(q, (snapshot) =>{
            const reviews = snapshot.docs
            setReviews(reviews);

        })
    }, [])

    if (!reviews) return <Loading show text="Cargando" />
    
    return (
        <View style={styles.content}>
            {reviews.map((review, index) => {
                const data = review.data();
                const createReview = new Date(data.createdAt.seconds * 1000)
                return (<ListItem key={index} bottomDivider containerStyle={styles.review}>
                    <Avatar source={{ uri: data.avatar }} size={50} rounded />
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>{data.title}</ListItem.Title>
                        <View style={styles.subtitle}>
                            <Text style={styles.comment}>{data.comment}</Text>
                            <View style={styles.contentRating}>
                                <AirbnbRating 
                                    defaultRating={data.rating} 
                                    showRating={false} 
                                    size={15} 
                                    isDisabled
                                    starContainerStyle={styles.startContainer}
                                />
                                {/* <Text>{String(createReview)}</Text> */}
                                <Text style={styles.date}>
                                    {DateTime.fromISO(createReview.toISOString()).setLocale('es-ES').toRelative()}
                                </Text>
                            </View>
                        </View>
                    </ListItem.Content>
                </ListItem>)
            })}
        </View>
    )
}