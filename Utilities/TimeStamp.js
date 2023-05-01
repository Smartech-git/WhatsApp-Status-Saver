export const handlTimeStamp = (modificationTime) =>{
    const currentTime = new Date();
    let timeDiff = Math.round(currentTime.getTime()/1000) - modificationTime;
    
  
    const hr = Math.floor(timeDiff/3600);
    const min = Math.floor(timeDiff%3600/60)

    if(!hr && !min){
      return 0 + 'm ago'
    } else {
      if(min === 0){
        return hr + 'h ago'
      } else if(hr === 0) {
        return  min + 'm ago'  
      } else {
        return hr + 'h ' + min + 'm ago'
      }
    }
}