//const { name } = require("ejs");

//const { name } = require("ejs");

//<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.6.1/socket.io.js" integrity="sha512-xbQU0+iHqhVt7VIXi6vBJKPh3IQBF5B84sSHdjKiSccyX/1ZI7Vnkt2/8y8uruj63/DVmCxfUNohPNruthTEQA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
let socket = io("/");
let name = "";
let roomId = "";

//jquery for : as soon as the socket is ready
$(document).ready(function(){
    //get parameters like name and roomId from url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    name = urlParams.get("name");
    roomId = urlParams.get("roomId")
    //console.log(name)
    //console.log(roomId)

     //will emit message that user has joined, emit message from client that server will handle
    socket.emit('join-room', name , roomId)
    });

//handle emit message from server this time
socket.on("user-connected",(userName)=>{
    let html =`
        <div class="row">
            <div class="col-12 col-md-12 col-lg-12">
                ${userName} just joined the room
            </div>
        </div>

    `
    $("#chat-area").append(html)
})
$(".send-msg").click(function(){
    let msg =$("#chat-msg").val()
    if(msg === ""){
        ;
    }
    else{
        //emit the message to the server 
        socket.emit("message", name, roomId,msg)
        //this will show the message I sent to me as well
        let html = `
        <div class="row">
            <div class="col-12 col-md-12 col-lg-12">
                Me: ${msg}
            </div>
        </div>
        `
        $("#chat-area").append(html)
        $("#chat-msg").val("")
    }
})

//will send message when user hits enter
$('#chat-msg').keydown(function(e){
    debugger;
    if(e.keyCode == 13){
        $(".send-msg").click();
    }

})
//handle the receive message from server side
socket.on("receive-msg", (userName, msg)=>{
    if(name!==userName){
        let html = `
        <div class="row">
            <div class="col-12 col-md-12 col-lg-12">
                ${userName}: ${msg}
            </div>
        </div>
    
        `
        $("#chat-area").append(html)
    }

   
})