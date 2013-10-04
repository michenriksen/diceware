// LICENSE (BSD):
//
// Copyright 2013 David Bau, all rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright
// notice, this list of conditions and the following disclaimer in the
// documentation and/or other materials provided with the distribution.
//
// 3. Neither the name of this module nor the names of its contributors may
// be used to endorse or promote products derived from this software
// without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
(function(global,pool,math,width,chunks,digits){var startdenom=math.pow(width,chunks),significance=math.pow(2,digits),overflow=significance*2,mask=width-1;math["seedrandom"]=function(seed,use_entropy){var key=[];var shortseed=mixkey(flatten(use_entropy?[seed,tostring(pool)]:0 in arguments?seed:autoseed(),3),key);var arc4=new ARC4(key);mixkey(tostring(arc4.S),pool);math["random"]=function(){var n=arc4.g(chunks),d=startdenom,x=0;while(n<significance){n=(n+x)*width;d*=width;x=arc4.g(1);}while(n>=overflow){n/=2;d/=2;x>>>=1;}return(n+x)/d;};return shortseed;};function ARC4(key){var t,keylen=key.length,me=this,i=0,j=me.i=me.j=0,s=me.S=[];if(!keylen){key=[keylen++];}while(i<width){s[i]=i++;}for(i=0;i<width;i++){s[i]=s[j=mask&(j+key[i%keylen]+(t=s[i]))];s[j]=t;}(me.g=function(count){var t,r=0,i=me.i,j=me.j,s=me.S;while(count--){t=s[i=mask&(i+1)];r=r*width+s[mask&((s[i]=s[j=mask&(j+t)])+(s[j]=t))];}me.i=i;me.j=j;return r;})(width);}function flatten(obj,depth){var result=[],typ=(typeof obj)[0],prop;if(depth&&typ=="o"){for(prop in obj){try{result.push(flatten(obj[prop],depth-1));}catch(e){}}}return(result.length?result:typ=="s"?obj:obj+"\0");}function mixkey(seed,key){var stringseed=seed+"",smear,j=0;while(j<stringseed.length){key[mask&j]=mask&((smear^=key[mask&j]*19)+stringseed.charCodeAt(j++));}return tostring(key);}function autoseed(seed){try{global.crypto.getRandomValues(seed=new Uint8Array(width));return tostring(seed);}catch(e){return[+new Date,global,global.navigator.plugins,global.screen,tostring(pool)];}}function tostring(a){return String.fromCharCode.apply(0,a);}mixkey(math.random(),pool);})(this,[],Math,256,6,52);
