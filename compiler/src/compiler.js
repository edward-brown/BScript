import Tokenizer from "./tokenizer";

const prog = `
    int a = 0;
    int b = 1;
`;

const tokenizer = Tokenizer();

// Ignores
tokenizer.DefineIgnore(/[\\s]*/g); //Whitespace

// Tokens
tokenizer.DefineToken("literalInt", "[0-9]+");
tokenizer.DefineToken("literalFloat", "[0-9]+\\.[0-9]+([eE][-+][0-9]+)?");
tokenizer.DefineToken("literalString", "'([^'\\\\]|\\\\[\\\\nrt'])*'");

tokenizer.DefineToken("int", "int");
tokenizer.DefineToken("float", "float");
tokenizer.DefineToken("string", "string");

tokenizer.DefineToken("ident", "[_a-zA-Z][_a-zA-Z0-9]*");

tokenizer.DefineToken(";", ";");
tokenizer.DefineToken("=", "=");

const start = new Date().getTime();
const tokens = tokenizer.Tokenize(prog);
const end = new Date().getTime() - start;

console.log(tokens);
console.log(`Tokenized in ${end}ms`);
