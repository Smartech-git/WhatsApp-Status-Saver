export const millisToVidTime = (duration) => {
    let sec = Math.floor((duration / 1000) % 60)
    let min = Math.floor(duration / (1000*60))
  
    let minutes = (min < 10) ? '0' + min : min;
    let seconds = (sec < 10) ? '0' + sec : sec;
  
    return  minutes + ":" + seconds ;
  }