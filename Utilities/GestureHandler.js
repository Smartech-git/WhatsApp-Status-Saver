import { setShouldTabHideRef } from "../Components/BottomNavTabBar";
let contentOffsetState = 0;

export const handleOnScroll = (e, setOffsetTop, setOffsetBottom) => {
  let offsetY = e.nativeEvent.contentOffset.y
  console.log(offsetY)
  setOffsetTop(offsetY)
  setOffsetBottom(e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height)

  if(offsetY > (contentOffsetState)){
    setShouldTabHideRef('true')
  } else if(offsetY < (contentOffsetState)){
    setShouldTabHideRef('false')
  }
}

export const panGestureConditional = (offsetTop, offsetBottom) => {
  return offsetTop === 0 ? [-30, 0]
        : offsetTop === offsetBottom ? [0, 30]
        : [-500, 500]
}

export const handleScrollEndDrag = (e) => {
  contentOffsetState = e.nativeEvent.contentOffset.y
}
