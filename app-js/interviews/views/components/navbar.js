let Navbar = {
    render: async () => {
        let view =  /*html*/`
             <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="container">
                    <div id="navbarBasicExample" class="navbar-menu is-active" aria-expanded="false">
                        <div class="navbar-start">
                            <a class="navbar-item" onclick="window.location.href = '/#';">
                                List of Interviews
                            </a>
                            <a class="navbar-item" onclick="window.location.href = '/#/about';">
                                About
                            </a>
                            <a class="navbar-item" onclick="window.location.href = '/#/calender';">
                                Calender
                            </a>
                        </div>
                        <div class="navbar-end">
                            <div class="navbar-item">
                                <div class="buttons">
                                    <a class="button is-primary" href="javascript:void(0)/new">
                                        <strong>New Interview</strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `
        return view
    }

}

export default Navbar;