const asyncForEach = async(array, callback) => {
    const length = array.length;
    for (let index = 0; index < length; index++) {
        await callback(array[index], index, array);
    }
};

module.exports = {
    asyncForEach
};
