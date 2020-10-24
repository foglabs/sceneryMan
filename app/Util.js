class Util {
  rgbToHex(r,g,b){
    return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b)
  }

  componentToHex(c) {
    c = c < 255 ? c : 255 
    var hex = c.toString(16)
    return hex.length == 1 ? "0" + hex : hex
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if(result){
      return [parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16)]
    }
  }
}
export { Util }