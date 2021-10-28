function describe(text) {
    console.log('%c' + text, 'font-weight: bold; font-size: 2rem;')
}

function success(text) {
    console.log('%c' + text + ' ✅ 💃🕺', 'font-weight: bold; color: green; font-size: 1rem;')
}

function fail(text) {
    console.log('%c' + text + ' ❌ 💀🪦', 'font-weight: bold; font-size: 1rem; color: red')
}