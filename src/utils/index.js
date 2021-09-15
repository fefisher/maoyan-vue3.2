export const transNCR = str => {
    var regex_num_set = /&#(\xdd+);/g;
    str = str.replace(regex_num_set, (_, $1) => {
        return String.fromCharCode($1);
    });
    return str
}