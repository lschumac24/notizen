export function registerHelpers(hbs) {
    hbs.registerHelper('ifeq', function (a, b, opts) {
        if (a === b)
            return opts.fn(this);
        else
            return opts.inverse(this);
    });
}