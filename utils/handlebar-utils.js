export function registerHelpers(hbs) {
    hbs.registerHelper('ifeq', function (a, b, opts) {
        if (a === b)
            return opts.fn(this);
        else
            return opts.inverse(this);
    });

    hbs.registerHelper('repeat', (n, blockData) => {
        let repeatedBlock = '';
        for(let i = 0; i < n; i++)
            repeatedBlock += blockData.fn(i);
        return repeatedBlock;
    });
}