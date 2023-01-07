let form=document.getElementById('serviceForm');
form.addEventListener('submit',(evt)=>{
    let msg='';
    const list = document.querySelectorAll('input[type=checkbox]');
    let checkedOne=Array.prototype.slice.call(list).some(x=>x.checked);
    console.log(checkedOne);
    if(checkedOne===false){
        msg="Please add atleast one service before submitting";
    } 
    if(msg!=''){
        alert(msg);
        evt.preventDefault();
    }
});