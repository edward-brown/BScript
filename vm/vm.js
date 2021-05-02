// Example program and compiled result
// var a = 1 + 1 ---- 0x06, 0x01, 0x01
// var a = 2 * 2 ---- 0x08, 0x02, 0x02

// Prog stack
const progMem = ["0x06", "0x01", "0x01"];

// Prog counter
let progCounter = 0;

// Ram
const ram = [];

// Get next 2
const getTwo = () => {
    var a = parseInt(opcodes["0x02"]());
    var b = parseInt(opcodes["0x02"]());

    return { a, b };
};

const opcodes = {
    // Mov
    "0x01": () => {
        let pos = parseInt(opcodes["0x02"]());
        progCounter = pos;
    },

    // Pop
    "0x02": () => {
        return progMem.shift();
    },

    // Push to start of progmem
    "0x03": (code) => {
        progMem.unshift(code);
    },

    // Store
    "0x04": () => {},

    // Fetch
    "0x05": () => {},

    // Add
    "0x06": () => {
        const { a, b } = getTwo();
        ram.push(a + b);
    },

    // Sub
    "0x07": () => {
        const { a, b } = getTwo();
        ram.push(a - b);
    },

    // Mul
    "0x08": () => {
        const { a, b } = getTwo();
        ram.push(a * b);
    },

    // Div
    "0x09": () => {
        const { a, b } = getTwo();
        ram.push(a / b);
    },
};

const vm = () => {
    while (progCounter < progMem.length) {
        var code = opcodes["0x02"]();

        if (opcodes.hasOwnProperty(code)) {
            opcodes[code]();
        } else {
            // Invalid opcode fault
        }
    }
};

vm();

console.log(ram);
