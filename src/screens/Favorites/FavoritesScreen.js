import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { UserNotLogged, NotFoundRestaurant, RestaurantFavorites } from '../../components/Favorites'
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore'
import { Loading } from '../../components/Shared'
import { db } from '../../utils'

export function FavoritesScreen() {
  const [hasLogged, setHasLogged] = useState(null)
  const [restaurants, setRestaurants] = useState(null)
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) =>{
      setHasLogged(user ? true:false)
    })
  }, [])

  useEffect(() => {
    if (hasLogged){
      const q = query(
        collection(db,"favorites"),
        where("id_user","==",auth.currentUser.uid),
      )

      onSnapshot(q, async (snapshot) =>{
        let restaurantArray = [];
        
        for await (const item of snapshot.docs){
          const data = item.data()
          const docRef = doc(db, "restaurants", data.idRestaurant)
          const docSnap = await getDoc(docRef)
          const newData = docSnap.data()
          newData.idFavorite = data.id
          restaurantArray.push(newData)
        }
        setRestaurants(restaurantArray)
      })
    }
  }, [hasLogged])
 
  if (!hasLogged) return <UserNotLogged/> 
  if(!restaurants) return <Loading show text="Cargando" />
  if(!restaurants.length) return <NotFoundRestaurant/>
  
  return (
    <ScrollView>
      {
        restaurants.map((restaurant, index) => (
          <RestaurantFavorites key={index} restaurant={restaurant} />
        ))
      }
    </ScrollView>
  )
}