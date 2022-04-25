import React, { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore'
import { db } from '../../utils'
import { Loading } from '../../components/Shared'
import { RestaurantRanking } from '../../components/Restaurants'

export function RankingScreen() {
  const [restaurants, setRestaurants] = useState(null)
  useEffect(() => {
    const q = query(
        collection(db,"restaurants"),
        orderBy("ratingMedia","desc"),
        limit(4)
    )
    onSnapshot(q, (snapshot) =>{
      setRestaurants(snapshot.docs)
    })
  }, [])

  if(!restaurants) return <Loading show text="Cargando" />
  
  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      { 
        restaurants.map((restaurant, index) => (
          <RestaurantRanking restaurant={restaurant.data()} index={index} key={index} />
        ))
      }
    </ScrollView>
  )
}