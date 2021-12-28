const bbb = require('bigbluebutton-js')
const { response } = require('express')
 
let api = bbb.api(
    process.env.BBB_URL, 
    process.env.BBB_SECRET
  )
let http = bbb.http
 

let meetingCreateUrl = api.administration.create('My Meeting', '1', {
  duration: 60,
  attendeePW: 'secret',
  moderatorPW: 'supersecret',
})

const createServer =async (req, res = response )=>{
    try {
        const {nombre}=req.usuario;
    console.log(nombre);
  const result = await http(meetingCreateUrl);
  let moderatorUrl = api.administration.join(nombre, '1', 'supersecret')
  let attendeeUrl = api.administration.join('attendee', '1', 'secret')
  console.log(`Moderator link: ${moderatorUrl}\nAttendee link: ${attendeeUrl}`)
 
  let meetingEndUrl = api.administration.end('1', 'supersecret')
  console.log(`End meeting link: ${meetingEndUrl}`)
  console.log(result);
  res.json({
      result:result,
      url:moderatorUrl
  })
    } catch (error) {
        console.log(error)
        res.json({
            ok:false
        })
    }
}

module.exports={
    createServer
}