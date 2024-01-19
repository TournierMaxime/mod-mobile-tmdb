import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { popular, resetPopular } from '../../../redux/actions/tmdb/series'
import useLoadMore from '../../../utils/LoadMore';
import { truncateTitle } from '../../../utils/Truncate'
import {useNavigation} from '@react-navigation/native';
import list from '../../../styles/components/list';

const Popular = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const popularData = useSelector((state) => state.popular.paginationData)
    const popularResults = useSelector((state) => state.popular.paginationData.results)
    const { currentPage, loadMore } = useLoadMore(popularData.page, popularData.total_pages)
    const [allResults, setAllResults] = useState([])

    useEffect(() => {
        dispatch(popular(currentPage, 'popularPagination'))
      }, [dispatch, currentPage])

      useEffect(() => {
        if (popularResults?.length > 0) {
          if (currentPage > 1) {
            setAllResults((prevResults) => [...prevResults, ...popularResults]);
          } else {
            setAllResults(popularResults);
          }
        }
      }, [popularResults]);
  
    useEffect(() => {
    return () => {
      dispatch(resetPopular())
    }
  }, [])

  return (
    <View style={styles.container}>
        <FlatList 
          data={allResults}
          keyExtractor={(item, index) => `${index}`}
          numColumns={2}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => {
            return (
              <View style={styles.flatListViewContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('DetailsSerie', {id: item.id, title: item.original_name})}>
                  <Image style={styles.image} source={{uri: `https://image.tmdb.org/t/p/original${item.poster_path}`}} />
                  <Text style={styles.originalTitle}>{truncateTitle(item.original_name, 15)}</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: list.container,
  title: list.title, 
  image: list.image,
  flatListViewContainer: list.flatListViewContainer,
  originalTitle: list.originalTitle
});

export default Popular;
