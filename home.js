$(".submit-btn").click(async function(){
    let data ={
        name: $("#name").val(),
        roomId: $("#room-id").val()
    }
    if(data.name === ""){
        alert("Name is required")
    }
    else{
        if(data.roomId === ""){
           await $.ajax({
                "url":"/generate-room-id",
                "type":"get",
                "success":function(resp){
                    data.roomId= resp.roomId;
                    console.log(resp);
                }
            })
        }
        
    }
    window.location.href = `/chat?name=${data.name}&roomId=${data.roomId}`
  });

