import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import {
    doc,
    onSnapshot,
    collection,
    query,
    where,
    orderBy
} from 'firebase/firestore'
import { styles } from './RestaurantScreen.styles'
import { db } from '../../../utils/firebase'
import { Carrousel, Loading } from '../../../components/Shared'
import { BtnReviewForm, Header, Info, Reviews } from '../../../components/Restaurant'

const {width, height } = Dimensions.get('window')

export function RestaurantScreen(props) {
    const { route } = props;
    const [restaurant, setRestaurant] = useState(null)
    useEffect(() => {
        setRestaurant(null);
        onSnapshot(doc(db,"restaurants", route.params.id), (doc) =>{
            setRestaurant(doc.data());
        })
    }, [route.params.id])
    
    if (!restaurant) return <Loading show text="Cargando restaurantes" />;
    
    return (
        <ScrollView style={styles.content}>
            <Carrousel arrayImages={restaurant.images} width={width} height={(height - (height * 0.7))} />
            <Header restaurant={restaurant}/>
            <Info restaurant={restaurant}/>
            <BtnReviewForm idRestaurant={restaurant.id} />
            <Reviews idRestaurant={restaurant.id} />
        </ScrollView>
    )
}