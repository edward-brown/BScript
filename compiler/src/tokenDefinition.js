const TokenDefinition = (pat, pr = null, t = null) => ({
    pattern: pat,
    prio: pr,
    type: t,

    Match: function (input) {
        return input.matchAll(this.pattern);
    },
});

export default TokenDefinition;
