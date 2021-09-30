const { DateTime } = require("luxon");

const isDate = ( value ) => {

    if ( !value ){
        return false;
    }

    const isValid = DateTime.isDateTime( value );

    if ( isValid ) {
        return true;
    } else {
        return false;
    }
}

module.exports = isDate;