import Moment from "react-moment";

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
    return response; //.json();
}

/**
 * Function to make multiple GET requests simultaneously
 * @param {Array<string>} urls
 * @param {object} options
 * @returns {Promise<Response[]>}
 */
export async function MultipleGetRequest(urls = [], options = {}) {
    let response = await Promise.all(urls.map((url) => GetRequest(url, options)));
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
export async function PostRequest(url = "", options = { data: null }) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(options.data), // body data type must match "Content-Type" header
    });
    return response; //.json(); // parses JSON response into native JavaScript objects
}

export async function PutRequest(url = "", options = { data: null }) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(options.data), // body data type must match "Content-Type" header
    });
    return response; // .json(); // parses JSON response into native JavaScript objects
}

export async function DeleteRequest(url = "", options = { data: null }) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(options.data), // body data type must match "Content-Type" header
    });
    return response; //.json(); // parses JSON response into native JavaScript objects
}

export const DateHandler = {
    getCurrentDate: (format = "us", seperator = "/") => {
        let date = new Date();
        let sep = seperator;
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : "0" + day;
        format = format.toLowerCase();
        return format === "us"
            ? `${month}${sep}${day}${sep}${year}`
            : format === "gb"
                ? `${day}${sep}${month}${sep}${year}`
                : "Invalid Date";
    },

    customDate: (date, format = "dmy", separator = "/") => {
        date = new Date(date);
        let s = separator;
        format = format.toLowerCase();
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : "0" + day;
        return format === "dmy"
            ? `${day}${s}${month}${s}${year}`
            : format === "mdy"
                ? `${month}${s}${day}${s}${year}`
                : format === "ymd"
                    ? `${year}${s}${month}${s}${day}`
                    : "Invalid Date";
    },

    addDays: (date, NumWorkDays) => {
        date = new Date(date);
        date.setDate(date.getDate() + NumWorkDays);
        return date;
    },

    calendarHelp: (date, sep) => {
        date = new Date(date);
        let months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        let year = date.getFullYear();
        let month = 1 + date.getMonth();
        let day = date.getDate().toString();
        return `${day}${sep}${months[month - 1]}${sep}${year}`;
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
        return _date.toISOString(); //.split("T")[0];
    },
};

export const handleNumberOnly = (evnt) => {
    if (!/[0-9]/.test(evnt.key)) {
        evnt.preventDefault();
    }
};

/**
 * Function returns true or false on whether the value passed is an object
 * @param {*} value [required]
 * @returns
 */
export const isObject = (value) =>
    typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Function returns query as an object with name as the key.
 * @param {*} url [required]
 * @returns object
 */
export const extractQuery = (url) => {
    let urlParams = {};
    (window.onpopstate = function () {
        let match,
            pl = /\+/g, // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) {
                return decodeURIComponent(s.replace(pl, " "));
            },
            query = new URL(url);

        while (match === search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
    })();

    return urlParams;
};

/** ------------------------ VARIABLES ---------------------------------- */

export const CardBodyHeight = GetWindowDimensions().height * 0.58;

export const BoolStatus = [
    { id: -1, name: "Select Status" },
    { id: true, name: "Active" },
    { id: false, name: "Inactive" },
];
export const BoStatus = [
    { id: -1, name: "Select Status" },
    { id: 1, name: "Active" },
    { id: 2, name: "Inactive" },
];

export const CurrencyStatus = [
    { id: false, name: "Inactive" },
    { id: true, name: "Active" },
];

export const savingsSchemeStatus = [
    { id: false, name: "Inactive" },
    { id: true, name: "Active" },
];

export const TestCompanyId = "F9475BB6-D10F-4161-9268-B6DD827A3CDF";

export const CompanyReference = "00001_A01";

/* ----------------------Money Formatter---------------------------- */

export const moneyFormatter = (num) => {
    //return 1234567
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const anotherFormatter = (n) => {
    n.toFixed(2).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
};

export const moneyInTxt = (value, standard, dec = 0) => {
    let nf = new Intl.NumberFormat(standard, {
        minimumFractionDigits: dec,
        maximumFractionDigits: 2,
    });
    return nf.format(Number(value) ? value : 0.0);
};

export const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
        //style: 'currency',
        // currency: 'GHC'
    }).format(value);

export const HttpAPIRequest = (method, url, data) => {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: data
            ? {
                "Content-Type": "application/json",
            }
            : {},
    }).then((response) => {
        if (response.status >= 400) {
            const error = new Error("Something went wrong" + response.statusText);
            throw error;
        } else {
            return response.json();
        }
    });
};

