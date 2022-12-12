import { setShouldTabHideRef } from "../Components/BottomNavTabBar";
let contentOffsetState = 0;

export const handleOnScroll = (e, contentOffsetBottom, setOffsetTop, setOffsetBottom) => {
  let offsetTop = e.nativeEvent.contentOffset.y
  let offsetBottom = e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height;

  if(offsetBottom !== contentOffsetBottom ){
    setOffsetBottom(offsetBottom)
  }

  if(offsetTop === 0) {
    setOffsetTop(0);
  } else if (offsetTop === offsetBottom){
    setOffsetTop(offsetBottom)
  } else {
    setOffsetTop(undefined)
  }

  if(offsetTop > (contentOffsetState)){
    setShouldTabHideRef('true')
  } else {
    setShouldTabHideRef('false')
  }
}

export const panGestureConditional = (offsetTop, offsetBottom) => {
  return offsetTop === 0 ? [-500, 500]
        : offsetTop === offsetBottom ? [0, 30]
        : [-500, 500]
}

export const handleScrollEndDrag = (e) => {
  contentOffsetState = e.nativeEvent.contentOffset.y
}
