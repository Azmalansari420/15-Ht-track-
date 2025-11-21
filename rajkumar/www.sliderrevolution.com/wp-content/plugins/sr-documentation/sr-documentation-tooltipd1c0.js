(function() {
  let tooltips = document.getElementsByClassName('srdToolTip')

  // console.log(tooltips)

  for (let i = 0; i < tooltips.length; i++){
    let tip = tooltips[i]
    let tipBox = tip.childNodes[1]

    // check if the tooltip is out of the viewport bounds
    let adjustPosition = isOutOfBounds(tipBox)

    // console.log(adjustPosition)    
    
    // if the result isn't zero that means it's out by the returned amount on the left or right side
    if (adjustPosition != 0){
      // add a bit more to the amount being adjusted by so the tooltip isn't flush with the edge of the screen
      adjustPosition *= 1.3

      // translate the tip box's X position based on how much it's out of bounds by
      let translateBy = adjustPosition.toString() 
      let translateString = 'translateX(' + translateBy  + 'px)'
      tipBox.style.transform = translateString
      
      // then push the arrow back the other direction to compensate
      let arrow = tipBox.childNodes[0]
      let adjustArrow = adjustPosition * -1
      let translateArrow = adjustArrow.toString() 
      let translateArrowString = 'translateX(' + translateArrow  + 'px)'
      arrow.style.transform = translateArrowString 
    }

  }

})();


function isOutOfBounds(tipBox) {
  let bounding = tipBox.getBoundingClientRect();

  if (bounding.left < 0){
    return bounding.left;
  } else if (bounding.right > (window.innerWidth || document.documentElement.clientWidth)){
    return window.innerWidth - bounding.right;
  } else {
    return 0;
  }

}
