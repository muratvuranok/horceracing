$(document).ready(function () {

    const names = ["Şahbatur", "Gülbatur", "Canbatur", "Şahinbey", "Abay Kızı", "Abaküs"];


    $("#btnCount").click(function () {

        const count = $("#count").val();
        $(".h4").removeClass("d-none");
        $(".h4").text("Yarış Birazdan Başlayacak");
        if (isNaN(count)) {
            alert("Lütfen sadece sayısal değer giriniz!");
            $("#count").val("");
            return;
        }

        if (count > 6) {
            alert("Maksimum girilebilecek değer 6'dır!");
            return;
        }


        let templates = []
        for (let i = 1; i <= count; i++) {
            templates.push(`<div class="row"> <div class="col"><img src="./img/h${i}.gif" alt=""> </div></div>`);
        }
        document.getElementById("container").innerHTML = templates.join("<br>");
        $("#count").val("");

    });


    function random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    $("#btnStart").click(function () {
        var horses = document.getElementsByTagName("img");
        if (horses.length == 0) {
            alert("Lütfen adet giriniz!");
            return;
        }
        var lblFinish = $(".finish-label").position().left;

        var timer = setInterval(() => {
            $.each(horses, (key, value) => {

                const itemWidht = $(value).position().left + $(value).width();


                let _counter = 0;
                let _winner = -1;
                for (let i = 0; i < horses.length; i++) {
                    if ($(horses[i]).position().left > _counter) {
                        _counter = $(horses[i]).position().left;
                        _winner = i;
                    }
                } 
                
                $(".h4").text(`yarışı ${_winner + 1}. kulvardaki ${names[_winner]} önde götürüyor.`);

                if (itemWidht > lblFinish) {
                    clearInterval(timer); 
                    alert(`Yarışı ${_winner + 1}. kulvardaki ${names[_winner]} kazandı`);
                    $("img").addClass("d-none");
                    $(".h4").addClass("d-none");
                    return;
                }

                let position = $(value).position().left;
                $(value).css("left", (position + random(5, 30)));

            });
        }, (70));

    });
})