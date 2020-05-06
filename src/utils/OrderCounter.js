function calcFoodCount(order) {
    var count = 0;
    for (var i = 0; i < order.length; i++) {
        count += order[i].count;
    }
    return count;
}

export default calcFoodCount;