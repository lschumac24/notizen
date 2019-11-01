export class Configurator {
    constructor(){
        this.config = {
            style: "",
            filter: false,
            order: "dueDate",
            asc: 1
        }
    }
    configure(request, respond) {
        if (request.query.order !== undefined){
            let split = request.query.order.split('_');
            this.config.order = split[0];
            this.config.asc = (split[1] === 'asc') ? 1 : -1;
        }

        if (request.query.style !== undefined){
            this.config.style = request.query.style;
        }

        if (request.query.filter !== undefined){
            this.config.filter = !!request.query.filter;
        }
        return this.config;
    }
}

 export const configurator = new Configurator();