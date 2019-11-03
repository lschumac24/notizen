export function loadAndAdjustConfigFromSession(req, res) {

    let config = {};

    if(req.session.config){
        config = req.session.config;
    } else {
        config = {
            style: false,
            filter: false,
            sortBy: "dueDate_asc",
        };
        req.session.config = config;
    }

    if (req.query.sortBy !== undefined){

        switch (req.query.sortBy){
            case 'dueDate_asc':
            case 'createDate_asc':
            case 'importance_asc':
            case 'dueDate_desc':
            case 'createDate_desc':
            case 'importance_desc':
                config.sortBy = req.query.sortBy;
                break;
            default:
                break;
        }
    }

    if (req.query.style !== undefined){
        config.style = (req.query.style === 'true');
    }

    if (req.query.filter !== undefined){
        config.filter = (req.query.filter === 'true');
    }
    return config;
}
