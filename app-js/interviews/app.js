"use strict";

import Interviews   from './views/pages/interviews.js'
import About        from './views/pages/about.js'
import Error404     from './views/pages/error404.js'
import Calender     from  './views/pages/calender.js'

import Navbar       from './views/components/navbar.js'
import Bottombar    from './views/components/bottombar.js'

import Utils        from './services/utils.js'

const routes = {
    '/'           :    Interviews,
    '/about'      :    About,
    '/calender'   :    Calender,
    '/new'        :    New
};

const router = async () => {
    const content = document.getElementById('page_container');
    let request = Utils.parseRequestURL();
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    content.innerHTML = await page.render();
    page.postRender();
};

const pageLoad = async() => {
    const header = document.getElementById('header_container');
    const footer = document.getElementById('footer_container');
    header.innerHTML = await Navbar.render();
    footer.innerHTML = await Bottombar.render();
};


window.addEventListener("hashchange", router);
window.addEventListener("load", router);
window.addEventListener("load", pageLoad);