export const currencyMask = (evnt) => {
    let value = evnt.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{0})$/, "$1 $2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ",");
    evnt.target.value = value;
    return evnt;
};

export const dateTemplate = (date) => {
    const dateToFormat = "1976-04-19T12:59-0500";
    return <Moment>{dateToFormat}</Moment>;
};

export const dateFormatter = (date = null) => {
    if (date) {
        date = new Date(date);
    } else {
        date = new Date();
    }

    const hours = date.getHours();

    return {
        date: date.getDate(),

        date_us: date.toLocaleString("en-US", {
            year: "numeric",

            month: "long",

            day: "2-digit",
        }),

        date_gh: date.toLocaleString("ak-GH", {
            year: "numeric",

            month: "long",

            day: "2-digit",
        }),

        day: date.getDay(),

        year: date.getFullYear(),

        datetime: date.toJSON(),

        time: `${hours}:${date.getMinutes()}:${date.getSeconds()}`,

        greet:
            hours < 12
                ? "Good morning"
                : hours >= 12 && hours < 16
                    ? "Good afternoon"
                    : hours >= 16 && hours < 20
                        ? "Good evening"
                        : "Happy night",
    };
};

/**
 * capitalize Word => function takes string as parameter
 */
export const capitalizeWord = (arr) => {
    return arr
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
        .join(" ");
};

export const capitalizeWord2 = (arr) => {
    const strToArry = arr.split(" ");
    const getGL = strToArry.length > 1 ? strToArry.pop() : "";
    const toCap =
        strToArry.length > 1 ? strToArry.splice(0, arr.length - 1) : strToArry;

    return `${toCap
        .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
        .join(" ")} ${getGL.toUpperCase()}`;
};

/**
 * split camlecase text  => function takes word as parameter
 */

export const SplitCamleCaseGL = (word) => {
    return capitalizeWord2(word.replace(/([a-z0-9])([A-Z])/g, "$1 $2"));
};

/**
 * split camlecase text  => function takes word as parameter
 */

export const SplitCamleCase = (word) => {
    const resArray = capitalizeWord(
        word.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    ).split(" ");

    if (resArray.at(-1) === "Id") {
        resArray.pop();
        console.log({ resArray });
        return resArray.join(" ");
    } else {
        return capitalizeWord(word.replace(/([a-z0-9])([A-Z])/g, "$1 $2"));
    }
};

/**
 * flaten menus into array if menu ids
 * @param {array} menus
 * @returns []
 */

export const returnFlatenIds = (menus) => {
    return [
        ...menus, //level -1

        ...menus.flatMap((a) => a?.menus), //level -2

        ...menus.flatMap((a) => a?.menus).flatMap((b) => b?.menus), //level -3

        ...menus

            .flatMap((a) => a?.menus)

            .flatMap((b) => b?.menus)

            .flatMap((c) => c?.menus), //level-4
    ].map((d) => d?.id);
};
export const returnFlatenMenus = (menus) => {
    return [
        ...menus, //level -1

        ...menus.flatMap((a) => a?.menus), //level -2

        ...menus.flatMap((a) => a?.menus).flatMap((b) => b?.menus), //level -3

        ...menus

            .flatMap((a) => a?.menus)

            .flatMap((b) => b?.menus)

            .flatMap((c) => c?.menus), //level-4
    ].map((x) => ({ menuId: x?.id || "", accesses: x?.accesses || [] }));
};

export const isNotNull = (obj) => {
    const isNull = Object.values(obj).filter((x) => x === "");

    return isNull.length === 0 ? true : false;
};

export const validateEmail = (email) => {
    var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

/**
 * Check for only numbers/decimal inputs
 * @param {string} input
 * @returns boolean
 */
export const isValidNumber = (input) => {
    var p = new RegExp(/^[0-9]+([.][0-9]+)?$/);
    return p.test(input);
};

export const setAsInt = (value) => {
    if (typeof value === "string") {
        return +value.replace(/\,/g, "");
    }
    if (value === "") {
        return 0
    }
    return value;
};

export const removeExistingItem = (oldList, currentList) => {
    let arr = [];

    oldList.forEach((x) => {

        let obj = currentList.find(y => y?.id === x?.id);

        if (!obj) {
            arr.push(x);
        }
    });
    return arr;
};
