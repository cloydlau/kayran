import '../tests/getPropByPath.test'
import '../tests/isEllipsis.test'
import '../tests/isEmpty.test'
import '../tests/jsonToFormData.test'
import '../tests/loadScript.test'
import '../tests/loadStyle.test'
import '../tests/paramFilter.test'
import '../tests/parseQueryString.test'
import '../tests/typeOf.test'
import '../tests/validator.test'

import loadStyle from './loadStyle'
import highlightError from '../src/highlightError'

loadStyle(`
    .jest-lite-report__summary-status {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      font-size: 1.5rem;
      font-weight: bold;
      backdrop-filter: blur(3px);
      padding: 2rem;
    }
    
    .jest-lite-report {
      padding-top: 6rem;
    }
  `)

let promise
prettify.toHTML(promise = run(), document.body)
promise.then(res => {
  let passCnt = 0, fail = false
  for (let v of res) {
    if (v.status === 'fail') {
      fail = true
    } else if (v.status === 'pass') {
      passCnt++
    }
  }
  if (fail) {
    setTimeout(() => {
      highlightError('.jest-lite-report__errors')
    }, 300)
  } else {
    console.log(`%c
${passCnt}个测试用例%c
      ___                                                ___         ___           ___           ___     
     /  /\\                                              /  /\\       /  /\\         /  /\\         /  /\\    
    /  /::\\                                            /  /::\\     /  /::\\       /  /:/_       /  /:/_   
   /  /:/\\:\\    ___     ___   ___     ___             /  /:/\\:\\   /  /:/\\:\\     /  /:/ /\\     /  /:/ /\\  
  /  /:/~/::\\  /__/\\   /  /\\ /__/\\   /  /\\           /  /:/~/:/  /  /:/~/::\\   /  /:/ /::\\   /  /:/ /::\\ 
 /__/:/ /:/\\:\\ \\  \\:\\ /  /:/ \\  \\:\\ /  /:/          /__/:/ /:/  /__/:/ /:/\\:\\ /__/:/ /:/\\:\\ /__/:/ /:/\\:\\
 \\  \\:\\/:/__\\/  \\  \\:\\  /:/   \\  \\:\\  /:/           \\  \\:\\/:/   \\  \\:\\/:/__\\/ \\  \\:\\/:/~/:/ \\  \\:\\/:/~/:/
  \\  \\::/        \\  \\:\\/:/     \\  \\:\\/:/             \\  \\::/     \\  \\::/       \\  \\::/ /:/   \\  \\::/ /:/ 
   \\  \\:\\         \\  \\::/       \\  \\::/               \\  \\:\\      \\  \\:\\        \\__\\/ /:/     \\__\\/ /:/  
    \\  \\:\\         \\__\\/         \\__\\/                 \\  \\:\\      \\  \\:\\         /__/:/        /__/:/   
     \\__\\/                                              \\__\\/       \\__\\/         \\__\\/         \\__\\/    

    `, 'color:green;font-size:2rem;', 'color:green;font-weight:bold')
  }
})
