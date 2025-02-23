const splitString = (str, n) => {
    if (str.length <= n) {
        return [str];
    }
    return [str.slice(0, n) + "..."];
};

export { splitString };