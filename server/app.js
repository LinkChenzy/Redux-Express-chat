import express      from 'express';
import path         from 'path';
import bodyParse    from 'body-parser';
import cookieParse  from 'cookie-parser';
// 服务端ssr渲染
import React from 'react'
import csshook from 'css-modules-require-hook/preset' // import hook before routes
import assetHook from 'asset-require-hook'

import { renderToString,renderToNodeStream } from 'react-dom/server';
import { createStore,applyMiddleware,compose }      from 'redux';
import { Provider }         from 'react-redux';
import thunk                from 'redux-thunk';
import reducers             from "../src/reduce";
import { StaticRouter }     from 'react-router-dom'
import App                  from '../src/App';
import staticPath           from '../build/asset-manifest.json'

assetHook({
    extensions: ['svg','png'],
    limit: 8000
});

const app           = express();
const ApiRouter     = require('./api');
const server        = require('http').Server(app);
const io            = require('socket.io')(server);
const { user: User,chat:Chat } = require('./schema');

// 判断是否存在这个表，没有则创建新的
Chat.sync({
    force: false
}).then(() => {
    console.log("[Chat is success]");
}).catch(e=>{ 
    Chat.sync();
})
User.sync({
    force: false
}).then(() => {
    console.log("[User is success]");
}).catch(e => {
    User.sync();
})

io.on('connection', function (socket) {
    socket.on('sendmsg',(data)=>{
        const {from,to,msg} = data;
        const chatid = [from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg}).then(doc=>{
            const _doc = Object.assign(doc,{read:false})
            io.emit('recemsg', _doc)
        }).catch(e=>{
            console.log('e', e)
        })
    })
});

app.use(cookieParse());
app.use(bodyParse.json());
app.use('/api', ApiRouter);

// 允许跨域
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
app.use(function (req, res, next) {
    if (req.url.startsWith('/api/') || req.url.startsWith('/static/')) {
        return next()
    }
    const store = createStore(reducers, compose(
        applyMiddleware(thunk)
    ));
    const context = {}
    // 使用renderToString()
    // const markup = renderToString(
    //         (<Provider store={store}>
	// 			<StaticRouter
    //                 location={req.url}
    //                 context={context}
    //             >
    //                 <App />
	// 			</StaticRouter>
    //         </Provider>))
    const SEO_obj = {
        '/msg': 'React聊天',
        '/boss': 'boss查看牛人列表',
        '/': 'React招聘APP'
    }
    res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="theme-color" content="#000000" />
            <link rel="stylesheet" href="${staticPath['main.css']}">
            <link href="${staticPath['static/css/2.fcdf7ef0.chunk.css']}" rel="stylesheet">
            <meta name="description" content="${SEO_obj[req.url]}" />
            <meta name="keywords" content="React,Redux,SSR,React-router,Socket.io" />
            <meta name="author" content="Imooc" >
            <title>React Chat App</title>
        </head>
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root">`)
    // 使用renderToNodeStream
    const markupStream = renderToNodeStream(
        (<Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}
            >
                <App />
            </StaticRouter>
        </Provider>))
    markupStream.pipe(res,{end:false});
    markupStream.on('end',()=>{
        res.write(`</div>
            <script>!function(l){function e(e){for(var r,t,n=e[0],o=e[1],u=e[2],f=0,i=[];f<n.length;f++)t=n[f],p[t]&&i.push(p[t][0]),p[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(l[r]=o[r]);for(s&&s(e);i.length;)i.shift()();return c.push.apply(c,u||[]),a()}function a(){for(var e,r=0;r<c.length;r++){for(var t=c[r],n=!0,o=1;o<t.length;o++){var u=t[o];0!==p[u]&&(n=!1)}n&&(c.splice(r--,1),e=f(f.s=t[0]))}return e}var t={},p={1:0},c=[];function f(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return l[e].call(r.exports,r,r.exports,f),r.l=!0,r.exports}f.m=l,f.c=t,f.d=function(e,r,t){f.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},f.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.t=function(r,e){if(1&e&&(r=f(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(f.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)f.d(t,n,function(e){return r[e]}.bind(null,n));return t},f.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(r,"a",r),r},f.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},f.p="/";var r=window.webpackJsonp=window.webpackJsonp||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var s=n;a()}([])</script>
            <script src="${staticPath['main.js']}"></script>
            <script src="${staticPath['static/js/2.60f4fa54.chunk.js']}"></script>
        </body>
        </html> `)
        res.end();
    })
   
    // const pageHtml = `
    //     <!DOCTYPE html>
    //         <html lang="en">
    //         <head>
    //             <meta charset="utf-8" />
    //             <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    //             <meta name="theme-color" content="#000000" />
    //             <link rel="stylesheet" href="${staticPath['main.css']}">
    //             <link href="${staticPath['static/css/2.48177693.chunk.css']}" rel="stylesheet">
    //             <meta name="description" content="${SEO_obj[req.url]}" />
    //             <meta name="keywords" content="React,Redux,SSR,React-router,Socket.io" />
    //             <meta name="author" content="Imooc" >
    //             <title>React Chat App</title>
    //         </head>
    //         <body>
    //             <noscript>You need to enable JavaScript to run this app.</noscript>
    //             <div id="root">${markup}</div>
    //             <script>!function(l){function e(e){for(var r,t,n=e[0],o=e[1],u=e[2],f=0,i=[];f<n.length;f++)t=n[f],p[t]&&i.push(p[t][0]),p[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(l[r]=o[r]);for(s&&s(e);i.length;)i.shift()();return c.push.apply(c,u||[]),a()}function a(){for(var e,r=0;r<c.length;r++){for(var t=c[r],n=!0,o=1;o<t.length;o++){var u=t[o];0!==p[u]&&(n=!1)}n&&(c.splice(r--,1),e=f(f.s=t[0]))}return e}var t={},p={1:0},c=[];function f(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return l[e].call(r.exports,r,r.exports,f),r.l=!0,r.exports}f.m=l,f.c=t,f.d=function(e,r,t){f.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},f.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.t=function(r,e){if(1&e&&(r=f(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(f.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)f.d(t,n,function(e){return r[e]}.bind(null,n));return t},f.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(r,"a",r),r},f.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},f.p="/";var r=window.webpackJsonp=window.webpackJsonp||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var s=n;a()}([])</script>
    //             <script src="${staticPath['main.js']}"></script>
    //             <script src="${staticPath['static/js/2.60f4fa54.chunk.js']}"></script>
    //         </body>
    //         </html> `
    // res.send(pageHtml)
    // return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))
server.listen(9070, (err) => {
    if(err){
        console.log('err', err)
    }else{
        console.log('express node 在9070启动成功！')
    }
})