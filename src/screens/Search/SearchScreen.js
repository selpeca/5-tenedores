import React, { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Avatar, Icon, ListItem, SearchBar, Text } from 'react-native-elements'
import { collection, query, startAt, endAt, limit, orderBy, getDocs } from 'firebase/firestore'
import { screen, db } from '../../utils'
import { useNavigation } from '@react-navigation/native'
import { Loading } from '../../components/Shared'
export function SearchScreen() {
  const [searchText, setSearchText] = useState("")
  const [searchResult, setSearchResult] = useState(null)
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "restaurants"),
        orderBy("name"),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(20),
      )
      const result = await getDocs(q)
      setSearchResult(result.docs)
    })()
  }, [searchText])

  const goToRestaurant = (restaurantId) => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: restaurantId
      }
    })
  }

  return (
    <>
      <SearchBar
        placeholder='Busca tu restaurante'
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      {
        !searchResult ? <Loading show text="cargando" /> :
          (<ScrollView>
            {
              searchResult.length == 0 ? (
                <View style={{
                  alignItems: "center",
                  marginTop: 20
                }} ><Text>No se encontraron resultados</Text></View>
              ) : (
                searchResult.map((item) => {
                  const data = item.data()
                  return (
                    <ListItem key={data.id} bottomDivider onPress={() => {goToRestaurant(data.id)}}>
                      <Avatar source={{ uri: data.images[0] }} rounded />
                      <ListItem.Content>
                        <ListItem.Title>
                          {data.name}
                        </ListItem.Title>
                      </ListItem.Content>
                      <Icon type='material-community' name='chevron-right' />
                    </ListItem>
                  )
                })
              )
            }
          </ScrollView>)
      }
    </>
  )
}