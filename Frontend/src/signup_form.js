var modal = document.getElementById('id01');

function openSignUpForm() {
    modal.style.display='block';
}

exports.initializeLogin = function(){
    $('#signup').click(function() {
        openSignUpForm();
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {

        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}