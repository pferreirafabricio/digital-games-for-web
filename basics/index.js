/**
 * @param {string} url 
 */
function redirectTo(url) {
    window.open(url);
}

/**
 * @param {string} color 
 */
function changeBackgroundColor(color) {
    const background = document.getElementsByTagName('body')[0];

    background.style.backgroundColor = color;
}

/**
 * @param {String} id 
 * @returns 
 */
function getInputValue(id) {
    return document.getElementById(id).value;
}

/**
 * @param {Number} monthNumber 
 * @returns {String}
 */
function getMonthName(monthNumber) {
    if (monthNumber == 1) {
        return "January";
    } else if (monthNumber == 2) {
        return "February";
    } else if (monthNumber == 3) {
        return "March";
    } else if (monthNumber == 4) {
        return "April";
    } else if (monthNumber == 5) {
        return "May";
    } else if (monthNumber == 6) {
        return "June";
    } else if (monthNumber == 7) {
        return "July";
    } else if (monthNumber == 8) {
        return "August";
    } else if (monthNumber == 9) {
        return "September";
    } else if (monthNumber == 10) {
        return "October";
    } else if (monthNumber == 11) {
        return "November";
    } else if (monthNumber == 12) {
        return "December";
    } else {
        return `Month not found with the number ${monthNumber || '0'}`;
    }
}

function writeMany(textElementId = 'loopText', quantityElementId = 'loopNumber', messageContainerElement = 'messages') {
    const text = getInputValue(textElementId);
    const quantity = Number(getInputValue(quantityElementId));
    
    const messagesElement = document.getElementById(messageContainerElement);

    messagesElement.innerHTML = '';
    
    let index = 0;

    // for (index = 0; index < quantity; index++)
    // {
    //     // document.write(`${index} - ${text} <br/>`);
    //     messagesElement.appendChild(document.createTextNode(`${index} - ${text}`))
    //     messagesElement.appendChild(document.createElement('br'));
    // }

    while (index < quantity) {
        messagesElement.appendChild(document.createTextNode(`${index} - ${text}`))
        messagesElement.appendChild(document.createElement('br'));
        index++;
    }

    // do {
    //     messagesElement.appendChild(document.createTextNode(`${index} - ${text}`))
    //     messagesElement.appendChild(document.createElement('br'));
    //     index++;
    // } while (index < quantity);
}