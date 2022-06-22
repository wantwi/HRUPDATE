/**
 * Returns the height and width of the device screen
 * @returns //{width, height}
 */
export function GetWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}

export async function GetRequest(url, options = {}) {
    const response = await fetch(url);
    // if (!response.ok) {
    //     const message = `An error has occured: ${response.status}`;
    //     throw new Error(message);
    // }
    return response //.json();
}

/**
 * Function to make multiple GET requests simultaneously
 * @param {Array<string>} urls 
 * @param {object} options 
 * @returns {Promise<Response[]>}
 */
export async function MultipleGetRequest(urls = [], options = {}) {
    let response = await Promise.all(urls.map(url => GetRequest(url, options)));
    return response;
    /*.then(([items, contactlist, itemgroup]) => {
        
    }).catch((err) => {
        console.log(err);
    });*/
}

/**
 * Function to make a POST request
 * @param {string} url
 * @param {object} options 
 * @returns {Promise<Response[]>}
 */
export async function PostRequest(url = '', options = { data: null }) {
   console.log({url})
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(options.data) // body data type must match "Content-Type" header
    });
    return response //.json(); // parses JSON response into native JavaScript objects
}

export async function PutRequest(url = '', options = { data: null }) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(options.data) // body data type must match "Content-Type" header
    });
    return response // .json(); // parses JSON response into native JavaScript objects
}

export async function DeleteRequest(url = '', options = { data: null }) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(options.data) // body data type must match "Content-Type" header
    });
    return response //.json(); // parses JSON response into native JavaScript objects
}

export const DateHandler = {

    getCurrentDate: (format = 'us', seperator = '/') => {
        let date = new Date();
        let sep = seperator;
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        format = format.toLowerCase()
        return format === 'us' ? `${month}${sep}${day}${sep}${year}` :
            format === 'gb' ? `${day}${sep}${month}${sep}${year}` : 'Invalid Date'
    },

    customDate: (date, format = 'dmy', separator = '/') => {
        date = new Date(date)
        let s = separator
        format = format.toLowerCase()
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return format === "dmy" ? `${day}${s}${month}${s}${year}` : format === "mdy" ?
            `${month}${s}${day}${s}${year}` : format === "ymd" ?
                `${year}${s}${month}${s}${day}` : 'Invalid Date'
    },

    addDays: (date, NumWorkDays) => {
        date = new Date(date);
        date.setDate(date.getDate() + NumWorkDays);
        return date;
    },

    calendarHelp: (date, sep) => {
        date = new Date(date);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let year = date.getFullYear();
        let month = (1 + date.getMonth());
        let day = date.getDate().toString();
        return `${day}${sep}${months[month - 1]}${sep}${year}`
    },

    getCalculatedAge: (birthdate) => {
        let today = new Date();
        let birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },

    formatDateForDB: (date) => {
        let _date = new Date(date);
        return _date.toISOString()//.split("T")[0];
    }
}

/**
 * Function returns true or false on whether the value passed is an object
 * @param {*} value [required]
 * @returns 
 */
export const isObject = (value) => (typeof value === 'object' && value !== null && !Array.isArray(value));

/**
 * Function returns query as an object with name as the key.
 * @param {*} url [required]
 * @returns object
 */
export const extractQuery = (url) => {
    let urlParams = {};
    (window.onpopstate = function () {
        let match,
            pl = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query = new URL(url);

        while (match === search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
    })();

    return urlParams;
}


/** ------------------------ VARIABLES ---------------------------------- */

export const CardBodyHeight = `${(GetWindowDimensions().height / 1.7)}px`;

export const BoolStatus = [{ id: -1, name: 'Select Status' }, { id: true, name: 'Active' }, { id: false, name: 'Inactive' }];

export const TestCompanyId = "F9475BB6-D10F-4161-9268-B6DD827A3CDF";

/* ----------------------Money Formatter---------------------------- */

export const moneyFormatter = (num)=> {
    return 1234567
    //return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

 export const numberFormat = (value) =>
 new Intl.NumberFormat('en-IN', {
   style: 'currency',
   currency: 'GHC'
 }).format(value);

 export const HttpAPIRequest = (method, url, data) => {

    return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? {
    'Content-Type': 'application/json'
    } : {}
    })
    .then(response => {
    
    if (response.status >= 400) {
    const error = new Error("Something went wrong" + "\n" + response.statusText);
    throw error;
    }
    return response.json()
    })
    }