let contentOffsetState = 0;
export let setDisplayNavRef

export const hangdleBottomHide = (callBack) => {
  setDisplayNavRef = callBack
}

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
}


export const panGestureConditional = (direction, firstoffset, secondOffset, imagePosition) => {

  if(direction === 'vertical'){
    return firstoffset === 0 ? [-500, 500]
            : firstoffset === secondOffset ? [0, 30]
            : [-500, 500]
  }else if(direction === "unit-Vertical"){
    return imagePosition === 'firstImg' ? [-30, 0]
          : imagePosition === 'lastImg' ? [0, 30]
          : [-500, 500]
  }else if(direction === "unit-Horizontal") {
      return imagePosition === 'firstImg' ? [-500, 0]
          : imagePosition === 'lastImg' ? [0, 500]
          : [-500, 500]
    }
  
}

export const handleScrollEndDrag = (e) => {
  contentOffsetState = e.nativeEvent.contentOffset.y
}
