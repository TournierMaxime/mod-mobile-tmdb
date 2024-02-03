import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { popular, resetPopular } from '../../redux/actions/series'
import useLoadMore from '@mod/mobile-common/lib/hooks/utils/useLoadMore';
import Utils from '@mod/mobile-common/lib/class/Utils'
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc'

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
    <View style={tw`bg-slate-100 items-center justify-between`}>
        <FlatList 
          data={allResults}
          keyExtractor={(item, index) => `${index}`}
          numColumns={2}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => {
            return (
              <View style={tw`flex-col justify-between`}>
                <TouchableOpacity onPress={() => navigation.navigate('DetailsSerie', {id: item.id, title: item.original_name})}>
                  <Image style={[tw`w-16 h-26 rounded-md m-4`, { resizeMode: 'cover' }]} source={{uri: `https://image.tmdb.org/t/p/original${item.poster_path}`}} />
                  <Text style={tw`text-center font-medium text-lg`}>{Utils.truncateTitle(item.original_name, 15)}</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        />
    </View>
  );
};

export default Popular;
