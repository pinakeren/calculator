let current = "";
let previous = "";
let op = null;

const display =
    document.getElementById("display");

const history =
    document.getElementById("history");


// ==========================
// MEMASUKKAN ANGKA
// ==========================

function number(num) {

    // Tidak boleh ada dua titik
    if (
        num === "." &&
        current.includes(".")
    ) {
        return;
    }

    // Mencegah 000
    if (
        current === "0" &&
        num !== "."
    ) {
        current = "";
    }

    current += num;

    display.innerText =
        format(current);
}


// ==========================
// OPERATOR
// ==========================

function operator(symbol) {

    if (
        current === "" &&
        previous === ""
    ) {
        return;
    }

    // Jika sudah ada operasi
    if (
        previous !== "" &&
        current !== ""
    ) {
        calculate();
    }

    previous = current;

    current = "";

    op = symbol;

    history.innerText =
        format(previous) +
        " " +
        symbolView(symbol);
}


// ==========================
// HASIL
// ==========================

function calculate() {

    if (
        previous === "" ||
        current === "" ||
        !op
    ) {
        return;
    }

    const a =
        parseFloat(previous);

    const b =
        parseFloat(current);

    let result;


    if (op === "+") {
        result = a + b;
    }


    if (op === "-") {
        result = a - b;
    }


    if (op === "*") {
        result = a * b;
    }


    if (op === "/") {

        if (b === 0) {

            display.innerText =
                "ERROR";

            history.innerText =
                "Tidak bisa dibagi 0";

            current = "";
            previous = "";
            op = null;

            return;
        }

        result = a / b;
    }


    history.innerText =
        format(previous) +
        " " +
        symbolView(op) +
        " " +
        format(current) +
        " =";


    // Membatasi angka desimal
    current = String(
        Math.round(
            result * 100000000
        ) / 100000000
    );


    previous = "";

    op = null;


    display.innerText =
        format(current);
}


// ==========================
// CLEAR
// ==========================

function clearCalc() {

    current = "";

    previous = "";

    op = null;

    display.innerText = "0";

    history.innerText = "";
}


// ==========================
// HAPUS SATU ANGKA
// ==========================

function backspace() {

    current =
        current.slice(0, -1);

    display.innerText =
        current
            ? format(current)
            : "0";
}


// ==========================
// PERSEN
// ==========================

function percent() {

    if (current === "") {
        return;
    }

    current =
        String(
            parseFloat(current) / 100
        );

    display.innerText =
        format(current);
}


// ==========================
// FORMAT ANGKA
// ==========================

function format(value) {

    if (value === "") {
        return "0";
    }

    const parts =
        value.split(".");

    parts[0] =
        Number(
            parts[0]
        ).toLocaleString("id-ID");

    return parts.join(".");
}


// ==========================
// SIMBOL OPERATOR
// ==========================

function symbolView(symbol) {

    if (symbol === "*") {
        return "×";
    }

    if (symbol === "/") {
        return "÷";
    }

    if (symbol === "-") {
        return "−";
    }

    return symbol;
}


// ==========================
// KEYBOARD
// ==========================

document.addEventListener(
    "keydown",
    function(event) {

        const key = event.key;


        // Angka
        if (
            !isNaN(key) ||
            key === "."
        ) {
            number(key);
        }


        // Operator
        if (
            ["+", "-", "*", "/"]
            .includes(key)
        ) {
            operator(key);
        }


        // Enter
        if (
            key === "Enter" ||
            key === "="
        ) {
            calculate();
        }


        // Backspace
        if (
            key === "Backspace"
        ) {
            backspace();
        }


        // Escape
        if (
            key === "Escape"
        ) {
            clearCalc();
        }


        // Persen
        if (
            key === "%"
        ) {
            percent();
        }

    }
);