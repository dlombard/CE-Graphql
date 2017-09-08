!function(e){function n(e){var n=require("./"+e+"."+m+".hot-update.js");f(n.id,n.modules)}function t(){try{var e=require("./"+m+".hot-update.json")}catch(e){return Promise.resolve()}return Promise.resolve(e)}function r(e){delete installedChunks[e]}function o(e){var n=D[e];if(!n)return p;var t=function(t){return n.hot.active?(D[t]?D[t].parents.indexOf(e)<0&&D[t].parents.push(e):(w=[e],h=t),n.children.indexOf(t)<0&&n.children.push(t)):(console.warn("[HMR] unexpected require("+t+") from disposed module "+e),w=[]),p(t)};for(var r in p)Object.prototype.hasOwnProperty.call(p,r)&&"e"!==r&&Object.defineProperty(t,r,function(e){return{configurable:!0,enumerable:!0,get:function(){return p[e]},set:function(n){p[e]=n}}}(r));return t.e=function(e){function n(){G--,"prepare"===O&&(I[e]||s(e),0===G&&0===j&&d())}return"ready"===O&&u("prepare"),G++,p.e(e).then(n,function(e){throw n(),e})},t}function i(e){var n={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:h!==e,active:!0,accept:function(e,t){if(void 0===e)n._selfAccepted=!0;else if("function"==typeof e)n._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)n._acceptedDependencies[e[r]]=t||function(){};else n._acceptedDependencies[e]=t||function(){}},decline:function(e){if(void 0===e)n._selfDeclined=!0;else if("object"==typeof e)for(var t=0;t<e.length;t++)n._declinedDependencies[e[t]]=!0;else n._declinedDependencies[e]=!0},dispose:function(e){n._disposeHandlers.push(e)},addDisposeHandler:function(e){n._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=n._disposeHandlers.indexOf(e);t>=0&&n._disposeHandlers.splice(t,1)},check:c,apply:l,status:function(e){if(!e)return O;S.push(e)},addStatusHandler:function(e){S.push(e)},removeStatusHandler:function(e){var n=S.indexOf(e);n>=0&&S.splice(n,1)},data:x[e]};return h=void 0,n}function u(e){O=e;for(var n=0;n<S.length;n++)S[n].call(null,e)}function a(e){return+e+""===e?+e:e}function c(e){if("idle"!==O)throw new Error("check() is only allowed in idle status");return b=e,u("check"),t().then(function(e){if(!e)return u("idle"),null;L={},I={},Q=e.c,v=e.h,u("prepare");var n=new Promise(function(e,n){g={resolve:e,reject:n}});y={};return s(0),"prepare"===O&&0===G&&0===j&&d(),n})}function f(e,n){if(Q[e]&&L[e]){L[e]=!1;for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(y[t]=n[t]);0==--j&&0===G&&d()}}function s(e){Q[e]?(L[e]=!0,j++,n(e)):I[e]=!0}function d(){u("ready");var e=g;if(g=null,e)if(b)l(b).then(function(n){e.resolve(n)},function(n){e.reject(n)});else{var n=[];for(var t in y)Object.prototype.hasOwnProperty.call(y,t)&&n.push(a(t));e.resolve(n)}}function l(n){function t(e,n){for(var t=0;t<n.length;t++){var r=n[t];e.indexOf(r)<0&&e.push(r)}}if("ready"!==O)throw new Error("apply() is only allowed in ready status");n=n||{};var o,i,c,f,s,d={},l=[],h={},g=function(){console.warn("[HMR] unexpected require("+_.moduleId+") to disposed module")};for(var b in y)if(Object.prototype.hasOwnProperty.call(y,b)){s=a(b);var _;_=y[b]?function(e){for(var n=[e],r={},o=n.slice().map(function(e){return{chain:[e],id:e}});o.length>0;){var i=o.pop(),u=i.id,a=i.chain;if((f=D[u])&&!f.hot._selfAccepted){if(f.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:u};if(f.hot._main)return{type:"unaccepted",chain:a,moduleId:u};for(var c=0;c<f.parents.length;c++){var s=f.parents[c],d=D[s];if(d){if(d.hot._declinedDependencies[u])return{type:"declined",chain:a.concat([s]),moduleId:u,parentId:s};n.indexOf(s)>=0||(d.hot._acceptedDependencies[u]?(r[s]||(r[s]=[]),t(r[s],[u])):(delete r[s],n.push(s),o.push({chain:a.concat([s]),id:s})))}}}}return{type:"accepted",moduleId:e,outdatedModules:n,outdatedDependencies:r}}(s):{type:"disposed",moduleId:b};var S=!1,j=!1,G=!1,I="";switch(_.chain&&(I="\nUpdate propagation: "+_.chain.join(" -> ")),_.type){case"self-declined":n.onDeclined&&n.onDeclined(_),n.ignoreDeclined||(S=new Error("Aborted because of self decline: "+_.moduleId+I));break;case"declined":n.onDeclined&&n.onDeclined(_),n.ignoreDeclined||(S=new Error("Aborted because of declined dependency: "+_.moduleId+" in "+_.parentId+I));break;case"unaccepted":n.onUnaccepted&&n.onUnaccepted(_),n.ignoreUnaccepted||(S=new Error("Aborted because "+s+" is not accepted"+I));break;case"accepted":n.onAccepted&&n.onAccepted(_),j=!0;break;case"disposed":n.onDisposed&&n.onDisposed(_),G=!0;break;default:throw new Error("Unexception type "+_.type)}if(S)return u("abort"),Promise.reject(S);if(j){h[s]=y[s],t(l,_.outdatedModules);for(s in _.outdatedDependencies)Object.prototype.hasOwnProperty.call(_.outdatedDependencies,s)&&(d[s]||(d[s]=[]),t(d[s],_.outdatedDependencies[s]))}G&&(t(l,[_.moduleId]),h[s]=g)}var L=[];for(i=0;i<l.length;i++)s=l[i],D[s]&&D[s].hot._selfAccepted&&L.push({module:s,errorHandler:D[s].hot._selfAccepted});u("dispose"),Object.keys(Q).forEach(function(e){!1===Q[e]&&r(e)});for(var M,k=l.slice();k.length>0;)if(s=k.pop(),f=D[s]){var N={},P=f.hot._disposeHandlers;for(c=0;c<P.length;c++)(o=P[c])(N);for(x[s]=N,f.hot.active=!1,delete D[s],c=0;c<f.children.length;c++){var A=D[f.children[c]];A&&((M=A.parents.indexOf(s))>=0&&A.parents.splice(M,1))}}var E,q;for(s in d)if(Object.prototype.hasOwnProperty.call(d,s)&&(f=D[s]))for(q=d[s],c=0;c<q.length;c++)E=q[c],(M=f.children.indexOf(E))>=0&&f.children.splice(M,1);u("apply"),m=v;for(s in h)Object.prototype.hasOwnProperty.call(h,s)&&(e[s]=h[s]);var T=null;for(s in d)if(Object.prototype.hasOwnProperty.call(d,s)){f=D[s],q=d[s];var C=[];for(i=0;i<q.length;i++)E=q[i],o=f.hot._acceptedDependencies[E],C.indexOf(o)>=0||C.push(o);for(i=0;i<C.length;i++){o=C[i];try{o(q)}catch(e){n.onErrored&&n.onErrored({type:"accept-errored",moduleId:s,dependencyId:q[i],error:e}),n.ignoreErrored||T||(T=e)}}}for(i=0;i<L.length;i++){var H=L[i];s=H.module,w=[s];try{p(s)}catch(e){if("function"==typeof H.errorHandler)try{H.errorHandler(e)}catch(t){n.onErrored&&n.onErrored({type:"self-accept-error-handler-errored",moduleId:s,error:t,orginalError:e}),n.ignoreErrored||T||(T=t),T||(T=e)}else n.onErrored&&n.onErrored({type:"self-accept-errored",moduleId:s,error:e}),n.ignoreErrored||T||(T=e)}}return T?(u("fail"),Promise.reject(T)):(u("idle"),new Promise(function(e){e(l)}))}function p(n){if(D[n])return D[n].exports;var t=D[n]={i:n,l:!1,exports:{},hot:i(n),parents:(_=w,w=[],_),children:[]};return e[n].call(t.exports,t,t.exports,o(n)),t.l=!0,t.exports}var h,g,y,v,b=!0,m="8751c4eb1f805fbc2bb2",x={},w=[],_=[],S=[],O="idle",j=0,G=0,I={},L={},Q={},D={};p.m=e,p.c=D,p.i=function(e){return e},p.d=function(e,n,t){p.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},p.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return p.d(n,"a",n),n},p.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},p.p="",p.h=function(){return m},o(23)(p.s=23)}([function(e,n,t){"use strict";var r=t(62),o=function(e){return e&&e.__esModule?e:{default:e}}(r),i=new o.default.Logger({transports:[new o.default.transports.Console({colorize:"all",handleExceptions:!0,json:!1,timestamp:!0})],exitOnError:!1});e.exports=i,e.exports.stream={write:function(e,n){i.info(e)}}},function(e,n){e.exports=require("graphql")},function(e,n,t){"use strict";var r=t(6),o=function(e){return e&&e.__esModule?e:{default:e}}(r),i=o.default.Schema,u=new i({title:{type:String},num:{type:Number},book:{name:{type:String},abbrv:{type:String},languages:{type:String,many:!0}},lyrics:{type:String},lyrics_Markdown:{md:{type:String},html:{type:String}},tags:{type:String,many:!0},videos:{type:String,many:!0},references:{author:{type:String},book:{type:String},year:{type:String}},partitions:{type:String,many:!0},language:{type:String},songId:{type:String},total_views:{type:Number,min:0,default:0}});u.set("timestamps",{createdAt:"createdAt",updatedAt:"updatedAt"});var a=o.default.model("Song",u);e.exports=a},function(e,n,t){"use strict";function r(e){return Buffer.from(e,"utf8").toString("base64")}function o(e){return Buffer.from(e,"base64").toString("utf8")}Object.defineProperty(n,"__esModule",{value:!0}),n.base64=r,n.unbase64=o},function(e,n,t){function r(e){if("string"==typeof e)return e;if(u(e))return i(e,r)+"";if(a(e))return s?s.call(e):"";var n=e+"";return"0"==n&&1/e==-c?"-0":n}var o=t(8),i=t(32),u=t(47),a=t(19),c=1/0,f=o?o.prototype:void 0,s=f?f.toString:void 0;e.exports=r},function(e,n){e.exports=require("graphql-relay")},function(e,n){e.exports=require("mongoose")},function(e,n,t){"use strict";var r=t(1),o=t(5),i=t(14),u=new r.GraphQLObjectType({name:"Song",fields:function(){return{id:(0,o.globalIdField)("Song"),title:{type:r.GraphQLString},num:{type:r.GraphQLInt},book:{type:new r.GraphQLObjectType({name:"Book",fields:function(){return{name:{type:r.GraphQLString},abbrv:{type:r.GraphQLString},languages:{type:r.GraphQLString}}}})},lyrics:{type:r.GraphQLString},lyrics_Markdown:{type:new r.GraphQLObjectType({name:"Markdown",fields:function(){return{md:{type:r.GraphQLString},html:{type:r.GraphQLString}}}})},lyrics_Html:{type:r.GraphQLString},tags:{type:r.GraphQLString},videos:{type:r.GraphQLString},references:{type:new r.GraphQLObjectType({name:"References",fields:function(){return{author:{type:r.GraphQLString},book:{type:r.GraphQLString},year:{type:r.GraphQLString}}}})},partitions:{type:r.GraphQLString},language:{type:r.GraphQLString},songId:{type:r.GraphQLString},meta:{type:new r.GraphQLObjectType({name:"Meta",fields:function(){return{totalViews:{type:r.GraphQLInt},stats:{type:new r.GraphQLList(new r.GraphQLObjectType({name:"Stats",fields:function(){return{week:{type:r.GraphQLInt},year:{type:r.GraphQLInt},day:{type:r.GraphQLInt},views:{type:r.GraphQLInt}}}}))}}}})}}},interfaces:function(){return[i.nodeInterface]}});e.exports=u},function(e,n,t){var r=t(44),o=r.Symbol;e.exports=o},function(e,n,t){function r(e){return null==e?"":o(e)}var o=t(4);e.exports=r},function(e,n,t){function r(e,n,t){if((e=f(e))&&(t||void 0===n))return e.replace(s,"");if(!e||!(n=o(n)))return e;var r=c(e),d=c(n),l=a(r,d),p=u(r,d)+1;return i(r,l,p).join("")}var o=t(4),i=t(16),u=t(39),a=t(17),c=t(18),f=t(9),s=/^\s+|\s+$/g;e.exports=r},function(e,n,t){"use strict";var r=t(6),o=function(e){return e&&e.__esModule?e:{default:e}}(r),i=o.default.Schema,u=new i({song_id:{type:i.Types.ObjectId,ref:"Song"},views:{type:Number,default:0},date:{year:{type:Number},week:{type:Number},day:{type:Number,min:1,max:7}}},{collection:"song_meta"});u.set("timestamps",{createdAt:"created_at",updatedAt:"updated_at"}),u.set("retainKeyOrder",!0);var a=o.default.model("Song_Meta",u);e.exports=a},function(e,n,t){"use strict";var r=t(3),o=function(e,n){var t=n.map(function(n,t){return{cursor:(0,r.base64)(e.modelName+n.id),node:n}});return{edges:t,pageInfo:i(t)}},i=function(e){return{startCursor:e[0]?e[0].cursor:null,endCursor:e[e.length-1]?e[e.length-1].cursor:null,hasPreviousPage:!1,hasNextPage:!1}};n.connectionFromMongoose=o},function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=t(10),i=r(o),u=t(0),a=r(u),c=t(2),f=r(c),s=t(3),d=t(25),l=function(e){var n=(0,i.default)((0,s.unbase64)(e.id),f.default.modelName+":");return a.default.info("By ID"),f.default.findById(n).then(function(e){return a.default.warn(e),(0,d.updateMeta)(e),e}).catch(function(e){a.default.error(e)})},p=function(e){return f.default.findById(e).then(function(e){return(0,d.updateMeta)(e),e}).catch(function(e){a.default.error(e)})};e.exports={getSong:l,getSongFromNode:p}},function(e,n,t){"use strict";var r=t(5),o=t(13),i=t(0),u=function(e){return e&&e.__esModule?e:{default:e}}(i),a=(0,r.nodeDefinitions)(function(e){var n=(0,r.fromGlobalId)(e),t=n.type,i=n.id;switch(u.default.warn(t),u.default.warn(i),t){case"Song":return(0,o.getSongFromNode)(i);default:return null}},function(e){return e.songId?"Song":null}),c=a.nodeInterface,f=a.nodeField;e.exports={nodeInterface:c,nodeField:f}},function(e,n,t){function r(e,n,t){return n===n?u(e,n,t):o(e,i,t)}var o=t(35),i=t(37),u=t(45);e.exports=r},function(e,n,t){function r(e,n,t){var r=e.length;return t=void 0===t?r:t,!n&&t>=r?e:o(e,n,t)}var o=t(38);e.exports=r},function(e,n,t){function r(e,n){for(var t=-1,r=e.length;++t<r&&o(n,e[t],0)>-1;);return t}var o=t(15);e.exports=r},function(e,n,t){function r(e){return i(e)?u(e):o(e)}var o=t(33),i=t(42),u=t(46);e.exports=r},function(e,n,t){function r(e){return"symbol"==typeof e||i(e)&&o(e)==u}var o=t(36),i=t(49),u="[object Symbol]";e.exports=r},function(e,n){e.exports=require("graphql-server-express")},function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=t(55),i=r(o),u=t(57),a=r(u),c=t(56),f=r(c),s=t(24),d=r(s),l=t(0),p=r(l),h=t(28),g=r(h),y=t(20),v=t(59),b=r(v),m=(0,a.default)();m.use((0,f.default)()),m.use(i.default.urlencoded({extended:!0})),m.use(i.default.json()),m.use(t(61)("combined",{stream:p.default.stream})),m.use("/graphql",(0,g.default)()),m.use("/graphiql",(0,y.graphiqlExpress)({endpointURL:"/graphql"}));var x=b.default.createServer(m),w=function(){p.default.info("Received kill signal, shutting down gracefully."),d.default.close(),x.close(function(){p.default.info("Closed out remaining connections."),process.exit()}),setTimeout(function(){p.default.error("Could not close connections in time, forcefully shutting down"),process.exit()},1e4)};!function e(){return d.default.start().then(function(){x.listen("4000",function(){p.default.info("API Server is now running on port 4000")})}).catch(function(n){p.default.error(n),setTimeout(function(){e()},5e3)})}(),process.on("SIGTERM",w),process.on("SIGINT",w)},function(e,n){e.exports=require("dotenv")},function(e,n,t){"use strict";t(22).config(),t(21)},function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),i=t(0),u=t(6),a=function(){function e(){r(this,e),u.Promise=Promise,c(u)}return o(e,[{key:"start",value:function(){return i.info("Starting database"),u.connect("mongodb://rest:r4Yj1n52JwT7z6H@cluster0-shard-00-00-xd1x4.mongodb.net:27017,cluster0-shard-00-01-xd1x4.mongodb.net:27017,cluster0-shard-00-02-xd1x4.mongodb.net:27017/cesperance?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",{useMongoClient:!0})}},{key:"close",value:function(){return u.connection.close()}}]),e}(),c=function(e){e.connection.on("connecting",function(){i.info("Connecting to the database")}),e.connection.on("connected",function(){i.info("Connected to the database")}),e.connection.on("open",function(){i.info("onOpen")}),e.connection.on("disconnecting",function(){i.warn("Disconnecting from the database")}),e.connection.on("Disconnected",function(){i.warn("Disconnected from the dataabse"),e.connect("mongodb://rest:r4Yj1n52JwT7z6H@cluster0-shard-00-00-xd1x4.mongodb.net:27017,cluster0-shard-00-01-xd1x4.mongodb.net:27017,cluster0-shard-00-02-xd1x4.mongodb.net:27017/cesperance?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin")}),e.connection.on("closed",function(){i.info("DB connection closed")}),e.connection.on("reconnected",function(){i.info("Reconnected to the database")}),e.connection.on("error",function(n){i.error("Connection to the database failed with "+n),e.disconnect()})},f=new a;e.exports=f},function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=t(11),i=r(o),u=t(2),a=r(u),c=t(6),f=(r(c),t(60)),s=t(0),d=function(e){if(s.info("POST FIND ONE"),e){var n=e._id,t=f.utc().year(),r=f.utc().isoWeek(),o=f.utc().isoWeekday();return i.default.findOneAndUpdate({song_id:n,"date.year":t,"date.week":r,"date.day":o},{$inc:{views:1}},{new:!0}).then(function(e){if(e)return s.warn("SECOND SONG FINDONEANDUPDATE"),a.default.findOne({_id:n}).then(function(e){var t=e.total_views+1;return s.warn(t),a.default.update({_id:n},{$set:{total_views:t}})});var u={views:1,song_id:n,"date.year":t,"date.week":r,"date.day":o};return new i.default(u).save().then(function(){return s.warn("FIRST SONG FINDONEANDUPDATE"),a.default.findOneAndUpdate({_id:n},{$inc:{total_views:1}})})}).catch(function(e){s.error(e)})}};e.exports={updateMeta:d}},function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},i=t(1),u=t(5),a=t(7),c=r(a),f=t(30),s=t(2),d=r(s),l=t(0),p=r(l),h=t(12),g=function(e,n){return{type:(0,u.connectionDefinitions)({name:e,nodeType:c.default,connectionFields:function(){return{totalCount:{type:i.GraphQLInt,resolve:function(e){return e.totalCount},description:'A count of the total number of objects in this connection, ignoring pagination.\nThis allows a client to fetch the first five objects by passing "5" as the\nargument to "first", then fetch the total count so it could display "5 of 83",\nfor example.'}}}}).connectionType,args:o({},u.connectionArgs,{book:{type:i.GraphQLString},language:{type:i.GraphQLString},num:{type:i.GraphQLString},title:{type:i.GraphQLString},songId:{type:i.GraphQLString},order_by:{type:i.GraphQLString}}),resolve:function(e,n){return(0,f.getSongs)(n,null,null).then(function(e){return(0,h.connectionFromMongoose)(d.default,e)}).catch(function(e){p.default.error(e)})}}};n.songConnection=g},function(e,n,t){"use strict";var r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},o=t(5),i=t(1),u=t(7),a=function(e){return e&&e.__esModule?e:{default:e}}(u),c=t(29),f=function(e,n){return{type:(0,o.connectionDefinitions)({name:e,nodeType:a.default}).connectionType,args:r({},o.connectionArgs,{song_id:{type:i.GraphQLString},day:{type:i.GraphQLInt},week:{type:i.GraphQLInt},year:{type:i.GraphQLInt},direction:{type:i.GraphQLString},_day:{type:i.GraphQLInt},_week:{type:i.GraphQLInt},_year:{type:i.GraphQLInt}}),resolve:function(e,n){return(0,c.getSongMeta)(n,null,null)}}};n.songMetaConnection=f},function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=t(31),i=r(o),u=t(20),a=t(58),c=(r(a),t(1)),f=c.GraphQLSchema;e.exports=function(){var e=new f({query:i.default});return(0,u.graphqlExpress)(function(n){return{schema:e,graphiql:!0}})}},function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=t(50),i=r(o),u=t(10),a=r(u),c=t(54),f=r(c),s=t(0),d=r(s),l=t(3),p=t(12),h=t(11),g=r(h),y=function(e){var n=e.after,t=e.before,r=e.first,o=e.last,u=e.orderby,c={},s=void 0,h={},y=(0,f.default)(u,"-");if(u&&((0,i.default)(u,"-")?c[y]=-1:c[y]=1,delete e.orderby),r&&(s=r,delete e.first),o&&(s=o,c[y]=-c[y],delete e.last),n){var v=(0,a.default)((0,l.unbase64)(n),g.default.modelName+":");h._id={$gt:v},delete e.after}if(t){var b=(0,a.default)((0,l.unbase64)(t),g.default.modelName+":");h._id={$lt:b},delete e.before}for(var m in e)null===e[m]&&delete e[m];return Object.assign(h,e),void 0!==s?g.default.find(h).sort(c).limit(s).exec().then(function(e){return(0,p.connectionFromMongoose)(g.default,e)}).catch(function(e){d.default.log("error",e)}):g.default.find(h).sort(c).exec().then(function(e){return(0,p.connectionFromMongoose)(g.default,e)}).catch(function(e){d.default.log("error",e)})};e.exports={getTotalViews:y}},function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=t(10),i=r(o),u=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},a=t(3),c=t(2),f=r(c),s=function(e,n,t){var r={before:e.before,after:e.after,first:e.first,last:e.last},o=e.order_by;delete e.before,delete e.after,delete e.last,delete e.first,delete e.order_by;var c=u({},e);c.book&&(c["book.abbrv"]=c.book,delete c.book);var s={};o&&(s[o]=1);var d=void 0;if(r.first&&(d=r.first,delete e.first),r.last&&(d=r.last,o?s[o]=-1:s._id=-1),r.after){var l=(0,i.default)((0,a.unbase64)(r.after),f.default.modelName+":");c._id={$gt:l}}if(r.before){var p=(0,i.default)((0,a.unbase64)(r.before),f.default.modelName+":");c._id={$lt:p}}return void 0!==d?o?f.default.find(c).sort(s).limit(d):f.default.find(c).limit(d):o?f.default.find(c).sort(s):f.default.find(c)};e.exports={getSongs:s}},function(e,n,t){"use strict";var r=t(1),o=t(7),i=function(e){return e&&e.__esModule?e:{default:e}}(o),u=t(14),a=t(26),c=t(27),f=t(13),s=new r.GraphQLObjectType({name:"Query",fields:function(){return{node:u.nodeField,songs:(0,a.songConnection)("Songs","songs"),song:{type:i.default,args:{id:{type:new r.GraphQLNonNull(r.GraphQLID)}},resolve:function(e,n){return(0,f.getSong)(n)}},songsMeta:(0,c.songMetaConnection)("Meta","songs")}}});e.exports=s},function(e,n){function t(e,n){for(var t=-1,r=null==e?0:e.length,o=Array(r);++t<r;)o[t]=n(e[t],t,e);return o}e.exports=t},function(e,n){function t(e){return e.split("")}e.exports=t},function(e,n){function t(e,n,t){return e===e&&(void 0!==t&&(e=e<=t?e:t),void 0!==n&&(e=e>=n?e:n)),e}e.exports=t},function(e,n){function t(e,n,t,r){for(var o=e.length,i=t+(r?1:-1);r?i--:++i<o;)if(n(e[i],i,e))return i;return-1}e.exports=t},function(e,n,t){function r(e){return null==e?void 0===e?c:a:f&&f in Object(e)?i(e):u(e)}var o=t(8),i=t(41),u=t(43),a="[object Null]",c="[object Undefined]",f=o?o.toStringTag:void 0;e.exports=r},function(e,n){function t(e){return e!==e}e.exports=t},function(e,n){function t(e,n,t){var r=-1,o=e.length;n<0&&(n=-n>o?0:o+n),t=t>o?o:t,t<0&&(t+=o),o=n>t?0:t-n>>>0,n>>>=0;for(var i=Array(o);++r<o;)i[r]=e[r+n];return i}e.exports=t},function(e,n,t){function r(e,n){for(var t=e.length;t--&&o(n,e[t],0)>-1;);return t}var o=t(15);e.exports=r},function(e,n){var t="object"==typeof global&&global&&global.Object===Object&&global;e.exports=t},function(e,n,t){function r(e){var n=u.call(e,c),t=e[c];try{e[c]=void 0;var r=!0}catch(e){}var o=a.call(e);return r&&(n?e[c]=t:delete e[c]),o}var o=t(8),i=Object.prototype,u=i.hasOwnProperty,a=i.toString,c=o?o.toStringTag:void 0;e.exports=r},function(e,n){function t(e){return r.test(e)}var r=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");e.exports=t},function(e,n){function t(e){return o.call(e)}var r=Object.prototype,o=r.toString;e.exports=t},function(e,n,t){var r=t(40),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();e.exports=i},function(e,n){function t(e,n,t){for(var r=t-1,o=e.length;++r<o;)if(e[r]===n)return r;return-1}e.exports=t},function(e,n){function t(e){return e.match(d)||[]}var r="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",o="\\ud83c[\\udffb-\\udfff]",i="(?:\\ud83c[\\udde6-\\uddff]){2}",u="[\\ud800-\\udbff][\\udc00-\\udfff]",a="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",c="(?:\\u200d(?:"+["[^\\ud800-\\udfff]",i,u].join("|")+")[\\ufe0e\\ufe0f]?"+a+")*",f="[\\ufe0e\\ufe0f]?"+a+c,s="(?:"+["[^\\ud800-\\udfff]"+r+"?",r,i,u,"[\\ud800-\\udfff]"].join("|")+")",d=RegExp(o+"(?="+o+")|"+s+f,"g");e.exports=t},function(e,n){var t=Array.isArray;e.exports=t},function(e,n){function t(e){var n=typeof e;return null!=e&&("object"==n||"function"==n)}e.exports=t},function(e,n){function t(e){return null!=e&&"object"==typeof e}e.exports=t},function(e,n,t){function r(e,n,t){return e=a(e),t=null==t?0:o(u(t),0,e.length),n=i(n),e.slice(t,t+n.length)==n}var o=t(34),i=t(4),u=t(52),a=t(9);e.exports=r},function(e,n,t){function r(e){if(!e)return 0===e?e:0;if((e=o(e))===i||e===-i){return(e<0?-1:1)*u}return e===e?e:0}var o=t(53),i=1/0,u=1.7976931348623157e308;e.exports=r},function(e,n,t){function r(e){var n=o(e),t=n%1;return n===n?t?n-t:n:0}var o=t(51);e.exports=r},function(e,n,t){function r(e){if("number"==typeof e)return e;if(i(e))return u;if(o(e)){var n="function"==typeof e.valueOf?e.valueOf():e;e=o(n)?n+"":n}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(a,"");var t=f.test(e);return t||s.test(e)?d(e.slice(2),t?2:8):c.test(e)?u:+e}var o=t(48),i=t(19),u=NaN,a=/^\s+|\s+$/g,c=/^[-+]0x[0-9a-f]+$/i,f=/^0b[01]+$/i,s=/^0o[0-7]+$/i,d=parseInt;e.exports=r},function(e,n,t){function r(e,n,t){if((e=c(e))&&(t||void 0===n))return e.replace(f,"");if(!e||!(n=o(n)))return e;var r=a(e),s=u(r,a(n));return i(r,s).join("")}var o=t(4),i=t(16),u=t(17),a=t(18),c=t(9),f=/^\s+/;e.exports=r},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("compression")},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("express-graphql")},function(e,n){e.exports=require("http")},function(e,n){e.exports=require("moment")},function(e,n){e.exports=require("morgan")},function(e,n){e.exports=require("winston")}]);