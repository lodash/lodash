/**
 * check devices environmental  
 *
 * @since 4.17.4
 * @param {env} devices env {IOS, Andriod, WeChat, {your app custom}}.
 * @param {num} devices env version {'IOS', '9'}.
 * @returns {Boolean} Returns ture or false.
 * @example
 * 
 * devices('IOS') // => true.
 * 
 * devices('IOS', 9) // => true.
 * 
 * devices('IOS', '9_1') // => true.
 * 
 */

function devices(env, num) {
    
    //not in browers
    if(!window || !window.navigator) return false;

    //define userAgent
    const AGENT = navigator.userAgent;

    // define some devices env's RegExp as REG
    const REG = {
        IOS: new RegExp('iPhone; CPU iPhone OS ' + (num||''), 'i','g'),
        Android: new RegExp('Linux; Android ' + (num||''), 'i','g'),
        WeChat: new RegExp('MicroMessenger/' + (num||''), 'i','g'),
        Custom : new RegExp(env, 'i','g')
    }

    // define devices types
    const NOW_DEVICES = /IOS|Android|WeChat/;

    //in custom env types
    if(!NOW_DEVICES.test(env)) {

       return  REG.Custom.test(AGENT);
    }

    // in IOS Android and WeChat
    return REG[env].test(AGENT);

}

export default devices;

/**
 * doc
 * 
 * just in IOS 10.3.2
 * 
 * num use ' _ ' not ' . '
 * 
 * devices('IOS') //=> true
 * devices('IOS', 10) //=> true
 * devices('IOS', '10_3') //=> true
 * devices('IOS', '10.3') //=> false
 * devices('IOS', '9') //=> false
 * devices('Android') //=> false
 * 
 * 
 * just in Android 7.0.0
 * 
 * num use ' . ' not ' _ '
 * 
 * devices('Android') //=> true
 * devices('Android', 7) //=> true
 * devices('Android', '7_0') //=> false
 * devices('Android', '7.0') //=> true
 * devices('Android', '9') //=> false
 * devices('IOS') //=> false
 * 
 * just in WeChat 6.12
 * 
 * num use ' . ' not ' _ '
 * 
 * devices('WeChat') //=> true
 * devices('WeChat', 6) //=> true
 * devices('WeChat', '6_12') //=> false
 * devices('WeChat', '6.12') //=> true
 * devices('WeChat', '5') //=> false
 * devices('IOS') //=> false
 * 
 */
