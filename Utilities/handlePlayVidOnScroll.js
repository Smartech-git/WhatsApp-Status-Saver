export let offsetTop;
export let offsetBottom;

export const handleOnScroll = (e) =>{
    offsetTop = e.nativeEvent.contentOffset.y
    offsetBottom = e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height;
    console.log(`${offsetTop}  -  ${offsetBottom}`)
}