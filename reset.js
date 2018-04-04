/**
 * Will reset value(s) of properties of given object or an array of object
 * Helpful if we want to rest object value to default 
 * For.eg: property typeof number will be set to 0, property typeof boolean set to false
 */
function reset(options,data){
if(options === undefined || options === null){
  options ={};
  options.number = 0;
  options.boolean = false;
  options.string = '';
}

  for (var prop in data) {
                    if (typeof data[prop] === 'object') {
                        data[prop] = CommonService.reset(data[prop]);
                    }
                    else {
                        if (typeof data[prop] !== 'function') {
                            var dataType = typeof data[prop];
                            var returnType = null;
                            switch (dataType) {
                                case 'number':
                                    returnType = options.number?options.number:0;
                                    break;
                                case 'string':
                                    returnType = options.string?options.string:'';
                                    break;
                                case 'boolean':
                                    returnType = options.boolean?options.boolean:false;
                                    break;
                                default:
                                    break;
                            }
                            data[prop] = returnType;
                        }

                    }
                }
                return data;

}
export default reset
