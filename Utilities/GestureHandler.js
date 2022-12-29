import { setShouldTabHideRef } from "../Components/BottomNavTabBar";
let contentOffsetState = 0;

export const handleVerticalScroll = (e, contentOffsetBottom, setOffsetTop, setOffsetBottom) => {
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

export const handleHorinzontalScroll = (e, contentOffsetRight, setOffsetLeft, setOffsetRight) => {
  let offsetLeft= e.nativeEvent.contentOffset.x
  let offsetRight = e.nativeEvent.contentSize.width - e.nativeEvent.layoutMeasurement.width;

  if(offsetRight !== contentOffsetRight ){
    setOffsetRight(offsetRight)
  }

  if(offsetLeft === 0) {
    setOffsetLeft(0);
  } else if (offsetLeft === offsetRight){
    setOffsetLeft(offsetRight)
  } else {
    setOffsetLeft(undefined)
  }
}

export const panGestureConditional = (direction, firstoffset, secondOffset) => {
  if(direction === 'vertical'){
    return firstoffset === 0 ? [-500, 500]
            : firstoffset === secondOffset ? [0, 30]
            : [-500, 500]
  } else {
    return firstoffset === 0 ? [-30, 0]
            : firstoffset === secondOffset ? [0, 30]
            : [-500, 500] 
  }
  
}

export const handleScrollEndDrag = (e) => {
  contentOffsetState = e.nativeEvent.contentOffset.y
}
