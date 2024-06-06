import React, { Fragment } from "react"
import { Text } from "react-native"
import tw from "twrnc"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const Runtime = ({ time, isMovie }) => {
  const { mediaTitle } = useResponsive()

  if (!time) return null
  if (time.length === 0) return

  let hours, minutes
  if (isMovie) {
    hours = Math.floor(time / 60)
    minutes = time % 60
  } else {
    hours = Math.floor(time / 60)
    minutes = time % 60
  }

  const hasHours = hours > 0

  const runtime = () => {
    return (
      <Fragment>
        {" • "}
        {isMovie ? (
          <Text style={mediaTitle()}>
            {hasHours ? hours + "H" : ""}
            {minutes}Min
          </Text>
        ) : (
          <Text style={mediaTitle()}>
            {hasHours ? hours + "H" : ""}
            {minutes}Min / ep
          </Text>
        )}
      </Fragment>
    )
  }

  return runtime()
}

export default Runtime
