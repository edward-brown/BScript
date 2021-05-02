import Token from "./token";
import TokenDefinition from "./tokenDefinition";

const Tokenizer = () => ({
    tokenDefinitions: [],

    DefineIgnore: function (pattern) {
        this.tokenDefinitions.push(TokenDefinition(pattern));
    },

    DefineToken: function (type, pattern) {
        this.tokenDefinitions.push(TokenDefinition(pattern, 0, type));
    },

    Tokenize: function (input) {
        let matches = [];

        // Get tokens
        this.tokenDefinitions.forEach((def) => {
            if (def.type == null) {
                return;
            }

            let match = def.Match(input);
            let m = match.next();
            while (!m.done) {
                if (!matches.some((c) => c.value[0] == m.value[0] && c.index == m.value[1])) {
                    matches.push(Token(def, m.index, m.value));
                }

                m = match.next();
            }
        });

        // Sort
        matches.sort((a, b) => a?.value?.index - b?.value?.index);

        return matches;
    },
});

export default Tokenizer;
