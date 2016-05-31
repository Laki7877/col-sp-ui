Date.prototype.toJSON = function () {
  return moment(this).format().split("+")[0];
}
