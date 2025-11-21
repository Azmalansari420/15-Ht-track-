(function(){let tooltips=document.getElementsByClassName('srdToolTip')
for(let i=0;i<tooltips.length;i++){let tip=tooltips[i]
let tipBox=tip.childNodes[1]
let adjustPosition=isOutOfBounds(tipBox)
if(adjustPosition!=0){adjustPosition*=1.3
let translateBy=adjustPosition.toString()
let translateString='translateX('+translateBy+'px)'
tipBox.style.transform=translateString
let arrow=tipBox.childNodes[0]
let adjustArrow=adjustPosition*-1
let translateArrow=adjustArrow.toString()
let translateArrowString='translateX('+translateArrow+'px)'
arrow.style.transform=translateArrowString}}})();function isOutOfBounds(tipBox){let bounding=tipBox.getBoundingClientRect();if(bounding.left<0){return bounding.left}else if(bounding.right>(window.innerWidth||document.documentElement.clientWidth)){return window.innerWidth-bounding.right}else{return 0}}