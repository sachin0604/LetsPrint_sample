Number.prototype.toFixedVSS = function (places) {
    try {
        var value = this;
        var stringValue = value + "";
        var strInfo = stringValue.split(".");
        if (strInfo.length == 1)
            return value + "";
        if (places < 0) throw new Error('Invalid Argument for places');
        if (places == 0) {
            return parseFloat(value).toFixed(0) + "";
        } else {
            var length = parseInt(strInfo[1].length);
            for (var i = length; i > places; i--) {
                var roundOffPlaces = parseInt(i - 1);
                value = roundFromFloatMain(value, roundOffPlaces);
                stringValue = value + "";
                strInfo = stringValue.split(".");
                if (strInfo.length == 1)
                    return value + "";
                var newLength = parseInt(strInfo[1].length);
                if (newLength <= places) {
                    return value + "";
                } else {
                    var diff = roundOffPlaces - newLength;
                    if (diff != 0)
                        i = i - diff;
                }
            }
            return value + "";
        }
    } catch (err) {
        return value.toFixed(places);
    }

};


var roundFromFloatMain = function (value, places) {
    if (places < 0) throw new IllegalArgumentException();
    var info = (value + "").split(".");

    var integralPartStr = info[0];
    var fractionalPartStr = info[1];

    var valueAfterRoundingPlace = parseInt(fractionalPartStr.substring(places));
    if (valueAfterRoundingPlace >= 5) {
        var valueToBeAdded = "0.";
        for (var i = 0; i < places - 1; i++) {
            valueToBeAdded += "0";
        }
        valueToBeAdded += "1";
        fractionalPartStr = fractionalPartStr.substring(0, places);
        var oldValue = parseFloat(integralPartStr + "." + fractionalPartStr);
        var floatAddition = parseFloat(valueToBeAdded);
        var newValue = oldValue + floatAddition;
        newValue = parseFloat(newValue.toFixed(places));
        return newValue;
    } else {
        var valueToBeAdded = "0.";
        for (var i = 0; i < places - 1; i++) {
            valueToBeAdded += "0";
        }
        valueToBeAdded += "0";
        fractionalPartStr = fractionalPartStr.substring(0, places);
        var oldValue = parseFloat(integralPartStr + "." + fractionalPartStr);
        var floatAddition = parseFloat(valueToBeAdded);
        var newValue = oldValue + floatAddition;
        newValue = parseFloat(newValue.toFixed(places));
        return newValue;
    }
}