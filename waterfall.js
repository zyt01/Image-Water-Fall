var dataInit = {
    'data':[
        {'src':'0.jpg'}
        , {'src':'1.jpg'}
        , {'src':'2.jpg'}
        , {'src':'3.jpg'}
        , {'src':'4.jpg'}
        , {'src':'5.jpg'}
        , {'src':'6.jpg'}
        , {'src':'7.jpg'}
        , {'src':'8.jpg'}
        , {'src':'9.jpg'}
        , {'src':'10.jpg'}
    ]
};

function getByClassName(oParent, sClass) {
    var aResult = new Array();
    var aElements = oParent.getElementsByTagName('*');
    for(var i = 0 ; i < aElements.length; i++){
        if(aElements[i].className == sClass){
            aResult.push(aElements[i]);
        }
    }
    return aResult;
}

function getIndex(arr, value) {
    for(var i in arr){
        if(arr[i] == value)return i;
    }
}

function waterfall(parent, sclass) {
    var oParent = document.getElementById(parent);
    var aBox = getByClassName(oParent, sclass);
    var boxwidth = aBox[0].offsetWidth;
    var documentwidth = document.body.clientWidth || document.documentElement.clientWidth;
    var cnum = Math.floor(documentwidth/boxwidth);
    oParent.style.width = boxwidth * cnum + 'px';

    var aBoxHeight = new Array();
    for(var i = 0; i < aBox.length; i++){
        if(i < cnum){
            aBox[i].style.top = 0 + 'px';
            aBox[i].style.left = boxwidth * i + 'px';
            aBoxHeight.push(aBox[i].offsetHeight);
        }
        else {
            var minHeight = Math.min.apply(null, aBoxHeight);
            var minIndex = getIndex(aBoxHeight, minHeight);
            aBox[i].style.position = 'absolute';
            aBox[i].style.top = minHeight + 'px';
            aBox[i].style.left = aBox[minIndex].offsetLeft + 'px';
            aBoxHeight[minIndex] += aBox[i].offsetHeight;
        }
    }
}

function checkScrollside(sParent, sClass) {
    var oParent = document.getElementById(sParent);
    var aBox = getByClassName(oParent, sClass);
    var lastImgIn = aBox[aBox.length-1].offsetTop + Math.floor(aBox[aBox.length-1].offsetHeight/2);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var documentheight = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastImgIn < scrollTop + documentheight);
}

window.onload = function() {
    waterfall('main', 'box');
}
window.onscroll = function () {
    if(checkScrollside('main', 'box')){
        var oParent = document.getElementById('main');
        for(var i = 0; i < dataInit.data.length; i++) {
            var oBox = document.createElement('div');
            oBox.className = 'box';
            var oPic = document.createElement('div');
            oPic.className = 'pic';
            var oImg = document.createElement('img');
            oImg.src = './images/' + dataInit.data[i].src;
            oPic.appendChild(oImg);
            oBox.appendChild(oPic);
            oParent.appendChild(oBox);
        }
        waterfall('main', 'box');
    }
}
window.onresize = function(){
    waterfall('main', 'box');
}