//import { body, header } from "express-validator"
import {messageAlert} from './utils.js'


(function () {
    'use strict'
console.log('test')

  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        
        form.addEventListener('submit', async function (event) {
            
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            console.log("requuired")
          }
          else{
            event.preventDefault()
            event.stopPropagation()
            const form = event.target;

            loadStatus(true)
            
            const formData = new FormData(form);
            
            const url = form.action; // Extract the action attribute from the form

            try {
                let method;

                if (form.id == "update-media"){
                    method = "PUT";
                    console.log("updating media...")
                }else{
                    method = "POST";
                    console.log("creating media...")
                };
                
                const response = await uploadFile(formData, progressBar, url, method);
                const result = await response.json();

                if (response.ok) {
                    messageAlert(
                        title = "Upload Successful",
                        message = result.message,
                        redirectTo = result.redirectTo,
                        classType = "text-success",
                        btnType = "btn-success",
                    )
                } else {
                    messageAlert(
                        title = "Upload failed",
                        message = result.message,
                        redirectTo = false,
                        classType = "text-success",
                        btnType = "btn-success",
                    )
                    
                }
            } catch (error) {
                    messageAlert(
                        title = "Upload failed",
                        message = error.message,
                        redirectTo = false,
                        classType = "text-danger",
                        btnType = "btn-danger",
                    )

            } finally {
                progressBar.style.display = 'none';
            }
            loadStatus(false)
        }
  
          form.classList.add('was-validated')
        }, false)
      })
      
})()


try {
    document.getElementById('id_image_group').onclick = function(event){
        document.getElementById('id_image_file').click();
    };
}  catch (TypeError) {

}



function loadStatus(status){
    let statusEl = document.getElementsByClassName('status')
    let btn = document.getElementById('btn')
    let progressBar = document.getElementById('progressBar')

    if (status) {
        try {
            progressBar.style.display = 'block';
            btn.classList.add('disabled')
            for (let i of statusEl){
                i.classList.remove('d-none')
                console.log("removing")
            } 
            try {
                let deleteBtn = document.querySelector('#delete')

                deleteBtn.classList.add('disabled')
                
            } catch (error) {
                
            }
            
        } catch (error) {
            
        }
        
    }
    else{
        try {
            btn.classList.remove('disabled')
            try {
                let deleteBtn = document.querySelector('#delete')
                deleteBtn.classList.remove('disabled')
            } catch (error) {
                
            }
            
            progressBar.style.display = 'none';
            for (let i of statusEl){
                i.classList.add('d-none')
                console.log("adding")
            }
        } catch (error) {
            
        }
    }
}

async function uploadFile(formData, progressBar, url, method) {
    const xhr = new XMLHttpRequest();
  
    return new Promise((resolve, reject) => {
        xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                progressBar.value = percentComplete;
            }
        };
  
        xhr.onload = function() {
            resolve({
                ok: xhr.status >= 200 && xhr.status < 300,
                status: xhr.status,
                json: () => Promise.resolve(JSON.parse(xhr.responseText))
            });
        };
  
        xhr.onerror = function() {
            reject(new Error('Network error'));
        };
  
        xhr.open(method, url, true); // Use the dynamic URL
        xhr.withCredentials = true;
        xhr.send(formData);
    });
}

deleteMedia()


function deleteMedia(){
    let displayError = document.querySelector('#error')
    try{
        let deleteBtn = document.querySelector('#delete')
        deleteBtn.addEventListener('click', async ()=>{
    
            let url = deleteBtn.dataset.url
            let method = "DELETE"
            let data = JSON.stringify({})
    
            let option = {
                method: method,
                credentials: "include",
                body:data
            }
            loadStatus(true)
            const response = await fetch(url, option)
            const result = await response.json();
            console.log(result)
            if (response.ok) {
                messageAlert(
                title = "Success",
                message = result.message,
                redirectTo = result.redirectTo,
                classType = "text-danger",
                btnType = "btn-danger",
                )
                
            } 
            else {
                try {
                for(let i of result.errors){
                    displayError.insertAdjacentHTML(
                    'beforeend',
                    `<li>${i.msg}</li>`
                    
                    )
                }
                } catch {
                let errMessage;
                if (result.detail) errMessage = result.detail
                else if (result.message) errMessage = result.message;
                displayError.insertAdjacentHTML(
                    'beforeend',
                    `<li>${errMessage}</li>`
                )
                }
            }
            loadStatus(false)
        })
    }catch{
    
    }
}


function readURL(input){
    let reader = new FileReader();
    reader.onload = function(e){
    $('#id_image_display')
        .attr('src', e.target.result)
    };
    reader.readAsDataURL(input.files[0]);
}

