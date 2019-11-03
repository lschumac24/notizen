export class Configurator {
    constructor(){
        this.config = {
            style: "light",
            filter: false,
            order: "dueDate",
            asc: 1
        }
    }
    configure(req, res) {
        this.parseCookie(req);

        if (req.query.order !== undefined){
            let split = req.query.order.split('_');
            this.config.order = split[0];
            this.config.asc = (split[1] === 'asc') ? 1 : -1;
        }

        if (req.query.style !== undefined){
            this.config.style = req.query.style;
        }

        if (req.query.filter !== undefined){
            this.config.filter = !!req.query.filter;
        }
        this.updateCookie(res)
        return this.config;
    }

    parseCookie(req){
        if (typeof req.cookie !== "undefined"){
            if (req.cookie.config) {
                this.config = JSON.parse(req.cookie.config);
            }
        }
    }

    updateCookie(res){
        const configStr = JSON.stringify(this.config);
        if (res.cookie === undefined) {
            res.cookie = {};
        }
        res.cookie.config = configStr;
        res.cookie('config', configStr, {
            maxAge: 1000000
        });
    }

    toggleStyle(req, res) {
        this.parseCookie(req);
        if(this.style === "dark") {
            this.style = "light";
        }
        else {
            this.style = "dark";
        }
        this.updateCookie(res);
    }
}

 export const configurator = new Configurator();