let Error404 = {

    render : async () => {
        let view =  /*html*/`
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        `;
        return view
    },
    postRender : async () => {
    }
};
export default Error404;