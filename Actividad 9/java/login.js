 const $submit = document.getElementById("submit"),
       $password = document.getElementById("password"),
       $user = document.getElementById("user"),
       $lu = document.getElementById("u");
       $lc = document.getElementById("c");
       
document.addEventListener("click", (e)=>{   
    if(e.target === $submit){
        if($password.value === "2025" && $user.value === "alumno"){
            e.preventDefault();
            window.location.href = "home.html";
        }
    }

})