let api = "7DUrRlA75b5LBRARYoTmScCTk6G6U1nG8R9mr7MGnvzA7AMxEXAMPLE";

fetch(`https://local.fusionauth.io/${api}/scim/resource/v2/Users`)
.then((res)=>res.json())
.then((data)=>{
    console.log(data)
    console.log("Amit")
})