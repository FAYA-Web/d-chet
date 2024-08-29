let mymap;

var nbDechets = 0;
var bModeDeclaration = false;

$(document).ready(function () {
    initGUI();
});

function initGUI() {
    //EXERCICE 1.1 : Choix mode
    $("#userLog").click(function () {
        showApplication();
        showScreen("promenadeCollecteScreen");
        rempliListeDechetsSimul(3);
        initMap("promenadeCollecteScreen", "mapCollecte");
    });
    $("#declarantLog").click(function () {
        $("#declarantLog").hide();
        $("#loginRow").show(200);
    });
    //FIN 1.1

    $("#loginForm").submit(function (event) {
        //oarguimbau / password
        var loginData = { "username": $("#username").val(), "password": $("#password").val() };
        $.post("https://examens2022.oa-xpert.com/api/auth/connect", loginData, function (result) {
            //EXERCICE 1.2 
            console.log(result);
            showApplication();
            showScreen("declarationScreen");
            initMap("declarationScreen", "mapDeclaration");
            //FIN EXERCICE 1.2
        });
        event.preventDefault();
    });

    //EXERCICE 1.3
    $("#listeDechets").on('click', 'li', function () {

        bModeDeclaration = false;
        $('#modalDechet').modal('show');

    });
    //Fin exercice 1.3

    //Exercice 1.4
    $("#submitCollecte").on('click', function () {

        var data = { "type_dechet": $("#type_dechet").val(), "quantite": $("#quantite").val() };
        $('#modalDechet').modal('hide');
        if (bModeDeclaration)
        {
            var data = { "type_dechet": $("#type_dechet").val(), "quantite": $("#quantite").val() };
            ajoutDechetSimule(); 
        }
        else
        {
            nbDechets--;
            rempliListeDechetsSimul(nbDechets);
        }
    })
    //Fin 1.4


    //Exercice 1.5
    $("#newDechet").on('click', function () {
        bModeDeclaration = true;
        $('#modalDechet').modal('show');
    });
    //Fin 1.5
}

//Exercice 2
function ajoutDechetSimule() {
    nbDechets++;

    var monDechet = $("#modeleDechet").clone();

    //Modif des champs
    var contenu = monDechet.html();
    contenu = contenu.replace("{dechet-id}", nbDechets);
    contenu = contenu.replace("{type-dechet}", 1);
    contenu = contenu.replace("{description-dechet}", "Blabla");
    monDechet.html(contenu);

    monDechet.show();
    $("#listeDechets").append(monDechet);

}
//Fin exercice 2

function showApplication() {
    $("#welcomeScreen").hide();
    $(".application").show();
}

function showScreen(idScreen) {
    $(".appScreen").hide();
    $("#" + idScreen).show();
}


//EXERCICE 3
function rempliListeDechetsSimul(nombre) {
    $("#listeDechets").empty();
    for (var i = 0; i < nombre; i++) {
        ajoutDechetSimule();
    }
}
//Fin exercice 3

function initMap(divID, mapID) {


    map = L.map(mapID).setView([43.474520, 5.412210], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([43.471520, 5.421210]).addTo(map).bindPopup('Centre de dépistage 1.<br/><br/><button data-dechet-id="dechet1" class="btnCollecteDechet btn btn-sm btn-primary">SELECTIONNER</button>');
    L.marker([43.473520, 5.432210]).addTo(map).bindPopup('Centre de dépistage 2.<br/><br/><button data-dechet-id="dechet2" class="btnCollecteDechet btn btn-sm btn-primary">SELECTIONNER</button>');
    L.marker([43.475520, 5.447210]).addTo(map).bindPopup('Centre de dépistage 3.<br/><br/><button data-dechet-id="dechet3" class="btnCollecteDechet btn btn-sm btn-primary">SELECTIONNER</button>');

    $('#' + divID).on('shown.bs.collapse', function (e) {
        map.invalidateSize(true);
    });

}

function resize() {

    if ($(window).width() >= 980) {
        $('.map').css("height", ($(window).height() - mapmargin));
        $('.map').css("margin-top", 50);
    } else {
        $('.map').css("height", ($(window).height() - (mapmargin + 12)));
        $('.map').css("margin-top", -21);
    }

}
