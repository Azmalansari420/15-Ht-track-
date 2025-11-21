(function(){let srdTaxList=document.getElementById('srdTaxList');var sidebar=document.getElementsByClassName("srdStickySidebar")[0];var primaryColumn=document.getElementsByClassName("srdPrimaryColumn")[0].firstElementChild;var stickyViewer=document.getElementsByClassName("srdStickyViewer")[0];var stickySquasher=document.getElementsByClassName("srdStickySquasher")[0];var stickyShifter=document.getElementsByClassName("srdStickyShifter")[0];let currentlyOpen={'TopLevel':null,'SecondLevel':null}
if(srdTaxList!==null){var currentTaxClasses=[...srdTaxList.getElementsByClassName("srdCurrentTax")]
if(currentTaxClasses.length>1){for(let i=0;i<currentTaxClasses.length-1;i++){currentTaxClasses[i].classList.remove('srdCurrentTax')}}
let menuLinksList=document.querySelectorAll('.srdTaxMenu a');let menuLinks=[];for(let i=0;i<menuLinksList.length;i++){if(i<menuLinksList.length-1){if(menuLinksList[i].href!=menuLinksList[i+1].href){menuLinks.push(menuLinksList[i])}}else if(i==menuLinksList.length-1){menuLinks.push(menuLinksList[i])}}
let mainMenuUL=srdTaxList.firstElementChild.getElementsByClassName("children")[0];mainMenuUL.className+=' srdNestedList';mainMenuUL.id='srdNestedList';let oldParent=mainMenuUL.parentNode
let newParent=srdTaxList.parentNode
while(oldParent.hasChildNodes())newParent.appendChild(oldParent.firstChild);srdTaxList.remove();let srdNestedList=document.getElementById('srdNestedList');let parentItems=[];for(let i=0;i<srdNestedList.childNodes.length;i++){let listItem=srdNestedList.childNodes[i];listItem.className+=' srdTopLevelMenu';if(listItem.nodeName=='LI'){let childrenUL=listItem.querySelector('.children')
if(childrenUL){collectParentItems(childrenUL,parentItems,!0)}}}
for(let c=0;c<parentItems.length;c++){let toggleSwitch=document.createElement('span');toggleSwitch.className='srd_toggleSwitch srd_toggleSwitch_closed';parentItems[c].prepend(toggleSwitch);toggleSwitch.addEventListener("click",function(event){toggleChildMenu(event.target,currentlyOpen);checkSticky(event.type,sidebar,primaryColumn,stickyViewer,stickySquasher,stickyShifter)},!1)}
let currentTax=document.getElementsByClassName('srdCurrentTax');currentTax=currentTax[0];if(currentTax!==undefined){if(currentTax.classList.contains('srdTopLevelMenu')){srdNestedList.classList.remove('srdChildMenu_closed')}else{if(currentTax.closest('ul').classList.contains('children')){currentlyOpen.TopLevel=currentTax.closest('.srdTopLevelMenu')
currentlyOpen.SecondLevel=currentTax.closest('.srdSecondLevelMenu')
openParentItems(currentTax,currentlyOpen)}
let hasChildUL=currentTax.classList.contains('srdHasChildren')
if(hasChildUL){openChildItem(currentTax)}}}
let openMenuSwitch=document.getElementById('srdOpenMenu');openMenuSwitch.addEventListener('click',toggleCollapseMenu);let breadcrumbElement=document.getElementById('srdBreadcrumb');let lastLink=breadcrumbElement.children[breadcrumbElement.children.length-1];let newNode=document.createTextNode(" ");breadcrumbElement.insertBefore(newNode,lastLink)
while(lastLink.firstChild)breadcrumbElement.insertBefore(lastLink.firstChild,lastLink);breadcrumbElement.removeChild(lastLink);var isTopLevel=!0;for(let i=0;i<menuLinks.length;i++){if(menuLinks[i].parentElement.classList.contains('srdCurrentTax')){isTopLevel=!1;if(i==0){let srdPrevLink=document.getElementById('srdPrevLink');let prevSpan=srdPrevLink.getElementsByTagName("span")[0];let srdNextLink=document.getElementById('srdNextLink');let nextSpan=srdNextLink.getElementsByTagName("span")[0];var prevMenuLink=document.createElement('a');var linkText=document.createTextNode("Manual");prevMenuLink.appendChild(linkText);prevMenuLink.href="/manual/";var nextMenuLink=menuLinks[1];var prev_a=prevMenuLink;prev_a.prepend(prevSpan);srdPrevLink.prepend(prev_a);var next_a=nextMenuLink.cloneNode(!0);next_a.appendChild(nextSpan);srdNextLink.prepend(next_a)}else if(i==menuLinks.length-1){let srdPrevLink=document.getElementById('srdPrevLink');let prevSpan=srdPrevLink.getElementsByTagName("span")[0];var prevMenuLink=menuLinks[i-1];var prev_a=prevMenuLink.cloneNode(!0);prev_a.prepend(prevSpan);srdPrevLink.prepend(prev_a)}else{let srdPrevLink=document.getElementById('srdPrevLink');let prevSpan=srdPrevLink.getElementsByTagName("span")[0];let srdNextLink=document.getElementById('srdNextLink');let nextSpan=srdNextLink.getElementsByTagName("span")[0];var prevMenuLink=menuLinks[i-1];var nextMenuLink=menuLinks[i+1];var prev_a=prevMenuLink.cloneNode(!0);prev_a.prepend(prevSpan);srdPrevLink.prepend(prev_a);var next_a=nextMenuLink.cloneNode(!0);next_a.appendChild(nextSpan);srdNextLink.prepend(next_a)}}}
if(isTopLevel){let srdNextLink=document.getElementById('srdNextLink');let nextSpan=srdNextLink.getElementsByTagName("span")[0];var nextMenuLink=menuLinks[0];var next_a=nextMenuLink.cloneNode(!0);next_a.appendChild(nextSpan);srdNextLink.prepend(next_a)}}
if(stickyViewer!==undefined){document.addEventListener('scroll',(event)=>{checkSticky(event.type,sidebar,primaryColumn,stickyViewer,stickySquasher,stickyShifter)});window.addEventListener('resize',(event)=>{checkSticky(event.type,sidebar,primaryColumn,stickyViewer,stickySquasher,stickyShifter)});checkSticky('init',sidebar,primaryColumn,stickyViewer,stickySquasher,stickyShifter)}})();var srdStickied=!1
var srdLastSidebarTop=0
var srdShifterTop=0
function checkSticky(eventType,sidebar,primaryColumn,stickyViewer,stickySquasher,stickyShifter){let primaryHeight=primaryColumn.offsetHeight;let stickyShifterHeight=stickyShifter.offsetHeight;if(window.innerWidth<=980)return
if(primaryHeight<stickyShifterHeight){stickyViewer.classList.add("srdStickyViewerAutoHeight")
stickySquasher.classList.add("srdStickySquasherRelative")
stickyShifter.classList.add("srdStickyShifterRelative")
stickySquasher.style.bottom=null
stickyShifter.style.top=null
if(srdStickied){stickyViewer.classList.remove("srdStickTop");srdStickied=!1}
return}
stickyViewer.classList.remove("srdStickyViewerAutoHeight")
stickySquasher.classList.remove("srdStickySquasherRelative")
stickyShifter.classList.remove("srdStickyShifterRelative")
let sidebarTop=sidebar.getBoundingClientRect().top;if(sidebarTop>120){stickySquasher.style.bottom=null
stickyShifter.style.top=null
if(srdStickied){stickyViewer.classList.remove("srdStickTop");srdStickied=!1}
return}
if(!srdStickied){stickyViewer.classList.add("srdStickTop")
srdStickied=!0}
let sidebarBottom=sidebar.getBoundingClientRect().bottom;let squasherBottom=window.innerHeight-sidebarBottom+70
squasherBottom=squasherBottom<0?0:(squasherBottom)
stickySquasher.style.bottom=`${squasherBottom}px`
let stickySquasherHeight=stickySquasher.offsetHeight;let stickyOverflow=stickyShifterHeight-stickySquasherHeight
if(stickyOverflow<=0){stickyShifter.style.top=`0`
return}
let difference=(sidebarTop-srdLastSidebarTop)
srdLastSidebarTop=sidebarTop;let stickyShifterBottom=stickyShifter.getBoundingClientRect().bottom
if(stickyShifterBottom<sidebarBottom){let shifterMinTop=stickyOverflow*-1
srdShifterTop+=difference
srdShifterTop=srdShifterTop<shifterMinTop?shifterMinTop:(srdShifterTop>0?0:srdShifterTop)
stickyShifter.style.top=`${srdShifterTop}px`
return}
srdShifterTop=(stickyShifterHeight-stickySquasherHeight)*-1
stickyShifter.style.top=`${srdShifterTop}px`}
function toggleCollapseMenu(event){let collapsibleMenu=document.getElementById('srdCollapseMenu');if(collapsibleMenu.classList.contains('srdCollapseMenu_closed')){collapsibleMenu.classList.remove('srdCollapseMenu_closed');collapsibleMenu.classList.add('srdCollapseMenu_open')}else{collapsibleMenu.classList.remove('srdCollapseMenu_open');collapsibleMenu.classList.add('srdCollapseMenu_closed')}}
function collectParentItems(ulNode,parentItemsArray,isSecondLevel){for(let li=0;li<ulNode.childNodes.length;li++){let listItem=ulNode.childNodes[li];for(let cu=0;cu<listItem.childNodes.length;cu++){if(isSecondLevel&&!listItem.classList.contains('srdSecondLevelMenu'))listItem.classList.add('srdSecondLevelMenu');let childUL=listItem.childNodes[cu];if(childUL.className=='children'){parentItemsArray.push(listItem);listItem.classList.add('srdHasChildren')
childUL.className+=' srdChildMenu_closed'
collectParentItems(childUL,parentItemsArray,!1)}}}}
function toggleChildMenu(toggleSwitch,currentlyOpen){let targetSwitch=toggleSwitch;let targetMenu=targetSwitch.nextElementSibling.nextElementSibling;toggleMenu(targetSwitch,targetMenu,currentlyOpen)}
function toggleMenu(targetSwitch,targetMenu,currentlyOpen){if(targetSwitch!=null){if(targetSwitch.classList.contains('srd_toggleSwitch_closed')){checkCloseSiblingMenus(targetSwitch,currentlyOpen);openMenu(targetSwitch,targetMenu,currentlyOpen)}else{closeMenu(targetSwitch,targetMenu,currentlyOpen)}}}
function openMenu(targetSwitch,targetMenu,currentlyOpen){let itemLI=targetSwitch.parentNode;targetSwitch.classList.remove('srd_toggleSwitch_closed');targetSwitch.classList.add('srd_toggleSwitch_open');itemLI.classList.add('srd_menuli_open');targetMenu.classList.remove('srdChildMenu_closed');targetMenu.classList.add('srdChildMenu_open');if(itemLI.classList.contains('srdSecondLevelMenu')){currentlyOpen.SecondLevel=itemLI.closest('.srdSecondLevelMenu')
currentlyOpen.TopLevel=itemLI.closest('.srdTopLevelMenu')}}
function closeMenu(targetSwitch,targetMenu,currentlyOpen){let itemLI=targetSwitch.parentNode;targetSwitch.classList.remove('srd_toggleSwitch_open');targetSwitch.classList.add('srd_toggleSwitch_closed');itemLI.classList.remove('srd_menuli_open');targetMenu.classList.remove('srdChildMenu_open');targetMenu.classList.add('srdChildMenu_closed');if(itemLI.classList.contains('srdSecondLevelMenu')&&!targetSwitch.classList.contains('srd_keep_open')){currentlyOpen.TopLevel=null
currentlyOpen.SecondLevel=null}}
function checkCloseSiblingMenus(targetSwitch,currentlyOpen){let itemLI=targetSwitch.parentNode;if(itemLI.classList.contains('srdSecondLevelMenu')){if(currentlyOpen.TopLevel==null)return
let itemsTopLevel=itemLI.closest('.srdTopLevelMenu')
let differentTopLevel=(currentlyOpen.TopLevel==itemsTopLevel)?!1:!0;if(differentTopLevel&&currentlyOpen.SecondLevel.classList.contains('srdHasChildren')){let otherSwitch=currentlyOpen.SecondLevel.childNodes[0]
let targetMenu=otherSwitch.nextElementSibling.nextElementSibling;if(!otherSwitch.classList.contains('srd_keep_open')){closeMenu(otherSwitch,targetMenu,currentlyOpen)}}else{closeSiblingMenu(itemLI,currentlyOpen)}}else{closeSiblingMenu(itemLI,currentlyOpen)}}
function closeSiblingMenu(itemLI,currentlyOpen){let itemSiblings=itemLI.parentNode.childNodes;for(let i=0;i<itemSiblings.length;i++){if(itemSiblings[i].classList.contains('srd_menuli_open')&&itemSiblings[i]!=itemLI){let childSwitch=itemSiblings[i].childNodes[0]
if(!childSwitch.classList.contains('srd_keep_open')){let targetMenu=childSwitch.nextElementSibling.nextElementSibling;closeMenu(childSwitch,targetMenu,currentlyOpen)}}}}
function openParentItems(node,currentlyOpen){if(node!==undefined&&node!=null){let parentMenuItem=node.parentNode.closest('.children')
if(parentMenuItem!=null){let relatedSwitch=parentMenuItem.previousElementSibling.previousElementSibling
if(relatedSwitch!=null){relatedSwitch.classList.add("srd_keep_open")
openMenu(relatedSwitch,parentMenuItem,currentlyOpen)
openParentItems(relatedSwitch,currentlyOpen)}}}}
function openChildItem(node){if(node!==undefined&&node!=null){let childMenuItem=node.children[2]
let relatedSwitch=node.children[0]
relatedSwitch.classList.remove('srd_toggleSwitch_closed');relatedSwitch.classList.add('srd_toggleSwitch_open');childMenuItem.classList.remove('srdChildMenu_closed');childMenuItem.classList.add('srdChildMenu_open')}}