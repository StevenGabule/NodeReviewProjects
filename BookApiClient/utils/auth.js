import cookie from 'js-cookie';
import Router from 'next/router';

export function handleLogin({data}) {
    console.log(data.accessToken)
    cookie.set('token', data.accessToken);
    Router.push("/").then();
}

export function redirectUser(ctx, location) {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location});
        ctx.res.end();
    } else {
        Router.push(location).then();
    }
}

export function handleLogout() {
    cookie.remove('token');
    window.localStorage.setItem("logout", Date.now());
    Router.push("/login").then();
}