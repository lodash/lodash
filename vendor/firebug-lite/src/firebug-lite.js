(function(){
/**************************************************************
 *
 *    Firebug Lite 1.4.0
 * 
 *      Copyright (c) 2007, Parakey Inc.
 *      Released under BSD license.
 *      More information: http://getfirebug.com/firebuglite
 *  
 **************************************************************/
/*
 * CSS selectors powered by:
 * 
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
var FBL={};
(function(){var productionDir="http://getfirebug.com/releases/lite/";
var bookmarkletVersion=4;
var reNotWhitespace=/[^\s]/;
var reSplitFile=/:\/{1,3}(.*?)\/([^\/]*?)\/?($|\?.*)/;
this.reJavascript=/\s*javascript:\s*(.*)/;
this.reChrome=/chrome:\/\/([^\/]*)\//;
this.reFile=/file:\/\/([^\/]*)\//;
var userAgent=navigator.userAgent.toLowerCase();
this.isFirefox=/firefox/.test(userAgent);
this.isOpera=/opera/.test(userAgent);
this.isSafari=/webkit/.test(userAgent);
this.isIE=/msie/.test(userAgent)&&!/opera/.test(userAgent);
this.isIE6=/msie 6/i.test(navigator.appVersion);
this.browserVersion=(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1];
this.isIElt8=this.isIE&&(this.browserVersion-0<8);
this.NS=null;
this.pixelsPerInch=null;
var namespaces=[];
this.ns=function(fn){var ns={};
namespaces.push(fn,ns);
return ns
};
var FBTrace=null;
this.initialize=function(){if(window.firebug&&firebug.firebuglite||window.console&&console.firebuglite){return
}if(FBL.FBTrace){FBTrace=FBL.FBTrace
}else{FBTrace=FBL.FBTrace={}
}var isChromeContext=window.Firebug&&typeof window.Firebug.SharedEnv=="object";
if(isChromeContext){sharedEnv=window.Firebug.SharedEnv;
delete window.Firebug.SharedEnv;
FBL.Env=sharedEnv;
FBL.Env.isChromeContext=true;
FBTrace.messageQueue=FBL.Env.traceMessageQueue
}else{FBL.NS=document.documentElement.namespaceURI;
FBL.Env.browser=window;
FBL.Env.destroy=destroyEnvironment;
if(document.documentElement.getAttribute("debug")=="true"){FBL.Env.Options.startOpened=true
}findLocation();
var prefs=FBL.Store.get("FirebugLite")||{};
FBL.Env.DefaultOptions=FBL.Env.Options;
FBL.Env.Options=FBL.extend(FBL.Env.Options,prefs.options||{});
if(FBL.isFirefox&&typeof FBL.Env.browser.console=="object"&&FBL.Env.browser.console.firebug&&FBL.Env.Options.disableWhenFirebugActive){return
}}if(FBL.Env.isDebugMode){FBL.Env.browser.FBL=FBL
}this.isQuiksMode=FBL.Env.browser.document.compatMode=="BackCompat";
this.isIEQuiksMode=this.isIE&&this.isQuiksMode;
this.isIEStantandMode=this.isIE&&!this.isQuiksMode;
this.noFixedPosition=this.isIE6||this.isIEQuiksMode;
if(FBL.Env.Options.enableTrace){FBTrace.initialize()
}if(FBTrace.DBG_INITIALIZE&&isChromeContext){FBTrace.sysout("FBL.initialize - persistent application","initialize chrome context")
}if(FBTrace.DBG_INITIALIZE){FBTrace.sysout("FBL.initialize",namespaces.length/2+" namespaces BEGIN")
}for(var i=0;
i<namespaces.length;
i+=2){var fn=namespaces[i];
var ns=namespaces[i+1];
fn.apply(ns)
}if(FBTrace.DBG_INITIALIZE){FBTrace.sysout("FBL.initialize",namespaces.length/2+" namespaces END");
FBTrace.sysout("FBL waitForDocument","waiting document load")
}FBL.Ajax.initialize();
FBL.Firebug.loadPrefs();
if(FBL.Env.Options.enablePersistent){if(isChromeContext){FBL.FirebugChrome.clone(FBL.Env.FirebugChrome)
}else{FBL.Env.FirebugChrome=FBL.FirebugChrome;
FBL.Env.traceMessageQueue=FBTrace.messageQueue
}}waitForDocument()
};
var waitForDocument=function waitForDocument(){var doc=FBL.Env.browser.document;
var body=doc.getElementsByTagName("body")[0];
if(body){calculatePixelsPerInch(doc,body);
onDocumentLoad()
}else{setTimeout(waitForDocument,50)
}};
var onDocumentLoad=function onDocumentLoad(){if(FBTrace.DBG_INITIALIZE){FBTrace.sysout("FBL onDocumentLoad","document loaded")
}if(FBL.isIE6){fixIE6BackgroundImageCache()
}if(FBL.Env.Options.enablePersistent&&FBL.Env.isChromeContext){FBL.Firebug.initialize();
if(!FBL.Env.isDevelopmentMode){sharedEnv.destroy();
sharedEnv=null
}}else{FBL.FirebugChrome.create()
}};
var sharedEnv;
this.Env={Options:{saveCookies:true,saveWindowPosition:false,saveCommandLineHistory:false,startOpened:false,startInNewWindow:false,showIconWhenHidden:true,overrideConsole:true,ignoreFirebugElements:true,disableWhenFirebugActive:true,disableXHRListener:false,disableResourceFetching:false,enableTrace:false,enablePersistent:false},Location:{sourceDir:null,baseDir:null,skinDir:null,skin:null,app:null},skin:"xp",useLocalSkin:false,isDevelopmentMode:false,isDebugMode:false,isChromeContext:false,browser:null,chrome:null};
var destroyEnvironment=function destroyEnvironment(){setTimeout(function(){FBL=null
},100)
};
var findLocation=function findLocation(){var reFirebugFile=/(firebug-lite(?:-\w+)?(?:\.js|\.jgz))(?:#(.+))?$/;
var reGetFirebugSite=/(?:http|https):\/\/getfirebug.com\//;
var isGetFirebugSite;
var rePath=/^(.*\/)/;
var reProtocol=/^\w+:\/\//;
var path=null;
var doc=document;
var script=doc.getElementById("FirebugLite");
var scriptSrc;
var hasSrcAttribute=true;
if(script){scriptSrc=script.src;
file=reFirebugFile.exec(scriptSrc);
var version=script.getAttribute("FirebugLite");
var number=version?parseInt(version):0;
if(!version||!number||number<bookmarkletVersion){FBL.Env.bookmarkletOutdated=true
}}else{for(var i=0,s=doc.getElementsByTagName("script"),si;
si=s[i];
i++){var file=null;
if(si.nodeName.toLowerCase()=="script"){if(file=reFirebugFile.exec(si.getAttribute("firebugSrc"))){scriptSrc=si.getAttribute("firebugSrc");
hasSrcAttribute=false
}else{if(file=reFirebugFile.exec(si.src)){scriptSrc=si.src
}else{continue
}}script=si;
break
}}}if(script){script.firebugIgnore=true
}if(file){var fileName=file[1];
var fileOptions=file[2];
if(reProtocol.test(scriptSrc)){path=rePath.exec(scriptSrc)[1]
}else{var r=rePath.exec(scriptSrc);
var src=r?r[1]:scriptSrc;
var backDir=/^((?:\.\.\/)+)(.*)/.exec(src);
var reLastDir=/^(.*\/)[^\/]+\/$/;
path=rePath.exec(location.href)[1];
if(backDir){var j=backDir[1].length/3;
var p;
while(j-->0){path=reLastDir.exec(path)[1]
}path+=backDir[2]
}else{if(src.indexOf("/")!=-1){if(/^\.\/./.test(src)){path+=src.substring(2)
}else{if(/^\/./.test(src)){var domain=/^(\w+:\/\/[^\/]+)/.exec(path);
path=domain[1]+src
}else{path+=src
}}}}}}FBL.Env.isChromeExtension=script&&script.getAttribute("extension")=="Chrome";
if(FBL.Env.isChromeExtension){path=productionDir;
FBL.Env.bookmarkletOutdated=false;
script={innerHTML:"{showIconWhenHidden:false}"}
}isGetFirebugSite=reGetFirebugSite.test(path);
if(isGetFirebugSite&&path.indexOf("/releases/lite/")==-1){path+="releases/lite/"+(fileName=="firebug-lite-beta.js"?"beta/":"latest/")
}var m=path&&path.match(/([^\/]+)\/$/)||null;
if(path&&m){var Env=FBL.Env;
Env.useLocalSkin=path.indexOf(location.protocol+"//"+location.host+"/")==0&&!isGetFirebugSite;
if(fileName=="firebug-lite-dev.js"){Env.isDevelopmentMode=true;
Env.isDebugMode=true
}else{if(fileName=="firebug-lite-debug.js"){Env.isDebugMode=true
}}if(Env.browser.document.documentElement.getAttribute("debug")=="true"){Env.Options.startOpened=true
}if(fileOptions){var options=fileOptions.split(",");
for(var i=0,length=options.length;
i<length;
i++){var option=options[i];
var name,value;
if(option.indexOf("=")!=-1){var parts=option.split("=");
name=parts[0];
value=eval(unescape(parts[1]))
}else{name=option;
value=true
}if(name=="debug"){Env.isDebugMode=!!value
}else{if(name in Env.Options){Env.Options[name]=value
}else{Env[name]=value
}}}}if(hasSrcAttribute){var innerOptions=FBL.trim(script.innerHTML);
if(innerOptions){var innerOptionsObject=eval("("+innerOptions+")");
for(var name in innerOptionsObject){var value=innerOptionsObject[name];
if(name=="debug"){Env.isDebugMode=!!value
}else{if(name in Env.Options){Env.Options[name]=value
}else{Env[name]=value
}}}}}if(!Env.Options.saveCookies){FBL.Store.remove("FirebugLite")
}if(Env.isDebugMode){Env.Options.startOpened=true;
Env.Options.enableTrace=true;
Env.Options.disableWhenFirebugActive=false
}var loc=Env.Location;
var isProductionRelease=path.indexOf(productionDir)!=-1;
loc.sourceDir=path;
loc.baseDir=path.substr(0,path.length-m[1].length-1);
loc.skinDir=(isProductionRelease?path:loc.baseDir)+"skin/"+Env.skin+"/";
loc.skin=loc.skinDir+"firebug.html";
loc.app=path+fileName
}else{throw new Error("Firebug Error: Library path not found")
}};
this.bind=function(){var args=cloneArray(arguments),fn=args.shift(),object=args.shift();
return function(){return fn.apply(object,arrayInsert(cloneArray(args),0,arguments))
}
};
this.bindFixed=function(){var args=cloneArray(arguments),fn=args.shift(),object=args.shift();
return function(){return fn.apply(object,args)
}
};
this.extend=function(l,r){var newOb={};
for(var n in l){newOb[n]=l[n]
}for(var n in r){newOb[n]=r[n]
}return newOb
};
this.descend=function(prototypeParent,childProperties){function protoSetter(){}protoSetter.prototype=prototypeParent;
var newOb=new protoSetter();
for(var n in childProperties){newOb[n]=childProperties[n]
}return newOb
};
this.append=function(l,r){for(var n in r){l[n]=r[n]
}return l
};
this.keys=function(map){var keys=[];
try{for(var name in map){keys.push(name)
}}catch(exc){}return keys
};
this.values=function(map){var values=[];
try{for(var name in map){try{values.push(map[name])
}catch(exc){if(FBTrace.DBG_ERRORS){FBTrace.sysout("lib.values FAILED ",exc)
}}}}catch(exc){if(FBTrace.DBG_ERRORS){FBTrace.sysout("lib.values FAILED ",exc)
}}return values
};
this.remove=function(list,item){for(var i=0;
i<list.length;
++i){if(list[i]==item){list.splice(i,1);
break
}}};
this.sliceArray=function(array,index){var slice=[];
for(var i=index;
i<array.length;
++i){slice.push(array[i])
}return slice
};
function cloneArray(array,fn){var newArray=[];
if(fn){for(var i=0;
i<array.length;
++i){newArray.push(fn(array[i]))
}}else{for(var i=0;
i<array.length;
++i){newArray.push(array[i])
}}return newArray
}function extendArray(array,array2){var newArray=[];
newArray.push.apply(newArray,array);
newArray.push.apply(newArray,array2);
return newArray
}this.extendArray=extendArray;
this.cloneArray=cloneArray;
function arrayInsert(array,index,other){for(var i=0;
i<other.length;
++i){array.splice(i+index,0,other[i])
}return array
}this.createStyleSheet=function(doc,url){var style=this.createElement("link");
style.setAttribute("charset","utf-8");
style.firebugIgnore=true;
style.setAttribute("rel","stylesheet");
style.setAttribute("type","text/css");
style.setAttribute("href",url);
return style
};
this.addStyleSheet=function(doc,style){var heads=doc.getElementsByTagName("head");
if(heads.length){heads[0].appendChild(style)
}else{doc.documentElement.appendChild(style)
}};
this.appendStylesheet=function(doc,uri){if(this.$(uri,doc)){return
}var styleSheet=this.createStyleSheet(doc,uri);
styleSheet.setAttribute("id",uri);
this.addStyleSheet(doc,styleSheet)
};
this.addScript=function(doc,id,src){var element=doc.createElementNS("http://www.w3.org/1999/xhtml","html:script");
element.setAttribute("type","text/javascript");
element.setAttribute("id",id);
if(!FBTrace.DBG_CONSOLE){FBL.unwrapObject(element).firebugIgnore=true
}element.innerHTML=src;
if(doc.documentElement){doc.documentElement.appendChild(element)
}else{if(FBTrace.DBG_ERRORS){FBTrace.sysout("lib.addScript doc has no documentElement:",doc)
}}return element
};
this.getStyle=this.isIE?function(el,name){return el.currentStyle[name]||el.style[name]||undefined
}:function(el,name){return el.ownerDocument.defaultView.getComputedStyle(el,null)[name]||el.style[name]||undefined
};
var entityConversionLists=this.entityConversionLists={normal:{whitespace:{"\t":"\u200c\u2192","\n":"\u200c\u00b6","\r":"\u200c\u00ac"," ":"\u200c\u00b7"}},reverse:{whitespace:{"&Tab;":"\t","&NewLine;":"\n","\u200c\u2192":"\t","\u200c\u00b6":"\n","\u200c\u00ac":"\r","\u200c\u00b7":" "}}};
var normal=entityConversionLists.normal,reverse=entityConversionLists.reverse;
function addEntityMapToList(ccode,entity){var lists=Array.prototype.slice.call(arguments,2),len=lists.length,ch=String.fromCharCode(ccode);
for(var i=0;
i<len;
i++){var list=lists[i];
normal[list]=normal[list]||{};
normal[list][ch]="&"+entity+";";
reverse[list]=reverse[list]||{};
reverse[list]["&"+entity+";"]=ch
}}var e=addEntityMapToList,white="whitespace",text="text",attr="attributes",css="css",editor="editor";
e(34,"quot",attr,css);
e(38,"amp",attr,text,css);
e(39,"apos",css);
e(60,"lt",attr,text,css);
e(62,"gt",attr,text,css);
e(169,"copy",text,editor);
e(174,"reg",text,editor);
e(8482,"trade",text,editor);
e(8210,"#8210",attr,text,editor);
e(8211,"ndash",attr,text,editor);
e(8212,"mdash",attr,text,editor);
e(8213,"#8213",attr,text,editor);
e(160,"nbsp",attr,text,white,editor);
e(8194,"ensp",attr,text,white,editor);
e(8195,"emsp",attr,text,white,editor);
e(8201,"thinsp",attr,text,white,editor);
e(8204,"zwnj",attr,text,white,editor);
e(8205,"zwj",attr,text,white,editor);
e(8206,"lrm",attr,text,white,editor);
e(8207,"rlm",attr,text,white,editor);
e(8203,"#8203",attr,text,white,editor);
var entityConversionRegexes={normal:{},reverse:{}};
var escapeEntitiesRegEx={normal:function(list){var chars=[];
for(var ch in list){chars.push(ch)
}return new RegExp("(["+chars.join("")+"])","gm")
},reverse:function(list){var chars=[];
for(var ch in list){chars.push(ch)
}return new RegExp("("+chars.join("|")+")","gm")
}};
function getEscapeRegexp(direction,lists){var name="",re;
var groups=[].concat(lists);
for(i=0;
i<groups.length;
i++){name+=groups[i].group
}re=entityConversionRegexes[direction][name];
if(!re){var list={};
if(groups.length>1){for(var i=0;
i<groups.length;
i++){var aList=entityConversionLists[direction][groups[i].group];
for(var item in aList){list[item]=aList[item]
}}}else{if(groups.length==1){list=entityConversionLists[direction][groups[0].group]
}else{list={}
}}re=entityConversionRegexes[direction][name]=escapeEntitiesRegEx[direction](list)
}return re
}function createSimpleEscape(name,direction){return function(value){var list=entityConversionLists[direction][name];
return String(value).replace(getEscapeRegexp(direction,{group:name,list:list}),function(ch){return list[ch]
})
}
}function escapeGroupsForEntities(str,lists){lists=[].concat(lists);
var re=getEscapeRegexp("normal",lists),split=String(str).split(re),len=split.length,results=[],cur,r,i,ri=0,l,list,last="";
if(!len){return[{str:String(str),group:"",name:""}]
}for(i=0;
i<len;
i++){cur=split[i];
if(cur==""){continue
}for(l=0;
l<lists.length;
l++){list=lists[l];
r=entityConversionLists.normal[list.group][cur];
if(r){results[ri]={str:r,"class":list["class"],extra:list.extra[cur]?list["class"]+list.extra[cur]:""};
break
}}if(!r){results[ri]={str:cur,"class":"",extra:""}
}ri++
}return results
}this.escapeGroupsForEntities=escapeGroupsForEntities;
function unescapeEntities(str,lists){var re=getEscapeRegexp("reverse",lists),split=String(str).split(re),len=split.length,results=[],cur,r,i,ri=0,l,list;
if(!len){return str
}lists=[].concat(lists);
for(i=0;
i<len;
i++){cur=split[i];
if(cur==""){continue
}for(l=0;
l<lists.length;
l++){list=lists[l];
r=entityConversionLists.reverse[list.group][cur];
if(r){results[ri]=r;
break
}}if(!r){results[ri]=cur
}ri++
}return results.join("")||""
}var escapeForTextNode=this.escapeForTextNode=createSimpleEscape("text","normal");
var escapeForHtmlEditor=this.escapeForHtmlEditor=createSimpleEscape("editor","normal");
var escapeForElementAttribute=this.escapeForElementAttribute=createSimpleEscape("attributes","normal");
var escapeForCss=this.escapeForCss=createSimpleEscape("css","normal");
var escapeForSourceLine=this.escapeForSourceLine=createSimpleEscape("text","normal");
var unescapeWhitespace=createSimpleEscape("whitespace","reverse");
this.unescapeForTextNode=function(str){if(Firebug.showTextNodesWithWhitespace){str=unescapeWhitespace(str)
}if(!Firebug.showTextNodesWithEntities){str=escapeForElementAttribute(str)
}return str
};
this.escapeNewLines=function(value){return value.replace(/\r/g,"\\r").replace(/\n/g,"\\n")
};
this.stripNewLines=function(value){return typeof(value)=="string"?value.replace(/[\r\n]/g," "):value
};
this.escapeJS=function(value){return value.replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace('"','\\"',"g")
};
function escapeHTMLAttribute(value){function replaceChars(ch){switch(ch){case"&":return"&amp;";
case"'":return apos;
case'"':return quot
}return"?"
}var apos="&#39;",quot="&quot;",around='"';
if(value.indexOf('"')==-1){quot='"';
apos="'"
}else{if(value.indexOf("'")==-1){quot='"';
around="'"
}}return around+(String(value).replace(/[&'"]/g,replaceChars))+around
}function escapeHTML(value){function replaceChars(ch){switch(ch){case"<":return"&lt;";
case">":return"&gt;";
case"&":return"&amp;";
case"'":return"&#39;";
case'"':return"&quot;"
}return"?"
}return String(value).replace(/[<>&"']/g,replaceChars)
}this.escapeHTML=escapeHTML;
this.cropString=function(text,limit){text=text+"";
if(!limit){var halfLimit=50
}else{var halfLimit=limit/2
}if(text.length>limit){return this.escapeNewLines(text.substr(0,halfLimit)+"..."+text.substr(text.length-halfLimit))
}else{return this.escapeNewLines(text)
}};
this.isWhitespace=function(text){return !reNotWhitespace.exec(text)
};
this.splitLines=function(text){var reSplitLines2=/.*(:?\r\n|\n|\r)?/mg;
var lines;
if(text.match){lines=text.match(reSplitLines2)
}else{var str=text+"";
lines=str.match(reSplitLines2)
}lines.pop();
return lines
};
this.safeToString=function(ob){if(this.isIE){try{return ob+""
}catch(E){FBTrace.sysout("Lib.safeToString() failed for ",ob);
return""
}}try{if(ob&&"toString" in ob&&typeof ob.toString=="function"){return ob.toString()
}}catch(exc){return ob+""
}};
this.hasProperties=function(ob){try{for(var name in ob){return true
}}catch(exc){}return false
};
var reTrim=/^\s+|\s+$/g;
this.trim=function(s){return s.replace(reTrim,"")
};
this.emptyFn=function(){};
this.isVisible=function(elt){return this.getStyle(elt,"visibility")!="hidden"&&(elt.offsetWidth>0||elt.offsetHeight>0||elt.tagName in invisibleTags||elt.namespaceURI=="http://www.w3.org/2000/svg"||elt.namespaceURI=="http://www.w3.org/1998/Math/MathML")
};
this.collapse=function(elt,collapsed){if(this.isIElt8){if(collapsed){this.setClass(elt,"collapsed")
}else{this.removeClass(elt,"collapsed")
}}else{elt.setAttribute("collapsed",collapsed?"true":"false")
}};
this.obscure=function(elt,obscured){if(obscured){this.setClass(elt,"obscured")
}else{this.removeClass(elt,"obscured")
}};
this.hide=function(elt,hidden){elt.style.visibility=hidden?"hidden":"visible"
};
this.clearNode=function(node){var nodeName=" "+node.nodeName.toLowerCase()+" ";
var ignoreTags=" table tbody thead tfoot th tr td ";
if(this.isIE&&ignoreTags.indexOf(nodeName)!=-1){this.eraseNode(node)
}else{node.innerHTML=""
}};
this.eraseNode=function(node){while(node.lastChild){node.removeChild(node.lastChild)
}};
this.iterateWindows=function(win,handler){if(!win||!win.document){return
}handler(win);
if(win==top||!win.frames){return
}for(var i=0;
i<win.frames.length;
++i){var subWin=win.frames[i];
if(subWin!=win){this.iterateWindows(subWin,handler)
}}};
this.getRootWindow=function(win){for(;
win;
win=win.parent){if(!win.parent||win==win.parent||!this.instanceOf(win.parent,"Window")){return win
}}return null
};
this.getClientOffset=function(elt){var addOffset=function addOffset(elt,coords,view){var p=elt.offsetParent;
var chrome=Firebug.chrome;
if(elt.offsetLeft){coords.x+=elt.offsetLeft+chrome.getMeasurementInPixels(elt,"borderLeft")
}if(elt.offsetTop){coords.y+=elt.offsetTop+chrome.getMeasurementInPixels(elt,"borderTop")
}if(p){if(p.nodeType==1){addOffset(p,coords,view)
}}else{var otherView=isIE?elt.ownerDocument.parentWindow:elt.ownerDocument.defaultView;
if(!otherView.opener&&otherView.frameElement){addOffset(otherView.frameElement,coords,otherView)
}}};
var isIE=this.isIE;
var coords={x:0,y:0};
if(elt){var view=isIE?elt.ownerDocument.parentWindow:elt.ownerDocument.defaultView;
addOffset(elt,coords,view)
}return coords
};
this.getViewOffset=function(elt,singleFrame){function addOffset(elt,coords,view){var p=elt.offsetParent;
coords.x+=elt.offsetLeft-(p?p.scrollLeft:0);
coords.y+=elt.offsetTop-(p?p.scrollTop:0);
if(p){if(p.nodeType==1){var parentStyle=view.getComputedStyle(p,"");
if(parentStyle.position!="static"){coords.x+=parseInt(parentStyle.borderLeftWidth);
coords.y+=parseInt(parentStyle.borderTopWidth);
if(p.localName=="TABLE"){coords.x+=parseInt(parentStyle.paddingLeft);
coords.y+=parseInt(parentStyle.paddingTop)
}else{if(p.localName=="BODY"){var style=view.getComputedStyle(elt,"");
coords.x+=parseInt(style.marginLeft);
coords.y+=parseInt(style.marginTop)
}}}else{if(p.localName=="BODY"){coords.x+=parseInt(parentStyle.borderLeftWidth);
coords.y+=parseInt(parentStyle.borderTopWidth)
}}var parent=elt.parentNode;
while(p!=parent){coords.x-=parent.scrollLeft;
coords.y-=parent.scrollTop;
parent=parent.parentNode
}addOffset(p,coords,view)
}}else{if(elt.localName=="BODY"){var style=view.getComputedStyle(elt,"");
coords.x+=parseInt(style.borderLeftWidth);
coords.y+=parseInt(style.borderTopWidth);
var htmlStyle=view.getComputedStyle(elt.parentNode,"");
coords.x-=parseInt(htmlStyle.paddingLeft);
coords.y-=parseInt(htmlStyle.paddingTop)
}if(elt.scrollLeft){coords.x+=elt.scrollLeft
}if(elt.scrollTop){coords.y+=elt.scrollTop
}var win=elt.ownerDocument.defaultView;
if(win&&(!singleFrame&&win.frameElement)){addOffset(win.frameElement,coords,win)
}}}var coords={x:0,y:0};
if(elt){addOffset(elt,coords,elt.ownerDocument.defaultView)
}return coords
};
this.getLTRBWH=function(elt){var bcrect,dims={left:0,top:0,right:0,bottom:0,width:0,height:0};
if(elt){bcrect=elt.getBoundingClientRect();
dims.left=bcrect.left;
dims.top=bcrect.top;
dims.right=bcrect.right;
dims.bottom=bcrect.bottom;
if(bcrect.width){dims.width=bcrect.width;
dims.height=bcrect.height
}else{dims.width=dims.right-dims.left;
dims.height=dims.bottom-dims.top
}}return dims
};
this.applyBodyOffsets=function(elt,clientRect){var od=elt.ownerDocument;
if(!od.body){return clientRect
}var style=od.defaultView.getComputedStyle(od.body,null);
var pos=style.getPropertyValue("position");
if(pos==="absolute"||pos==="relative"){var borderLeft=parseInt(style.getPropertyValue("border-left-width").replace("px",""),10)||0;
var borderTop=parseInt(style.getPropertyValue("border-top-width").replace("px",""),10)||0;
var paddingLeft=parseInt(style.getPropertyValue("padding-left").replace("px",""),10)||0;
var paddingTop=parseInt(style.getPropertyValue("padding-top").replace("px",""),10)||0;
var marginLeft=parseInt(style.getPropertyValue("margin-left").replace("px",""),10)||0;
var marginTop=parseInt(style.getPropertyValue("margin-top").replace("px",""),10)||0;
var offsetX=borderLeft+paddingLeft+marginLeft;
var offsetY=borderTop+paddingTop+marginTop;
clientRect.left-=offsetX;
clientRect.top-=offsetY;
clientRect.right-=offsetX;
clientRect.bottom-=offsetY
}return clientRect
};
this.getOffsetSize=function(elt){return{width:elt.offsetWidth,height:elt.offsetHeight}
};
this.getOverflowParent=function(element){for(var scrollParent=element.parentNode;
scrollParent;
scrollParent=scrollParent.offsetParent){if(scrollParent.scrollHeight>scrollParent.offsetHeight){return scrollParent
}}};
this.isScrolledToBottom=function(element){var onBottom=(element.scrollTop+element.offsetHeight)==element.scrollHeight;
if(FBTrace.DBG_CONSOLE){FBTrace.sysout("isScrolledToBottom offsetHeight: "+element.offsetHeight+" onBottom:"+onBottom)
}return onBottom
};
this.scrollToBottom=function(element){element.scrollTop=element.scrollHeight;
if(FBTrace.DBG_CONSOLE){FBTrace.sysout("scrollToBottom reset scrollTop "+element.scrollTop+" = "+element.scrollHeight);
if(element.scrollHeight==element.offsetHeight){FBTrace.sysout("scrollToBottom attempt to scroll non-scrollable element "+element,element)
}}return(element.scrollTop==element.scrollHeight)
};
this.move=function(element,x,y){element.style.left=x+"px";
element.style.top=y+"px"
};
this.resize=function(element,w,h){element.style.width=w+"px";
element.style.height=h+"px"
};
this.linesIntoCenterView=function(element,scrollBox){if(!scrollBox){scrollBox=this.getOverflowParent(element)
}if(!scrollBox){return
}var offset=this.getClientOffset(element);
var topSpace=offset.y-scrollBox.scrollTop;
var bottomSpace=(scrollBox.scrollTop+scrollBox.clientHeight)-(offset.y+element.offsetHeight);
if(topSpace<0||bottomSpace<0){var split=(scrollBox.clientHeight/2);
var centerY=offset.y-split;
scrollBox.scrollTop=centerY;
topSpace=split;
bottomSpace=split-element.offsetHeight
}return{before:Math.round((topSpace/element.offsetHeight)+0.5),after:Math.round((bottomSpace/element.offsetHeight)+0.5)}
};
this.scrollIntoCenterView=function(element,scrollBox,notX,notY){if(!element){return
}if(!scrollBox){scrollBox=this.getOverflowParent(element)
}if(!scrollBox){return
}var offset=this.getClientOffset(element);
if(!notY){var topSpace=offset.y-scrollBox.scrollTop;
var bottomSpace=(scrollBox.scrollTop+scrollBox.clientHeight)-(offset.y+element.offsetHeight);
if(topSpace<0||bottomSpace<0){var centerY=offset.y-(scrollBox.clientHeight/2);
scrollBox.scrollTop=centerY
}}if(!notX){var leftSpace=offset.x-scrollBox.scrollLeft;
var rightSpace=(scrollBox.scrollLeft+scrollBox.clientWidth)-(offset.x+element.clientWidth);
if(leftSpace<0||rightSpace<0){var centerX=offset.x-(scrollBox.clientWidth/2);
scrollBox.scrollLeft=centerX
}}if(FBTrace.DBG_SOURCEFILES){FBTrace.sysout("lib.scrollIntoCenterView ","Element:"+element.innerHTML)
}};
var cssKeywordMap=null;
var cssPropNames=null;
var cssColorNames=null;
var imageRules=null;
this.getCSSKeywordsByProperty=function(propName){if(!cssKeywordMap){cssKeywordMap={};
for(var name in this.cssInfo){var list=[];
var types=this.cssInfo[name];
for(var i=0;
i<types.length;
++i){var keywords=this.cssKeywords[types[i]];
if(keywords){list.push.apply(list,keywords)
}}cssKeywordMap[name]=list
}}return propName in cssKeywordMap?cssKeywordMap[propName]:[]
};
this.getCSSPropertyNames=function(){if(!cssPropNames){cssPropNames=[];
for(var name in this.cssInfo){cssPropNames.push(name)
}}return cssPropNames
};
this.isColorKeyword=function(keyword){if(keyword=="transparent"){return false
}if(!cssColorNames){cssColorNames=[];
var colors=this.cssKeywords.color;
for(var i=0;
i<colors.length;
++i){cssColorNames.push(colors[i].toLowerCase())
}var systemColors=this.cssKeywords.systemColor;
for(var i=0;
i<systemColors.length;
++i){cssColorNames.push(systemColors[i].toLowerCase())
}}return cssColorNames.indexOf?cssColorNames.indexOf(keyword.toLowerCase())!=-1:(" "+cssColorNames.join(" ")+" ").indexOf(" "+keyword.toLowerCase()+" ")!=-1
};
this.isImageRule=function(rule){if(!imageRules){imageRules=[];
for(var i in this.cssInfo){var r=i.toLowerCase();
var suffix="image";
if(r.match(suffix+"$")==suffix||r=="background"){imageRules.push(r)
}}}return imageRules.indexOf?imageRules.indexOf(rule.toLowerCase())!=-1:(" "+imageRules.join(" ")+" ").indexOf(" "+rule.toLowerCase()+" ")!=-1
};
this.copyTextStyles=function(fromNode,toNode,style){var view=this.isIE?fromNode.ownerDocument.parentWindow:fromNode.ownerDocument.defaultView;
if(view){if(!style){style=this.isIE?fromNode.currentStyle:view.getComputedStyle(fromNode,"")
}toNode.style.fontFamily=style.fontFamily;
toNode.style.fontSize=style.fontSize;
toNode.style.fontWeight=style.fontWeight;
toNode.style.fontStyle=style.fontStyle;
return style
}};
this.copyBoxStyles=function(fromNode,toNode,style){var view=this.isIE?fromNode.ownerDocument.parentWindow:fromNode.ownerDocument.defaultView;
if(view){if(!style){style=this.isIE?fromNode.currentStyle:view.getComputedStyle(fromNode,"")
}toNode.style.marginTop=style.marginTop;
toNode.style.marginRight=style.marginRight;
toNode.style.marginBottom=style.marginBottom;
toNode.style.marginLeft=style.marginLeft;
toNode.style.borderTopWidth=style.borderTopWidth;
toNode.style.borderRightWidth=style.borderRightWidth;
toNode.style.borderBottomWidth=style.borderBottomWidth;
toNode.style.borderLeftWidth=style.borderLeftWidth;
return style
}};
this.readBoxStyles=function(style){var styleNames={"margin-top":"marginTop","margin-right":"marginRight","margin-left":"marginLeft","margin-bottom":"marginBottom","border-top-width":"borderTop","border-right-width":"borderRight","border-left-width":"borderLeft","border-bottom-width":"borderBottom","padding-top":"paddingTop","padding-right":"paddingRight","padding-left":"paddingLeft","padding-bottom":"paddingBottom","z-index":"zIndex"};
var styles={};
for(var styleName in styleNames){styles[styleNames[styleName]]=parseInt(style.getPropertyCSSValue(styleName).cssText)||0
}if(FBTrace.DBG_INSPECT){FBTrace.sysout("readBoxStyles ",styles)
}return styles
};
this.getBoxFromStyles=function(style,element){var args=this.readBoxStyles(style);
args.width=element.offsetWidth-(args.paddingLeft+args.paddingRight+args.borderLeft+args.borderRight);
args.height=element.offsetHeight-(args.paddingTop+args.paddingBottom+args.borderTop+args.borderBottom);
return args
};
this.getElementCSSSelector=function(element){var label=element.localName.toLowerCase();
if(element.id){label+="#"+element.id
}if(element.hasAttribute("class")){label+="."+element.getAttribute("class").split(" ")[0]
}return label
};
this.getURLForStyleSheet=function(styleSheet){return(styleSheet.href?styleSheet.href:styleSheet.ownerNode.ownerDocument.URL)
};
this.getDocumentForStyleSheet=function(styleSheet){while(styleSheet.parentStyleSheet&&!styleSheet.ownerNode){styleSheet=styleSheet.parentStyleSheet
}if(styleSheet.ownerNode){return styleSheet.ownerNode.ownerDocument
}};
this.getInstanceForStyleSheet=function(styleSheet,ownerDocument){if(FBL.isSystemStyleSheet(styleSheet)){return 0
}if(FBTrace.DBG_CSS){FBTrace.sysout("getInstanceForStyleSheet: "+styleSheet.href+" "+styleSheet.media.mediaText+" "+(styleSheet.ownerNode&&FBL.getElementXPath(styleSheet.ownerNode)),ownerDocument)
}ownerDocument=ownerDocument||FBL.getDocumentForStyleSheet(styleSheet);
var ret=0,styleSheets=ownerDocument.styleSheets,href=styleSheet.href;
for(var i=0;
i<styleSheets.length;
i++){var curSheet=styleSheets[i];
if(FBTrace.DBG_CSS){FBTrace.sysout("getInstanceForStyleSheet: compare href "+i+" "+curSheet.href+" "+curSheet.media.mediaText+" "+(curSheet.ownerNode&&FBL.getElementXPath(curSheet.ownerNode)))
}if(curSheet==styleSheet){break
}if(curSheet.href==href){ret++
}}return ret
};
var getElementType=this.getElementType=function(node){if(isElementXUL(node)){return"xul"
}else{if(isElementSVG(node)){return"svg"
}else{if(isElementMathML(node)){return"mathml"
}else{if(isElementXHTML(node)){return"xhtml"
}else{if(isElementHTML(node)){return"html"
}}}}}};
var getElementSimpleType=this.getElementSimpleType=function(node){if(isElementSVG(node)){return"svg"
}else{if(isElementMathML(node)){return"mathml"
}else{return"html"
}}};
var isElementHTML=this.isElementHTML=function(node){return node.nodeName==node.nodeName.toUpperCase()
};
var isElementXHTML=this.isElementXHTML=function(node){return node.nodeName==node.nodeName.toLowerCase()
};
var isElementMathML=this.isElementMathML=function(node){return node.namespaceURI=="http://www.w3.org/1998/Math/MathML"
};
var isElementSVG=this.isElementSVG=function(node){return node.namespaceURI=="http://www.w3.org/2000/svg"
};
var isElementXUL=this.isElementXUL=function(node){return node instanceof XULElement
};
this.isSelfClosing=function(element){if(isElementSVG(element)||isElementMathML(element)){return true
}var tag=element.localName.toLowerCase();
return(this.selfClosingTags.hasOwnProperty(tag))
};
this.getElementHTML=function(element){var self=this;
function toHTML(elt){if(elt.nodeType==Node.ELEMENT_NODE){if(unwrapObject(elt).firebugIgnore){return
}html.push("<",elt.nodeName.toLowerCase());
for(var i=0;
i<elt.attributes.length;
++i){var attr=elt.attributes[i];
if(attr.localName.indexOf("firebug-")==0){continue
}if(attr.localName.indexOf("-moz-math")==0){continue
}html.push(" ",attr.nodeName,'="',escapeForElementAttribute(attr.nodeValue),'"')
}if(elt.firstChild){html.push(">");
var pureText=true;
for(var child=element.firstChild;
child;
child=child.nextSibling){pureText=pureText&&(child.nodeType==Node.TEXT_NODE)
}if(pureText){html.push(escapeForHtmlEditor(elt.textContent))
}else{for(var child=elt.firstChild;
child;
child=child.nextSibling){toHTML(child)
}}html.push("</",elt.nodeName.toLowerCase(),">")
}else{if(isElementSVG(elt)||isElementMathML(elt)){html.push("/>")
}else{if(self.isSelfClosing(elt)){html.push((isElementXHTML(elt))?"/>":">")
}else{html.push("></",elt.nodeName.toLowerCase(),">")
}}}}else{if(elt.nodeType==Node.TEXT_NODE){html.push(escapeForTextNode(elt.textContent))
}else{if(elt.nodeType==Node.CDATA_SECTION_NODE){html.push("<![CDATA[",elt.nodeValue,"]]>")
}else{if(elt.nodeType==Node.COMMENT_NODE){html.push("<!--",elt.nodeValue,"-->")
}}}}}var html=[];
toHTML(element);
return html.join("")
};
this.getElementXML=function(element){function toXML(elt){if(elt.nodeType==Node.ELEMENT_NODE){if(unwrapObject(elt).firebugIgnore){return
}xml.push("<",elt.nodeName.toLowerCase());
for(var i=0;
i<elt.attributes.length;
++i){var attr=elt.attributes[i];
if(attr.localName.indexOf("firebug-")==0){continue
}if(attr.localName.indexOf("-moz-math")==0){continue
}xml.push(" ",attr.nodeName,'="',escapeForElementAttribute(attr.nodeValue),'"')
}if(elt.firstChild){xml.push(">");
for(var child=elt.firstChild;
child;
child=child.nextSibling){toXML(child)
}xml.push("</",elt.nodeName.toLowerCase(),">")
}else{xml.push("/>")
}}else{if(elt.nodeType==Node.TEXT_NODE){xml.push(elt.nodeValue)
}else{if(elt.nodeType==Node.CDATA_SECTION_NODE){xml.push("<![CDATA[",elt.nodeValue,"]]>")
}else{if(elt.nodeType==Node.COMMENT_NODE){xml.push("<!--",elt.nodeValue,"-->")
}}}}}var xml=[];
toXML(element);
return xml.join("")
};
this.hasClass=function(node,name){if(arguments.length==2){return(" "+node.className+" ").indexOf(" "+name+" ")!=-1
}if(!node||node.nodeType!=1){return false
}else{for(var i=1;
i<arguments.length;
++i){var name=arguments[i];
var re=new RegExp("(^|\\s)"+name+"($|\\s)");
if(!re.exec(node.className)){return false
}}return true
}};
this.old_hasClass=function(node,name){if(!node||node.nodeType!=1){return false
}else{for(var i=1;
i<arguments.length;
++i){var name=arguments[i];
var re=new RegExp("(^|\\s)"+name+"($|\\s)");
if(!re.exec(node.className)){return false
}}return true
}};
this.setClass=function(node,name){if(node&&(" "+node.className+" ").indexOf(" "+name+" ")==-1){node.className+=" "+name
}};
this.getClassValue=function(node,name){var re=new RegExp(name+"-([^ ]+)");
var m=re.exec(node.className);
return m?m[1]:""
};
this.removeClass=function(node,name){if(node&&node.className){var index=node.className.indexOf(name);
if(index>=0){var size=name.length;
node.className=node.className.substr(0,index-1)+node.className.substr(index+size)
}}};
this.toggleClass=function(elt,name){if((" "+elt.className+" ").indexOf(" "+name+" ")!=-1){this.removeClass(elt,name)
}else{this.setClass(elt,name)
}};
this.setClassTimed=function(elt,name,context,timeout){if(!timeout){timeout=1300
}if(elt.__setClassTimeout){context.clearTimeout(elt.__setClassTimeout)
}else{this.setClass(elt,name)
}elt.__setClassTimeout=context.setTimeout(function(){delete elt.__setClassTimeout;
FBL.removeClass(elt,name)
},timeout)
};
this.cancelClassTimed=function(elt,name,context){if(elt.__setClassTimeout){FBL.removeClass(elt,name);
context.clearTimeout(elt.__setClassTimeout);
delete elt.__setClassTimeout
}};
this.$=function(id,doc){if(doc){return doc.getElementById(id)
}else{return FBL.Firebug.chrome.document.getElementById(id)
}};
this.$$=function(selector,doc){if(doc||!FBL.Firebug.chrome){return FBL.Firebug.Selector(selector,doc)
}else{return FBL.Firebug.Selector(selector,FBL.Firebug.chrome.document)
}};
this.getChildByClass=function(node){for(var i=1;
i<arguments.length;
++i){var className=arguments[i];
var child=node.firstChild;
node=null;
for(;
child;
child=child.nextSibling){if(this.hasClass(child,className)){node=child;
break
}}}return node
};
this.getAncestorByClass=function(node,className){for(var parent=node;
parent;
parent=parent.parentNode){if(this.hasClass(parent,className)){return parent
}}return null
};
this.getElementsByClass=function(node,className){var result=[];
for(var child=node.firstChild;
child;
child=child.nextSibling){if(this.hasClass(child,className)){result.push(child)
}}return result
};
this.getElementByClass=function(node,className){var args=cloneArray(arguments);
args.splice(0,1);
for(var child=node.firstChild;
child;
child=child.nextSibling){var args1=cloneArray(args);
args1.unshift(child);
if(FBL.hasClass.apply(null,args1)){return child
}else{var found=FBL.getElementByClass.apply(null,args1);
if(found){return found
}}}return null
};
this.isAncestor=function(node,potentialAncestor){for(var parent=node;
parent;
parent=parent.parentNode){if(parent==potentialAncestor){return true
}}return false
};
this.getNextElement=function(node){while(node&&node.nodeType!=1){node=node.nextSibling
}return node
};
this.getPreviousElement=function(node){while(node&&node.nodeType!=1){node=node.previousSibling
}return node
};
this.getBody=function(doc){if(doc.body){return doc.body
}var body=doc.getElementsByTagName("body")[0];
if(body){return body
}return doc.firstChild
};
this.findNextDown=function(node,criteria){if(!node){return null
}for(var child=node.firstChild;
child;
child=child.nextSibling){if(criteria(child)){return child
}var next=this.findNextDown(child,criteria);
if(next){return next
}}};
this.findPreviousUp=function(node,criteria){if(!node){return null
}for(var child=node.lastChild;
child;
child=child.previousSibling){var next=this.findPreviousUp(child,criteria);
if(next){return next
}if(criteria(child)){return child
}}};
this.findNext=function(node,criteria,upOnly,maxRoot){if(!node){return null
}if(!upOnly){var next=this.findNextDown(node,criteria);
if(next){return next
}}for(var sib=node.nextSibling;
sib;
sib=sib.nextSibling){if(criteria(sib)){return sib
}var next=this.findNextDown(sib,criteria);
if(next){return next
}}if(node.parentNode&&node.parentNode!=maxRoot){return this.findNext(node.parentNode,criteria,true)
}};
this.findPrevious=function(node,criteria,downOnly,maxRoot){if(!node){return null
}for(var sib=node.previousSibling;
sib;
sib=sib.previousSibling){var prev=this.findPreviousUp(sib,criteria);
if(prev){return prev
}if(criteria(sib)){return sib
}}if(!downOnly){var next=this.findPreviousUp(node,criteria);
if(next){return next
}}if(node.parentNode&&node.parentNode!=maxRoot){if(criteria(node.parentNode)){return node.parentNode
}return this.findPrevious(node.parentNode,criteria,true)
}};
this.getNextByClass=function(root,state){var iter=function iter(node){return node.nodeType==1&&FBL.hasClass(node,state)
};
return this.findNext(root,iter)
};
this.getPreviousByClass=function(root,state){var iter=function iter(node){return node.nodeType==1&&FBL.hasClass(node,state)
};
return this.findPrevious(root,iter)
};
this.isElement=function(o){try{return o&&this.instanceOf(o,"Element")
}catch(ex){return false
}};
var appendFragment=null;
this.appendInnerHTML=function(element,html,referenceElement){referenceElement=referenceElement||null;
var doc=element.ownerDocument;
if(doc.createRange){var range=doc.createRange();
range.selectNodeContents(element);
var fragment=range.createContextualFragment(html);
var firstChild=fragment.firstChild;
element.insertBefore(fragment,referenceElement)
}else{if(!appendFragment||appendFragment.ownerDocument!=doc){appendFragment=doc.createDocumentFragment()
}var div=doc.createElement("div");
div.innerHTML=html;
var firstChild=div.firstChild;
while(div.firstChild){appendFragment.appendChild(div.firstChild)
}element.insertBefore(appendFragment,referenceElement);
div=null
}return firstChild
};
this.createElement=function(tagName,properties){properties=properties||{};
var doc=properties.document||FBL.Firebug.chrome.document;
var element=doc.createElement(tagName);
for(var name in properties){if(name!="document"){element[name]=properties[name]
}}return element
};
this.createGlobalElement=function(tagName,properties){properties=properties||{};
var doc=FBL.Env.browser.document;
var element=this.NS&&doc.createElementNS?doc.createElementNS(FBL.NS,tagName):doc.createElement(tagName);
for(var name in properties){var propname=name;
if(FBL.isIE&&name=="class"){propname="className"
}if(name!="document"){element.setAttribute(propname,properties[name])
}}return element
};
this.safeGetWindowLocation=function(window){try{if(window){if(window.closed){return"(window.closed)"
}if("location" in window){return window.location+""
}else{return"(no window.location)"
}}else{return"(no context.window)"
}}catch(exc){if(FBTrace.DBG_WINDOWS||FBTrace.DBG_ERRORS){FBTrace.sysout("TabContext.getWindowLocation failed "+exc,exc)
}FBTrace.sysout("TabContext.getWindowLocation failed window:",window);
return"(getWindowLocation: "+exc+")"
}};
this.isLeftClick=function(event){return(this.isIE&&event.type!="click"&&event.type!="dblclick"?event.button==1:event.button==0)&&this.noKeyModifiers(event)
};
this.isMiddleClick=function(event){return(this.isIE&&event.type!="click"&&event.type!="dblclick"?event.button==4:event.button==1)&&this.noKeyModifiers(event)
};
this.isRightClick=function(event){return(this.isIE&&event.type!="click"&&event.type!="dblclick"?event.button==2:event.button==2)&&this.noKeyModifiers(event)
};
this.noKeyModifiers=function(event){return !event.ctrlKey&&!event.shiftKey&&!event.altKey&&!event.metaKey
};
this.isControlClick=function(event){return(this.isIE&&event.type!="click"&&event.type!="dblclick"?event.button==1:event.button==0)&&this.isControl(event)
};
this.isShiftClick=function(event){return(this.isIE&&event.type!="click"&&event.type!="dblclick"?event.button==1:event.button==0)&&this.isShift(event)
};
this.isControl=function(event){return(event.metaKey||event.ctrlKey)&&!event.shiftKey&&!event.altKey
};
this.isAlt=function(event){return event.altKey&&!event.ctrlKey&&!event.shiftKey&&!event.metaKey
};
this.isAltClick=function(event){return(this.isIE&&event.type!="click"&&event.type!="dblclick"?event.button==1:event.button==0)&&this.isAlt(event)
};
this.isControlShift=function(event){return(event.metaKey||event.ctrlKey)&&event.shiftKey&&!event.altKey
};
this.isShift=function(event){return event.shiftKey&&!event.metaKey&&!event.ctrlKey&&!event.altKey
};
this.addEvent=function(object,name,handler,useCapture){if(object.addEventListener){object.addEventListener(name,handler,useCapture)
}else{object.attachEvent("on"+name,handler)
}};
this.removeEvent=function(object,name,handler,useCapture){try{if(object.removeEventListener){object.removeEventListener(name,handler,useCapture)
}else{object.detachEvent("on"+name,handler)
}}catch(e){if(FBTrace.DBG_ERRORS){FBTrace.sysout("FBL.removeEvent error: ",object,name)
}}};
this.cancelEvent=function(e,preventDefault){if(!e){return
}if(preventDefault){if(e.preventDefault){e.preventDefault()
}else{e.returnValue=false
}}if(e.stopPropagation){e.stopPropagation()
}else{e.cancelBubble=true
}};
this.addGlobalEvent=function(name,handler){var doc=this.Firebug.browser.document;
var frames=this.Firebug.browser.window.frames;
this.addEvent(doc,name,handler);
if(this.Firebug.chrome.type=="popup"){this.addEvent(this.Firebug.chrome.document,name,handler)
}for(var i=0,frame;
frame=frames[i];
i++){try{this.addEvent(frame.document,name,handler)
}catch(E){}}};
this.removeGlobalEvent=function(name,handler){var doc=this.Firebug.browser.document;
var frames=this.Firebug.browser.window.frames;
this.removeEvent(doc,name,handler);
if(this.Firebug.chrome.type=="popup"){this.removeEvent(this.Firebug.chrome.document,name,handler)
}for(var i=0,frame;
frame=frames[i];
i++){try{this.removeEvent(frame.document,name,handler)
}catch(E){}}};
this.dispatch=function(listeners,name,args){if(!listeners){return
}try{if(typeof listeners.length!="undefined"){if(FBTrace.DBG_DISPATCH){FBTrace.sysout("FBL.dispatch",name+" to "+listeners.length+" listeners")
}for(var i=0;
i<listeners.length;
++i){var listener=listeners[i];
if(listener[name]){listener[name].apply(listener,args)
}}}else{if(FBTrace.DBG_DISPATCH){FBTrace.sysout("FBL.dispatch",name+" to listeners of an object")
}for(var prop in listeners){var listener=listeners[prop];
if(listener[name]){listener[name].apply(listener,args)
}}}}catch(exc){if(FBTrace.DBG_ERRORS){FBTrace.sysout(" Exception in lib.dispatch "+name,exc)
}}};
var disableTextSelectionHandler=function(event){FBL.cancelEvent(event,true);
return false
};
this.disableTextSelection=function(e){if(typeof e.onselectstart!="undefined"){this.addEvent(e,"selectstart",disableTextSelectionHandler)
}else{e.style.cssText="user-select: none; -khtml-user-select: none; -moz-user-select: none;";
if(!this.isFirefox){this.addEvent(e,"mousedown",disableTextSelectionHandler)
}}e.style.cursor="default"
};
this.restoreTextSelection=function(e){if(typeof e.onselectstart!="undefined"){this.removeEvent(e,"selectstart",disableTextSelectionHandler)
}else{e.style.cssText="cursor: default;";
if(!this.isFirefox){this.removeEvent(e,"mousedown",disableTextSelectionHandler)
}}};
var eventTypes={composition:["composition","compositionstart","compositionend"],contextmenu:["contextmenu"],drag:["dragenter","dragover","dragexit","dragdrop","draggesture"],focus:["focus","blur"],form:["submit","reset","change","select","input"],key:["keydown","keyup","keypress"],load:["load","beforeunload","unload","abort","error"],mouse:["mousedown","mouseup","click","dblclick","mouseover","mouseout","mousemove"],mutation:["DOMSubtreeModified","DOMNodeInserted","DOMNodeRemoved","DOMNodeRemovedFromDocument","DOMNodeInsertedIntoDocument","DOMAttrModified","DOMCharacterDataModified"],paint:["paint","resize","scroll"],scroll:["overflow","underflow","overflowchanged"],text:["text"],ui:["DOMActivate","DOMFocusIn","DOMFocusOut"],xul:["popupshowing","popupshown","popuphiding","popuphidden","close","command","broadcast","commandupdate"]};
this.getEventFamily=function(eventType){if(!this.families){this.families={};
for(var family in eventTypes){var types=eventTypes[family];
for(var i=0;
i<types.length;
++i){this.families[types[i]]=family
}}}return this.families[eventType]
};
this.getFileName=function(url){var split=this.splitURLBase(url);
return split.name
};
this.splitURLBase=function(url){if(this.isDataURL(url)){return this.splitDataURL(url)
}return this.splitURLTrue(url)
};
this.splitDataURL=function(url){var mark=url.indexOf(":",3);
if(mark!=4){return false
}var point=url.indexOf(",",mark+1);
if(point<mark){return false
}var props={encodedContent:url.substr(point+1)};
var metadataBuffer=url.substr(mark+1,point);
var metadata=metadataBuffer.split(";");
for(var i=0;
i<metadata.length;
i++){var nv=metadata[i].split("=");
if(nv.length==2){props[nv[0]]=nv[1]
}}if(props.hasOwnProperty("fileName")){var caller_URL=decodeURIComponent(props.fileName);
var caller_split=this.splitURLTrue(caller_URL);
if(props.hasOwnProperty("baseLineNumber")){props.path=caller_split.path;
props.line=props.baseLineNumber;
var hint=decodeURIComponent(props.encodedContent.substr(0,200)).replace(/\s*$/,"");
props.name="eval->"+hint
}else{props.name=caller_split.name;
props.path=caller_split.path
}}else{if(!props.hasOwnProperty("path")){props.path="data:"
}if(!props.hasOwnProperty("name")){props.name=decodeURIComponent(props.encodedContent.substr(0,200)).replace(/\s*$/,"")
}}return props
};
this.splitURLTrue=function(url){var m=reSplitFile.exec(url);
if(!m){return{name:url,path:url}
}else{if(!m[2]){return{path:m[1],name:m[1]}
}else{return{path:m[1],name:m[2]+m[3]}
}}};
this.getFileExtension=function(url){if(!url){return null
}var queryString=url.indexOf("?");
if(queryString!=-1){url=url.substr(0,queryString)
}var lastDot=url.lastIndexOf(".");
return url.substr(lastDot+1)
};
this.isSystemURL=function(url){if(!url){return true
}if(url.length==0){return true
}if(url[0]=="h"){return false
}if(url.substr(0,9)=="resource:"){return true
}else{if(url.substr(0,16)=="chrome://firebug"){return true
}else{if(url=="XPCSafeJSObjectWrapper.cpp"){return true
}else{if(url.substr(0,6)=="about:"){return true
}else{if(url.indexOf("firebug-service.js")!=-1){return true
}else{return false
}}}}}};
this.isSystemPage=function(win){try{var doc=win.document;
if(!doc){return false
}if((doc.styleSheets.length&&doc.styleSheets[0].href=="chrome://global/content/xml/XMLPrettyPrint.css")||(doc.styleSheets.length>1&&doc.styleSheets[1].href=="chrome://browser/skin/feeds/subscribe.css")){return true
}return FBL.isSystemURL(win.location.href)
}catch(exc){ERROR("tabWatcher.isSystemPage document not ready:"+exc);
return false
}};
this.isSystemStyleSheet=function(sheet){var href=sheet&&sheet.href;
return href&&FBL.isSystemURL(href)
};
this.getURIHost=function(uri){try{if(uri){return uri.host
}else{return""
}}catch(exc){return""
}};
this.isLocalURL=function(url){if(url.substr(0,5)=="file:"){return true
}else{if(url.substr(0,8)=="wyciwyg:"){return true
}else{return false
}}};
this.isDataURL=function(url){return(url&&url.substr(0,5)=="data:")
};
this.getLocalPath=function(url){if(this.isLocalURL(url)){var fileHandler=ioService.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler);
var file=fileHandler.getFileFromURLSpec(url);
return file.path
}};
this.getURLFromLocalFile=function(file){var fileHandler=ioService.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler);
var URL=fileHandler.getURLSpecFromFile(file);
return URL
};
this.getDataURLForContent=function(content,url){var uri="data:text/html;";
uri+="fileName="+encodeURIComponent(url)+",";
uri+=encodeURIComponent(content);
return uri
},this.getDomain=function(url){var m=/[^:]+:\/{1,3}([^\/]+)/.exec(url);
return m?m[1]:""
};
this.getURLPath=function(url){var m=/[^:]+:\/{1,3}[^\/]+(\/.*?)$/.exec(url);
return m?m[1]:""
};
this.getPrettyDomain=function(url){var m=/[^:]+:\/{1,3}(www\.)?([^\/]+)/.exec(url);
return m?m[2]:""
};
this.absoluteURL=function(url,baseURL){return this.absoluteURLWithDots(url,baseURL).replace("/./","/","g")
};
this.absoluteURLWithDots=function(url,baseURL){if(url[0]=="?"){return baseURL+url
}var reURL=/(([^:]+:)\/{1,2}[^\/]*)(.*?)$/;
var m=reURL.exec(url);
if(m){return url
}var m=reURL.exec(baseURL);
if(!m){return""
}var head=m[1];
var tail=m[3];
if(url.substr(0,2)=="//"){return m[2]+url
}else{if(url[0]=="/"){return head+url
}else{if(tail[tail.length-1]=="/"){return baseURL+url
}else{var parts=tail.split("/");
return head+parts.slice(0,parts.length-1).join("/")+"/"+url
}}}};
this.normalizeURL=function(url){if(!url){return""
}if(url.length<255){url=url.replace(/[^\/]+\/\.\.\//,"","g");
url=url.replace(/#.*/,"");
url=url.replace(/file:\/([^\/])/g,"file:///$1");
if(url.indexOf("chrome:")==0){var m=reChromeCase.exec(url);
if(m){url="chrome://"+m[1].toLowerCase()+"/"+m[2]
}}}return url
};
this.denormalizeURL=function(url){return url.replace(/file:\/\/\//g,"file:/")
};
this.parseURLParams=function(url){var q=url?url.indexOf("?"):-1;
if(q==-1){return[]
}var search=url.substr(q+1);
var h=search.lastIndexOf("#");
if(h!=-1){search=search.substr(0,h)
}if(!search){return[]
}return this.parseURLEncodedText(search)
};
this.parseURLEncodedText=function(text){var maxValueLength=25000;
var params=[];
text=text.replace(/\+/g," ");
var args=text.split("&");
for(var i=0;
i<args.length;
++i){try{var parts=args[i].split("=");
if(parts.length==2){if(parts[1].length>maxValueLength){parts[1]=this.$STR("LargeData")
}params.push({name:decodeURIComponent(parts[0]),value:decodeURIComponent(parts[1])})
}else{params.push({name:decodeURIComponent(parts[0]),value:""})
}}catch(e){if(FBTrace.DBG_ERRORS){FBTrace.sysout("parseURLEncodedText EXCEPTION ",e);
FBTrace.sysout("parseURLEncodedText EXCEPTION URI",args[i])
}}}params.sort(function(a,b){return a.name<=b.name?-1:1
});
return params
};
this.parseURLParamsArray=function(url){var q=url?url.indexOf("?"):-1;
if(q==-1){return[]
}var search=url.substr(q+1);
var h=search.lastIndexOf("#");
if(h!=-1){search=search.substr(0,h)
}if(!search){return[]
}return this.parseURLEncodedTextArray(search)
};
this.parseURLEncodedTextArray=function(text){var maxValueLength=25000;
var params=[];
text=text.replace(/\+/g," ");
var args=text.split("&");
for(var i=0;
i<args.length;
++i){try{var parts=args[i].split("=");
if(parts.length==2){if(parts[1].length>maxValueLength){parts[1]=this.$STR("LargeData")
}params.push({name:decodeURIComponent(parts[0]),value:[decodeURIComponent(parts[1])]})
}else{params.push({name:decodeURIComponent(parts[0]),value:[""]})
}}catch(e){if(FBTrace.DBG_ERRORS){FBTrace.sysout("parseURLEncodedText EXCEPTION ",e);
FBTrace.sysout("parseURLEncodedText EXCEPTION URI",args[i])
}}}params.sort(function(a,b){return a.name<=b.name?-1:1
});
return params
};
this.reEncodeURL=function(file,text){var lines=text.split("\n");
var params=this.parseURLEncodedText(lines[lines.length-1]);
var args=[];
for(var i=0;
i<params.length;
++i){args.push(encodeURIComponent(params[i].name)+"="+encodeURIComponent(params[i].value))
}var url=file.href;
url+=(url.indexOf("?")==-1?"?":"&")+args.join("&");
return url
};
this.getResource=function(aURL){try{var channel=ioService.newChannel(aURL,null,null);
var input=channel.open();
return FBL.readFromStream(input)
}catch(e){if(FBTrace.DBG_ERRORS){FBTrace.sysout("lib.getResource FAILS for "+aURL,e)
}}};
this.parseJSONString=function(jsonString,originURL){var regex=new RegExp(/^\/\*-secure-([\s\S]*)\*\/\s*$/);
var matches=regex.exec(jsonString);
if(matches){jsonString=matches[1];
if(jsonString[0]=="\\"&&jsonString[1]=="n"){jsonString=jsonString.substr(2)
}if(jsonString[jsonString.length-2]=="\\"&&jsonString[jsonString.length-1]=="n"){jsonString=jsonString.substr(0,jsonString.length-2)
}}if(jsonString.indexOf("&&&START&&&")){regex=new RegExp(/&&&START&&& (.+) &&&END&&&/);
matches=regex.exec(jsonString);
if(matches){jsonString=matches[1]
}}jsonString="("+jsonString+")";
var jsonObject=null;
try{jsonObject=Firebug.context.evaluate(jsonString,null,null,function(){return null
})
}catch(e){if(FBTrace.DBG_ERRORS||FBTrace.DBG_JSONVIEWER){FBTrace.sysout("jsonviewer.parseJSON EXCEPTION",e)
}return null
}return jsonObject
};
this.objectToString=function(object){try{return object+""
}catch(exc){return null
}};
this.setSelectionRange=function(input,start,length){if(input.createTextRange){var range=input.createTextRange();
range.moveStart("character",start);
range.moveEnd("character",length-input.value.length);
range.select()
}else{if(input.setSelectionRange){input.setSelectionRange(start,length);
input.focus()
}}};
this.getInputSelectionStart=function(input){if(document.selection){var range=input.ownerDocument.selection.createRange();
var text=range.text;
if(text){return input.value.indexOf(text)
}else{range.moveStart("character",-input.value.length);
return range.text.length
}}else{if(typeof input.selectionStart!="undefined"){return input.selectionStart
}}return 0
};
function onOperaTabBlur(e){if(this.lastKey==9){this.focus()
}}function onOperaTabKeyDown(e){this.lastKey=e.keyCode
}function onOperaTabFocus(e){this.lastKey=null
}this.fixOperaTabKey=function(el){el.onfocus=onOperaTabFocus;
el.onblur=onOperaTabBlur;
el.onkeydown=onOperaTabKeyDown
};
this.Property=function(object,name){this.object=object;
this.name=name;
this.getObject=function(){return object[name]
}
};
this.ErrorCopy=function(message){this.message=message
};
function EventCopy(event){for(var name in event){try{this[name]=event[name]
}catch(exc){}}}this.EventCopy=EventCopy;
var toString=Object.prototype.toString;
var reFunction=/^\s*function(\s+[\w_$][\w\d_$]*)?\s*\(/;
this.isArray=function(object){return toString.call(object)==="[object Array]"
};
this.isFunction=function(object){if(!object){return false
}try{return toString.call(object)==="[object Function]"||this.isIE&&typeof object!="string"&&reFunction.test(""+object)
}catch(E){FBTrace.sysout("Lib.isFunction() failed for ",object);
return false
}};
this.instanceOf=function(object,className){if(!object||typeof object!="object"){return false
}if(object.ownerDocument){var win=object.ownerDocument.defaultView||object.ownerDocument.parentWindow;
if(className in win&&object instanceof win[className]){return true
}}else{var win=Firebug.browser.window;
if(className in win){return object instanceof win[className]
}}var cache=instanceCheckMap[className];
if(!cache){return false
}for(var n in cache){var obj=cache[n];
var type=typeof obj;
obj=type=="object"?obj:[obj];
for(var name in obj){if(!obj.hasOwnProperty(name)){continue
}var value=obj[name];
if(n=="property"&&!(value in object)||n=="method"&&!this.isFunction(object[value])||n=="value"&&(""+object[name]).toLowerCase()!=(""+value).toLowerCase()){return false
}}}return true
};
var instanceCheckMap={Window:{property:["window","document"],method:"setTimeout"},Document:{property:["body","cookie"],method:"getElementById"},Node:{property:"ownerDocument",method:"appendChild"},Element:{property:"tagName",value:{nodeType:1}},Location:{property:["hostname","protocol"],method:"assign"},HTMLImageElement:{property:"useMap",value:{nodeType:1,tagName:"img"}},HTMLAnchorElement:{property:"hreflang",value:{nodeType:1,tagName:"a"}},HTMLInputElement:{property:"form",value:{nodeType:1,tagName:"input"}},HTMLButtonElement:{},HTMLFormElement:{method:"submit",value:{nodeType:1,tagName:"form"}},HTMLBodyElement:{},HTMLHtmlElement:{},CSSStyleRule:{property:["selectorText","style"]}};
var domMemberMap2={};
var domMemberMap2Sandbox=null;
var getDomMemberMap2=function(name){if(!domMemberMap2Sandbox){var doc=Firebug.chrome.document;
var frame=doc.createElement("iframe");
frame.id="FirebugSandbox";
frame.style.display="none";
frame.src="about:blank";
doc.body.appendChild(frame);
domMemberMap2Sandbox=frame.window||frame.contentWindow
}var props=[];
var object=null;
if(name=="Window"){object=domMemberMap2Sandbox.window
}else{if(name=="Document"){object=domMemberMap2Sandbox.document
}else{if(name=="HTMLScriptElement"){object=domMemberMap2Sandbox.document.createElement("script")
}else{if(name=="HTMLAnchorElement"){object=domMemberMap2Sandbox.document.createElement("a")
}else{if(name.indexOf("Element")!=-1){object=domMemberMap2Sandbox.document.createElement("div")
}}}}}if(object){for(var n in object){props.push(n)
}}return props;
return extendArray(props,domMemberMap[name])
};
this.getDOMMembers=function(object){if(!domMemberCache){FBL.domMemberCache=domMemberCache={};
for(var name in domMemberMap){var builtins=getDomMemberMap2(name);
var cache=domMemberCache[name]={};
for(var i=0;
i<builtins.length;
++i){cache[builtins[i]]=i
}}}try{if(this.instanceOf(object,"Window")){return domMemberCache.Window
}else{if(this.instanceOf(object,"Document")||this.instanceOf(object,"XMLDocument")){return domMemberCache.Document
}else{if(this.instanceOf(object,"Location")){return domMemberCache.Location
}else{if(this.instanceOf(object,"HTMLImageElement")){return domMemberCache.HTMLImageElement
}else{if(this.instanceOf(object,"HTMLAnchorElement")){return domMemberCache.HTMLAnchorElement
}else{if(this.instanceOf(object,"HTMLInputElement")){return domMemberCache.HTMLInputElement
}else{if(this.instanceOf(object,"HTMLButtonElement")){return domMemberCache.HTMLButtonElement
}else{if(this.instanceOf(object,"HTMLFormElement")){return domMemberCache.HTMLFormElement
}else{if(this.instanceOf(object,"HTMLBodyElement")){return domMemberCache.HTMLBodyElement
}else{if(this.instanceOf(object,"HTMLHtmlElement")){return domMemberCache.HTMLHtmlElement
}else{if(this.instanceOf(object,"HTMLScriptElement")){return domMemberCache.HTMLScriptElement
}else{if(this.instanceOf(object,"HTMLTableElement")){return domMemberCache.HTMLTableElement
}else{if(this.instanceOf(object,"HTMLTableRowElement")){return domMemberCache.HTMLTableRowElement
}else{if(this.instanceOf(object,"HTMLTableCellElement")){return domMemberCache.HTMLTableCellElement
}else{if(this.instanceOf(object,"HTMLIFrameElement")){return domMemberCache.HTMLIFrameElement
}else{if(this.instanceOf(object,"SVGSVGElement")){return domMemberCache.SVGSVGElement
}else{if(this.instanceOf(object,"SVGElement")){return domMemberCache.SVGElement
}else{if(this.instanceOf(object,"Element")){return domMemberCache.Element
}else{if(this.instanceOf(object,"Text")||this.instanceOf(object,"CDATASection")){return domMemberCache.Text
}else{if(this.instanceOf(object,"Attr")){return domMemberCache.Attr
}else{if(this.instanceOf(object,"Node")){return domMemberCache.Node
}else{if(this.instanceOf(object,"Event")||this.instanceOf(object,"EventCopy")){return domMemberCache.Event
}else{return{}
}}}}}}}}}}}}}}}}}}}}}}}catch(E){if(FBTrace.DBG_ERRORS){FBTrace.sysout("lib.getDOMMembers FAILED ",E)
}return{}
}};
this.isDOMMember=function(object,propName){var members=this.getDOMMembers(object);
return members&&propName in members
};
var domMemberCache=null;
var domMemberMap={};
domMemberMap.Window=["document","frameElement","innerWidth","innerHeight","outerWidth","outerHeight","screenX","screenY","pageXOffset","pageYOffset","scrollX","scrollY","scrollMaxX","scrollMaxY","status","defaultStatus","parent","opener","top","window","content","self","location","history","frames","navigator","screen","menubar","toolbar","locationbar","personalbar","statusbar","directories","scrollbars","fullScreen","netscape","java","console","Components","controllers","closed","crypto","pkcs11","name","property","length","sessionStorage","globalStorage","setTimeout","setInterval","clearTimeout","clearInterval","addEventListener","removeEventListener","dispatchEvent","getComputedStyle","captureEvents","releaseEvents","routeEvent","enableExternalCapture","disableExternalCapture","moveTo","moveBy","resizeTo","resizeBy","scroll","scrollTo","scrollBy","scrollByLines","scrollByPages","sizeToContent","setResizable","getSelection","open","openDialog","close","alert","confirm","prompt","dump","focus","blur","find","back","forward","home","stop","print","atob","btoa","updateCommands","XPCNativeWrapper","GeckoActiveXObject","applicationCache"];
domMemberMap.Location=["href","protocol","host","hostname","port","pathname","search","hash","assign","reload","replace"];
domMemberMap.Node=["id","className","nodeType","tagName","nodeName","localName","prefix","namespaceURI","nodeValue","ownerDocument","parentNode","offsetParent","nextSibling","previousSibling","firstChild","lastChild","childNodes","attributes","dir","baseURI","textContent","innerHTML","addEventListener","removeEventListener","dispatchEvent","cloneNode","appendChild","insertBefore","replaceChild","removeChild","compareDocumentPosition","hasAttributes","hasChildNodes","lookupNamespaceURI","lookupPrefix","normalize","isDefaultNamespace","isEqualNode","isSameNode","isSupported","getFeature","getUserData","setUserData"];
domMemberMap.Document=extendArray(domMemberMap.Node,["documentElement","body","title","location","referrer","cookie","contentType","lastModified","characterSet","inputEncoding","xmlEncoding","xmlStandalone","xmlVersion","strictErrorChecking","documentURI","URL","defaultView","doctype","implementation","styleSheets","images","links","forms","anchors","embeds","plugins","applets","width","height","designMode","compatMode","async","preferredStylesheetSet","alinkColor","linkColor","vlinkColor","bgColor","fgColor","domain","addEventListener","removeEventListener","dispatchEvent","captureEvents","releaseEvents","routeEvent","clear","open","close","execCommand","execCommandShowHelp","getElementsByName","getSelection","queryCommandEnabled","queryCommandIndeterm","queryCommandState","queryCommandSupported","queryCommandText","queryCommandValue","write","writeln","adoptNode","appendChild","removeChild","renameNode","cloneNode","compareDocumentPosition","createAttribute","createAttributeNS","createCDATASection","createComment","createDocumentFragment","createElement","createElementNS","createEntityReference","createEvent","createExpression","createNSResolver","createNodeIterator","createProcessingInstruction","createRange","createTextNode","createTreeWalker","domConfig","evaluate","evaluateFIXptr","evaluateXPointer","getAnonymousElementByAttribute","getAnonymousNodes","addBinding","removeBinding","getBindingParent","getBoxObjectFor","setBoxObjectFor","getElementById","getElementsByTagName","getElementsByTagNameNS","hasAttributes","hasChildNodes","importNode","insertBefore","isDefaultNamespace","isEqualNode","isSameNode","isSupported","load","loadBindingDocument","lookupNamespaceURI","lookupPrefix","normalize","normalizeDocument","getFeature","getUserData","setUserData"]);
domMemberMap.Element=extendArray(domMemberMap.Node,["clientWidth","clientHeight","offsetLeft","offsetTop","offsetWidth","offsetHeight","scrollLeft","scrollTop","scrollWidth","scrollHeight","style","tabIndex","title","lang","align","spellcheck","addEventListener","removeEventListener","dispatchEvent","focus","blur","cloneNode","appendChild","insertBefore","replaceChild","removeChild","compareDocumentPosition","getElementsByTagName","getElementsByTagNameNS","getAttribute","getAttributeNS","getAttributeNode","getAttributeNodeNS","setAttribute","setAttributeNS","setAttributeNode","setAttributeNodeNS","removeAttribute","removeAttributeNS","removeAttributeNode","hasAttribute","hasAttributeNS","hasAttributes","hasChildNodes","lookupNamespaceURI","lookupPrefix","normalize","isDefaultNamespace","isEqualNode","isSameNode","isSupported","getFeature","getUserData","setUserData"]);
domMemberMap.SVGElement=extendArray(domMemberMap.Element,["x","y","width","height","rx","ry","transform","href","ownerSVGElement","viewportElement","farthestViewportElement","nearestViewportElement","getBBox","getCTM","getScreenCTM","getTransformToElement","getPresentationAttribute","preserveAspectRatio"]);
domMemberMap.SVGSVGElement=extendArray(domMemberMap.Element,["x","y","width","height","rx","ry","transform","viewBox","viewport","currentView","useCurrentView","pixelUnitToMillimeterX","pixelUnitToMillimeterY","screenPixelToMillimeterX","screenPixelToMillimeterY","currentScale","currentTranslate","zoomAndPan","ownerSVGElement","viewportElement","farthestViewportElement","nearestViewportElement","contentScriptType","contentStyleType","getBBox","getCTM","getScreenCTM","getTransformToElement","getEnclosureList","getIntersectionList","getViewboxToViewportTransform","getPresentationAttribute","getElementById","checkEnclosure","checkIntersection","createSVGAngle","createSVGLength","createSVGMatrix","createSVGNumber","createSVGPoint","createSVGRect","createSVGString","createSVGTransform","createSVGTransformFromMatrix","deSelectAll","preserveAspectRatio","forceRedraw","suspendRedraw","unsuspendRedraw","unsuspendRedrawAll","getCurrentTime","setCurrentTime","animationsPaused","pauseAnimations","unpauseAnimations"]);
domMemberMap.HTMLImageElement=extendArray(domMemberMap.Element,["src","naturalWidth","naturalHeight","width","height","x","y","name","alt","longDesc","lowsrc","border","complete","hspace","vspace","isMap","useMap"]);
domMemberMap.HTMLAnchorElement=extendArray(domMemberMap.Element,["name","target","accessKey","href","protocol","host","hostname","port","pathname","search","hash","hreflang","coords","shape","text","type","rel","rev","charset"]);
domMemberMap.HTMLIFrameElement=extendArray(domMemberMap.Element,["contentDocument","contentWindow","frameBorder","height","longDesc","marginHeight","marginWidth","name","scrolling","src","width"]);
domMemberMap.HTMLTableElement=extendArray(domMemberMap.Element,["bgColor","border","caption","cellPadding","cellSpacing","frame","rows","rules","summary","tBodies","tFoot","tHead","width","createCaption","createTFoot","createTHead","deleteCaption","deleteRow","deleteTFoot","deleteTHead","insertRow"]);
domMemberMap.HTMLTableRowElement=extendArray(domMemberMap.Element,["bgColor","cells","ch","chOff","rowIndex","sectionRowIndex","vAlign","deleteCell","insertCell"]);
domMemberMap.HTMLTableCellElement=extendArray(domMemberMap.Element,["abbr","axis","bgColor","cellIndex","ch","chOff","colSpan","headers","height","noWrap","rowSpan","scope","vAlign","width"]);
domMemberMap.HTMLScriptElement=extendArray(domMemberMap.Element,["src"]);
domMemberMap.HTMLButtonElement=extendArray(domMemberMap.Element,["accessKey","disabled","form","name","type","value","click"]);
domMemberMap.HTMLInputElement=extendArray(domMemberMap.Element,["type","value","checked","accept","accessKey","alt","controllers","defaultChecked","defaultValue","disabled","form","maxLength","name","readOnly","selectionEnd","selectionStart","size","src","textLength","useMap","click","select","setSelectionRange"]);
domMemberMap.HTMLFormElement=extendArray(domMemberMap.Element,["acceptCharset","action","author","elements","encoding","enctype","entry_id","length","method","name","post","target","text","url","reset","submit"]);
domMemberMap.HTMLBodyElement=extendArray(domMemberMap.Element,["aLink","background","bgColor","link","text","vLink"]);
domMemberMap.HTMLHtmlElement=extendArray(domMemberMap.Element,["version"]);
domMemberMap.Text=extendArray(domMemberMap.Node,["data","length","appendData","deleteData","insertData","replaceData","splitText","substringData"]);
domMemberMap.Attr=extendArray(domMemberMap.Node,["name","value","specified","ownerElement"]);
domMemberMap.Event=["type","target","currentTarget","originalTarget","explicitOriginalTarget","relatedTarget","rangeParent","rangeOffset","view","keyCode","charCode","screenX","screenY","clientX","clientY","layerX","layerY","pageX","pageY","detail","button","which","ctrlKey","shiftKey","altKey","metaKey","eventPhase","timeStamp","bubbles","cancelable","cancelBubble","isTrusted","isChar","getPreventDefault","initEvent","initMouseEvent","initKeyEvent","initUIEvent","preventBubble","preventCapture","preventDefault","stopPropagation"];
this.domConstantMap={ELEMENT_NODE:1,ATTRIBUTE_NODE:1,TEXT_NODE:1,CDATA_SECTION_NODE:1,ENTITY_REFERENCE_NODE:1,ENTITY_NODE:1,PROCESSING_INSTRUCTION_NODE:1,COMMENT_NODE:1,DOCUMENT_NODE:1,DOCUMENT_TYPE_NODE:1,DOCUMENT_FRAGMENT_NODE:1,NOTATION_NODE:1,DOCUMENT_POSITION_DISCONNECTED:1,DOCUMENT_POSITION_PRECEDING:1,DOCUMENT_POSITION_FOLLOWING:1,DOCUMENT_POSITION_CONTAINS:1,DOCUMENT_POSITION_CONTAINED_BY:1,DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:1,UNKNOWN_RULE:1,STYLE_RULE:1,CHARSET_RULE:1,IMPORT_RULE:1,MEDIA_RULE:1,FONT_FACE_RULE:1,PAGE_RULE:1,CAPTURING_PHASE:1,AT_TARGET:1,BUBBLING_PHASE:1,SCROLL_PAGE_UP:1,SCROLL_PAGE_DOWN:1,MOUSEUP:1,MOUSEDOWN:1,MOUSEOVER:1,MOUSEOUT:1,MOUSEMOVE:1,MOUSEDRAG:1,CLICK:1,DBLCLICK:1,KEYDOWN:1,KEYUP:1,KEYPRESS:1,DRAGDROP:1,FOCUS:1,BLUR:1,SELECT:1,CHANGE:1,RESET:1,SUBMIT:1,SCROLL:1,LOAD:1,UNLOAD:1,XFER_DONE:1,ABORT:1,ERROR:1,LOCATE:1,MOVE:1,RESIZE:1,FORWARD:1,HELP:1,BACK:1,TEXT:1,ALT_MASK:1,CONTROL_MASK:1,SHIFT_MASK:1,META_MASK:1,DOM_VK_TAB:1,DOM_VK_PAGE_UP:1,DOM_VK_PAGE_DOWN:1,DOM_VK_UP:1,DOM_VK_DOWN:1,DOM_VK_LEFT:1,DOM_VK_RIGHT:1,DOM_VK_CANCEL:1,DOM_VK_HELP:1,DOM_VK_BACK_SPACE:1,DOM_VK_CLEAR:1,DOM_VK_RETURN:1,DOM_VK_ENTER:1,DOM_VK_SHIFT:1,DOM_VK_CONTROL:1,DOM_VK_ALT:1,DOM_VK_PAUSE:1,DOM_VK_CAPS_LOCK:1,DOM_VK_ESCAPE:1,DOM_VK_SPACE:1,DOM_VK_END:1,DOM_VK_HOME:1,DOM_VK_PRINTSCREEN:1,DOM_VK_INSERT:1,DOM_VK_DELETE:1,DOM_VK_0:1,DOM_VK_1:1,DOM_VK_2:1,DOM_VK_3:1,DOM_VK_4:1,DOM_VK_5:1,DOM_VK_6:1,DOM_VK_7:1,DOM_VK_8:1,DOM_VK_9:1,DOM_VK_SEMICOLON:1,DOM_VK_EQUALS:1,DOM_VK_A:1,DOM_VK_B:1,DOM_VK_C:1,DOM_VK_D:1,DOM_VK_E:1,DOM_VK_F:1,DOM_VK_G:1,DOM_VK_H:1,DOM_VK_I:1,DOM_VK_J:1,DOM_VK_K:1,DOM_VK_L:1,DOM_VK_M:1,DOM_VK_N:1,DOM_VK_O:1,DOM_VK_P:1,DOM_VK_Q:1,DOM_VK_R:1,DOM_VK_S:1,DOM_VK_T:1,DOM_VK_U:1,DOM_VK_V:1,DOM_VK_W:1,DOM_VK_X:1,DOM_VK_Y:1,DOM_VK_Z:1,DOM_VK_CONTEXT_MENU:1,DOM_VK_NUMPAD0:1,DOM_VK_NUMPAD1:1,DOM_VK_NUMPAD2:1,DOM_VK_NUMPAD3:1,DOM_VK_NUMPAD4:1,DOM_VK_NUMPAD5:1,DOM_VK_NUMPAD6:1,DOM_VK_NUMPAD7:1,DOM_VK_NUMPAD8:1,DOM_VK_NUMPAD9:1,DOM_VK_MULTIPLY:1,DOM_VK_ADD:1,DOM_VK_SEPARATOR:1,DOM_VK_SUBTRACT:1,DOM_VK_DECIMAL:1,DOM_VK_DIVIDE:1,DOM_VK_F1:1,DOM_VK_F2:1,DOM_VK_F3:1,DOM_VK_F4:1,DOM_VK_F5:1,DOM_VK_F6:1,DOM_VK_F7:1,DOM_VK_F8:1,DOM_VK_F9:1,DOM_VK_F10:1,DOM_VK_F11:1,DOM_VK_F12:1,DOM_VK_F13:1,DOM_VK_F14:1,DOM_VK_F15:1,DOM_VK_F16:1,DOM_VK_F17:1,DOM_VK_F18:1,DOM_VK_F19:1,DOM_VK_F20:1,DOM_VK_F21:1,DOM_VK_F22:1,DOM_VK_F23:1,DOM_VK_F24:1,DOM_VK_NUM_LOCK:1,DOM_VK_SCROLL_LOCK:1,DOM_VK_COMMA:1,DOM_VK_PERIOD:1,DOM_VK_SLASH:1,DOM_VK_BACK_QUOTE:1,DOM_VK_OPEN_BRACKET:1,DOM_VK_BACK_SLASH:1,DOM_VK_CLOSE_BRACKET:1,DOM_VK_QUOTE:1,DOM_VK_META:1,SVG_ZOOMANDPAN_DISABLE:1,SVG_ZOOMANDPAN_MAGNIFY:1,SVG_ZOOMANDPAN_UNKNOWN:1};
this.cssInfo={background:["bgRepeat","bgAttachment","bgPosition","color","systemColor","none"],"background-attachment":["bgAttachment"],"background-color":["color","systemColor"],"background-image":["none"],"background-position":["bgPosition"],"background-repeat":["bgRepeat"],border:["borderStyle","thickness","color","systemColor","none"],"border-top":["borderStyle","borderCollapse","color","systemColor","none"],"border-right":["borderStyle","borderCollapse","color","systemColor","none"],"border-bottom":["borderStyle","borderCollapse","color","systemColor","none"],"border-left":["borderStyle","borderCollapse","color","systemColor","none"],"border-collapse":["borderCollapse"],"border-color":["color","systemColor"],"border-top-color":["color","systemColor"],"border-right-color":["color","systemColor"],"border-bottom-color":["color","systemColor"],"border-left-color":["color","systemColor"],"border-spacing":[],"border-style":["borderStyle"],"border-top-style":["borderStyle"],"border-right-style":["borderStyle"],"border-bottom-style":["borderStyle"],"border-left-style":["borderStyle"],"border-width":["thickness"],"border-top-width":["thickness"],"border-right-width":["thickness"],"border-bottom-width":["thickness"],"border-left-width":["thickness"],bottom:["auto"],"caption-side":["captionSide"],clear:["clear","none"],clip:["auto"],color:["color","systemColor"],content:["content"],"counter-increment":["none"],"counter-reset":["none"],cursor:["cursor","none"],direction:["direction"],display:["display","none"],"empty-cells":[],"float":["float","none"],font:["fontStyle","fontVariant","fontWeight","fontFamily"],"font-family":["fontFamily"],"font-size":["fontSize"],"font-size-adjust":[],"font-stretch":[],"font-style":["fontStyle"],"font-variant":["fontVariant"],"font-weight":["fontWeight"],height:["auto"],left:["auto"],"letter-spacing":[],"line-height":[],"list-style":["listStyleType","listStylePosition","none"],"list-style-image":["none"],"list-style-position":["listStylePosition"],"list-style-type":["listStyleType","none"],margin:[],"margin-top":[],"margin-right":[],"margin-bottom":[],"margin-left":[],"marker-offset":["auto"],"min-height":["none"],"max-height":["none"],"min-width":["none"],"max-width":["none"],outline:["borderStyle","color","systemColor","none"],"outline-color":["color","systemColor"],"outline-style":["borderStyle"],"outline-width":[],overflow:["overflow","auto"],"overflow-x":["overflow","auto"],"overflow-y":["overflow","auto"],padding:[],"padding-top":[],"padding-right":[],"padding-bottom":[],"padding-left":[],position:["position"],quotes:["none"],right:["auto"],"table-layout":["tableLayout","auto"],"text-align":["textAlign"],"text-decoration":["textDecoration","none"],"text-indent":[],"text-shadow":[],"text-transform":["textTransform","none"],top:["auto"],"unicode-bidi":[],"vertical-align":["verticalAlign"],"white-space":["whiteSpace"],width:["auto"],"word-spacing":[],"z-index":[],"-moz-appearance":["mozAppearance"],"-moz-border-radius":[],"-moz-border-radius-bottomleft":[],"-moz-border-radius-bottomright":[],"-moz-border-radius-topleft":[],"-moz-border-radius-topright":[],"-moz-border-top-colors":["color","systemColor"],"-moz-border-right-colors":["color","systemColor"],"-moz-border-bottom-colors":["color","systemColor"],"-moz-border-left-colors":["color","systemColor"],"-moz-box-align":["mozBoxAlign"],"-moz-box-direction":["mozBoxDirection"],"-moz-box-flex":[],"-moz-box-ordinal-group":[],"-moz-box-orient":["mozBoxOrient"],"-moz-box-pack":["mozBoxPack"],"-moz-box-sizing":["mozBoxSizing"],"-moz-opacity":[],"-moz-user-focus":["userFocus","none"],"-moz-user-input":["userInput"],"-moz-user-modify":[],"-moz-user-select":["userSelect","none"],"-moz-background-clip":[],"-moz-background-inline-policy":[],"-moz-background-origin":[],"-moz-binding":[],"-moz-column-count":[],"-moz-column-gap":[],"-moz-column-width":[],"-moz-image-region":[]};
this.inheritedStyleNames={"border-collapse":1,"border-spacing":1,"border-style":1,"caption-side":1,color:1,cursor:1,direction:1,"empty-cells":1,font:1,"font-family":1,"font-size-adjust":1,"font-size":1,"font-style":1,"font-variant":1,"font-weight":1,"letter-spacing":1,"line-height":1,"list-style":1,"list-style-image":1,"list-style-position":1,"list-style-type":1,quotes:1,"text-align":1,"text-decoration":1,"text-indent":1,"text-shadow":1,"text-transform":1,"white-space":1,"word-spacing":1};
this.cssKeywords={appearance:["button","button-small","checkbox","checkbox-container","checkbox-small","dialog","listbox","menuitem","menulist","menulist-button","menulist-textfield","menupopup","progressbar","radio","radio-container","radio-small","resizer","scrollbar","scrollbarbutton-down","scrollbarbutton-left","scrollbarbutton-right","scrollbarbutton-up","scrollbartrack-horizontal","scrollbartrack-vertical","separator","statusbar","tab","tab-left-edge","tabpanels","textfield","toolbar","toolbarbutton","toolbox","tooltip","treeheadercell","treeheadersortarrow","treeitem","treetwisty","treetwistyopen","treeview","window"],systemColor:["ActiveBorder","ActiveCaption","AppWorkspace","Background","ButtonFace","ButtonHighlight","ButtonShadow","ButtonText","CaptionText","GrayText","Highlight","HighlightText","InactiveBorder","InactiveCaption","InactiveCaptionText","InfoBackground","InfoText","Menu","MenuText","Scrollbar","ThreeDDarkShadow","ThreeDFace","ThreeDHighlight","ThreeDLightShadow","ThreeDShadow","Window","WindowFrame","WindowText","-moz-field","-moz-fieldtext","-moz-workspace","-moz-visitedhyperlinktext","-moz-use-text-color"],color:["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet","DeepPink","DarkSkyBlue","DimGray","DodgerBlue","Feldspar","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateBlue","LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","VioletRed","Wheat","White","WhiteSmoke","Yellow","YellowGreen","transparent","invert"],auto:["auto"],none:["none"],captionSide:["top","bottom","left","right"],clear:["left","right","both"],cursor:["auto","cell","context-menu","crosshair","default","help","pointer","progress","move","e-resize","all-scroll","ne-resize","nw-resize","n-resize","se-resize","sw-resize","s-resize","w-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","col-resize","row-resize","text","vertical-text","wait","alias","copy","move","no-drop","not-allowed","-moz-alias","-moz-cell","-moz-copy","-moz-grab","-moz-grabbing","-moz-contextmenu","-moz-zoom-in","-moz-zoom-out","-moz-spinning"],direction:["ltr","rtl"],bgAttachment:["scroll","fixed"],bgPosition:["top","center","bottom","left","right"],bgRepeat:["repeat","repeat-x","repeat-y","no-repeat"],borderStyle:["hidden","dotted","dashed","solid","double","groove","ridge","inset","outset","-moz-bg-inset","-moz-bg-outset","-moz-bg-solid"],borderCollapse:["collapse","separate"],overflow:["visible","hidden","scroll","-moz-scrollbars-horizontal","-moz-scrollbars-none","-moz-scrollbars-vertical"],listStyleType:["disc","circle","square","decimal","decimal-leading-zero","lower-roman","upper-roman","lower-greek","lower-alpha","lower-latin","upper-alpha","upper-latin","hebrew","armenian","georgian","cjk-ideographic","hiragana","katakana","hiragana-iroha","katakana-iroha","inherit"],listStylePosition:["inside","outside"],content:["open-quote","close-quote","no-open-quote","no-close-quote","inherit"],fontStyle:["normal","italic","oblique","inherit"],fontVariant:["normal","small-caps","inherit"],fontWeight:["normal","bold","bolder","lighter","inherit"],fontSize:["xx-small","x-small","small","medium","large","x-large","xx-large","smaller","larger"],fontFamily:["Arial","Comic Sans MS","Georgia","Tahoma","Verdana","Times New Roman","Trebuchet MS","Lucida Grande","Helvetica","serif","sans-serif","cursive","fantasy","monospace","caption","icon","menu","message-box","small-caption","status-bar","inherit"],display:["block","inline","inline-block","list-item","marker","run-in","compact","table","inline-table","table-row-group","table-column","table-column-group","table-header-group","table-footer-group","table-row","table-cell","table-caption","-moz-box","-moz-compact","-moz-deck","-moz-grid","-moz-grid-group","-moz-grid-line","-moz-groupbox","-moz-inline-block","-moz-inline-box","-moz-inline-grid","-moz-inline-stack","-moz-inline-table","-moz-marker","-moz-popup","-moz-runin","-moz-stack"],position:["static","relative","absolute","fixed","inherit"],"float":["left","right"],textAlign:["left","right","center","justify"],tableLayout:["fixed"],textDecoration:["underline","overline","line-through","blink"],textTransform:["capitalize","lowercase","uppercase","inherit"],unicodeBidi:["normal","embed","bidi-override"],whiteSpace:["normal","pre","nowrap"],verticalAlign:["baseline","sub","super","top","text-top","middle","bottom","text-bottom","inherit"],thickness:["thin","medium","thick"],userFocus:["ignore","normal"],userInput:["disabled","enabled"],userSelect:["normal"],mozBoxSizing:["content-box","padding-box","border-box"],mozBoxAlign:["start","center","end","baseline","stretch"],mozBoxDirection:["normal","reverse"],mozBoxOrient:["horizontal","vertical"],mozBoxPack:["start","center","end"]};
this.nonEditableTags={HTML:1,HEAD:1,html:1,head:1};
this.innerEditableTags={BODY:1,body:1};
this.selfClosingTags={meta:1,link:1,area:1,base:1,col:1,input:1,img:1,br:1,hr:1,param:1,embed:1};
var invisibleTags=this.invisibleTags={HTML:1,HEAD:1,TITLE:1,META:1,LINK:1,STYLE:1,SCRIPT:1,NOSCRIPT:1,BR:1,PARAM:1,COL:1,html:1,head:1,title:1,meta:1,link:1,style:1,script:1,noscript:1,br:1,param:1,col:1};
if(typeof KeyEvent=="undefined"){this.KeyEvent={DOM_VK_CANCEL:3,DOM_VK_HELP:6,DOM_VK_BACK_SPACE:8,DOM_VK_TAB:9,DOM_VK_CLEAR:12,DOM_VK_RETURN:13,DOM_VK_ENTER:14,DOM_VK_SHIFT:16,DOM_VK_CONTROL:17,DOM_VK_ALT:18,DOM_VK_PAUSE:19,DOM_VK_CAPS_LOCK:20,DOM_VK_ESCAPE:27,DOM_VK_SPACE:32,DOM_VK_PAGE_UP:33,DOM_VK_PAGE_DOWN:34,DOM_VK_END:35,DOM_VK_HOME:36,DOM_VK_LEFT:37,DOM_VK_UP:38,DOM_VK_RIGHT:39,DOM_VK_DOWN:40,DOM_VK_PRINTSCREEN:44,DOM_VK_INSERT:45,DOM_VK_DELETE:46,DOM_VK_0:48,DOM_VK_1:49,DOM_VK_2:50,DOM_VK_3:51,DOM_VK_4:52,DOM_VK_5:53,DOM_VK_6:54,DOM_VK_7:55,DOM_VK_8:56,DOM_VK_9:57,DOM_VK_SEMICOLON:59,DOM_VK_EQUALS:61,DOM_VK_A:65,DOM_VK_B:66,DOM_VK_C:67,DOM_VK_D:68,DOM_VK_E:69,DOM_VK_F:70,DOM_VK_G:71,DOM_VK_H:72,DOM_VK_I:73,DOM_VK_J:74,DOM_VK_K:75,DOM_VK_L:76,DOM_VK_M:77,DOM_VK_N:78,DOM_VK_O:79,DOM_VK_P:80,DOM_VK_Q:81,DOM_VK_R:82,DOM_VK_S:83,DOM_VK_T:84,DOM_VK_U:85,DOM_VK_V:86,DOM_VK_W:87,DOM_VK_X:88,DOM_VK_Y:89,DOM_VK_Z:90,DOM_VK_CONTEXT_MENU:93,DOM_VK_NUMPAD0:96,DOM_VK_NUMPAD1:97,DOM_VK_NUMPAD2:98,DOM_VK_NUMPAD3:99,DOM_VK_NUMPAD4:100,DOM_VK_NUMPAD5:101,DOM_VK_NUMPAD6:102,DOM_VK_NUMPAD7:103,DOM_VK_NUMPAD8:104,DOM_VK_NUMPAD9:105,DOM_VK_MULTIPLY:106,DOM_VK_ADD:107,DOM_VK_SEPARATOR:108,DOM_VK_SUBTRACT:109,DOM_VK_DECIMAL:110,DOM_VK_DIVIDE:111,DOM_VK_F1:112,DOM_VK_F2:113,DOM_VK_F3:114,DOM_VK_F4:115,DOM_VK_F5:116,DOM_VK_F6:117,DOM_VK_F7:118,DOM_VK_F8:119,DOM_VK_F9:120,DOM_VK_F10:121,DOM_VK_F11:122,DOM_VK_F12:123,DOM_VK_F13:124,DOM_VK_F14:125,DOM_VK_F15:126,DOM_VK_F16:127,DOM_VK_F17:128,DOM_VK_F18:129,DOM_VK_F19:130,DOM_VK_F20:131,DOM_VK_F21:132,DOM_VK_F22:133,DOM_VK_F23:134,DOM_VK_F24:135,DOM_VK_NUM_LOCK:144,DOM_VK_SCROLL_LOCK:145,DOM_VK_COMMA:188,DOM_VK_PERIOD:190,DOM_VK_SLASH:191,DOM_VK_BACK_QUOTE:192,DOM_VK_OPEN_BRACKET:219,DOM_VK_BACK_SLASH:220,DOM_VK_CLOSE_BRACKET:221,DOM_VK_QUOTE:222,DOM_VK_META:224}
}this.Ajax={requests:[],transport:null,states:["Uninitialized","Loading","Loaded","Interactive","Complete"],initialize:function(){this.transport=FBL.getNativeXHRObject()
},getXHRObject:function(){var xhrObj=false;
try{xhrObj=new XMLHttpRequest()
}catch(e){var progid=["MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
for(var i=0;
i<progid.length;
++i){try{xhrObj=new ActiveXObject(progid[i])
}catch(e){continue
}break
}}finally{return xhrObj
}},request:function(options){var o=FBL.extend({type:"get",async:true,dataType:"text",contentType:"application/x-www-form-urlencoded"},options||{});
this.requests.push(o);
var s=this.getState();
if(s=="Uninitialized"||s=="Complete"||s=="Loaded"){this.sendRequest()
}},serialize:function(data){var r=[""],rl=0;
if(data){if(typeof data=="string"){r[rl++]=data
}else{if(data.innerHTML&&data.elements){for(var i=0,el,l=(el=data.elements).length;
i<l;
i++){if(el[i].name){r[rl++]=encodeURIComponent(el[i].name);
r[rl++]="=";
r[rl++]=encodeURIComponent(el[i].value);
r[rl++]="&"
}}}else{for(var param in data){r[rl++]=encodeURIComponent(param);
r[rl++]="=";
r[rl++]=encodeURIComponent(data[param]);
r[rl++]="&"
}}}}return r.join("").replace(/&$/,"")
},sendRequest:function(){var t=FBL.Ajax.transport,r=FBL.Ajax.requests.shift(),data;
t.open(r.type,r.url,r.async);
t.setRequestHeader("X-Requested-With","XMLHttpRequest");
if(data=FBL.Ajax.serialize(r.data)){t.setRequestHeader("Content-Type",r.contentType)
}t.onreadystatechange=function(){FBL.Ajax.onStateChange(r)
};
t.send(data)
},onStateChange:function(options){var fn,o=options,t=this.transport;
var state=this.getState(t);
if(fn=o["on"+state]){fn(this.getResponse(o),o)
}if(state=="Complete"){var success=t.status==200,response=this.getResponse(o);
if(fn=o.onUpdate){fn(response,o)
}if(fn=o["on"+(success?"Success":"Failure")]){fn(response,o)
}t.onreadystatechange=FBL.emptyFn;
if(this.requests.length>0){setTimeout(this.sendRequest,10)
}}},getResponse:function(options){var t=this.transport,type=options.dataType;
if(t.status!=200){return t.statusText
}else{if(type=="text"){return t.responseText
}else{if(type=="html"){return t.responseText
}else{if(type=="xml"){return t.responseXML
}else{if(type=="json"){return eval("("+t.responseText+")")
}}}}}},getState:function(){return this.states[this.transport.readyState]
}};
this.createCookie=function(name,value,days){if("cookie" in document){if(days){var date=new Date();
date.setTime(date.getTime()+(days*24*60*60*1000));
var expires="; expires="+date.toGMTString()
}else{var expires=""
}document.cookie=name+"="+value+expires+"; path=/"
}};
this.readCookie=function(name){if("cookie" in document){var nameEQ=name+"=";
var ca=document.cookie.split(";");
for(var i=0;
i<ca.length;
i++){var c=ca[i];
while(c.charAt(0)==" "){c=c.substring(1,c.length)
}if(c.indexOf(nameEQ)==0){return c.substring(nameEQ.length,c.length)
}}}return null
};
this.removeCookie=function(name){this.createCookie(name,"",-1)
};
var fixIE6BackgroundImageCache=function(doc){doc=doc||document;
try{doc.execCommand("BackgroundImageCache",false,true)
}catch(E){}};
var resetStyle="margin:0; padding:0; border:0; position:absolute; overflow:hidden; display:block;";
var calculatePixelsPerInch=function calculatePixelsPerInch(doc,body){var inch=FBL.createGlobalElement("div");
inch.style.cssText=resetStyle+"width:1in; height:1in; position:absolute; top:-1234px; left:-1234px;";
body.appendChild(inch);
FBL.pixelsPerInch={x:inch.offsetWidth,y:inch.offsetHeight};
body.removeChild(inch)
};
this.SourceLink=function(url,line,type,object,instance){this.href=url;
this.instance=instance;
this.line=line;
this.type=type;
this.object=object
};
this.SourceLink.prototype={toString:function(){return this.href
},toJSON:function(){return'{"href":"'+this.href+'", '+(this.line?('"line":'+this.line+","):"")+(this.type?(' "type":"'+this.type+'",'):"")+"}"
}};
this.SourceText=function(lines,owner){this.lines=lines;
this.owner=owner
};
this.SourceText.getLineAsHTML=function(lineNo){return escapeForSourceLine(this.lines[lineNo-1])
}
}).apply(FBL);
FBL.ns(function(){with(FBL){var oSTR={NoMembersWarning:"There are no properties to show for this object.",EmptyStyleSheet:"There are no rules in this stylesheet.",EmptyElementCSS:"This element has no style rules.",AccessRestricted:"Access to restricted URI denied.","net.label.Parameters":"Parameters","net.label.Source":"Source",URLParameters:"Params",EditStyle:"Edit Element Style...",NewRule:"New Rule...",NewProp:"New Property...",EditProp:'Edit "%s"',DeleteProp:'Delete "%s"',DisableProp:'Disable "%s"'};
FBL.$STR=function(name){return oSTR.hasOwnProperty(name)?oSTR[name]:name
};
FBL.$STRF=function(name,args){if(!oSTR.hasOwnProperty(name)){return name
}var format=oSTR[name];
var objIndex=0;
var parts=parseFormat(format);
var trialIndex=objIndex;
var objects=args;
for(var i=0;
i<parts.length;
i++){var part=parts[i];
if(part&&typeof(part)=="object"){if(++trialIndex>objects.length){format="";
objIndex=-1;
parts.length=0;
break
}}}var result=[];
for(var i=0;
i<parts.length;
++i){var part=parts[i];
if(part&&typeof(part)=="object"){result.push(""+args.shift())
}else{result.push(part)
}}return result.join("")
};
var parseFormat=function parseFormat(format){var parts=[];
if(format.length<=0){return parts
}var reg=/((^%|.%)(\d+)?(\.)([a-zA-Z]))|((^%|.%)([a-zA-Z]))/;
for(var m=reg.exec(format);
m;
m=reg.exec(format)){if(m[0].substr(0,2)=="%%"){parts.push(format.substr(0,m.index));
parts.push(m[0].substr(1))
}else{var type=m[8]?m[8]:m[5];
var precision=m[3]?parseInt(m[3]):(m[4]=="."?-1:0);
var rep=null;
switch(type){case"s":rep=FirebugReps.Text;
break;
case"f":case"i":case"d":rep=FirebugReps.Number;
break;
case"o":rep=null;
break
}parts.push(format.substr(0,m[0][0]=="%"?m.index:m.index+1));
parts.push({rep:rep,precision:precision,type:("%"+type)})
}format=format.substr(m.index+m[0].length)
}parts.push(format);
return parts
}
}});
FBL.ns(function(){with(FBL){var modules=[];
var panelTypes=[];
var panelTypeMap={};
var reps=[];
var parentPanelMap={};
FBL.Firebug={version:"Firebug Lite 1.4.0",revision:"$Revision$",modules:modules,panelTypes:panelTypes,panelTypeMap:panelTypeMap,reps:reps,initialize:function(){if(FBTrace.DBG_INITIALIZE){FBTrace.sysout("Firebug.initialize","initializing application")
}Firebug.browser=new Context(Env.browser);
Firebug.context=Firebug.browser;
Firebug.loadPrefs();
Firebug.context.persistedState.isOpen=false;
cacheDocument();
if(Firebug.Inspector&&Firebug.Inspector.create){Firebug.Inspector.create()
}if(FBL.CssAnalyzer&&FBL.CssAnalyzer.processAllStyleSheets){FBL.CssAnalyzer.processAllStyleSheets(Firebug.browser.document)
}FirebugChrome.initialize();
dispatch(modules,"initialize",[]);
if(Firebug.disableResourceFetching){Firebug.Console.logFormatted(['Some Firebug Lite features are not working because resource fetching is disabled. To enabled it set the Firebug Lite option "disableResourceFetching" to "false". More info at http://getfirebug.com/firebuglite#Options'],Firebug.context,"warn")
}if(Env.onLoad){var onLoad=Env.onLoad;
delete Env.onLoad;
setTimeout(onLoad,200)
}},shutdown:function(){if(Firebug.saveCookies){Firebug.savePrefs()
}if(Firebug.Inspector){Firebug.Inspector.destroy()
}dispatch(modules,"shutdown",[]);
var chromeMap=FirebugChrome.chromeMap;
for(var name in chromeMap){if(chromeMap.hasOwnProperty(name)){try{chromeMap[name].destroy()
}catch(E){if(FBTrace.DBG_ERRORS){FBTrace.sysout("chrome.destroy() failed to: "+name)
}}}}Firebug.Lite.Cache.Element.clear();
Firebug.Lite.Cache.StyleSheet.clear();
Firebug.browser=null;
Firebug.context=null
},registerModule:function(){modules.push.apply(modules,arguments);
if(FBTrace.DBG_INITIALIZE){FBTrace.sysout("Firebug.registerModule")
}},registerPanel:function(){panelTypes.push.apply(panelTypes,arguments);
for(var i=0,panelType;
panelType=arguments[i];
++i){panelTypeMap[panelType.prototype.name]=arguments[i];
if(panelType.prototype.parentPanel){parentPanelMap[panelType.prototype.parentPanel]=1
}}if(FBTrace.DBG_INITIALIZE){for(var i=0;
i<arguments.length;
++i){FBTrace.sysout("Firebug.registerPanel",arguments[i].prototype.name)
}}},registerRep:function(){reps.push.apply(reps,arguments)
},unregisterRep:function(){for(var i=0;
i<arguments.length;
++i){remove(reps,arguments[i])
}},setDefaultReps:function(funcRep,rep){FBL.defaultRep=rep;
FBL.defaultFuncRep=funcRep
},getRep:function(object){var type=typeof object;
if(isIE&&isFunction(object)){type="function"
}for(var i=0;
i<reps.length;
++i){var rep=reps[i];
try{if(rep.supportsObject(object,type)){if(FBTrace.DBG_DOM){FBTrace.sysout("getRep type: "+type+" object: "+object,rep)
}return rep
}}catch(exc){if(FBTrace.DBG_ERRORS){FBTrace.sysout("firebug.getRep FAILS: ",exc.message||exc);
FBTrace.sysout("firebug.getRep reps["+i+"/"+reps.length+"]: Rep="+reps[i].className)
}}}return(type=="function")?defaultFuncRep:defaultRep
},getRepObject:function(node){var target=null;
for(var child=node;
child;
child=child.parentNode){if(hasClass(child,"repTarget")){target=child
}if(child.repObject){if(!target&&hasClass(child,"repIgnore")){break
}else{return child.repObject
}}}},getRepNode:function(node){for(var child=node;
child;
child=child.parentNode){if(child.repObject){return child
}}},getElementByRepObject:function(element,object){for(var child=element.firstChild;
child;
child=child.nextSibling){if(child.repObject==object){return child
}}},getPref:function(name){return Firebug[name]
},setPref:function(name,value){Firebug[name]=value;
Firebug.savePrefs()
},setPrefs:function(prefs){for(var name in prefs){if(prefs.hasOwnProperty(name)){Firebug[name]=prefs[name]
}}Firebug.savePrefs()
},restorePrefs:function(){var Options=Env.DefaultOptions;
for(var name in Options){Firebug[name]=Options[name]
}},loadPrefs:function(){this.restorePrefs();
var prefs=Store.get("FirebugLite")||{};
var options=prefs.options;
var persistedState=prefs.persistedState||FBL.defaultPersistedState;
for(var name in options){if(options.hasOwnProperty(name)){Firebug[name]=options[name]
}}if(Firebug.context&&persistedState){Firebug.context.persistedState=persistedState
}},savePrefs:function(){var prefs={options:{}};
var EnvOptions=Env.Options;
var options=prefs.options;
for(var name in EnvOptions){if(EnvOptions.hasOwnProperty(name)){options[name]=Firebug[name]
}}var persistedState=Firebug.context.persistedState;
if(!persistedState){persistedState=Firebug.context.persistedState=FBL.defaultPersistedState
}prefs.persistedState=persistedState;
Store.set("FirebugLite",prefs)
},erasePrefs:function(){Store.remove("FirebugLite");
this.restorePrefs()
}};
Firebug.restorePrefs();
window.Firebug=FBL.Firebug;
if(!Env.Options.enablePersistent||Env.Options.enablePersistent&&Env.isChromeContext||Env.isDebugMode){Env.browser.window.Firebug=FBL.Firebug
}FBL.cacheDocument=function cacheDocument(){var ElementCache=Firebug.Lite.Cache.Element;
var els=Firebug.browser.document.getElementsByTagName("*");
for(var i=0,l=els.length,el;
i<l;
i++){el=els[i];
ElementCache(el)
}};
Firebug.Listener=function(){this.fbListeners=null
};
Firebug.Listener.prototype={addListener:function(listener){if(!this.fbListeners){this.fbListeners=[]
}this.fbListeners.push(listener)
},removeListener:function(listener){remove(this.fbListeners,listener)
}};
Firebug.Module=extend(new Firebug.Listener(),{initialize:function(){},shutdown:function(){},initContext:function(context){},reattachContext:function(browser,context){},destroyContext:function(context,persistedState){},showContext:function(browser,context){},loadedContext:function(context){},showPanel:function(browser,panel){},showSidePanel:function(browser,panel){},updateOption:function(name,value){},getObjectByURL:function(context,url){}});
Firebug.Panel={name:"HelloWorld",title:"Hello World!",parentPanel:null,options:{hasCommandLine:false,hasStatusBar:false,hasToolButtons:false,isPreRendered:false,innerHTMLSync:false},tabNode:null,panelNode:null,sidePanelNode:null,statusBarNode:null,toolButtonsNode:null,panelBarNode:null,sidePanelBarBoxNode:null,sidePanelBarNode:null,sidePanelBar:null,searchable:false,editable:true,order:2147483647,statusSeparator:"<",create:function(context,doc){this.hasSidePanel=parentPanelMap.hasOwnProperty(this.name);
this.panelBarNode=$("fbPanelBar1");
this.sidePanelBarBoxNode=$("fbPanelBar2");
if(this.hasSidePanel){this.sidePanelBar=extend({},PanelBar);
this.sidePanelBar.create(this)
}var options=this.options=extend(Firebug.Panel.options,this.options);
var panelId="fb"+this.name;
if(options.isPreRendered){this.panelNode=$(panelId);
this.tabNode=$(panelId+"Tab");
this.tabNode.style.display="block";
if(options.hasToolButtons){this.toolButtonsNode=$(panelId+"Buttons")
}if(options.hasStatusBar){this.statusBarBox=$("fbStatusBarBox");
this.statusBarNode=$(panelId+"StatusBar")
}}else{var containerSufix=this.parentPanel?"2":"1";
var panelNode=this.panelNode=createElement("div",{id:panelId,className:"fbPanel"});
$("fbPanel"+containerSufix).appendChild(panelNode);
var tabHTML='<span class="fbTabL"></span><span class="fbTabText">'+this.title+'</span><span class="fbTabR"></span>';
var tabNode=this.tabNode=createElement("a",{id:panelId+"Tab",className:"fbTab fbHover",innerHTML:tabHTML});
if(isIE6){tabNode.href="javascript:void(0)"
}var panelBarNode=this.parentPanel?Firebug.chrome.getPanel(this.parentPanel).sidePanelBarNode:this.panelBarNode;
panelBarNode.appendChild(tabNode);
tabNode.style.display="block";
if(options.hasToolButtons){this.toolButtonsNode=createElement("span",{id:panelId+"Buttons",className:"fbToolbarButtons"});
$("fbToolbarButtons").appendChild(this.toolButtonsNode)
}if(options.hasStatusBar){this.statusBarBox=$("fbStatusBarBox");
this.statusBarNode=createElement("span",{id:panelId+"StatusBar",className:"fbToolbarButtons fbStatusBar"});
this.statusBarBox.appendChild(this.statusBarNode)
}}this.containerNode=this.panelNode.parentNode;
if(FBTrace.DBG_INITIALIZE){FBTrace.sysout("Firebug.Panel.create",this.name)
}this.onContextMenu=bind(this.onContextMenu,this)
},destroy:function(state){if(FBTrace.DBG_INITIALIZE){FBTrace.sysout("Firebug.Panel.destroy",this.name)
}if(this.hasSidePanel){this.sidePanelBar.destroy();
this.sidePanelBar=null
}this.options=null;
this.name=null;
this.parentPanel=null;
this.tabNode=null;
this.panelNode=null;
this.containerNode=null;
this.toolButtonsNode=null;
this.statusBarBox=null;
this.statusBarNode=null
},initialize:function(){if(FBTrace.DBG_INITIALIZE){FBTrace.sysout("Firebug.Panel.initialize",this.name)
}if(this.hasSidePanel){this.sidePanelBar.initialize()
}var options=this.options=extend(Firebug.Panel.options,this.options);
var panelId="fb"+this.name;
this.panelNode=$(panelId);
this.tabNode=$(panelId+"Tab");
this.tabNode.style.display="block";
if(options.hasStatusBar){this.statusBarBox=$("fbStatusBarBox");
this.statusBarNode=$(panelId+"StatusBar")
}if(options.hasToolButtons){this.toolButtonsNode=$(panelId+"Buttons")
}this.containerNode=this.panelNode.parentNode;
this.containerNode.scrollTop=this.lastScrollTop;
addEvent(this.containerNode,"contextmenu",this.onContextMenu);
Firebug.chrome.currentPanel=Firebug.chrome.selectedPanel&&Firebug.chrome.selectedPanel.sidePanelBar?Firebug.chrome.selectedPanel.sidePanelBar.selectedPanel:Firebug.chrome.selectedPanel;
Firebug.showInfoTips=true;
if(Firebug.InfoTip){Firebug.InfoTip.initializeBrowser(Firebug.chrome)
}},shutdown:function(){if(FBTrace.DBG_INITIALIZE){FBTrace.sysout("Firebug.Panel.shutdown",this.name)
}if(Firebug.InfoTip){Firebug.InfoTip.uninitializeBrowser(Firebug.chrome)
}if(Firebug.chrome.largeCommandLineVisible){Firebug.chrome.hideLargeCommandLine()
}if(this.hasSidePanel){}this.lastScrollTop=this.containerNode.scrollTop;
removeEvent(this.containerNode,"contextmenu",this.onContextMenu)
},detach:function(oldChrome,newChrome){if(oldChrome&&oldChrome.selectedPanel&&oldChrome.selectedPanel.name==this.name){this.lastScrollTop=oldChrome.selectedPanel.containerNode.scrollTop
}},reattach:function(doc){if(this.options.innerHTMLSync){this.synchronizeUI()
}},synchronizeUI:function(){this.containerNode.scrollTop=this.lastScrollTop||0
},show:function(state){var options=this.options;
if(options.hasStatusBar){this.statusBarBox.style.display="inline";
this.statusBarNode.style.display="inline"
}if(options.hasToolButtons){this.toolButtonsNode.style.display="inline"
}this.panelNode.style.display="block";
this.visible=true;
if(!this.parentPanel){Firebug.chrome.layout(this)
}},hide:function(state){var options=this.options;
if(options.hasStatusBar){this.statusBarBox.style.display="none";
this.statusBarNode.style.display="none"
}if(options.hasToolButtons){this.toolButtonsNode.style.display="none"
}this.panelNode.style.display="none";
this.visible=false
},watchWindow:function(win){},unwatchWindow:function(win){},updateOption:function(name,value){},showToolbarButtons:function(buttonsId,show){try{if(!this.context.browser){if(FBTrace.DBG_ERRORS){FBTrace.sysout("firebug.Panel showToolbarButtons this.context has no browser, this:",this)
}return
}var buttons=this.context.browser.chrome.$(buttonsId);
if(buttons){collapse(buttons,show?"false":"true")
}}catch(exc){if(FBTrace.DBG_ERRORS){FBTrace.dumpProperties("firebug.Panel showToolbarButtons FAILS",exc);
if(!this.context.browser){FBTrace.dumpStack("firebug.Panel showToolbarButtons no browser")
}}}},supportsObject:function(object){return 0
},hasObject:function(object){return false
},select:function(object,forceUpdate){if(!object){object=this.getDefaultSelection(this.context)
}if(FBTrace.DBG_PANELS){FBTrace.sysout("firebug.select "+this.name+" forceUpdate: "+forceUpdate+" "+object+((object==this.selection)?"==":"!=")+this.selection)
}if(forceUpdate||object!=this.selection){this.selection=object;
this.updateSelection(object)
}},updateSelection:function(object){},markChange:function(skipSelf){if(this.dependents){if(skipSelf){for(var i=0;
i<this.dependents.length;
++i){var panelName=this.dependents[i];
if(panelName!=this.name){this.context.invalidatePanels(panelName)
}}}else{this.context.invalidatePanels.apply(this.context,this.dependents)
}}},startInspecting:function(){},stopInspecting:function(object,cancelled){},search:function(text,reverse){},getSearchOptionsMenuItems:function(){return[Firebug.Search.searchOptionMenu("search.Case Sensitive","searchCaseSensitive")]
},navigateToNextDocument:function(match,reverse){var self=this;
function compare(a,b){var locA=self.getObjectDescription(a);
var locB=self.getObjectDescription(b);
if(locA.path>locB.path){return 1
}if(locA.path<locB.path){return -1
}if(locA.name>locB.name){return 1
}if(locA.name<locB.name){return -1
}return 0
}var allLocs=this.getLocationList().sort(compare);
for(var curPos=0;
curPos<allLocs.length&&allLocs[curPos]!=this.location;
curPos++){}function transformIndex(index){if(reverse){var intermediate=curPos-index-1;
return(intermediate<0?allLocs.length:0)+intermediate
}else{return(curPos+index+1)%allLocs.length
}}for(var next=0;
next<allLocs.length-1;
next++){var object=allLocs[transformIndex(next)];
if(match(object)){this.navigate(object);
return object
}}},getOptionsMenuItems:function(){return null
},getContextMenuItems:function(object,target){return[]
},getBreakOnMenuItems:function(){return[]
},getEditor:function(target,value){},getDefaultSelection:function(){return null
},browseObject:function(object){},getPopupObject:function(target){return Firebug.getRepObject(target)
},getTooltipObject:function(target){return Firebug.getRepObject(target)
},showInfoTip:function(infoTip,x,y){},getObjectPath:function(object){return null
},getLocationList:function(){return null
},getDefaultLocation:function(){return null
},getObjectLocation:function(object){return""
},getObjectDescription:function(object){var url=this.getObjectLocation(object);
return FBL.splitURLBase(url)
},highlight:function(show){var tab=this.getTab();
if(!tab){return
}if(show){tab.setAttribute("highlight","true")
}else{tab.removeAttribute("highlight")
}},getTab:function(){var chrome=Firebug.chrome;
var tab=chrome.$("fbPanelBar2").getTab(this.name);
if(!tab){tab=chrome.$("fbPanelBar1").getTab(this.name)
}return tab
},breakOnNext:function(armed){},shouldBreakOnNext:function(){return false
},getBreakOnNextTooltip:function(enabled){return null
},onContextMenu:function(event){if(!this.getContextMenuItems){return
}cancelEvent(event,true);
var target=event.target||event.srcElement;
var menu=this.getContextMenuItems(this.selection,target);
if(!menu){return
}var contextMenu=new Menu({id:"fbPanelContextMenu",items:menu});
contextMenu.show(event.clientX,event.clientY);
return true
}};
Firebug.MeasureBox={startMeasuring:function(target){if(!this.measureBox){this.measureBox=target.ownerDocument.createElement("span");
this.measureBox.className="measureBox"
}copyTextStyles(target,this.measureBox);
target.ownerDocument.body.appendChild(this.measureBox)
},getMeasuringElement:function(){return this.measureBox
},measureText:function(value){this.measureBox.innerHTML=value?escapeForSourceLine(value):"m";
return{width:this.measureBox.offsetWidth,height:this.measureBox.offsetHeight-1}
},measureInputText:function(value){value=value?escapeForTextNode(value):"m";
if(!Firebug.showTextNodesWithWhitespace){value=value.replace(/\t/g,"mmmmmm").replace(/\ /g,"m")
}this.measureBox.innerHTML=value;
return{width:this.measureBox.offsetWidth,height:this.measureBox.offsetHeight-1}
},getBox:function(target){var style=this.measureBox.ownerDocument.defaultView.getComputedStyle(this.measureBox,"");
var box=getBoxFromStyles(style,this.measureBox);
return box
},stopMeasuring:function(){this.measureBox.parentNode.removeChild(this.measureBox)
}};
if(FBL.domplate){Firebug.Rep=domplate({className:"",inspectable:true,supportsObject:function(object,type){return false
},inspectObject:function(object,context){Firebug.chrome.select(object)
},browseObject:function(object,context){},persistObject:function(object,context){},getRealObject:function(object,context){return object
},getTitle:function(object){var label=safeToString(object);
var re=/\[object (.*?)\]/;
var m=re.exec(label);
if(m){return m[1]
}else{if(isIE&&(label=="[object]"||typeof object=="object"&&typeof label=="undefined")){return"Object"
}else{return label
}}},getTooltip:function(object){return null
},getContextMenuItems:function(object,target,context){return[]
},STR:function(name){return $STR(name)
},cropString:function(text){return cropString(text)
},cropMultipleLines:function(text,limit){return cropMultipleLines(text,limit)
},toLowerCase:function(text){return text?text.toLowerCase():text
},plural:function(n){return n==1?"":"s"
}})
}}});
FBL.ns(function(){with(FBL){FBL.Controller={controllers:null,controllerContext:null,initialize:function(context){this.controllers=[];
this.controllerContext=context||Firebug.chrome
},shutdown:function(){this.removeControllers()
},addController:function(){for(var i=0,arg;
arg=arguments[i];
i++){if(typeof arg[0]=="string"){arg[0]=$$(arg[0],this.controllerContext)
}var handler=arg[2];
arg[2]=bind(handler,this);
arg[3]=handler;
this.controllers.push(arg);
addEvent.apply(this,arg)
}},removeController:function(){for(var i=0,arg;
arg=arguments[i];
i++){for(var j=0,c;
c=this.controllers[j];
j++){if(arg[0]==c[0]&&arg[1]==c[1]&&arg[2]==c[3]){removeEvent.apply(this,c)
}}}},removeControllers:function(){for(var i=0,c;
c=this.controllers[i];
i++){removeEvent.apply(this,c)
}}};
FBL.PanelBar={panelMap:null,selectedPanel:null,parentPanelName:null,create:function(ownerPanel){this.panelMap={};
this.ownerPanel=ownerPanel;
if(ownerPanel){ownerPanel.sidePanelBarNode=createElement("span");
ownerPanel.sidePanelBarNode.style.display="none";
ownerPanel.sidePanelBarBoxNode.appendChild(ownerPanel.sidePanelBarNode)
}var panels=Firebug.panelTypes;
for(var i=0,p;
p=panels[i];
i++){if(!ownerPanel&&!p.prototype.parentPanel||ownerPanel&&p.prototype.parentPanel&&ownerPanel.name==p.prototype.parentPanel){this.addPanel(p.prototype.name)
}}},destroy:function(){PanelBar.shutdown.call(this);
for(var name in this.panelMap){this.removePanel(name);
var panel=this.panelMap[name];
panel.destroy();
this.panelMap[name]=null;
delete this.panelMap[name]
}this.panelMap=null;
this.ownerPanel=null
},initialize:function(){if(this.ownerPanel){this.ownerPanel.sidePanelBarNode.style.display="inline"
}for(var name in this.panelMap){(function(self,name){var onTabClick=function onTabClick(){self.selectPanel(name);
return false
};
Firebug.chrome.addController([self.panelMap[name].tabNode,"mousedown",onTabClick])
})(this,name)
}},shutdown:function(){var selectedPanel=this.selectedPanel;
if(selectedPanel){removeClass(selectedPanel.tabNode,"fbSelectedTab");
selectedPanel.hide();
selectedPanel.shutdown()
}if(this.ownerPanel){this.ownerPanel.sidePanelBarNode.style.display="none"
}this.selectedPanel=null
},addPanel:function(panelName,parentPanel){var PanelType=Firebug.panelTypeMap[panelName];
var panel=this.panelMap[panelName]=new PanelType();
panel.create()
},removePanel:function(panelName){var panel=this.panelMap[panelName];
if(panel.hasOwnProperty(panelName)){panel.destroy()
}},selectPanel:function(panelName){var selectedPanel=this.selectedPanel;
var panel=this.panelMap[panelName];
if(panel&&selectedPanel!=panel){if(selectedPanel){removeClass(selectedPanel.tabNode,"fbSelectedTab");
selectedPanel.shutdown();
selectedPanel.hide()
}if(!panel.parentPanel){Firebug.context.persistedState.selectedPanelName=panelName
}this.selectedPanel=panel;
setClass(panel.tabNode,"fbSelectedTab");
panel.show();
panel.initialize()
}},getPanel:function(panelName){var panel=this.panelMap[panelName];
return panel
}};
FBL.Button=function(options){options=options||{};
append(this,options);
this.state="unpressed";
this.display="unpressed";
if(this.element){this.container=this.element.parentNode
}else{this.shouldDestroy=true;
this.container=this.owner.getPanel().toolButtonsNode;
this.element=createElement("a",{className:this.baseClassName+" "+this.className+" fbHover",innerHTML:this.caption});
if(this.title){this.element.title=this.title
}this.container.appendChild(this.element)
}};
Button.prototype=extend(Controller,{type:"normal",caption:"caption",title:null,className:"",baseClassName:"fbButton",pressedClassName:"fbBtnPressed",element:null,container:null,owner:null,state:null,display:null,destroy:function(){this.shutdown();
if(this.shouldDestroy){this.container.removeChild(this.element)
}this.element=null;
this.container=null;
this.owner=null
},initialize:function(){Controller.initialize.apply(this);
var element=this.element;
this.addController([element,"mousedown",this.handlePress]);
if(this.type=="normal"){this.addController([element,"mouseup",this.handleUnpress],[element,"mouseout",this.handleUnpress],[element,"click",this.handleClick])
}},shutdown:function(){Controller.shutdown.apply(this)
},restore:function(){this.changeState("unpressed")
},changeState:function(state){this.state=state;
this.changeDisplay(state)
},changeDisplay:function(display){if(display!=this.display){if(display=="pressed"){setClass(this.element,this.pressedClassName)
}else{if(display=="unpressed"){removeClass(this.element,this.pressedClassName)
}}this.display=display
}},handlePress:function(event){cancelEvent(event,true);
if(this.type=="normal"){this.changeDisplay("pressed");
this.beforeClick=true
}else{if(this.type=="toggle"){if(this.state=="pressed"){this.changeState("unpressed");
if(this.onUnpress){this.onUnpress.apply(this.owner,arguments)
}}else{this.changeState("pressed");
if(this.onPress){this.onPress.apply(this.owner,arguments)
}}if(this.onClick){this.onClick.apply(this.owner,arguments)
}}}return false
},handleUnpress:function(event){cancelEvent(event,true);
if(this.beforeClick){this.changeDisplay("unpressed")
}return false
},handleClick:function(event){cancelEvent(event,true);
if(this.type=="normal"){if(this.onClick){this.onClick.apply(this.owner)
}this.changeState("unpressed")
}this.beforeClick=false;
return false
}});
FBL.IconButton=function(){Button.apply(this,arguments)
};
IconButton.prototype=extend(Button.prototype,{baseClassName:"fbIconButton",pressedClassName:"fbIconPressed"});
var menuItemProps={"class":"$item.className",type:"$item.type",value:"$item.value",_command:"$item.command"};
if(isIE6){menuItemProps.href="javascript:void(0)"
}if(FBL.domplate){var MenuPlate=domplate(Firebug.Rep,{tag:DIV({"class":"fbMenu fbShadow"},DIV({"class":"fbMenuContent fbShadowContent"},FOR("item","$object.items|memberIterator",TAG("$item.tag",{item:"$item"})))),itemTag:A(menuItemProps,"$item.label"),checkBoxTag:A(extend(menuItemProps,{checked:"$item.checked"}),"$item.label"),radioButtonTag:A(extend(menuItemProps,{selected:"$item.selected"}),"$item.label"),groupTag:A(extend(menuItemProps,{child:"$item.child"}),"$item.label"),shortcutTag:A(menuItemProps,"$item.label",SPAN({"class":"fbMenuShortcutKey"},"$item.key")),separatorTag:SPAN({"class":"fbMenuSeparator"}),memberIterator:function(items){var result=[];
for(var i=0,length=items.length;
i<length;
i++){var item=items[i];
if(typeof item=="string"&&item.indexOf("-")==0){result.push({tag:this.separatorTag});
continue
}item=extend(item,{});
item.type=item.type||"";
item.value=item.value||"";
var type=item.type;
item.tag=this.itemTag;
var className=item.className||"";
className+="fbMenuOption fbHover ";
if(type=="checkbox"){className+="fbMenuCheckBox ";
item.tag=this.checkBoxTag
}else{if(type=="radiobutton"){className+="fbMenuRadioButton ";
item.tag=this.radioButtonTag
}else{if(type=="group"){className+="fbMenuGroup ";
item.tag=this.groupTag
}else{if(type=="shortcut"){className+="fbMenuShortcut ";
item.tag=this.shortcutTag
}}}}if(item.checked){className+="fbMenuChecked "
}else{if(item.selected){className+="fbMenuRadioSelected "
}}if(item.disabled){className+="fbMenuDisabled "
}item.className=className;
item.label=$STR(item.label);
result.push(item)
}return result
}})
}FBL.Menu=function(options){if(!options.element){if(options.getItems){options.items=options.getItems()
}options.element=MenuPlate.tag.append({object:options},getElementByClass(Firebug.chrome.document,"fbBody"),MenuPlate)
}append(this,options);
if(typeof this.element=="string"){this.id=this.element;
this.element=$(this.id)
}else{if(this.id){this.element.id=this.id
}}this.element.firebugIgnore=true;
this.elementStyle=this.element.style;
this.isVisible=false;
this.handleMouseDown=bind(this.handleMouseDown,this);
this.handleMouseOver=bind(this.handleMouseOver,this);
this.handleMouseOut=bind(this.handleMouseOut,this);
this.handleWindowMouseDown=bind(this.handleWindowMouseDown,this)
};
var menuMap={};
Menu.prototype=extend(Controller,{destroy:function(){this.hide();
if(this.parentMenu){this.parentMenu.childMenu=null
}this.element.parentNode.removeChild(this.element);
this.element=null;
this.elementStyle=null;
this.parentMenu=null;
this.parentTarget=null
},initialize:function(){Controller.initialize.call(this);
this.addController([this.element,"mousedown",this.handleMouseDown],[this.element,"mouseover",this.handleMouseOver])
},shutdown:function(){Controller.shutdown.call(this)
},show:function(x,y){this.initialize();
if(this.isVisible){return
}x=x||0;
y=y||0;
if(this.parentMenu){var oldChildMenu=this.parentMenu.childMenu;
if(oldChildMenu&&oldChildMenu!=this){oldChildMenu.destroy()
}this.parentMenu.childMenu=this
}else{addEvent(Firebug.chrome.document,"mousedown",this.handleWindowMouseDown)
}this.elementStyle.display="block";
this.elementStyle.visibility="hidden";
var size=Firebug.chrome.getSize();
x=Math.min(x,size.width-this.element.clientWidth-10);
x=Math.max(x,0);
y=Math.min(y,size.height-this.element.clientHeight-10);
y=Math.max(y,0);
this.elementStyle.left=x+"px";
this.elementStyle.top=y+"px";
this.elementStyle.visibility="visible";
this.isVisible=true;
if(isFunction(this.onShow)){this.onShow.apply(this,arguments)
}},hide:function(){this.clearHideTimeout();
this.clearShowChildTimeout();
if(!this.isVisible){return
}this.elementStyle.display="none";
if(this.childMenu){this.childMenu.destroy();
this.childMenu=null
}if(this.parentTarget){removeClass(this.parentTarget,"fbMenuGroupSelected")
}this.isVisible=false;
this.shutdown();
if(isFunction(this.onHide)){this.onHide.apply(this,arguments)
}},showChildMenu:function(target){var id=target.getAttribute("child");
var parent=this;
var target=target;
this.showChildTimeout=Firebug.chrome.window.setTimeout(function(){var box=Firebug.chrome.getElementBox(target);
var childMenuObject=menuMap.hasOwnProperty(id)?menuMap[id]:{element:$(id)};
var childMenu=new Menu(extend(childMenuObject,{parentMenu:parent,parentTarget:target}));
var offsetLeft=isIE6?-1:-6;
childMenu.show(box.left+box.width+offsetLeft,box.top-6);
setClass(target,"fbMenuGroupSelected")
},350)
},clearHideTimeout:function(){if(this.hideTimeout){Firebug.chrome.window.clearTimeout(this.hideTimeout);
delete this.hideTimeout
}},clearShowChildTimeout:function(){if(this.showChildTimeout){Firebug.chrome.window.clearTimeout(this.showChildTimeout);
this.showChildTimeout=null
}},handleMouseDown:function(event){cancelEvent(event,true);
var topParent=this;
while(topParent.parentMenu){topParent=topParent.parentMenu
}var target=event.target||event.srcElement;
target=getAncestorByClass(target,"fbMenuOption");
if(!target||hasClass(target,"fbMenuGroup")){return false
}if(target&&!hasClass(target,"fbMenuDisabled")){var type=target.getAttribute("type");
if(type=="checkbox"){var checked=target.getAttribute("checked");
var value=target.getAttribute("value");
var wasChecked=hasClass(target,"fbMenuChecked");
if(wasChecked){removeClass(target,"fbMenuChecked");
target.setAttribute("checked","")
}else{setClass(target,"fbMenuChecked");
target.setAttribute("checked","true")
}if(isFunction(this.onCheck)){this.onCheck.call(this,target,value,!wasChecked)
}}if(type=="radiobutton"){var selectedRadios=getElementsByClass(target.parentNode,"fbMenuRadioSelected");
var group=target.getAttribute("group");
for(var i=0,length=selectedRadios.length;
i<length;
i++){radio=selectedRadios[i];
if(radio.getAttribute("group")==group){removeClass(radio,"fbMenuRadioSelected");
radio.setAttribute("selected","")
}}setClass(target,"fbMenuRadioSelected");
target.setAttribute("selected","true")
}var handler=null;
var cmd=target.command;
if(isFunction(cmd)){handler=cmd
}else{if(typeof cmd=="string"){handler=this[cmd]
}}var closeMenu=true;
if(handler){closeMenu=handler.call(this,target)!==false
}if(closeMenu){topParent.hide()
}}return false
},handleWindowMouseDown:function(event){var target=event.target||event.srcElement;
target=getAncestorByClass(target,"fbMenu");
if(!target){removeEvent(Firebug.chrome.document,"mousedown",this.handleWindowMouseDown);
this.hide()
}},handleMouseOver:function(event){this.clearHideTimeout();
this.clearShowChildTimeout();
var target=event.target||event.srcElement;
target=getAncestorByClass(target,"fbMenuOption");
if(!target){return
}var childMenu=this.childMenu;
if(childMenu){removeClass(childMenu.parentTarget,"fbMenuGroupSelected");
if(childMenu.parentTarget!=target&&childMenu.isVisible){childMenu.clearHideTimeout();
childMenu.hideTimeout=Firebug.chrome.window.setTimeout(function(){childMenu.destroy()
},300)
}}if(hasClass(target,"fbMenuGroup")){this.showChildMenu(target)
}}});
append(Menu,{register:function(object){menuMap[object.id]=object
},check:function(element){setClass(element,"fbMenuChecked");
element.setAttribute("checked","true")
},uncheck:function(element){removeClass(element,"fbMenuChecked");
element.setAttribute("checked","")
},disable:function(element){setClass(element,"fbMenuDisabled")
},enable:function(element){removeClass(element,"fbMenuDisabled")
}});
function StatusBar(){}StatusBar.prototype=extend(Controller,{})
}});
FBL.ns(function(){with(FBL){var refreshDelay=300;
var shouldFixElementFromPoint=isOpera||isSafari&&browserVersion<"532";
var evalError="___firebug_evaluation_error___";
var pixelsPerInch;
var resetStyle="margin:0; padding:0; border:0; position:absolute; overflow:hidden; display:block;";
var offscreenStyle=resetStyle+"top:-1234px; left:-1234px;";
FBL.Context=function(win){this.window=win.window;
this.document=win.document;
this.browser=Env.browser;
if(isIE&&!this.window.eval){this.window.execScript("null");
if(!this.window.eval){throw new Error("Firebug Error: eval() method not found in this window")
}}this.eval=this.window.eval("new Function('try{ return window.eval.apply(window,arguments) }catch(E){ E."+evalError+"=true; return E }')")
};
FBL.Context.prototype={browser:null,loaded:true,setTimeout:function(fn,delay){var win=this.window;
if(win.setTimeout==this.setTimeout){throw new Error("setTimeout recursion")
}var timeout=win.setTimeout.apply?win.setTimeout.apply(win,arguments):win.setTimeout(fn,delay);
if(!this.timeouts){this.timeouts={}
}this.timeouts[timeout]=1;
return timeout
},clearTimeout:function(timeout){clearTimeout(timeout);
if(this.timeouts){delete this.timeouts[timeout]
}},setInterval:function(fn,delay){var win=this.window;
var timeout=win.setInterval.apply?win.setInterval.apply(win,arguments):win.setInterval(fn,delay);
if(!this.intervals){this.intervals={}
}this.intervals[timeout]=1;
return timeout
},clearInterval:function(timeout){clearInterval(timeout);
if(this.intervals){delete this.intervals[timeout]
}},invalidatePanels:function(){if(!this.invalidPanels){this.invalidPanels={}
}for(var i=0;
i<arguments.length;
++i){var panelName=arguments[i];
if(!Firebug.chrome||!Firebug.chrome.selectedPanel){return
}var panel=Firebug.chrome.selectedPanel.sidePanelBar?Firebug.chrome.selectedPanel.sidePanelBar.getPanel(panelName,true):null;
if(panel&&!panel.noRefresh){this.invalidPanels[panelName]=1
}}if(this.refreshTimeout){this.clearTimeout(this.refreshTimeout);
delete this.refreshTimeout
}this.refreshTimeout=this.setTimeout(bindFixed(function(){var invalids=[];
for(var panelName in this.invalidPanels){var panel=Firebug.chrome.selectedPanel.sidePanelBar?Firebug.chrome.selectedPanel.sidePanelBar.getPanel(panelName,true):null;
if(panel){if(panel.visible&&!panel.editing){panel.refresh()
}else{panel.needsRefresh=true
}if(panel.editing){invalids.push(panelName)
}}}delete this.invalidPanels;
delete this.refreshTimeout;
if(invalids.length){this.invalidatePanels.apply(this,invalids)
}},this),refreshDelay)
},evaluate:function(expr,context,api,errorHandler){context=context||"window";
var isObjectLiteral=trim(expr).indexOf("{")==0,cmd,result;
if(context=="window"){if(isObjectLiteral){cmd=api?"with("+api+"){ ("+expr+") }":"("+expr+")"
}else{cmd=api?"with("+api+"){ "+expr+" }":expr
}}else{cmd=api?"(function(arguments){ with("+api+"){ "+expr+" } }).call("+context+",undefined)":"(function(arguments){ "+expr+" }).call("+context+",undefined)"
}result=this.eval(cmd);
if(result&&result[evalError]){var msg=result.name?(result.name+": "):"";
msg+=result.message||result;
if(errorHandler){result=errorHandler(msg)
}else{result=msg
}}return result
},getWindowSize:function(){var width=0,height=0,el;
if(typeof this.window.innerWidth=="number"){width=this.window.innerWidth;
height=this.window.innerHeight
}else{if((el=this.document.documentElement)&&(el.clientHeight||el.clientWidth)){width=el.clientWidth;
height=el.clientHeight
}else{if((el=this.document.body)&&(el.clientHeight||el.clientWidth)){width=el.clientWidth;
height=el.clientHeight
}}}return{width:width,height:height}
},getWindowScrollSize:function(){var width=0,height=0,el;
if(!isIEQuiksMode&&(el=this.document.documentElement)&&(el.scrollHeight||el.scrollWidth)){width=el.scrollWidth;
height=el.scrollHeight
}if((el=this.document.body)&&(el.scrollHeight||el.scrollWidth)&&(el.scrollWidth>width||el.scrollHeight>height)){width=el.scrollWidth;
height=el.scrollHeight
}return{width:width,height:height}
},getWindowScrollPosition:function(){var top=0,left=0,el;
if(typeof this.window.pageYOffset=="number"){top=this.window.pageYOffset;
left=this.window.pageXOffset
}else{if((el=this.document.body)&&(el.scrollTop||el.scrollLeft)){top=el.scrollTop;
left=el.scrollLeft
}else{if((el=this.document.documentElement)&&(el.scrollTop||el.scrollLeft)){top=el.scrollTop;
left=el.scrollLeft
}}}return{top:top,left:left}
},getElementFromPoint:function(x,y){if(shouldFixElementFromPoint){var scroll=this.getWindowScrollPosition();
return this.document.elementFromPoint(x+scroll.left,y+scroll.top)
}else{return this.document.elementFromPoint(x,y)
}},getElementPosition:function(el){var left=0;
var top=0;
do{left+=el.offsetLeft;
top+=el.offsetTop
}while(el=el.offsetParent);
return{left:left,top:top}
},getElementBox:function(el){var result={};
if(el.getBoundingClientRect){var rect=el.getBoundingClientRect();
var offset=isIE?this.document.body.clientTop||this.document.documentElement.clientTop:0;
var scroll=this.getWindowScrollPosition();
result.top=Math.round(rect.top-offset+scroll.top);
result.left=Math.round(rect.left-offset+scroll.left);
result.height=Math.round(rect.bottom-rect.top);
result.width=Math.round(rect.right-rect.left)
}else{var position=this.getElementPosition(el);
result.top=position.top;
result.left=position.left;
result.height=el.offsetHeight;
result.width=el.offsetWidth
}return result
},getMeasurement:function(el,name){var result={value:0,unit:"px"};
var cssValue=this.getStyle(el,name);
if(!cssValue){return result
}if(cssValue.toLowerCase()=="auto"){return result
}var reMeasure=/(\d+\.?\d*)(.*)/;
var m=cssValue.match(reMeasure);
if(m){result.value=m[1]-0;
result.unit=m[2].toLowerCase()
}return result
},getMeasurementInPixels:function(el,name){if(!el){return null
}var m=this.getMeasurement(el,name);
var value=m.value;
var unit=m.unit;
if(unit=="px"){return value
}else{if(unit=="pt"){return this.pointsToPixels(name,value)
}else{if(unit=="em"){return this.emToPixels(el,value)
}else{if(unit=="%"){return this.percentToPixels(el,value)
}else{if(unit=="ex"){return this.exToPixels(el,value)
}}}}}},getMeasurementBox1:function(el,name){var sufixes=["Top","Left","Bottom","Right"];
var result=[];
for(var i=0,sufix;
sufix=sufixes[i];
i++){result[i]=Math.round(this.getMeasurementInPixels(el,name+sufix))
}return{top:result[0],left:result[1],bottom:result[2],right:result[3]}
},getMeasurementBox:function(el,name){var result=[];
var sufixes=name=="border"?["TopWidth","LeftWidth","BottomWidth","RightWidth"]:["Top","Left","Bottom","Right"];
if(isIE){var propName,cssValue;
var autoMargin=null;
for(var i=0,sufix;
sufix=sufixes[i];
i++){propName=name+sufix;
cssValue=el.currentStyle[propName]||el.style[propName];
if(cssValue=="auto"){if(!autoMargin){autoMargin=this.getCSSAutoMarginBox(el)
}result[i]=autoMargin[sufix.toLowerCase()]
}else{result[i]=this.getMeasurementInPixels(el,propName)
}}}else{for(var i=0,sufix;
sufix=sufixes[i];
i++){result[i]=this.getMeasurementInPixels(el,name+sufix)
}}return{top:result[0],left:result[1],bottom:result[2],right:result[3]}
},getCSSAutoMarginBox:function(el){if(isIE&&" meta title input script link a ".indexOf(" "+el.nodeName.toLowerCase()+" ")!=-1){return{top:0,left:0,bottom:0,right:0}
}if(isIE&&" h1 h2 h3 h4 h5 h6 h7 ul p ".indexOf(" "+el.nodeName.toLowerCase()+" ")==-1){return{top:0,left:0,bottom:0,right:0}
}var offsetTop=0;
if(false&&isIEStantandMode){var scrollSize=Firebug.browser.getWindowScrollSize();
offsetTop=scrollSize.height
}var box=this.document.createElement("div");
box.style.cssText="margin:0; padding:1px; border: 0; visibility: hidden;";
var clone=el.cloneNode(false);
var text=this.document.createTextNode("&nbsp;");
clone.appendChild(text);
box.appendChild(clone);
this.document.body.appendChild(box);
var marginTop=clone.offsetTop-box.offsetTop-1;
var marginBottom=box.offsetHeight-clone.offsetHeight-2-marginTop;
var marginLeft=clone.offsetLeft-box.offsetLeft-1;
var marginRight=box.offsetWidth-clone.offsetWidth-2-marginLeft;
this.document.body.removeChild(box);
return{top:marginTop+offsetTop,left:marginLeft,bottom:marginBottom-offsetTop,right:marginRight}
},getFontSizeInPixels:function(el){var size=this.getMeasurement(el,"fontSize");
if(size.unit=="px"){return size.value
}var computeDirtyFontSize=function(el,calibration){var div=this.document.createElement("div");
var divStyle=offscreenStyle;
if(calibration){divStyle+=" font-size:"+calibration+"px;"
}div.style.cssText=divStyle;
div.innerHTML="A";
el.appendChild(div);
var value=div.offsetHeight;
el.removeChild(div);
return value
};
var rate=200/225;
var value=computeDirtyFontSize(el);
return value*rate
},pointsToPixels:function(name,value,returnFloat){var axis=/Top$|Bottom$/.test(name)?"y":"x";
var result=value*pixelsPerInch[axis]/72;
return returnFloat?result:Math.round(result)
},emToPixels:function(el,value){if(!el){return null
}var fontSize=this.getFontSizeInPixels(el);
return Math.round(value*fontSize)
},exToPixels:function(el,value){if(!el){return null
}var div=this.document.createElement("div");
div.style.cssText=offscreenStyle+"width:"+value+"ex;";
el.appendChild(div);
var value=div.offsetWidth;
el.removeChild(div);
return value
},percentToPixels:function(el,value){if(!el){return null
}var div=this.document.createElement("div");
div.style.cssText=offscreenStyle+"width:"+value+"%;";
el.appendChild(div);
var value=div.offsetWidth;
el.removeChild(div);
return value
},getStyle:isIE?function(el,name){return el.currentStyle[name]||el.style[name]||undefined
}:function(el,name){return this.document.defaultView.getComputedStyle(el,null)[name]||el.style[name]||undefined
}}
}});
FBL.ns(function(){with(FBL){var WindowDefaultOptions={type:"frame",id:"FirebugUI"},commandLine,fbTop,fbContent,fbContentStyle,fbBottom,fbBtnInspect,fbToolbar,fbPanelBox1,fbPanelBox1Style,fbPanelBox2,fbPanelBox2Style,fbPanelBar2Box,fbPanelBar2BoxStyle,fbHSplitter,fbVSplitter,fbVSplitterStyle,fbPanel1,fbPanel1Style,fbPanel2,fbPanel2Style,fbConsole,fbConsoleStyle,fbHTML,fbCommandLine,fbLargeCommandLine,fbLargeCommandButtons,topHeight,topPartialHeight,chromeRedrawSkipRate=isIE?75:isOpera?80:75,lastSelectedPanelName,focusCommandLineState=0,lastFocusedPanelName,lastHSplitterMouseMove=0,onHSplitterMouseMoveBuffer=null,onHSplitterMouseMoveTimer=null,lastVSplitterMouseMove=0;
FBL.defaultPersistedState={isOpen:false,height:300,sidePanelWidth:350,selectedPanelName:"Console",selectedHTMLElementId:null,htmlSelectionStack:[]};
FBL.FirebugChrome={chromeMap:{},htmlSelectionStack:[],create:function(){if(FBTrace.DBG_INITIALIZE){FBTrace.sysout("FirebugChrome.create","creating chrome window")
}createChromeWindow()
},initialize:function(){if(FBTrace.DBG_INITIALIZE){FBTrace.sysout("FirebugChrome.initialize","initializing chrome window")
}if(Env.chrome.type=="frame"||Env.chrome.type=="div"){ChromeMini.create(Env.chrome)
}var chrome=Firebug.chrome=new Chrome(Env.chrome);
FirebugChrome.chromeMap[chrome.type]=chrome;
addGlobalEvent("keydown",onGlobalKeyDown);
if(Env.Options.enablePersistent&&chrome.type=="popup"){var frame=FirebugChrome.chromeMap.frame;
if(frame){frame.close()
}chrome.initialize()
}},clone:function(FBChrome){for(var name in FBChrome){var prop=FBChrome[name];
if(FBChrome.hasOwnProperty(name)&&!isFunction(prop)){this[name]=prop
}}}};
var createChromeWindow=function(options){options=extend(WindowDefaultOptions,options||{});
var browserWin=Env.browser.window;
var browserContext=new Context(browserWin);
var prefs=Store.get("FirebugLite");
var persistedState=prefs&&prefs.persistedState||defaultPersistedState;
var chrome={},context=options.context||Env.browser,type=chrome.type=Env.Options.enablePersistent?"popup":options.type,isChromeFrame=type=="frame",useLocalSkin=Env.useLocalSkin,url=useLocalSkin?Env.Location.skin:"about:blank",body=context.document.getElementsByTagName("body")[0],formatNode=function(node){if(!Env.isDebugMode){node.firebugIgnore=true
}var browserWinSize=browserContext.getWindowSize();
var height=persistedState.height||300;
height=Math.min(browserWinSize.height,height);
height=Math.max(200,height);
node.style.border="0";
node.style.visibility="hidden";
node.style.zIndex="2147483647";
node.style.position=noFixedPosition?"absolute":"fixed";
node.style.width="100%";
node.style.left="0";
node.style.bottom=noFixedPosition?"-1px":"0";
node.style.height=height+"px"
},createChromeDiv=function(){var node=chrome.node=createGlobalElement("div"),style=createGlobalElement("style"),css=FirebugChrome.Skin.CSS,rules=".fbBody *{margin:0;padding:0;font-size:11px;line-height:13px;color:inherit;}"+css+".fbBody #fbHSplitter{position:absolute !important;} .fbBody #fbHTML span{line-height:14px;} .fbBody .lineNo div{line-height:inherit !important;}";
style.type="text/css";
if(style.styleSheet){style.styleSheet.cssText=rules
}else{style.appendChild(context.document.createTextNode(rules))
}document.getElementsByTagName("head")[0].appendChild(style);
node.className="fbBody";
node.style.overflow="hidden";
node.innerHTML=getChromeDivTemplate();
if(isIE){setTimeout(function(){node.firstChild.style.height="1px";
node.firstChild.style.position="static"
},0)
}formatNode(node);
body.appendChild(node);
chrome.window=window;
chrome.document=document;
onChromeLoad(chrome)
};
try{if(type=="div"){createChromeDiv();
return
}else{if(isChromeFrame){var node=chrome.node=createGlobalElement("iframe");
node.setAttribute("src",url);
node.setAttribute("frameBorder","0");
formatNode(node);
body.appendChild(node);
node.id=options.id
}else{var height=persistedState.popupHeight||300;
var browserWinSize=browserContext.getWindowSize();
var browserWinLeft=typeof browserWin.screenX=="number"?browserWin.screenX:browserWin.screenLeft;
var popupLeft=typeof persistedState.popupLeft=="number"?persistedState.popupLeft:browserWinLeft;
var browserWinTop=typeof browserWin.screenY=="number"?browserWin.screenY:browserWin.screenTop;
var popupTop=typeof persistedState.popupTop=="number"?persistedState.popupTop:Math.max(0,Math.min(browserWinTop+browserWinSize.height-height,screen.availHeight-height-61));
var popupWidth=typeof persistedState.popupWidth=="number"?persistedState.popupWidth:Math.max(0,Math.min(browserWinSize.width,screen.availWidth-10));
var popupHeight=typeof persistedState.popupHeight=="number"?persistedState.popupHeight:300;
var options=["true,top=",popupTop,",left=",popupLeft,",height=",popupHeight,",width=",popupWidth,",resizable"].join(""),node=chrome.node=context.window.open(url,"popup",options);
if(node){try{node.focus()
}catch(E){alert("Firebug Error: Firebug popup was blocked.");
return
}}else{alert("Firebug Error: Firebug popup was blocked.");
return
}}}if(!useLocalSkin){var tpl=getChromeTemplate(!isChromeFrame),doc=isChromeFrame?node.contentWindow.document:node.document;
doc.write(tpl);
doc.close()
}var win,waitDelay=useLocalSkin?isChromeFrame?200:300:100,waitForWindow=function(){if(isChromeFrame&&(win=node.contentWindow)&&node.contentWindow.document.getElementById("fbCommandLine")||!isChromeFrame&&(win=node.window)&&node.document&&node.document.getElementById("fbCommandLine")){chrome.window=win.window;
chrome.document=win.document;
setTimeout(function(){onChromeLoad(chrome)
},useLocalSkin?200:0)
}else{setTimeout(waitForWindow,waitDelay)
}};
waitForWindow()
}catch(e){var msg=e.message||e;
if(/access/i.test(msg)){if(isChromeFrame){body.removeChild(node)
}else{if(type=="popup"){node.close()
}}createChromeDiv()
}else{alert("Firebug Error: Firebug GUI could not be created.")
}}};
var onChromeLoad=function onChromeLoad(chrome){Env.chrome=chrome;
if(FBTrace.DBG_INITIALIZE){FBTrace.sysout("Chrome onChromeLoad","chrome window loaded")
}if(Env.Options.enablePersistent){Env.FirebugChrome=FirebugChrome;
chrome.window.Firebug=chrome.window.Firebug||{};
chrome.window.Firebug.SharedEnv=Env;
if(Env.isDevelopmentMode){Env.browser.window.FBDev.loadChromeApplication(chrome)
}else{var doc=chrome.document;
var script=doc.createElement("script");
script.src=Env.Location.app+"#remote,persist";
doc.getElementsByTagName("head")[0].appendChild(script)
}}else{if(chrome.type=="frame"||chrome.type=="div"){setTimeout(function(){FBL.Firebug.initialize()
},0)
}else{if(chrome.type=="popup"){var oldChrome=FirebugChrome.chromeMap.frame;
var newChrome=new Chrome(chrome);
dispatch(newChrome.panelMap,"detach",[oldChrome,newChrome]);
newChrome.reattach(oldChrome,newChrome)
}}}};
var getChromeDivTemplate=function(){return FirebugChrome.Skin.HTML
};
var getChromeTemplate=function(isPopup){var tpl=FirebugChrome.Skin;
var r=[],i=-1;
r[++i]='<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/DTD/strict.dtd">';
r[++i]="<html><head><title>";
r[++i]=Firebug.version;
r[++i]="</title><style>html,body{margin:0;padding:0;overflow:hidden;}";
r[++i]=tpl.CSS;
r[++i]="</style>";
r[++i]='</head><body class="fbBody'+(isPopup?" FirebugPopup":"")+'">';
r[++i]=tpl.HTML;
r[++i]="</body></html>";
return r.join("")
};
var Chrome=function Chrome(chrome){var type=chrome.type;
var Base=type=="frame"||type=="div"?ChromeFrameBase:ChromePopupBase;
append(this,Base);
append(this,chrome);
append(this,new Context(chrome.window));
FirebugChrome.chromeMap[type]=this;
Firebug.chrome=this;
Env.chrome=chrome.window;
this.commandLineVisible=false;
this.sidePanelVisible=false;
this.create();
return this
};
var ChromeBase={};
append(ChromeBase,Controller);
append(ChromeBase,PanelBar);
append(ChromeBase,{node:null,type:null,document:null,window:null,sidePanelVisible:false,commandLineVisible:false,largeCommandLineVisible:false,inspectButton:null,create:function(){PanelBar.create.call(this);
if(Firebug.Inspector){this.inspectButton=new Button({type:"toggle",element:$("fbChrome_btInspect"),owner:Firebug.Inspector,onPress:Firebug.Inspector.startInspecting,onUnpress:Firebug.Inspector.stopInspecting})
}},destroy:function(){if(Firebug.Inspector){this.inspectButton.destroy()
}PanelBar.destroy.call(this);
this.shutdown()
},testMenu:function(){var firebugMenu=new Menu({id:"fbFirebugMenu",items:[{label:"Open Firebug",type:"shortcut",key:isFirefox?"Shift+F12":"F12",checked:true,command:"toggleChrome"},{label:"Open Firebug in New Window",type:"shortcut",key:isFirefox?"Ctrl+Shift+F12":"Ctrl+F12",command:"openPopup"},{label:"Inspect Element",type:"shortcut",key:"Ctrl+Shift+C",command:"toggleInspect"},{label:"Command Line",type:"shortcut",key:"Ctrl+Shift+L",command:"focusCommandLine"},"-",{label:"Options",type:"group",child:"fbFirebugOptionsMenu"},"-",{label:"Firebug Lite Website...",command:"visitWebsite"},{label:"Discussion Group...",command:"visitDiscussionGroup"},{label:"Issue Tracker...",command:"visitIssueTracker"}],onHide:function(){iconButton.restore()
},toggleChrome:function(){Firebug.chrome.toggle()
},openPopup:function(){Firebug.chrome.toggle(true,true)
},toggleInspect:function(){Firebug.Inspector.toggleInspect()
},focusCommandLine:function(){Firebug.chrome.focusCommandLine()
},visitWebsite:function(){this.visit("http://getfirebug.com/lite.html")
},visitDiscussionGroup:function(){this.visit("http://groups.google.com/group/firebug")
},visitIssueTracker:function(){this.visit("http://code.google.com/p/fbug/issues/list")
},visit:function(url){window.open(url)
}});
var firebugOptionsMenu={id:"fbFirebugOptionsMenu",getItems:function(){var cookiesDisabled=!Firebug.saveCookies;
return[{label:"Start Opened",type:"checkbox",value:"startOpened",checked:Firebug.startOpened,disabled:cookiesDisabled},{label:"Start in New Window",type:"checkbox",value:"startInNewWindow",checked:Firebug.startInNewWindow,disabled:cookiesDisabled},{label:"Show Icon When Hidden",type:"checkbox",value:"showIconWhenHidden",checked:Firebug.showIconWhenHidden,disabled:cookiesDisabled},{label:"Override Console Object",type:"checkbox",value:"overrideConsole",checked:Firebug.overrideConsole,disabled:cookiesDisabled},{label:"Ignore Firebug Elements",type:"checkbox",value:"ignoreFirebugElements",checked:Firebug.ignoreFirebugElements,disabled:cookiesDisabled},{label:"Disable When Firebug Active",type:"checkbox",value:"disableWhenFirebugActive",checked:Firebug.disableWhenFirebugActive,disabled:cookiesDisabled},{label:"Disable XHR Listener",type:"checkbox",value:"disableXHRListener",checked:Firebug.disableXHRListener,disabled:cookiesDisabled},{label:"Disable Resource Fetching",type:"checkbox",value:"disableResourceFetching",checked:Firebug.disableResourceFetching,disabled:cookiesDisabled},{label:"Enable Trace Mode",type:"checkbox",value:"enableTrace",checked:Firebug.enableTrace,disabled:cookiesDisabled},{label:"Enable Persistent Mode (experimental)",type:"checkbox",value:"enablePersistent",checked:Firebug.enablePersistent,disabled:cookiesDisabled},"-",{label:"Reset All Firebug Options",command:"restorePrefs",disabled:cookiesDisabled}]
},onCheck:function(target,value,checked){Firebug.setPref(value,checked)
},restorePrefs:function(target){Firebug.erasePrefs();
if(target){this.updateMenu(target)
}},updateMenu:function(target){var options=getElementsByClass(target.parentNode,"fbMenuOption");
var firstOption=options[0];
var enabled=Firebug.saveCookies;
if(enabled){Menu.check(firstOption)
}else{Menu.uncheck(firstOption)
}if(enabled){Menu.check(options[0])
}else{Menu.uncheck(options[0])
}for(var i=1,length=options.length;
i<length;
i++){var option=options[i];
var value=option.getAttribute("value");
var pref=Firebug[value];
if(pref){Menu.check(option)
}else{Menu.uncheck(option)
}if(enabled){Menu.enable(option)
}else{Menu.disable(option)
}}}};
Menu.register(firebugOptionsMenu);
var menu=firebugMenu;
var testMenuClick=function(event){cancelEvent(event,true);
var target=event.target||event.srcElement;
if(menu.isVisible){menu.hide()
}else{var offsetLeft=isIE6?1:-4,chrome=Firebug.chrome,box=chrome.getElementBox(target),offset=chrome.type=="div"?chrome.getElementPosition(chrome.node):{top:0,left:0};
menu.show(box.left+offsetLeft-offset.left,box.top+box.height-5-offset.top)
}return false
};
var iconButton=new IconButton({type:"toggle",element:$("fbFirebugButton"),onClick:testMenuClick});
iconButton.initialize()
},initialize:function(){if(Env.bookmarkletOutdated){Firebug.Console.logFormatted(["A new bookmarklet version is available. Please visit http://getfirebug.com/firebuglite#Install and update it."],Firebug.context,"warn")
}if(Firebug.Console){Firebug.Console.flush()
}if(Firebug.Trace){FBTrace.flush(Firebug.Trace)
}if(FBTrace.DBG_INITIALIZE){FBTrace.sysout("Firebug.chrome.initialize","initializing chrome application")
}Controller.initialize.call(this);
PanelBar.initialize.call(this);
fbTop=$("fbTop");
fbContent=$("fbContent");
fbContentStyle=fbContent.style;
fbBottom=$("fbBottom");
fbBtnInspect=$("fbBtnInspect");
fbToolbar=$("fbToolbar");
fbPanelBox1=$("fbPanelBox1");
fbPanelBox1Style=fbPanelBox1.style;
fbPanelBox2=$("fbPanelBox2");
fbPanelBox2Style=fbPanelBox2.style;
fbPanelBar2Box=$("fbPanelBar2Box");
fbPanelBar2BoxStyle=fbPanelBar2Box.style;
fbHSplitter=$("fbHSplitter");
fbVSplitter=$("fbVSplitter");
fbVSplitterStyle=fbVSplitter.style;
fbPanel1=$("fbPanel1");
fbPanel1Style=fbPanel1.style;
fbPanel2=$("fbPanel2");
fbPanel2Style=fbPanel2.style;
fbConsole=$("fbConsole");
fbConsoleStyle=fbConsole.style;
fbHTML=$("fbHTML");
fbCommandLine=$("fbCommandLine");
fbLargeCommandLine=$("fbLargeCommandLine");
fbLargeCommandButtons=$("fbLargeCommandButtons");
topHeight=fbTop.offsetHeight;
topPartialHeight=fbToolbar.offsetHeight;
disableTextSelection($("fbToolbar"));
disableTextSelection($("fbPanelBarBox"));
disableTextSelection($("fbPanelBar1"));
disableTextSelection($("fbPanelBar2"));
if(isIE6&&Firebug.Selector){var as=$$(".fbHover");
for(var i=0,a;
a=as[i];
i++){a.setAttribute("href","javascript:void(0)")
}}if(Firebug.Inspector){this.inspectButton.initialize()
}this.addController([$("fbLargeCommandLineIcon"),"click",this.showLargeCommandLine]);
var self=this;
setTimeout(function(){self.selectPanel(Firebug.context.persistedState.selectedPanelName);
if(Firebug.context.persistedState.selectedPanelName=="Console"&&Firebug.CommandLine){Firebug.chrome.focusCommandLine()
}},0);
var onPanelMouseDown=function onPanelMouseDown(event){var target=event.target||event.srcElement;
if(FBL.isLeftClick(event)){var editable=FBL.getAncestorByClass(target,"editable");
if(editable){Firebug.Editor.startEditing(editable);
FBL.cancelEvent(event)
}else{if(!hasClass(target,"textEditorInner")){Firebug.Editor.stopEditing()
}}}else{if(FBL.isMiddleClick(event)&&Firebug.getRepNode(target)){FBL.cancelEvent(event)
}}};
Firebug.getElementPanel=function(element){var panelNode=getAncestorByClass(element,"fbPanel");
var id=panelNode.id.substr(2);
var panel=Firebug.chrome.panelMap[id];
if(!panel){if(Firebug.chrome.selectedPanel.sidePanelBar){panel=Firebug.chrome.selectedPanel.sidePanelBar.panelMap[id]
}}return panel
};
var onKeyCodeListenersMap=[];
var onKeyCodeListen=function(event){for(var keyCode in onKeyCodeListenersMap){var listeners=onKeyCodeListenersMap[keyCode];
for(var i=0,listener;
listener=listeners[i];
i++){var filter=listener.filter||FBL.noKeyModifiers;
if(event.keyCode==keyCode&&(!filter||filter(event))){listener.listener();
FBL.cancelEvent(event,true);
return false
}}}};
addEvent(Firebug.chrome.document,"keydown",onKeyCodeListen);
Firebug.chrome.keyCodeListen=function(key,filter,listener,capture){var keyCode=KeyEvent["DOM_VK_"+key];
if(!onKeyCodeListenersMap[keyCode]){onKeyCodeListenersMap[keyCode]=[]
}onKeyCodeListenersMap[keyCode].push({filter:filter,listener:listener});
return keyCode
};
Firebug.chrome.keyIgnore=function(keyCode){onKeyCodeListenersMap[keyCode]=null;
delete onKeyCodeListenersMap[keyCode]
};
this.addController([fbPanel1,"mousedown",onPanelMouseDown],[fbPanel2,"mousedown",onPanelMouseDown]);
if(FBL.domplate){this.testMenu()
}},shutdown:function(){if(Firebug.Inspector){this.inspectButton.shutdown()
}restoreTextSelection($("fbToolbar"));
restoreTextSelection($("fbPanelBarBox"));
restoreTextSelection($("fbPanelBar1"));
restoreTextSelection($("fbPanelBar2"));
Controller.shutdown.call(this);
PanelBar.shutdown.call(this);
fbTop=null;
fbContent=null;
fbContentStyle=null;
fbBottom=null;
fbBtnInspect=null;
fbToolbar=null;
fbPanelBox1=null;
fbPanelBox1Style=null;
fbPanelBox2=null;
fbPanelBox2Style=null;
fbPanelBar2Box=null;
fbPanelBar2BoxStyle=null;
fbHSplitter=null;
fbVSplitter=null;
fbVSplitterStyle=null;
fbPanel1=null;
fbPanel1Style=null;
fbPanel2=null;
fbConsole=null;
fbConsoleStyle=null;
fbHTML=null;
fbCommandLine=null;
fbLargeCommandLine=null;
fbLargeCommandButtons=null;
topHeight=null;
topPartialHeight=null
},toggle:function(forceOpen,popup){if(popup){this.detach()
}else{if(isOpera&&Firebug.chrome.type=="popup"&&Firebug.chrome.node.closed){var frame=FirebugChrome.chromeMap.frame;
frame.reattach();
FirebugChrome.chromeMap.popup=null;
frame.open();
return
}if(Firebug.chrome.type=="popup"){return
}var shouldOpen=forceOpen||!Firebug.context.persistedState.isOpen;
if(shouldOpen){this.open()
}else{this.close()
}}},detach:function(){if(!FirebugChrome.chromeMap.popup){this.close();
createChromeWindow({type:"popup"})
}},reattach:function(oldChrome,newChrome){Firebug.browser.window.Firebug=Firebug;
var newPanelMap=newChrome.panelMap;
var oldPanelMap=oldChrome.panelMap;
var panel;
for(var name in newPanelMap){panel=newPanelMap[name];
if(panel.options.innerHTMLSync){panel.panelNode.innerHTML=oldPanelMap[name].panelNode.innerHTML
}}Firebug.chrome=newChrome;
if(newChrome.type=="popup"){newChrome.initialize()
}else{Firebug.context.persistedState.selectedPanelName=oldChrome.selectedPanel.name
}dispatch(newPanelMap,"reattach",[oldChrome,newChrome])
},draw:function(){var size=this.getSize();
var commandLineHeight=Firebug.chrome.commandLineVisible?fbCommandLine.offsetHeight:0,y=Math.max(size.height,topHeight),heightValue=Math.max(y-topHeight-commandLineHeight,0),height=heightValue+"px",sideWidthValue=Firebug.chrome.sidePanelVisible?Firebug.context.persistedState.sidePanelWidth:0,width=Math.max(size.width-sideWidthValue,0)+"px";
fbPanelBox1Style.height=height;
fbPanel1Style.height=height;
if(isIE||isOpera){fbVSplitterStyle.height=Math.max(y-topPartialHeight-commandLineHeight,0)+"px"
}fbPanelBox1Style.width=width;
fbPanel1Style.width=width;
if(Firebug.chrome.sidePanelVisible){sideWidthValue=Math.max(sideWidthValue-6,0);
var sideWidth=sideWidthValue+"px";
fbPanelBox2Style.width=sideWidth;
fbVSplitterStyle.right=sideWidth;
if(Firebug.chrome.largeCommandLineVisible){fbLargeCommandLine=$("fbLargeCommandLine");
fbLargeCommandLine.style.height=heightValue-4+"px";
fbLargeCommandLine.style.width=sideWidthValue-2+"px";
fbLargeCommandButtons=$("fbLargeCommandButtons");
fbLargeCommandButtons.style.width=sideWidth
}else{fbPanel2Style.height=height;
fbPanel2Style.width=sideWidth;
fbPanelBar2BoxStyle.width=sideWidth
}}},getSize:function(){return this.type=="div"?{height:this.node.offsetHeight,width:this.node.offsetWidth}:this.getWindowSize()
},resize:function(){var self=this;
setTimeout(function(){self.draw();
if(noFixedPosition&&(self.type=="frame"||self.type=="div")){self.fixIEPosition()
}},0)
},layout:function(panel){if(FBTrace.DBG_CHROME){FBTrace.sysout("Chrome.layout","")
}var options=panel.options;
changeCommandLineVisibility(options.hasCommandLine);
changeSidePanelVisibility(panel.hasSidePanel);
Firebug.chrome.draw()
},showLargeCommandLine:function(hideToggleIcon){var chrome=Firebug.chrome;
if(!chrome.largeCommandLineVisible){chrome.largeCommandLineVisible=true;
if(chrome.selectedPanel.options.hasCommandLine){if(Firebug.CommandLine){Firebug.CommandLine.blur()
}changeCommandLineVisibility(false)
}changeSidePanelVisibility(true);
fbLargeCommandLine.style.display="block";
fbLargeCommandButtons.style.display="block";
fbPanel2Style.display="none";
fbPanelBar2BoxStyle.display="none";
chrome.draw();
fbLargeCommandLine.focus();
if(Firebug.CommandLine){Firebug.CommandLine.setMultiLine(true)
}}},hideLargeCommandLine:function(){if(Firebug.chrome.largeCommandLineVisible){Firebug.chrome.largeCommandLineVisible=false;
if(Firebug.CommandLine){Firebug.CommandLine.setMultiLine(false)
}fbLargeCommandLine.blur();
fbPanel2Style.display="block";
fbPanelBar2BoxStyle.display="block";
fbLargeCommandLine.style.display="none";
fbLargeCommandButtons.style.display="none";
changeSidePanelVisibility(false);
if(Firebug.chrome.selectedPanel.options.hasCommandLine){changeCommandLineVisibility(true)
}Firebug.chrome.draw()
}},focusCommandLine:function(){var selectedPanelName=this.selectedPanel.name,panelToSelect;
if(focusCommandLineState==0||selectedPanelName!="Console"){focusCommandLineState=0;
lastFocusedPanelName=selectedPanelName;
panelToSelect="Console"
}if(focusCommandLineState==1){panelToSelect=lastFocusedPanelName
}this.selectPanel(panelToSelect);
try{if(Firebug.CommandLine){if(panelToSelect=="Console"){Firebug.CommandLine.focus()
}else{Firebug.CommandLine.blur()
}}}catch(e){}focusCommandLineState=++focusCommandLineState%2
}});
var ChromeFrameBase=extend(ChromeBase,{create:function(){ChromeBase.create.call(this);
if(isFirefox){this.node.style.display="block"
}if(Env.Options.startInNewWindow){this.close();
this.toggle(true,true);
return
}if(Env.Options.startOpened){this.open()
}else{this.close()
}},destroy:function(){var size=Firebug.chrome.getWindowSize();
Firebug.context.persistedState.height=size.height;
if(Firebug.saveCookies){Firebug.savePrefs()
}removeGlobalEvent("keydown",onGlobalKeyDown);
ChromeBase.destroy.call(this);
this.document=null;
delete this.document;
this.window=null;
delete this.window;
this.node.parentNode.removeChild(this.node);
this.node=null;
delete this.node
},initialize:function(){ChromeBase.initialize.call(this);
this.addController([Firebug.browser.window,"resize",this.resize],[$("fbWindow_btClose"),"click",this.close],[$("fbWindow_btDetach"),"click",this.detach],[$("fbWindow_btDeactivate"),"click",this.deactivate]);
if(!Env.Options.enablePersistent){this.addController([Firebug.browser.window,"unload",Firebug.shutdown])
}if(noFixedPosition){this.addController([Firebug.browser.window,"scroll",this.fixIEPosition])
}fbVSplitter.onmousedown=onVSplitterMouseDown;
fbHSplitter.onmousedown=onHSplitterMouseDown;
this.isInitialized=true
},shutdown:function(){fbVSplitter.onmousedown=null;
fbHSplitter.onmousedown=null;
ChromeBase.shutdown.apply(this);
this.isInitialized=false
},reattach:function(){var frame=FirebugChrome.chromeMap.frame;
ChromeBase.reattach(FirebugChrome.chromeMap.popup,this)
},open:function(){if(!Firebug.context.persistedState.isOpen){Firebug.context.persistedState.isOpen=true;
if(Env.isChromeExtension){localStorage.setItem("Firebug","1,1")
}var node=this.node;
node.style.visibility="hidden";
if(Firebug.showIconWhenHidden){if(ChromeMini.isInitialized){ChromeMini.shutdown()
}}else{node.style.display="block"
}var main=$("fbChrome");
main.style.display="";
var self=this;
node.style.visibility="visible";
setTimeout(function(){self.initialize();
if(noFixedPosition){self.fixIEPosition()
}self.draw()
},10)
}},close:function(){if(Firebug.context.persistedState.isOpen){if(this.isInitialized){this.shutdown()
}Firebug.context.persistedState.isOpen=false;
if(Env.isChromeExtension){localStorage.setItem("Firebug","1,0")
}var node=this.node;
if(Firebug.showIconWhenHidden){node.style.visibility="hidden";
var main=$("fbChrome",FirebugChrome.chromeMap.frame.document);
main.style.display="none";
ChromeMini.initialize();
node.style.visibility="visible"
}else{node.style.display="none"
}}},deactivate:function(){if(Env.isChromeExtension){localStorage.removeItem("Firebug");
Firebug.GoogleChrome.dispatch("FB_deactivate");
Firebug.chrome.close()
}else{Firebug.shutdown()
}},fixIEPosition:function(){var doc=this.document;
var offset=isIE?doc.body.clientTop||doc.documentElement.clientTop:0;
var size=Firebug.browser.getWindowSize();
var scroll=Firebug.browser.getWindowScrollPosition();
var maxHeight=size.height;
var height=this.node.offsetHeight;
var bodyStyle=doc.body.currentStyle;
this.node.style.top=maxHeight-height+scroll.top+"px";
if((this.type=="frame"||this.type=="div")&&(bodyStyle.marginLeft||bodyStyle.marginRight)){this.node.style.width=size.width+"px"
}if(fbVSplitterStyle){fbVSplitterStyle.right=Firebug.context.persistedState.sidePanelWidth+"px"
}this.draw()
}});
var ChromeMini=extend(Controller,{create:function(chrome){append(this,chrome);
this.type="mini"
},initialize:function(){Controller.initialize.apply(this);
var doc=FirebugChrome.chromeMap.frame.document;
var mini=$("fbMiniChrome",doc);
mini.style.display="block";
var miniIcon=$("fbMiniIcon",doc);
var width=miniIcon.offsetWidth+10;
miniIcon.title="Open "+Firebug.version;
var errors=$("fbMiniErrors",doc);
if(errors.offsetWidth){width+=errors.offsetWidth+10
}var node=this.node;
node.style.height="27px";
node.style.width=width+"px";
node.style.left="";
node.style.right=0;
if(this.node.nodeName.toLowerCase()=="iframe"){node.setAttribute("allowTransparency","true");
this.document.body.style.backgroundColor="transparent"
}else{node.style.background="transparent"
}if(noFixedPosition){this.fixIEPosition()
}this.addController([$("fbMiniIcon",doc),"click",onMiniIconClick]);
if(noFixedPosition){this.addController([Firebug.browser.window,"scroll",this.fixIEPosition])
}this.isInitialized=true
},shutdown:function(){var node=this.node;
node.style.height=Firebug.context.persistedState.height+"px";
node.style.width="100%";
node.style.left=0;
node.style.right="";
if(this.node.nodeName.toLowerCase()=="iframe"){node.setAttribute("allowTransparency","false");
this.document.body.style.backgroundColor="#fff"
}else{node.style.background="#fff"
}if(noFixedPosition){this.fixIEPosition()
}var doc=FirebugChrome.chromeMap.frame.document;
var mini=$("fbMiniChrome",doc);
mini.style.display="none";
Controller.shutdown.apply(this);
this.isInitialized=false
},draw:function(){},fixIEPosition:ChromeFrameBase.fixIEPosition});
var ChromePopupBase=extend(ChromeBase,{initialize:function(){setClass(this.document.body,"FirebugPopup");
ChromeBase.initialize.call(this);
this.addController([Firebug.chrome.window,"resize",this.resize],[Firebug.chrome.window,"unload",this.destroy]);
if(Env.Options.enablePersistent){this.persist=bind(this.persist,this);
addEvent(Firebug.browser.window,"unload",this.persist)
}else{this.addController([Firebug.browser.window,"unload",this.close])
}fbVSplitter.onmousedown=onVSplitterMouseDown
},destroy:function(){var chromeWin=Firebug.chrome.window;
var left=chromeWin.screenX||chromeWin.screenLeft;
var top=chromeWin.screenY||chromeWin.screenTop;
var size=Firebug.chrome.getWindowSize();
Firebug.context.persistedState.popupTop=top;
Firebug.context.persistedState.popupLeft=left;
Firebug.context.persistedState.popupWidth=size.width;
Firebug.context.persistedState.popupHeight=size.height;
if(Firebug.saveCookies){Firebug.savePrefs()
}var frame=FirebugChrome.chromeMap.frame;
if(frame){dispatch(frame.panelMap,"detach",[this,frame]);
frame.reattach(this,frame)
}if(Env.Options.enablePersistent){removeEvent(Firebug.browser.window,"unload",this.persist)
}ChromeBase.destroy.apply(this);
FirebugChrome.chromeMap.popup=null;
this.node.close()
},persist:function(){persistTimeStart=new Date().getTime();
removeEvent(Firebug.browser.window,"unload",this.persist);
Firebug.Inspector.destroy();
Firebug.browser.window.FirebugOldBrowser=true;
var persistTimeStart=new Date().getTime();
var waitMainWindow=function(){var doc,head;
try{if(window.opener&&!window.opener.FirebugOldBrowser&&(doc=window.opener.document)){try{if(Env.isDebugMode){window.FBL=FBL
}window.Firebug=Firebug;
window.opener.Firebug=Firebug;
Env.browser=window.opener;
Firebug.browser=Firebug.context=new Context(Env.browser);
Firebug.loadPrefs();
registerConsole();
var persistDelay=new Date().getTime()-persistTimeStart;
var chrome=Firebug.chrome;
addEvent(Firebug.browser.window,"unload",chrome.persist);
FBL.cacheDocument();
Firebug.Inspector.create();
Firebug.Console.logFormatted(["Firebug could not capture console calls during "+persistDelay+"ms"],Firebug.context,"info");
setTimeout(function(){var htmlPanel=chrome.getPanel("HTML");
htmlPanel.createUI()
},50)
}catch(pE){alert("persist error: "+(pE.message||pE))
}}else{window.setTimeout(waitMainWindow,0)
}}catch(E){window.close()
}};
waitMainWindow()
},close:function(){this.destroy()
}});
var changeCommandLineVisibility=function changeCommandLineVisibility(visibility){var last=Firebug.chrome.commandLineVisible;
var visible=Firebug.chrome.commandLineVisible=typeof visibility=="boolean"?visibility:!Firebug.chrome.commandLineVisible;
if(visible!=last){if(visible){fbBottom.className="";
if(Firebug.CommandLine){Firebug.CommandLine.activate()
}}else{if(Firebug.CommandLine){Firebug.CommandLine.deactivate()
}fbBottom.className="hide"
}}};
var changeSidePanelVisibility=function changeSidePanelVisibility(visibility){var last=Firebug.chrome.sidePanelVisible;
Firebug.chrome.sidePanelVisible=typeof visibility=="boolean"?visibility:!Firebug.chrome.sidePanelVisible;
if(Firebug.chrome.sidePanelVisible!=last){fbPanelBox2.className=Firebug.chrome.sidePanelVisible?"":"hide";
fbPanelBar2Box.className=Firebug.chrome.sidePanelVisible?"":"hide"
}};
var onGlobalKeyDown=function onGlobalKeyDown(event){var keyCode=event.keyCode;
var shiftKey=event.shiftKey;
var ctrlKey=event.ctrlKey;
if(keyCode==123&&(!isFirefox&&!shiftKey||shiftKey&&isFirefox)){Firebug.chrome.toggle(false,ctrlKey);
cancelEvent(event,true);
if(Env.isChromeExtension){Firebug.GoogleChrome.dispatch("FB_enableIcon")
}}else{if(keyCode==67&&ctrlKey&&shiftKey){Firebug.Inspector.toggleInspect();
cancelEvent(event,true)
}else{if(keyCode==76&&ctrlKey&&shiftKey){Firebug.chrome.focusCommandLine();
cancelEvent(event,true)
}}}};
var onMiniIconClick=function onMiniIconClick(event){Firebug.chrome.toggle(false,event.ctrlKey);
cancelEvent(event,true)
};
var onHSplitterMouseDown=function onHSplitterMouseDown(event){addGlobalEvent("mousemove",onHSplitterMouseMove);
addGlobalEvent("mouseup",onHSplitterMouseUp);
if(isIE){addEvent(Firebug.browser.document.documentElement,"mouseleave",onHSplitterMouseUp)
}fbHSplitter.className="fbOnMovingHSplitter";
return false
};
var onHSplitterMouseMove=function onHSplitterMouseMove(event){cancelEvent(event,true);
var clientY=event.clientY;
var win=isIE?event.srcElement.ownerDocument.parentWindow:event.target.defaultView||event.target.ownerDocument&&event.target.ownerDocument.defaultView;
if(!win){return
}if(win!=win.parent){var frameElement=win.frameElement;
if(frameElement){var framePos=Firebug.browser.getElementPosition(frameElement).top;
clientY+=framePos;
if(frameElement.style.position!="fixed"){clientY-=Firebug.browser.getWindowScrollPosition().top
}}}if(isOpera&&isQuiksMode&&win.frameElement.id=="FirebugUI"){clientY=Firebug.browser.getWindowSize().height-win.frameElement.offsetHeight+clientY
}onHSplitterMouseMoveBuffer=clientY;
if(new Date().getTime()-lastHSplitterMouseMove>chromeRedrawSkipRate){lastHSplitterMouseMove=new Date().getTime();
handleHSplitterMouseMove()
}else{if(!onHSplitterMouseMoveTimer){onHSplitterMouseMoveTimer=setTimeout(handleHSplitterMouseMove,chromeRedrawSkipRate)
}}cancelEvent(event,true);
return false
};
var handleHSplitterMouseMove=function(){if(onHSplitterMouseMoveTimer){clearTimeout(onHSplitterMouseMoveTimer);
onHSplitterMouseMoveTimer=null
}var clientY=onHSplitterMouseMoveBuffer;
var windowSize=Firebug.browser.getWindowSize();
var scrollSize=Firebug.browser.getWindowScrollSize();
var commandLineHeight=Firebug.chrome.commandLineVisible?fbCommandLine.offsetHeight:0;
var fixedHeight=topHeight+commandLineHeight;
var chromeNode=Firebug.chrome.node;
var scrollbarSize=!isIE&&(scrollSize.width>windowSize.width)?17:0;
var height=windowSize.height;
var chromeHeight=Math.max(height-clientY+5-scrollbarSize,fixedHeight);
chromeHeight=Math.min(chromeHeight,windowSize.height-scrollbarSize);
Firebug.context.persistedState.height=chromeHeight;
chromeNode.style.height=chromeHeight+"px";
if(noFixedPosition){Firebug.chrome.fixIEPosition()
}Firebug.chrome.draw()
};
var onHSplitterMouseUp=function onHSplitterMouseUp(event){removeGlobalEvent("mousemove",onHSplitterMouseMove);
removeGlobalEvent("mouseup",onHSplitterMouseUp);
if(isIE){removeEvent(Firebug.browser.document.documentElement,"mouseleave",onHSplitterMouseUp)
}fbHSplitter.className="";
Firebug.chrome.draw();
return false
};
var onVSplitterMouseDown=function onVSplitterMouseDown(event){addGlobalEvent("mousemove",onVSplitterMouseMove);
addGlobalEvent("mouseup",onVSplitterMouseUp);
return false
};
var onVSplitterMouseMove=function onVSplitterMouseMove(event){if(new Date().getTime()-lastVSplitterMouseMove>chromeRedrawSkipRate){var target=event.target||event.srcElement;
if(target&&target.ownerDocument){var clientX=event.clientX;
var win=document.all?event.srcElement.ownerDocument.parentWindow:event.target.ownerDocument.defaultView;
if(win!=win.parent){clientX+=win.frameElement?win.frameElement.offsetLeft:0
}var size=Firebug.chrome.getSize();
var x=Math.max(size.width-clientX+3,6);
Firebug.context.persistedState.sidePanelWidth=x;
Firebug.chrome.draw()
}lastVSplitterMouseMove=new Date().getTime()
}cancelEvent(event,true);
return false
};
var onVSplitterMouseUp=function onVSplitterMouseUp(event){removeGlobalEvent("mousemove",onVSplitterMouseMove);
removeGlobalEvent("mouseup",onVSplitterMouseUp);
Firebug.chrome.draw()
}
}});
FBL.ns(function(){with(FBL){Firebug.Lite={}
}});
FBL.ns(function(){with(FBL){Firebug.Lite.Cache={ID:"firebug-"+new Date().getTime()};
var cacheUID=0;
var createCache=function(){var map={};
var data={};
var CID=Firebug.Lite.Cache.ID;
var supportsDeleteExpando=!document.all;
var cacheFunction=function(element){return cacheAPI.set(element)
};
var cacheAPI={get:function(key){return map.hasOwnProperty(key)?map[key]:null
},set:function(element){var id=getValidatedKey(element);
if(!id){id=++cacheUID;
element[CID]=id
}if(!map.hasOwnProperty(id)){map[id]=element;
data[id]={}
}return id
},unset:function(element){var id=getValidatedKey(element);
if(!id){return
}if(supportsDeleteExpando){delete element[CID]
}else{if(element.removeAttribute){element.removeAttribute(CID)
}}delete map[id];
delete data[id]
},key:function(element){return getValidatedKey(element)
},has:function(element){var id=getValidatedKey(element);
return id&&map.hasOwnProperty(id)
},each:function(callback){for(var key in map){if(map.hasOwnProperty(key)){callback(key,map[key])
}}},data:function(element,name,value){if(value){if(!name){return null
}var id=cacheAPI.set(element);
return data[id][name]=value
}else{var id=cacheAPI.key(element);
return data.hasOwnProperty(id)&&data[id].hasOwnProperty(name)?data[id][name]:null
}},clear:function(){for(var id in map){var element=map[id];
cacheAPI.unset(element)
}}};
var getValidatedKey=function(element){var id=element[CID];
if(!supportsDeleteExpando&&id&&map.hasOwnProperty(id)&&map[id]!=element){element.removeAttribute(CID);
id=null
}return id
};
FBL.append(cacheFunction,cacheAPI);
return cacheFunction
};
Firebug.Lite.Cache.StyleSheet=createCache();
Firebug.Lite.Cache.Element=createCache();
Firebug.Lite.Cache.Event=createCache()
}});
FBL.ns(function(){with(FBL){var sourceMap={};
Firebug.Lite.Proxy={_callbacks:{},load:function(url){var resourceDomain=getDomain(url);
var isLocalResource=!resourceDomain||resourceDomain==Firebug.context.window.location.host;
return isLocalResource?fetchResource(url):fetchProxyResource(url)
},loadJSONP:function(url,callback){var script=createGlobalElement("script"),doc=Firebug.context.document,uid=""+new Date().getTime(),callbackName="callback=Firebug.Lite.Proxy._callbacks."+uid,jsonpURL=url.indexOf("?")!=-1?url+"&"+callbackName:url+"?"+callbackName;
Firebug.Lite.Proxy._callbacks[uid]=function(data){if(callback){callback(data)
}script.parentNode.removeChild(script);
delete Firebug.Lite.Proxy._callbacks[uid]
};
script.src=jsonpURL;
if(doc.documentElement){doc.documentElement.appendChild(script)
}},YQL:function(url,callback){var yql="http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22"+encodeURIComponent(url)+"%22&format=xml";
this.loadJSONP(yql,function(data){var source=data.results[0];
var match=/<body>\s+<p>([\s\S]+)<\/p>\s+<\/body>$/.exec(source);
if(match){source=match[1]
}console.log(source)
})
}};
Firebug.Lite.Proxy.fetchResourceDisabledMessage='/* Firebug Lite resource fetching is disabled.\nTo enabled it set the Firebug Lite option "disableResourceFetching" to "false".\nMore info at http://getfirebug.com/firebuglite#Options */';
var fetchResource=function(url){if(Firebug.disableResourceFetching){var source=sourceMap[url]=Firebug.Lite.Proxy.fetchResourceDisabledMessage;
return source
}if(sourceMap.hasOwnProperty(url)){return sourceMap[url]
}var xhr=FBL.getNativeXHRObject();
xhr.open("get",url,false);
xhr.send();
var source=sourceMap[url]=xhr.responseText;
return source
};
var fetchProxyResource=function(url){if(sourceMap.hasOwnProperty(url)){return sourceMap[url]
}var proxyURL=Env.Location.baseDir+"plugin/proxy/proxy.php?url="+encodeURIComponent(url);
var response=fetchResource(proxyURL);
try{var data=eval("("+response+")")
}catch(E){return"ERROR: Firebug Lite Proxy plugin returned an invalid response."
}var source=data?data.contents:"";
return source
}
}});
FBL.ns(function(){with(FBL){Firebug.Lite.Style={}
}});
FBL.ns(function(){with(FBL){Firebug.Lite.Script=function(window){this.fileName=null;
this.isValid=null;
this.baseLineNumber=null;
this.lineExtent=null;
this.tag=null;
this.functionName=null;
this.functionSource=null
};
Firebug.Lite.Script.prototype={isLineExecutable:function(){},pcToLine:function(){},lineToPc:function(){},toString:function(){return"Firebug.Lite.Script"
}}
}});
FBL.ns(function(){with(FBL){Firebug.Lite.Browser=function(window){this.contentWindow=window;
this.contentDocument=window.document;
this.currentURI={spec:window.location.href}
};
Firebug.Lite.Browser.prototype={toString:function(){return"Firebug.Lite.Browser"
}}
}});
var JSON=window.JSON||{};
(function(){function f(n){return n<10?"0"+n:n
}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()
}
}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
function quote(string){escapable.lastIndex=0;
return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'
}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)
}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}gap+=indent;
partial=[];
if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;
i<length;
i+=1){partial[i]=str(i,value)||"null"
}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;
return v
}if(rep&&typeof rep==="object"){length=rep.length;
for(i=0;
i<length;
i+=1){k=rep[i];
if(typeof k==="string"){v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;
return v
}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;
gap="";
indent="";
if(typeof space==="number"){for(i=0;
i<space;
i+=1){indent+=" "
}}else{if(typeof space==="string"){indent=space
}}rep=replacer;
if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})
}
}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];
if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v
}else{delete value[k]
}}}}return reviver.call(holder,key,value)
}text=String(text);
cx.lastIndex=0;
if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})
}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j
}throw new SyntaxError("JSON.parse")
}
}FBL.JSON=JSON
}());
(function(){var store=(function(){var api={},win=window,doc=win.document,localStorageName="localStorage",globalStorageName="globalStorage",namespace="__firebug__storejs__",storage;
api.disabled=false;
api.set=function(key,value){};
api.get=function(key){};
api.remove=function(key){};
api.clear=function(){};
api.transact=function(key,transactionFn){var val=api.get(key);
if(typeof val=="undefined"){val={}
}transactionFn(val);
api.set(key,val)
};
api.serialize=function(value){return JSON.stringify(value)
};
api.deserialize=function(value){if(typeof value!="string"){return undefined
}return JSON.parse(value)
};
function isLocalStorageNameSupported(){try{return(localStorageName in win&&win[localStorageName])
}catch(err){return false
}}function isGlobalStorageNameSupported(){try{return(globalStorageName in win&&win[globalStorageName]&&win[globalStorageName][win.location.hostname])
}catch(err){return false
}}if(isLocalStorageNameSupported()){storage=win[localStorageName];
api.set=function(key,val){storage.setItem(key,api.serialize(val))
};
api.get=function(key){return api.deserialize(storage.getItem(key))
};
api.remove=function(key){storage.removeItem(key)
};
api.clear=function(){storage.clear()
}
}else{if(isGlobalStorageNameSupported()){storage=win[globalStorageName][win.location.hostname];
api.set=function(key,val){storage[key]=api.serialize(val)
};
api.get=function(key){return api.deserialize(storage[key]&&storage[key].value)
};
api.remove=function(key){delete storage[key]
};
api.clear=function(){for(var key in storage){delete storage[key]
}}
}else{if(doc.documentElement.addBehavior){var storage=doc.createElement("div");
function withIEStorage(storeFunction){return function(){var args=Array.prototype.slice.call(arguments,0);
args.unshift(storage);
doc.documentElement.appendChild(storage);
storage.addBehavior("#default#userData");
storage.load(localStorageName);
var result=storeFunction.apply(api,args);
doc.documentElement.removeChild(storage);
return result
}
}api.set=withIEStorage(function(storage,key,val){storage.setAttribute(key,api.serialize(val));
storage.save(localStorageName)
});
api.get=withIEStorage(function(storage,key){return api.deserialize(storage.getAttribute(key))
});
api.remove=withIEStorage(function(storage,key){storage.removeAttribute(key);
storage.save(localStorageName)
});
api.clear=withIEStorage(function(storage){var attributes=storage.XMLDocument.documentElement.attributes;
storage.load(localStorageName);
for(var i=0,attr;
attr=attributes[i];
i++){storage.removeAttribute(attr.name)
}storage.save(localStorageName)
})
}}}try{api.set(namespace,namespace);
if(api.get(namespace)!=namespace){api.disabled=true
}api.remove(namespace)
}catch(e){api.disabled=true
}return api
})();
if(typeof module!="undefined"){module.exports=store
}FBL.Store=store
})();
FBL.ns(function(){with(FBL){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true;
[0,0].sort(function(){baseHasDuplicate=false;
return 0
});
var Sizzle=function(selector,context,results,seed){results=results||[];
var origContext=context=context||document;
if(context.nodeType!==1&&context.nodeType!==9){return[]
}if(!selector||typeof selector!=="string"){return results
}var parts=[],m,set,checkSet,check,mode,extra,prune=true,contextXML=isXML(context),soFar=selector;
while((chunker.exec(""),m=chunker.exec(soFar))!==null){soFar=m[3];
parts.push(m[1]);
if(m[2]){extra=m[3];
break
}}if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context)
}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);
while(parts.length){selector=parts.shift();
if(Expr.relative[selector]){selector+=parts.shift()
}set=posProcess(selector,set)
}}}else{if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){var ret=Sizzle.find(parts.shift(),context,contextXML);
context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0]
}if(context){var ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);
set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;
if(parts.length>0){checkSet=makeArray(set)
}else{prune=false
}while(parts.length){var cur=parts.pop(),pop=cur;
if(!Expr.relative[cur]){cur=""
}else{pop=parts.pop()
}if(pop==null){pop=context
}Expr.relative[cur](checkSet,pop,contextXML)
}}else{checkSet=parts=[]
}}if(!checkSet){checkSet=set
}if(!checkSet){throw"Syntax error, unrecognized expression: "+(cur||selector)
}if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet)
}else{if(context&&context.nodeType===1){for(var i=0;
checkSet[i]!=null;
i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&contains(context,checkSet[i]))){results.push(set[i])
}}}else{for(var i=0;
checkSet[i]!=null;
i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i])
}}}}}else{makeArray(checkSet,results)
}if(extra){Sizzle(extra,origContext,results,seed);
Sizzle.uniqueSort(results)
}return results
};
Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;
results.sort(sortOrder);
if(hasDuplicate){for(var i=1;
i<results.length;
i++){if(results[i]===results[i-1]){results.splice(i--,1)
}}}}return results
};
Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set)
};
Sizzle.find=function(expr,context,isXML){var set,match;
if(!expr){return[]
}for(var i=0,l=Expr.order.length;
i<l;
i++){var type=Expr.order[i],match;
if((match=Expr.leftMatch[type].exec(expr))){var left=match[1];
match.splice(1,1);
if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");
set=Expr.find[type](match,context,isXML);
if(set!=null){expr=expr.replace(Expr.match[type],"");
break
}}}}if(!set){set=context.getElementsByTagName("*")
}return{set:set,expr:expr}
};
Sizzle.filter=function(expr,set,inplace,not){var old=expr,result=[],curLoop=set,match,anyFound,isXMLFilter=set&&set[0]&&isXML(set[0]);
while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.match[type].exec(expr))!=null){var filter=Expr.filter[type],found,item;
anyFound=false;
if(curLoop==result){result=[]
}if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);
if(!match){anyFound=found=true
}else{if(match===true){continue
}}}if(match){for(var i=0;
(item=curLoop[i])!=null;
i++){if(item){found=filter(item,match,i,curLoop);
var pass=not^!!found;
if(inplace&&found!=null){if(pass){anyFound=true
}else{curLoop[i]=false
}}else{if(pass){result.push(item);
anyFound=true
}}}}}if(found!==undefined){if(!inplace){curLoop=result
}expr=expr.replace(Expr.match[type],"");
if(!anyFound){return[]
}break
}}}if(expr==old){if(anyFound==null){throw"Syntax error, unrecognized expression: "+expr
}else{break
}}old=expr
}return curLoop
};
var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href")
}},relative:{"+":function(checkSet,part,isXML){var isPartStr=typeof part==="string",isTag=isPartStr&&!/\W/.test(part),isPartStrNotTag=isPartStr&&!isTag;
if(isTag&&!isXML){part=part.toUpperCase()
}for(var i=0,l=checkSet.length,elem;
i<l;
i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}checkSet[i]=isPartStrNotTag||elem&&elem.nodeName===part?elem||false:elem===part
}}if(isPartStrNotTag){Sizzle.filter(part,checkSet,true)
}},">":function(checkSet,part,isXML){var isPartStr=typeof part==="string";
if(isPartStr&&!/\W/.test(part)){part=isXML?part:part.toUpperCase();
for(var i=0,l=checkSet.length;
i<l;
i++){var elem=checkSet[i];
if(elem){var parent=elem.parentNode;
checkSet[i]=parent.nodeName===part?parent:false
}}}else{for(var i=0,l=checkSet.length;
i<l;
i++){var elem=checkSet[i];
if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part
}}if(isPartStr){Sizzle.filter(part,checkSet,true)
}}},"":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;
if(!/\W/.test(part)){var nodeCheck=part=isXML?part:part.toUpperCase();
checkFn=dirNodeCheck
}checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML)
},"~":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;
if(typeof part==="string"&&!/\W/.test(part)){var nodeCheck=part=isXML?part:part.toUpperCase();
checkFn=dirNodeCheck
}checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML)
}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);
return m?[m]:[]
}},NAME:function(match,context,isXML){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);
for(var i=0,l=results.length;
i<l;
i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i])
}}return ret.length===0?null:ret
}},TAG:function(match,context){return context.getElementsByTagName(match[1])
}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(/\\/g,"")+" ";
if(isXML){return match
}for(var i=0,elem;
(elem=curLoop[i])!=null;
i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").indexOf(match)>=0)){if(!inplace){result.push(elem)
}}else{if(inplace){curLoop[i]=false
}}}}return false
},ID:function(match){return match[1].replace(/\\/g,"")
},TAG:function(match,curLoop){for(var i=0;
curLoop[i]===false;
i++){}return curLoop[i]&&isXML(curLoop[i])?match[1]:match[1].toUpperCase()
},CHILD:function(match){if(match[1]=="nth"){var test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2]=="even"&&"2n"||match[2]=="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);
match[2]=(test[1]+(test[2]||1))-0;
match[3]=test[3]-0
}match[0]=done++;
return match
},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1].replace(/\\/g,"");
if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name]
}if(match[2]==="~="){match[4]=" "+match[4]+" "
}return match
},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop)
}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);
if(!inplace){result.push.apply(result,ret)
}return false
}}else{if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true
}}return match
},POS:function(match){match.unshift(true);
return match
}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type!=="hidden"
},disabled:function(elem){return elem.disabled===true
},checked:function(elem){return elem.checked===true
},selected:function(elem){elem.parentNode.selectedIndex;
return elem.selected===true
},parent:function(elem){return !!elem.firstChild
},empty:function(elem){return !elem.firstChild
},has:function(elem,i,match){return !!Sizzle(match[3],elem).length
},header:function(elem){return/h\d/i.test(elem.nodeName)
},text:function(elem){return"text"===elem.type
},radio:function(elem){return"radio"===elem.type
},checkbox:function(elem){return"checkbox"===elem.type
},file:function(elem){return"file"===elem.type
},password:function(elem){return"password"===elem.type
},submit:function(elem){return"submit"===elem.type
},image:function(elem){return"image"===elem.type
},reset:function(elem){return"reset"===elem.type
},button:function(elem){return"button"===elem.type||elem.nodeName.toUpperCase()==="BUTTON"
},input:function(elem){return/input|select|textarea|button/i.test(elem.nodeName)
}},setFilters:{first:function(elem,i){return i===0
},last:function(elem,i,match,array){return i===array.length-1
},even:function(elem,i){return i%2===0
},odd:function(elem,i){return i%2===1
},lt:function(elem,i,match){return i<match[3]-0
},gt:function(elem,i,match){return i>match[3]-0
},nth:function(elem,i,match){return match[3]-0==i
},eq:function(elem,i,match){return match[3]-0==i
}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];
if(filter){return filter(elem,i,match,array)
}else{if(name==="contains"){return(elem.textContent||elem.innerText||"").indexOf(match[3])>=0
}else{if(name==="not"){var not=match[3];
for(var i=0,l=not.length;
i<l;
i++){if(not[i]===elem){return false
}}return true
}}}},CHILD:function(elem,match){var type=match[1],node=elem;
switch(type){case"only":case"first":while((node=node.previousSibling)){if(node.nodeType===1){return false
}}if(type=="first"){return true
}node=elem;
case"last":while((node=node.nextSibling)){if(node.nodeType===1){return false
}}return true;
case"nth":var first=match[2],last=match[3];
if(first==1&&last==0){return true
}var doneName=match[0],parent=elem.parentNode;
if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;
for(node=parent.firstChild;
node;
node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count
}}parent.sizcache=doneName
}var diff=elem.nodeIndex-last;
if(first==0){return diff==0
}else{return(diff%first==0&&diff/first>=0)
}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match
},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||elem.nodeName===match
},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1
},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];
return result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!=check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false
},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];
if(filter){return filter(elem,i,match,array)
}}}};
var origPOS=Expr.match.POS;
for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+/(?![^\[]*\])(?![^\(]*\))/.source);
Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source)
}var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);
if(results){results.push.apply(results,array);
return results
}return array
};
try{Array.prototype.slice.call(document.documentElement.childNodes,0)
}catch(e){makeArray=function(array,results){var ret=results||[];
if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array)
}else{if(typeof array.length==="number"){for(var i=0,l=array.length;
i<l;
i++){ret.push(array[i])
}}else{for(var i=0;
array[i];
i++){ret.push(array[i])
}}}return ret
}
}var sortOrder;
if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){if(!a.compareDocumentPosition||!b.compareDocumentPosition){if(a==b){hasDuplicate=true
}return 0
}var ret=a.compareDocumentPosition(b)&4?-1:a===b?0:1;
if(ret===0){hasDuplicate=true
}return ret
}
}else{if("sourceIndex" in document.documentElement){sortOrder=function(a,b){if(!a.sourceIndex||!b.sourceIndex){if(a==b){hasDuplicate=true
}return 0
}var ret=a.sourceIndex-b.sourceIndex;
if(ret===0){hasDuplicate=true
}return ret
}
}else{if(document.createRange){sortOrder=function(a,b){if(!a.ownerDocument||!b.ownerDocument){if(a==b){hasDuplicate=true
}return 0
}var aRange=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();
aRange.setStart(a,0);
aRange.setEnd(a,0);
bRange.setStart(b,0);
bRange.setEnd(b,0);
var ret=aRange.compareBoundaryPoints(Range.START_TO_END,bRange);
if(ret===0){hasDuplicate=true
}return ret
}
}}}(function(){var form=document.createElement("div"),id="script"+(new Date).getTime();
form.innerHTML="<a name='"+id+"'/>";
var root=document.documentElement;
root.insertBefore(form,root.firstChild);
if(!!document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);
return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[]
}};
Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");
return elem.nodeType===1&&node&&node.nodeValue===match
}
}root.removeChild(form);
root=form=null
})();
(function(){var div=document.createElement("div");
div.appendChild(document.createComment(""));
if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);
if(match[1]==="*"){var tmp=[];
for(var i=0;
results[i];
i++){if(results[i].nodeType===1){tmp.push(results[i])
}}results=tmp
}return results
}
}div.innerHTML="<a href='#'></a>";
if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2)
}
}div=null
})();
if(document.querySelectorAll){(function(){var oldSizzle=Sizzle,div=document.createElement("div");
div.innerHTML="<p class='TEST'></p>";
if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return
}Sizzle=function(query,context,extra,seed){context=context||document;
if(!seed&&context.nodeType===9&&!isXML(context)){try{return makeArray(context.querySelectorAll(query),extra)
}catch(e){}}return oldSizzle(query,context,extra,seed)
};
for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop]
}div=null
})()
}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var div=document.createElement("div");
div.innerHTML="<div class='test e'></div><div class='test'></div>";
if(div.getElementsByClassName("e").length===0){return
}div.lastChild.className="e";
if(div.getElementsByClassName("e").length===1){return
}Expr.order.splice(1,0,"CLASS");
Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1])
}};
div=null
})()
}function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir=="previousSibling"&&!isXML;
for(var i=0,l=checkSet.length;
i<l;
i++){var elem=checkSet[i];
if(elem){if(sibDir&&elem.nodeType===1){elem.sizcache=doneName;
elem.sizset=i
}elem=elem[dir];
var match=false;
while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];
break
}if(elem.nodeType===1&&!isXML){elem.sizcache=doneName;
elem.sizset=i
}if(elem.nodeName===cur){match=elem;
break
}elem=elem[dir]
}checkSet[i]=match
}}}function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir=="previousSibling"&&!isXML;
for(var i=0,l=checkSet.length;
i<l;
i++){var elem=checkSet[i];
if(elem){if(sibDir&&elem.nodeType===1){elem.sizcache=doneName;
elem.sizset=i
}elem=elem[dir];
var match=false;
while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];
break
}if(elem.nodeType===1){if(!isXML){elem.sizcache=doneName;
elem.sizset=i
}if(typeof cur!=="string"){if(elem===cur){match=true;
break
}}else{if(Sizzle.filter(cur,[elem]).length>0){match=elem;
break
}}}elem=elem[dir]
}checkSet[i]=match
}}}var contains=document.compareDocumentPosition?function(a,b){return a.compareDocumentPosition(b)&16
}:function(a,b){return a!==b&&(a.contains?a.contains(b):true)
};
var isXML=function(elem){return elem.nodeType===9&&elem.documentElement.nodeName!=="HTML"||!!elem.ownerDocument&&elem.ownerDocument.documentElement.nodeName!=="HTML"
};
var posProcess=function(selector,context){var tmpSet=[],later="",match,root=context.nodeType?[context]:context;
while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];
selector=selector.replace(Expr.match.PSEUDO,"")
}selector=Expr.relative[selector]?selector+"*":selector;
for(var i=0,l=root.length;
i<l;
i++){Sizzle(selector,root[i],tmpSet)
}return Sizzle.filter(later,tmpSet)
};
Firebug.Selector=Sizzle
}});
FBL.ns(function(){with(FBL){var ElementCache=Firebug.Lite.Cache.Element;
var inspectorTS,inspectorTimer,isInspecting;
Firebug.Inspector={create:function(){offlineFragment=Env.browser.document.createDocumentFragment();
createBoxModelInspector();
createOutlineInspector()
},destroy:function(){destroyBoxModelInspector();
destroyOutlineInspector();
offlineFragment=null
},toggleInspect:function(){if(isInspecting){this.stopInspecting()
}else{Firebug.chrome.inspectButton.changeState("pressed");
this.startInspecting()
}},startInspecting:function(){isInspecting=true;
Firebug.chrome.selectPanel("HTML");
createInspectorFrame();
var size=Firebug.browser.getWindowScrollSize();
fbInspectFrame.style.width=size.width+"px";
fbInspectFrame.style.height=size.height+"px";
addEvent(fbInspectFrame,"mousemove",Firebug.Inspector.onInspecting);
addEvent(fbInspectFrame,"mousedown",Firebug.Inspector.onInspectingClick)
},stopInspecting:function(){isInspecting=false;
if(outlineVisible){this.hideOutline()
}removeEvent(fbInspectFrame,"mousemove",Firebug.Inspector.onInspecting);
removeEvent(fbInspectFrame,"mousedown",Firebug.Inspector.onInspectingClick);
destroyInspectorFrame();
Firebug.chrome.inspectButton.restore();
if(Firebug.chrome.type=="popup"){Firebug.chrome.node.focus()
}},onInspectingClick:function(e){fbInspectFrame.style.display="none";
var targ=Firebug.browser.getElementFromPoint(e.clientX,e.clientY);
fbInspectFrame.style.display="block";
var id=targ.id;
if(id&&/^fbOutline\w$/.test(id)){return
}if(id=="FirebugUI"){return
}while(targ.nodeType!=1){targ=targ.parentNode
}Firebug.Inspector.stopInspecting()
},onInspecting:function(e){if(new Date().getTime()-lastInspecting>30){fbInspectFrame.style.display="none";
var targ=Firebug.browser.getElementFromPoint(e.clientX,e.clientY);
fbInspectFrame.style.display="block";
var id=targ.id;
if(id&&/^fbOutline\w$/.test(id)){return
}if(id=="FirebugUI"){return
}while(targ.nodeType!=1){targ=targ.parentNode
}if(targ.nodeName.toLowerCase()=="body"){return
}Firebug.Inspector.drawOutline(targ);
if(ElementCache(targ)){var target=""+ElementCache.key(targ);
var lazySelect=function(){inspectorTS=new Date().getTime();
if(Firebug.HTML){Firebug.HTML.selectTreeNode(""+ElementCache.key(targ))
}};
if(inspectorTimer){clearTimeout(inspectorTimer);
inspectorTimer=null
}if(new Date().getTime()-inspectorTS>200){setTimeout(lazySelect,0)
}else{inspectorTimer=setTimeout(lazySelect,300)
}}lastInspecting=new Date().getTime()
}},onInspectingBody:function(e){if(new Date().getTime()-lastInspecting>30){var targ=e.target;
var id=targ.id;
if(id&&/^fbOutline\w$/.test(id)){return
}if(id=="FirebugUI"){return
}while(targ.nodeType!=1){targ=targ.parentNode
}if(targ.nodeName.toLowerCase()=="body"){return
}Firebug.Inspector.drawOutline(targ);
if(ElementCache.has(targ)){FBL.Firebug.HTML.selectTreeNode(""+ElementCache.key(targ))
}lastInspecting=new Date().getTime()
}},drawOutline:function(el){var border=2;
var scrollbarSize=17;
var windowSize=Firebug.browser.getWindowSize();
var scrollSize=Firebug.browser.getWindowScrollSize();
var scrollPosition=Firebug.browser.getWindowScrollPosition();
var box=Firebug.browser.getElementBox(el);
var top=box.top;
var left=box.left;
var height=box.height;
var width=box.width;
var freeHorizontalSpace=scrollPosition.left+windowSize.width-left-width-(!isIE&&scrollSize.height>windowSize.height?scrollbarSize:0);
var freeVerticalSpace=scrollPosition.top+windowSize.height-top-height-(!isIE&&scrollSize.width>windowSize.width?scrollbarSize:0);
var numVerticalBorders=freeVerticalSpace>0?2:1;
var o=outlineElements;
var style;
style=o.fbOutlineT.style;
style.top=top-border+"px";
style.left=left+"px";
style.height=border+"px";
style.width=width+"px";
style=o.fbOutlineL.style;
style.top=top-border+"px";
style.left=left-border+"px";
style.height=height+numVerticalBorders*border+"px";
style.width=border+"px";
style=o.fbOutlineB.style;
if(freeVerticalSpace>0){style.top=top+height+"px";
style.left=left+"px";
style.width=width+"px"
}else{style.top=-2*border+"px";
style.left=-2*border+"px";
style.width=border+"px"
}style=o.fbOutlineR.style;
if(freeHorizontalSpace>0){style.top=top-border+"px";
style.left=left+width+"px";
style.height=height+numVerticalBorders*border+"px";
style.width=(freeHorizontalSpace<border?freeHorizontalSpace:border)+"px"
}else{style.top=-2*border+"px";
style.left=-2*border+"px";
style.height=border+"px";
style.width=border+"px"
}if(!outlineVisible){this.showOutline()
}},hideOutline:function(){if(!outlineVisible){return
}for(var name in outline){offlineFragment.appendChild(outlineElements[name])
}outlineVisible=false
},showOutline:function(){if(outlineVisible){return
}if(boxModelVisible){this.hideBoxModel()
}for(var name in outline){Firebug.browser.document.getElementsByTagName("body")[0].appendChild(outlineElements[name])
}outlineVisible=true
},drawBoxModel:function(el){if(!el||!el.parentNode){return
}var box=Firebug.browser.getElementBox(el);
var windowSize=Firebug.browser.getWindowSize();
var scrollPosition=Firebug.browser.getWindowScrollPosition();
var offsetHeight=Firebug.chrome.type=="frame"?Firebug.context.persistedState.height:0;
if(box.top>scrollPosition.top+windowSize.height-offsetHeight||box.left>scrollPosition.left+windowSize.width||scrollPosition.top>box.top+box.height||scrollPosition.left>box.left+box.width){return
}var top=box.top;
var left=box.left;
var height=box.height;
var width=box.width;
var margin=Firebug.browser.getMeasurementBox(el,"margin");
var padding=Firebug.browser.getMeasurementBox(el,"padding");
var border=Firebug.browser.getMeasurementBox(el,"border");
boxModelStyle.top=top-margin.top+"px";
boxModelStyle.left=left-margin.left+"px";
boxModelStyle.height=height+margin.top+margin.bottom+"px";
boxModelStyle.width=width+margin.left+margin.right+"px";
boxBorderStyle.top=margin.top+"px";
boxBorderStyle.left=margin.left+"px";
boxBorderStyle.height=height+"px";
boxBorderStyle.width=width+"px";
boxPaddingStyle.top=margin.top+border.top+"px";
boxPaddingStyle.left=margin.left+border.left+"px";
boxPaddingStyle.height=height-border.top-border.bottom+"px";
boxPaddingStyle.width=width-border.left-border.right+"px";
boxContentStyle.top=margin.top+border.top+padding.top+"px";
boxContentStyle.left=margin.left+border.left+padding.left+"px";
boxContentStyle.height=height-border.top-padding.top-padding.bottom-border.bottom+"px";
boxContentStyle.width=width-border.left-padding.left-padding.right-border.right+"px";
if(!boxModelVisible){this.showBoxModel()
}},hideBoxModel:function(){if(!boxModelVisible){return
}offlineFragment.appendChild(boxModel);
boxModelVisible=false
},showBoxModel:function(){if(boxModelVisible){return
}if(outlineVisible){this.hideOutline()
}Firebug.browser.document.getElementsByTagName("body")[0].appendChild(boxModel);
boxModelVisible=true
}};
var offlineFragment=null;
var boxModelVisible=false;
var boxModel,boxModelStyle,boxMargin,boxMarginStyle,boxBorder,boxBorderStyle,boxPadding,boxPaddingStyle,boxContent,boxContentStyle;
var resetStyle="margin:0; padding:0; border:0; position:absolute; overflow:hidden; display:block;";
var offscreenStyle=resetStyle+"top:-1234px; left:-1234px;";
var inspectStyle=resetStyle+"z-index: 2147483500;";
var inspectFrameStyle=resetStyle+"z-index: 2147483550; top:0; left:0; background:url("+Env.Location.skinDir+"pixel_transparent.gif);";
var inspectModelOpacity=isIE?"filter:alpha(opacity=80);":"opacity:0.8;";
var inspectModelStyle=inspectStyle+inspectModelOpacity;
var inspectMarginStyle=inspectStyle+"background: #EDFF64; height:100%; width:100%;";
var inspectBorderStyle=inspectStyle+"background: #666;";
var inspectPaddingStyle=inspectStyle+"background: SlateBlue;";
var inspectContentStyle=inspectStyle+"background: SkyBlue;";
var outlineStyle={fbHorizontalLine:"background: #3875D7;height: 2px;",fbVerticalLine:"background: #3875D7;width: 2px;"};
var lastInspecting=0;
var fbInspectFrame=null;
var outlineVisible=false;
var outlineElements={};
var outline={fbOutlineT:"fbHorizontalLine",fbOutlineL:"fbVerticalLine",fbOutlineB:"fbHorizontalLine",fbOutlineR:"fbVerticalLine"};
var getInspectingTarget=function(){};
var createInspectorFrame=function createInspectorFrame(){fbInspectFrame=createGlobalElement("div");
fbInspectFrame.id="fbInspectFrame";
fbInspectFrame.firebugIgnore=true;
fbInspectFrame.style.cssText=inspectFrameStyle;
Firebug.browser.document.getElementsByTagName("body")[0].appendChild(fbInspectFrame)
};
var destroyInspectorFrame=function destroyInspectorFrame(){if(fbInspectFrame){Firebug.browser.document.getElementsByTagName("body")[0].removeChild(fbInspectFrame);
fbInspectFrame=null
}};
var createOutlineInspector=function createOutlineInspector(){for(var name in outline){var el=outlineElements[name]=createGlobalElement("div");
el.id=name;
el.firebugIgnore=true;
el.style.cssText=inspectStyle+outlineStyle[outline[name]];
offlineFragment.appendChild(el)
}};
var destroyOutlineInspector=function destroyOutlineInspector(){for(var name in outline){var el=outlineElements[name];
el.parentNode.removeChild(el)
}};
var createBoxModelInspector=function createBoxModelInspector(){boxModel=createGlobalElement("div");
boxModel.id="fbBoxModel";
boxModel.firebugIgnore=true;
boxModelStyle=boxModel.style;
boxModelStyle.cssText=inspectModelStyle;
boxMargin=createGlobalElement("div");
boxMargin.id="fbBoxMargin";
boxMarginStyle=boxMargin.style;
boxMarginStyle.cssText=inspectMarginStyle;
boxModel.appendChild(boxMargin);
boxBorder=createGlobalElement("div");
boxBorder.id="fbBoxBorder";
boxBorderStyle=boxBorder.style;
boxBorderStyle.cssText=inspectBorderStyle;
boxModel.appendChild(boxBorder);
boxPadding=createGlobalElement("div");
boxPadding.id="fbBoxPadding";
boxPaddingStyle=boxPadding.style;
boxPaddingStyle.cssText=inspectPaddingStyle;
boxModel.appendChild(boxPadding);
boxContent=createGlobalElement("div");
boxContent.id="fbBoxContent";
boxContentStyle=boxContent.style;
boxContentStyle.cssText=inspectContentStyle;
boxModel.appendChild(boxContent);
offlineFragment.appendChild(boxModel)
};
var destroyBoxModelInspector=function destroyBoxModelInspector(){boxModel.parentNode.removeChild(boxModel)
}
}});
(function(){FBL.DomplateTag=function DomplateTag(tagName){this.tagName=tagName
};
FBL.DomplateEmbed=function DomplateEmbed(){};
FBL.DomplateLoop=function DomplateLoop(){};
var DomplateTag=FBL.DomplateTag;
var DomplateEmbed=FBL.DomplateEmbed;
var DomplateLoop=FBL.DomplateLoop;
var womb=null;
FBL.domplate=function(){var lastSubject;
for(var i=0;
i<arguments.length;
++i){lastSubject=lastSubject?copyObject(lastSubject,arguments[i]):arguments[i]
}for(var name in lastSubject){var val=lastSubject[name];
if(isTag(val)){val.tag.subject=lastSubject
}}return lastSubject
};
var domplate=FBL.domplate;
FBL.domplate.context=function(context,fn){var lastContext=domplate.lastContext;
domplate.topContext=context;
fn.apply(context);
domplate.topContext=lastContext
};
FBL.TAG=function(){var embed=new DomplateEmbed();
return embed.merge(arguments)
};
FBL.FOR=function(){var loop=new DomplateLoop();
return loop.merge(arguments)
};
FBL.DomplateTag.prototype={merge:function(args,oldTag){if(oldTag){this.tagName=oldTag.tagName
}this.context=oldTag?oldTag.context:null;
this.subject=oldTag?oldTag.subject:null;
this.attrs=oldTag?copyObject(oldTag.attrs):{};
this.classes=oldTag?copyObject(oldTag.classes):{};
this.props=oldTag?copyObject(oldTag.props):null;
this.listeners=oldTag?copyArray(oldTag.listeners):null;
this.children=oldTag?copyArray(oldTag.children):[];
this.vars=oldTag?copyArray(oldTag.vars):[];
var attrs=args.length?args[0]:null;
var hasAttrs=typeof(attrs)=="object"&&!isTag(attrs);
this.children=[];
if(domplate.topContext){this.context=domplate.topContext
}if(args.length){parseChildren(args,hasAttrs?1:0,this.vars,this.children)
}if(hasAttrs){this.parseAttrs(attrs)
}return creator(this,DomplateTag)
},parseAttrs:function(args){for(var name in args){var val=parseValue(args[name]);
readPartNames(val,this.vars);
if(name.indexOf("on")==0){var eventName=name.substr(2);
if(!this.listeners){this.listeners=[]
}this.listeners.push(eventName,val)
}else{if(name.indexOf("_")==0){var propName=name.substr(1);
if(!this.props){this.props={}
}this.props[propName]=val
}else{if(name.indexOf("$")==0){var className=name.substr(1);
if(!this.classes){this.classes={}
}this.classes[className]=val
}else{if(name=="class"&&this.attrs.hasOwnProperty(name)){this.attrs[name]+=" "+val
}else{this.attrs[name]=val
}}}}}},compile:function(){if(this.renderMarkup){return
}this.compileMarkup();
this.compileDOM()
},compileMarkup:function(){this.markupArgs=[];
var topBlock=[],topOuts=[],blocks=[],info={args:this.markupArgs,argIndex:0};
this.generateMarkup(topBlock,topOuts,blocks,info);
this.addCode(topBlock,topOuts,blocks);
var fnBlock=["r=(function (__code__, __context__, __in__, __out__"];
for(var i=0;
i<info.argIndex;
++i){fnBlock.push(", s",i)
}fnBlock.push(") {");
if(this.subject){fnBlock.push("with (this) {")
}if(this.context){fnBlock.push("with (__context__) {")
}fnBlock.push("with (__in__) {");
fnBlock.push.apply(fnBlock,blocks);
if(this.subject){fnBlock.push("}")
}if(this.context){fnBlock.push("}")
}fnBlock.push("}})");
function __link__(tag,code,outputs,args){if(!tag||!tag.tag){return
}tag.tag.compile();
var tagOutputs=[];
var markupArgs=[code,tag.tag.context,args,tagOutputs];
markupArgs.push.apply(markupArgs,tag.tag.markupArgs);
tag.tag.renderMarkup.apply(tag.tag.subject,markupArgs);
outputs.push(tag);
outputs.push(tagOutputs)
}function __escape__(value){function replaceChars(ch){switch(ch){case"<":return"&lt;";
case">":return"&gt;";
case"&":return"&amp;";
case"'":return"&#39;";
case'"':return"&quot;"
}return"?"
}return String(value).replace(/[<>&"']/g,replaceChars)
}function __loop__(iter,outputs,fn){var iterOuts=[];
outputs.push(iterOuts);
if(iter instanceof Array){iter=new ArrayIterator(iter)
}try{while(1){var value=iter.next();
var itemOuts=[0,0];
iterOuts.push(itemOuts);
fn.apply(this,[value,itemOuts])
}}catch(exc){if(exc!=StopIteration){throw exc
}}}var js=fnBlock.join("");
var r=null;
eval(js);
this.renderMarkup=r
},getVarNames:function(args){if(this.vars){args.push.apply(args,this.vars)
}for(var i=0;
i<this.children.length;
++i){var child=this.children[i];
if(isTag(child)){child.tag.getVarNames(args)
}else{if(child instanceof Parts){for(var i=0;
i<child.parts.length;
++i){if(child.parts[i] instanceof Variable){var name=child.parts[i].name;
var names=name.split(".");
args.push(names[0])
}}}}}},generateMarkup:function(topBlock,topOuts,blocks,info){topBlock.push(',"<',this.tagName,'"');
for(var name in this.attrs){if(name!="class"){var val=this.attrs[name];
topBlock.push(', " ',name,'=\\""');
addParts(val,",",topBlock,info,true);
topBlock.push(', "\\""')
}}if(this.listeners){for(var i=0;
i<this.listeners.length;
i+=2){readPartNames(this.listeners[i+1],topOuts)
}}if(this.props){for(var name in this.props){readPartNames(this.props[name],topOuts)
}}if(this.attrs.hasOwnProperty("class")||this.classes){topBlock.push(', " class=\\""');
if(this.attrs.hasOwnProperty("class")){addParts(this.attrs["class"],",",topBlock,info,true)
}topBlock.push(', " "');
for(var name in this.classes){topBlock.push(", (");
addParts(this.classes[name],"",topBlock,info);
topBlock.push(' ? "',name,'" + " " : "")')
}topBlock.push(', "\\""')
}topBlock.push(',">"');
this.generateChildMarkup(topBlock,topOuts,blocks,info);
topBlock.push(',"</',this.tagName,'>"')
},generateChildMarkup:function(topBlock,topOuts,blocks,info){for(var i=0;
i<this.children.length;
++i){var child=this.children[i];
if(isTag(child)){child.tag.generateMarkup(topBlock,topOuts,blocks,info)
}else{addParts(child,",",topBlock,info,true)
}}},addCode:function(topBlock,topOuts,blocks){if(topBlock.length){blocks.push('__code__.push(""',topBlock.join(""),");")
}if(topOuts.length){blocks.push("__out__.push(",topOuts.join(","),");")
}topBlock.splice(0,topBlock.length);
topOuts.splice(0,topOuts.length)
},addLocals:function(blocks){var varNames=[];
this.getVarNames(varNames);
var map={};
for(var i=0;
i<varNames.length;
++i){var name=varNames[i];
if(map.hasOwnProperty(name)){continue
}map[name]=1;
var names=name.split(".");
blocks.push("var ",names[0]+" = __in__."+names[0]+";")
}},compileDOM:function(){var path=[];
var blocks=[];
this.domArgs=[];
path.embedIndex=0;
path.loopIndex=0;
path.staticIndex=0;
path.renderIndex=0;
var nodeCount=this.generateDOM(path,blocks,this.domArgs);
var fnBlock=["r=(function (root, context, o"];
for(var i=0;
i<path.staticIndex;
++i){fnBlock.push(", ","s"+i)
}for(var i=0;
i<path.renderIndex;
++i){fnBlock.push(", ","d"+i)
}fnBlock.push(") {");
for(var i=0;
i<path.loopIndex;
++i){fnBlock.push("var l",i," = 0;")
}for(var i=0;
i<path.embedIndex;
++i){fnBlock.push("var e",i," = 0;")
}if(this.subject){fnBlock.push("with (this) {")
}if(this.context){fnBlock.push("with (context) {")
}fnBlock.push(blocks.join(""));
if(this.subject){fnBlock.push("}")
}if(this.context){fnBlock.push("}")
}fnBlock.push("return ",nodeCount,";");
fnBlock.push("})");
function __bind__(object,fn){return function(event){return fn.apply(object,[event])
}
}function __link__(node,tag,args){if(!tag||!tag.tag){return
}tag.tag.compile();
var domArgs=[node,tag.tag.context,0];
domArgs.push.apply(domArgs,tag.tag.domArgs);
domArgs.push.apply(domArgs,args);
return tag.tag.renderDOM.apply(tag.tag.subject,domArgs)
}var self=this;
function __loop__(iter,fn){var nodeCount=0;
for(var i=0;
i<iter.length;
++i){iter[i][0]=i;
iter[i][1]=nodeCount;
nodeCount+=fn.apply(this,iter[i])
}return nodeCount
}function __path__(parent,offset){var root=parent;
for(var i=2;
i<arguments.length;
++i){var index=arguments[i];
if(i==3){index+=offset
}if(index==-1){parent=parent.parentNode
}else{parent=parent.childNodes[index]
}}return parent
}var js=fnBlock.join("");
var r=null;
eval(js);
this.renderDOM=r
},generateDOM:function(path,blocks,args){if(this.listeners||this.props){this.generateNodePath(path,blocks)
}if(this.listeners){for(var i=0;
i<this.listeners.length;
i+=2){var val=this.listeners[i+1];
var arg=generateArg(val,path,args);
blocks.push('addEvent(node, "',this.listeners[i],'", __bind__(this, ',arg,"), false);")
}}if(this.props){for(var name in this.props){var val=this.props[name];
var arg=generateArg(val,path,args);
blocks.push("node.",name," = ",arg,";")
}}this.generateChildDOM(path,blocks,args);
return 1
},generateNodePath:function(path,blocks){blocks.push("var node = __path__(root, o");
for(var i=0;
i<path.length;
++i){blocks.push(",",path[i])
}blocks.push(");")
},generateChildDOM:function(path,blocks,args){path.push(0);
for(var i=0;
i<this.children.length;
++i){var child=this.children[i];
if(isTag(child)){path[path.length-1]+="+"+child.tag.generateDOM(path,blocks,args)
}else{path[path.length-1]+="+1"
}}path.pop()
}};
FBL.DomplateEmbed.prototype=copyObject(FBL.DomplateTag.prototype,{merge:function(args,oldTag){this.value=oldTag?oldTag.value:parseValue(args[0]);
this.attrs=oldTag?oldTag.attrs:{};
this.vars=oldTag?copyArray(oldTag.vars):[];
var attrs=args[1];
for(var name in attrs){var val=parseValue(attrs[name]);
this.attrs[name]=val;
readPartNames(val,this.vars)
}return creator(this,DomplateEmbed)
},getVarNames:function(names){if(this.value instanceof Parts){names.push(this.value.parts[0].name)
}if(this.vars){names.push.apply(names,this.vars)
}},generateMarkup:function(topBlock,topOuts,blocks,info){this.addCode(topBlock,topOuts,blocks);
blocks.push("__link__(");
addParts(this.value,"",blocks,info);
blocks.push(", __code__, __out__, {");
var lastName=null;
for(var name in this.attrs){if(lastName){blocks.push(",")
}lastName=name;
var val=this.attrs[name];
blocks.push('"',name,'":');
addParts(val,"",blocks,info)
}blocks.push("});")
},generateDOM:function(path,blocks,args){var embedName="e"+path.embedIndex++;
this.generateNodePath(path,blocks);
var valueName="d"+path.renderIndex++;
var argsName="d"+path.renderIndex++;
blocks.push(embedName+" = __link__(node, ",valueName,", ",argsName,");");
return embedName
}});
FBL.DomplateLoop.prototype=copyObject(FBL.DomplateTag.prototype,{merge:function(args,oldTag){this.varName=oldTag?oldTag.varName:args[0];
this.iter=oldTag?oldTag.iter:parseValue(args[1]);
this.vars=[];
this.children=oldTag?copyArray(oldTag.children):[];
var offset=Math.min(args.length,2);
parseChildren(args,offset,this.vars,this.children);
return creator(this,DomplateLoop)
},getVarNames:function(names){if(this.iter instanceof Parts){names.push(this.iter.parts[0].name)
}DomplateTag.prototype.getVarNames.apply(this,[names])
},generateMarkup:function(topBlock,topOuts,blocks,info){this.addCode(topBlock,topOuts,blocks);
var iterName;
if(this.iter instanceof Parts){var part=this.iter.parts[0];
iterName=part.name;
if(part.format){for(var i=0;
i<part.format.length;
++i){iterName=part.format[i]+"("+iterName+")"
}}}else{iterName=this.iter
}blocks.push("__loop__.apply(this, [",iterName,", __out__, function(",this.varName,", __out__) {");
this.generateChildMarkup(topBlock,topOuts,blocks,info);
this.addCode(topBlock,topOuts,blocks);
blocks.push("}]);")
},generateDOM:function(path,blocks,args){var iterName="d"+path.renderIndex++;
var counterName="i"+path.loopIndex;
var loopName="l"+path.loopIndex++;
if(!path.length){path.push(-1,0)
}var preIndex=path.renderIndex;
path.renderIndex=0;
var nodeCount=0;
var subBlocks=[];
var basePath=path[path.length-1];
for(var i=0;
i<this.children.length;
++i){path[path.length-1]=basePath+"+"+loopName+"+"+nodeCount;
var child=this.children[i];
if(isTag(child)){nodeCount+="+"+child.tag.generateDOM(path,subBlocks,args)
}else{nodeCount+="+1"
}}path[path.length-1]=basePath+"+"+loopName;
blocks.push(loopName," = __loop__.apply(this, [",iterName,", function(",counterName,",",loopName);
for(var i=0;
i<path.renderIndex;
++i){blocks.push(",d"+i)
}blocks.push(") {");
blocks.push(subBlocks.join(""));
blocks.push("return ",nodeCount,";");
blocks.push("}]);");
path.renderIndex=preIndex;
return loopName
}});
function Variable(name,format){this.name=name;
this.format=format
}function Parts(parts){this.parts=parts
}function parseParts(str){var re=/\$([_A-Za-z][_A-Za-z0-9.|]*)/g;
var index=0;
var parts=[];
var m;
while(m=re.exec(str)){var pre=str.substr(index,(re.lastIndex-m[0].length)-index);
if(pre){parts.push(pre)
}var expr=m[1].split("|");
parts.push(new Variable(expr[0],expr.slice(1)));
index=re.lastIndex
}if(!index){return str
}var post=str.substr(index);
if(post){parts.push(post)
}return new Parts(parts)
}function parseValue(val){return typeof(val)=="string"?parseParts(val):val
}function parseChildren(args,offset,vars,children){for(var i=offset;
i<args.length;
++i){var val=parseValue(args[i]);
children.push(val);
readPartNames(val,vars)
}}function readPartNames(val,vars){if(val instanceof Parts){for(var i=0;
i<val.parts.length;
++i){var part=val.parts[i];
if(part instanceof Variable){vars.push(part.name)
}}}}function generateArg(val,path,args){if(val instanceof Parts){var vals=[];
for(var i=0;
i<val.parts.length;
++i){var part=val.parts[i];
if(part instanceof Variable){var varName="d"+path.renderIndex++;
if(part.format){for(var j=0;
j<part.format.length;
++j){varName=part.format[j]+"("+varName+")"
}}vals.push(varName)
}else{vals.push('"'+part.replace(/"/g,'\\"')+'"')
}}return vals.join("+")
}else{args.push(val);
return"s"+path.staticIndex++
}}function addParts(val,delim,block,info,escapeIt){var vals=[];
if(val instanceof Parts){for(var i=0;
i<val.parts.length;
++i){var part=val.parts[i];
if(part instanceof Variable){var partName=part.name;
if(part.format){for(var j=0;
j<part.format.length;
++j){partName=part.format[j]+"("+partName+")"
}}if(escapeIt){vals.push("__escape__("+partName+")")
}else{vals.push(partName)
}}else{vals.push('"'+part+'"')
}}}else{if(isTag(val)){info.args.push(val);
vals.push("s"+info.argIndex++)
}else{vals.push('"'+val+'"')
}}var parts=vals.join(delim);
if(parts){block.push(delim,parts)
}}function isTag(obj){return(typeof(obj)=="function"||obj instanceof Function)&&!!obj.tag
}function creator(tag,cons){var fn=new Function("var tag = arguments.callee.tag;var cons = arguments.callee.cons;var newTag = new cons();return newTag.merge(arguments, tag);");
fn.tag=tag;
fn.cons=cons;
extend(fn,Renderer);
return fn
}function copyArray(oldArray){var ary=[];
if(oldArray){for(var i=0;
i<oldArray.length;
++i){ary.push(oldArray[i])
}}return ary
}function copyObject(l,r){var m={};
extend(m,l);
extend(m,r);
return m
}function extend(l,r){for(var n in r){l[n]=r[n]
}}function addEvent(object,name,handler){if(document.all){object.attachEvent("on"+name,handler)
}else{object.addEventListener(name,handler,false)
}}function ArrayIterator(array){var index=-1;
this.next=function(){if(++index>=array.length){throw StopIteration
}return array[index]
}
}function StopIteration(){}FBL.$break=function(){throw StopIteration
};
var Renderer={renderHTML:function(args,outputs,self){var code=[];
var markupArgs=[code,this.tag.context,args,outputs];
markupArgs.push.apply(markupArgs,this.tag.markupArgs);
this.tag.renderMarkup.apply(self?self:this.tag.subject,markupArgs);
return code.join("")
},insertRows:function(args,before,self){this.tag.compile();
var outputs=[];
var html=this.renderHTML(args,outputs,self);
var doc=before.ownerDocument;
var div=doc.createElement("div");
div.innerHTML="<table><tbody>"+html+"</tbody></table>";
var tbody=div.firstChild.firstChild;
var parent=before.tagName=="TR"?before.parentNode:before;
var after=before.tagName=="TR"?before.nextSibling:null;
var firstRow=tbody.firstChild,lastRow;
while(tbody.firstChild){lastRow=tbody.firstChild;
if(after){parent.insertBefore(lastRow,after)
}else{parent.appendChild(lastRow)
}}var offset=0;
if(before.tagName=="TR"){var node=firstRow.parentNode.firstChild;
for(;
node&&node!=firstRow;
node=node.nextSibling){++offset
}}var domArgs=[firstRow,this.tag.context,offset];
domArgs.push.apply(domArgs,this.tag.domArgs);
domArgs.push.apply(domArgs,outputs);
this.tag.renderDOM.apply(self?self:this.tag.subject,domArgs);
return[firstRow,lastRow]
},insertBefore:function(args,before,self){return this.insertNode(args,before.ownerDocument,before,false,self)
},insertAfter:function(args,after,self){return this.insertNode(args,after.ownerDocument,after,true,self)
},insertNode:function(args,doc,element,isAfter,self){if(!args){args={}
}this.tag.compile();
var outputs=[];
var html=this.renderHTML(args,outputs,self);
var doc=element.ownerDocument;
if(!womb||womb.ownerDocument!=doc){womb=doc.createElement("div")
}womb.innerHTML=html;
var root=womb.firstChild;
if(isAfter){while(womb.firstChild){if(element.nextSibling){element.parentNode.insertBefore(womb.firstChild,element.nextSibling)
}else{element.parentNode.appendChild(womb.firstChild)
}}}else{while(womb.lastChild){element.parentNode.insertBefore(womb.lastChild,element)
}}var domArgs=[root,this.tag.context,0];
domArgs.push.apply(domArgs,this.tag.domArgs);
domArgs.push.apply(domArgs,outputs);
this.tag.renderDOM.apply(self?self:this.tag.subject,domArgs);
return root
},replace:function(args,parent,self){this.tag.compile();
var outputs=[];
var html=this.renderHTML(args,outputs,self);
var root;
if(parent.nodeType==1){parent.innerHTML=html;
root=parent.firstChild
}else{if(!parent||parent.nodeType!=9){parent=document
}if(!womb||womb.ownerDocument!=parent){womb=parent.createElement("div")
}womb.innerHTML=html;
root=womb.firstChild
}var domArgs=[root,this.tag.context,0];
domArgs.push.apply(domArgs,this.tag.domArgs);
domArgs.push.apply(domArgs,outputs);
this.tag.renderDOM.apply(self?self:this.tag.subject,domArgs);
return root
},append:function(args,parent,self){this.tag.compile();
var outputs=[];
var html=this.renderHTML(args,outputs,self);
if(!womb||womb.ownerDocument!=parent.ownerDocument){womb=parent.ownerDocument.createElement("div")
}womb.innerHTML=html;
var root=womb.firstChild;
while(womb.firstChild){parent.appendChild(womb.firstChild)
}womb=null;
var domArgs=[root,this.tag.context,0];
domArgs.push.apply(domArgs,this.tag.domArgs);
domArgs.push.apply(domArgs,outputs);
this.tag.renderDOM.apply(self?self:this.tag.subject,domArgs);
return root
}};
function defineTags(){for(var i=0;
i<arguments.length;
++i){var tagName=arguments[i];
var fn=new Function("var newTag = new arguments.callee.DomplateTag('"+tagName+"'); return newTag.merge(arguments);");
fn.DomplateTag=DomplateTag;
var fnName=tagName.toUpperCase();
FBL[fnName]=fn
}}defineTags("a","button","br","canvas","code","col","colgroup","div","fieldset","form","h1","h2","h3","hr","img","input","label","legend","li","ol","optgroup","option","p","pre","select","span","strong","table","tbody","td","textarea","tfoot","th","thead","tr","tt","ul","iframe")
})();
var FirebugReps=FBL.ns(function(){with(FBL){var OBJECTBOX=this.OBJECTBOX=SPAN({"class":"objectBox objectBox-$className"});
var OBJECTBLOCK=this.OBJECTBLOCK=DIV({"class":"objectBox objectBox-$className"});
var OBJECTLINK=this.OBJECTLINK=isIE6?A({"class":"objectLink objectLink-$className a11yFocus",href:"javascript:void(0)",title:"$object|FBL.getElementXPath",_repObject:"$object"}):A({"class":"objectLink objectLink-$className a11yFocus",title:"$object|FBL.getElementXPath",_repObject:"$object"});
this.Undefined=domplate(Firebug.Rep,{tag:OBJECTBOX("undefined"),className:"undefined",supportsObject:function(object,type){return type=="undefined"
}});
this.Null=domplate(Firebug.Rep,{tag:OBJECTBOX("null"),className:"null",supportsObject:function(object,type){return object==null
}});
this.Nada=domplate(Firebug.Rep,{tag:SPAN(""),className:"nada"});
this.Number=domplate(Firebug.Rep,{tag:OBJECTBOX("$object"),className:"number",supportsObject:function(object,type){return type=="boolean"||type=="number"
}});
this.String=domplate(Firebug.Rep,{tag:OBJECTBOX("&quot;$object&quot;"),shortTag:OBJECTBOX("&quot;$object|cropString&quot;"),className:"string",supportsObject:function(object,type){return type=="string"
}});
this.Text=domplate(Firebug.Rep,{tag:OBJECTBOX("$object"),shortTag:OBJECTBOX("$object|cropString"),className:"text"});
this.Caption=domplate(Firebug.Rep,{tag:SPAN({"class":"caption"},"$object")});
this.Warning=domplate(Firebug.Rep,{tag:DIV({"class":"warning focusRow",role:"listitem"},"$object|STR")});
this.Func=domplate(Firebug.Rep,{tag:OBJECTLINK("$object|summarizeFunction"),summarizeFunction:function(fn){var fnRegex=/function ([^(]+\([^)]*\)) \{/;
var fnText=safeToString(fn);
var m=fnRegex.exec(fnText);
return m?m[1]:"function()"
},copySource:function(fn){copyToClipboard(safeToString(fn))
},monitor:function(fn,script,monitored){if(monitored){Firebug.Debugger.unmonitorScript(fn,script,"monitor")
}else{Firebug.Debugger.monitorScript(fn,script,"monitor")
}},className:"function",supportsObject:function(object,type){return isFunction(object)
},inspectObject:function(fn,context){var sourceLink=findSourceForFunction(fn,context);
if(sourceLink){Firebug.chrome.select(sourceLink)
}if(FBTrace.DBG_FUNCTION_NAME){FBTrace.sysout("reps.function.inspectObject selected sourceLink is ",sourceLink)
}},getTooltip:function(fn,context){var script=findScriptForFunctionInContext(context,fn);
if(script){return $STRF("Line",[normalizeURL(script.fileName),script.baseLineNumber])
}else{if(fn.toString){return fn.toString()
}}},getTitle:function(fn,context){var name=fn.name?fn.name:"function";
return name+"()"
},getContextMenuItems:function(fn,target,context,script){if(!script){script=findScriptForFunctionInContext(context,fn)
}if(!script){return
}var scriptInfo=getSourceFileAndLineByScript(context,script);
var monitored=scriptInfo?fbs.isMonitored(scriptInfo.sourceFile.href,scriptInfo.lineNo):false;
var name=script?getFunctionName(script,context):fn.name;
return[{label:"CopySource",command:bindFixed(this.copySource,this,fn)},"-",{label:$STRF("ShowCallsInConsole",[name]),nol10n:true,type:"checkbox",checked:monitored,command:bindFixed(this.monitor,this,fn,script,monitored)}]
}});
this.Obj=domplate(Firebug.Rep,{tag:OBJECTLINK(SPAN({"class":"objectTitle"},"$object|getTitle "),SPAN({"class":"objectProps"},SPAN({"class":"objectLeftBrace",role:"presentation"},"{"),FOR("prop","$object|propIterator",SPAN({"class":"objectPropName",role:"presentation"},"$prop.name"),SPAN({"class":"objectEqual",role:"presentation"},"$prop.equal"),TAG("$prop.tag",{object:"$prop.object"}),SPAN({"class":"objectComma",role:"presentation"},"$prop.delim")),SPAN({"class":"objectRightBrace"},"}"))),propNumberTag:SPAN({"class":"objectProp-number"},"$object"),propStringTag:SPAN({"class":"objectProp-string"},"&quot;$object&quot;"),propObjectTag:SPAN({"class":"objectProp-object"},"$object"),propIterator:function(object){var maxLength=55;
if(!object){return[]
}var props=[];
var length=0;
var numProperties=0;
var numPropertiesShown=0;
var maxLengthReached=false;
var lib=this;
var propRepsMap={"boolean":this.propNumberTag,number:this.propNumberTag,string:this.propStringTag,object:this.propObjectTag};
try{var title=Firebug.Rep.getTitle(object);
length+=title.length;
for(var name in object){var value;
try{value=object[name]
}catch(exc){continue
}var type=typeof(value);
if(type=="boolean"||type=="number"||(type=="string"&&value)||(type=="object"&&value&&value.toString)){var tag=propRepsMap[type];
var value=(type=="object")?Firebug.getRep(value).getTitle(value):value+"";
length+=name.length+value.length+4;
if(length<=maxLength){props.push({tag:tag,name:name,object:value,equal:"=",delim:", "});
numPropertiesShown++
}else{maxLengthReached=true
}}numProperties++;
if(maxLengthReached&&numProperties>numPropertiesShown){break
}}if(numProperties>numPropertiesShown){props.push({object:"...",tag:FirebugReps.Caption.tag,name:"",equal:"",delim:""})
}else{if(props.length>0){props[props.length-1].delim=""
}}}catch(exc){}return props
},fb_1_6_propIterator:function(object,max){max=max||3;
if(!object){return[]
}var props=[];
var len=0,count=0;
try{for(var name in object){var value;
try{value=object[name]
}catch(exc){continue
}var t=typeof(value);
if(t=="boolean"||t=="number"||(t=="string"&&value)||(t=="object"&&value&&value.toString)){var rep=Firebug.getRep(value);
var tag=rep.shortTag||rep.tag;
if(t=="object"){value=rep.getTitle(value);
tag=rep.titleTag
}count++;
if(count<=max){props.push({tag:tag,name:name,object:value,equal:"=",delim:", "})
}else{break
}}}if(count>max){props[Math.max(1,max-1)]={object:"more...",tag:FirebugReps.Caption.tag,name:"",equal:"",delim:""}
}else{if(props.length>0){props[props.length-1].delim=""
}}}catch(exc){}return props
},className:"object",supportsObject:function(object,type){return true
}});
this.Arr=domplate(Firebug.Rep,{tag:OBJECTBOX({_repObject:"$object"},SPAN({"class":"arrayLeftBracket",role:"presentation"},"["),FOR("item","$object|arrayIterator",TAG("$item.tag",{object:"$item.object"}),SPAN({"class":"arrayComma",role:"presentation"},"$item.delim")),SPAN({"class":"arrayRightBracket",role:"presentation"},"]")),shortTag:OBJECTBOX({_repObject:"$object"},SPAN({"class":"arrayLeftBracket",role:"presentation"},"["),FOR("item","$object|shortArrayIterator",TAG("$item.tag",{object:"$item.object"}),SPAN({"class":"arrayComma",role:"presentation"},"$item.delim")),SPAN({"class":"arrayRightBracket"},"]")),arrayIterator:function(array){var items=[];
for(var i=0;
i<array.length;
++i){var value=array[i];
var rep=Firebug.getRep(value);
var tag=rep.shortTag?rep.shortTag:rep.tag;
var delim=(i==array.length-1?"":", ");
items.push({object:value,tag:tag,delim:delim})
}return items
},shortArrayIterator:function(array){var items=[];
for(var i=0;
i<array.length&&i<3;
++i){var value=array[i];
var rep=Firebug.getRep(value);
var tag=rep.shortTag?rep.shortTag:rep.tag;
var delim=(i==array.length-1?"":", ");
items.push({object:value,tag:tag,delim:delim})
}if(array.length>3){items.push({object:(array.length-3)+" more...",tag:FirebugReps.Caption.tag,delim:""})
}return items
},shortPropIterator:this.Obj.propIterator,getItemIndex:function(child){var arrayIndex=0;
for(child=child.previousSibling;
child;
child=child.previousSibling){if(child.repObject){++arrayIndex
}}return arrayIndex
},className:"array",supportsObject:function(object){return this.isArray(object)
},isArray:function(obj){try{if(!obj){return false
}else{if(isIE&&!isFunction(obj)&&typeof obj=="object"&&isFinite(obj.length)&&obj.nodeType!=8){return true
}else{if(isFinite(obj.length)&&isFunction(obj.splice)){return true
}else{if(isFinite(obj.length)&&isFunction(obj.callee)){return true
}else{if(instanceOf(obj,"HTMLCollection")){return true
}else{if(instanceOf(obj,"NodeList")){return true
}else{return false
}}}}}}}catch(exc){if(FBTrace.DBG_ERRORS){FBTrace.sysout("isArray FAILS:",exc);
FBTrace.sysout("isArray Fails on obj",obj)
}}return false
},getTitle:function(object,context){return"["+object.length+"]"
}});
this.Property=domplate(Firebug.Rep,{supportsObject:function(object){return object instanceof Property
},getRealObject:function(prop,context){return prop.object[prop.name]
},getTitle:function(prop,context){return prop.name
}});
this.NetFile=domplate(this.Obj,{supportsObject:function(object){return object instanceof Firebug.NetFile
},browseObject:function(file,context){openNewTab(file.href);
return true
},getRealObject:function(file,context){return null
}});
this.Except=domplate(Firebug.Rep,{tag:OBJECTBOX({_repObject:"$object"},"$object.message"),className:"exception",supportsObject:function(object){return object instanceof ErrorCopy
}});
this.Element=domplate(Firebug.Rep,{tag:OBJECTLINK("&lt;",SPAN({"class":"nodeTag"},"$object.nodeName|toLowerCase"),FOR("attr","$object|attrIterator","&nbsp;$attr.nodeName=&quot;",SPAN({"class":"nodeValue"},"$attr.nodeValue"),"&quot;"),"&gt;"),shortTag:OBJECTLINK(SPAN({"class":"$object|getVisible"},SPAN({"class":"selectorTag"},"$object|getSelectorTag"),SPAN({"class":"selectorId"},"$object|getSelectorId"),SPAN({"class":"selectorClass"},"$object|getSelectorClass"),SPAN({"class":"selectorValue"},"$object|getValue"))),getVisible:function(elt){return isVisible(elt)?"":"selectorHidden"
},getSelectorTag:function(elt){return elt.nodeName.toLowerCase()
},getSelectorId:function(elt){return elt.id?"#"+elt.id:""
},getSelectorClass:function(elt){return elt.className?"."+elt.className.split(" ")[0]:""
},getValue:function(elt){return"";
var value;
if(elt instanceof HTMLImageElement){value=getFileName(elt.src)
}else{if(elt instanceof HTMLAnchorElement){value=getFileName(elt.href)
}else{if(elt instanceof HTMLInputElement){value=elt.value
}else{if(elt instanceof HTMLFormElement){value=getFileName(elt.action)
}else{if(elt instanceof HTMLScriptElement){value=getFileName(elt.src)
}}}}}return value?" "+cropString(value,20):""
},attrIterator:function(elt){var attrs=[];
var idAttr,classAttr;
if(elt.attributes){for(var i=0;
i<elt.attributes.length;
++i){var attr=elt.attributes[i];
if(!attr.specified||attr.nodeName&&attr.nodeName.indexOf("firebug-")!=-1){continue
}else{if(attr.nodeName=="id"){idAttr=attr
}else{if(attr.nodeName=="class"){classAttr=attr
}else{if(attr.nodeName=="style"){attrs.push({nodeName:attr.nodeName,nodeValue:attr.nodeValue||elt.style.cssText.replace(/([^\s]+)\s*:/g,function(m,g){return g.toLowerCase()+":"
})})
}else{attrs.push(attr)
}}}}}}if(classAttr){attrs.splice(0,0,classAttr)
}if(idAttr){attrs.splice(0,0,idAttr)
}return attrs
},shortAttrIterator:function(elt){var attrs=[];
if(elt.attributes){for(var i=0;
i<elt.attributes.length;
++i){var attr=elt.attributes[i];
if(attr.nodeName=="id"||attr.nodeName=="class"){attrs.push(attr)
}}}return attrs
},getHidden:function(elt){return isVisible(elt)?"":"nodeHidden"
},getXPath:function(elt){return getElementTreeXPath(elt)
},getNodeText:function(element){var text=element.textContent;
if(Firebug.showFullTextNodes){return text
}else{return cropString(text,50)
}},getNodeTextGroups:function(element){var text=element.textContent;
if(!Firebug.showFullTextNodes){text=cropString(text,50)
}var escapeGroups=[];
if(Firebug.showTextNodesWithWhitespace){escapeGroups.push({group:"whitespace","class":"nodeWhiteSpace",extra:{"\t":"_Tab","\n":"_Para"," ":"_Space"}})
}if(Firebug.showTextNodesWithEntities){escapeGroups.push({group:"text","class":"nodeTextEntity",extra:{}})
}if(escapeGroups.length){return escapeGroupsForEntities(text,escapeGroups)
}else{return[{str:text,"class":"",extra:""}]
}},copyHTML:function(elt){var html=getElementXML(elt);
copyToClipboard(html)
},copyInnerHTML:function(elt){copyToClipboard(elt.innerHTML)
},copyXPath:function(elt){var xpath=getElementXPath(elt);
copyToClipboard(xpath)
},persistor:function(context,xpath){var elts=xpath?getElementsByXPath(context.window.document,xpath):null;
return elts&&elts.length?elts[0]:null
},className:"element",supportsObject:function(object){return instanceOf(object,"Element")
},browseObject:function(elt,context){var tag=elt.nodeName.toLowerCase();
if(tag=="script"){openNewTab(elt.src)
}else{if(tag=="link"){openNewTab(elt.href)
}else{if(tag=="a"){openNewTab(elt.href)
}else{if(tag=="img"){openNewTab(elt.src)
}}}}return true
},persistObject:function(elt,context){var xpath=getElementXPath(elt);
return bind(this.persistor,top,xpath)
},getTitle:function(element,context){return getElementCSSSelector(element)
},getTooltip:function(elt){return this.getXPath(elt)
},getContextMenuItems:function(elt,target,context){var monitored=areEventsMonitored(elt,null,context);
return[{label:"CopyHTML",command:bindFixed(this.copyHTML,this,elt)},{label:"CopyInnerHTML",command:bindFixed(this.copyInnerHTML,this,elt)},{label:"CopyXPath",command:bindFixed(this.copyXPath,this,elt)},"-",{label:"ShowEventsInConsole",type:"checkbox",checked:monitored,command:bindFixed(toggleMonitorEvents,FBL,elt,null,monitored,context)},"-",{label:"ScrollIntoView",command:bindFixed(elt.scrollIntoView,elt)}]
}});
this.TextNode=domplate(Firebug.Rep,{tag:OBJECTLINK("&lt;",SPAN({"class":"nodeTag"},"TextNode"),"&nbsp;textContent=&quot;",SPAN({"class":"nodeValue"},"$object.textContent|cropString"),"&quot;","&gt;"),className:"textNode",supportsObject:function(object){return object instanceof Text
}});
this.Document=domplate(Firebug.Rep,{tag:OBJECTLINK("Document ",SPAN({"class":"objectPropValue"},"$object|getLocation")),getLocation:function(doc){return doc.location?getFileName(doc.location.href):""
},className:"object",supportsObject:function(object){return instanceOf(object,"Document")
},browseObject:function(doc,context){openNewTab(doc.location.href);
return true
},persistObject:function(doc,context){return this.persistor
},persistor:function(context){return context.window.document
},getTitle:function(win,context){return"document"
},getTooltip:function(doc){return doc.location.href
}});
this.StyleSheet=domplate(Firebug.Rep,{tag:OBJECTLINK("StyleSheet ",SPAN({"class":"objectPropValue"},"$object|getLocation")),getLocation:function(styleSheet){return getFileName(styleSheet.href)
},copyURL:function(styleSheet){copyToClipboard(styleSheet.href)
},openInTab:function(styleSheet){openNewTab(styleSheet.href)
},className:"object",supportsObject:function(object){return instanceOf(object,"CSSStyleSheet")
},browseObject:function(styleSheet,context){openNewTab(styleSheet.href);
return true
},persistObject:function(styleSheet,context){return bind(this.persistor,top,styleSheet.href)
},getTooltip:function(styleSheet){return styleSheet.href
},getContextMenuItems:function(styleSheet,target,context){return[{label:"CopyLocation",command:bindFixed(this.copyURL,this,styleSheet)},"-",{label:"OpenInTab",command:bindFixed(this.openInTab,this,styleSheet)}]
},persistor:function(context,href){return getStyleSheetByHref(href,context)
}});
this.Window=domplate(Firebug.Rep,{tag:OBJECTLINK("Window ",SPAN({"class":"objectPropValue"},"$object|getLocation")),getLocation:function(win){try{return(win&&win.location&&!win.closed)?getFileName(win.location.href):""
}catch(exc){if(FBTrace.DBG_ERRORS){FBTrace.sysout("reps.Window window closed?")
}}},className:"object",supportsObject:function(object){return instanceOf(object,"Window")
},browseObject:function(win,context){openNewTab(win.location.href);
return true
},persistObject:function(win,context){return this.persistor
},persistor:function(context){return context.window
},getTitle:function(win,context){return"window"
},getTooltip:function(win){if(win&&!win.closed){return win.location.href
}}});
this.Event=domplate(Firebug.Rep,{tag:TAG("$copyEventTag",{object:"$object|copyEvent"}),copyEventTag:OBJECTLINK("$object|summarizeEvent"),summarizeEvent:function(event){var info=[event.type," "];
var eventFamily=getEventFamily(event.type);
if(eventFamily=="mouse"){info.push("clientX=",event.clientX,", clientY=",event.clientY)
}else{if(eventFamily=="key"){info.push("charCode=",event.charCode,", keyCode=",event.keyCode)
}}return info.join("")
},copyEvent:function(event){return new EventCopy(event)
},className:"object",supportsObject:function(object){return instanceOf(object,"Event")||instanceOf(object,"EventCopy")
},getTitle:function(event,context){return"Event "+event.type
}});
this.SourceLink=domplate(Firebug.Rep,{tag:OBJECTLINK({$collapsed:"$object|hideSourceLink"},"$object|getSourceLinkTitle"),hideSourceLink:function(sourceLink){return sourceLink?sourceLink.href.indexOf("XPCSafeJSObjectWrapper")!=-1:true
},getSourceLinkTitle:function(sourceLink){if(!sourceLink){return""
}try{var fileName=getFileName(sourceLink.href);
fileName=decodeURIComponent(fileName);
fileName=cropString(fileName,17)
}catch(exc){if(FBTrace.DBG_ERRORS){FBTrace.sysout("reps.getSourceLinkTitle decodeURIComponent fails for '"+fileName+"': "+exc,exc)
}}return typeof sourceLink.line=="number"?fileName+" (line "+sourceLink.line+")":fileName
},copyLink:function(sourceLink){copyToClipboard(sourceLink.href)
},openInTab:function(sourceLink){openNewTab(sourceLink.href)
},className:"sourceLink",supportsObject:function(object){return object instanceof SourceLink
},getTooltip:function(sourceLink){return decodeURI(sourceLink.href)
},inspectObject:function(sourceLink,context){if(sourceLink.type=="js"){var scriptFile=getSourceFileByHref(sourceLink.href,context);
if(scriptFile){return Firebug.chrome.select(sourceLink)
}}else{if(sourceLink.type=="css"){if(sourceLink.object){Firebug.chrome.select(sourceLink.object);
return
}var stylesheet=getStyleSheetByHref(sourceLink.href,context);
if(stylesheet){var ownerNode=stylesheet.ownerNode;
if(ownerNode){Firebug.chrome.select(sourceLink,"html");
return
}var panel=context.getPanel("stylesheet");
if(panel&&panel.getRuleByLine(stylesheet,sourceLink.line)){return Firebug.chrome.select(sourceLink)
}}}}viewSource(sourceLink.href,sourceLink.line)
},browseObject:function(sourceLink,context){openNewTab(sourceLink.href);
return true
},getContextMenuItems:function(sourceLink,target,context){return[{label:"CopyLocation",command:bindFixed(this.copyLink,this,sourceLink)},"-",{label:"OpenInTab",command:bindFixed(this.openInTab,this,sourceLink)}]
}});
this.SourceFile=domplate(this.SourceLink,{tag:OBJECTLINK({$collapsed:"$object|hideSourceLink"},"$object|getSourceLinkTitle"),persistor:function(context,href){return getSourceFileByHref(href,context)
},className:"sourceFile",supportsObject:function(object){return object instanceof SourceFile
},persistObject:function(sourceFile){return bind(this.persistor,top,sourceFile.href)
},browseObject:function(sourceLink,context){},getTooltip:function(sourceFile){return sourceFile.href
}});
this.StackFrame=domplate(Firebug.Rep,{tag:OBJECTBLOCK(A({"class":"objectLink objectLink-function focusRow a11yFocus",_repObject:"$object.fn"},"$object|getCallName")," ( ",FOR("arg","$object|argIterator",TAG("$arg.tag",{object:"$arg.value"}),SPAN({"class":"arrayComma"},"$arg.delim"))," )",SPAN({"class":"objectLink-sourceLink objectLink"},"$object|getSourceLinkTitle")),getCallName:function(frame){return frame.name||"anonymous"
},getSourceLinkTitle:function(frame){var fileName=cropString(getFileName(frame.href),20);
return fileName+(frame.lineNo?" (line "+frame.lineNo+")":"");
var fileName=cropString(getFileName(frame.href),17);
return $STRF("Line",[fileName,frame.lineNo])
},argIterator:function(frame){if(!frame.args){return[]
}var items=[];
for(var i=0;
i<frame.args.length;
++i){var arg=frame.args[i];
if(!arg){break
}var rep=Firebug.getRep(arg.value);
var tag=rep.shortTag?rep.shortTag:rep.tag;
var delim=(i==frame.args.length-1?"":", ");
items.push({name:arg.name,value:arg.value,tag:tag,delim:delim})
}return items
},className:"stackFrame",supportsObject:function(object){return object instanceof StackFrame
},inspectObject:function(stackFrame,context){var sourceLink=new SourceLink(stackFrame.href,stackFrame.lineNo,"js");
Firebug.chrome.select(sourceLink)
},getTooltip:function(stackFrame,context){return $STRF("Line",[stackFrame.href,stackFrame.lineNo])
}});
this.StackTrace=domplate(Firebug.Rep,{tag:FOR("frame","$object.frames focusRow",TAG(this.StackFrame.tag,{object:"$frame"})),className:"stackTrace",supportsObject:function(object){return object instanceof StackTrace
}});
this.jsdStackFrame=domplate(Firebug.Rep,{inspectable:false,supportsObject:function(object){return(object instanceof jsdIStackFrame)&&(object.isValid)
},getTitle:function(frame,context){if(!frame.isValid){return"(invalid frame)"
}return getFunctionName(frame.script,context)
},getTooltip:function(frame,context){if(!frame.isValid){return"(invalid frame)"
}var sourceInfo=FBL.getSourceFileAndLineByScript(context,frame.script,frame);
if(sourceInfo){return $STRF("Line",[sourceInfo.sourceFile.href,sourceInfo.lineNo])
}else{return $STRF("Line",[frame.script.fileName,frame.line])
}},getContextMenuItems:function(frame,target,context){var fn=frame.script.functionObject.getWrappedValue();
return FirebugReps.Func.getContextMenuItems(fn,target,context,frame.script)
}});
this.ErrorMessage=domplate(Firebug.Rep,{tag:OBJECTBOX({$hasTwisty:"$object|hasStackTrace",$hasBreakSwitch:"$object|hasBreakSwitch",$breakForError:"$object|hasErrorBreak",_repObject:"$object",_stackTrace:"$object|getLastErrorStackTrace",onclick:"$onToggleError"},DIV({"class":"errorTitle a11yFocus",role:"checkbox","aria-checked":"false"},"$object.message|getMessage"),DIV({"class":"errorTrace"}),DIV({"class":"errorSourceBox errorSource-$object|getSourceType"},IMG({"class":"errorBreak a11yFocus",src:"blank.gif",role:"checkbox","aria-checked":"false",title:"Break on this error"}),A({"class":"errorSource a11yFocus"},"$object|getLine")),TAG(this.SourceLink.tag,{object:"$object|getSourceLink"})),getLastErrorStackTrace:function(error){return error.trace
},hasStackTrace:function(error){var url=error.href.toString();
var fromCommandLine=(url.indexOf("XPCSafeJSObjectWrapper")!=-1);
return !fromCommandLine&&error.trace
},hasBreakSwitch:function(error){return error.href&&error.lineNo>0
},hasErrorBreak:function(error){return fbs.hasErrorBreakpoint(error.href,error.lineNo)
},getMessage:function(message){var re=/\[Exception... "(.*?)" nsresult:/;
var m=re.exec(message);
return m?m[1]:message
},getLine:function(error){if(error.category=="js"){if(error.source){return cropString(error.source,80)
}else{if(error.href&&error.href.indexOf("XPCSafeJSObjectWrapper")==-1){return cropString(error.getSourceLine(),80)
}}}},getSourceLink:function(error){var ext=error.category=="css"?"css":"js";
return error.lineNo?new SourceLink(error.href,error.lineNo,ext):null
},getSourceType:function(error){if(error.source){return"syntax"
}else{if(error.lineNo==1&&getFileExtension(error.href)!="js"){return"none"
}else{if(error.category=="css"){return"none"
}else{if(!error.href||!error.lineNo){return"none"
}else{return"exec"
}}}}},onToggleError:function(event){var target=event.currentTarget;
if(hasClass(event.target,"errorBreak")){this.breakOnThisError(target.repObject)
}else{if(hasClass(event.target,"errorSource")){var panel=Firebug.getElementPanel(event.target);
this.inspectObject(target.repObject,panel.context)
}else{if(hasClass(event.target,"errorTitle")){var traceBox=target.childNodes[1];
toggleClass(target,"opened");
event.target.setAttribute("aria-checked",hasClass(target,"opened"));
if(hasClass(target,"opened")){if(target.stackTrace){var node=FirebugReps.StackTrace.tag.append({object:target.stackTrace},traceBox)
}if(Firebug.A11yModel.enabled){var panel=Firebug.getElementPanel(event.target);
dispatch([Firebug.A11yModel],"onLogRowContentCreated",[panel,traceBox])
}}else{clearNode(traceBox)
}}}}},copyError:function(error){var message=[this.getMessage(error.message),error.href,"Line "+error.lineNo];
copyToClipboard(message.join("\n"))
},breakOnThisError:function(error){if(this.hasErrorBreak(error)){Firebug.Debugger.clearErrorBreakpoint(error.href,error.lineNo)
}else{Firebug.Debugger.setErrorBreakpoint(error.href,error.lineNo)
}},className:"errorMessage",inspectable:false,supportsObject:function(object){return object instanceof ErrorMessage
},inspectObject:function(error,context){var sourceLink=this.getSourceLink(error);
FirebugReps.SourceLink.inspectObject(sourceLink,context)
},getContextMenuItems:function(error,target,context){var breakOnThisError=this.hasErrorBreak(error);
var items=[{label:"CopyError",command:bindFixed(this.copyError,this,error)}];
if(error.category=="css"){items.push("-",{label:"BreakOnThisError",type:"checkbox",checked:breakOnThisError,command:bindFixed(this.breakOnThisError,this,error)},optionMenu("BreakOnAllErrors","breakOnErrors"))
}return items
}});
this.Assert=domplate(Firebug.Rep,{tag:DIV(DIV({"class":"errorTitle"}),DIV({"class":"assertDescription"})),className:"assert",inspectObject:function(error,context){var sourceLink=this.getSourceLink(error);
Firebug.chrome.select(sourceLink)
},getContextMenuItems:function(error,target,context){var breakOnThisError=this.hasErrorBreak(error);
return[{label:"CopyError",command:bindFixed(this.copyError,this,error)},"-",{label:"BreakOnThisError",type:"checkbox",checked:breakOnThisError,command:bindFixed(this.breakOnThisError,this,error)},{label:"BreakOnAllErrors",type:"checkbox",checked:Firebug.breakOnErrors,command:bindFixed(this.breakOnAllErrors,this,error)}]
}});
this.SourceText=domplate(Firebug.Rep,{tag:DIV(FOR("line","$object|lineIterator",DIV({"class":"sourceRow",role:"presentation"},SPAN({"class":"sourceLine",role:"presentation"},"$line.lineNo"),SPAN({"class":"sourceRowText",role:"presentation"},"$line.text")))),lineIterator:function(sourceText){var maxLineNoChars=(sourceText.lines.length+"").length;
var list=[];
for(var i=0;
i<sourceText.lines.length;
++i){var lineNo=(i+1)+"";
while(lineNo.length<maxLineNoChars){lineNo=" "+lineNo
}list.push({lineNo:lineNo,text:sourceText.lines[i]})
}return list
},getHTML:function(sourceText){return getSourceLineRange(sourceText,1,sourceText.lines.length)
}});
this.nsIDOMHistory=domplate(Firebug.Rep,{tag:OBJECTBOX({onclick:"$showHistory"},OBJECTLINK("$object|summarizeHistory")),className:"nsIDOMHistory",summarizeHistory:function(history){try{var items=history.length;
return items+" history entries"
}catch(exc){return"object does not support history (nsIDOMHistory)"
}},showHistory:function(history){try{var items=history.length;
Firebug.chrome.select(history)
}catch(exc){}},supportsObject:function(object,type){return(object instanceof Ci.nsIDOMHistory)
}});
this.ApplicationCache=domplate(Firebug.Rep,{tag:OBJECTBOX({onclick:"$showApplicationCache"},OBJECTLINK("$object|summarizeCache")),summarizeCache:function(applicationCache){try{return applicationCache.length+" items in offline cache"
}catch(exc){return"https://bugzilla.mozilla.org/show_bug.cgi?id=422264"
}},showApplicationCache:function(event){openNewTab("https://bugzilla.mozilla.org/show_bug.cgi?id=422264")
},className:"applicationCache",supportsObject:function(object,type){if(Ci.nsIDOMOfflineResourceList){return(object instanceof Ci.nsIDOMOfflineResourceList)
}}});
this.Storage=domplate(Firebug.Rep,{tag:OBJECTBOX({onclick:"$show"},OBJECTLINK("$object|summarize")),summarize:function(storage){return storage.length+" items in Storage"
},show:function(storage){openNewTab("http://dev.w3.org/html5/webstorage/#storage-0")
},className:"Storage",supportsObject:function(object,type){return(object instanceof Storage)
}});
Firebug.registerRep(this.Undefined,this.Null,this.Number,this.String,this.Window,this.Element,this.Document,this.StyleSheet,this.Event,this.Property,this.Except,this.Arr);
Firebug.setDefaultReps(this.Func,this.Obj)
}});
FBL.ns(function(){with(FBL){var saveTimeout=400;
var pageAmount=10;
var currentTarget=null;
var currentGroup=null;
var currentPanel=null;
var currentEditor=null;
var defaultEditor=null;
var originalClassName=null;
var originalValue=null;
var defaultValue=null;
var previousValue=null;
var invalidEditor=false;
var ignoreNextInput=false;
Firebug.Editor=extend(Firebug.Module,{supportsStopEvent:true,dispatchName:"editor",tabCharacter:"    ",startEditing:function(target,value,editor){this.stopEditing();
if(hasClass(target,"insertBefore")||hasClass(target,"insertAfter")){return
}var panel=Firebug.getElementPanel(target);
if(!panel.editable){return
}if(FBTrace.DBG_EDITOR){FBTrace.sysout("editor.startEditing "+value,target)
}defaultValue=target.getAttribute("defaultValue");
if(value==undefined){var textContent=isIE?"innerText":"textContent";
value=target[textContent];
if(value==defaultValue){value=""
}}originalValue=previousValue=value;
invalidEditor=false;
currentTarget=target;
currentPanel=panel;
currentGroup=getAncestorByClass(target,"editGroup");
currentPanel.editing=true;
var panelEditor=currentPanel.getEditor(target,value);
currentEditor=editor?editor:panelEditor;
if(!currentEditor){currentEditor=getDefaultEditor(currentPanel)
}var inlineParent=getInlineParent(target);
var targetSize=getOffsetSize(inlineParent);
setClass(panel.panelNode,"editing");
setClass(target,"editing");
if(currentGroup){setClass(currentGroup,"editing")
}currentEditor.show(target,currentPanel,value,targetSize);
currentEditor.beginEditing(target,value);
if(FBTrace.DBG_EDITOR){FBTrace.sysout("Editor start panel "+currentPanel.name)
}this.attachListeners(currentEditor,panel.context)
},stopEditing:function(cancel){if(!currentTarget){return
}if(FBTrace.DBG_EDITOR){FBTrace.sysout("editor.stopEditing cancel:"+cancel+" saveTimeout: "+this.saveTimeout)
}clearTimeout(this.saveTimeout);
delete this.saveTimeout;
this.detachListeners(currentEditor,currentPanel.context);
removeClass(currentPanel.panelNode,"editing");
removeClass(currentTarget,"editing");
if(currentGroup){removeClass(currentGroup,"editing")
}var value=currentEditor.getValue();
if(value==defaultValue){value=""
}var removeGroup=currentEditor.endEditing(currentTarget,value,cancel);
try{if(cancel){if(value!=originalValue){this.saveEditAndNotifyListeners(currentTarget,originalValue,previousValue)
}if(removeGroup&&!originalValue&&currentGroup){currentGroup.parentNode.removeChild(currentGroup)
}}else{if(!value){this.saveEditAndNotifyListeners(currentTarget,null,previousValue);
if(removeGroup&&currentGroup){currentGroup.parentNode.removeChild(currentGroup)
}}else{this.save(value)
}}}catch(exc){}currentEditor.hide();
currentPanel.editing=false;
currentTarget=null;
currentGroup=null;
currentPanel=null;
currentEditor=null;
originalValue=null;
invalidEditor=false;
return value
},cancelEditing:function(){return this.stopEditing(true)
},update:function(saveNow){if(this.saveTimeout){clearTimeout(this.saveTimeout)
}invalidEditor=true;
currentEditor.layout();
if(saveNow){this.save()
}else{var context=currentPanel.context;
this.saveTimeout=context.setTimeout(bindFixed(this.save,this),saveTimeout);
if(FBTrace.DBG_EDITOR){FBTrace.sysout("editor.update saveTimeout: "+this.saveTimeout)
}}},save:function(value){if(!invalidEditor){return
}if(value==undefined){value=currentEditor.getValue()
}if(FBTrace.DBG_EDITOR){FBTrace.sysout("editor.save saveTimeout: "+this.saveTimeout+" currentPanel: "+(currentPanel?currentPanel.name:"null"))
}try{this.saveEditAndNotifyListeners(currentTarget,value,previousValue);
previousValue=value;
invalidEditor=false
}catch(exc){if(FBTrace.DBG_ERRORS){FBTrace.sysout("editor.save FAILS "+exc,exc)
}}},saveEditAndNotifyListeners:function(currentTarget,value,previousValue){currentEditor.saveEdit(currentTarget,value,previousValue)
},setEditTarget:function(element){if(!element){dispatch([Firebug.A11yModel],"onInlineEditorClose",[currentPanel,currentTarget,true]);
this.stopEditing()
}else{if(hasClass(element,"insertBefore")){this.insertRow(element,"before")
}else{if(hasClass(element,"insertAfter")){this.insertRow(element,"after")
}else{this.startEditing(element)
}}}},tabNextEditor:function(){if(!currentTarget){return
}var value=currentEditor.getValue();
var nextEditable=currentTarget;
do{nextEditable=!value&&currentGroup?getNextOutsider(nextEditable,currentGroup):getNextByClass(nextEditable,"editable")
}while(nextEditable&&!nextEditable.offsetHeight);
this.setEditTarget(nextEditable)
},tabPreviousEditor:function(){if(!currentTarget){return
}var value=currentEditor.getValue();
var prevEditable=currentTarget;
do{prevEditable=!value&&currentGroup?getPreviousOutsider(prevEditable,currentGroup):getPreviousByClass(prevEditable,"editable")
}while(prevEditable&&!prevEditable.offsetHeight);
this.setEditTarget(prevEditable)
},insertRow:function(relative,insertWhere){var group=relative||getAncestorByClass(currentTarget,"editGroup")||currentTarget;
var value=this.stopEditing();
currentPanel=Firebug.getElementPanel(group);
currentEditor=currentPanel.getEditor(group,value);
if(!currentEditor){currentEditor=getDefaultEditor(currentPanel)
}currentGroup=currentEditor.insertNewRow(group,insertWhere);
if(!currentGroup){return
}var editable=hasClass(currentGroup,"editable")?currentGroup:getNextByClass(currentGroup,"editable");
if(editable){this.setEditTarget(editable)
}},insertRowForObject:function(relative){var container=getAncestorByClass(relative,"insertInto");
if(container){relative=getChildByClass(container,"insertBefore");
if(relative){this.insertRow(relative,"before")
}}},attachListeners:function(editor,context){var win=isIE?currentTarget.ownerDocument.parentWindow:currentTarget.ownerDocument.defaultView;
addEvent(win,"resize",this.onResize);
addEvent(win,"blur",this.onBlur);
var chrome=Firebug.chrome;
this.listeners=[chrome.keyCodeListen("ESCAPE",null,bind(this.cancelEditing,this))];
if(editor.arrowCompletion){this.listeners.push(chrome.keyCodeListen("UP",null,bindFixed(editor.completeValue,editor,-1)),chrome.keyCodeListen("DOWN",null,bindFixed(editor.completeValue,editor,1)),chrome.keyCodeListen("PAGE_UP",null,bindFixed(editor.completeValue,editor,-pageAmount)),chrome.keyCodeListen("PAGE_DOWN",null,bindFixed(editor.completeValue,editor,pageAmount)))
}if(currentEditor.tabNavigation){this.listeners.push(chrome.keyCodeListen("RETURN",null,bind(this.tabNextEditor,this)),chrome.keyCodeListen("RETURN",isControl,bind(this.insertRow,this,null,"after")),chrome.keyCodeListen("TAB",null,bind(this.tabNextEditor,this)),chrome.keyCodeListen("TAB",isShift,bind(this.tabPreviousEditor,this)))
}else{if(currentEditor.multiLine){this.listeners.push(chrome.keyCodeListen("TAB",null,insertTab))
}else{this.listeners.push(chrome.keyCodeListen("RETURN",null,bindFixed(this.stopEditing,this)));
if(currentEditor.tabCompletion){this.listeners.push(chrome.keyCodeListen("TAB",null,bind(editor.completeValue,editor,1)),chrome.keyCodeListen("TAB",isShift,bind(editor.completeValue,editor,-1)))
}}}},detachListeners:function(editor,context){if(!this.listeners){return
}var win=isIE?currentTarget.ownerDocument.parentWindow:currentTarget.ownerDocument.defaultView;
removeEvent(win,"resize",this.onResize);
removeEvent(win,"blur",this.onBlur);
var chrome=Firebug.chrome;
if(chrome){for(var i=0;
i<this.listeners.length;
++i){chrome.keyIgnore(this.listeners[i])
}}delete this.listeners
},onResize:function(event){currentEditor.layout(true)
},onBlur:function(event){if(currentEditor.enterOnBlur&&isAncestor(event.target,currentEditor.box)){this.stopEditing()
}},initialize:function(){Firebug.Module.initialize.apply(this,arguments);
this.onResize=bindFixed(this.onResize,this);
this.onBlur=bind(this.onBlur,this)
},disable:function(){this.stopEditing()
},showContext:function(browser,context){this.stopEditing()
},showPanel:function(browser,panel){this.stopEditing()
}});
Firebug.BaseEditor=extend(Firebug.MeasureBox,{getValue:function(){},setValue:function(value){},show:function(target,panel,value,textSize,targetSize){},hide:function(){},layout:function(forceAll){},getContextMenuItems:function(target){var items=[];
items.push({label:"Cut",commandID:"cmd_cut"});
items.push({label:"Copy",commandID:"cmd_copy"});
items.push({label:"Paste",commandID:"cmd_paste"});
return items
},beginEditing:function(target,value){},saveEdit:function(target,value,previousValue){},endEditing:function(target,value,cancel){return true
},insertNewRow:function(target,insertWhere){}});
var inlineEditorAttributes={"class":"textEditorInner",type:"text",spellcheck:"false",onkeypress:"$onKeyPress",onoverflow:"$onOverflow",oncontextmenu:"$onContextMenu"};
if(isIE){inlineEditorAttributes.onpropertychange="$onInput";
inlineEditorAttributes.onkeydown="$onKeyDown"
}else{inlineEditorAttributes.oninput="$onInput"
}Firebug.InlineEditor=function(doc){this.initializeInline(doc)
};
Firebug.InlineEditor.prototype=domplate(Firebug.BaseEditor,{enterOnBlur:true,outerMargin:8,shadowExpand:7,tag:DIV({"class":"inlineEditor"},DIV({"class":"textEditorTop1"},DIV({"class":"textEditorTop2"})),DIV({"class":"textEditorInner1"},DIV({"class":"textEditorInner2"},INPUT(inlineEditorAttributes))),DIV({"class":"textEditorBottom1"},DIV({"class":"textEditorBottom2"}))),inputTag:INPUT({"class":"textEditorInner",type:"text",onkeypress:"$onKeyPress",onoverflow:"$onOverflow"}),expanderTag:IMG({"class":"inlineExpander",src:"blank.gif"}),initialize:function(){this.fixedWidth=false;
this.completeAsYouType=true;
this.tabNavigation=true;
this.multiLine=false;
this.tabCompletion=false;
this.arrowCompletion=true;
this.noWrap=true;
this.numeric=false
},destroy:function(){this.destroyInput()
},initializeInline:function(doc){if(FBTrace.DBG_EDITOR){FBTrace.sysout("Firebug.InlineEditor initializeInline()")
}this.box=this.tag.append({},doc.body,this);
this.input=this.box.getElementsByTagName("input")[0];
if(isIElt8){this.input.style.top="-8px"
}this.expander=this.expanderTag.replace({},doc,this);
this.initialize()
},destroyInput:function(){},getValue:function(){return this.input.value
},setValue:function(value){return this.input.value=stripNewLines(value)
},show:function(target,panel,value,targetSize){this.target=target;
this.panel=panel;
this.targetSize=targetSize;
var innerHTML=target.innerHTML;
var isEmptyElement=!innerHTML;
if(isEmptyElement){target.innerHTML="."
}this.targetOffset={x:target.offsetLeft,y:target.offsetTop};
if(isEmptyElement){target.innerHTML=innerHTML
}this.originalClassName=this.box.className;
var classNames=target.className.split(" ");
for(var i=0;
i<classNames.length;
++i){setClass(this.box,"editor-"+classNames[i])
}copyTextStyles(target,this.box);
this.setValue(value);
if(this.fixedWidth){this.updateLayout(true)
}else{this.startMeasuring(target);
this.textSize=this.measureInputText(value);
var parent=this.input.parentNode;
if(hasClass(parent,"textEditorInner2")){var yDiff=this.textSize.height-this.shadowExpand;
if(isIE6){yDiff-=2
}parent.style.height=yDiff+"px";
parent.parentNode.style.height=yDiff+"px"
}this.updateLayout(true)
}this.getAutoCompleter().reset();
if(isIElt8){panel.panelNode.appendChild(this.box)
}else{target.offsetParent.appendChild(this.box)
}if(isIE){this.input.style.fontFamily="Monospace";
this.input.style.fontSize="11px"
}if(!this.fixedWidth){copyBoxStyles(target,this.expander);
target.parentNode.replaceChild(this.expander,target);
collapse(target,true);
this.expander.parentNode.insertBefore(target,this.expander)
}this.box.style.display="block";
var self=this;
setTimeout(function(){self.input.focus();
self.input.select()
},0)
},hide:function(){this.box.className=this.originalClassName;
if(!this.fixedWidth){this.stopMeasuring();
collapse(this.target,false);
if(this.expander.parentNode){this.expander.parentNode.removeChild(this.expander)
}}if(this.box.parentNode){this.input.blur();
this.box.parentNode.removeChild(this.box)
}delete this.target;
delete this.panel
},layout:function(forceAll){if(!this.fixedWidth){this.textSize=this.measureInputText(this.input.value)
}if(forceAll){this.targetOffset=getClientOffset(this.expander)
}this.updateLayout(false,forceAll)
},beginEditing:function(target,value){},saveEdit:function(target,value,previousValue){},endEditing:function(target,value,cancel){return true
},insertNewRow:function(target,insertWhere){},advanceToNext:function(target,charCode){return false
},getAutoCompleteRange:function(value,offset){},getAutoCompleteList:function(preExpr,expr,postExpr){},getAutoCompleter:function(){if(!this.autoCompleter){this.autoCompleter=new Firebug.AutoCompleter(null,bind(this.getAutoCompleteRange,this),bind(this.getAutoCompleteList,this),true,false)
}return this.autoCompleter
},completeValue:function(amt){var selectRangeCallback=this.getAutoCompleter().complete(currentPanel.context,this.input,true,amt<0);
if(selectRangeCallback){Firebug.Editor.update(true);
if(isSafari){setTimeout(selectRangeCallback,0)
}else{selectRangeCallback()
}}else{this.incrementValue(amt)
}},incrementValue:function(amt){var value=this.input.value;
if(isIE){var start=getInputSelectionStart(this.input),end=start
}else{var start=this.input.selectionStart,end=this.input.selectionEnd
}var range=this.getAutoCompleteRange(value,start);
if(!range||range.type!="int"){range={start:0,end:value.length-1}
}var expr=value.substr(range.start,range.end-range.start+1);
preExpr=value.substr(0,range.start);
postExpr=value.substr(range.end+1);
var intValue=parseInt(expr);
if(!!intValue||intValue==0){var m=/\d+/.exec(expr);
var digitPost=expr.substr(m.index+m[0].length);
var completion=intValue-amt;
this.input.value=preExpr+completion+digitPost+postExpr;
setSelectionRange(this.input,start,end);
Firebug.Editor.update(true);
return true
}else{return false
}},onKeyPress:function(event){if(event.keyCode==27&&!this.completeAsYouType){var reverted=this.getAutoCompleter().revert(this.input);
if(reverted){cancelEvent(event)
}}else{if(event.charCode&&this.advanceToNext(this.target,event.charCode)){Firebug.Editor.tabNextEditor();
cancelEvent(event)
}else{if(this.numeric&&event.charCode&&(event.charCode<48||event.charCode>57)&&event.charCode!=45&&event.charCode!=46){FBL.cancelEvent(event)
}else{this.ignoreNextInput=event.keyCode==8
}}}},onOverflow:function(){this.updateLayout(false,false,3)
},onKeyDown:function(event){if(event.keyCode>46||event.keyCode==32||event.keyCode==8){this.keyDownPressed=true
}},onInput:function(event){if(isIE){if(event.propertyName!="value"||!isVisible(this.input)||!this.keyDownPressed){return
}this.keyDownPressed=false
}var selectRangeCallback;
if(this.ignoreNextInput){this.ignoreNextInput=false;
this.getAutoCompleter().reset()
}else{if(this.completeAsYouType){selectRangeCallback=this.getAutoCompleter().complete(currentPanel.context,this.input,false)
}else{this.getAutoCompleter().reset()
}}Firebug.Editor.update();
if(selectRangeCallback){if(isSafari){setTimeout(selectRangeCallback,0)
}else{selectRangeCallback()
}}},onContextMenu:function(event){cancelEvent(event);
var popup=$("fbInlineEditorPopup");
FBL.eraseNode(popup);
var target=event.target||event.srcElement;
var menu=this.getContextMenuItems(target);
if(menu){for(var i=0;
i<menu.length;
++i){FBL.createMenuItem(popup,menu[i])
}}if(!popup.firstChild){return false
}popup.openPopupAtScreen(event.screenX,event.screenY,true);
return true
},updateLayout:function(initial,forceAll,extraWidth){if(this.fixedWidth){this.box.style.left=(this.targetOffset.x)+"px";
this.box.style.top=(this.targetOffset.y)+"px";
var w=this.target.offsetWidth;
var h=this.target.offsetHeight;
this.input.style.width=w+"px";
this.input.style.height=(h-3)+"px"
}else{if(initial||forceAll){this.box.style.left=this.targetOffset.x+"px";
this.box.style.top=this.targetOffset.y+"px"
}var approxTextWidth=this.textSize.width;
var maxWidth=(currentPanel.panelNode.scrollWidth-this.targetOffset.x)-this.outerMargin;
var wrapped=initial?this.noWrap&&this.targetSize.height>this.textSize.height+3:this.noWrap&&approxTextWidth>maxWidth;
if(wrapped){var style=isIE?this.target.currentStyle:this.target.ownerDocument.defaultView.getComputedStyle(this.target,"");
targetMargin=parseInt(style.marginLeft)+parseInt(style.marginRight);
approxTextWidth=maxWidth-targetMargin;
this.input.style.width="100%";
this.box.style.width=approxTextWidth+"px"
}else{var charWidth=this.measureInputText("m").width;
if(extraWidth){charWidth*=extraWidth
}var inputWidth=approxTextWidth+charWidth;
if(initial){if(isIE){var xDiff=13;
this.box.style.width=(inputWidth+xDiff)+"px"
}else{this.box.style.width="auto"
}}else{var xDiff=isIE?13:this.box.scrollWidth-this.input.offsetWidth;
this.box.style.width=(inputWidth+xDiff)+"px"
}this.input.style.width=inputWidth+"px"
}this.expander.style.width=approxTextWidth+"px";
this.expander.style.height=Math.max(this.textSize.height-3,0)+"px"
}if(forceAll){scrollIntoCenterView(this.box,null,true)
}}});
Firebug.AutoCompleter=function(getExprOffset,getRange,evaluator,selectMode,caseSensitive){var candidates=null;
var originalValue=null;
var originalOffset=-1;
var lastExpr=null;
var lastOffset=-1;
var exprOffset=0;
var lastIndex=0;
var preParsed=null;
var preExpr=null;
var postExpr=null;
this.revert=function(textBox){if(originalOffset!=-1){textBox.value=originalValue;
setSelectionRange(textBox,originalOffset,originalOffset);
this.reset();
return true
}else{this.reset();
return false
}};
this.reset=function(){candidates=null;
originalValue=null;
originalOffset=-1;
lastExpr=null;
lastOffset=0;
exprOffset=0
};
this.complete=function(context,textBox,cycle,reverse){var value=textBox.value;
var offset=getInputSelectionStart(textBox);
if(isSafari&&!cycle&&offset>=0){offset++
}if(!selectMode&&originalOffset!=-1){offset=originalOffset
}if(!candidates||!cycle||offset!=lastOffset){originalOffset=offset;
originalValue=value;
var parseStart=getExprOffset?getExprOffset(value,offset,context):0;
preParsed=value.substr(0,parseStart);
var parsed=value.substr(parseStart);
var range=getRange?getRange(parsed,offset-parseStart,context):null;
if(!range){range={start:0,end:parsed.length-1}
}var expr=parsed.substr(range.start,range.end-range.start+1);
preExpr=parsed.substr(0,range.start);
postExpr=parsed.substr(range.end+1);
exprOffset=parseStart+range.start;
if(!cycle){if(!expr){return
}else{if(lastExpr&&lastExpr.indexOf(expr)!=0){candidates=null
}else{if(lastExpr&&lastExpr.length>=expr.length){candidates=null;
lastExpr=expr;
return
}}}}lastExpr=expr;
lastOffset=offset;
var searchExpr;
if(expr&&offset!=parseStart+range.end+1){if(cycle){offset=range.start;
searchExpr=expr;
expr=""
}else{return
}}var values=evaluator(preExpr,expr,postExpr,context);
if(!values){return
}if(expr){candidates=[];
if(caseSensitive){for(var i=0;
i<values.length;
++i){var name=values[i];
if(name.indexOf&&name.indexOf(expr)==0){candidates.push(name)
}}}else{var lowerExpr=caseSensitive?expr:expr.toLowerCase();
for(var i=0;
i<values.length;
++i){var name=values[i];
if(name.indexOf&&name.toLowerCase().indexOf(lowerExpr)==0){candidates.push(name)
}}}lastIndex=reverse?candidates.length-1:0
}else{if(searchExpr){var searchIndex=-1;
if(caseSensitive){searchIndex=values.indexOf(expr)
}else{var lowerExpr=searchExpr.toLowerCase();
for(var i=0;
i<values.length;
++i){var name=values[i];
if(name&&name.toLowerCase().indexOf(lowerExpr)==0){searchIndex=i;
break
}}}if(searchIndex==-1){return this.reset()
}expr=searchExpr;
candidates=cloneArray(values);
lastIndex=searchIndex
}else{expr="";
candidates=[];
for(var i=0;
i<values.length;
++i){if(values[i].substr){candidates.push(values[i])
}}lastIndex=-1
}}}if(cycle){expr=lastExpr;
lastIndex+=reverse?-1:1
}if(!candidates.length){return
}if(lastIndex>=candidates.length){lastIndex=0
}else{if(lastIndex<0){lastIndex=candidates.length-1
}}var completion=candidates[lastIndex];
var preCompletion=expr.substr(0,offset-exprOffset);
var postCompletion=completion.substr(offset-exprOffset);
textBox.value=preParsed+preExpr+preCompletion+postCompletion+postExpr;
var offsetEnd=preParsed.length+preExpr.length+completion.length;
return function(){if(selectMode){setSelectionRange(textBox,offset,offsetEnd)
}else{setSelectionRange(textBox,offsetEnd,offsetEnd)
}}
}
};
var getDefaultEditor=function getDefaultEditor(panel){if(!defaultEditor){var doc=panel.document;
defaultEditor=new Firebug.InlineEditor(doc)
}return defaultEditor
};
var getOutsider=function getOutsider(element,group,stepper){var parentGroup=getAncestorByClass(group.parentNode,"editGroup");
var next;
do{next=stepper(next||element)
}while(isAncestor(next,group)||isGroupInsert(next,parentGroup));
return next
};
var isGroupInsert=function isGroupInsert(next,group){return(!group||isAncestor(next,group))&&(hasClass(next,"insertBefore")||hasClass(next,"insertAfter"))
};
var getNextOutsider=function getNextOutsider(element,group){return getOutsider(element,group,bind(getNextByClass,FBL,"editable"))
};
var getPreviousOutsider=function getPreviousOutsider(element,group){return getOutsider(element,group,bind(getPreviousByClass,FBL,"editable"))
};
var getInlineParent=function getInlineParent(element){var lastInline=element;
for(;
element;
element=element.parentNode){var s=isIE?element.currentStyle:element.ownerDocument.defaultView.getComputedStyle(element,"");
if(s.display!="inline"){return lastInline
}else{lastInline=element
}}return null
};
var insertTab=function insertTab(){insertTextIntoElement(currentEditor.input,Firebug.Editor.tabCharacter)
};
Firebug.registerModule(Firebug.Editor)
}});
FBL.ns(function(){with(FBL){if(Env.Options.disableXHRListener){return
}var XHRSpy=function(){this.requestHeaders=[];
this.responseHeaders=[]
};
XHRSpy.prototype={method:null,url:null,async:null,xhrRequest:null,href:null,loaded:false,logRow:null,responseText:null,requestHeaders:null,responseHeaders:null,sourceLink:null,getURL:function(){return this.href
}};
var XMLHttpRequestWrapper=function(activeXObject){var xhrRequest=typeof activeXObject!="undefined"?activeXObject:new _XMLHttpRequest(),spy=new XHRSpy(),self=this,reqType,reqUrl,reqStartTS;
var updateSelfPropertiesIgnore={abort:1,channel:1,getAllResponseHeaders:1,getInterface:1,getResponseHeader:1,mozBackgroundRequest:1,multipart:1,onreadystatechange:1,open:1,send:1,setRequestHeader:1};
var updateSelfProperties=function(){if(supportsXHRIterator){for(var propName in xhrRequest){if(propName in updateSelfPropertiesIgnore){continue
}try{var propValue=xhrRequest[propName];
if(propValue&&!isFunction(propValue)){self[propName]=propValue
}}catch(E){}}}else{if(xhrRequest.readyState==4){self.status=xhrRequest.status;
self.statusText=xhrRequest.statusText;
self.responseText=xhrRequest.responseText;
self.responseXML=xhrRequest.responseXML
}}};
var updateXHRPropertiesIgnore={channel:1,onreadystatechange:1,readyState:1,responseBody:1,responseText:1,responseXML:1,status:1,statusText:1,upload:1};
var updateXHRProperties=function(){for(var propName in self){if(propName in updateXHRPropertiesIgnore){continue
}try{var propValue=self[propName];
if(propValue&&!xhrRequest[propName]){xhrRequest[propName]=propValue
}}catch(E){}}};
var logXHR=function(){var row=Firebug.Console.log(spy,null,"spy",Firebug.Spy.XHR);
if(row){setClass(row,"loading");
spy.logRow=row
}};
var finishXHR=function(){var duration=new Date().getTime()-reqStartTS;
var success=xhrRequest.status==200;
var responseHeadersText=xhrRequest.getAllResponseHeaders();
var responses=responseHeadersText?responseHeadersText.split(/[\n\r]/):[];
var reHeader=/^(\S+):\s*(.*)/;
for(var i=0,l=responses.length;
i<l;
i++){var text=responses[i];
var match=text.match(reHeader);
if(match){var name=match[1];
var value=match[2];
if(name=="Content-Type"){spy.mimeType=value
}spy.responseHeaders.push({name:[name],value:[value]})
}}with({row:spy.logRow,status:xhrRequest.status==0?"":xhrRequest.status+" "+xhrRequest.statusText,time:duration,success:success}){setTimeout(function(){spy.responseText=xhrRequest.responseText;
row=row||spy.logRow;
if(!row){return
}handleRequestStatus(success,status,time)
},200)
}spy.loaded=true;
updateSelfProperties()
};
var handleStateChange=function(){self.readyState=xhrRequest.readyState;
if(xhrRequest.readyState==4){finishXHR();
xhrRequest.onreadystatechange=function(){}
}self.onreadystatechange()
};
var handleRequestStatus=function(success,status,time){var row=spy.logRow;
FBL.removeClass(row,"loading");
if(!success){FBL.setClass(row,"error")
}var item=FBL.$$(".spyStatus",row)[0];
item.innerHTML=status;
if(time){var item=FBL.$$(".spyTime",row)[0];
item.innerHTML=time+"ms"
}};
this.readyState=0;
this.onreadystatechange=function(){};
this.open=function(method,url,async,user,password){updateSelfProperties();
if(spy.loaded){spy=new XHRSpy()
}spy.method=method;
spy.url=url;
spy.async=async;
spy.href=url;
spy.xhrRequest=xhrRequest;
spy.urlParams=parseURLParamsArray(url);
try{if(supportsApply){xhrRequest.open.apply(xhrRequest,arguments)
}else{xhrRequest.open(method,url,async,user,password)
}}catch(e){}xhrRequest.onreadystatechange=handleStateChange
};
this.send=function(data){spy.data=data;
reqStartTS=new Date().getTime();
updateXHRProperties();
try{xhrRequest.send(data)
}catch(e){}finally{logXHR();
if(!spy.async){self.readyState=xhrRequest.readyState;
try{finishXHR()
}catch(E){}}}};
this.setRequestHeader=function(header,value){spy.requestHeaders.push({name:[header],value:[value]});
return xhrRequest.setRequestHeader(header,value)
};
this.abort=function(){xhrRequest.abort();
updateSelfProperties();
handleRequestStatus(false,"Aborted")
};
this.getResponseHeader=function(header){return xhrRequest.getResponseHeader(header)
};
this.getAllResponseHeaders=function(){return xhrRequest.getAllResponseHeaders()
};
var supportsApply=!isIE6&&xhrRequest&&xhrRequest.open&&typeof xhrRequest.open.apply!="undefined";
var numberOfXHRProperties=0;
for(var propName in xhrRequest){numberOfXHRProperties++;
if(propName in updateSelfPropertiesIgnore){continue
}try{var propValue=xhrRequest[propName];
if(isFunction(propValue)){if(typeof self[propName]=="undefined"){this[propName]=(function(name,xhr){return supportsApply?function(){return xhr[name].apply(xhr,arguments)
}:function(a,b,c,d,e){return xhr[name](a,b,c,d,e)
}
})(propName,xhrRequest)
}}else{this[propName]=propValue
}}catch(E){}}var supportsXHRIterator=numberOfXHRProperties>0;
return this
};
var _ActiveXObject;
var isIE6=/msie 6/i.test(navigator.appVersion);
if(isIE6){_ActiveXObject=window.ActiveXObject;
var xhrObjects=" MSXML2.XMLHTTP.5.0 MSXML2.XMLHTTP.4.0 MSXML2.XMLHTTP.3.0 MSXML2.XMLHTTP Microsoft.XMLHTTP ";
window.ActiveXObject=function(name){var error=null;
try{var activeXObject=new _ActiveXObject(name)
}catch(e){error=e
}finally{if(!error){if(xhrObjects.indexOf(" "+name+" ")!=-1){return new XMLHttpRequestWrapper(activeXObject)
}else{return activeXObject
}}else{throw error.message
}}}
}if(!isIE6){var _XMLHttpRequest=XMLHttpRequest;
window.XMLHttpRequest=function(){return new XMLHttpRequestWrapper()
}
}FBL.getNativeXHRObject=function(){var xhrObj=false;
try{xhrObj=new _XMLHttpRequest()
}catch(e){var progid=["MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
for(var i=0;
i<progid.length;
++i){try{xhrObj=new _ActiveXObject(progid[i])
}catch(e){continue
}break
}}finally{return xhrObj
}}
}});
FBL.ns(function(){with(FBL){var reIgnore=/about:|javascript:|resource:|chrome:|jar:/;
var layoutInterval=300;
var indentWidth=18;
var cacheSession=null;
var contexts=new Array();
var panelName="net";
var maxQueueRequests=500;
var activeRequests=[];
var mimeExtensionMap={txt:"text/plain",html:"text/html",htm:"text/html",xhtml:"text/html",xml:"text/xml",css:"text/css",js:"application/x-javascript",jss:"application/x-javascript",jpg:"image/jpg",jpeg:"image/jpeg",gif:"image/gif",png:"image/png",bmp:"image/bmp",swf:"application/x-shockwave-flash",flv:"video/x-flv"};
var fileCategories={"undefined":1,html:1,css:1,js:1,xhr:1,image:1,flash:1,txt:1,bin:1};
var textFileCategories={txt:1,html:1,xhr:1,css:1,js:1};
var binaryFileCategories={bin:1,flash:1};
var mimeCategoryMap={"text/plain":"txt","application/octet-stream":"bin","text/html":"html","text/xml":"html","text/css":"css","application/x-javascript":"js","text/javascript":"js","application/javascript":"js","image/jpeg":"image","image/jpg":"image","image/gif":"image","image/png":"image","image/bmp":"image","application/x-shockwave-flash":"flash","video/x-flv":"flash"};
var binaryCategoryMap={image:1,flash:1};
Firebug.NetMonitor=extend(Firebug.ActivableModule,{dispatchName:"netMonitor",clear:function(context){var panel=context.getPanel(panelName,true);
if(panel){panel.clear()
}},initialize:function(){return;
this.panelName=panelName;
Firebug.ActivableModule.initialize.apply(this,arguments);
if(Firebug.TraceModule){Firebug.TraceModule.addListener(this.TraceListener)
}NetHttpObserver.registerObserver();
NetHttpActivityObserver.registerObserver();
Firebug.Debugger.addListener(this.DebuggerListener)
},shutdown:function(){return;
prefs.removeObserver(Firebug.prefDomain,this,false);
if(Firebug.TraceModule){Firebug.TraceModule.removeListener(this.TraceListener)
}NetHttpObserver.unregisterObserver();
NetHttpActivityObserver.unregisterObserver();
Firebug.Debugger.removeListener(this.DebuggerListener)
}});
Firebug.NetMonitor.NetInfoBody=domplate(Firebug.Rep,new Firebug.Listener(),{tag:DIV({"class":"netInfoBody",_repObject:"$file"},TAG("$infoTabs",{file:"$file"}),TAG("$infoBodies",{file:"$file"})),infoTabs:DIV({"class":"netInfoTabs focusRow subFocusRow",role:"tablist"},A({"class":"netInfoParamsTab netInfoTab a11yFocus",onclick:"$onClickTab",role:"tab",view:"Params",$collapsed:"$file|hideParams"},$STR("URLParameters")),A({"class":"netInfoHeadersTab netInfoTab a11yFocus",onclick:"$onClickTab",role:"tab",view:"Headers"},$STR("Headers")),A({"class":"netInfoPostTab netInfoTab a11yFocus",onclick:"$onClickTab",role:"tab",view:"Post",$collapsed:"$file|hidePost"},$STR("Post")),A({"class":"netInfoPutTab netInfoTab a11yFocus",onclick:"$onClickTab",role:"tab",view:"Put",$collapsed:"$file|hidePut"},$STR("Put")),A({"class":"netInfoResponseTab netInfoTab a11yFocus",onclick:"$onClickTab",role:"tab",view:"Response",$collapsed:"$file|hideResponse"},$STR("Response")),A({"class":"netInfoCacheTab netInfoTab a11yFocus",onclick:"$onClickTab",role:"tab",view:"Cache",$collapsed:"$file|hideCache"},$STR("Cache")),A({"class":"netInfoHtmlTab netInfoTab a11yFocus",onclick:"$onClickTab",role:"tab",view:"Html",$collapsed:"$file|hideHtml"},$STR("HTML"))),infoBodies:DIV({"class":"netInfoBodies outerFocusRow"},TABLE({"class":"netInfoParamsText netInfoText netInfoParamsTable",role:"tabpanel",cellpadding:0,cellspacing:0},TBODY()),DIV({"class":"netInfoHeadersText netInfoText",role:"tabpanel"}),DIV({"class":"netInfoPostText netInfoText",role:"tabpanel"}),DIV({"class":"netInfoPutText netInfoText",role:"tabpanel"}),PRE({"class":"netInfoResponseText netInfoText",role:"tabpanel"}),DIV({"class":"netInfoCacheText netInfoText",role:"tabpanel"},TABLE({"class":"netInfoCacheTable",cellpadding:0,cellspacing:0,role:"presentation"},TBODY({role:"list","aria-label":$STR("Cache")}))),DIV({"class":"netInfoHtmlText netInfoText",role:"tabpanel"},IFRAME({"class":"netInfoHtmlPreview",role:"document"}))),headerDataTag:FOR("param","$headers",TR({role:"listitem"},TD({"class":"netInfoParamName",role:"presentation"},TAG("$param|getNameTag",{param:"$param"})),TD({"class":"netInfoParamValue",role:"list","aria-label":"$param.name"},FOR("line","$param|getParamValueIterator",CODE({"class":"focusRow subFocusRow",role:"listitem"},"$line"))))),customTab:A({"class":"netInfo$tabId\\Tab netInfoTab",onclick:"$onClickTab",view:"$tabId",role:"tab"},"$tabTitle"),customBody:DIV({"class":"netInfo$tabId\\Text netInfoText",role:"tabpanel"}),nameTag:SPAN("$param|getParamName"),nameWithTooltipTag:SPAN({title:"$param.name"},"$param|getParamName"),getNameTag:function(param){return(this.getParamName(param)==param.name)?this.nameTag:this.nameWithTooltipTag
},getParamName:function(param){var limit=25;
var name=param.name;
if(name.length>limit){name=name.substr(0,limit)+"..."
}return name
},getParamTitle:function(param){var limit=25;
var name=param.name;
if(name.length>limit){return name
}return""
},hideParams:function(file){return !file.urlParams||!file.urlParams.length
},hidePost:function(file){return file.method.toUpperCase()!="POST"
},hidePut:function(file){return file.method.toUpperCase()!="PUT"
},hideResponse:function(file){return false
},hideCache:function(file){return true;
return !file.cacheEntry
},hideHtml:function(file){return(file.mimeType!="text/html")&&(file.mimeType!="application/xhtml+xml")
},onClickTab:function(event){this.selectTab(event.currentTarget||event.srcElement)
},getParamValueIterator:function(param){return param.value;
return wrapText(param.value,true)
},appendTab:function(netInfoBox,tabId,tabTitle){var args={tabId:tabId,tabTitle:tabTitle};
this.customTab.append(args,$$(".netInfoTabs",netInfoBox)[0]);
this.customBody.append(args,$$(".netInfoBodies",netInfoBox)[0])
},selectTabByName:function(netInfoBox,tabName){var tab=getChildByClass(netInfoBox,"netInfoTabs","netInfo"+tabName+"Tab");
if(tab){this.selectTab(tab)
}},selectTab:function(tab){var view=tab.getAttribute("view");
var netInfoBox=getAncestorByClass(tab,"netInfoBody");
var selectedTab=netInfoBox.selectedTab;
if(selectedTab){removeClass(netInfoBox.selectedText,"netInfoTextSelected");
removeClass(selectedTab,"netInfoTabSelected");
selectedTab.setAttribute("aria-selected","false")
}var textBodyName="netInfo"+view+"Text";
selectedTab=netInfoBox.selectedTab=tab;
netInfoBox.selectedText=$$("."+textBodyName,netInfoBox)[0];
setClass(netInfoBox.selectedText,"netInfoTextSelected");
setClass(selectedTab,"netInfoTabSelected");
selectedTab.setAttribute("selected","true");
selectedTab.setAttribute("aria-selected","true");
var file=Firebug.getRepObject(netInfoBox);
var context=Firebug.chrome;
this.updateInfo(netInfoBox,file,context)
},updateInfo:function(netInfoBox,file,context){if(FBTrace.DBG_NET){FBTrace.sysout("net.updateInfo; file",file)
}if(!netInfoBox){if(FBTrace.DBG_NET||FBTrace.DBG_ERRORS){FBTrace.sysout("net.updateInfo; ERROR netInfo == null "+file.href,file)
}return
}var tab=netInfoBox.selectedTab;
if(hasClass(tab,"netInfoParamsTab")){if(file.urlParams&&!netInfoBox.urlParamsPresented){netInfoBox.urlParamsPresented=true;
this.insertHeaderRows(netInfoBox,file.urlParams,"Params")
}}else{if(hasClass(tab,"netInfoHeadersTab")){var headersText=$$(".netInfoHeadersText",netInfoBox)[0];
if(file.responseHeaders&&!netInfoBox.responseHeadersPresented){netInfoBox.responseHeadersPresented=true;
NetInfoHeaders.renderHeaders(headersText,file.responseHeaders,"ResponseHeaders")
}if(file.requestHeaders&&!netInfoBox.requestHeadersPresented){netInfoBox.requestHeadersPresented=true;
NetInfoHeaders.renderHeaders(headersText,file.requestHeaders,"RequestHeaders")
}}else{if(hasClass(tab,"netInfoPostTab")){if(!netInfoBox.postPresented){netInfoBox.postPresented=true;
var postText=$$(".netInfoPostText",netInfoBox)[0];
NetInfoPostData.render(context,postText,file)
}}else{if(hasClass(tab,"netInfoPutTab")){if(!netInfoBox.putPresented){netInfoBox.putPresented=true;
var putText=$$(".netInfoPutText",netInfoBox)[0];
NetInfoPostData.render(context,putText,file)
}}else{if(hasClass(tab,"netInfoResponseTab")&&file.loaded&&!netInfoBox.responsePresented){var responseTextBox=$$(".netInfoResponseText",netInfoBox)[0];
if(file.category=="image"){netInfoBox.responsePresented=true;
var responseImage=netInfoBox.ownerDocument.createElement("img");
responseImage.src=file.href;
clearNode(responseTextBox);
responseTextBox.appendChild(responseImage,responseTextBox)
}else{this.setResponseText(file,netInfoBox,responseTextBox,context)
}}else{if(hasClass(tab,"netInfoCacheTab")&&file.loaded&&!netInfoBox.cachePresented){var responseTextBox=netInfoBox.getElementsByClassName("netInfoCacheText").item(0);
if(file.cacheEntry){netInfoBox.cachePresented=true;
this.insertHeaderRows(netInfoBox,file.cacheEntry,"Cache")
}}else{if(hasClass(tab,"netInfoHtmlTab")&&file.loaded&&!netInfoBox.htmlPresented){netInfoBox.htmlPresented=true;
var text=Utils.getResponseText(file,context);
var iframe=$$(".netInfoHtmlPreview",netInfoBox)[0];
var reScript=/<script(.|\s)*?\/script>/gi;
text=text.replace(reScript,"");
iframe.contentWindow.document.write(text);
iframe.contentWindow.document.close()
}}}}}}}dispatch(NetInfoBody.fbListeners,"updateTabBody",[netInfoBox,file,context])
},setResponseText:function(file,netInfoBox,responseTextBox,context){netInfoBox.responsePresented=true;
if(isIE){responseTextBox.style.whiteSpace="nowrap"
}responseTextBox[typeof responseTextBox.textContent!="undefined"?"textContent":"innerText"]=file.responseText;
return;
var text=Utils.getResponseText(file,context);
var limit=Firebug.netDisplayedResponseLimit+15;
var limitReached=text?(text.length>limit):false;
if(limitReached){text=text.substr(0,limit)+"..."
}if(text){insertWrappedText(text,responseTextBox)
}else{insertWrappedText("",responseTextBox)
}if(limitReached){var object={text:$STR("net.responseSizeLimitMessage"),onClickLink:function(){var panel=context.getPanel("net",true);
panel.openResponseInTab(file)
}};
Firebug.NetMonitor.ResponseSizeLimit.append(object,responseTextBox)
}netInfoBox.responsePresented=true;
if(FBTrace.DBG_NET){FBTrace.sysout("net.setResponseText; response text updated")
}},insertHeaderRows:function(netInfoBox,headers,tableName,rowName){if(!headers.length){return
}var headersTable=$$(".netInfo"+tableName+"Table",netInfoBox)[0];
var tbody=getChildByClass(headersTable,"netInfo"+rowName+"Body");
if(!tbody){tbody=headersTable.firstChild
}var titleRow=getChildByClass(tbody,"netInfo"+rowName+"Title");
this.headerDataTag.insertRows({headers:headers},titleRow?titleRow:tbody);
removeClass(titleRow,"collapsed")
}});
var NetInfoBody=Firebug.NetMonitor.NetInfoBody;
Firebug.NetMonitor.NetInfoHeaders=domplate(Firebug.Rep,{tag:DIV({"class":"netInfoHeadersTable",role:"tabpanel"},DIV({"class":"netInfoHeadersGroup netInfoResponseHeadersTitle"},SPAN($STR("ResponseHeaders")),SPAN({"class":"netHeadersViewSource response collapsed",onclick:"$onViewSource",_sourceDisplayed:false,_rowName:"ResponseHeaders"},$STR("net.headers.view source"))),TABLE({cellpadding:0,cellspacing:0},TBODY({"class":"netInfoResponseHeadersBody",role:"list","aria-label":$STR("ResponseHeaders")})),DIV({"class":"netInfoHeadersGroup netInfoRequestHeadersTitle"},SPAN($STR("RequestHeaders")),SPAN({"class":"netHeadersViewSource request collapsed",onclick:"$onViewSource",_sourceDisplayed:false,_rowName:"RequestHeaders"},$STR("net.headers.view source"))),TABLE({cellpadding:0,cellspacing:0},TBODY({"class":"netInfoRequestHeadersBody",role:"list","aria-label":$STR("RequestHeaders")}))),sourceTag:TR({role:"presentation"},TD({colspan:2,role:"presentation"},PRE({"class":"source"}))),onViewSource:function(event){var target=event.target;
var requestHeaders=(target.rowName=="RequestHeaders");
var netInfoBox=getAncestorByClass(target,"netInfoBody");
var file=netInfoBox.repObject;
if(target.sourceDisplayed){var headers=requestHeaders?file.requestHeaders:file.responseHeaders;
this.insertHeaderRows(netInfoBox,headers,target.rowName);
target.innerHTML=$STR("net.headers.view source")
}else{var source=requestHeaders?file.requestHeadersText:file.responseHeadersText;
this.insertSource(netInfoBox,source,target.rowName);
target.innerHTML=$STR("net.headers.pretty print")
}target.sourceDisplayed=!target.sourceDisplayed;
cancelEvent(event)
},insertSource:function(netInfoBox,source,rowName){var tbody=$$(".netInfo"+rowName+"Body",netInfoBox)[0];
var node=this.sourceTag.replace({},tbody);
var sourceNode=$$(".source",node)[0];
sourceNode.innerHTML=source
},insertHeaderRows:function(netInfoBox,headers,rowName){var headersTable=$$(".netInfoHeadersTable",netInfoBox)[0];
var tbody=$$(".netInfo"+rowName+"Body",headersTable)[0];
clearNode(tbody);
if(!headers.length){return
}NetInfoBody.headerDataTag.insertRows({headers:headers},tbody);
var titleRow=getChildByClass(headersTable,"netInfo"+rowName+"Title");
removeClass(titleRow,"collapsed")
},init:function(parent){var rootNode=this.tag.append({},parent);
var netInfoBox=getAncestorByClass(parent,"netInfoBody");
var file=netInfoBox.repObject;
var viewSource;
viewSource=$$(".request",rootNode)[0];
if(file.requestHeadersText){removeClass(viewSource,"collapsed")
}viewSource=$$(".response",rootNode)[0];
if(file.responseHeadersText){removeClass(viewSource,"collapsed")
}},renderHeaders:function(parent,headers,rowName){if(!parent.firstChild){this.init(parent)
}this.insertHeaderRows(parent,headers,rowName)
}});
var NetInfoHeaders=Firebug.NetMonitor.NetInfoHeaders;
Firebug.NetMonitor.NetInfoPostData=domplate(Firebug.Rep,{paramsTable:TABLE({"class":"netInfoPostParamsTable",cellpadding:0,cellspacing:0,role:"presentation"},TBODY({role:"list","aria-label":$STR("net.label.Parameters")},TR({"class":"netInfoPostParamsTitle",role:"presentation"},TD({colspan:3,role:"presentation"},DIV({"class":"netInfoPostParams"},$STR("net.label.Parameters"),SPAN({"class":"netInfoPostContentType"},"application/x-www-form-urlencoded")))))),partsTable:TABLE({"class":"netInfoPostPartsTable",cellpadding:0,cellspacing:0,role:"presentation"},TBODY({role:"list","aria-label":$STR("net.label.Parts")},TR({"class":"netInfoPostPartsTitle",role:"presentation"},TD({colspan:2,role:"presentation"},DIV({"class":"netInfoPostParams"},$STR("net.label.Parts"),SPAN({"class":"netInfoPostContentType"},"multipart/form-data")))))),jsonTable:TABLE({"class":"netInfoPostJSONTable",cellpadding:0,cellspacing:0,role:"presentation"},TBODY({role:"list","aria-label":$STR("JSON")},TR({"class":"netInfoPostJSONTitle",role:"presentation"},TD({role:"presentation"},DIV({"class":"netInfoPostParams"},$STR("JSON")))),TR(TD({"class":"netInfoPostJSONBody"})))),xmlTable:TABLE({"class":"netInfoPostXMLTable",cellpadding:0,cellspacing:0,role:"presentation"},TBODY({role:"list","aria-label":$STR("xmlviewer.tab.XML")},TR({"class":"netInfoPostXMLTitle",role:"presentation"},TD({role:"presentation"},DIV({"class":"netInfoPostParams"},$STR("xmlviewer.tab.XML")))),TR(TD({"class":"netInfoPostXMLBody"})))),sourceTable:TABLE({"class":"netInfoPostSourceTable",cellpadding:0,cellspacing:0,role:"presentation"},TBODY({role:"list","aria-label":$STR("net.label.Source")},TR({"class":"netInfoPostSourceTitle",role:"presentation"},TD({colspan:2,role:"presentation"},DIV({"class":"netInfoPostSource"},$STR("net.label.Source")))))),sourceBodyTag:TR({role:"presentation"},TD({colspan:2,role:"presentation"},FOR("line","$param|getParamValueIterator",CODE({"class":"focusRow subFocusRow",role:"listitem"},"$line")))),getParamValueIterator:function(param){return NetInfoBody.getParamValueIterator(param)
},render:function(context,parentNode,file){var spy=getAncestorByClass(parentNode,"spyHead");
var spyObject=spy.repObject;
var data=spyObject.data;
var contentType=file.mimeType;
if(contentType&&contentType=="application/x-www-form-urlencoded"||data&&data.indexOf("=")!=-1){var params=parseURLEncodedTextArray(data);
if(params){this.insertParameters(parentNode,params)
}}var jsonData={responseText:data};
if(Firebug.JSONViewerModel.isJSON(contentType,data)){this.insertJSON(parentNode,jsonData,context)
}var postText=data;
if(postText){this.insertSource(parentNode,postText)
}},insertParameters:function(parentNode,params){if(!params||!params.length){return
}var paramTable=this.paramsTable.append({object:{}},parentNode);
var row=$$(".netInfoPostParamsTitle",paramTable)[0];
var tbody=paramTable.getElementsByTagName("tbody")[0];
NetInfoBody.headerDataTag.insertRows({headers:params},row)
},insertParts:function(parentNode,data){if(!data.params||!data.params.length){return
}var partsTable=this.partsTable.append({object:{}},parentNode);
var row=$$(".netInfoPostPartsTitle",paramTable)[0];
NetInfoBody.headerDataTag.insertRows({headers:data.params},row)
},insertJSON:function(parentNode,file,context){var text=file.responseText;
var data=parseJSONString(text);
if(!data){return
}var jsonTable=this.jsonTable.append({},parentNode);
var jsonBody=$$(".netInfoPostJSONBody",jsonTable)[0];
if(!this.toggles){this.toggles={}
}Firebug.DOMPanel.DirTable.tag.replace({object:data,toggles:this.toggles},jsonBody)
},insertXML:function(parentNode,file,context){var text=Utils.getPostText(file,context);
var jsonTable=this.xmlTable.append(null,parentNode);
var jsonBody=$$(".netInfoPostXMLBody",jsonTable)[0];
Firebug.XMLViewerModel.insertXML(jsonBody,text)
},insertSource:function(parentNode,text){var sourceTable=this.sourceTable.append({object:{}},parentNode);
var row=$$(".netInfoPostSourceTitle",sourceTable)[0];
var param={value:[text]};
this.sourceBodyTag.insertRows({param:param},row)
},parseMultiPartText:function(file,context){var text=Utils.getPostText(file,context);
if(text==undefined){return null
}FBTrace.sysout("net.parseMultiPartText; boundary: ",text);
var boundary=text.match(/\s*boundary=\s*(.*)/)[1];
var divider="\r\n\r\n";
var bodyStart=text.indexOf(divider);
var body=text.substr(bodyStart+divider.length);
var postData={};
postData.mimeType="multipart/form-data";
postData.params=[];
var parts=body.split("--"+boundary);
for(var i=0;
i<parts.length;
i++){var part=parts[i].split(divider);
if(part.length!=2){continue
}var m=part[0].match(/\s*name=\"(.*)\"(;|$)/);
postData.params.push({name:(m&&m.length>1)?m[1]:"",value:trim(part[1])})
}return postData
}});
var NetInfoPostData=Firebug.NetMonitor.NetInfoPostData;
var $STRP=function(a){return a
};
Firebug.NetMonitor.NetLimit=domplate(Firebug.Rep,{collapsed:true,tableTag:DIV(TABLE({width:"100%",cellpadding:0,cellspacing:0},TBODY())),limitTag:TR({"class":"netRow netLimitRow",$collapsed:"$isCollapsed"},TD({"class":"netCol netLimitCol",colspan:6},TABLE({cellpadding:0,cellspacing:0},TBODY(TR(TD(SPAN({"class":"netLimitLabel"},$STRP("plural.Limit_Exceeded",[0]))),TD({style:"width:100%"}),TD(BUTTON({"class":"netLimitButton",title:"$limitPrefsTitle",onclick:"$onPreferences"},$STR("LimitPrefs"))),TD("&nbsp;")))))),isCollapsed:function(){return this.collapsed
},onPreferences:function(event){openNewTab("about:config")
},updateCounter:function(row){removeClass(row,"collapsed");
var limitLabel=row.getElementsByClassName("netLimitLabel").item(0);
limitLabel.firstChild.nodeValue=$STRP("plural.Limit_Exceeded",[row.limitInfo.totalCount])
},createTable:function(parent,limitInfo){var table=this.tableTag.replace({},parent);
var row=this.createRow(table.firstChild.firstChild,limitInfo);
return[table,row]
},createRow:function(parent,limitInfo){var row=this.limitTag.insertRows(limitInfo,parent,this)[0];
row.limitInfo=limitInfo;
return row
},observe:function(subject,topic,data){if(topic!="nsPref:changed"){return
}if(data.indexOf("net.logLimit")!=-1){this.updateMaxLimit()
}},updateMaxLimit:function(){var value=Firebug.getPref(Firebug.prefDomain,"net.logLimit");
maxQueueRequests=value?value:maxQueueRequests
}});
var NetLimit=Firebug.NetMonitor.NetLimit;
Firebug.NetMonitor.ResponseSizeLimit=domplate(Firebug.Rep,{tag:DIV({"class":"netInfoResponseSizeLimit"},SPAN("$object.beforeLink"),A({"class":"objectLink",onclick:"$onClickLink"},"$object.linkText"),SPAN("$object.afterLink")),reLink:/^(.*)<a>(.*)<\/a>(.*$)/,append:function(obj,parent){var m=obj.text.match(this.reLink);
return this.tag.append({onClickLink:obj.onClickLink,object:{beforeLink:m[1],linkText:m[2],afterLink:m[3]}},parent,this)
}});
Firebug.NetMonitor.Utils={findHeader:function(headers,name){if(!headers){return null
}name=name.toLowerCase();
for(var i=0;
i<headers.length;
++i){var headerName=headers[i].name.toLowerCase();
if(headerName==name){return headers[i].value
}}},formatPostText:function(text){if(text instanceof XMLDocument){return getElementXML(text.documentElement)
}else{return text
}},getPostText:function(file,context,noLimit){if(!file.postText){file.postText=readPostTextFromRequest(file.request,context);
if(!file.postText&&context){file.postText=readPostTextFromPage(file.href,context)
}}if(!file.postText){return file.postText
}var limit=Firebug.netDisplayedPostBodyLimit;
if(file.postText.length>limit&&!noLimit){return cropString(file.postText,limit,"\n\n... "+$STR("net.postDataSizeLimitMessage")+" ...\n\n")
}return file.postText
},getResponseText:function(file,context){return(typeof(file.responseText)!="undefined")?file.responseText:context.sourceCache.loadText(file.href,file.method,file)
},isURLEncodedRequest:function(file,context){var text=Utils.getPostText(file,context);
if(text&&text.toLowerCase().indexOf("content-type: application/x-www-form-urlencoded")==0){return true
}var headerValue=Utils.findHeader(file.requestHeaders,"content-type");
if(headerValue&&headerValue.indexOf("application/x-www-form-urlencoded")==0){return true
}return false
},isMultiPartRequest:function(file,context){var text=Utils.getPostText(file,context);
if(text&&text.toLowerCase().indexOf("content-type: multipart/form-data")==0){return true
}return false
},getMimeType:function(mimeType,uri){if(!mimeType||!(mimeCategoryMap.hasOwnProperty(mimeType))){var ext=getFileExtension(uri);
if(!ext){return mimeType
}else{var extMimeType=mimeExtensionMap[ext.toLowerCase()];
return extMimeType?extMimeType:mimeType
}}else{return mimeType
}},getDateFromSeconds:function(s){var d=new Date();
d.setTime(s*1000);
return d
},getHttpHeaders:function(request,file){try{var http=QI(request,Ci.nsIHttpChannel);
file.status=request.responseStatus;
file.method=http.requestMethod;
file.urlParams=parseURLParams(file.href);
file.mimeType=Utils.getMimeType(request.contentType,request.name);
if(!file.responseHeaders&&Firebug.collectHttpHeaders){var requestHeaders=[],responseHeaders=[];
http.visitRequestHeaders({visitHeader:function(name,value){requestHeaders.push({name:name,value:value})
}});
http.visitResponseHeaders({visitHeader:function(name,value){responseHeaders.push({name:name,value:value})
}});
file.requestHeaders=requestHeaders;
file.responseHeaders=responseHeaders
}}catch(exc){if(FBTrace.DBG_ERRORS){FBTrace.sysout("net.getHttpHeaders FAILS "+file.href,exc)
}}},isXHR:function(request){try{var callbacks=request.notificationCallbacks;
var xhrRequest=callbacks?callbacks.getInterface(Ci.nsIXMLHttpRequest):null;
if(FBTrace.DBG_NET){FBTrace.sysout("net.isXHR; "+(xhrRequest!=null)+", "+safeGetName(request))
}return(xhrRequest!=null)
}catch(exc){}return false
},getFileCategory:function(file){if(file.category){if(FBTrace.DBG_NET){FBTrace.sysout("net.getFileCategory; current: "+file.category+" for: "+file.href,file)
}return file.category
}if(file.isXHR){if(FBTrace.DBG_NET){FBTrace.sysout("net.getFileCategory; XHR for: "+file.href,file)
}return file.category="xhr"
}if(!file.mimeType){var ext=getFileExtension(file.href);
if(ext){file.mimeType=mimeExtensionMap[ext.toLowerCase()]
}}if(!file.mimeType){return""
}var mimeType=file.mimeType;
if(mimeType){mimeType=mimeType.split(";")[0]
}return(file.category=mimeCategoryMap[mimeType])
}};
var Utils=Firebug.NetMonitor.Utils;
Firebug.registerModule(Firebug.NetMonitor)
}});
FBL.ns(function(){with(FBL){var contexts=[];
Firebug.Spy=extend(Firebug.Module,{dispatchName:"spy",initialize:function(){if(Firebug.TraceModule){Firebug.TraceModule.addListener(this.TraceListener)
}Firebug.Module.initialize.apply(this,arguments)
},shutdown:function(){Firebug.Module.shutdown.apply(this,arguments);
if(Firebug.TraceModule){Firebug.TraceModule.removeListener(this.TraceListener)
}},initContext:function(context){context.spies=[];
if(Firebug.showXMLHttpRequests&&Firebug.Console.isAlwaysEnabled()){this.attachObserver(context,context.window)
}if(FBTrace.DBG_SPY){FBTrace.sysout("spy.initContext "+contexts.length+" ",context.getName())
}},destroyContext:function(context){this.detachObserver(context,null);
if(FBTrace.DBG_SPY&&context.spies.length){FBTrace.sysout("spy.destroyContext; ERROR There are leaking Spies ("+context.spies.length+") "+context.getName())
}delete context.spies;
if(FBTrace.DBG_SPY){FBTrace.sysout("spy.destroyContext "+contexts.length+" ",context.getName())
}},watchWindow:function(context,win){if(Firebug.showXMLHttpRequests&&Firebug.Console.isAlwaysEnabled()){this.attachObserver(context,win)
}},unwatchWindow:function(context,win){try{this.detachObserver(context,win)
}catch(ex){ERROR(ex)
}},updateOption:function(name,value){if(name=="showXMLHttpRequests"){var tach=value?this.attachObserver:this.detachObserver;
for(var i=0;
i<TabWatcher.contexts.length;
++i){var context=TabWatcher.contexts[i];
iterateWindows(context.window,function(win){tach.apply(this,[context,win])
})
}}},skipSpy:function(win){if(!win){return true
}var uri=safeGetWindowLocation(win);
if(uri&&(uri.indexOf("about:")==0||uri.indexOf("chrome:")==0)){return true
}},attachObserver:function(context,win){if(Firebug.Spy.skipSpy(win)){return
}for(var i=0;
i<contexts.length;
++i){if((contexts[i].context==context)&&(contexts[i].win==win)){return
}}if(contexts.length==0){httpObserver.addObserver(SpyHttpObserver,"firebug-http-event",false);
SpyHttpActivityObserver.registerObserver()
}contexts.push({context:context,win:win});
if(FBTrace.DBG_SPY){FBTrace.sysout("spy.attachObserver (HTTP) "+contexts.length+" ",context.getName())
}},detachObserver:function(context,win){for(var i=0;
i<contexts.length;
++i){if(contexts[i].context==context){if(win&&(contexts[i].win!=win)){continue
}contexts.splice(i,1);
if(contexts.length==0){httpObserver.removeObserver(SpyHttpObserver,"firebug-http-event");
SpyHttpActivityObserver.unregisterObserver()
}if(FBTrace.DBG_SPY){FBTrace.sysout("spy.detachObserver (HTTP) "+contexts.length+" ",context.getName())
}return
}}},getXHR:function(request){if(!(request instanceof Ci.nsIHttpChannel)){return null
}try{var callbacks=request.notificationCallbacks;
return(callbacks?callbacks.getInterface(Ci.nsIXMLHttpRequest):null)
}catch(exc){if(exc.name=="NS_NOINTERFACE"){if(FBTrace.DBG_SPY){FBTrace.sysout("spy.getXHR; Request is not nsIXMLHttpRequest: "+safeGetRequestName(request))
}}}return null
}});
Firebug.Spy.XHR=domplate(Firebug.Rep,{tag:DIV({"class":"spyHead",_repObject:"$object"},TABLE({"class":"spyHeadTable focusRow outerFocusRow",cellpadding:0,cellspacing:0,role:"listitem","aria-expanded":"false"},TBODY({role:"presentation"},TR({"class":"spyRow"},TD({"class":"spyTitleCol spyCol",onclick:"$onToggleBody"},DIV({"class":"spyTitle"},"$object|getCaption"),DIV({"class":"spyFullTitle spyTitle"},"$object|getFullUri")),TD({"class":"spyCol"},DIV({"class":"spyStatus"},"$object|getStatus")),TD({"class":"spyCol"},SPAN({"class":"spyIcon"})),TD({"class":"spyCol"},SPAN({"class":"spyTime"})),TD({"class":"spyCol"},TAG(FirebugReps.SourceLink.tag,{object:"$object.sourceLink"})))))),getCaption:function(spy){return spy.method.toUpperCase()+" "+cropString(spy.getURL(),100)
},getFullUri:function(spy){return spy.method.toUpperCase()+" "+spy.getURL()
},getStatus:function(spy){var text="";
if(spy.statusCode){text+=spy.statusCode+" "
}if(spy.statusText){return text+=spy.statusText
}return text
},onToggleBody:function(event){var target=event.currentTarget||event.srcElement;
var logRow=getAncestorByClass(target,"logRow-spy");
if(isLeftClick(event)){toggleClass(logRow,"opened");
var spy=getChildByClass(logRow,"spyHead").repObject;
var spyHeadTable=getAncestorByClass(target,"spyHeadTable");
if(hasClass(logRow,"opened")){updateHttpSpyInfo(spy,logRow);
if(spyHeadTable){spyHeadTable.setAttribute("aria-expanded","true")
}}else{}}},copyURL:function(spy){copyToClipboard(spy.getURL())
},copyParams:function(spy){var text=spy.postText;
if(!text){return
}var url=reEncodeURL(spy,text,true);
copyToClipboard(url)
},copyResponse:function(spy){copyToClipboard(spy.responseText)
},openInTab:function(spy){openNewTab(spy.getURL(),spy.postText)
},supportsObject:function(object){return false;
return object instanceof Firebug.Spy.XMLHttpRequestSpy
},browseObject:function(spy,context){var url=spy.getURL();
openNewTab(url);
return true
},getRealObject:function(spy,context){return spy.xhrRequest
},getContextMenuItems:function(spy){var items=[{label:"CopyLocation",command:bindFixed(this.copyURL,this,spy)}];
if(spy.postText){items.push({label:"CopyLocationParameters",command:bindFixed(this.copyParams,this,spy)})
}items.push({label:"CopyResponse",command:bindFixed(this.copyResponse,this,spy)},"-",{label:"OpenInTab",command:bindFixed(this.openInTab,this,spy)});
return items
}});
function updateTime(spy){var timeBox=spy.logRow.getElementsByClassName("spyTime").item(0);
if(spy.responseTime){timeBox.textContent=" "+formatTime(spy.responseTime)
}}function updateLogRow(spy){updateTime(spy);
var statusBox=spy.logRow.getElementsByClassName("spyStatus").item(0);
statusBox.textContent=Firebug.Spy.XHR.getStatus(spy);
removeClass(spy.logRow,"loading");
setClass(spy.logRow,"loaded");
try{var errorRange=Math.floor(spy.xhrRequest.status/100);
if(errorRange==4||errorRange==5){setClass(spy.logRow,"error")
}}catch(exc){}}var updateHttpSpyInfo=function updateHttpSpyInfo(spy,logRow){if(!spy.logRow&&logRow){spy.logRow=logRow
}if(!spy.logRow||!hasClass(spy.logRow,"opened")){return
}if(!spy.params){spy.params=parseURLParams(spy.href+"")
}if(!spy.requestHeaders){spy.requestHeaders=getRequestHeaders(spy)
}if(!spy.responseHeaders&&spy.loaded){spy.responseHeaders=getResponseHeaders(spy)
}var template=Firebug.NetMonitor.NetInfoBody;
var netInfoBox=getChildByClass(spy.logRow,"spyHead","netInfoBody");
if(!netInfoBox){var head=getChildByClass(spy.logRow,"spyHead");
netInfoBox=template.tag.append({file:spy},head);
dispatch(template.fbListeners,"initTabBody",[netInfoBox,spy]);
template.selectTabByName(netInfoBox,"Response")
}else{template.updateInfo(netInfoBox,spy,spy.context)
}};
function getRequestHeaders(spy){var headers=[];
var channel=spy.xhrRequest.channel;
if(channel instanceof Ci.nsIHttpChannel){channel.visitRequestHeaders({visitHeader:function(name,value){headers.push({name:name,value:value})
}})
}return headers
}function getResponseHeaders(spy){var headers=[];
try{var channel=spy.xhrRequest.channel;
if(channel instanceof Ci.nsIHttpChannel){channel.visitResponseHeaders({visitHeader:function(name,value){headers.push({name:name,value:value})
}})
}}catch(exc){if(FBTrace.DBG_SPY||FBTrace.DBG_ERRORS){FBTrace.sysout("spy.getResponseHeaders; EXCEPTION "+safeGetRequestName(spy.request),exc)
}}return headers
}Firebug.registerModule(Firebug.Spy)
}});
FBL.ns(function(){with(FBL){var contentTypes={"text/javascript":1,"text/x-javascript":1,"text/json":1,"text/x-json":1,"application/json":1,"application/x-json":1,"application/javascript":1,"application/x-javascript":1,"application/json-rpc":1};
Firebug.JSONViewerModel=extend(Firebug.Module,{dispatchName:"jsonViewer",initialize:function(){Firebug.NetMonitor.NetInfoBody.addListener(this);
this.toggles={}
},shutdown:function(){Firebug.NetMonitor.NetInfoBody.removeListener(this)
},initTabBody:function(infoBox,file){if(FBTrace.DBG_JSONVIEWER){FBTrace.sysout("jsonviewer.initTabBody",infoBox)
}dispatch(this.fbListeners,"onParseJSON",[file]);
if(!file.jsonObject){if(this.isJSON(file.mimeType,file.responseText)){file.jsonObject=this.parseJSON(file)
}}if(file.jsonObject&&hasProperties(file.jsonObject)){Firebug.NetMonitor.NetInfoBody.appendTab(infoBox,"JSON",$STR("JSON"));
if(FBTrace.DBG_JSONVIEWER){FBTrace.sysout("jsonviewer.initTabBody; JSON object available "+(typeof(file.jsonObject)!="undefined"),file.jsonObject)
}}},isJSON:function(contentType,data){var responseText=data?trim(data):null;
if(responseText&&responseText.indexOf("{")==0){return true
}if(!contentType){return false
}contentType=contentType.split(";")[0];
contentType=trim(contentType);
return contentTypes[contentType]
},updateTabBody:function(infoBox,file,context){var tab=infoBox.selectedTab;
var tabBody=$$(".netInfoJSONText",infoBox)[0];
if(!hasClass(tab,"netInfoJSONTab")||tabBody.updated){return
}tabBody.updated=true;
if(file.jsonObject){Firebug.DOMPanel.DirTable.tag.replace({object:file.jsonObject,toggles:this.toggles},tabBody)
}},parseJSON:function(file){var jsonString=new String(file.responseText);
return parseJSONString(jsonString)
}});
Firebug.registerModule(Firebug.JSONViewerModel)
}});
FBL.ns(function(){with(FBL){var xmlContentTypes=["text/xml","application/xml","application/xhtml+xml","application/rss+xml","application/atom+xml",,"application/vnd.mozilla.maybe.feed","application/rdf+xml","application/vnd.mozilla.xul+xml"];
Firebug.XMLViewerModel=extend(Firebug.Module,{dispatchName:"xmlViewer",initialize:function(){Firebug.Module.initialize.apply(this,arguments);
Firebug.NetMonitor.NetInfoBody.addListener(this)
},shutdown:function(){Firebug.Module.shutdown.apply(this,arguments);
Firebug.NetMonitor.NetInfoBody.removeListener(this)
},initTabBody:function(infoBox,file){if(FBTrace.DBG_XMLVIEWER){FBTrace.sysout("xmlviewer.initTabBody",infoBox)
}if(this.isXML(file.mimeType,file.responseText)){Firebug.NetMonitor.NetInfoBody.appendTab(infoBox,"XML",$STR("XML"));
if(FBTrace.DBG_XMLVIEWER){FBTrace.sysout("xmlviewer.initTabBody; XML response available")
}}},isXML:function(contentType){if(!contentType){return false
}for(var i=0;
i<xmlContentTypes.length;
i++){if(contentType.indexOf(xmlContentTypes[i])==0){return true
}}return false
},updateTabBody:function(infoBox,file,context){var tab=infoBox.selectedTab;
var tabBody=$$(".netInfoXMLText",infoBox)[0];
if(!hasClass(tab,"netInfoXMLTab")||tabBody.updated){return
}tabBody.updated=true;
this.insertXML(tabBody,Firebug.NetMonitor.Utils.getResponseText(file,context))
},insertXML:function(parentNode,text){var xmlText=text.replace(/^\s*<?.+?>\s*/,"");
var div=parentNode.ownerDocument.createElement("div");
div.innerHTML=xmlText;
var root=div.getElementsByTagName("*")[0];
if(FBTrace.DBG_XMLVIEWER){FBTrace.sysout("xmlviewer.updateTabBody; XML response parsed",doc)
}var html=[];
Firebug.Reps.appendNode(root,html);
parentNode.innerHTML=html.join("")
}});
Firebug.XMLViewerModel.ParseError=domplate(Firebug.Rep,{tag:DIV({"class":"xmlInfoError"},DIV({"class":"xmlInfoErrorMsg"},"$error.message"),PRE({"class":"xmlInfoErrorSource"},"$error|getSource")),getSource:function(error){var parts=error.source.split("\n");
if(parts.length!=2){return error.source
}var limit=50;
var column=parts[1].length;
if(column>=limit){parts[0]="..."+parts[0].substr(column-limit);
parts[1]="..."+parts[1].substr(column-limit)
}if(parts[0].length>80){parts[0]=parts[0].substr(0,80)+"..."
}return parts.join("\n")
}});
Firebug.registerModule(Firebug.XMLViewerModel)
}});
FBL.ns(function(){with(FBL){var consoleQueue=[];
var lastHighlightedObject;
var FirebugContext=Env.browser;
var maxQueueRequests=500;
Firebug.ConsoleBase={log:function(object,context,className,rep,noThrottle,sourceLink){return this.logRow(appendObject,object,context,className,rep,sourceLink,noThrottle)
},logFormatted:function(objects,context,className,noThrottle,sourceLink){return this.logRow(appendFormatted,objects,context,className,null,sourceLink,noThrottle)
},openGroup:function(objects,context,className,rep,noThrottle,sourceLink,noPush){return this.logRow(appendOpenGroup,objects,context,className,rep,sourceLink,noThrottle)
},closeGroup:function(context,noThrottle){return this.logRow(appendCloseGroup,null,context,null,null,null,noThrottle,true)
},logRow:function(appender,objects,context,className,rep,sourceLink,noThrottle,noRow){noThrottle=true;
if(!context){context=FirebugContext
}if(FBTrace.DBG_ERRORS&&!context){FBTrace.sysout("Console.logRow has no context, skipping objects",objects)
}if(!context){return
}if(noThrottle||!context){var panel=this.getPanel(context);
if(panel){var row=panel.append(appender,objects,className,rep,sourceLink,noRow);
var container=panel.panelNode;
return row
}else{consoleQueue.push([appender,objects,context,className,rep,sourceLink,noThrottle,noRow])
}}else{if(!context.throttle){return
}var args=[appender,objects,context,className,rep,sourceLink,true,noRow];
context.throttle(this.logRow,this,args)
}},appendFormatted:function(args,row,context){if(!context){context=FirebugContext
}var panel=this.getPanel(context);
panel.appendFormatted(args,row)
},clear:function(context){if(!context){context=Firebug.context
}var panel=this.getPanel(context,true);
if(panel){panel.clear()
}},getPanel:function(context,noCreate){return Firebug.chrome?Firebug.chrome.getPanel("Console"):null
}};
var ActivableConsole=extend(Firebug.ConsoleBase,{isAlwaysEnabled:function(){return true
}});
Firebug.Console=Firebug.Console=extend(ActivableConsole,{dispatchName:"console",error:function(){Firebug.Console.logFormatted(arguments,Firebug.browser,"error")
},flush:function(){dispatch(this.fbListeners,"flush",[]);
for(var i=0,length=consoleQueue.length;
i<length;
i++){var args=consoleQueue[i];
this.logRow.apply(this,args)
}},showPanel:function(browser,panel){},getFirebugConsoleElement:function(context,win){var element=win.document.getElementById("_firebugConsole");
if(!element){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("getFirebugConsoleElement forcing element")
}var elementForcer="(function(){var r=null; try { r = window._getFirebugConsoleElement();}catch(exc){r=exc;} return r;})();";
if(context.stopped){Firebug.Console.injector.evaluateConsoleScript(context)
}else{var r=Firebug.CommandLine.evaluateInWebPage(elementForcer,context,win)
}if(FBTrace.DBG_CONSOLE){FBTrace.sysout("getFirebugConsoleElement forcing element result "+r,r)
}var element=win.document.getElementById("_firebugConsole");
if(!element){if(FBTrace.DBG_ERRORS){FBTrace.sysout("console.getFirebugConsoleElement: no _firebugConsole in win:",win)
}Firebug.Console.logFormatted(["Firebug cannot find _firebugConsole element",r,win],context,"error",true)
}}return element
},isReadyElsePreparing:function(context,win){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("console.isReadyElsePreparing, win is "+(win?"an argument: ":"null, context.window: ")+(win?win.location:context.window.location),(win?win:context.window))
}if(win){return this.injector.attachIfNeeded(context,win)
}else{var attached=true;
for(var i=0;
i<context.windows.length;
i++){attached=attached&&this.injector.attachIfNeeded(context,context.windows[i])
}if(context.windows.indexOf(context.window)==-1){FBTrace.sysout("isReadyElsePreparing ***************** context.window not in context.windows")
}if(FBTrace.DBG_CONSOLE){FBTrace.sysout("console.isReadyElsePreparing attached to "+context.windows.length+" and returns "+attached)
}return attached
}},initialize:function(){this.panelName="console"
},enable:function(){if(Firebug.Console.isAlwaysEnabled()){this.watchForErrors()
}},disable:function(){if(Firebug.Console.isAlwaysEnabled()){this.unwatchForErrors()
}},initContext:function(context,persistedState){Firebug.ActivableModule.initContext.apply(this,arguments);
context.consoleReloadWarning=true
},loadedContext:function(context){for(var url in context.sourceFileMap){return
}this.clearReloadWarning(context)
},clearReloadWarning:function(context){if(context.consoleReloadWarning){var panel=context.getPanel(this.panelName);
panel.clearReloadWarning();
delete context.consoleReloadWarning
}},togglePersist:function(context){var panel=context.getPanel(this.panelName);
panel.persistContent=panel.persistContent?false:true;
Firebug.chrome.setGlobalAttribute("cmd_togglePersistConsole","checked",panel.persistContent)
},showContext:function(browser,context){Firebug.chrome.setGlobalAttribute("cmd_clearConsole","disabled",!context);
Firebug.ActivableModule.showContext.apply(this,arguments)
},destroyContext:function(context,persistedState){Firebug.Console.injector.detachConsole(context,context.window)
},onPanelEnable:function(panelName){if(panelName!=this.panelName){return
}if(FBTrace.DBG_CONSOLE){FBTrace.sysout("console.onPanelEnable**************")
}this.watchForErrors();
Firebug.Debugger.addDependentModule(this)
},onPanelDisable:function(panelName){if(panelName!=this.panelName){return
}if(FBTrace.DBG_CONSOLE){FBTrace.sysout("console.onPanelDisable**************")
}Firebug.Debugger.removeDependentModule(this);
this.unwatchForErrors();
this.clear()
},onSuspendFirebug:function(){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("console.onSuspendFirebug\n")
}if(Firebug.Console.isAlwaysEnabled()){this.unwatchForErrors()
}},onResumeFirebug:function(){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("console.onResumeFirebug\n")
}if(Firebug.Console.isAlwaysEnabled()){this.watchForErrors()
}},watchForErrors:function(){Firebug.Errors.checkEnabled();
$("fbStatusIcon").setAttribute("console","on")
},unwatchForErrors:function(){Firebug.Errors.checkEnabled();
$("fbStatusIcon").removeAttribute("console")
},onMonitorScript:function(context,frame){Firebug.Console.log(frame,context)
},onFunctionCall:function(context,frame,depth,calling){if(calling){Firebug.Console.openGroup([frame,"depth:"+depth],context)
}else{Firebug.Console.closeGroup(context)
}},logRow:function(appender,objects,context,className,rep,sourceLink,noThrottle,noRow){if(!context){context=FirebugContext
}if(FBTrace.DBG_WINDOWS&&!context){FBTrace.sysout("Console.logRow: no context \n")
}if(this.isAlwaysEnabled()){return Firebug.ConsoleBase.logRow.apply(this,arguments)
}}});
Firebug.ConsoleListener={log:function(context,object,className,sourceLink){},logFormatted:function(context,objects,className,sourceLink){}};
Firebug.ConsolePanel=function(){};
Firebug.ConsolePanel.prototype=extend(Firebug.Panel,{wasScrolledToBottom:false,messageCount:0,lastLogTime:0,groups:null,limit:null,append:function(appender,objects,className,rep,sourceLink,noRow){var container=this.getTopContainer();
if(noRow){appender.apply(this,[objects])
}else{var row=this.createRow("logRow",className);
appender.apply(this,[objects,row,rep]);
if(sourceLink){FirebugReps.SourceLink.tag.append({object:sourceLink},row)
}container.appendChild(row);
this.filterLogRow(row,this.wasScrolledToBottom);
if(this.wasScrolledToBottom){scrollToBottom(this.panelNode)
}return row
}},clear:function(){if(this.panelNode){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("ConsolePanel.clear")
}clearNode(this.panelNode);
this.insertLogLimit(this.context)
}},insertLogLimit:function(){var row=this.createRow("limitRow");
var limitInfo={totalCount:0,limitPrefsTitle:$STRF("LimitPrefsTitle",[Firebug.prefDomain+".console.logLimit"])};
return;
var netLimitRep=Firebug.NetMonitor.NetLimit;
var nodes=netLimitRep.createTable(row,limitInfo);
this.limit=nodes[1];
var container=this.panelNode;
container.insertBefore(nodes[0],container.firstChild)
},insertReloadWarning:function(){this.warningRow=this.append(appendObject,$STR("message.Reload to activate window console"),"info")
},clearReloadWarning:function(){if(this.warningRow){this.warningRow.parentNode.removeChild(this.warningRow);
delete this.warningRow
}},appendObject:function(object,row,rep){if(!rep){rep=Firebug.getRep(object)
}return rep.tag.append({object:object},row)
},appendFormatted:function(objects,row,rep){if(!objects||!objects.length){return
}function logText(text,row){var node=row.ownerDocument.createTextNode(text);
row.appendChild(node)
}var format=objects[0];
var objIndex=0;
if(typeof(format)!="string"){format="";
objIndex=-1
}else{if(objects.length===1){if(format.length<1){logText("(an empty string)",row);
return
}}}var parts=parseFormat(format);
var trialIndex=objIndex;
for(var i=0;
i<parts.length;
i++){var part=parts[i];
if(part&&typeof(part)=="object"){if(++trialIndex>objects.length){format="";
objIndex=-1;
parts.length=0;
break
}}}for(var i=0;
i<parts.length;
++i){var part=parts[i];
if(part&&typeof(part)=="object"){var object=objects[++objIndex];
if(typeof(object)!="undefined"){this.appendObject(object,row,part.rep)
}else{this.appendObject(part.type,row,FirebugReps.Text)
}}else{FirebugReps.Text.tag.append({object:part},row)
}}for(var i=objIndex+1;
i<objects.length;
++i){logText(" ",row);
var object=objects[i];
if(typeof(object)=="string"){FirebugReps.Text.tag.append({object:object},row)
}else{this.appendObject(object,row)
}}},appendOpenGroup:function(objects,row,rep){if(!this.groups){this.groups=[]
}setClass(row,"logGroup");
setClass(row,"opened");
var innerRow=this.createRow("logRow");
setClass(innerRow,"logGroupLabel");
if(rep){rep.tag.replace({objects:objects},innerRow)
}else{this.appendFormatted(objects,innerRow,rep)
}row.appendChild(innerRow);
var groupBody=this.createRow("logGroupBody");
row.appendChild(groupBody);
groupBody.setAttribute("role","group");
this.groups.push(groupBody);
addEvent(innerRow,"mousedown",function(event){if(isLeftClick(event)){var target=event.target||event.srcElement;
target=getAncestorByClass(target,"logGroupLabel");
var groupRow=target.parentNode;
if(hasClass(groupRow,"opened")){removeClass(groupRow,"opened");
target.setAttribute("aria-expanded","false")
}else{setClass(groupRow,"opened");
target.setAttribute("aria-expanded","true")
}}})
},appendCloseGroup:function(object,row,rep){if(this.groups){this.groups.pop()
}},onMouseMove:function(event){if(!Firebug.Inspector){return
}var target=event.srcElement||event.target;
var object=getAncestorByClass(target,"objectLink-element");
object=object?object.repObject:null;
if(object&&instanceOf(object,"Element")&&object.nodeType==1){if(object!=lastHighlightedObject){Firebug.Inspector.drawBoxModel(object);
object=lastHighlightedObject
}}else{Firebug.Inspector.hideBoxModel()
}},onMouseDown:function(event){var target=event.srcElement||event.target;
var object=getAncestorByClass(target,"objectLink");
var repObject=object?object.repObject:null;
if(!repObject){return
}if(hasClass(object,"objectLink-object")){Firebug.chrome.selectPanel("DOM");
Firebug.chrome.getPanel("DOM").select(repObject,true)
}else{if(hasClass(object,"objectLink-element")){Firebug.chrome.selectPanel("HTML");
Firebug.chrome.getPanel("HTML").select(repObject,true)
}}},name:"Console",title:"Console",options:{hasCommandLine:true,hasToolButtons:true,isPreRendered:true},create:function(){Firebug.Panel.create.apply(this,arguments);
this.context=Firebug.browser.window;
this.document=Firebug.chrome.document;
this.onMouseMove=bind(this.onMouseMove,this);
this.onMouseDown=bind(this.onMouseDown,this);
this.clearButton=new Button({element:$("fbConsole_btClear"),owner:Firebug.Console,onClick:Firebug.Console.clear})
},initialize:function(){Firebug.Panel.initialize.apply(this,arguments);
if(!this.persistedContent&&Firebug.Console.isAlwaysEnabled()){this.insertLogLimit(this.context);
this.updateMaxLimit();
if(this.context.consoleReloadWarning){this.insertReloadWarning()
}}addEvent(this.panelNode,"mouseover",this.onMouseMove);
addEvent(this.panelNode,"mousedown",this.onMouseDown);
this.clearButton.initialize()
},initializeNode:function(){if(FBTrace.DBG_CONSOLE){this.onScroller=bind(this.onScroll,this);
addEvent(this.panelNode,"scroll",this.onScroller)
}this.onResizer=bind(this.onResize,this);
this.resizeEventTarget=Firebug.chrome.$("fbContentBox");
addEvent(this.resizeEventTarget,"resize",this.onResizer)
},destroyNode:function(){if(this.onScroller){removeEvent(this.panelNode,"scroll",this.onScroller)
}},shutdown:function(){this.clearButton.shutdown();
removeEvent(this.panelNode,"mousemove",this.onMouseMove);
removeEvent(this.panelNode,"mousedown",this.onMouseDown);
this.destroyNode();
Firebug.Panel.shutdown.apply(this,arguments)
},ishow:function(state){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("Console.panel show; "+this.context.getName(),state)
}var enabled=Firebug.Console.isAlwaysEnabled();
if(enabled){Firebug.Console.disabledPanelPage.hide(this);
this.showCommandLine(true);
this.showToolbarButtons("fbConsoleButtons",true);
Firebug.chrome.setGlobalAttribute("cmd_togglePersistConsole","checked",this.persistContent);
if(state&&state.wasScrolledToBottom){this.wasScrolledToBottom=state.wasScrolledToBottom;
delete state.wasScrolledToBottom
}if(this.wasScrolledToBottom){scrollToBottom(this.panelNode)
}if(FBTrace.DBG_CONSOLE){FBTrace.sysout("console.show ------------------ wasScrolledToBottom: "+this.wasScrolledToBottom+", "+this.context.getName())
}}else{this.hide(state);
Firebug.Console.disabledPanelPage.show(this)
}},ihide:function(state){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("Console.panel hide; "+this.context.getName(),state)
}this.showToolbarButtons("fbConsoleButtons",false);
this.showCommandLine(false);
if(FBTrace.DBG_CONSOLE){FBTrace.sysout("console.hide ------------------ wasScrolledToBottom: "+this.wasScrolledToBottom+", "+this.context.getName())
}},destroy:function(state){if(this.panelNode.offsetHeight){this.wasScrolledToBottom=isScrolledToBottom(this.panelNode)
}if(state){state.wasScrolledToBottom=this.wasScrolledToBottom
}if(FBTrace.DBG_CONSOLE){FBTrace.sysout("console.destroy ------------------ wasScrolledToBottom: "+this.wasScrolledToBottom+", "+this.context.getName())
}},shouldBreakOnNext:function(){return Firebug.getPref(Firebug.servicePrefDomain,"breakOnErrors")
},getBreakOnNextTooltip:function(enabled){return(enabled?$STR("console.Disable Break On All Errors"):$STR("console.Break On All Errors"))
},enablePanel:function(module){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("console.ConsolePanel.enablePanel; "+this.context.getName())
}Firebug.ActivablePanel.enablePanel.apply(this,arguments);
this.showCommandLine(true);
if(this.wasScrolledToBottom){scrollToBottom(this.panelNode)
}},disablePanel:function(module){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("console.ConsolePanel.disablePanel; "+this.context.getName())
}Firebug.ActivablePanel.disablePanel.apply(this,arguments);
this.showCommandLine(false)
},getOptionsMenuItems:function(){return[optionMenu("ShowJavaScriptErrors","showJSErrors"),optionMenu("ShowJavaScriptWarnings","showJSWarnings"),optionMenu("ShowCSSErrors","showCSSErrors"),optionMenu("ShowXMLErrors","showXMLErrors"),optionMenu("ShowXMLHttpRequests","showXMLHttpRequests"),optionMenu("ShowChromeErrors","showChromeErrors"),optionMenu("ShowChromeMessages","showChromeMessages"),optionMenu("ShowExternalErrors","showExternalErrors"),optionMenu("ShowNetworkErrors","showNetworkErrors"),this.getShowStackTraceMenuItem(),this.getStrictOptionMenuItem(),"-",optionMenu("LargeCommandLine","largeCommandLine")]
},getShowStackTraceMenuItem:function(){var menuItem=serviceOptionMenu("ShowStackTrace","showStackTrace");
if(FirebugContext&&!Firebug.Debugger.isAlwaysEnabled()){menuItem.disabled=true
}return menuItem
},getStrictOptionMenuItem:function(){var strictDomain="javascript.options";
var strictName="strict";
var strictValue=prefs.getBoolPref(strictDomain+"."+strictName);
return{label:"JavascriptOptionsStrict",type:"checkbox",checked:strictValue,command:bindFixed(Firebug.setPref,Firebug,strictDomain,strictName,!strictValue)}
},getBreakOnMenuItems:function(){return[]
},search:function(text){if(!text){return
}if(this.matchSet){for(var i in this.matchSet){removeClass(this.matchSet[i],"matched")
}}this.matchSet=[];
function findRow(node){return getAncestorByClass(node,"logRow")
}var search=new TextSearch(this.panelNode,findRow);
var logRow=search.find(text);
if(!logRow){dispatch([Firebug.A11yModel],"onConsoleSearchMatchFound",[this,text,[]]);
return false
}for(;
logRow;
logRow=search.findNext()){setClass(logRow,"matched");
this.matchSet.push(logRow)
}dispatch([Firebug.A11yModel],"onConsoleSearchMatchFound",[this,text,this.matchSet]);
return true
},breakOnNext:function(breaking){Firebug.setPref(Firebug.servicePrefDomain,"breakOnErrors",breaking)
},createRow:function(rowName,className){var elt=this.document.createElement("div");
elt.className=rowName+(className?" "+rowName+"-"+className:"");
return elt
},getTopContainer:function(){if(this.groups&&this.groups.length){return this.groups[this.groups.length-1]
}else{return this.panelNode
}},filterLogRow:function(logRow,scrolledToBottom){if(this.searchText){setClass(logRow,"matching");
setClass(logRow,"matched");
setTimeout(bindFixed(function(){if(this.searchFilter(this.searchText,logRow)){this.matchSet.push(logRow)
}else{removeClass(logRow,"matched")
}removeClass(logRow,"matching");
if(scrolledToBottom){scrollToBottom(this.panelNode)
}},this),100)
}},searchFilter:function(text,logRow){var count=this.panelNode.childNodes.length;
var searchRange=this.document.createRange();
searchRange.setStart(this.panelNode,0);
searchRange.setEnd(this.panelNode,count);
var startPt=this.document.createRange();
startPt.setStartBefore(logRow);
var endPt=this.document.createRange();
endPt.setStartAfter(logRow);
return finder.Find(text,searchRange,startPt,endPt)!=null
},observe:function(subject,topic,data){if(topic!="nsPref:changed"){return
}var prefDomain="Firebug.extension.";
var prefName=data.substr(prefDomain.length);
if(prefName=="console.logLimit"){this.updateMaxLimit()
}},updateMaxLimit:function(){var value=1000;
maxQueueRequests=value?value:maxQueueRequests
},showCommandLine:function(shouldShow){return;
if(shouldShow){collapse(Firebug.chrome.$("fbCommandBox"),false);
Firebug.CommandLine.setMultiLine(Firebug.largeCommandLine,Firebug.chrome)
}else{Firebug.CommandLine.setMultiLine(false,Firebug.chrome,Firebug.largeCommandLine);
collapse(Firebug.chrome.$("fbCommandBox"),true)
}},onScroll:function(event){this.wasScrolledToBottom=FBL.isScrolledToBottom(this.panelNode);
if(FBTrace.DBG_CONSOLE){FBTrace.sysout("console.onScroll ------------------ wasScrolledToBottom: "+this.wasScrolledToBottom+", wasScrolledToBottom: "+this.context.getName(),event)
}},onResize:function(event){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("console.onResize ------------------ wasScrolledToBottom: "+this.wasScrolledToBottom+", offsetHeight: "+this.panelNode.offsetHeight+", scrollTop: "+this.panelNode.scrollTop+", scrollHeight: "+this.panelNode.scrollHeight+", "+this.context.getName(),event)
}if(this.wasScrolledToBottom){scrollToBottom(this.panelNode)
}}});
function parseFormat(format){var parts=[];
if(format.length<=0){return parts
}var reg=/((^%|.%)(\d+)?(\.)([a-zA-Z]))|((^%|.%)([a-zA-Z]))/;
for(var m=reg.exec(format);
m;
m=reg.exec(format)){if(m[0].substr(0,2)=="%%"){parts.push(format.substr(0,m.index));
parts.push(m[0].substr(1))
}else{var type=m[8]?m[8]:m[5];
var precision=m[3]?parseInt(m[3]):(m[4]=="."?-1:0);
var rep=null;
switch(type){case"s":rep=FirebugReps.Text;
break;
case"f":case"i":case"d":rep=FirebugReps.Number;
break;
case"o":rep=null;
break
}parts.push(format.substr(0,m[0][0]=="%"?m.index:m.index+1));
parts.push({rep:rep,precision:precision,type:("%"+type)})
}format=format.substr(m.index+m[0].length)
}parts.push(format);
return parts
}var appendObject=Firebug.ConsolePanel.prototype.appendObject;
var appendFormatted=Firebug.ConsolePanel.prototype.appendFormatted;
var appendOpenGroup=Firebug.ConsolePanel.prototype.appendOpenGroup;
var appendCloseGroup=Firebug.ConsolePanel.prototype.appendCloseGroup;
Firebug.registerModule(Firebug.Console);
Firebug.registerPanel(Firebug.ConsolePanel)
}});
FBL.ns(function(){with(FBL){var frameCounters={};
var traceRecursion=0;
Firebug.Console.injector={install:function(context){var win=context.window;
var consoleHandler=new FirebugConsoleHandler(context,win);
var properties=["log","debug","info","warn","error","assert","dir","dirxml","group","groupCollapsed","groupEnd","time","timeEnd","count","trace","profile","profileEnd","clear","open","close"];
var Handler=function(name){var c=consoleHandler;
var f=consoleHandler[name];
return function(){return f.apply(c,arguments)
}
};
var installer=function(c){for(var i=0,l=properties.length;
i<l;
i++){var name=properties[i];
c[name]=new Handler(name);
c.firebuglite=Firebug.version
}};
var sandbox;
if(win.console){if(Env.Options.overrideConsole){sandbox=new win.Function("arguments.callee.install(window.console={})")
}else{return
}}else{try{sandbox=new win.Function("arguments.callee.install(window.console={})")
}catch(E){sandbox=new win.Function("arguments.callee.install(window.firebug={})")
}}sandbox.install=installer;
sandbox()
},isAttached:function(context,win){if(win.wrappedJSObject){var attached=(win.wrappedJSObject._getFirebugConsoleElement?true:false);
if(FBTrace.DBG_CONSOLE){FBTrace.sysout("Console.isAttached:"+attached+" to win.wrappedJSObject "+safeGetWindowLocation(win.wrappedJSObject))
}return attached
}else{if(FBTrace.DBG_CONSOLE){FBTrace.sysout("Console.isAttached? to win "+win.location+" fnc:"+win._getFirebugConsoleElement)
}return(win._getFirebugConsoleElement?true:false)
}},attachIfNeeded:function(context,win){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("Console.attachIfNeeded has win "+(win?((win.wrappedJSObject?"YES":"NO")+" wrappedJSObject"):"null"))
}if(this.isAttached(context,win)){return true
}if(FBTrace.DBG_CONSOLE){FBTrace.sysout("Console.attachIfNeeded found isAttached false ")
}this.attachConsoleInjector(context,win);
this.addConsoleListener(context,win);
Firebug.Console.clearReloadWarning(context);
var attached=this.isAttached(context,win);
if(attached){dispatch(Firebug.Console.fbListeners,"onConsoleInjected",[context,win])
}return attached
},attachConsoleInjector:function(context,win){var consoleInjection=this.getConsoleInjectionScript();
if(FBTrace.DBG_CONSOLE){FBTrace.sysout("attachConsoleInjector evaluating in "+win.location,consoleInjection)
}Firebug.CommandLine.evaluateInWebPage(consoleInjection,context,win);
if(FBTrace.DBG_CONSOLE){FBTrace.sysout("attachConsoleInjector evaluation completed for "+win.location)
}},getConsoleInjectionScript:function(){if(!this.consoleInjectionScript){var script="";
script+="window.__defineGetter__('console', function() {\n";
script+=" return (window._firebug ? window._firebug : window.loadFirebugConsole()); })\n\n";
script+="window.loadFirebugConsole = function() {\n";
script+="window._firebug =  new _FirebugConsole();";
if(FBTrace.DBG_CONSOLE){script+=" window.dump('loadFirebugConsole '+window.location+'\\n');\n"
}script+=" return window._firebug };\n";
var theFirebugConsoleScript=getResource("chrome://firebug/content/consoleInjected.js");
script+=theFirebugConsoleScript;
this.consoleInjectionScript=script
}return this.consoleInjectionScript
},forceConsoleCompilationInPage:function(context,win){if(!win){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("no win in forceConsoleCompilationInPage!")
}return
}var consoleForcer="window.loadFirebugConsole();";
if(context.stopped){Firebug.Console.injector.evaluateConsoleScript(context)
}else{Firebug.CommandLine.evaluateInWebPage(consoleForcer,context,win)
}if(FBTrace.DBG_CONSOLE){FBTrace.sysout("forceConsoleCompilationInPage "+win.location,consoleForcer)
}},evaluateConsoleScript:function(context){var scriptSource=this.getConsoleInjectionScript();
Firebug.Debugger.evaluate(scriptSource,context)
},addConsoleListener:function(context,win){if(!context.activeConsoleHandlers){context.activeConsoleHandlers=[]
}else{for(var i=0;
i<context.activeConsoleHandlers.length;
i++){if(context.activeConsoleHandlers[i].window==win){context.activeConsoleHandlers[i].detach();
if(FBTrace.DBG_CONSOLE){FBTrace.sysout("consoleInjector addConsoleListener removed handler("+context.activeConsoleHandlers[i].handler_name+") from _firebugConsole in : "+win.location+"\n")
}context.activeConsoleHandlers.splice(i,1)
}}}var element=Firebug.Console.getFirebugConsoleElement(context,win);
if(element){element.setAttribute("FirebugVersion",Firebug.version)
}else{return false
}var handler=new FirebugConsoleHandler(context,win);
handler.attachTo(element);
context.activeConsoleHandlers.push(handler);
if(FBTrace.DBG_CONSOLE){FBTrace.sysout("consoleInjector addConsoleListener attached handler("+handler.handler_name+") to _firebugConsole in : "+win.location+"\n")
}return true
},detachConsole:function(context,win){if(win&&win.document){var element=win.document.getElementById("_firebugConsole");
if(element){element.parentNode.removeChild(element)
}}}};
var total_handlers=0;
var FirebugConsoleHandler=function FirebugConsoleHandler(context,win){this.window=win;
this.attachTo=function(element){this.element=element;
this.boundHandler=bind(this.handleEvent,this);
this.element.addEventListener("firebugAppendConsole",this.boundHandler,true)
};
this.detach=function(){this.element.removeEventListener("firebugAppendConsole",this.boundHandler,true)
};
this.handler_name=++total_handlers;
this.handleEvent=function(event){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("FirebugConsoleHandler("+this.handler_name+") "+event.target.getAttribute("methodName")+", event",event)
}if(!Firebug.CommandLine.CommandHandler.handle(event,this,win)){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("FirebugConsoleHandler",this)
}var methodName=event.target.getAttribute("methodName");
Firebug.Console.log($STRF("console.MethodNotSupported",[methodName]))
}};
this.firebuglite=Firebug.version;
this.init=function(){var consoleElement=win.document.getElementById("_firebugConsole");
consoleElement.setAttribute("FirebugVersion",Firebug.version)
};
this.log=function(){logFormatted(arguments,"log")
};
this.debug=function(){logFormatted(arguments,"debug",true)
};
this.info=function(){logFormatted(arguments,"info",true)
};
this.warn=function(){logFormatted(arguments,"warn",true)
};
this.error=function(){logFormatted(arguments,"error",true)
};
this.exception=function(){logAssert("error",arguments)
};
this.assert=function(x){if(!x){var rest=[];
for(var i=1;
i<arguments.length;
i++){rest.push(arguments[i])
}logAssert("assert",rest)
}};
this.dir=function(o){Firebug.Console.log(o,context,"dir",Firebug.DOMPanel.DirTable)
};
this.dirxml=function(o){if(instanceOf(o,"Window")){o=o.document.documentElement
}else{if(instanceOf(o,"Document")){o=o.documentElement
}}Firebug.Console.log(o,context,"dirxml",Firebug.HTMLPanel.SoloElement)
};
this.group=function(){var sourceLink=null;
Firebug.Console.openGroup(arguments,null,"group",null,false,sourceLink)
};
this.groupEnd=function(){Firebug.Console.closeGroup(context)
};
this.groupCollapsed=function(){var sourceLink=getStackLink();
var row=Firebug.Console.openGroup(arguments,null,"group",null,true,sourceLink);
removeClass(row,"opened")
};
this.profile=function(title){logFormatted(["console.profile() not supported."],"warn",true)
};
this.profileEnd=function(){logFormatted(["console.profile() not supported."],"warn",true)
};
this.count=function(key){var frameId="0";
if(frameId){if(!frameCounters){frameCounters={}
}if(key!=undefined){frameId+=key
}var frameCounter=frameCounters[frameId];
if(!frameCounter){var logRow=logFormatted(["0"],null,true,true);
frameCounter={logRow:logRow,count:1};
frameCounters[frameId]=frameCounter
}else{++frameCounter.count
}var label=key==undefined?frameCounter.count:key+" "+frameCounter.count;
frameCounter.logRow.firstChild.firstChild.nodeValue=label
}};
this.trace=function(){var getFuncName=function getFuncName(f){if(f.getName instanceof Function){return f.getName()
}if(f.name){return f.name
}var name=f.toString().match(/function\s*([_$\w\d]*)/)[1];
return name||"anonymous"
};
var wasVisited=function(fn){for(var i=0,l=frames.length;
i<l;
i++){if(frames[i].fn==fn){return true
}}return false
};
traceRecursion++;
if(traceRecursion>1){traceRecursion--;
return
}var frames=[];
for(var fn=arguments.callee.caller.caller;
fn;
fn=fn.caller){if(wasVisited(fn)){break
}var args=[];
for(var i=0,l=fn.arguments.length;
i<l;
++i){args.push({value:fn.arguments[i]})
}frames.push({fn:fn,name:getFuncName(fn),args:args})
}try{(0)()
}catch(e){var result=e;
var stack=result.stack||result.stacktrace||"";
stack=stack.replace(/\n\r|\r\n/g,"\n");
var items=stack.split(/[\n\r]/);
if(FBL.isSafari){var reChromeStackItem=/^\s+at\s+(.*)((?:http|https|ftp|file):\/\/.*)$/;
var reChromeStackItemName=/\s*\($/;
var reChromeStackItemValue=/^(.+)\:(\d+\:\d+)\)?$/;
var framePos=0;
for(var i=4,length=items.length;
i<length;
i++,framePos++){var frame=frames[framePos];
var item=items[i];
var match=item.match(reChromeStackItem);
if(match){var name=match[1];
if(name){name=name.replace(reChromeStackItemName,"");
frame.name=name
}var value=match[2].match(reChromeStackItemValue);
if(value){frame.href=value[1];
frame.lineNo=value[2]
}}}}else{if(FBL.isFirefox){var reFirefoxStackItem=/^(.*)@(.*)$/;
var reFirefoxStackItemValue=/^(.+)\:(\d+)$/;
var framePos=0;
for(var i=2,length=items.length;
i<length;
i++,framePos++){var frame=frames[framePos]||{};
var item=items[i];
var match=item.match(reFirefoxStackItem);
if(match){var name=match[1];
var value=match[2].match(reFirefoxStackItemValue);
if(value){frame.href=value[1];
frame.lineNo=value[2]
}}}}}}Firebug.Console.log({frames:frames},context,"stackTrace",FirebugReps.StackTrace);
traceRecursion--
};
this.trace_ok=function(){var getFuncName=function getFuncName(f){if(f.getName instanceof Function){return f.getName()
}if(f.name){return f.name
}var name=f.toString().match(/function\s*([_$\w\d]*)/)[1];
return name||"anonymous"
};
var wasVisited=function(fn){for(var i=0,l=frames.length;
i<l;
i++){if(frames[i].fn==fn){return true
}}return false
};
var frames=[];
for(var fn=arguments.callee.caller;
fn;
fn=fn.caller){if(wasVisited(fn)){break
}var args=[];
for(var i=0,l=fn.arguments.length;
i<l;
++i){args.push({value:fn.arguments[i]})
}frames.push({fn:fn,name:getFuncName(fn),args:args})
}Firebug.Console.log({frames:frames},context,"stackTrace",FirebugReps.StackTrace)
};
this.clear=function(){Firebug.Console.clear(context)
};
this.time=function(name,reset){if(!name){return
}var time=new Date().getTime();
if(!this.timeCounters){this.timeCounters={}
}var key="KEY"+name.toString();
if(!reset&&this.timeCounters[key]){return
}this.timeCounters[key]=time
};
this.timeEnd=function(name){var time=new Date().getTime();
if(!this.timeCounters){return
}var key="KEY"+name.toString();
var timeCounter=this.timeCounters[key];
if(timeCounter){var diff=time-timeCounter;
var label=name+": "+diff+"ms";
this.info(label);
delete this.timeCounters[key]
}return diff
};
this.evaluated=function(result,context){if(FBTrace.DBG_CONSOLE){FBTrace.sysout("consoleInjector.FirebugConsoleHandler evalutated default called",result)
}Firebug.Console.log(result,context)
};
this.evaluateError=function(result,context){Firebug.Console.log(result,context,"errorMessage")
};
function logFormatted(args,className,linkToSource,noThrottle){var sourceLink=linkToSource?getStackLink():null;
return Firebug.Console.logFormatted(args,context,className,noThrottle,sourceLink)
}function logAssert(category,args){Firebug.Errors.increaseCount(context);
if(!args||!args.length||args.length==0){var msg=[FBL.$STR("Assertion")]
}else{var msg=args[0]
}if(Firebug.errorStackTrace){var trace=Firebug.errorStackTrace;
delete Firebug.errorStackTrace;
if(FBTrace.DBG_CONSOLE){FBTrace.sysout("logAssert trace from errorStackTrace",trace)
}}else{if(msg.stack){var trace=parseToStackTrace(msg.stack);
if(FBTrace.DBG_CONSOLE){FBTrace.sysout("logAssert trace from msg.stack",trace)
}}else{var trace=getJSDUserStack();
if(FBTrace.DBG_CONSOLE){FBTrace.sysout("logAssert trace from getJSDUserStack",trace)
}}}var errorObject=new FBL.ErrorMessage(msg,(msg.fileName?msg.fileName:win.location),(msg.lineNumber?msg.lineNumber:0),"",category,context,trace);
if(trace&&trace.frames&&trace.frames[0]){errorObject.correctWithStackTrace(trace)
}errorObject.resetSource();
var objects=errorObject;
if(args.length>1){objects=[errorObject];
for(var i=1;
i<args.length;
i++){objects.push(args[i])
}}var row=Firebug.Console.log(objects,context,"errorMessage",null,true);
row.scrollIntoView()
}function getComponentsStackDump(){var frame=Components.stack;
var userURL=win.location.href.toString();
if(FBTrace.DBG_CONSOLE){FBTrace.sysout("consoleInjector.getComponentsStackDump initial stack for userURL "+userURL,frame)
}while(frame&&FBL.isSystemURL(frame.filename)){frame=frame.caller
}if(frame){frame=frame.caller
}if(frame){frame=frame.caller
}if(FBTrace.DBG_CONSOLE){FBTrace.sysout("consoleInjector.getComponentsStackDump final stack for userURL "+userURL,frame)
}return frame
}function getStackLink(){return
}function getJSDUserStack(){var trace=FBL.getCurrentStackTrace(context);
var frames=trace?trace.frames:null;
if(frames&&(frames.length>0)){var oldest=frames.length-1;
for(var i=0;
i<frames.length;
i++){if(frames[oldest-i].href.indexOf("chrome:")==0){break
}var fn=frames[oldest-i].fn+"";
if(fn&&(fn.indexOf("_firebugEvalEvent")!=-1)){break
}}FBTrace.sysout("consoleInjector getJSDUserStack: "+frames.length+" oldest: "+oldest+" i: "+i+" i - oldest + 2: "+(i-oldest+2),trace);
trace.frames=trace.frames.slice(2-i);
return trace
}else{return"Firebug failed to get stack trace with any frames"
}}};
FBL.registerConsole=function(){var win=Env.browser.window;
Firebug.Console.injector.install(win)
};
registerConsole()
}});
FBL.ns(function(){with(FBL){var commandPrefix=">>>";
var reOpenBracket=/[\[\(\{]/;
var reCloseBracket=/[\]\)\}]/;
var commandHistory=[];
var commandPointer=-1;
var isAutoCompleting=null;
var autoCompletePrefix=null;
var autoCompleteExpr=null;
var autoCompleteBuffer=null;
var autoCompletePosition=null;
var fbCommandLine=null;
var fbLargeCommandLine=null;
var fbLargeCommandButtons=null;
var _completion={window:["console"],document:["getElementById","getElementsByTagName"]};
var _stack=function(command){Firebug.context.persistedState.commandHistory.push(command);
Firebug.context.persistedState.commandPointer=Firebug.context.persistedState.commandHistory.length
};
Firebug.CommandLine=extend(Firebug.Module,{element:null,isMultiLine:false,isActive:false,initialize:function(doc){this.clear=bind(this.clear,this);
this.enter=bind(this.enter,this);
this.onError=bind(this.onError,this);
this.onKeyDown=bind(this.onKeyDown,this);
this.onMultiLineKeyDown=bind(this.onMultiLineKeyDown,this);
addEvent(Firebug.browser.window,"error",this.onError);
addEvent(Firebug.chrome.window,"error",this.onError)
},shutdown:function(doc){this.deactivate();
removeEvent(Firebug.browser.window,"error",this.onError);
removeEvent(Firebug.chrome.window,"error",this.onError)
},activate:function(multiLine,hideToggleIcon,onRun){defineCommandLineAPI();
Firebug.context.persistedState.commandHistory=Firebug.context.persistedState.commandHistory||[];
Firebug.context.persistedState.commandPointer=Firebug.context.persistedState.commandPointer||-1;
if(this.isActive){if(this.isMultiLine==multiLine){return
}this.deactivate()
}fbCommandLine=$("fbCommandLine");
fbLargeCommandLine=$("fbLargeCommandLine");
fbLargeCommandButtons=$("fbLargeCommandButtons");
if(multiLine){onRun=onRun||this.enter;
this.isMultiLine=true;
this.element=fbLargeCommandLine;
addEvent(this.element,"keydown",this.onMultiLineKeyDown);
addEvent($("fbSmallCommandLineIcon"),"click",Firebug.chrome.hideLargeCommandLine);
this.runButton=new Button({element:$("fbCommand_btRun"),owner:Firebug.CommandLine,onClick:onRun});
this.runButton.initialize();
this.clearButton=new Button({element:$("fbCommand_btClear"),owner:Firebug.CommandLine,onClick:this.clear});
this.clearButton.initialize()
}else{this.isMultiLine=false;
this.element=fbCommandLine;
if(!fbCommandLine){return
}addEvent(this.element,"keydown",this.onKeyDown)
}if(isOpera){fixOperaTabKey(this.element)
}if(this.lastValue){this.element.value=this.lastValue
}this.isActive=true
},deactivate:function(){if(!this.isActive){return
}this.isActive=false;
this.lastValue=this.element.value;
if(this.isMultiLine){removeEvent(this.element,"keydown",this.onMultiLineKeyDown);
removeEvent($("fbSmallCommandLineIcon"),"click",Firebug.chrome.hideLargeCommandLine);
this.runButton.destroy();
this.clearButton.destroy()
}else{removeEvent(this.element,"keydown",this.onKeyDown)
}this.element=null;
delete this.element;
fbCommandLine=null;
fbLargeCommandLine=null;
fbLargeCommandButtons=null
},focus:function(){this.element.focus()
},blur:function(){this.element.blur()
},clear:function(){this.element.value=""
},evaluate:function(expr){var api="Firebug.CommandLine.API";
var result=Firebug.context.evaluate(expr,"window",api,Firebug.Console.error);
return result
},enter:function(){var command=this.element.value;
if(!command){return
}_stack(command);
Firebug.Console.log(commandPrefix+" "+stripNewLines(command),Firebug.browser,"command",FirebugReps.Text);
var result=this.evaluate(command);
Firebug.Console.log(result)
},prevCommand:function(){if(Firebug.context.persistedState.commandPointer>0&&Firebug.context.persistedState.commandHistory.length>0){this.element.value=Firebug.context.persistedState.commandHistory[--Firebug.context.persistedState.commandPointer]
}},nextCommand:function(){var element=this.element;
var limit=Firebug.context.persistedState.commandHistory.length-1;
var i=Firebug.context.persistedState.commandPointer;
if(i<limit){element.value=Firebug.context.persistedState.commandHistory[++Firebug.context.persistedState.commandPointer]
}else{if(i==limit){++Firebug.context.persistedState.commandPointer;
element.value=""
}}},autocomplete:function(reverse){var element=this.element;
var command=element.value;
var offset=getExpressionOffset(command);
var valBegin=offset?command.substr(0,offset):"";
var val=command.substr(offset);
var buffer,obj,objName,commandBegin,result,prefix;
if(!isAutoCompleting){var reObj=/(.*[^_$\w\d\.])?((?:[_$\w][_$\w\d]*\.)*)([_$\w][_$\w\d]*)?$/;
var r=reObj.exec(val);
if(r[1]||r[2]||r[3]){commandBegin=r[1]||"";
objName=r[2]||"";
prefix=r[3]||""
}else{if(val==""){commandBegin=objName=prefix=""
}else{return
}}isAutoCompleting=true;
if(objName==""){obj=window
}else{objName=objName.replace(/\.$/,"");
var n=objName.split(".");
var target=window,o;
for(var i=0,ni;
ni=n[i];
i++){if(o=target[ni]){target=o
}else{target=null;
break
}}obj=target
}if(obj){autoCompletePrefix=prefix;
autoCompleteExpr=valBegin+commandBegin+(objName?objName+".":"");
autoCompletePosition=-1;
buffer=autoCompleteBuffer=isIE?_completion[objName||"window"]||[]:[];
for(var p in obj){buffer.push(p)
}}}else{buffer=autoCompleteBuffer
}if(buffer){prefix=autoCompletePrefix;
var diff=reverse?-1:1;
for(var i=autoCompletePosition+diff,l=buffer.length,bi;
i>=0&&i<l;
i+=diff){bi=buffer[i];
if(bi.indexOf(prefix)==0){autoCompletePosition=i;
result=bi;
break
}}}if(result){element.value=autoCompleteExpr+result
}},setMultiLine:function(multiLine){if(multiLine==this.isMultiLine){return
}this.activate(multiLine)
},onError:function(msg,href,lineNo){href=href||"";
var lastSlash=href.lastIndexOf("/");
var fileName=lastSlash==-1?href:href.substr(lastSlash+1);
var html=['<span class="errorMessage">',msg,"</span>",'<div class="objectBox-sourceLink">',fileName," (line ",lineNo,")</div>"]
},onKeyDown:function(e){e=e||event;
var code=e.keyCode;
if(code!=9&&code!=16&&code!=17&&code!=18){isAutoCompleting=false
}if(code==13){this.enter();
this.clear()
}else{if(code==27){setTimeout(this.clear,0)
}else{if(code==38){this.prevCommand()
}else{if(code==40){this.nextCommand()
}else{if(code==9){this.autocomplete(e.shiftKey)
}else{return
}}}}}cancelEvent(e,true);
return false
},onMultiLineKeyDown:function(e){e=e||event;
var code=e.keyCode;
if(code==13&&e.ctrlKey){this.enter()
}}});
Firebug.registerModule(Firebug.CommandLine);
function getExpressionOffset(command){var bracketCount=0;
var start=command.length-1;
for(;
start>=0;
--start){var c=command[start];
if((c==","||c==";"||c==" ")&&!bracketCount){break
}if(reOpenBracket.test(c)){if(bracketCount){--bracketCount
}else{break
}}else{if(reCloseBracket.test(c)){++bracketCount
}}}return start+1
}var CommandLineAPI={$:function(id){return Firebug.browser.document.getElementById(id)
},$$:function(selector,context){context=context||Firebug.browser.document;
return Firebug.Selector?Firebug.Selector(selector,context):Firebug.Console.error("Firebug.Selector module not loaded.")
},$0:null,$1:null,dir:function(o){Firebug.Console.log(o,Firebug.context,"dir",Firebug.DOMPanel.DirTable)
},dirxml:function(o){if(instanceOf(o,"Window")){o=o.document.documentElement
}else{if(instanceOf(o,"Document")){o=o.documentElement
}}Firebug.Console.log(o,Firebug.context,"dirxml",Firebug.HTMLPanel.SoloElement)
}};
var defineCommandLineAPI=function defineCommandLineAPI(){Firebug.CommandLine.API={};
for(var m in CommandLineAPI){if(!Env.browser.window[m]){Firebug.CommandLine.API[m]=CommandLineAPI[m]
}}var stack=FirebugChrome.htmlSelectionStack;
if(stack){Firebug.CommandLine.API.$0=stack[0];
Firebug.CommandLine.API.$1=stack[1]
}}
}});
FBL.ns(function(){with(FBL){var ElementCache=Firebug.Lite.Cache.Element;
var cacheID=Firebug.Lite.Cache.ID;
var ignoreHTMLProps={sizcache:1,sizset:1};
if(Firebug.ignoreFirebugElements){ignoreHTMLProps[cacheID]=1
}Firebug.HTML=extend(Firebug.Module,{appendTreeNode:function(nodeArray,html){var reTrim=/^\s+|\s+$/g;
if(!nodeArray.length){nodeArray=[nodeArray]
}for(var n=0,node;
node=nodeArray[n];
n++){if(node.nodeType==1){if(Firebug.ignoreFirebugElements&&node.firebugIgnore){continue
}var uid=ElementCache(node);
var child=node.childNodes;
var childLength=child.length;
var nodeName=node.nodeName.toLowerCase();
var nodeVisible=isVisible(node);
var hasSingleTextChild=childLength==1&&node.firstChild.nodeType==3&&nodeName!="script"&&nodeName!="style";
var nodeControl=!hasSingleTextChild&&childLength>0?('<div class="nodeControl"></div>'):"";
if(isIE&&nodeControl){html.push(nodeControl)
}if(typeof uid!="undefined"){html.push('<div class="objectBox-element" ','id="',uid,'">',!isIE&&nodeControl?nodeControl:"","<span ",cacheID,'="',uid,'"  class="nodeBox',nodeVisible?"":" nodeHidden",'">&lt;<span class="nodeTag">',nodeName,"</span>")
}else{html.push('<div class="objectBox-element"><span class="nodeBox',nodeVisible?"":" nodeHidden",'">&lt;<span class="nodeTag">',nodeName,"</span>")
}for(var i=0;
i<node.attributes.length;
++i){var attr=node.attributes[i];
if(!attr.specified||isIE&&(browserVersion-0<9)&&typeof attr.nodeValue!="string"||Firebug.ignoreFirebugElements&&ignoreHTMLProps.hasOwnProperty(attr.nodeName)){continue
}var name=attr.nodeName.toLowerCase();
var value=name=="style"?formatStyles(node.style.cssText):attr.nodeValue;
html.push('&nbsp;<span class="nodeName">',name,'</span>=&quot;<span class="nodeValue">',escapeHTML(value),"</span>&quot;")
}if(hasSingleTextChild){var value=child[0].nodeValue.replace(reTrim,"");
if(value){html.push('&gt;<span class="nodeText">',escapeHTML(value),'</span>&lt;/<span class="nodeTag">',nodeName,"</span>&gt;</span></div>")
}else{html.push("/&gt;</span></div>")
}}else{if(childLength>0){html.push("&gt;</span></div>")
}else{html.push("/&gt;</span></div>")
}}}else{if(node.nodeType==3){if(node.parentNode&&(node.parentNode.nodeName.toLowerCase()=="script"||node.parentNode.nodeName.toLowerCase()=="style")){var value=node.nodeValue.replace(reTrim,"");
if(isIE){var src=value+"\n"
}else{var src="\n"+value+"\n"
}var match=src.match(/\n/g);
var num=match?match.length:0;
var s=[],sl=0;
for(var c=1;
c<num;
c++){s[sl++]='<div line="'+c+'">'+c+"</div>"
}html.push('<div class="lineNo">',s.join(""),'</div><pre class="sourceCode">',escapeHTML(src),"</pre>")
}else{var value=node.nodeValue.replace(reTrim,"");
if(value){html.push('<div class="nodeText">',escapeHTML(value),"</div>")
}}}}}},appendTreeChildren:function(treeNode){var doc=Firebug.chrome.document;
var uid=treeNode.id;
var parentNode=ElementCache.get(uid);
if(parentNode.childNodes.length==0){return
}var treeNext=treeNode.nextSibling;
var treeParent=treeNode.parentNode;
var control=isIE?treeNode.previousSibling:treeNode.firstChild;
control.className="nodeControl nodeMaximized";
var html=[];
var children=doc.createElement("div");
children.className="nodeChildren";
this.appendTreeNode(parentNode.childNodes,html);
children.innerHTML=html.join("");
treeParent.insertBefore(children,treeNext);
var closeElement=doc.createElement("div");
closeElement.className="objectBox-element";
closeElement.innerHTML='&lt;/<span class="nodeTag">'+parentNode.nodeName.toLowerCase()+"&gt;</span>";
treeParent.insertBefore(closeElement,treeNext)
},removeTreeChildren:function(treeNode){var children=treeNode.nextSibling;
var closeTag=children.nextSibling;
var control=isIE?treeNode.previousSibling:treeNode.firstChild;
control.className="nodeControl";
children.parentNode.removeChild(children);
closeTag.parentNode.removeChild(closeTag)
},isTreeNodeVisible:function(id){return $(id)
},select:function(el){var id=el&&ElementCache(el);
if(id){this.selectTreeNode(id)
}},selectTreeNode:function(id){id=""+id;
var node,stack=[];
while(id&&!this.isTreeNodeVisible(id)){stack.push(id);
var node=ElementCache.get(id).parentNode;
if(node){id=ElementCache(node)
}else{break
}}stack.push(id);
while(stack.length>0){id=stack.pop();
node=$(id);
if(stack.length>0&&ElementCache.get(id).childNodes.length>0){this.appendTreeChildren(node)
}}selectElement(node);
if(fbPanel1){fbPanel1.scrollTop=Math.round(node.offsetTop-fbPanel1.clientHeight/2)
}}});
Firebug.registerModule(Firebug.HTML);
function HTMLPanel(){}HTMLPanel.prototype=extend(Firebug.Panel,{name:"HTML",title:"HTML",options:{hasSidePanel:true,isPreRendered:!Firebug.flexChromeEnabled,innerHTMLSync:true},create:function(){Firebug.Panel.create.apply(this,arguments);
this.panelNode.style.padding="4px 3px 1px 15px";
this.panelNode.style.minWidth="500px";
if(Env.Options.enablePersistent||Firebug.chrome.type!="popup"){this.createUI()
}if(this.sidePanelBar&&!this.sidePanelBar.selectedPanel){this.sidePanelBar.selectPanel("css")
}},destroy:function(){selectedElement=null;
fbPanel1=null;
selectedSidePanelTS=null;
selectedSidePanelTimer=null;
Firebug.Panel.destroy.apply(this,arguments)
},createUI:function(){var rootNode=Firebug.browser.document.documentElement;
var html=[];
Firebug.HTML.appendTreeNode(rootNode,html);
this.panelNode.innerHTML=html.join("")
},initialize:function(){Firebug.Panel.initialize.apply(this,arguments);
addEvent(this.panelNode,"click",Firebug.HTML.onTreeClick);
fbPanel1=$("fbPanel1");
if(!selectedElement){Firebug.context.persistedState.selectedHTMLElementId=Firebug.context.persistedState.selectedHTMLElementId&&ElementCache.get(Firebug.context.persistedState.selectedHTMLElementId)?Firebug.context.persistedState.selectedHTMLElementId:ElementCache(Firebug.browser.document.body);
Firebug.HTML.selectTreeNode(Firebug.context.persistedState.selectedHTMLElementId)
}addEvent(fbPanel1,"mousemove",Firebug.HTML.onListMouseMove);
addEvent($("fbContent"),"mouseout",Firebug.HTML.onListMouseMove);
addEvent(Firebug.chrome.node,"mouseout",Firebug.HTML.onListMouseMove)
},shutdown:function(){removeEvent(fbPanel1,"mousemove",Firebug.HTML.onListMouseMove);
removeEvent($("fbContent"),"mouseout",Firebug.HTML.onListMouseMove);
removeEvent(Firebug.chrome.node,"mouseout",Firebug.HTML.onListMouseMove);
removeEvent(this.panelNode,"click",Firebug.HTML.onTreeClick);
fbPanel1=null;
Firebug.Panel.shutdown.apply(this,arguments)
},reattach:function(){if(Firebug.context.persistedState.selectedHTMLElementId){Firebug.HTML.selectTreeNode(Firebug.context.persistedState.selectedHTMLElementId)
}},updateSelection:function(object){var id=ElementCache(object);
if(id){Firebug.HTML.selectTreeNode(id)
}}});
Firebug.registerPanel(HTMLPanel);
var formatStyles=function(styles){return isIE?styles.replace(/([^\s]+)\s*:/g,function(m,g){return g.toLowerCase()+":"
}):styles
};
var selectedElement=null;
var fbPanel1=null;
var selectedSidePanelTS,selectedSidePanelTimer;
var selectElement=function selectElement(e){if(e!=selectedElement){if(selectedElement){selectedElement.className="objectBox-element"
}e.className=e.className+" selectedElement";
if(FBL.isFirefox){e.style.MozBorderRadius="2px"
}else{if(FBL.isSafari){e.style.WebkitBorderRadius="2px"
}}e.style.borderRadius="2px";
selectedElement=e;
Firebug.context.persistedState.selectedHTMLElementId=e.id;
var target=ElementCache.get(e.id);
var sidePanelBar=Firebug.chrome.getPanel("HTML").sidePanelBar;
var selectedSidePanel=sidePanelBar?sidePanelBar.selectedPanel:null;
var stack=FirebugChrome.htmlSelectionStack;
stack.unshift(target);
if(stack.length>2){stack.pop()
}var lazySelect=function(){selectedSidePanelTS=new Date().getTime();
if(selectedSidePanel){selectedSidePanel.select(target,true)
}};
if(selectedSidePanelTimer){clearTimeout(selectedSidePanelTimer);
selectedSidePanelTimer=null
}if(new Date().getTime()-selectedSidePanelTS>100){setTimeout(lazySelect,0)
}else{selectedSidePanelTimer=setTimeout(lazySelect,150)
}}};
Firebug.HTML.onTreeClick=function(e){e=e||event;
var targ;
if(e.target){targ=e.target
}else{if(e.srcElement){targ=e.srcElement
}}if(targ.nodeType==3){targ=targ.parentNode
}if(targ.className.indexOf("nodeControl")!=-1||targ.className=="nodeTag"){if(targ.className=="nodeTag"){var control=isIE?(targ.parentNode.previousSibling||targ):(targ.parentNode.previousSibling||targ);
selectElement(targ.parentNode.parentNode);
if(control.className.indexOf("nodeControl")==-1){return
}}else{control=targ
}FBL.cancelEvent(e);
var treeNode=isIE?control.nextSibling:control.parentNode;
if(control.className.indexOf(" nodeMaximized")!=-1){FBL.Firebug.HTML.removeTreeChildren(treeNode)
}else{FBL.Firebug.HTML.appendTreeChildren(treeNode)
}}else{if(targ.className=="nodeValue"||targ.className=="nodeName"){}}};
function onListMouseOut(e){e=e||event||window;
var targ;
if(e.target){targ=e.target
}else{if(e.srcElement){targ=e.srcElement
}}if(targ.nodeType==3){targ=targ.parentNode
}if(hasClass(targ,"fbPanel")){FBL.Firebug.Inspector.hideBoxModel();
hoverElement=null
}}var hoverElement=null;
var hoverElementTS=0;
Firebug.HTML.onListMouseMove=function onListMouseMove(e){try{e=e||event||window;
var targ;
if(e.target){targ=e.target
}else{if(e.srcElement){targ=e.srcElement
}}if(targ.nodeType==3){targ=targ.parentNode
}var found=false;
while(targ&&!found){if(!/\snodeBox\s|\sobjectBox-selector\s/.test(" "+targ.className+" ")){targ=targ.parentNode
}else{found=true
}}if(!targ){FBL.Firebug.Inspector.hideBoxModel();
hoverElement=null;
return
}if(typeof targ.attributes[cacheID]=="undefined"){return
}var uid=targ.attributes[cacheID];
if(!uid){return
}var el=ElementCache.get(uid.value);
var nodeName=el.nodeName.toLowerCase();
if(FBL.isIE&&" meta title script link ".indexOf(" "+nodeName+" ")!=-1){return
}if(!/\snodeBox\s|\sobjectBox-selector\s/.test(" "+targ.className+" ")){return
}if(el.id=="FirebugUI"||" html head body br script link iframe ".indexOf(" "+nodeName+" ")!=-1){FBL.Firebug.Inspector.hideBoxModel();
hoverElement=null;
return
}if((new Date().getTime()-hoverElementTS>40)&&hoverElement!=el){hoverElementTS=new Date().getTime();
hoverElement=el;
FBL.Firebug.Inspector.drawBoxModel(el)
}}catch(E){}};
Firebug.Reps={appendText:function(object,html){html.push(escapeHTML(objectToString(object)))
},appendNull:function(object,html){html.push('<span class="objectBox-null">',escapeHTML(objectToString(object)),"</span>")
},appendString:function(object,html){html.push('<span class="objectBox-string">&quot;',escapeHTML(objectToString(object)),"&quot;</span>")
},appendInteger:function(object,html){html.push('<span class="objectBox-number">',escapeHTML(objectToString(object)),"</span>")
},appendFloat:function(object,html){html.push('<span class="objectBox-number">',escapeHTML(objectToString(object)),"</span>")
},appendFunction:function(object,html){var reName=/function ?(.*?)\(/;
var m=reName.exec(objectToString(object));
var name=m&&m[1]?m[1]:"function";
html.push('<span class="objectBox-function">',escapeHTML(name),"()</span>")
},appendObject:function(object,html){try{if(object==undefined){this.appendNull("undefined",html)
}else{if(object==null){this.appendNull("null",html)
}else{if(typeof object=="string"){this.appendString(object,html)
}else{if(typeof object=="number"){this.appendInteger(object,html)
}else{if(typeof object=="boolean"){this.appendInteger(object,html)
}else{if(typeof object=="function"){this.appendFunction(object,html)
}else{if(object.nodeType==1){this.appendSelector(object,html)
}else{if(typeof object=="object"){if(typeof object.length!="undefined"){this.appendArray(object,html)
}else{this.appendObjectFormatted(object,html)
}}else{this.appendText(object,html)
}}}}}}}}}catch(exc){}},appendObjectFormatted:function(object,html){var text=objectToString(object);
var reObject=/\[object (.*?)\]/;
var m=reObject.exec(text);
html.push('<span class="objectBox-object">',m?m[1]:text,"</span>")
},appendSelector:function(object,html){var uid=ElementCache(object);
var uidString=uid?[cacheID,'="',uid,'"'].join(""):"";
html.push('<span class="objectBox-selector"',uidString,">");
html.push('<span class="selectorTag">',escapeHTML(object.nodeName.toLowerCase()),"</span>");
if(object.id){html.push('<span class="selectorId">#',escapeHTML(object.id),"</span>")
}if(object.className){html.push('<span class="selectorClass">.',escapeHTML(object.className),"</span>")
}html.push("</span>")
},appendNode:function(node,html){if(node.nodeType==1){var uid=ElementCache(node);
var uidString=uid?[cacheID,'="',uid,'"'].join(""):"";
html.push('<div class="objectBox-element"',uidString,'">',"<span ",cacheID,'="',uid,'" class="nodeBox">','&lt;<span class="nodeTag">',node.nodeName.toLowerCase(),"</span>");
for(var i=0;
i<node.attributes.length;
++i){var attr=node.attributes[i];
if(!attr.specified||attr.nodeName==cacheID){continue
}var name=attr.nodeName.toLowerCase();
var value=name=="style"?node.style.cssText:attr.nodeValue;
html.push('&nbsp;<span class="nodeName">',name,'</span>=&quot;<span class="nodeValue">',escapeHTML(value),"</span>&quot;")
}if(node.firstChild){html.push('&gt;</div><div class="nodeChildren">');
for(var child=node.firstChild;
child;
child=child.nextSibling){this.appendNode(child,html)
}html.push('</div><div class="objectBox-element">&lt;/<span class="nodeTag">',node.nodeName.toLowerCase(),"&gt;</span></span></div>")
}else{html.push("/&gt;</span></div>")
}}else{if(node.nodeType==3){var value=trim(node.nodeValue);
if(value){html.push('<div class="nodeText">',escapeHTML(value),"</div>")
}}}},appendArray:function(object,html){html.push('<span class="objectBox-array"><b>[</b> ');
for(var i=0,l=object.length,obj;
i<l;
++i){this.appendObject(object[i],html);
if(i<l-1){html.push(", ")
}}html.push(" <b>]</b></span>")
}}
}});
FBL.ns(function(){with(FBL){var maxWidth=100,maxHeight=80;
var infoTipMargin=10;
var infoTipWindowPadding=25;
Firebug.InfoTip=extend(Firebug.Module,{dispatchName:"infoTip",tags:domplate({infoTipTag:DIV({"class":"infoTip"}),colorTag:DIV({style:"background: $rgbValue; width: 100px; height: 40px"},"&nbsp;"),imgTag:DIV({"class":"infoTipImageBox infoTipLoading"},IMG({"class":"infoTipImage",src:"$urlValue",repeat:"$repeat",onload:"$onLoadImage"}),IMG({"class":"infoTipBgImage",collapsed:true,src:"blank.gif"}),DIV({"class":"infoTipCaption"})),onLoadImage:function(event){var img=event.currentTarget||event.srcElement;
var innerBox=img.parentNode;
var caption=getElementByClass(innerBox,"infoTipCaption");
var bgImg=getElementByClass(innerBox,"infoTipBgImage");
if(!bgImg){return
}if(isIE){removeClass(innerBox,"infoTipLoading")
}var updateInfoTip=function(){var w=img.naturalWidth||img.width||10,h=img.naturalHeight||img.height||10;
var repeat=img.getAttribute("repeat");
if(repeat=="repeat-x"||(w==1&&h>1)){collapse(img,true);
collapse(bgImg,false);
bgImg.style.background="url("+img.src+") repeat-x";
bgImg.style.width=maxWidth+"px";
if(h>maxHeight){bgImg.style.height=maxHeight+"px"
}else{bgImg.style.height=h+"px"
}}else{if(repeat=="repeat-y"||(h==1&&w>1)){collapse(img,true);
collapse(bgImg,false);
bgImg.style.background="url("+img.src+") repeat-y";
bgImg.style.height=maxHeight+"px";
if(w>maxWidth){bgImg.style.width=maxWidth+"px"
}else{bgImg.style.width=w+"px"
}}else{if(repeat=="repeat"||(w==1&&h==1)){collapse(img,true);
collapse(bgImg,false);
bgImg.style.background="url("+img.src+") repeat";
bgImg.style.width=maxWidth+"px";
bgImg.style.height=maxHeight+"px"
}else{if(w>maxWidth||h>maxHeight){if(w>h){img.style.width=maxWidth+"px";
img.style.height=Math.round((h/w)*maxWidth)+"px"
}else{img.style.width=Math.round((w/h)*maxHeight)+"px";
img.style.height=maxHeight+"px"
}}}}}caption.innerHTML=$STRF(w+" x "+h)
};
if(isIE){setTimeout(updateInfoTip,0)
}else{updateInfoTip();
removeClass(innerBox,"infoTipLoading")
}}}),initializeBrowser:function(browser){browser.onInfoTipMouseOut=bind(this.onMouseOut,this,browser);
browser.onInfoTipMouseMove=bind(this.onMouseMove,this,browser);
var doc=browser.document;
if(!doc){return
}addEvent(doc,"mouseover",browser.onInfoTipMouseMove);
addEvent(doc,"mouseout",browser.onInfoTipMouseOut);
addEvent(doc,"mousemove",browser.onInfoTipMouseMove);
return browser.infoTip=this.tags.infoTipTag.append({},getBody(doc))
},uninitializeBrowser:function(browser){if(browser.infoTip){var doc=browser.document;
removeEvent(doc,"mouseover",browser.onInfoTipMouseMove);
removeEvent(doc,"mouseout",browser.onInfoTipMouseOut);
removeEvent(doc,"mousemove",browser.onInfoTipMouseMove);
browser.infoTip.parentNode.removeChild(browser.infoTip);
delete browser.infoTip;
delete browser.onInfoTipMouseMove
}},showInfoTip:function(infoTip,panel,target,x,y,rangeParent,rangeOffset){if(!Firebug.showInfoTips){return
}var scrollParent=getOverflowParent(target);
var scrollX=x+(scrollParent?scrollParent.scrollLeft:0);
if(panel.showInfoTip(infoTip,target,scrollX,y,rangeParent,rangeOffset)){var htmlElt=infoTip.ownerDocument.documentElement;
var panelWidth=htmlElt.clientWidth;
var panelHeight=htmlElt.clientHeight;
if(x+infoTip.offsetWidth+infoTipMargin>panelWidth){infoTip.style.left=Math.max(0,panelWidth-(infoTip.offsetWidth+infoTipMargin))+"px";
infoTip.style.right="auto"
}else{infoTip.style.left=(x+infoTipMargin)+"px";
infoTip.style.right="auto"
}if(y+infoTip.offsetHeight+infoTipMargin>panelHeight){infoTip.style.top=Math.max(0,panelHeight-(infoTip.offsetHeight+infoTipMargin))+"px";
infoTip.style.bottom="auto"
}else{infoTip.style.top=(y+infoTipMargin)+"px";
infoTip.style.bottom="auto"
}if(FBTrace.DBG_INFOTIP){FBTrace.sysout("infotip.showInfoTip; top: "+infoTip.style.top+", left: "+infoTip.style.left+", bottom: "+infoTip.style.bottom+", right:"+infoTip.style.right+", offsetHeight: "+infoTip.offsetHeight+", offsetWidth: "+infoTip.offsetWidth+", x: "+x+", panelWidth: "+panelWidth+", y: "+y+", panelHeight: "+panelHeight)
}infoTip.setAttribute("active","true")
}else{this.hideInfoTip(infoTip)
}},hideInfoTip:function(infoTip){if(infoTip){infoTip.removeAttribute("active")
}},onMouseOut:function(event,browser){if(!event.relatedTarget){this.hideInfoTip(browser.infoTip)
}},onMouseMove:function(event,browser){if(getAncestorByClass(event.target,"infoTip")){return
}if(browser.currentPanel){var x=event.clientX,y=event.clientY,target=event.target||event.srcElement;
this.showInfoTip(browser.infoTip,browser.currentPanel,target,x,y,event.rangeParent,event.rangeOffset)
}else{this.hideInfoTip(browser.infoTip)
}},populateColorInfoTip:function(infoTip,color){this.tags.colorTag.replace({rgbValue:color},infoTip);
return true
},populateImageInfoTip:function(infoTip,url,repeat){if(!repeat){repeat="no-repeat"
}this.tags.imgTag.replace({urlValue:url,repeat:repeat},infoTip);
return true
},disable:function(){},showPanel:function(browser,panel){if(panel){var infoTip=panel.panelBrowser.infoTip;
if(!infoTip){infoTip=this.initializeBrowser(panel.panelBrowser)
}this.hideInfoTip(infoTip)
}},showSidePanel:function(browser,panel){this.showPanel(browser,panel)
}});
Firebug.registerModule(Firebug.InfoTip)
}});
FBL.ns(function(){with(FBL){var CssParser=null;
CssParser=(function(){function rule(start,body_start,end){return{start:start||0,body_start:body_start||0,end:end||0,line:-1,selector:null,parent:null,children:[],addChild:function(start,body_start,end){var r=rule(start,body_start,end);
r.parent=this;
this.children.push(r);
return r
},lastChild:function(){return this.children[this.children.length-1]
}}
}function removeAll(str,re){var m;
while(m=str.match(re)){str=str.substring(m[0].length)
}return str
}function trim(str){return str.replace(/^\s+|\s+$/g,"")
}function normalizeSelector(selector){selector=selector.replace(/[\n\r]/g," ");
selector=trim(selector);
selector=selector.replace(/\s*,\s*/g,",");
return selector
}function preprocessRules(text,rule_node){for(var i=0,il=rule_node.children.length;
i<il;
i++){var r=rule_node.children[i],rule_start=text.substring(r.start,r.body_start),cur_len=rule_start.length;
rule_start=rule_start.replace(/[\n\r]/g," ");
rule_start=removeAll(rule_start,/^\s*\/\*.*?\*\/[\s\t]*/);
rule_start=rule_start.replace(/^[\s\t]+/,"");
r.start+=(cur_len-rule_start.length);
r.selector=normalizeSelector(rule_start)
}return rule_node
}function saveLineIndexes(text){var result=[0],i=0,il=text.length,ch,ch2;
while(i<il){ch=text.charAt(i);
if(ch=="\n"||ch=="\r"){if(ch=="\r"&&i<il-1&&text.charAt(i+1)=="\n"){i++
}result.push(i+1)
}i++
}return result
}function saveLineNumbers(text,rule_node,line_indexes,startLine){preprocessRules(text,rule_node);
startLine=startLine||0;
if(!line_indexes){var line_indexes=saveLineIndexes(text)
}for(var i=0,il=rule_node.children.length;
i<il;
i++){var r=rule_node.children[i];
r.line=line_indexes.length+startLine;
for(var j=0,jl=line_indexes.length-1;
j<jl;
j++){var line_ix=line_indexes[j];
if(r.start>=line_indexes[j]&&r.start<line_indexes[j+1]){r.line=j+1+startLine;
break
}}saveLineNumbers(text,r,line_indexes)
}return rule_node
}return{read:function(text,startLine){var rule_start=[],rule_body_start=[],rules=[],in_comment=0,root=rule(),cur_parent=root,last_rule=null,stack=[],ch,ch2;
stack.last=function(){return this[this.length-1]
};
function hasStr(pos,substr){return text.substr(pos,substr.length)==substr
}for(var i=0,il=text.length;
i<il;
i++){ch=text.charAt(i);
ch2=i<il-1?text.charAt(i+1):"";
if(!rule_start.length){rule_start.push(i)
}switch(ch){case"@":if(!in_comment){if(hasStr(i,"@import")){var m=text.substr(i).match(/^@import\s*url\((['"])?.+?\1?\)\;?/);
if(m){cur_parent.addChild(i,i+7,i+m[0].length);
i+=m[0].length;
rule_start.pop()
}break
}}case"/":if(!in_comment&&ch2=="*"){in_comment++
}break;
case"*":if(ch2=="/"){in_comment--
}break;
case"{":if(!in_comment){rule_body_start.push(i);
cur_parent=cur_parent.addChild(rule_start.pop());
stack.push(cur_parent)
}break;
case"}":if(!in_comment){var last_rule=stack.pop();
rule_start.pop();
last_rule.body_start=rule_body_start.pop();
last_rule.end=i;
cur_parent=last_rule.parent||root
}break
}}return saveLineNumbers(text,root,null,startLine)
},normalizeSelector:normalizeSelector,findBySelector:function(rule_node,selector,source){var selector=normalizeSelector(selector),result=[];
if(rule_node){for(var i=0,il=rule_node.children.length;
i<il;
i++){var r=rule_node.children[i];
if(r.selector==selector){result.push(r)
}}}if(result.length){return result
}else{return null
}}}
})();
FBL.CssParser=CssParser
}});
FBL.ns(function(){with(FBL){var CssAnalyzer={};
var CSSRuleMap={};
var ElementCSSRulesMap={};
var internalStyleSheetIndex=-1;
var reSelectorTag=/(^|\s)(?:\w+)/g;
var reSelectorClass=/\.[\w\d_-]+/g;
var reSelectorId=/#[\w\d_-]+/g;
var globalCSSRuleIndex;
var processAllStyleSheetsTimeout=null;
var externalStyleSheetURLs=[];
var ElementCache=Firebug.Lite.Cache.Element;
var StyleSheetCache=Firebug.Lite.Cache.StyleSheet;
CssAnalyzer.externalStyleSheetWarning=domplate(Firebug.Rep,{tag:DIV({"class":"warning focusRow",style:"font-weight:normal;",role:"listitem"},SPAN("$object|STR"),A({href:"$href",target:"_blank"},"$link|STR"))});
CssAnalyzer.processAllStyleSheets=function(doc,styleSheetIterator){try{processAllStyleSheets(doc,styleSheetIterator)
}catch(e){FBTrace.sysout("CssAnalyzer.processAllStyleSheets fails: ",e)
}};
CssAnalyzer.getElementCSSRules=function(element){try{return getElementCSSRules(element)
}catch(e){FBTrace.sysout("CssAnalyzer.getElementCSSRules fails: ",e)
}};
CssAnalyzer.getRuleData=function(ruleId){return CSSRuleMap[ruleId]
};
CssAnalyzer.getRuleLine=function(){};
CssAnalyzer.hasExternalStyleSheet=function(){return externalStyleSheetURLs.length>0
};
CssAnalyzer.parseStyleSheet=function(href){var sourceData=extractSourceData(href);
var parsedObj=CssParser.read(sourceData.source,sourceData.startLine);
var parsedRules=parsedObj.children;
for(var i=0;
i<parsedRules.length;
){if(parsedRules[i].selector.indexOf("@")!=-1){parsedRules.splice(i,1)
}else{i++
}}return parsedRules
};
var processAllStyleSheets=function(doc,styleSheetIterator){styleSheetIterator=styleSheetIterator||processStyleSheet;
globalCSSRuleIndex=-1;
var styleSheets=doc.styleSheets;
var importedStyleSheets=[];
if(FBTrace.DBG_CSS){var start=new Date().getTime()
}for(var i=0,length=styleSheets.length;
i<length;
i++){try{var styleSheet=styleSheets[i];
if("firebugIgnore" in styleSheet){continue
}var rules=isIE?styleSheet.rules:styleSheet.cssRules;
rules.length
}catch(e){externalStyleSheetURLs.push(styleSheet.href);
styleSheet.restricted=true;
var ssid=StyleSheetCache(styleSheet)
}styleSheetIterator(doc,styleSheet);
var importedStyleSheet,importedRules;
if(isIE){var imports=styleSheet.imports;
for(var j=0,importsLength=imports.length;
j<importsLength;
j++){try{importedStyleSheet=imports[j];
importedRules=importedStyleSheet.rules;
importedRules.length
}catch(e){externalStyleSheetURLs.push(styleSheet.href);
importedStyleSheet.restricted=true;
var ssid=StyleSheetCache(importedStyleSheet)
}styleSheetIterator(doc,importedStyleSheet)
}}else{if(rules){for(var j=0,rulesLength=rules.length;
j<rulesLength;
j++){try{var rule=rules[j];
importedStyleSheet=rule.styleSheet;
if(importedStyleSheet){importedRules=importedStyleSheet.cssRules;
importedRules.length
}else{break
}}catch(e){externalStyleSheetURLs.push(styleSheet.href);
importedStyleSheet.restricted=true;
var ssid=StyleSheetCache(importedStyleSheet)
}styleSheetIterator(doc,importedStyleSheet)
}}}}if(FBTrace.DBG_CSS){FBTrace.sysout("FBL.processAllStyleSheets","all stylesheet rules processed in "+(new Date().getTime()-start)+"ms")
}};
var processStyleSheet=function(doc,styleSheet){if(styleSheet.restricted){return
}var rules=isIE?styleSheet.rules:styleSheet.cssRules;
var ssid=StyleSheetCache(styleSheet);
var href=styleSheet.href;
var shouldParseCSS=typeof CssParser!="undefined"&&!Firebug.disableResourceFetching;
if(shouldParseCSS){try{var parsedRules=CssAnalyzer.parseStyleSheet(href)
}catch(e){if(FBTrace.DBG_ERRORS){FBTrace.sysout("processStyleSheet FAILS",e.message||e)
}shouldParseCSS=false
}finally{var parsedRulesIndex=0;
var dontSupportGroupedRules=isIE&&browserVersion<9;
var group=[];
var groupItem
}}for(var i=0,length=rules.length;
i<length;
i++){var rid=ssid+":"+i;
var rule=rules[i];
var selector=rule.selectorText||"";
var lineNo=null;
if(!selector||selector.indexOf("@")!=-1){continue
}if(isIE){selector=selector.replace(reSelectorTag,function(s){return s.toLowerCase()
})
}if(shouldParseCSS){var parsedRule=parsedRules[parsedRulesIndex];
var parsedSelector=parsedRule.selector;
if(dontSupportGroupedRules&&parsedSelector.indexOf(",")!=-1&&group.length==0){group=parsedSelector.split(",")
}if(dontSupportGroupedRules&&group.length>0){groupItem=group.shift();
if(CssParser.normalizeSelector(selector)==groupItem){lineNo=parsedRule.line
}if(group.length==0){parsedRulesIndex++
}}else{if(CssParser.normalizeSelector(selector)==parsedRule.selector){lineNo=parsedRule.line;
parsedRulesIndex++
}}}CSSRuleMap[rid]={styleSheetId:ssid,styleSheetIndex:i,order:++globalCSSRuleIndex,specificity:selector&&selector.indexOf(",")==-1?getCSSRuleSpecificity(selector):0,rule:rule,lineNo:lineNo,selector:selector,cssText:rule.style?rule.style.cssText:rule.cssText?rule.cssText:""};
var elements=Firebug.Selector(selector,doc);
for(var j=0,elementsLength=elements.length;
j<elementsLength;
j++){var element=elements[j];
var eid=ElementCache(element);
if(!ElementCSSRulesMap[eid]){ElementCSSRulesMap[eid]=[]
}ElementCSSRulesMap[eid].push(rid)
}}};
var loadExternalStylesheet=function(doc,styleSheetIterator,styleSheet){var url=styleSheet.href;
styleSheet.firebugIgnore=true;
var source=Firebug.Lite.Proxy.load(url);
source=source.replace(/url\(([^\)]+)\)/g,function(a,name){var hasDomain=/\w+:\/\/./.test(name);
if(!hasDomain){name=name.replace(/^(["'])(.+)\1$/,"$2");
var first=name.charAt(0);
if(first=="/"){var m=/^([^:]+:\/{1,3}[^\/]+)/.exec(url);
return m?"url("+m[1]+name+")":"url("+name+")"
}else{var path=url.replace(/[^\/]+\.[\w\d]+(\?.+|#.+)?$/g,"");
path=path+name;
var reBack=/[^\/]+\/\.\.\//;
while(reBack.test(path)){path=path.replace(reBack,"")
}return"url("+path+")"
}}return a
});
var oldStyle=styleSheet.ownerNode;
if(!oldStyle){return
}if(!oldStyle.parentNode){return
}var style=createGlobalElement("style");
style.setAttribute("charset","utf-8");
style.setAttribute("type","text/css");
style.innerHTML=source;
oldStyle.parentNode.insertBefore(style,oldStyle.nextSibling);
oldStyle.parentNode.removeChild(oldStyle);
doc.styleSheets[doc.styleSheets.length-1].externalURL=url;
console.log(url,"call "+externalStyleSheetURLs.length,source);
externalStyleSheetURLs.pop();
if(processAllStyleSheetsTimeout){clearTimeout(processAllStyleSheetsTimeout)
}processAllStyleSheetsTimeout=setTimeout(function(){console.log("processing");
FBL.processAllStyleSheets(doc,styleSheetIterator);
processAllStyleSheetsTimeout=null
},200)
};
var getElementCSSRules=function(element){var eid=ElementCache(element);
var rules=ElementCSSRulesMap[eid];
if(!rules){return
}var arr=[element];
var Selector=Firebug.Selector;
var ruleId,rule;
for(var i=0,length=rules.length;
i<length;
i++){ruleId=rules[i];
rule=CSSRuleMap[ruleId];
if(rule.selector.indexOf(",")!=-1){var selectors=rule.selector.split(",");
var maxSpecificity=-1;
var sel,spec,mostSpecificSelector;
for(var j,len=selectors.length;
j<len;
j++){sel=selectors[j];
if(Selector.matches(sel,arr).length==1){spec=getCSSRuleSpecificity(sel);
if(spec>maxSpecificity){maxSpecificity=spec;
mostSpecificSelector=sel
}}}rule.specificity=maxSpecificity
}}rules.sort(sortElementRules);
return rules
};
var sortElementRules=function(a,b){var ruleA=CSSRuleMap[a];
var ruleB=CSSRuleMap[b];
var specificityA=ruleA.specificity;
var specificityB=ruleB.specificity;
if(specificityA>specificityB){return 1
}else{if(specificityA<specificityB){return -1
}else{return ruleA.order>ruleB.order?1:-1
}}};
var solveRulesTied=function(a,b){var ruleA=CSSRuleMap[a];
var ruleB=CSSRuleMap[b];
if(ruleA.specificity==ruleB.specificity){return ruleA.order>ruleB.order?1:-1
}return null
};
var getCSSRuleSpecificity=function(selector){var match=selector.match(reSelectorTag);
var tagCount=match?match.length:0;
match=selector.match(reSelectorClass);
var classCount=match?match.length:0;
match=selector.match(reSelectorId);
var idCount=match?match.length:0;
return tagCount+10*classCount+100*idCount
};
var extractSourceData=function(href){var sourceData={source:null,startLine:0};
if(href){sourceData.source=Firebug.Lite.Proxy.load(href)
}else{var index=0;
var ssIndex=++internalStyleSheetIndex;
var reStyleTag=/\<\s*style.*\>/gi;
var reEndStyleTag=/\<\/\s*style.*\>/gi;
var source=Firebug.Lite.Proxy.load(Env.browser.location.href);
source=source.replace(/\n\r|\r\n/g,"\n");
var startLine=0;
do{var matchStyleTag=source.match(reStyleTag);
var i0=source.indexOf(matchStyleTag[0])+matchStyleTag[0].length;
for(var i=0;
i<i0;
i++){if(source.charAt(i)=="\n"){startLine++
}}source=source.substr(i0);
index++
}while(index<=ssIndex);
var matchEndStyleTag=source.match(reEndStyleTag);
var i1=source.indexOf(matchEndStyleTag[0]);
var extractedSource=source.substr(0,i1);
sourceData.source=extractedSource;
sourceData.startLine=startLine
}return sourceData
};
FBL.CssAnalyzer=CssAnalyzer
}});
(function(){this.getElementXPath=function(element){try{if(element&&element.id){return'//*[@id="'+element.id+'"]'
}else{return this.getElementTreeXPath(element)
}}catch(E){}};
this.getElementTreeXPath=function(element){var paths=[];
for(;
element&&element.nodeType==1;
element=element.parentNode){var index=0;
var nodeName=element.nodeName;
for(var sibling=element.previousSibling;
sibling;
sibling=sibling.previousSibling){if(sibling.nodeType!=1){continue
}if(sibling.nodeName==nodeName){++index
}}var tagName=element.nodeName.toLowerCase();
var pathIndex=(index?"["+(index+1)+"]":"");
paths.splice(0,0,tagName+pathIndex)
}return paths.length?"/"+paths.join("/"):null
};
this.getElementsByXPath=function(doc,xpath){var nodes=[];
try{var result=doc.evaluate(xpath,doc,null,XPathResult.ANY_TYPE,null);
for(var item=result.iterateNext();
item;
item=result.iterateNext()){nodes.push(item)
}}catch(exc){}return nodes
};
this.getRuleMatchingElements=function(rule,doc){var css=rule.selectorText;
var xpath=this.cssToXPath(css);
return this.getElementsByXPath(doc,xpath)
}
}).call(FBL);
FBL.ns(function(){with(FBL){var toCamelCase=function toCamelCase(s){return s.replace(reSelectorCase,toCamelCaseReplaceFn)
};
var toSelectorCase=function toSelectorCase(s){return s.replace(reCamelCase,"-$1").toLowerCase()
};
var reCamelCase=/([A-Z])/g;
var reSelectorCase=/\-(.)/g;
var toCamelCaseReplaceFn=function toCamelCaseReplaceFn(m,g){return g.toUpperCase()
};
var ElementCache=Firebug.Lite.Cache.Element;
var StyleSheetCache=Firebug.Lite.Cache.StyleSheet;
Firebug.SourceBoxPanel=Firebug.Panel;
var reSelectorTag=/(^|\s)(?:\w+)/g;
var domUtils=null;
var textContent=isIE?"innerText":"textContent";
var CSSDomplateBase={isEditable:function(rule){return !rule.isSystemSheet
},isSelectorEditable:function(rule){return rule.isSelectorEditable&&this.isEditable(rule)
}};
var CSSPropTag=domplate(CSSDomplateBase,{tag:DIV({"class":"cssProp focusRow",$disabledStyle:"$prop.disabled",$editGroup:"$rule|isEditable",$cssOverridden:"$prop.overridden",role:"option"},A({"class":"cssPropDisable"},"&nbsp;&nbsp;"),SPAN({"class":"cssPropName",$editable:"$rule|isEditable"},"$prop.name"),SPAN({"class":"cssColon"},":"),SPAN({"class":"cssPropValue",$editable:"$rule|isEditable"},"$prop.value$prop.important"),SPAN({"class":"cssSemi"},";"))});
var CSSRuleTag=TAG("$rule.tag",{rule:"$rule"});
var CSSImportRuleTag=domplate({tag:DIV({"class":"cssRule insertInto focusRow importRule",_repObject:"$rule.rule"},"@import &quot;",A({"class":"objectLink",_repObject:"$rule.rule.styleSheet"},"$rule.rule.href"),"&quot;;")});
var CSSStyleRuleTag=domplate(CSSDomplateBase,{tag:DIV({"class":"cssRule insertInto",$cssEditableRule:"$rule|isEditable",$editGroup:"$rule|isSelectorEditable",_repObject:"$rule.rule",ruleId:"$rule.id",role:"presentation"},DIV({"class":"cssHead focusRow",role:"listitem"},SPAN({"class":"cssSelector",$editable:"$rule|isSelectorEditable"},"$rule.selector")," {"),DIV({role:"group"},DIV({"class":"cssPropertyListBox",role:"listbox"},FOR("prop","$rule.props",TAG(CSSPropTag.tag,{rule:"$rule",prop:"$prop"})))),DIV({"class":"editable insertBefore",role:"presentation"},"}"))});
var reSplitCSS=/(url\("?[^"\)]+?"?\))|(rgb\(.*?\))|(#[\dA-Fa-f]+)|(-?\d+(\.\d+)?(%|[a-z]{1,2})?)|([^,\s]+)|"(.*?)"/;
var reURL=/url\("?([^"\)]+)?"?\)/;
var reRepeat=/no-repeat|repeat-x|repeat-y|repeat/;
var sothinkInstalled=false;
var styleGroups={text:["font-family","font-size","font-weight","font-style","color","text-transform","text-decoration","letter-spacing","word-spacing","line-height","text-align","vertical-align","direction","column-count","column-gap","column-width"],background:["background-color","background-image","background-repeat","background-position","background-attachment","opacity"],box:["width","height","top","right","bottom","left","margin-top","margin-right","margin-bottom","margin-left","padding-top","padding-right","padding-bottom","padding-left","border-top-width","border-right-width","border-bottom-width","border-left-width","border-top-color","border-right-color","border-bottom-color","border-left-color","border-top-style","border-right-style","border-bottom-style","border-left-style","-moz-border-top-radius","-moz-border-right-radius","-moz-border-bottom-radius","-moz-border-left-radius","outline-top-width","outline-right-width","outline-bottom-width","outline-left-width","outline-top-color","outline-right-color","outline-bottom-color","outline-left-color","outline-top-style","outline-right-style","outline-bottom-style","outline-left-style"],layout:["position","display","visibility","z-index","overflow-x","overflow-y","overflow-clip","white-space","clip","float","clear","-moz-box-sizing"],other:["cursor","list-style-image","list-style-position","list-style-type","marker-offset","user-focus","user-select","user-modify","user-input"]};
var styleGroupTitles={text:"Text",background:"Background",box:"Box Model",layout:"Layout",other:"Other"};
Firebug.CSSModule=extend(Firebug.Module,{freeEdit:function(styleSheet,value){if(!styleSheet.editStyleSheet){var ownerNode=getStyleSheetOwnerNode(styleSheet);
styleSheet.disabled=true;
var url=CCSV("@mozilla.org/network/standard-url;1",Components.interfaces.nsIURL);
url.spec=styleSheet.href;
var editStyleSheet=ownerNode.ownerDocument.createElementNS("http://www.w3.org/1999/xhtml","style");
unwrapObject(editStyleSheet).firebugIgnore=true;
editStyleSheet.setAttribute("type","text/css");
editStyleSheet.setAttributeNS("http://www.w3.org/XML/1998/namespace","base",url.directory);
if(ownerNode.hasAttribute("media")){editStyleSheet.setAttribute("media",ownerNode.getAttribute("media"))
}ownerNode.parentNode.insertBefore(editStyleSheet,ownerNode.nextSibling);
styleSheet.editStyleSheet=editStyleSheet
}styleSheet.editStyleSheet.innerHTML=value;
if(FBTrace.DBG_CSS){FBTrace.sysout("css.saveEdit styleSheet.href:"+styleSheet.href+" got innerHTML:"+value+"\n")
}dispatch(this.fbListeners,"onCSSFreeEdit",[styleSheet,value])
},insertRule:function(styleSheet,cssText,ruleIndex){if(FBTrace.DBG_CSS){FBTrace.sysout("Insert: "+ruleIndex+" "+cssText)
}var insertIndex=styleSheet.insertRule(cssText,ruleIndex);
dispatch(this.fbListeners,"onCSSInsertRule",[styleSheet,cssText,ruleIndex]);
return insertIndex
},deleteRule:function(styleSheet,ruleIndex){if(FBTrace.DBG_CSS){FBTrace.sysout("deleteRule: "+ruleIndex+" "+styleSheet.cssRules.length,styleSheet.cssRules)
}dispatch(this.fbListeners,"onCSSDeleteRule",[styleSheet,ruleIndex]);
styleSheet.deleteRule(ruleIndex)
},setProperty:function(rule,propName,propValue,propPriority){var style=rule.style||rule;
var baseText=style.cssText;
if(style.getPropertyValue){var prevValue=style.getPropertyValue(propName);
var prevPriority=style.getPropertyPriority(propName);
style.removeProperty(propName);
style.setProperty(propName,propValue,propPriority)
}else{style[toCamelCase(propName)]=propValue
}if(propName){dispatch(this.fbListeners,"onCSSSetProperty",[style,propName,propValue,propPriority,prevValue,prevPriority,rule,baseText])
}},removeProperty:function(rule,propName,parent){var style=rule.style||rule;
var baseText=style.cssText;
if(style.getPropertyValue){var prevValue=style.getPropertyValue(propName);
var prevPriority=style.getPropertyPriority(propName);
style.removeProperty(propName)
}else{style[toCamelCase(propName)]=""
}if(propName){dispatch(this.fbListeners,"onCSSRemoveProperty",[style,propName,prevValue,prevPriority,rule,baseText])
}}});
Firebug.CSSStyleSheetPanel=function(){};
Firebug.CSSStyleSheetPanel.prototype=extend(Firebug.SourceBoxPanel,{template:domplate({tag:DIV({"class":"cssSheet insertInto a11yCSSView"},FOR("rule","$rules",CSSRuleTag),DIV({"class":"cssSheet editable insertBefore"},""))}),refresh:function(){if(this.location){this.updateLocation(this.location)
}else{if(this.selection){this.updateSelection(this.selection)
}}},toggleEditing:function(){if(!this.stylesheetEditor){this.stylesheetEditor=new StyleSheetEditor(this.document)
}if(this.editing){Firebug.Editor.stopEditing()
}else{if(!this.location){return
}var styleSheet=this.location.editStyleSheet?this.location.editStyleSheet.sheet:this.location;
var css=getStyleSheetCSS(styleSheet,this.context);
this.stylesheetEditor.styleSheet=this.location;
Firebug.Editor.startEditing(this.panelNode,css,this.stylesheetEditor)
}},getStylesheetURL:function(rule){if(this.location.href){return this.location.href
}else{return this.context.window.location.href
}},getRuleByLine:function(styleSheet,line){if(!domUtils){return null
}var cssRules=styleSheet.cssRules;
for(var i=0;
i<cssRules.length;
++i){var rule=cssRules[i];
if(rule instanceof CSSStyleRule){var ruleLine=domUtils.getRuleLine(rule);
if(ruleLine>=line){return rule
}}}},highlightRule:function(rule){var ruleElement=Firebug.getElementByRepObject(this.panelNode.firstChild,rule);
if(ruleElement){scrollIntoCenterView(ruleElement,this.panelNode);
setClassTimed(ruleElement,"jumpHighlight",this.context)
}},getStyleSheetRules:function(context,styleSheet){var isSystemSheet=isSystemStyleSheet(styleSheet);
function appendRules(cssRules){for(var i=0;
i<cssRules.length;
++i){var rule=cssRules[i];
if(instanceOf(rule,"CSSStyleRule")){var props=this.getRuleProperties(context,rule);
var line=null;
var selector=rule.selectorText;
if(isIE){selector=selector.replace(reSelectorTag,function(s){return s.toLowerCase()
})
}var ruleId=rule.selectorText+"/"+line;
rules.push({tag:CSSStyleRuleTag.tag,rule:rule,id:ruleId,selector:selector,props:props,isSystemSheet:isSystemSheet,isSelectorEditable:true})
}else{if(instanceOf(rule,"CSSImportRule")){rules.push({tag:CSSImportRuleTag.tag,rule:rule})
}else{if(instanceOf(rule,"CSSMediaRule")){appendRules.apply(this,[rule.cssRules])
}else{if(FBTrace.DBG_ERRORS||FBTrace.DBG_CSS){FBTrace.sysout("css getStyleSheetRules failed to classify a rule ",rule)
}}}}}}var rules=[];
appendRules.apply(this,[styleSheet.cssRules||styleSheet.rules]);
return rules
},parseCSSProps:function(style,inheritMode){var props=[];
if(Firebug.expandShorthandProps){var count=style.length-1,index=style.length;
while(index--){var propName=style.item(count-index);
this.addProperty(propName,style.getPropertyValue(propName),!!style.getPropertyPriority(propName),false,inheritMode,props)
}}else{var lines=style.cssText.match(/(?:[^;\(]*(?:\([^\)]*?\))?[^;\(]*)*;?/g);
var propRE=/\s*([^:\s]*)\s*:\s*(.*?)\s*(! important)?;?$/;
var line,i=0;
var m;
while(line=lines[i++]){m=propRE.exec(line);
if(!m){continue
}if(m[2]){this.addProperty(m[1],m[2],!!m[3],false,inheritMode,props)
}}}return props
},getRuleProperties:function(context,rule,inheritMode){var props=this.parseCSSProps(rule.style,inheritMode);
var line;
var ruleId=rule.selectorText+"/"+line;
this.addOldProperties(context,ruleId,inheritMode,props);
sortProperties(props);
return props
},addOldProperties:function(context,ruleId,inheritMode,props){if(context.selectorMap&&context.selectorMap.hasOwnProperty(ruleId)){var moreProps=context.selectorMap[ruleId];
for(var i=0;
i<moreProps.length;
++i){var prop=moreProps[i];
this.addProperty(prop.name,prop.value,prop.important,true,inheritMode,props)
}}},addProperty:function(name,value,important,disabled,inheritMode,props){name=name.toLowerCase();
if(inheritMode&&!inheritedStyleNames[name]){return
}name=this.translateName(name,value);
if(name){value=stripUnits(rgbToHex(value));
important=important?" !important":"";
var prop={name:name,value:value,important:important,disabled:disabled};
props.push(prop)
}},translateName:function(name,value){if((value=="-moz-initial"&&(name=="-moz-background-clip"||name=="-moz-background-origin"||name=="-moz-background-inline-policy"))||(value=="physical"&&(name=="margin-left-ltr-source"||name=="margin-left-rtl-source"||name=="margin-right-ltr-source"||name=="margin-right-rtl-source"))||(value=="physical"&&(name=="padding-left-ltr-source"||name=="padding-left-rtl-source"||name=="padding-right-ltr-source"||name=="padding-right-rtl-source"))){return null
}if(name=="margin-left-value"){return"margin-left"
}else{if(name=="margin-right-value"){return"margin-right"
}else{if(name=="margin-top-value"){return"margin-top"
}else{if(name=="margin-bottom-value"){return"margin-bottom"
}else{if(name=="padding-left-value"){return"padding-left"
}else{if(name=="padding-right-value"){return"padding-right"
}else{if(name=="padding-top-value"){return"padding-top"
}else{if(name=="padding-bottom-value"){return"padding-bottom"
}else{return name
}}}}}}}}},editElementStyle:function(){var rulesBox=$$(".cssElementRuleContainer",this.panelNode)[0];
var styleRuleBox=rulesBox&&Firebug.getElementByRepObject(rulesBox,this.selection);
if(!styleRuleBox){var rule={rule:this.selection,inherited:false,selector:"element.style",props:[]};
if(!rulesBox){styleRuleBox=this.template.cascadedTag.replace({rules:[rule],inherited:[],inheritLabel:"Inherited from"},this.panelNode);
styleRuleBox=$$(".cssElementRuleContainer",styleRuleBox)[0]
}else{styleRuleBox=this.template.ruleTag.insertBefore({rule:rule},rulesBox)
}styleRuleBox=$$(".insertInto",styleRuleBox)[0]
}Firebug.Editor.insertRowForObject(styleRuleBox)
},insertPropertyRow:function(row){Firebug.Editor.insertRowForObject(row)
},insertRule:function(row){var location=getAncestorByClass(row,"cssRule");
if(!location){location=getChildByClass(this.panelNode,"cssSheet");
Firebug.Editor.insertRowForObject(location)
}else{Firebug.Editor.insertRow(location,"before")
}},editPropertyRow:function(row){var propValueBox=getChildByClass(row,"cssPropValue");
Firebug.Editor.startEditing(propValueBox)
},deletePropertyRow:function(row){var rule=Firebug.getRepObject(row);
var propName=getChildByClass(row,"cssPropName")[textContent];
Firebug.CSSModule.removeProperty(rule,propName);
var ruleId=Firebug.getRepNode(row).getAttribute("ruleId");
if(this.context.selectorMap&&this.context.selectorMap.hasOwnProperty(ruleId)){var map=this.context.selectorMap[ruleId];
for(var i=0;
i<map.length;
++i){if(map[i].name==propName){map.splice(i,1);
break
}}}if(this.name=="stylesheet"){dispatch([Firebug.A11yModel],"onInlineEditorClose",[this,row.firstChild,true])
}row.parentNode.removeChild(row);
this.markChange(this.name=="stylesheet")
},disablePropertyRow:function(row){toggleClass(row,"disabledStyle");
var rule=Firebug.getRepObject(row);
var propName=getChildByClass(row,"cssPropName")[textContent];
if(!this.context.selectorMap){this.context.selectorMap={}
}var ruleId=Firebug.getRepNode(row).getAttribute("ruleId");
if(!(this.context.selectorMap.hasOwnProperty(ruleId))){this.context.selectorMap[ruleId]=[]
}var map=this.context.selectorMap[ruleId];
var propValue=getChildByClass(row,"cssPropValue")[textContent];
var parsedValue=parsePriority(propValue);
if(hasClass(row,"disabledStyle")){Firebug.CSSModule.removeProperty(rule,propName);
map.push({name:propName,value:parsedValue.value,important:parsedValue.priority})
}else{Firebug.CSSModule.setProperty(rule,propName,parsedValue.value,parsedValue.priority);
var index=findPropByName(map,propName);
map.splice(index,1)
}this.markChange(this.name=="stylesheet")
},onMouseDown:function(event){var offset=event.clientX-this.panelNode.parentNode.offsetLeft;
if(!isLeftClick(event)||offset>20){return
}var target=event.target||event.srcElement;
if(hasClass(target,"textEditor")){return
}var row=getAncestorByClass(target,"cssProp");
if(row&&hasClass(row,"editGroup")){this.disablePropertyRow(row);
cancelEvent(event)
}},onDoubleClick:function(event){var offset=event.clientX-this.panelNode.parentNode.offsetLeft;
if(!isLeftClick(event)||offset<=20){return
}var target=event.target||event.srcElement;
if(hasClass(target,"textEditorInner")){return
}var row=getAncestorByClass(target,"cssRule");
if(row&&!getAncestorByClass(target,"cssPropName")&&!getAncestorByClass(target,"cssPropValue")){this.insertPropertyRow(row);
cancelEvent(event)
}},name:"stylesheet",title:"CSS",parentPanel:null,searchable:true,dependents:["css","stylesheet","dom","domSide","layout"],options:{hasToolButtons:true},create:function(){Firebug.Panel.create.apply(this,arguments);
this.onMouseDown=bind(this.onMouseDown,this);
this.onDoubleClick=bind(this.onDoubleClick,this);
if(this.name=="stylesheet"){this.onChangeSelect=bind(this.onChangeSelect,this);
var doc=Firebug.browser.document;
var selectNode=this.selectNode=createElement("select");
CssAnalyzer.processAllStyleSheets(doc,function(doc,styleSheet){var key=StyleSheetCache.key(styleSheet);
var fileName=getFileName(styleSheet.href)||getFileName(doc.location.href);
var option=createElement("option",{value:key});
option.appendChild(Firebug.chrome.document.createTextNode(fileName));
selectNode.appendChild(option)
});
this.toolButtonsNode.appendChild(selectNode)
}},onChangeSelect:function(event){event=event||window.event;
var target=event.srcElement||event.currentTarget;
var key=target.value;
var styleSheet=StyleSheetCache.get(key);
this.updateLocation(styleSheet)
},initialize:function(){Firebug.Panel.initialize.apply(this,arguments);
this.context=Firebug.chrome;
this.document=Firebug.chrome.document;
this.initializeNode();
if(this.name=="stylesheet"){var styleSheets=Firebug.browser.document.styleSheets;
if(styleSheets.length>0){addEvent(this.selectNode,"change",this.onChangeSelect);
this.updateLocation(styleSheets[0])
}}},shutdown:function(){Firebug.Editor.stopEditing();
if(this.name=="stylesheet"){removeEvent(this.selectNode,"change",this.onChangeSelect)
}this.destroyNode();
Firebug.Panel.shutdown.apply(this,arguments)
},destroy:function(state){Firebug.Panel.destroy.apply(this,arguments)
},initializeNode:function(oldPanelNode){addEvent(this.panelNode,"mousedown",this.onMouseDown);
addEvent(this.panelNode,"dblclick",this.onDoubleClick)
},destroyNode:function(){removeEvent(this.panelNode,"mousedown",this.onMouseDown);
removeEvent(this.panelNode,"dblclick",this.onDoubleClick)
},ishow:function(state){Firebug.Inspector.stopInspecting(true);
this.showToolbarButtons("fbCSSButtons",true);
if(this.context.loaded&&!this.location){restoreObjects(this,state);
if(!this.location){this.location=this.getDefaultLocation()
}if(state&&state.scrollTop){this.panelNode.scrollTop=state.scrollTop
}}},ihide:function(){this.showToolbarButtons("fbCSSButtons",false);
this.lastScrollTop=this.panelNode.scrollTop
},supportsObject:function(object){if(object instanceof CSSStyleSheet){return 1
}else{if(object instanceof CSSStyleRule){return 2
}else{if(object instanceof CSSStyleDeclaration){return 2
}else{if(object instanceof SourceLink&&object.type=="css"&&reCSS.test(object.href)){return 2
}else{return 0
}}}}},updateLocation:function(styleSheet){if(!styleSheet){return
}if(styleSheet.editStyleSheet){styleSheet=styleSheet.editStyleSheet.sheet
}if(styleSheet.restricted){FirebugReps.Warning.tag.replace({object:"AccessRestricted"},this.panelNode);
CssAnalyzer.externalStyleSheetWarning.tag.append({object:"The stylesheet could not be loaded due to access restrictions. ",link:"more...",href:"http://getfirebug.com/wiki/index.php/Firebug_Lite_FAQ#I_keep_seeing_.22Access_to_restricted_URI_denied.22"},this.panelNode);
return
}var rules=this.getStyleSheetRules(this.context,styleSheet);
var result;
if(rules.length){result=this.template.tag.replace({rules:rules},this.panelNode)
}else{result=FirebugReps.Warning.tag.replace({object:"EmptyStyleSheet"},this.panelNode)
}},updateSelection:function(object){this.selection=null;
if(object instanceof CSSStyleDeclaration){object=object.parentRule
}if(object instanceof CSSStyleRule){this.navigate(object.parentStyleSheet);
this.highlightRule(object)
}else{if(object instanceof CSSStyleSheet){this.navigate(object)
}else{if(object instanceof SourceLink){try{var sourceLink=object;
var sourceFile=getSourceFileByHref(sourceLink.href,this.context);
if(sourceFile){clearNode(this.panelNode);
this.showSourceFile(sourceFile);
var lineNo=object.line;
if(lineNo){this.scrollToLine(lineNo,this.jumpHighlightFactory(lineNo,this.context))
}}else{var stylesheet=getStyleSheetByHref(sourceLink.href,this.context);
if(stylesheet){this.navigate(stylesheet)
}else{if(FBTrace.DBG_CSS){FBTrace.sysout("css.updateSelection no sourceFile for "+sourceLink.href,sourceLink)
}}}}catch(exc){if(FBTrace.DBG_CSS){FBTrace.sysout("css.upDateSelection FAILS "+exc,exc)
}}}}}},updateOption:function(name,value){if(name=="expandShorthandProps"){this.refresh()
}},getLocationList:function(){var styleSheets=getAllStyleSheets(this.context);
return styleSheets
},getOptionsMenuItems:function(){return[{label:"Expand Shorthand Properties",type:"checkbox",checked:Firebug.expandShorthandProps,command:bindFixed(Firebug.togglePref,Firebug,"expandShorthandProps")},"-",{label:"Refresh",command:bind(this.refresh,this)}]
},getContextMenuItems:function(style,target){var items=[];
if(this.infoTipType=="color"){items.push({label:"CopyColor",command:bindFixed(copyToClipboard,FBL,this.infoTipObject)})
}else{if(this.infoTipType=="image"){items.push({label:"CopyImageLocation",command:bindFixed(copyToClipboard,FBL,this.infoTipObject)},{label:"OpenImageInNewTab",command:bindFixed(openNewTab,FBL,this.infoTipObject)})
}}if(isElement(this.selection)){items.push({label:"EditStyle",command:bindFixed(this.editElementStyle,this)})
}else{if(!isSystemStyleSheet(this.selection)){items.push({label:"NewRule",command:bindFixed(this.insertRule,this,target)})
}}var cssRule=getAncestorByClass(target,"cssRule");
if(cssRule&&hasClass(cssRule,"cssEditableRule")){items.push("-",{label:"NewProp",command:bindFixed(this.insertPropertyRow,this,target)});
var propRow=getAncestorByClass(target,"cssProp");
if(propRow){var propName=getChildByClass(propRow,"cssPropName")[textContent];
var isDisabled=hasClass(propRow,"disabledStyle");
items.push({label:$STRF("EditProp",[propName]),nol10n:true,command:bindFixed(this.editPropertyRow,this,propRow)},{label:$STRF("DeleteProp",[propName]),nol10n:true,command:bindFixed(this.deletePropertyRow,this,propRow)},{label:$STRF("DisableProp",[propName]),nol10n:true,type:"checkbox",checked:isDisabled,command:bindFixed(this.disablePropertyRow,this,propRow)})
}}items.push("-",{label:"Refresh",command:bind(this.refresh,this)});
return items
},browseObject:function(object){if(this.infoTipType=="image"){openNewTab(this.infoTipObject);
return true
}},showInfoTip:function(infoTip,target,x,y){var propValue=getAncestorByClass(target,"cssPropValue");
if(propValue){var offset=getClientOffset(propValue);
var offsetX=x-offset.x;
var text=propValue[textContent];
var charWidth=propValue.offsetWidth/text.length;
var charOffset=Math.floor(offsetX/charWidth);
var cssValue=parseCSSValue(text,charOffset);
if(cssValue){if(cssValue.value==this.infoTipValue){return true
}this.infoTipValue=cssValue.value;
if(cssValue.type=="rgb"||(!cssValue.type&&isColorKeyword(cssValue.value))){this.infoTipType="color";
this.infoTipObject=cssValue.value;
return Firebug.InfoTip.populateColorInfoTip(infoTip,cssValue.value)
}else{if(cssValue.type=="url"){var propNameNode=getElementByClass(target.parentNode,"cssPropName");
if(propNameNode&&isImageRule(propNameNode[textContent])){var rule=Firebug.getRepObject(target);
var baseURL=this.getStylesheetURL(rule);
var relURL=parseURLValue(cssValue.value);
var absURL=isDataURL(relURL)?relURL:absoluteURL(relURL,baseURL);
var repeat=parseRepeatValue(text);
this.infoTipType="image";
this.infoTipObject=absURL;
return Firebug.InfoTip.populateImageInfoTip(infoTip,absURL,repeat)
}}}}}delete this.infoTipType;
delete this.infoTipValue;
delete this.infoTipObject
},getEditor:function(target,value){if(target==this.panelNode||hasClass(target,"cssSelector")||hasClass(target,"cssRule")||hasClass(target,"cssSheet")){if(!this.ruleEditor){this.ruleEditor=new CSSRuleEditor(this.document)
}return this.ruleEditor
}else{if(!this.editor){this.editor=new CSSEditor(this.document)
}return this.editor
}},getDefaultLocation:function(){try{var styleSheets=this.context.window.document.styleSheets;
if(styleSheets.length){var sheet=styleSheets[0];
return(Firebug.filterSystemURLs&&isSystemURL(getURLForStyleSheet(sheet)))?null:sheet
}}catch(exc){if(FBTrace.DBG_LOCATIONS){FBTrace.sysout("css.getDefaultLocation FAILS "+exc,exc)
}}},getObjectDescription:function(styleSheet){var url=getURLForStyleSheet(styleSheet);
var instance=getInstanceForStyleSheet(styleSheet);
var baseDescription=splitURLBase(url);
if(instance){baseDescription.name=baseDescription.name+" #"+(instance+1)
}return baseDescription
},search:function(text,reverse){var curDoc=this.searchCurrentDoc(!Firebug.searchGlobal,text,reverse);
if(!curDoc&&Firebug.searchGlobal){return this.searchOtherDocs(text,reverse)
}return curDoc
},searchOtherDocs:function(text,reverse){var scanRE=Firebug.Search.getTestingRegex(text);
function scanDoc(styleSheet){for(var i=0;
i<styleSheet.cssRules.length;
i++){if(scanRE.test(styleSheet.cssRules[i].cssText)){return true
}}}if(this.navigateToNextDocument(scanDoc,reverse)){return this.searchCurrentDoc(true,text,reverse)
}},searchCurrentDoc:function(wrapSearch,text,reverse){if(!text){delete this.currentSearch;
return false
}var row;
if(this.currentSearch&&text==this.currentSearch.text){row=this.currentSearch.findNext(wrapSearch,false,reverse,Firebug.Search.isCaseSensitive(text))
}else{if(this.editing){this.currentSearch=new TextSearch(this.stylesheetEditor.box);
row=this.currentSearch.find(text,reverse,Firebug.Search.isCaseSensitive(text));
if(row){var sel=this.document.defaultView.getSelection();
sel.removeAllRanges();
sel.addRange(this.currentSearch.range);
scrollSelectionIntoView(this);
return true
}else{return false
}}else{function findRow(node){return node.nodeType==1?node:node.parentNode
}this.currentSearch=new TextSearch(this.panelNode,findRow);
row=this.currentSearch.find(text,reverse,Firebug.Search.isCaseSensitive(text))
}}if(row){this.document.defaultView.getSelection().selectAllChildren(row);
scrollIntoCenterView(row,this.panelNode);
dispatch([Firebug.A11yModel],"onCSSSearchMatchFound",[this,text,row]);
return true
}else{dispatch([Firebug.A11yModel],"onCSSSearchMatchFound",[this,text,null]);
return false
}},getSearchOptionsMenuItems:function(){return[Firebug.Search.searchOptionMenu("search.Case_Sensitive","searchCaseSensitive"),Firebug.Search.searchOptionMenu("search.Multiple_Files","searchGlobal")]
}});
function CSSElementPanel(){}CSSElementPanel.prototype=extend(Firebug.CSSStyleSheetPanel.prototype,{template:domplate({cascadedTag:DIV({"class":"a11yCSSView",role:"presentation"},DIV({role:"list","aria-label":$STR("aria.labels.style rules")},FOR("rule","$rules",TAG("$ruleTag",{rule:"$rule"}))),DIV({role:"list","aria-label":$STR("aria.labels.inherited style rules")},FOR("section","$inherited",H1({"class":"cssInheritHeader groupHeader focusRow",role:"listitem"},SPAN({"class":"cssInheritLabel"},"$inheritLabel"),TAG(FirebugReps.Element.shortTag,{object:"$section.element"})),DIV({role:"group"},FOR("rule","$section.rules",TAG("$ruleTag",{rule:"$rule"})))))),ruleTag:isIE?DIV({"class":"cssElementRuleContainer"},TAG(FirebugReps.SourceLink.tag,{object:"$rule.sourceLink"}),TAG(CSSStyleRuleTag.tag,{rule:"$rule"})):DIV({"class":"cssElementRuleContainer"},TAG(CSSStyleRuleTag.tag,{rule:"$rule"}),TAG(FirebugReps.SourceLink.tag,{object:"$rule.sourceLink"}))}),updateCascadeView:function(element){var rules=[],sections=[],usedProps={};
this.getInheritedRules(element,sections,usedProps);
this.getElementRules(element,rules,usedProps);
if(rules.length||sections.length){var inheritLabel="Inherited from";
var result=this.template.cascadedTag.replace({rules:rules,inherited:sections,inheritLabel:inheritLabel},this.panelNode)
}else{var result=FirebugReps.Warning.tag.replace({object:"EmptyElementCSS"},this.panelNode)
}if(CssAnalyzer.hasExternalStyleSheet()){CssAnalyzer.externalStyleSheetWarning.tag.append({object:"The results here may be inaccurate because some stylesheets could not be loaded due to access restrictions. ",link:"more...",href:"http://getfirebug.com/wiki/index.php/Firebug_Lite_FAQ#I_keep_seeing_.22This_element_has_no_style_rules.22"},this.panelNode)
}},getStylesheetURL:function(rule){if(rule&&rule.parentStyleSheet&&rule.parentStyleSheet.href){return rule.parentStyleSheet.href
}else{return this.selection.ownerDocument.location.href
}},getInheritedRules:function(element,sections,usedProps){var parent=element.parentNode;
if(parent&&parent.nodeType==1){this.getInheritedRules(parent,sections,usedProps);
var rules=[];
this.getElementRules(parent,rules,usedProps,true);
if(rules.length){sections.splice(0,0,{element:parent,rules:rules})
}}},getElementRules:function(element,rules,usedProps,inheritMode){var inspectedRules,displayedRules={};
inspectedRules=CssAnalyzer.getElementCSSRules(element);
if(inspectedRules){for(var i=0,length=inspectedRules.length;
i<length;
++i){var ruleId=inspectedRules[i];
var ruleData=CssAnalyzer.getRuleData(ruleId);
var rule=ruleData.rule;
var ssid=ruleData.styleSheetId;
var parentStyleSheet=StyleSheetCache.get(ssid);
var href=parentStyleSheet.externalURL?parentStyleSheet.externalURL:parentStyleSheet.href;
var instance=null;
var isSystemSheet=false;
if(!Firebug.showUserAgentCSS&&isSystemSheet){continue
}if(!href){href=element.ownerDocument.location.href
}var props=this.getRuleProperties(this.context,rule,inheritMode);
if(inheritMode&&!props.length){continue
}var line=ruleData.lineNo;
var ruleId=rule.selectorText+"/"+line;
var sourceLink=new SourceLink(href,line,"css",rule,instance);
this.markOverridenProps(props,usedProps,inheritMode);
rules.splice(0,0,{rule:rule,id:ruleId,selector:ruleData.selector,sourceLink:sourceLink,props:props,inherited:inheritMode,isSystemSheet:isSystemSheet})
}}if(element.style){this.getStyleProperties(element,rules,usedProps,inheritMode)
}if(FBTrace.DBG_CSS){FBTrace.sysout("getElementRules "+rules.length+" rules for "+getElementXPath(element),rules)
}},markOverridenProps:function(props,usedProps,inheritMode){for(var i=0;
i<props.length;
++i){var prop=props[i];
if(usedProps.hasOwnProperty(prop.name)){var deadProps=usedProps[prop.name];
for(var j=0;
j<deadProps.length;
++j){var deadProp=deadProps[j];
if(!deadProp.disabled&&!deadProp.wasInherited&&deadProp.important&&!prop.important){prop.overridden=true
}else{if(!prop.disabled){deadProp.overridden=true
}}}}else{usedProps[prop.name]=[]
}prop.wasInherited=inheritMode?true:false;
usedProps[prop.name].push(prop)
}},getStyleProperties:function(element,rules,usedProps,inheritMode){var props=this.parseCSSProps(element.style,inheritMode);
this.addOldProperties(this.context,getElementXPath(element),inheritMode,props);
sortProperties(props);
this.markOverridenProps(props,usedProps,inheritMode);
if(props.length){rules.splice(0,0,{rule:element,id:getElementXPath(element),selector:"element.style",props:props,inherited:inheritMode})
}},name:"css",title:"Style",parentPanel:"HTML",order:0,initialize:function(){this.context=Firebug.chrome;
this.document=Firebug.chrome.document;
Firebug.CSSStyleSheetPanel.prototype.initialize.apply(this,arguments);
var selection=ElementCache.get(Firebug.context.persistedState.selectedHTMLElementId);
if(selection){this.select(selection,true)
}},ishow:function(state){},watchWindow:function(win){if(domUtils){var doc=win.document
}},unwatchWindow:function(win){var doc=win.document;
if(isAncestor(this.stateChangeEl,doc)){this.removeStateChangeHandlers()
}},supportsObject:function(object){return object instanceof Element?1:0
},updateView:function(element){this.updateCascadeView(element);
if(domUtils){this.contentState=safeGetContentState(element);
this.addStateChangeHandlers(element)
}},updateSelection:function(element){if(!instanceOf(element,"Element")){return
}if(sothinkInstalled){FirebugReps.Warning.tag.replace({object:"SothinkWarning"},this.panelNode);
return
}if(!element){return
}this.updateView(element)
},updateOption:function(name,value){if(name=="showUserAgentCSS"||name=="expandShorthandProps"){this.refresh()
}},getOptionsMenuItems:function(){var ret=[{label:"Show User Agent CSS",type:"checkbox",checked:Firebug.showUserAgentCSS,command:bindFixed(Firebug.togglePref,Firebug,"showUserAgentCSS")},{label:"Expand Shorthand Properties",type:"checkbox",checked:Firebug.expandShorthandProps,command:bindFixed(Firebug.togglePref,Firebug,"expandShorthandProps")}];
if(domUtils&&this.selection){var state=safeGetContentState(this.selection);
ret.push("-");
ret.push({label:":active",type:"checkbox",checked:state&STATE_ACTIVE,command:bindFixed(this.updateContentState,this,STATE_ACTIVE,state&STATE_ACTIVE)});
ret.push({label:":hover",type:"checkbox",checked:state&STATE_HOVER,command:bindFixed(this.updateContentState,this,STATE_HOVER,state&STATE_HOVER)})
}return ret
},updateContentState:function(state,remove){domUtils.setContentState(remove?this.selection.ownerDocument.documentElement:this.selection,state);
this.refresh()
},addStateChangeHandlers:function(el){this.removeStateChangeHandlers();
this.stateChangeEl=el
},removeStateChangeHandlers:function(){var sel=this.stateChangeEl;
if(sel){}},contentStateCheck:function(state){if(!state||this.contentState&state){var timeoutRunner=bindFixed(function(){var newState=safeGetContentState(this.selection);
if(newState!=this.contentState){this.context.invalidatePanels(this.name)
}},this);
setTimeout(timeoutRunner,0)
}}});
function safeGetContentState(selection){try{return domUtils.getContentState(selection)
}catch(e){if(FBTrace.DBG_ERRORS){FBTrace.sysout("css.safeGetContentState; EXCEPTION",e)
}}}function CSSComputedElementPanel(){}CSSComputedElementPanel.prototype=extend(CSSElementPanel.prototype,{template:domplate({computedTag:DIV({"class":"a11yCSSView",role:"list","aria-label":$STR("aria.labels.computed styles")},FOR("group","$groups",H1({"class":"cssInheritHeader groupHeader focusRow",role:"listitem"},SPAN({"class":"cssInheritLabel"},"$group.title")),TABLE({width:"100%",role:"group"},TBODY({role:"presentation"},FOR("prop","$group.props",TR({"class":"focusRow computedStyleRow",role:"listitem"},TD({"class":"stylePropName",role:"presentation"},"$prop.name"),TD({"class":"stylePropValue",role:"presentation"},"$prop.value")))))))}),updateComputedView:function(element){var win=isIE?element.ownerDocument.parentWindow:element.ownerDocument.defaultView;
var style=isIE?element.currentStyle:win.getComputedStyle(element,"");
var groups=[];
for(var groupName in styleGroups){var title=styleGroupTitles[groupName];
var group={title:title,props:[]};
groups.push(group);
var props=styleGroups[groupName];
for(var i=0;
i<props.length;
++i){var propName=props[i];
var propValue=style.getPropertyValue?style.getPropertyValue(propName):""+style[toCamelCase(propName)];
if(propValue===undefined||propValue===null){continue
}propValue=stripUnits(rgbToHex(propValue));
if(propValue){group.props.push({name:propName,value:propValue})
}}}var result=this.template.computedTag.replace({groups:groups},this.panelNode)
},name:"computed",title:"Computed",parentPanel:"HTML",order:1,updateView:function(element){this.updateComputedView(element)
},getOptionsMenuItems:function(){return[{label:"Refresh",command:bind(this.refresh,this)}]
}});
function CSSEditor(doc){this.initializeInline(doc)
}CSSEditor.prototype=domplate(Firebug.InlineEditor.prototype,{insertNewRow:function(target,insertWhere){var rule=Firebug.getRepObject(target);
var emptyProp={name:"",value:"",important:""};
if(insertWhere=="before"){return CSSPropTag.tag.insertBefore({prop:emptyProp,rule:rule},target)
}else{return CSSPropTag.tag.insertAfter({prop:emptyProp,rule:rule},target)
}},saveEdit:function(target,value,previousValue){if(!value){return
}target.innerHTML=escapeForCss(value);
var row=getAncestorByClass(target,"cssProp");
if(hasClass(row,"disabledStyle")){toggleClass(row,"disabledStyle")
}var rule=Firebug.getRepObject(target);
if(hasClass(target,"cssPropName")){if(value&&previousValue!=value){var propValue=getChildByClass(row,"cssPropValue")[textContent];
var parsedValue=parsePriority(propValue);
if(propValue&&propValue!="undefined"){if(FBTrace.DBG_CSS){FBTrace.sysout("CSSEditor.saveEdit : "+previousValue+"->"+value+" = "+propValue+"\n")
}if(previousValue){Firebug.CSSModule.removeProperty(rule,previousValue)
}Firebug.CSSModule.setProperty(rule,value,parsedValue.value,parsedValue.priority)
}}else{if(!value){Firebug.CSSModule.removeProperty(rule,previousValue)
}}}else{if(getAncestorByClass(target,"cssPropValue")){var propName=getChildByClass(row,"cssPropName")[textContent];
var propValue=getChildByClass(row,"cssPropValue")[textContent];
if(FBTrace.DBG_CSS){FBTrace.sysout("CSSEditor.saveEdit propName=propValue: "+propName+" = "+propValue+"\n")
}if(value&&value!="null"){var parsedValue=parsePriority(value);
Firebug.CSSModule.setProperty(rule,propName,parsedValue.value,parsedValue.priority)
}else{if(previousValue&&previousValue!="null"){Firebug.CSSModule.removeProperty(rule,propName)
}}}}this.panel.markChange(this.panel.name=="stylesheet")
},advanceToNext:function(target,charCode){if(charCode==58&&hasClass(target,"cssPropName")){return true
}},getAutoCompleteRange:function(value,offset){if(hasClass(this.target,"cssPropName")){return{start:0,end:value.length-1}
}else{return parseCSSValue(value,offset)
}},getAutoCompleteList:function(preExpr,expr,postExpr){if(hasClass(this.target,"cssPropName")){return getCSSPropertyNames()
}else{var row=getAncestorByClass(this.target,"cssProp");
var propName=getChildByClass(row,"cssPropName")[textContent];
return getCSSKeywordsByProperty(propName)
}}});
function CSSRuleEditor(doc){this.initializeInline(doc);
this.completeAsYouType=false
}CSSRuleEditor.uniquifier=0;
CSSRuleEditor.prototype=domplate(Firebug.InlineEditor.prototype,{insertNewRow:function(target,insertWhere){var emptyRule={selector:"",id:"",props:[],isSelectorEditable:true};
if(insertWhere=="before"){return CSSStyleRuleTag.tag.insertBefore({rule:emptyRule},target)
}else{return CSSStyleRuleTag.tag.insertAfter({rule:emptyRule},target)
}},saveEdit:function(target,value,previousValue){if(FBTrace.DBG_CSS){FBTrace.sysout("CSSRuleEditor.saveEdit: '"+value+"'  '"+previousValue+"'",target)
}target.innerHTML=escapeForCss(value);
if(value===previousValue){return
}var row=getAncestorByClass(target,"cssRule");
var styleSheet=this.panel.location;
styleSheet=styleSheet.editStyleSheet?styleSheet.editStyleSheet.sheet:styleSheet;
var cssRules=styleSheet.cssRules;
var rule=Firebug.getRepObject(target),oldRule=rule;
var ruleIndex=cssRules.length;
if(rule||Firebug.getRepObject(row.nextSibling)){var searchRule=rule||Firebug.getRepObject(row.nextSibling);
for(ruleIndex=0;
ruleIndex<cssRules.length&&searchRule!=cssRules[ruleIndex];
ruleIndex++){}}if(oldRule){Firebug.CSSModule.deleteRule(styleSheet,ruleIndex)
}if(value){var cssText=[value,"{"];
var props=row.getElementsByClassName("cssProp");
for(var i=0;
i<props.length;
i++){var propEl=props[i];
if(!hasClass(propEl,"disabledStyle")){cssText.push(getChildByClass(propEl,"cssPropName")[textContent]);
cssText.push(":");
cssText.push(getChildByClass(propEl,"cssPropValue")[textContent]);
cssText.push(";")
}}cssText.push("}");
cssText=cssText.join("");
try{var insertLoc=Firebug.CSSModule.insertRule(styleSheet,cssText,ruleIndex);
rule=cssRules[insertLoc];
ruleIndex++
}catch(err){if(FBTrace.DBG_CSS||FBTrace.DBG_ERRORS){FBTrace.sysout("CSS Insert Error: "+err,err)
}target.innerHTML=escapeForCss(previousValue);
row.repObject=undefined;
return
}}else{rule=undefined
}row.repObject=rule;
if(!oldRule){var ruleId="new/"+value+"/"+(++CSSRuleEditor.uniquifier);
row.setAttribute("ruleId",ruleId)
}this.panel.markChange(this.panel.name=="stylesheet")
}});
function StyleSheetEditor(doc){this.box=this.tag.replace({},doc,this);
this.input=this.box.firstChild
}StyleSheetEditor.prototype=domplate(Firebug.BaseEditor,{multiLine:true,tag:DIV(TEXTAREA({"class":"styleSheetEditor fullPanelEditor",oninput:"$onInput"})),getValue:function(){return this.input.value
},setValue:function(value){return this.input.value=value
},show:function(target,panel,value,textSize,targetSize){this.target=target;
this.panel=panel;
this.panel.panelNode.appendChild(this.box);
this.input.value=value;
this.input.focus();
var command=Firebug.chrome.$("cmd_toggleCSSEditing");
command.setAttribute("checked",true)
},hide:function(){var command=Firebug.chrome.$("cmd_toggleCSSEditing");
command.setAttribute("checked",false);
if(this.box.parentNode==this.panel.panelNode){this.panel.panelNode.removeChild(this.box)
}delete this.target;
delete this.panel;
delete this.styleSheet
},saveEdit:function(target,value,previousValue){Firebug.CSSModule.freeEdit(this.styleSheet,value)
},endEditing:function(){this.panel.refresh();
return true
},onInput:function(){Firebug.Editor.update()
},scrollToLine:function(line,offset){this.startMeasuring(this.input);
var lineHeight=this.measureText().height;
this.stopMeasuring();
this.input.scrollTop=(line*lineHeight)+offset
}});
var rgbToHex=function rgbToHex(value){return value.replace(/\brgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/gi,rgbToHexReplacer)
};
var rgbToHexReplacer=function(_,r,g,b){return"#"+((1<<24)+(r<<16)+(g<<8)+(b<<0)).toString(16).substr(-6).toUpperCase()
};
var stripUnits=function stripUnits(value){return value.replace(/(url\(.*?\)|[^0]\S*\s*)|0(%|em|ex|px|in|cm|mm|pt|pc)(\s|$)/gi,stripUnitsReplacer)
};
var stripUnitsReplacer=function(_,skip,remove,whitespace){return skip||("0"+whitespace)
};
function parsePriority(value){var rePriority=/(.*?)\s*(!important)?$/;
var m=rePriority.exec(value);
var propValue=m?m[1]:"";
var priority=m&&m[2]?"important":"";
return{value:propValue,priority:priority}
}function parseURLValue(value){var m=reURL.exec(value);
return m?m[1]:""
}function parseRepeatValue(value){var m=reRepeat.exec(value);
return m?m[0]:""
}function parseCSSValue(value,offset){var start=0;
var m;
while(1){m=reSplitCSS.exec(value);
if(m&&m.index+m[0].length<offset){value=value.substr(m.index+m[0].length);
start+=m.index+m[0].length;
offset-=m.index+m[0].length
}else{break
}}if(m){var type;
if(m[1]){type="url"
}else{if(m[2]||m[3]){type="rgb"
}else{if(m[4]){type="int"
}}}return{value:m[0],start:start+m.index,end:start+m.index+(m[0].length-1),type:type}
}}function findPropByName(props,name){for(var i=0;
i<props.length;
++i){if(props[i].name==name){return i
}}}function sortProperties(props){props.sort(function(a,b){return a.name>b.name?1:-1
})
}function getTopmostRuleLine(panelNode){for(var child=panelNode.firstChild;
child;
child=child.nextSibling){if(child.offsetTop+child.offsetHeight>panelNode.scrollTop){var rule=child.repObject;
if(rule){return{line:domUtils.getRuleLine(rule),offset:panelNode.scrollTop-child.offsetTop}
}}}return 0
}function getStyleSheetCSS(sheet,context){if(sheet.ownerNode instanceof HTMLStyleElement){return sheet.ownerNode.innerHTML
}else{return context.sourceCache.load(sheet.href).join("")
}}function getStyleSheetOwnerNode(sheet){for(;
sheet&&!sheet.ownerNode;
sheet=sheet.parentStyleSheet){}return sheet.ownerNode
}function scrollSelectionIntoView(panel){var selCon=getSelectionController(panel);
selCon.scrollSelectionIntoView(nsISelectionController.SELECTION_NORMAL,nsISelectionController.SELECTION_FOCUS_REGION,true)
}function getSelectionController(panel){var browser=Firebug.chrome.getPanelBrowser(panel);
return browser.docShell.QueryInterface(nsIInterfaceRequestor).getInterface(nsISelectionDisplay).QueryInterface(nsISelectionController)
}Firebug.registerModule(Firebug.CSSModule);
Firebug.registerPanel(Firebug.CSSStyleSheetPanel);
Firebug.registerPanel(CSSElementPanel);
Firebug.registerPanel(CSSComputedElementPanel)
}});
FBL.ns(function(){with(FBL){Firebug.Script=extend(Firebug.Module,{getPanel:function(){return Firebug.chrome?Firebug.chrome.getPanel("Script"):null
},selectSourceCode:function(index){this.getPanel().selectSourceCode(index)
}});
Firebug.registerModule(Firebug.Script);
function ScriptPanel(){}ScriptPanel.prototype=extend(Firebug.Panel,{name:"Script",title:"Script",selectIndex:0,sourceIndex:-1,options:{hasToolButtons:true},create:function(){Firebug.Panel.create.apply(this,arguments);
this.onChangeSelect=bind(this.onChangeSelect,this);
var doc=Firebug.browser.document;
var scripts=doc.getElementsByTagName("script");
var selectNode=this.selectNode=createElement("select");
for(var i=0,script;
script=scripts[i];
i++){if(Firebug.ignoreFirebugElements&&script.getAttribute("firebugIgnore")){continue
}var fileName=getFileName(script.src)||getFileName(doc.location.href);
var option=createElement("option",{value:i});
option.appendChild(Firebug.chrome.document.createTextNode(fileName));
selectNode.appendChild(option)
}this.toolButtonsNode.appendChild(selectNode)
},initialize:function(){this.selectSourceCode(this.selectIndex);
Firebug.Panel.initialize.apply(this,arguments);
addEvent(this.selectNode,"change",this.onChangeSelect)
},shutdown:function(){removeEvent(this.selectNode,"change",this.onChangeSelect);
Firebug.Panel.shutdown.apply(this,arguments)
},detach:function(oldChrome,newChrome){Firebug.Panel.detach.apply(this,arguments);
var oldPanel=oldChrome.getPanel("Script");
var index=oldPanel.selectIndex;
this.selectNode.selectedIndex=index;
this.selectIndex=index;
this.sourceIndex=-1
},onChangeSelect:function(event){var select=this.selectNode;
this.selectIndex=select.selectedIndex;
var option=select.options[select.selectedIndex];
if(!option){return
}var selectedSourceIndex=parseInt(option.value);
this.renderSourceCode(selectedSourceIndex)
},selectSourceCode:function(index){var select=this.selectNode;
select.selectedIndex=index;
var option=select.options[index];
if(!option){return
}var selectedSourceIndex=parseInt(option.value);
this.renderSourceCode(selectedSourceIndex)
},renderSourceCode:function(index){if(this.sourceIndex!=index){var renderProcess=function renderProcess(src){var html=[],hl=0;
src=isIE&&!isExternal?src+"\n":"\n"+src;
src=src.replace(/\n\r|\r\n/g,"\n");
var match=src.match(/[\n]/g);
var lines=match?match.length:0;
html[hl++]='<div><div class="sourceBox" style="left:';
html[hl++]=35+7*(lines+"").length;
html[hl++]='px;"><pre class="sourceCode">';
html[hl++]=escapeHTML(src);
html[hl++]='</pre></div><div class="lineNo">';
for(var l=1,lines;
l<=lines;
l++){html[hl++]='<div line="';
html[hl++]=l;
html[hl++]='">';
html[hl++]=l;
html[hl++]="</div>"
}html[hl++]="</div></div>";
updatePanel(html)
};
var updatePanel=function(html){self.panelNode.innerHTML=html.join("");
setTimeout(function(){self.synchronizeUI()
},0)
};
var onFailure=function(){FirebugReps.Warning.tag.replace({object:"AccessRestricted"},self.panelNode)
};
var self=this;
var doc=Firebug.browser.document;
var script=doc.getElementsByTagName("script")[index];
var url=getScriptURL(script);
var isExternal=url&&url!=doc.location.href;
try{if(Firebug.disableResourceFetching){renderProcess(Firebug.Lite.Proxy.fetchResourceDisabledMessage)
}else{if(isExternal){Ajax.request({url:url,onSuccess:renderProcess,onFailure:onFailure})
}else{var src=script.innerHTML;
renderProcess(src)
}}}catch(e){onFailure()
}this.sourceIndex=index
}}});
Firebug.registerPanel(ScriptPanel);
var getScriptURL=function getScriptURL(script){var reFile=/([^\/\?#]+)(#.+)?$/;
var rePath=/^(.*\/)/;
var reProtocol=/^\w+:\/\//;
var path=null;
var doc=Firebug.browser.document;
var file=reFile.exec(script.src);
if(file){var fileName=file[1];
var fileOptions=file[2];
if(reProtocol.test(script.src)){path=rePath.exec(script.src)[1]
}else{var r=rePath.exec(script.src);
var src=r?r[1]:script.src;
var backDir=/^((?:\.\.\/)+)(.*)/.exec(src);
var reLastDir=/^(.*\/)[^\/]+\/$/;
path=rePath.exec(doc.location.href)[1];
if(backDir){var j=backDir[1].length/3;
var p;
while(j-->0){path=reLastDir.exec(path)[1]
}path+=backDir[2]
}else{if(src.indexOf("/")!=-1){if(/^\.\/./.test(src)){path+=src.substring(2)
}else{if(/^\/./.test(src)){var domain=/^(\w+:\/\/[^\/]+)/.exec(path);
path=domain[1]+src
}else{path+=src
}}}}}}var m=path&&path.match(/([^\/]+)\/$/)||null;
if(path&&m){return path+fileName
}};
var getFileName=function getFileName(path){if(!path){return""
}var match=path&&path.match(/[^\/]+(\?.*)?(#.*)?$/);
return match&&match[0]||path
}
}});
FBL.ns(function(){with(FBL){var ElementCache=Firebug.Lite.Cache.Element;
var insertSliceSize=18;
var insertInterval=40;
var ignoreVars={__firebug__:1,"eval":1,java:1,sun:1,Packages:1,JavaArray:1,JavaMember:1,JavaObject:1,JavaClass:1,JavaPackage:1,_firebug:1,_FirebugConsole:1,_FirebugCommandLine:1};
if(Firebug.ignoreFirebugElements){ignoreVars[Firebug.Lite.Cache.ID]=1
}var memberPanelRep=isIE6?{"class":"memberLabel $member.type\\Label",href:"javacript:void(0)"}:{"class":"memberLabel $member.type\\Label"};
var RowTag=TR({"class":"memberRow $member.open $member.type\\Row",$hasChildren:"$member.hasChildren",role:"presentation",level:"$member.level"},TD({"class":"memberLabelCell",style:"padding-left: $member.indent\\px",role:"presentation"},A(memberPanelRep,SPAN({},"$member.name"))),TD({"class":"memberValueCell",role:"presentation"},TAG("$member.tag",{object:"$member.value"})));
var WatchRowTag=TR({"class":"watchNewRow",level:0},TD({"class":"watchEditCell",colspan:2},DIV({"class":"watchEditBox a11yFocusNoTab",role:"button",tabindex:"0","aria-label":$STR("press enter to add new watch expression")},$STR("NewWatch"))));
var SizerRow=TR({role:"presentation"},TD({width:"30%"}),TD({width:"70%"}));
var domTableClass=isIElt8?"domTable domTableIE":"domTable";
var DirTablePlate=domplate(Firebug.Rep,{tag:TABLE({"class":domTableClass,cellpadding:0,cellspacing:0,onclick:"$onClick",role:"tree"},TBODY({role:"presentation"},SizerRow,FOR("member","$object|memberIterator",RowTag))),watchTag:TABLE({"class":domTableClass,cellpadding:0,cellspacing:0,_toggles:"$toggles",_domPanel:"$domPanel",onclick:"$onClick",role:"tree"},TBODY({role:"presentation"},SizerRow,WatchRowTag)),tableTag:TABLE({"class":domTableClass,cellpadding:0,cellspacing:0,_toggles:"$toggles",_domPanel:"$domPanel",onclick:"$onClick",role:"tree"},TBODY({role:"presentation"},SizerRow)),rowTag:FOR("member","$members",RowTag),memberIterator:function(object,level){return getMembers(object,level)
},onClick:function(event){if(!isLeftClick(event)){return
}var target=event.target||event.srcElement;
var row=getAncestorByClass(target,"memberRow");
var label=getAncestorByClass(target,"memberLabel");
if(label&&hasClass(row,"hasChildren")){var row=label.parentNode.parentNode;
this.toggleRow(row)
}else{var object=Firebug.getRepObject(target);
if(typeof(object)=="function"){Firebug.chrome.select(object,"script");
cancelEvent(event)
}else{if(event.detail==2&&!object){var panel=row.parentNode.parentNode.domPanel;
if(panel){var rowValue=panel.getRowPropertyValue(row);
if(typeof(rowValue)=="boolean"){panel.setPropertyValue(row,!rowValue)
}else{panel.editProperty(row)
}cancelEvent(event)
}}}}return false
},toggleRow:function(row){var level=parseInt(row.getAttribute("level"));
var toggles=row.parentNode.parentNode.toggles;
if(hasClass(row,"opened")){removeClass(row,"opened");
if(toggles){var path=getPath(row);
for(var i=0;
i<path.length;
++i){if(i==path.length-1){delete toggles[path[i]]
}else{toggles=toggles[path[i]]
}}}var rowTag=this.rowTag;
var tbody=row.parentNode;
setTimeout(function(){for(var firstRow=row.nextSibling;
firstRow;
firstRow=row.nextSibling){if(parseInt(firstRow.getAttribute("level"))<=level){break
}tbody.removeChild(firstRow)
}},row.insertTimeout?row.insertTimeout:0)
}else{setClass(row,"opened");
if(toggles){var path=getPath(row);
for(var i=0;
i<path.length;
++i){var name=path[i];
if(toggles.hasOwnProperty(name)){toggles=toggles[name]
}else{toggles=toggles[name]={}
}}}var value=row.lastChild.firstChild.repObject;
var members=getMembers(value,level+1);
var rowTag=this.rowTag;
var lastRow=row;
var delay=0;
while(members.length){with({slice:members.splice(0,insertSliceSize),isLast:!members.length}){setTimeout(function(){if(lastRow.parentNode){var result=rowTag.insertRows({members:slice},lastRow);
lastRow=result[1]
}if(isLast){row.removeAttribute("insertTimeout")
}},delay)
}delay+=insertInterval
}row.insertTimeout=delay
}}});
Firebug.DOMBasePanel=function(){};
Firebug.DOMBasePanel.prototype=extend(Firebug.Panel,{tag:DirTablePlate.tableTag,getRealObject:function(object){if(!object){return object
}if(object.wrappedJSObject){return object.wrappedJSObject
}return object
},rebuild:function(update,scrollTop){var members=getMembers(this.selection);
expandMembers(members,this.toggles,0,0);
this.showMembers(members,update,scrollTop);
if(!this.parentPanel){updateStatusBar(this)
}},showMembers:function(members,update,scrollTop){if(this.timeouts){for(var i=0;
i<this.timeouts.length;
++i){this.context.clearTimeout(this.timeouts[i])
}delete this.timeouts
}if(!members.length){return this.showEmptyMembers()
}var panelNode=this.panelNode;
var priorScrollTop=scrollTop==undefined?panelNode.scrollTop:scrollTop;
var offscreen=update&&panelNode.firstChild;
var dest=offscreen?panelNode.ownerDocument:panelNode;
var table=this.tag.replace({domPanel:this,toggles:this.toggles},dest);
var tbody=table.lastChild;
var rowTag=DirTablePlate.rowTag;
var panel=this;
var result;
var timeouts=[];
var delay=0;
var renderStart=new Date().getTime();
while(members.length){with({slice:members.splice(0,insertSliceSize),isLast:!members.length}){timeouts.push(this.context.setTimeout(function(){if(!tbody.lastChild){return
}result=rowTag.insertRows({members:slice},tbody.lastChild);
if((panelNode.scrollHeight+panelNode.offsetHeight)>=priorScrollTop){panelNode.scrollTop=priorScrollTop
}},delay));
delay+=insertInterval
}}if(offscreen){timeouts.push(this.context.setTimeout(function(){if(panelNode.firstChild){panelNode.replaceChild(table,panelNode.firstChild)
}else{panelNode.appendChild(table)
}panelNode.scrollTop=priorScrollTop
},delay))
}else{timeouts.push(this.context.setTimeout(function(){panelNode.scrollTop=scrollTop==undefined?0:scrollTop
},delay))
}this.timeouts=timeouts
},showEmptyMembers:function(){FirebugReps.Warning.tag.replace({object:"NoMembersWarning"},this.panelNode)
},findPathObject:function(object){var pathIndex=-1;
for(var i=0;
i<this.objectPath.length;
++i){if(this.getPathObject(i)===object){return i
}}return -1
},getPathObject:function(index){var object=this.objectPath[index];
if(object instanceof Property){return object.getObject()
}else{return object
}},getRowObject:function(row){var object=getRowOwnerObject(row);
return object?object:this.selection
},getRowPropertyValue:function(row){var object=this.getRowObject(row);
object=this.getRealObject(object);
if(object){var propName=getRowName(row);
if(object instanceof jsdIStackFrame){return Firebug.Debugger.evaluate(propName,this.context)
}else{return object[propName]
}}},onMouseMove:function(event){var target=event.srcElement||event.target;
var object=getAncestorByClass(target,"objectLink-element");
object=object?object.repObject:null;
if(object&&instanceOf(object,"Element")&&object.nodeType==1){if(object!=lastHighlightedObject){Firebug.Inspector.drawBoxModel(object);
object=lastHighlightedObject
}}else{Firebug.Inspector.hideBoxModel()
}},create:function(){this.context=Firebug.browser;
this.objectPath=[];
this.propertyPath=[];
this.viewPath=[];
this.pathIndex=-1;
this.toggles={};
Firebug.Panel.create.apply(this,arguments);
this.panelNode.style.padding="0 1px"
},initialize:function(){Firebug.Panel.initialize.apply(this,arguments);
addEvent(this.panelNode,"mousemove",this.onMouseMove)
},shutdown:function(){removeEvent(this.panelNode,"mousemove",this.onMouseMove);
Firebug.Panel.shutdown.apply(this,arguments)
},ishow:function(state){if(this.context.loaded&&!this.selection){if(!state){this.select(null);
return
}if(state.viewPath){this.viewPath=state.viewPath
}if(state.propertyPath){this.propertyPath=state.propertyPath
}var defaultObject=this.getDefaultSelection(this.context);
var selectObject=defaultObject;
if(state.firstSelection){var restored=state.firstSelection(this.context);
if(restored){selectObject=restored;
this.objectPath=[defaultObject,restored]
}else{this.objectPath=[defaultObject]
}}else{this.objectPath=[defaultObject]
}if(this.propertyPath.length>1){for(var i=1;
i<this.propertyPath.length;
++i){var name=this.propertyPath[i];
if(!name){continue
}var object=selectObject;
try{selectObject=object[name]
}catch(exc){selectObject=null
}if(selectObject){this.objectPath.push(new Property(object,name))
}else{this.viewPath.splice(i);
this.propertyPath.splice(i);
this.objectPath.splice(i);
selectObject=this.getPathObject(this.objectPath.length-1);
break
}}}var selection=state.pathIndex<=this.objectPath.length-1?this.getPathObject(state.pathIndex):this.getPathObject(this.objectPath.length-1);
this.select(selection)
}},supportsObject:function(object){if(object==null){return 1000
}if(typeof(object)=="undefined"){return 1000
}else{if(object instanceof SourceLink){return 0
}else{return 1
}}},refresh:function(){this.rebuild(true)
},updateSelection:function(object){var previousIndex=this.pathIndex;
var previousView=previousIndex==-1?null:this.viewPath[previousIndex];
var newPath=this.pathToAppend;
delete this.pathToAppend;
var pathIndex=this.findPathObject(object);
if(newPath||pathIndex==-1){this.toggles={};
if(newPath){if(previousView){if(this.panelNode.scrollTop){previousView.scrollTop=this.panelNode.scrollTop
}var start=previousIndex+1,length=this.objectPath.length-start;
this.objectPath.splice(start,length);
this.propertyPath.splice(start,length);
this.viewPath.splice(start,length)
}var value=this.getPathObject(previousIndex);
if(!value){if(FBTrace.DBG_ERRORS){FBTrace.sysout("dom.updateSelection no pathObject for "+previousIndex+"\n")
}return
}for(var i=0,length=newPath.length;
i<length;
++i){var name=newPath[i];
var object=value;
try{value=value[name]
}catch(exc){if(FBTrace.DBG_ERRORS){FBTrace.sysout("dom.updateSelection FAILS at path_i="+i+" for name:"+name+"\n")
}return
}++this.pathIndex;
this.objectPath.push(new Property(object,name));
this.propertyPath.push(name);
this.viewPath.push({toggles:this.toggles,scrollTop:0})
}}else{this.toggles={};
var win=Firebug.browser.window;
if(object===win){this.pathIndex=0;
this.objectPath=[win];
this.propertyPath=[null];
this.viewPath=[{toggles:this.toggles,scrollTop:0}]
}else{this.pathIndex=1;
this.objectPath=[win,object];
this.propertyPath=[null,null];
this.viewPath=[{toggles:{},scrollTop:0},{toggles:this.toggles,scrollTop:0}]
}}this.panelNode.scrollTop=0;
this.rebuild()
}else{this.pathIndex=pathIndex;
var view=this.viewPath[pathIndex];
this.toggles=view.toggles;
if(previousView&&this.panelNode.scrollTop){previousView.scrollTop=this.panelNode.scrollTop
}this.rebuild(false,view.scrollTop)
}},getObjectPath:function(object){return this.objectPath
},getDefaultSelection:function(){return Firebug.browser.window
}});
var updateStatusBar=function(panel){var path=panel.propertyPath;
var index=panel.pathIndex;
var r=[];
for(var i=0,l=path.length;
i<l;
i++){r.push(i==index?'<a class="fbHover fbButton fbBtnSelected" ':'<a class="fbHover fbButton" ');
r.push("pathIndex=");
r.push(i);
if(isIE6){r.push(' href="javascript:void(0)"')
}r.push(">");
r.push(i==0?"window":path[i]||"Object");
r.push("</a>");
if(i<l-1){r.push('<span class="fbStatusSeparator">&gt;</span>')
}}panel.statusBarNode.innerHTML=r.join("")
};
var DOMMainPanel=Firebug.DOMPanel=function(){};
Firebug.DOMPanel.DirTable=DirTablePlate;
DOMMainPanel.prototype=extend(Firebug.DOMBasePanel.prototype,{onClickStatusBar:function(event){var target=event.srcElement||event.target;
var element=getAncestorByClass(target,"fbHover");
if(element){var pathIndex=element.getAttribute("pathIndex");
if(pathIndex){this.select(this.getPathObject(pathIndex))
}}},selectRow:function(row,target){if(!target){target=row.lastChild.firstChild
}if(!target||!target.repObject){return
}this.pathToAppend=getPath(row);
var valueBox=row.lastChild.firstChild;
if(hasClass(valueBox,"objectBox-array")){var arrayIndex=FirebugReps.Arr.getItemIndex(target);
this.pathToAppend.push(arrayIndex)
}this.select(target.repObject,true)
},onClick:function(event){var target=event.srcElement||event.target;
var repNode=Firebug.getRepNode(target);
if(repNode){var row=getAncestorByClass(target,"memberRow");
if(row){this.selectRow(row,repNode);
cancelEvent(event)
}}},name:"DOM",title:"DOM",searchable:true,statusSeparator:">",options:{hasToolButtons:true,hasStatusBar:true},create:function(){Firebug.DOMBasePanel.prototype.create.apply(this,arguments);
this.onClick=bind(this.onClick,this);
this.onClickStatusBar=bind(this.onClickStatusBar,this);
this.panelNode.style.padding="0 1px"
},initialize:function(oldPanelNode){Firebug.DOMBasePanel.prototype.initialize.apply(this,arguments);
addEvent(this.panelNode,"click",this.onClick);
this.ishow();
addEvent(this.statusBarNode,"click",this.onClickStatusBar)
},shutdown:function(){removeEvent(this.panelNode,"click",this.onClick);
Firebug.DOMBasePanel.prototype.shutdown.apply(this,arguments)
}});
Firebug.registerPanel(DOMMainPanel);
var getMembers=function getMembers(object,level){if(!level){level=0
}var ordinals=[],userProps=[],userClasses=[],userFuncs=[],domProps=[],domFuncs=[],domConstants=[];
try{var domMembers=getDOMMembers(object);
if(object.wrappedJSObject){var insecureObject=object.wrappedJSObject
}else{var insecureObject=object
}if(isIE&&isFunction(object)){addMember("user",userProps,"prototype",object.prototype,level)
}for(var name in insecureObject){if(ignoreVars[name]==1){continue
}var val;
try{val=insecureObject[name]
}catch(exc){if(FBTrace.DBG_ERRORS&&FBTrace.DBG_DOM){FBTrace.sysout("dom.getMembers cannot access "+name,exc)
}}var ordinal=parseInt(name);
if(ordinal||ordinal==0){addMember("ordinal",ordinals,name,val,level)
}else{if(isFunction(val)){if(isClassFunction(val)&&!(name in domMembers)){addMember("userClass",userClasses,name,val,level)
}else{if(name in domMembers){addMember("domFunction",domFuncs,name,val,level,domMembers[name])
}else{addMember("userFunction",userFuncs,name,val,level)
}}}else{var prefix="";
if(name in domMembers&&!(name in domConstantMap)){addMember("dom",domProps,(prefix+name),val,level,domMembers[name])
}else{if(name in domConstantMap){addMember("dom",domConstants,(prefix+name),val,level)
}else{addMember("user",userProps,(prefix+name),val,level)
}}}}}}catch(exc){throw exc;
if(FBTrace.DBG_ERRORS&&FBTrace.DBG_DOM){FBTrace.sysout("dom.getMembers FAILS: ",exc)
}}function sortName(a,b){return a.name>b.name?1:-1
}function sortOrder(a,b){return a.order>b.order?1:-1
}var members=[];
members.push.apply(members,ordinals);
Firebug.showUserProps=true;
Firebug.showUserFuncs=true;
Firebug.showDOMProps=true;
Firebug.showDOMFuncs=true;
Firebug.showDOMConstants=true;
if(Firebug.showUserProps){userProps.sort(sortName);
members.push.apply(members,userProps)
}if(Firebug.showUserFuncs){userClasses.sort(sortName);
members.push.apply(members,userClasses);
userFuncs.sort(sortName);
members.push.apply(members,userFuncs)
}if(Firebug.showDOMProps){domProps.sort(sortName);
members.push.apply(members,domProps)
}if(Firebug.showDOMFuncs){domFuncs.sort(sortName);
members.push.apply(members,domFuncs)
}if(Firebug.showDOMConstants){members.push.apply(members,domConstants)
}return members
};
function expandMembers(members,toggles,offset,level){var expanded=0;
for(var i=offset;
i<members.length;
++i){var member=members[i];
if(member.level>level){break
}if(toggles.hasOwnProperty(member.name)){member.open="opened";
var newMembers=getMembers(member.value,level+1);
var args=[i+1,0];
args.push.apply(args,newMembers);
members.splice.apply(members,args);
expanded+=newMembers.length;
i+=newMembers.length+expandMembers(members,toggles[member.name],i+1,level+1)
}}return expanded
}function isClassFunction(fn){try{for(var name in fn.prototype){return true
}}catch(exc){}return false
}FBL.ErrorCopy=function(message){this.message=message
};
var addMember=function addMember(type,props,name,value,level,order){var rep=Firebug.getRep(value);
var tag=rep.shortTag?rep.shortTag:rep.tag;
var ErrorCopy=function(){};
var valueType=typeof(value);
var hasChildren=hasProperties(value)&&!(value instanceof ErrorCopy)&&(isFunction(value)||(valueType=="object"&&value!=null)||(valueType=="string"&&value.length>Firebug.stringCropLength));
props.push({name:name,value:value,type:type,rowClass:"memberRow-"+type,open:"",order:order,level:level,indent:level*16,hasChildren:hasChildren,tag:tag})
};
var getWatchRowIndex=function getWatchRowIndex(row){var index=-1;
for(;
row&&hasClass(row,"watchRow");
row=row.previousSibling){++index
}return index
};
var getRowName=function getRowName(row){var node=row.firstChild;
return node.textContent?node.textContent:node.innerText
};
var getRowValue=function getRowValue(row){return row.lastChild.firstChild.repObject
};
var getRowOwnerObject=function getRowOwnerObject(row){var parentRow=getParentRow(row);
if(parentRow){return getRowValue(parentRow)
}};
var getParentRow=function getParentRow(row){var level=parseInt(row.getAttribute("level"))-1;
for(row=row.previousSibling;
row;
row=row.previousSibling){if(parseInt(row.getAttribute("level"))==level){return row
}}};
var getPath=function getPath(row){var name=getRowName(row);
var path=[name];
var level=parseInt(row.getAttribute("level"))-1;
for(row=row.previousSibling;
row;
row=row.previousSibling){if(parseInt(row.getAttribute("level"))==level){var name=getRowName(row);
path.splice(0,0,name);
--level
}}return path
};
Firebug.DOM=extend(Firebug.Module,{getPanel:function(){return Firebug.chrome?Firebug.chrome.getPanel("DOM"):null
}});
Firebug.registerModule(Firebug.DOM);
var lastHighlightedObject;
function DOMSidePanel(){}DOMSidePanel.prototype=extend(Firebug.DOMBasePanel.prototype,{selectRow:function(row,target){if(!target){target=row.lastChild.firstChild
}if(!target||!target.repObject){return
}this.pathToAppend=getPath(row);
var valueBox=row.lastChild.firstChild;
if(hasClass(valueBox,"objectBox-array")){var arrayIndex=FirebugReps.Arr.getItemIndex(target);
this.pathToAppend.push(arrayIndex)
}var object=target.repObject;
if(instanceOf(object,"Element")){Firebug.HTML.selectTreeNode(ElementCache(object))
}else{Firebug.chrome.selectPanel("DOM");
Firebug.chrome.getPanel("DOM").select(object,true)
}},onClick:function(event){var target=event.srcElement||event.target;
var repNode=Firebug.getRepNode(target);
if(repNode){var row=getAncestorByClass(target,"memberRow");
if(row){this.selectRow(row,repNode);
cancelEvent(event)
}}},name:"DOMSidePanel",parentPanel:"HTML",title:"DOM",options:{hasToolButtons:true},isInitialized:false,create:function(){Firebug.DOMBasePanel.prototype.create.apply(this,arguments);
this.onClick=bind(this.onClick,this)
},initialize:function(){Firebug.DOMBasePanel.prototype.initialize.apply(this,arguments);
addEvent(this.panelNode,"click",this.onClick);
var selection=ElementCache.get(Firebug.context.persistedState.selectedHTMLElementId);
if(selection){this.select(selection,true)
}},shutdown:function(){removeEvent(this.panelNode,"click",this.onClick);
Firebug.DOMBasePanel.prototype.shutdown.apply(this,arguments)
},reattach:function(oldChrome){this.toggles=oldChrome.getPanel("DOMSidePanel").toggles
}});
Firebug.registerPanel(DOMSidePanel)
}});
FBL.FBTrace={};
(function(){var traceOptions={DBG_TIMESTAMP:1,DBG_INITIALIZE:1,DBG_CHROME:1,DBG_ERRORS:1,DBG_DISPATCH:1,DBG_CSS:1};
this.module=null;
this.initialize=function(){if(!this.messageQueue){this.messageQueue=[]
}for(var name in traceOptions){this[name]=traceOptions[name]
}};
this.sysout=function(){return this.logFormatted(arguments,"")
};
this.dumpProperties=function(title,object){return this.logFormatted("dumpProperties() not supported.","warning")
};
this.dumpStack=function(){return this.logFormatted("dumpStack() not supported.","warning")
};
this.flush=function(module){this.module=module;
var queue=this.messageQueue;
this.messageQueue=[];
for(var i=0;
i<queue.length;
++i){this.writeMessage(queue[i][0],queue[i][1],queue[i][2])
}};
this.getPanel=function(){return this.module?this.module.getPanel():null
};
this.logFormatted=function(objects,className){var html=this.DBG_TIMESTAMP?[getTimestamp()," | "]:[];
var length=objects.length;
for(var i=0;
i<length;
++i){appendText(" ",html);
var object=objects[i];
if(i==0){html.push("<b>");
appendText(object,html);
html.push("</b>")
}else{appendText(object,html)
}}return this.logRow(html,className)
};
this.logRow=function(message,className){var panel=this.getPanel();
if(panel&&panel.panelNode){this.writeMessage(message,className)
}else{this.messageQueue.push([message,className])
}return this.LOG_COMMAND
};
this.writeMessage=function(message,className){var container=this.getPanel().containerNode;
var isScrolledToBottom=container.scrollTop+container.offsetHeight>=container.scrollHeight;
this.writeRow.call(this,message,className);
if(isScrolledToBottom){container.scrollTop=container.scrollHeight-container.offsetHeight
}};
this.appendRow=function(row){var container=this.getPanel().panelNode;
container.appendChild(row)
};
this.writeRow=function(message,className){var row=this.getPanel().panelNode.ownerDocument.createElement("div");
row.className="logRow"+(className?" logRow-"+className:"");
row.innerHTML=message.join("");
this.appendRow(row)
};
function appendText(object,html){html.push(escapeHTML(objectToString(object)))
}function getTimestamp(){var now=new Date();
var ms=""+(now.getMilliseconds()/1000).toFixed(3);
ms=ms.substr(2);
return now.toLocaleTimeString()+"."+ms
}var HTMLtoEntity={"<":"&lt;",">":"&gt;","&":"&amp;","'":"&#39;",'"':"&quot;"};
function replaceChars(ch){return HTMLtoEntity[ch]
}function escapeHTML(value){return(value+"").replace(/[<>&"']/g,replaceChars)
}function objectToString(object){try{return object+""
}catch(exc){return null
}}}).apply(FBL.FBTrace);
FBL.ns(function(){with(FBL){if(!Env.Options.enableTrace){return
}Firebug.Trace=extend(Firebug.Module,{getPanel:function(){return Firebug.chrome?Firebug.chrome.getPanel("Trace"):null
},clear:function(){this.getPanel().panelNode.innerHTML=""
}});
Firebug.registerModule(Firebug.Trace);
function TracePanel(){}TracePanel.prototype=extend(Firebug.Panel,{name:"Trace",title:"Trace",options:{hasToolButtons:true,innerHTMLSync:true},create:function(){Firebug.Panel.create.apply(this,arguments);
this.clearButton=new Button({caption:"Clear",title:"Clear FBTrace logs",owner:Firebug.Trace,onClick:Firebug.Trace.clear})
},initialize:function(){Firebug.Panel.initialize.apply(this,arguments);
this.clearButton.initialize()
},shutdown:function(){this.clearButton.shutdown();
Firebug.Panel.shutdown.apply(this,arguments)
}});
Firebug.registerPanel(TracePanel)
}});
FBL.ns(function(){with(FBL){var modules=[];
var panelTypes=[];
var panelTypeMap={};
var parentPanelMap={};
var registerModule=Firebug.registerModule;
var registerPanel=Firebug.registerPanel;
append(Firebug,{extend:function(fn){if(Firebug.chrome&&Firebug.chrome.addPanel){var namespace=ns(fn);
fn.call(namespace,FBL)
}else{setTimeout(function(){Firebug.extend(fn)
},100)
}},registerModule:function(){registerModule.apply(Firebug,arguments);
modules.push.apply(modules,arguments);
dispatch(modules,"initialize",[]);
if(FBTrace.DBG_INITIALIZE){FBTrace.sysout("Firebug.registerModule")
}},registerPanel:function(){registerPanel.apply(Firebug,arguments);
panelTypes.push.apply(panelTypes,arguments);
for(var i=0,panelType;
panelType=arguments[i];
++i){if(panelType.prototype.name=="Dev"){continue
}panelTypeMap[panelType.prototype.name]=arguments[i];
var parentPanelName=panelType.prototype.parentPanel;
if(parentPanelName){parentPanelMap[parentPanelName]=1
}else{var panelName=panelType.prototype.name;
var chrome=Firebug.chrome;
chrome.addPanel(panelName);
var onTabClick=function onTabClick(){chrome.selectPanel(panelName);
return false
};
chrome.addController([chrome.panelMap[panelName].tabNode,"mousedown",onTabClick])
}}if(FBTrace.DBG_INITIALIZE){for(var i=0;
i<arguments.length;
++i){FBTrace.sysout("Firebug.registerPanel",arguments[i].prototype.name)
}}}})
}});
FBL.ns(function(){with(FBL){FirebugChrome.Skin={CSS:'.obscured{left:-999999px !important;}.collapsed{display:none;}[collapsed="true"]{display:none;}#fbCSS{padding:0 !important;}.cssPropDisable{float:left;display:block;width:2em;cursor:default;}.infoTip{z-index:2147483647;position:fixed;padding:2px 3px;border:1px solid #CBE087;background:LightYellow;font-family:Monaco,monospace;color:#000000;display:none;white-space:nowrap;pointer-events:none;}.infoTip[active="true"]{display:block;}.infoTipLoading{width:16px;height:16px;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/loading_16.gif) no-repeat;}.infoTipImageBox{font-size:11px;min-width:100px;text-align:center;}.infoTipCaption{font-size:11px;font:Monaco,monospace;}.infoTipLoading > .infoTipImage,.infoTipLoading > .infoTipCaption{display:none;}h1.groupHeader{padding:2px 4px;margin:0 0 4px 0;border-top:1px solid #CCCCCC;border-bottom:1px solid #CCCCCC;background:#eee url(https://getfirebug.com/releases/lite/latest/skin/xp/group.gif) repeat-x;font-size:11px;font-weight:bold;_position:relative;}.inlineEditor,.fixedWidthEditor{z-index:2147483647;position:absolute;display:none;}.inlineEditor{margin-left:-6px;margin-top:-3px;}.textEditorInner,.fixedWidthEditor{margin:0 0 0 0 !important;padding:0;border:none !important;font:inherit;text-decoration:inherit;background-color:#FFFFFF;}.fixedWidthEditor{border-top:1px solid #888888 !important;border-bottom:1px solid #888888 !important;}.textEditorInner{position:relative;top:-7px;left:-5px;outline:none;resize:none;}.textEditorInner1{padding-left:11px;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/textEditorBorders.png) repeat-y;_background:url(https://getfirebug.com/releases/lite/latest/skin/xp/textEditorBorders.gif) repeat-y;_overflow:hidden;}.textEditorInner2{position:relative;padding-right:2px;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/textEditorBorders.png) repeat-y 100% 0;_background:url(https://getfirebug.com/releases/lite/latest/skin/xp/textEditorBorders.gif) repeat-y 100% 0;_position:fixed;}.textEditorTop1{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/textEditorCorners.png) no-repeat 100% 0;margin-left:11px;height:10px;_background:url(https://getfirebug.com/releases/lite/latest/skin/xp/textEditorCorners.gif) no-repeat 100% 0;_overflow:hidden;}.textEditorTop2{position:relative;left:-11px;width:11px;height:10px;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/textEditorCorners.png) no-repeat;_background:url(https://getfirebug.com/releases/lite/latest/skin/xp/textEditorCorners.gif) no-repeat;}.textEditorBottom1{position:relative;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/textEditorCorners.png) no-repeat 100% 100%;margin-left:11px;height:12px;_background:url(https://getfirebug.com/releases/lite/latest/skin/xp/textEditorCorners.gif) no-repeat 100% 100%;}.textEditorBottom2{position:relative;left:-11px;width:11px;height:12px;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/textEditorCorners.png) no-repeat 0 100%;_background:url(https://getfirebug.com/releases/lite/latest/skin/xp/textEditorCorners.gif) no-repeat 0 100%;}.panelNode-css{overflow-x:hidden;}.cssSheet > .insertBefore{height:1.5em;}.cssRule{position:relative;margin:0;padding:1em 0 0 6px;font-family:Monaco,monospace;color:#000000;}.cssRule:first-child{padding-top:6px;}.cssElementRuleContainer{position:relative;}.cssHead{padding-right:150px;}.cssProp{}.cssPropName{color:DarkGreen;}.cssPropValue{margin-left:8px;color:DarkBlue;}.cssOverridden span{text-decoration:line-through;}.cssInheritedRule{}.cssInheritLabel{margin-right:0.5em;font-weight:bold;}.cssRule .objectLink-sourceLink{top:0;}.cssProp.editGroup:hover{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/disable.png) no-repeat 2px 1px;_background:url(https://getfirebug.com/releases/lite/latest/skin/xp/disable.gif) no-repeat 2px 1px;}.cssProp.editGroup.editing{background:none;}.cssProp.disabledStyle{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/disableHover.png) no-repeat 2px 1px;_background:url(https://getfirebug.com/releases/lite/latest/skin/xp/disableHover.gif) no-repeat 2px 1px;opacity:1;color:#CCCCCC;}.disabledStyle .cssPropName,.disabledStyle .cssPropValue{color:#CCCCCC;}.cssPropValue.editing + .cssSemi,.inlineExpander + .cssSemi{display:none;}.cssPropValue.editing{white-space:nowrap;}.stylePropName{font-weight:bold;padding:0 4px 4px 4px;width:50%;}.stylePropValue{width:50%;}.panelNode-net{overflow-x:hidden;}.netTable{width:100%;}.hideCategory-undefined .category-undefined,.hideCategory-html .category-html,.hideCategory-css .category-css,.hideCategory-js .category-js,.hideCategory-image .category-image,.hideCategory-xhr .category-xhr,.hideCategory-flash .category-flash,.hideCategory-txt .category-txt,.hideCategory-bin .category-bin{display:none;}.netHeadRow{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/group.gif) repeat-x #FFFFFF;}.netHeadCol{border-bottom:1px solid #CCCCCC;padding:2px 4px 2px 18px;font-weight:bold;}.netHeadLabel{white-space:nowrap;overflow:hidden;}.netHeaderRow{height:16px;}.netHeaderCell{cursor:pointer;-moz-user-select:none;border-bottom:1px solid #9C9C9C;padding:0 !important;font-weight:bold;background:#BBBBBB url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/tableHeader.gif) repeat-x;white-space:nowrap;}.netHeaderRow > .netHeaderCell:first-child > .netHeaderCellBox{padding:2px 14px 2px 18px;}.netHeaderCellBox{padding:2px 14px 2px 10px;border-left:1px solid #D9D9D9;border-right:1px solid #9C9C9C;}.netHeaderCell:hover:active{background:#959595 url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/tableHeaderActive.gif) repeat-x;}.netHeaderSorted{background:#7D93B2 url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/tableHeaderSorted.gif) repeat-x;}.netHeaderSorted > .netHeaderCellBox{border-right-color:#6B7C93;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/arrowDown.png) no-repeat right;}.netHeaderSorted.sortedAscending > .netHeaderCellBox{background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/arrowUp.png);}.netHeaderSorted:hover:active{background:#536B90 url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/tableHeaderSortedActive.gif) repeat-x;}.panelNode-net .netRowHeader{display:block;}.netRowHeader{cursor:pointer;display:none;height:15px;margin-right:0 !important;}.netRow .netRowHeader{background-position:5px 1px;}.netRow[breakpoint="true"] .netRowHeader{background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/breakpoint.png);}.netRow[breakpoint="true"][disabledBreakpoint="true"] .netRowHeader{background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/breakpointDisabled.png);}.netRow.category-xhr:hover .netRowHeader{background-color:#F6F6F6;}#netBreakpointBar{max-width:38px;}#netHrefCol > .netHeaderCellBox{border-left:0px;}.netRow .netRowHeader{width:3px;}.netInfoRow .netRowHeader{display:table-cell;}.netTable[hiddenCols~=netHrefCol] TD[id="netHrefCol"],.netTable[hiddenCols~=netHrefCol] TD.netHrefCol,.netTable[hiddenCols~=netStatusCol] TD[id="netStatusCol"],.netTable[hiddenCols~=netStatusCol] TD.netStatusCol,.netTable[hiddenCols~=netDomainCol] TD[id="netDomainCol"],.netTable[hiddenCols~=netDomainCol] TD.netDomainCol,.netTable[hiddenCols~=netSizeCol] TD[id="netSizeCol"],.netTable[hiddenCols~=netSizeCol] TD.netSizeCol,.netTable[hiddenCols~=netTimeCol] TD[id="netTimeCol"],.netTable[hiddenCols~=netTimeCol] TD.netTimeCol{display:none;}.netRow{background:LightYellow;}.netRow.loaded{background:#FFFFFF;}.netRow.loaded:hover{background:#EFEFEF;}.netCol{padding:0;vertical-align:top;border-bottom:1px solid #EFEFEF;white-space:nowrap;height:17px;}.netLabel{width:100%;}.netStatusCol{padding-left:10px;color:rgb(128,128,128);}.responseError > .netStatusCol{color:red;}.netDomainCol{padding-left:5px;}.netSizeCol{text-align:right;padding-right:10px;}.netHrefLabel{-moz-box-sizing:padding-box;overflow:hidden;z-index:10;position:absolute;padding-left:18px;padding-top:1px;max-width:15%;font-weight:bold;}.netFullHrefLabel{display:none;-moz-user-select:none;padding-right:10px;padding-bottom:3px;max-width:100%;background:#FFFFFF;z-index:200;}.netHrefCol:hover > .netFullHrefLabel{display:block;}.netRow.loaded:hover .netCol > .netFullHrefLabel{background-color:#EFEFEF;}.useA11y .a11yShowFullLabel{display:block;background-image:none !important;border:1px solid #CBE087;background-color:LightYellow;font-family:Monaco,monospace;color:#000000;font-size:10px;z-index:2147483647;}.netSizeLabel{padding-left:6px;}.netStatusLabel,.netDomainLabel,.netSizeLabel,.netBar{padding:1px 0 2px 0 !important;}.responseError{color:red;}.hasHeaders .netHrefLabel:hover{cursor:pointer;color:blue;text-decoration:underline;}.netLoadingIcon{position:absolute;border:0;margin-left:14px;width:16px;height:16px;background:transparent no-repeat 0 0;background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/loading_16.gif);display:inline-block;}.loaded .netLoadingIcon{display:none;}.netBar,.netSummaryBar{position:relative;border-right:50px solid transparent;}.netResolvingBar{position:absolute;left:0;top:0;bottom:0;background:#FFFFFF url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/netBarResolving.gif) repeat-x;z-index:60;}.netConnectingBar{position:absolute;left:0;top:0;bottom:0;background:#FFFFFF url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/netBarConnecting.gif) repeat-x;z-index:50;}.netBlockingBar{position:absolute;left:0;top:0;bottom:0;background:#FFFFFF url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/netBarWaiting.gif) repeat-x;z-index:40;}.netSendingBar{position:absolute;left:0;top:0;bottom:0;background:#FFFFFF url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/netBarSending.gif) repeat-x;z-index:30;}.netWaitingBar{position:absolute;left:0;top:0;bottom:0;background:#FFFFFF url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/netBarResponded.gif) repeat-x;z-index:20;min-width:1px;}.netReceivingBar{position:absolute;left:0;top:0;bottom:0;background:#38D63B url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/netBarLoading.gif) repeat-x;z-index:10;}.netWindowLoadBar,.netContentLoadBar{position:absolute;left:0;top:0;bottom:0;width:1px;background-color:red;z-index:70;opacity:0.5;display:none;margin-bottom:-1px;}.netContentLoadBar{background-color:Blue;}.netTimeLabel{-moz-box-sizing:padding-box;position:absolute;top:1px;left:100%;padding-left:6px;color:#444444;min-width:16px;}.loaded .netReceivingBar,.loaded.netReceivingBar{background:#B6B6B6 url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/netBarLoaded.gif) repeat-x;border-color:#B6B6B6;}.fromCache .netReceivingBar,.fromCache.netReceivingBar{background:#D6D6D6 url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/netBarCached.gif) repeat-x;border-color:#D6D6D6;}.netSummaryRow .netTimeLabel,.loaded .netTimeLabel{background:transparent;}.timeInfoTip{width:150px; height:40px}.timeInfoTipBar,.timeInfoTipEventBar{position:relative;display:block;margin:0;opacity:1;height:15px;width:4px;}.timeInfoTipEventBar{width:1px !important;}.timeInfoTipCell.startTime{padding-right:8px;}.timeInfoTipCell.elapsedTime{text-align:right;padding-right:8px;}.sizeInfoLabelCol{font-weight:bold;padding-right:10px;font-family:Lucida Grande,Tahoma,sans-serif;font-size:11px;}.sizeInfoSizeCol{font-weight:bold;}.sizeInfoDetailCol{color:gray;text-align:right;}.sizeInfoDescCol{font-style:italic;}.netSummaryRow .netReceivingBar{background:#BBBBBB;border:none;}.netSummaryLabel{color:#222222;}.netSummaryRow{background:#BBBBBB !important;font-weight:bold;}.netSummaryRow .netBar{border-right-color:#BBBBBB;}.netSummaryRow > .netCol{border-top:1px solid #999999;border-bottom:2px solid;-moz-border-bottom-colors:#EFEFEF #999999;padding-top:1px;padding-bottom:2px;}.netSummaryRow > .netHrefCol:hover{background:transparent !important;}.netCountLabel{padding-left:18px;}.netTotalSizeCol{text-align:right;padding-right:10px;}.netTotalTimeCol{text-align:right;}.netCacheSizeLabel{position:absolute;z-index:1000;left:0;top:0;}.netLimitRow{background:rgb(255,255,225) !important;font-weight:normal;color:black;font-weight:normal;}.netLimitLabel{padding-left:18px;}.netLimitRow > .netCol{border-bottom:2px solid;-moz-border-bottom-colors:#EFEFEF #999999;vertical-align:middle !important;padding-top:2px;padding-bottom:2px;}.netLimitButton{font-size:11px;padding-top:1px;padding-bottom:1px;}.netInfoCol{border-top:1px solid #EEEEEE;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/group.gif) repeat-x #FFFFFF;}.netInfoBody{margin:10px 0 4px 10px;}.netInfoTabs{position:relative;padding-left:17px;}.netInfoTab{position:relative;top:-3px;margin-top:10px;padding:4px 6px;border:1px solid transparent;border-bottom:none;_border:none;font-weight:bold;color:#565656;cursor:pointer;}.netInfoTabSelected{cursor:default !important;border:1px solid #D7D7D7 !important;border-bottom:none !important;-moz-border-radius:4px 4px 0 0;-webkit-border-radius:4px 4px 0 0;border-radius:4px 4px 0 0;background-color:#FFFFFF;}.logRow-netInfo.error .netInfoTitle{color:red;}.logRow-netInfo.loading .netInfoResponseText{font-style:italic;color:#888888;}.loading .netInfoResponseHeadersTitle{display:none;}.netInfoResponseSizeLimit{font-family:Lucida Grande,Tahoma,sans-serif;padding-top:10px;font-size:11px;}.netInfoText{display:none;margin:0;border:1px solid #D7D7D7;border-right:none;padding:8px;background-color:#FFFFFF;font-family:Monaco,monospace;white-space:pre-wrap;}.netInfoTextSelected{display:block;}.netInfoParamName{padding-right:10px;font-family:Lucida Grande,Tahoma,sans-serif;font-weight:bold;vertical-align:top;text-align:right;white-space:nowrap;}.netInfoPostText .netInfoParamName{width:1px;}.netInfoParamValue{width:100%;}.netInfoHeadersText,.netInfoPostText,.netInfoPutText{padding-top:0;}.netInfoHeadersGroup,.netInfoPostParams,.netInfoPostSource{margin-bottom:4px;border-bottom:1px solid #D7D7D7;padding-top:8px;padding-bottom:2px;font-family:Lucida Grande,Tahoma,sans-serif;font-weight:bold;color:#565656;}.netInfoPostParamsTable,.netInfoPostPartsTable,.netInfoPostJSONTable,.netInfoPostXMLTable,.netInfoPostSourceTable{margin-bottom:10px;width:100%;}.netInfoPostContentType{color:#bdbdbd;padding-left:50px;font-weight:normal;}.netInfoHtmlPreview{border:0;width:100%;height:100%;}.netHeadersViewSource{color:#bdbdbd;margin-left:200px;font-weight:normal;}.netHeadersViewSource:hover{color:blue;cursor:pointer;}.netActivationRow,.netPageSeparatorRow{background:rgb(229,229,229) !important;font-weight:normal;color:black;}.netActivationLabel{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/chrome://firebug/skin/infoIcon.png) no-repeat 3px 2px;padding-left:22px;}.netPageSeparatorRow{height:5px !important;}.netPageSeparatorLabel{padding-left:22px;height:5px !important;}.netPageRow{background-color:rgb(255,255,255);}.netPageRow:hover{background:#EFEFEF;}.netPageLabel{padding:1px 0 2px 18px !important;font-weight:bold;}.netActivationRow > .netCol{border-bottom:2px solid;-moz-border-bottom-colors:#EFEFEF #999999;padding-top:2px;padding-bottom:3px;}.twisty,.logRow-errorMessage > .hasTwisty > .errorTitle,.logRow-log > .objectBox-array.hasTwisty,.logRow-spy .spyHead .spyTitle,.logGroup > .logRow,.memberRow.hasChildren > .memberLabelCell > .memberLabel,.hasHeaders .netHrefLabel,.netPageRow > .netCol > .netPageTitle{background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/tree_open.gif);background-repeat:no-repeat;background-position:2px 2px;min-height:12px;}.logRow-errorMessage > .hasTwisty.opened > .errorTitle,.logRow-log > .objectBox-array.hasTwisty.opened,.logRow-spy.opened .spyHead .spyTitle,.logGroup.opened > .logRow,.memberRow.hasChildren.opened > .memberLabelCell > .memberLabel,.nodeBox.highlightOpen > .nodeLabel > .twisty,.nodeBox.open > .nodeLabel > .twisty,.netRow.opened > .netCol > .netHrefLabel,.netPageRow.opened > .netCol > .netPageTitle{background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/tree_close.gif);}.twisty{background-position:4px 4px;}* html .logRow-spy .spyHead .spyTitle,* html .logGroup .logGroupLabel,* html .hasChildren .memberLabelCell .memberLabel,* html .hasHeaders .netHrefLabel{background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/tree_open.gif);background-repeat:no-repeat;background-position:2px 2px;}* html .opened .spyHead .spyTitle,* html .opened .logGroupLabel,* html .opened .memberLabelCell .memberLabel{background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/tree_close.gif);background-repeat:no-repeat;background-position:2px 2px;}.panelNode-console{overflow-x:hidden;}.objectLink{text-decoration:none;}.objectLink:hover{cursor:pointer;text-decoration:underline;}.logRow{position:relative;margin:0;border-bottom:1px solid #D7D7D7;padding:2px 4px 1px 6px;background-color:#FFFFFF;overflow:hidden !important;}.useA11y .logRow:focus{border-bottom:1px solid #000000 !important;outline:none !important;background-color:#FFFFAD !important;}.useA11y .logRow:focus a.objectLink-sourceLink{background-color:#FFFFAD;}.useA11y .a11yFocus:focus,.useA11y .objectBox:focus{outline:2px solid #FF9933;background-color:#FFFFAD;}.useA11y .objectBox-null:focus,.useA11y .objectBox-undefined:focus{background-color:#888888 !important;}.useA11y .logGroup.opened > .logRow{border-bottom:1px solid #ffffff;}.logGroup{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/group.gif) repeat-x #FFFFFF;padding:0 !important;border:none !important;}.logGroupBody{display:none;margin-left:16px;border-left:1px solid #D7D7D7;border-top:1px solid #D7D7D7;background:#FFFFFF;}.logGroup > .logRow{background-color:transparent !important;font-weight:bold;}.logGroup.opened > .logRow{border-bottom:none;}.logGroup.opened > .logGroupBody{display:block;}.logRow-command > .objectBox-text{font-family:Monaco,monospace;color:#0000FF;white-space:pre-wrap;}.logRow-info,.logRow-warn,.logRow-error,.logRow-assert,.logRow-warningMessage,.logRow-errorMessage{padding-left:22px;background-repeat:no-repeat;background-position:4px 2px;}.logRow-assert,.logRow-warningMessage,.logRow-errorMessage{padding-top:0;padding-bottom:0;}.logRow-info,.logRow-info .objectLink-sourceLink{background-color:#FFFFFF;}.logRow-warn,.logRow-warningMessage,.logRow-warn .objectLink-sourceLink,.logRow-warningMessage .objectLink-sourceLink{background-color:cyan;}.logRow-error,.logRow-assert,.logRow-errorMessage,.logRow-error .objectLink-sourceLink,.logRow-errorMessage .objectLink-sourceLink{background-color:LightYellow;}.logRow-error,.logRow-assert,.logRow-errorMessage{color:#FF0000;}.logRow-info{}.logRow-warn,.logRow-warningMessage{}.logRow-error,.logRow-assert,.logRow-errorMessage{}.objectBox-string,.objectBox-text,.objectBox-number,.objectLink-element,.objectLink-textNode,.objectLink-function,.objectBox-stackTrace,.objectLink-profile{font-family:Monaco,monospace;}.objectBox-string,.objectBox-text,.objectLink-textNode{white-space:pre-wrap;}.objectBox-number,.objectLink-styleRule,.objectLink-element,.objectLink-textNode{color:#000088;}.objectBox-string{color:#FF0000;}.objectLink-function,.objectBox-stackTrace,.objectLink-profile{color:DarkGreen;}.objectBox-null,.objectBox-undefined{padding:0 2px;border:1px solid #666666;background-color:#888888;color:#FFFFFF;}.objectBox-exception{padding:0 2px 0 18px;color:red;}.objectLink-sourceLink{position:absolute;right:4px;top:2px;padding-left:8px;font-family:Lucida Grande,sans-serif;font-weight:bold;color:#0000FF;}.errorTitle{margin-top:0px;margin-bottom:1px;padding-top:2px;padding-bottom:2px;}.errorTrace{margin-left:17px;}.errorSourceBox{margin:2px 0;}.errorSource-none{display:none;}.errorSource-syntax > .errorBreak{visibility:hidden;}.errorSource{cursor:pointer;font-family:Monaco,monospace;color:DarkGreen;}.errorSource:hover{text-decoration:underline;}.errorBreak{cursor:pointer;display:none;margin:0 6px 0 0;width:13px;height:14px;vertical-align:bottom;opacity:0.1;}.hasBreakSwitch .errorBreak{display:inline;}.breakForError .errorBreak{opacity:1;}.assertDescription{margin:0;}.logRow-profile > .logRow > .objectBox-text{font-family:Lucida Grande,Tahoma,sans-serif;color:#000000;}.logRow-profile > .logRow > .objectBox-text:last-child{color:#555555;font-style:italic;}.logRow-profile.opened > .logRow{padding-bottom:4px;}.profilerRunning > .logRow{padding-left:22px !important;}.profileSizer{width:100%;overflow-x:auto;overflow-y:scroll;}.profileTable{border-bottom:1px solid #D7D7D7;padding:0 0 4px 0;}.profileTable tr[odd="1"]{background-color:#F5F5F5;vertical-align:middle;}.profileTable a{vertical-align:middle;}.profileTable td{padding:1px 4px 0 4px;}.headerCell{cursor:pointer;-moz-user-select:none;border-bottom:1px solid #9C9C9C;padding:0 !important;font-weight:bold;}.headerCellBox{padding:2px 4px;border-left:1px solid #D9D9D9;border-right:1px solid #9C9C9C;}.headerCell:hover:active{}.headerSorted{}.headerSorted > .headerCellBox{border-right-color:#6B7C93;}.headerSorted.sortedAscending > .headerCellBox{}.headerSorted:hover:active{}.linkCell{text-align:right;}.linkCell > .objectLink-sourceLink{position:static;}.logRow-stackTrace{padding-top:0;background:#f8f8f8;}.logRow-stackTrace > .objectBox-stackFrame{position:relative;padding-top:2px;}.objectLink-object{font-family:Lucida Grande,sans-serif;font-weight:bold;color:DarkGreen;white-space:pre-wrap;}.objectProp-object{color:DarkGreen;}.objectProps{color:#000;font-weight:normal;}.objectPropName{color:#777;}.objectProps .objectProp-string{color:#f55;}.objectProps .objectProp-number{color:#55a;}.objectProps .objectProp-object{color:#585;}.selectorTag,.selectorId,.selectorClass{font-family:Monaco,monospace;font-weight:normal;}.selectorTag{color:#0000FF;}.selectorId{color:DarkBlue;}.selectorClass{color:red;}.selectorHidden > .selectorTag{color:#5F82D9;}.selectorHidden > .selectorId{color:#888888;}.selectorHidden > .selectorClass{color:#D86060;}.selectorValue{font-family:Lucida Grande,sans-serif;font-style:italic;color:#555555;}.panelNode.searching .logRow{display:none;}.logRow.matched{display:block !important;}.logRow.matching{position:absolute;left:-1000px;top:-1000px;max-width:0;max-height:0;overflow:hidden;}.objectLeftBrace,.objectRightBrace,.objectEqual,.objectComma,.arrayLeftBracket,.arrayRightBracket,.arrayComma{font-family:Monaco,monospace;}.objectLeftBrace,.objectRightBrace,.arrayLeftBracket,.arrayRightBracket{font-weight:bold;}.objectLeftBrace,.arrayLeftBracket{margin-right:4px;}.objectRightBrace,.arrayRightBracket{margin-left:4px;}.logRow-dir{padding:0;}.logRow-errorMessage .hasTwisty .errorTitle,.logRow-spy .spyHead .spyTitle,.logGroup .logRow{cursor:pointer;padding-left:18px;background-repeat:no-repeat;background-position:3px 3px;}.logRow-errorMessage > .hasTwisty > .errorTitle{background-position:2px 3px;}.logRow-errorMessage > .hasTwisty > .errorTitle:hover,.logRow-spy .spyHead .spyTitle:hover,.logGroup > .logRow:hover{text-decoration:underline;}.logRow-spy{padding:0 !important;}.logRow-spy,.logRow-spy .objectLink-sourceLink{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/group.gif) repeat-x #FFFFFF;padding-right:4px;right:0;}.logRow-spy.opened{padding-bottom:4px;border-bottom:none;}.spyTitle{color:#000000;font-weight:bold;-moz-box-sizing:padding-box;overflow:hidden;z-index:100;padding-left:18px;}.spyCol{padding:0;white-space:nowrap;height:16px;}.spyTitleCol:hover > .objectLink-sourceLink,.spyTitleCol:hover > .spyTime,.spyTitleCol:hover > .spyStatus,.spyTitleCol:hover > .spyTitle{display:none;}.spyFullTitle{display:none;-moz-user-select:none;max-width:100%;background-color:Transparent;}.spyTitleCol:hover > .spyFullTitle{display:block;}.spyStatus{padding-left:10px;color:rgb(128,128,128);}.spyTime{margin-left:4px;margin-right:4px;color:rgb(128,128,128);}.spyIcon{margin-right:4px;margin-left:4px;width:16px;height:16px;vertical-align:middle;background:transparent no-repeat 0 0;display:none;}.loading .spyHead .spyRow .spyIcon{background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/loading_16.gif);display:block;}.logRow-spy.loaded:not(.error) .spyHead .spyRow .spyIcon{width:0;margin:0;}.logRow-spy.error .spyHead .spyRow .spyIcon{background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/errorIcon-sm.png);display:block;background-position:2px 2px;}.logRow-spy .spyHead .netInfoBody{display:none;}.logRow-spy.opened .spyHead .netInfoBody{margin-top:10px;display:block;}.logRow-spy.error .spyTitle,.logRow-spy.error .spyStatus,.logRow-spy.error .spyTime{color:red;}.logRow-spy.loading .spyResponseText{font-style:italic;color:#888888;}.caption{font-family:Lucida Grande,Tahoma,sans-serif;font-weight:bold;color:#444444;}.warning{padding:10px;font-family:Lucida Grande,Tahoma,sans-serif;font-weight:bold;color:#888888;}.panelNode-dom{overflow-x:hidden !important;}.domTable{font-size:1em;width:100%;table-layout:fixed;background:#fff;}.domTableIE{width:auto;}.memberLabelCell{padding:2px 0 2px 0;vertical-align:top;}.memberValueCell{padding:1px 0 1px 5px;display:block;overflow:hidden;}.memberLabel{display:block;cursor:default;-moz-user-select:none;overflow:hidden;padding-left:18px;background-color:#FFFFFF;text-decoration:none;}.memberRow.hasChildren .memberLabelCell .memberLabel:hover{cursor:pointer;color:blue;text-decoration:underline;}.userLabel{color:#000000;font-weight:bold;}.userClassLabel{color:#E90000;font-weight:bold;}.userFunctionLabel{color:#025E2A;font-weight:bold;}.domLabel{color:#000000;}.domFunctionLabel{color:#025E2A;}.ordinalLabel{color:SlateBlue;font-weight:bold;}.scopesRow{padding:2px 18px;background-color:LightYellow;border-bottom:5px solid #BEBEBE;color:#666666;}.scopesLabel{background-color:LightYellow;}.watchEditCell{padding:2px 18px;background-color:LightYellow;border-bottom:1px solid #BEBEBE;color:#666666;}.editor-watchNewRow,.editor-memberRow{font-family:Monaco,monospace !important;}.editor-memberRow{padding:1px 0 !important;}.editor-watchRow{padding-bottom:0 !important;}.watchRow > .memberLabelCell{font-family:Monaco,monospace;padding-top:1px;padding-bottom:1px;}.watchRow > .memberLabelCell > .memberLabel{background-color:transparent;}.watchRow > .memberValueCell{padding-top:2px;padding-bottom:2px;}.watchRow > .memberLabelCell,.watchRow > .memberValueCell{background-color:#F5F5F5;border-bottom:1px solid #BEBEBE;}.watchToolbox{z-index:2147483647;position:absolute;right:0;padding:1px 2px;}#fbConsole{overflow-x:hidden !important;}#fbCSS{font:1em Monaco,monospace;padding:0 7px;}#fbstylesheetButtons select,#fbScriptButtons select{font:11px Lucida Grande,Tahoma,sans-serif;margin-top:1px;padding-left:3px;background:#fafafa;border:1px inset #fff;width:220px;outline:none;}.Selector{margin-top:10px}.CSSItem{margin-left:4%}.CSSText{padding-left:20px;}.CSSProperty{color:#005500;}.CSSValue{padding-left:5px; color:#000088;}#fbHTMLStatusBar{display:inline;}.fbToolbarButtons{display:none;}.fbStatusSeparator{display:block;float:left;padding-top:4px;}#fbStatusBarBox{display:none;}#fbToolbarContent{display:block;position:absolute;_position:absolute;top:0;padding-top:4px;height:23px;clip:rect(0,2048px,27px,0);}.fbTabMenuTarget{display:none !important;float:left;width:10px;height:10px;margin-top:6px;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/tabMenuTarget.png);}.fbTabMenuTarget:hover{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/tabMenuTargetHover.png);}.fbShadow{float:left;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/shadowAlpha.png) no-repeat bottom right !important;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/shadow2.gif) no-repeat bottom right;margin:10px 0 0 10px !important;margin:10px 0 0 5px;}.fbShadowContent{display:block;position:relative;background-color:#fff;border:1px solid #a9a9a9;top:-6px;left:-6px;}.fbMenu{display:none;position:absolute;font-size:11px;line-height:13px;z-index:2147483647;}.fbMenuContent{padding:2px;}.fbMenuSeparator{display:block;position:relative;padding:1px 18px 0;text-decoration:none;color:#000;cursor:default;background:#ACA899;margin:4px 0;}.fbMenuOption{display:block;position:relative;padding:2px 18px;text-decoration:none;color:#000;cursor:default;}.fbMenuOption:hover{color:#fff;background:#316AC5;}.fbMenuGroup{background:transparent url(https://getfirebug.com/releases/lite/latest/skin/xp/tabMenuPin.png) no-repeat right 0;}.fbMenuGroup:hover{background:#316AC5 url(https://getfirebug.com/releases/lite/latest/skin/xp/tabMenuPin.png) no-repeat right -17px;}.fbMenuGroupSelected{color:#fff;background:#316AC5 url(https://getfirebug.com/releases/lite/latest/skin/xp/tabMenuPin.png) no-repeat right -17px;}.fbMenuChecked{background:transparent url(https://getfirebug.com/releases/lite/latest/skin/xp/tabMenuCheckbox.png) no-repeat 4px 0;}.fbMenuChecked:hover{background:#316AC5 url(https://getfirebug.com/releases/lite/latest/skin/xp/tabMenuCheckbox.png) no-repeat 4px -17px;}.fbMenuRadioSelected{background:transparent url(https://getfirebug.com/releases/lite/latest/skin/xp/tabMenuRadio.png) no-repeat 4px 0;}.fbMenuRadioSelected:hover{background:#316AC5 url(https://getfirebug.com/releases/lite/latest/skin/xp/tabMenuRadio.png) no-repeat 4px -17px;}.fbMenuShortcut{padding-right:85px;}.fbMenuShortcutKey{position:absolute;right:0;top:2px;width:77px;}#fbFirebugMenu{top:22px;left:0;}.fbMenuDisabled{color:#ACA899 !important;}#fbFirebugSettingsMenu{left:245px;top:99px;}#fbConsoleMenu{top:42px;left:48px;}.fbIconButton{display:block;}.fbIconButton{display:block;}.fbIconButton{display:block;float:left;height:20px;width:20px;color:#000;margin-right:2px;text-decoration:none;cursor:default;}.fbIconButton:hover{position:relative;top:-1px;left:-1px;margin-right:0;_margin-right:1px;color:#333;border:1px solid #fff;border-bottom:1px solid #bbb;border-right:1px solid #bbb;}.fbIconPressed{position:relative;margin-right:0;_margin-right:1px;top:0 !important;left:0 !important;height:19px;color:#333 !important;border:1px solid #bbb !important;border-bottom:1px solid #cfcfcf !important;border-right:1px solid #ddd !important;}#fbErrorPopup{position:absolute;right:0;bottom:0;height:19px;width:75px;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) #f1f2ee 0 0;z-index:999;}#fbErrorPopupContent{position:absolute;right:0;top:1px;height:18px;width:75px;_width:74px;border-left:1px solid #aca899;}#fbErrorIndicator{position:absolute;top:2px;right:5px;}.fbBtnInspectActive{background:#aaa;color:#fff !important;}.fbBody{margin:0;padding:0;overflow:hidden;font-family:Lucida Grande,Tahoma,sans-serif;font-size:11px;background:#fff;}.clear{clear:both;}#fbMiniChrome{display:none;right:0;height:27px;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) #f1f2ee 0 0;margin-left:1px;}#fbMiniContent{display:block;position:relative;left:-1px;right:0;top:1px;height:25px;border-left:1px solid #aca899;}#fbToolbarSearch{float:right;border:1px solid #ccc;margin:0 5px 0 0;background:#fff url(https://getfirebug.com/releases/lite/latest/skin/xp/search.png) no-repeat 4px 2px !important;background:#fff url(https://getfirebug.com/releases/lite/latest/skin/xp/search.gif) no-repeat 4px 2px;padding-left:20px;font-size:11px;}#fbToolbarErrors{float:right;margin:1px 4px 0 0;font-size:11px;}#fbLeftToolbarErrors{float:left;margin:7px 0px 0 5px;font-size:11px;}.fbErrors{padding-left:20px;height:14px;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/errorIcon.png) no-repeat !important;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/errorIcon.gif) no-repeat;color:#f00;font-weight:bold;}#fbMiniErrors{display:inline;display:none;float:right;margin:5px 2px 0 5px;}#fbMiniIcon{float:right;margin:3px 4px 0;height:20px;width:20px;float:right;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) 0 -135px;cursor:pointer;}#fbChrome{font-family:Lucida Grande,Tahoma,sans-serif;font-size:11px;position:absolute;_position:static;top:0;left:0;height:100%;width:100%;border-collapse:collapse;border-spacing:0;background:#fff;overflow:hidden;}#fbChrome > tbody > tr > td{padding:0;}#fbTop{height:49px;}#fbToolbar{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) #f1f2ee 0 0;height:27px;font-size:11px;line-height:13px;}#fbPanelBarBox{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) #dbd9c9 0 -27px;height:22px;}#fbContent{height:100%;vertical-align:top;}#fbBottom{height:18px;background:#fff;}#fbToolbarIcon{float:left;padding:0 5px 0;}#fbToolbarIcon a{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) 0 -135px;}#fbToolbarButtons{padding:0 2px 0 5px;}#fbToolbarButtons{padding:0 2px 0 5px;}.fbButton{text-decoration:none;display:block;float:left;color:#000;padding:4px 6px 4px 7px;cursor:default;}.fbButton:hover{color:#333;background:#f5f5ef url(https://getfirebug.com/releases/lite/latest/skin/xp/buttonBg.png);padding:3px 5px 3px 6px;border:1px solid #fff;border-bottom:1px solid #bbb;border-right:1px solid #bbb;}.fbBtnPressed{background:#e3e3db url(https://getfirebug.com/releases/lite/latest/skin/xp/buttonBgHover.png) !important;padding:3px 4px 2px 6px !important;margin:1px 0 0 1px !important;border:1px solid #ACA899 !important;border-color:#ACA899 #ECEBE3 #ECEBE3 #ACA899 !important;}#fbStatusBarBox{top:4px;cursor:default;}.fbToolbarSeparator{overflow:hidden;border:1px solid;border-color:transparent #fff transparent #777;_border-color:#eee #fff #eee #777;height:7px;margin:6px 3px;float:left;}.fbBtnSelected{font-weight:bold;}.fbStatusBar{color:#aca899;}.fbStatusBar a{text-decoration:none;color:black;}.fbStatusBar a:hover{color:blue;cursor:pointer;}#fbWindowButtons{position:absolute;white-space:nowrap;right:0;top:0;height:17px;width:48px;padding:5px;z-index:6;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) #f1f2ee 0 0;}#fbPanelBar1{width:1024px; z-index:8;left:0;white-space:nowrap;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) #dbd9c9 0 -27px;position:absolute;left:4px;}#fbPanelBar2Box{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) #dbd9c9 0 -27px;position:absolute;height:22px;width:300px; z-index:9;right:0;}#fbPanelBar2{position:absolute;width:290px; height:22px;padding-left:4px;}.fbPanel{display:none;}#fbPanelBox1,#fbPanelBox2{max-height:inherit;height:100%;font-size:1em;}#fbPanelBox2{background:#fff;}#fbPanelBox2{width:300px;background:#fff;}#fbPanel2{margin-left:6px;background:#fff;}#fbLargeCommandLine{display:none;position:absolute;z-index:9;top:27px;right:0;width:294px;height:201px;border-width:0;margin:0;padding:2px 0 0 2px;resize:none;outline:none;font-size:11px;overflow:auto;border-top:1px solid #B9B7AF;_right:-1px;_border-left:1px solid #fff;}#fbLargeCommandButtons{display:none;background:#ECE9D8;bottom:0;right:0;width:294px;height:21px;padding-top:1px;position:fixed;border-top:1px solid #ACA899;z-index:9;}#fbSmallCommandLineIcon{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/down.png) no-repeat;position:absolute;right:2px;bottom:3px;z-index:99;}#fbSmallCommandLineIcon:hover{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/downHover.png) no-repeat;}.hide{overflow:hidden !important;position:fixed !important;display:none !important;visibility:hidden !important;}#fbCommand{height:18px;}#fbCommandBox{position:fixed;_position:absolute;width:100%;height:18px;bottom:0;overflow:hidden;z-index:9;background:#fff;border:0;border-top:1px solid #ccc;}#fbCommandIcon{position:absolute;color:#00f;top:2px;left:6px;display:inline;font:11px Monaco,monospace;z-index:10;}#fbCommandLine{position:absolute;width:100%;top:0;left:0;border:0;margin:0;padding:2px 0 2px 32px;font:11px Monaco,monospace;z-index:9;outline:none;}#fbLargeCommandLineIcon{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/up.png) no-repeat;position:absolute;right:1px;bottom:1px;z-index:10;}#fbLargeCommandLineIcon:hover{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/upHover.png) no-repeat;}div.fbFitHeight{overflow:auto;position:relative;}.fbSmallButton{overflow:hidden;width:16px;height:16px;display:block;text-decoration:none;cursor:default;}#fbWindowButtons .fbSmallButton{float:right;}#fbWindow_btClose{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/min.png);}#fbWindow_btClose:hover{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/minHover.png);}#fbWindow_btDetach{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/detach.png);}#fbWindow_btDetach:hover{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/detachHover.png);}#fbWindow_btDeactivate{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/off.png);}#fbWindow_btDeactivate:hover{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/offHover.png);}.fbTab{text-decoration:none;display:none;float:left;width:auto;float:left;cursor:default;font-family:Lucida Grande,Tahoma,sans-serif;font-size:11px;line-height:13px;font-weight:bold;height:22px;color:#565656;}.fbPanelBar span{float:left;}.fbPanelBar .fbTabL,.fbPanelBar .fbTabR{height:22px;width:8px;}.fbPanelBar .fbTabText{padding:4px 1px 0;}a.fbTab:hover{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) 0 -73px;}a.fbTab:hover .fbTabL{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) -16px -96px;}a.fbTab:hover .fbTabR{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) -24px -96px;}.fbSelectedTab{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) #f1f2ee 0 -50px !important;color:#000;}.fbSelectedTab .fbTabL{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) 0 -96px !important;}.fbSelectedTab .fbTabR{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png) -8px -96px !important;}#fbHSplitter{position:fixed;_position:absolute;left:0;top:0;width:100%;height:5px;overflow:hidden;cursor:n-resize !important;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/pixel_transparent.gif);z-index:9;}#fbHSplitter.fbOnMovingHSplitter{height:100%;z-index:100;}.fbVSplitter{background:#ece9d8;color:#000;border:1px solid #716f64;border-width:0 1px;border-left-color:#aca899;width:4px;cursor:e-resize;overflow:hidden;right:294px;text-decoration:none;z-index:10;position:absolute;height:100%;top:27px;}div.lineNo{font:1em/1.4545em Monaco,monospace;position:relative;float:left;top:0;left:0;margin:0 5px 0 0;padding:0 5px 0 10px;background:#eee;color:#888;border-right:1px solid #ccc;text-align:right;}.sourceBox{position:absolute;}.sourceCode{font:1em Monaco,monospace;overflow:hidden;white-space:pre;display:inline;}.nodeControl{margin-top:3px;margin-left:-14px;float:left;width:9px;height:9px;overflow:hidden;cursor:default;background:url(https://getfirebug.com/releases/lite/latest/skin/xp/tree_open.gif);_float:none;_display:inline;_position:absolute;}div.nodeMaximized{background:url(https://getfirebug.com/releases/lite/latest/skin/xp/tree_close.gif);}div.objectBox-element{padding:1px 3px;}.objectBox-selector{cursor:default;}.selectedElement{background:highlight;color:#fff !important;}.selectedElement span{color:#fff !important;}* html .selectedElement{position:relative;}@media screen and (-webkit-min-device-pixel-ratio:0){.selectedElement{background:#316AC5;color:#fff !important;}}.logRow *{font-size:1em;}.logRow{position:relative;border-bottom:1px solid #D7D7D7;padding:2px 4px 1px 6px;zbackground-color:#FFFFFF;}.logRow-command{font-family:Monaco,monospace;color:blue;}.objectBox-string,.objectBox-text,.objectBox-number,.objectBox-function,.objectLink-element,.objectLink-textNode,.objectLink-function,.objectBox-stackTrace,.objectLink-profile{font-family:Monaco,monospace;}.objectBox-null{padding:0 2px;border:1px solid #666666;background-color:#888888;color:#FFFFFF;}.objectBox-string{color:red;}.objectBox-number{color:#000088;}.objectBox-function{color:DarkGreen;}.objectBox-object{color:DarkGreen;font-weight:bold;font-family:Lucida Grande,sans-serif;}.objectBox-array{color:#000;}.logRow-info,.logRow-error,.logRow-warn{background:#fff no-repeat 2px 2px;padding-left:20px;padding-bottom:3px;}.logRow-info{background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/infoIcon.png) !important;background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/infoIcon.gif);}.logRow-warn{background-color:cyan;background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/warningIcon.png) !important;background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/warningIcon.gif);}.logRow-error{background-color:LightYellow;background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/errorIcon.png) !important;background-image:url(https://getfirebug.com/releases/lite/latest/skin/xp/errorIcon.gif);color:#f00;}.errorMessage{vertical-align:top;color:#f00;}.objectBox-sourceLink{position:absolute;right:4px;top:2px;padding-left:8px;font-family:Lucida Grande,sans-serif;font-weight:bold;color:#0000FF;}.selectorTag,.selectorId,.selectorClass{font-family:Monaco,monospace;font-weight:normal;}.selectorTag{color:#0000FF;}.selectorId{color:DarkBlue;}.selectorClass{color:red;}.objectBox-element{font-family:Monaco,monospace;color:#000088;}.nodeChildren{padding-left:26px;}.nodeTag{color:blue;cursor:pointer;}.nodeValue{color:#FF0000;font-weight:normal;}.nodeText,.nodeComment{margin:0 2px;vertical-align:top;}.nodeText{color:#333333;font-family:Monaco,monospace;}.nodeComment{color:DarkGreen;}.nodeHidden,.nodeHidden *{color:#888888;}.nodeHidden .nodeTag{color:#5F82D9;}.nodeHidden .nodeValue{color:#D86060;}.selectedElement .nodeHidden,.selectedElement .nodeHidden *{color:SkyBlue !important;}.log-object{}.property{position:relative;clear:both;height:15px;}.propertyNameCell{vertical-align:top;float:left;width:28%;position:absolute;left:0;z-index:0;}.propertyValueCell{float:right;width:68%;background:#fff;position:absolute;padding-left:5px;display:table-cell;right:0;z-index:1;}.propertyName{font-weight:bold;}.FirebugPopup{height:100% !important;}.FirebugPopup #fbWindowButtons{display:none !important;}.FirebugPopup #fbHSplitter{display:none !important;}',HTML:'<table id="fbChrome" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td id="fbTop" colspan="2"><div id="fbWindowButtons"><a id="fbWindow_btDeactivate" class="fbSmallButton fbHover" title="Deactivate Firebug for this web page">&nbsp;</a><a id="fbWindow_btDetach" class="fbSmallButton fbHover" title="Open Firebug in popup window">&nbsp;</a><a id="fbWindow_btClose" class="fbSmallButton fbHover" title="Minimize Firebug">&nbsp;</a></div><div id="fbToolbar"><div id="fbToolbarContent"><span id="fbToolbarIcon"><a id="fbFirebugButton" class="fbIconButton" class="fbHover" target="_blank">&nbsp;</a></span><span id="fbToolbarButtons"><span id="fbFixedButtons"><a id="fbChrome_btInspect" class="fbButton fbHover" title="Click an element in the page to inspect">Inspect</a></span><span id="fbConsoleButtons" class="fbToolbarButtons"><a id="fbConsole_btClear" class="fbButton fbHover" title="Clear the console">Clear</a></span></span><span id="fbStatusBarBox"><span class="fbToolbarSeparator"></span></span></div></div><div id="fbPanelBarBox"><div id="fbPanelBar1" class="fbPanelBar"><a id="fbConsoleTab" class="fbTab fbHover"><span class="fbTabL"></span><span class="fbTabText">Console</span><span class="fbTabMenuTarget"></span><span class="fbTabR"></span></a><a id="fbHTMLTab" class="fbTab fbHover"><span class="fbTabL"></span><span class="fbTabText">HTML</span><span class="fbTabR"></span></a><a class="fbTab fbHover"><span class="fbTabL"></span><span class="fbTabText">CSS</span><span class="fbTabR"></span></a><a class="fbTab fbHover"><span class="fbTabL"></span><span class="fbTabText">Script</span><span class="fbTabR"></span></a><a class="fbTab fbHover"><span class="fbTabL"></span><span class="fbTabText">DOM</span><span class="fbTabR"></span></a></div><div id="fbPanelBar2Box" class="hide"><div id="fbPanelBar2" class="fbPanelBar"></div></div></div><div id="fbHSplitter">&nbsp;</div></td></tr><tr id="fbContent"><td id="fbPanelBox1"><div id="fbPanel1" class="fbFitHeight"><div id="fbConsole" class="fbPanel"></div><div id="fbHTML" class="fbPanel"></div></div></td><td id="fbPanelBox2" class="hide"><div id="fbVSplitter" class="fbVSplitter">&nbsp;</div><div id="fbPanel2" class="fbFitHeight"><div id="fbHTML_Style" class="fbPanel"></div><div id="fbHTML_Layout" class="fbPanel"></div><div id="fbHTML_DOM" class="fbPanel"></div></div><textarea id="fbLargeCommandLine" class="fbFitHeight"></textarea><div id="fbLargeCommandButtons"><a id="fbCommand_btRun" class="fbButton fbHover">Run</a><a id="fbCommand_btClear" class="fbButton fbHover">Clear</a><a id="fbSmallCommandLineIcon" class="fbSmallButton fbHover"></a></div></td></tr><tr id="fbBottom" class="hide"><td id="fbCommand" colspan="2"><div id="fbCommandBox"><div id="fbCommandIcon">&gt;&gt;&gt;</div><input id="fbCommandLine" name="fbCommandLine" type="text"/><a id="fbLargeCommandLineIcon" class="fbSmallButton fbHover"></a></div></td></tr></tbody></table><span id="fbMiniChrome"><span id="fbMiniContent"><span id="fbMiniIcon" title="Open Firebug Lite"></span><span id="fbMiniErrors" class="fbErrors"></span></span></span>'}
}});
FBL.initialize()
})();