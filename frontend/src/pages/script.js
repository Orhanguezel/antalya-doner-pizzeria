document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("myModal");
    var openModalBtn = document.getElementById("openModalBtn");
    var closeModalBtn = document.getElementsByClassName("close")[0];
    var closeBtn = document.getElementById("closeBtn");

    // Açma düğmesine tıklanınca modalı göster
    openModalBtn.onclick = function() {
        modal.style.display = "block";
    }

    // Kapatma düğmesine tıklanınca modalı kapat
    closeModalBtn.onclick = function() {
        modal.style.display = "none";
    }

    // "Kapat" butonuna tıklanınca modalı kapat
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Modal dışında herhangi bir yere tıklanırsa modalı kapat
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
