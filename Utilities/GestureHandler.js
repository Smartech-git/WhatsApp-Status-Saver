export const handleOnScroll = (e, setOffsetTop, setOffsetBottom) => {
  setOffsetTop(e.nativeEvent.contentOffset.y)
  setOffsetBottom(e.nativeEvent.contentSize.height -  e.nativeEvent.layoutMeasurement.height)
}

export const panGestureConditional = (offsetTop, offsetBottom) => {
  return offsetTop === 0 ? [-30, 4]
        : offsetTop === offsetBottom ? [-4, 30]
        : [-200, 200]
}