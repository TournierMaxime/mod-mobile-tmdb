import React, { memo } from "react"
import { FlatList, View } from "react-native"
import RenderItemPeople from "../../lib/components/RenderItemPeople"
import moment from "moment"
import Utils from "@mod/mobile-common/lib/class/Utils"

interface Cast {
  cast: Item[]
}

interface Props {
  career: Cast
}

interface Item {
  id: number
  original_title: string
  title: string
  poster_path: string
  release_date: string
  character: string
  name: string
  first_air_date: string
}

interface Items {
  item: Item
  index: number
}

const CastPeople = ({ career }: Props) => {
  const data = career?.cast?.sort((a, b) => {
    const dateA = moment(a.release_date || a.first_air_date)
    const dateB = moment(b.release_date || b.first_air_date)
    return dateB.diff(dateA)
  })

  return (
    <View>
      <FlatList
        getItemLayout={Utils.getItemLayoutCastCrew}
        horizontal
        data={data}
        renderItem={({ item, index }: Items) => (
          <RenderItemPeople item={item} index={index} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    </View>
  )
}

export default memo(CastPeople)
