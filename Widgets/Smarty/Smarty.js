
 dataLimit = args.widgetParameter
if ( dataLimit == null ) { dataLimit = 20 }


let SMARTY_EMAIL    = "email@smart.com"
let SMARTY_PASSWORD = "thisIsMyP455W0rd5ttt56yyh"

let conf = "smarty.json"
let confJson = await getConf(conf)

let token = confJson["jwt"]

let BASE_URL = "https://smarty.co.uk/api/v1"
let AUTH_URL = BASE_URL + "/users/token"
let USAGE_URL = BASE_URL + "/usage"

let tokenPayload = { auth: { email: SMARTY_EMAIL, password: SMARTY_PASSWORD } }
let tokenHeader = { "authority": "smarty.co.uk", "referer": "https://smarty.co.uk/login", "origin": "https://smarty.co.uk", "Content-Type": "application/json" }


let usageHeader = { "Authorization": "Bearer " + token }
let usagePayload = null

try {
  output = await getJson(USAGE_URL, usagePayload, usageHeader, "GET")
}
catch(err) {
  output = await getJson(AUTH_URL, tokenPayload, tokenHeader, "POST")
  token = output.data.attributes.jwt
  usageHeader = { "authority": "smarty.co.uk", "authorization: Bearer": token }
  tkn = { "jwt": token }
  writeConf(conf, tkn )
  // need to write the token here

}
finally {
  output = await getJson(USAGE_URL, usagePayload, usageHeader, "GET")
}

