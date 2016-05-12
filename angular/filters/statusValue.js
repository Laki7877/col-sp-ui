module.exports = [function () {
    return function (data) {
        if (!data) return data;

        var ret = '';

        switch (data) {
            case 'AP': ret = 'Approved'; break;
            case 'RJ': ret = 'Reject'; break;
            case 'WA': ret = 'Wait for Approval'; break;
        }

        return ret;
    };
}]