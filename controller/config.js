export class Configurator {
    configure(request, respond) {
        let config = {}

        if (request.cookies.config) {
            config = JSON.parse(request.cookies.config);
        }
        else {
            config = {
                style: "",
                filter: false,
                order: "dueDate",
                asc: 1
            }
        }

        if (request.query.order !== undefined){
            let split = request.query.order.split('_');
            config.order = split[0];
            config.asc = (split[1] === 'asc') ? 1 : -1;
        }

        if (request.query.style !== undefined){
            config.style = request.query.style;
        }

        if (request.query.filter !== undefined){
            config.filter = !!request.query.filter;
        }

        let configurationString = JSON.stringify(config);
        if (request.cookie === undefined) {
            request.cookie = {};
        }
        request.cookie.config = configurationString;
        respond.cookie('config', configurationString, {
            maxAge: 1000000
        });
        return config;
    }
}

 export const configurator = new Configurator();