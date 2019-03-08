Element.prototype.animate=animate;
Element.prototype.getStyle=getStyle;
function animate(json,callback) {
    clearInterval(this.timer);
    for (var attr in json) {
        var that = this;
        this.timer = setInterval(function () {
            if (attr == 'opacity') {
                that.icur = Math.round(parseFloat(that.getStyle()[attr]) * 100);
            } else {
                that.icur = parseInt(that.getStyle()[attr]);
            }
            that.speed = (parseInt(json[attr]) - that.icur) / 10;
            that.speed = that.speed > 0 ? Math.ceil(that.speed) : Math.floor(that.speed);
            if (attr == 'opacity') {
                that.style.filter = 'alpha(opacity:' + that.icur + that.speed + ')';
                that.style.opacity = (that.icur + that.speed) / 100;
            } else {
                that.style[attr] = that.icur + that.speed + "px";
            };
            if(that.icur==parseInt(json[attr])){
                //flags=true;
                clearInterval(that.timer);
                if(callback){
                    callback();
                }
            }
        },10);
    }
}
function getStyle() {
    if (this.currentStyle) {
        return this.currentStyle;
    } else {
        return document.defaultView.getComputedStyle(this, null);
    }
}