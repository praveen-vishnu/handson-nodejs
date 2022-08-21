exports.getDate = getDate = function () {

    var today = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return today.toLocaleDateString("en-IN", options);
}
exports.getDay = function () {

    var today = new Date();
    const options = {
        weekday: 'long'
    };
    return today.toLocaleDateString("en-IN", options);

}