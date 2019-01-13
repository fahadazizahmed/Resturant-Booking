module.exports = {
  truncate : function(str,len){
    if(str.length > len && str.length > 0){
      var new_str  = str + " ";//append " at the end of the string"
      new_str = str.substr(0, len);//take substring of the give lenght
      new_str= str.substr(0, new_str.lastIndexOf(" "));//append " " to the new string and again take it substrig and sotre new_string
      new_str = (new_str.length > 0) ? new_str : str.substr(0,len);
      return new_str + '...';
    }
    return str;
  },
  stripTags : function(input){
    return input.replace(/<(?:.|\n)*?>/gm, '');
  }
}
