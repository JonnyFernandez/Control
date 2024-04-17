const Ctrl = require('../controllers/authCtrl')



module.exports = {

    codeCart: () => {
        const letter = "C";
        const numbers = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
        return `${letter}${numbers}`;
    },
    codeProd: (category) => {
        const letter = category === 'limpieza' ? 'L' : category === 'jugueteria' ? 'J' : category === 'quimica' ? 'Q' : category === 'sueltos' ? 'S' : category === 'piscina' ? 'P' : category === 'bazar' ? 'B' : category === 'plasticos' ? 'P' : category === 'indumentaria' ? 'I' : ''

        const numbers = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
        return `${letter}${numbers}`;
    },




}





