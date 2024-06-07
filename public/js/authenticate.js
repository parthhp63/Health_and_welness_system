// console.log('script call');
if(document.querySelector("#login")){
    const login = document.querySelector('#login');
    login.addEventListener('click',async()=>{

        const form = document.querySelector('#loginform');
        let formData = new FormData(form);
        let userData = new URLSearchParams(formData);
        
        try {
          const response = await fetch('/login', {
            method: 'POST',
            body: userData,
            headers: {
              'Content-Type': "application/x-www-form-urlencoded",
            }
          });
          const resData = await response.json();
          if(response.status === 200){
            window.location.href = "/dashboard";
          } else {
            alert("invalid Username or Password");
          }
        } catch (error) {
          alert(error);
          console.log(error);
        }

    })
}