(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{111:function(e,t,n){e.exports=n(167)},138:function(e,t,n){},166:function(e,t,n){},167:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(19),r=n.n(i),c=(n(73),n(18)),l=n(204),s=n(67),d=n.n(s),u=n(64),m=n(206),p=(n(132),n(202)),h=n(205),g=n(210),f=n(209),b=n(94),x=n.n(b),v=n(95),E=n.n(v),y=n(199),w=Object(y.a)((function(e){return{root:{"& .MuiOutlinedInput-input":{padding:"0px"}},formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)}}})),j=function(e){var t=e.handleLanguage,n=e.handleReset,i=e.handleTheme,r=(w(),Object(a.useState)("C++")),s=Object(c.a)(r,2),d=s[0],u=s[1],b=Object(a.useState)("material-ocean"),v=Object(c.a)(b,2),y=v[0],j=v[1];return o.a.createElement(p.a,{position:"static",style:{width:"100%",height:"100%",background:"linear-gradient(45deg,rgb(232 19 19 / 95%), rgb(0 0 0))"}},o.a.createElement(l.a,{container:!0,style:{padding:"0px 10px"}},o.a.createElement(l.a,{item:!0,style:{marginTop:"5px",height:"30px"}},o.a.createElement(h.a,{variant:"outlined",style:{width:"170px",height:"30px",borderRadius:"4px",backgroundColor:"white"}},o.a.createElement(f.a,{style:{height:"30px",padding:"0px !important"},value:d,label:"C++",onChange:function(e){u(e.target.value),t(e.target.value)}},o.a.createElement(g.a,{value:54},o.a.createElement("em",null,"C++")),o.a.createElement(g.a,{value:71},o.a.createElement("em",null,"Python"))))),o.a.createElement(l.a,{item:!0,style:{margin:"5px 0px 0px 30px",height:"30px"}},o.a.createElement(m.a,{onClick:function(){n(!0)},variant:"contained",color:"primary",style:{height:"30px"}},"Reset")),o.a.createElement(l.a,{item:!0,style:{margin:"0px 0px 5px 30px",height:"30px"}},o.a.createElement(m.a,{onClick:function(){j((function(e){return"material-ocean"===e?"neat":"material-ocean"})),i(y)}},o.a.createElement(x.a,null))),o.a.createElement(l.a,{item:!0,style:{margin:"0px 0px 5px 30px",height:"30px"}},o.a.createElement(m.a,null,o.a.createElement(E.a,null)))))},k=n(22),C=n(96),O=n(97);n(138);n(139),n(140),n(141),n(86),n(89),n(87),n(88),n(86),n(142),n(143),n(144),n(145),n(146),n(147),n(148),n(149),n(150),n(151),n(153),n(154),n(155),n(156),n(157),n(158),n(159);var S=n(160);var A=function(){var e=Object(a.useState)(""),t=Object(c.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)(""),s=Object(c.a)(r,2),p=(s[0],s[1]),h=Object(a.useState)("See Output Here"),g=Object(c.a)(h,2),f=g[0],b=g[1],x=Object(a.useState)(""),v=Object(c.a)(x,2),E=v[0],y=v[1],w=Object(a.useState)("C++"),A=Object(c.a)(w,2),I=A[0],R=A[1],T=Object(a.useState)(!1),W=Object(c.a)(T,2),B=(W[0],W[1]),D=Object(a.useState)("material-ocean"),M=Object(c.a)(D,2),L=M[0],z=M[1],N=Object(a.useRef)();Object(a.useEffect)((function(){if(N.current){var e=new k.a({meta:{cellId:1}}),t=new C.a("wss://codeio-backend.herokuapp.com/",1,e),n=e.getText("codemirror"),a=prompt("Please enter your name");t.awareness.setLocalStateField("user",{name:a,color:"#008833"}),t.on("status",(function(e){if(console.log(e.status),e.status,"connected"==e.status)new O.a(n,N.current,t.awareness)}))}}),[]);var P=function(e){d()({method:"GET",url:"https://judge0.p.rapidapi.com/submissions/".concat(e,"?base64_encoded=true"),headers:{"content-type":"application/octet-stream","x-rapidapi-host":"judge0.p.rapidapi.com","x-rapidapi-key":"0e3af1fc74mshad035c1ca88d824p139da6jsn8ab4b4057169",useQueryString:!0}}).then((function(e){if(e.data.compile_output){var t=e.data.compile_output;console.log(S.decode(t)),b(S.decode(t))}else e.data.stdout&&b(atob(e.data.stdout))})).catch((function(e){console.log(e)}))};return o.a.createElement("div",{style:{width:"100%",height:"560px"}},o.a.createElement(l.a,{container:!0,style:{height:"560px",width:"100%"}},o.a.createElement(l.a,{item:!0,container:!0,xs:12,sm:8},o.a.createElement(l.a,{item:!0,xs:12,sm:12,style:{height:"85vh",border:"4px solid black",fontSize:"15px"}},o.a.createElement(u.Controlled,{id:"textarea",value:n,editorDidMount:function(e){N.current=e,e.setSize("","83.7vh")},options:{mode:54===I?"text/x-c++src":71===I?"python":null,theme:L,lineNumbers:!0,lineWrapping:!0,matchBrackets:!0,styleActiveLine:{nonEmpty:!0},styleActiveSelected:!0,smartIndent:!0,highlightSelectionMatches:{showToken:/\w/,annotateScrollbar:!0},autoCloseBrackets:!0,extraKeys:{"Ctrl-Q":function(e){e.foldCode(e.getCursor())},"Ctrl-/":function(e){e.execCommand(e.toggleComment())}},foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"]},onBeforeChange:function(e,t,n){B(!1),i(n)}})),o.a.createElement(l.a,{item:!0,xs:12,sm:12,style:{height:"46px",border:"2px solid black"}},o.a.createElement(j,{handleLanguage:function(e){R(e)},handleReset:function(e){i(""),B(e)},handleTheme:function(e){z(e)}}))),o.a.createElement(l.a,{item:!0,container:!0,xs:12,sm:4,spacing:0},o.a.createElement(l.a,{item:!0,container:!0,style:{height:"85vh"}},o.a.createElement(l.a,{item:!0,xs:12,sm:12,style:{border:"4px solid black"}},o.a.createElement(u.Controlled,{name:"code",value:E,editorDidMount:function(e){e.setSize("","42vh")},options:{mode:"text/x-c++src",theme:L},onBeforeChange:function(e,t,n){y(n)}})),o.a.createElement(l.a,{item:!0,xs:12,sm:12,style:{border:"4px solid black"}},o.a.createElement(u.Controlled,{name:"code",value:f,editorDidMount:function(e){e.setSize("","40vh")},options:{mode:"text/x-c++src",theme:L}}))),o.a.createElement(l.a,{item:!0,xs:12,sm:12,className:"shadow"},o.a.createElement(m.a,{style:{width:"98%",height:"80%",margin:"4px",borderRadius:"0px",zIndex:"1000000000",color:"white",background:"linear-gradient(45deg,rgb(0 0 0 / 64%), rgb(18 16 24 / 97%))"},variant:"contained",onClick:function(){var e="".concat(n),t="".concat(E);d()({method:"POST",url:"https://judge0.p.rapidapi.com/submissions",headers:{"content-type":"application/json","x-rapidapi-host":"judge0.p.rapidapi.com","x-rapidapi-key":"7b3dddefe1msheb8ab51a9e386f1p114d8ejsn6f6d49dd4d69",accept:"application/json",useQueryString:!0},data:{language_id:I,source_code:e,stdin:t}}).then((function(e){console.log(e.data),p(e.data.token),setTimeout((function(){P(e.data.token)}),3e3)})).catch((function(e){console.log(e)}))}},"Compile And Run")))))},I=n(207),R=n(208),T=Object(y.a)((function(e){return{root:{flexGrow:1,textAlign:"center"},menuButton:{marginRight:e.spacing(2)}}})),W=function(){var e=T();return o.a.createElement("div",{className:e.root},o.a.createElement(p.a,{position:"static",style:{textAlign:"center",background:"linear-gradient(45deg, #171515, #7e1111)"}},o.a.createElement(I.a,{variant:"dense",style:{textAlign:"center"}},o.a.createElement(l.a,{container:!0,justify:"center"},o.a.createElement(l.a,{item:!0},o.a.createElement(R.a,{variant:"h6",color:"inherit"},"CODEIO IDE"))))))},B=function(){return o.a.createElement("div",null,o.a.createElement(W,null),o.a.createElement(A,null))},D=(n(166),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function M(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}r.a.render(o.a.createElement(B,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/CodeIO-IDE",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/CodeIO-IDE","/service-worker.js");D?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):M(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):M(t,e)}))}}()},73:function(e,t,n){}},[[111,1,2]]]);
//# sourceMappingURL=main.0bfda43f.chunk.js.map