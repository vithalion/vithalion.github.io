var somGameover = document.getElementById("somGameover");
function start() {//inicio da função start()
    $('#inicio').hide();


    $('#fundoGame').append("<div id='jogador' class='anima1'></div>");
    $('#fundoGame').append("<div id='inimigo1' class='anima2'></div>");
    $('#fundoGame').append("<div id='inimigo2' class='anima5'></div>");
    $('#fundoGame').append("<div id='amigo' class='anima3'></div>");
    $('#fundoGame').append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");

    function moveinimigo1() {

        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left", posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);


        if (posicaoX <= 0) {


            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 1200);
            $("#inimigo1").css("top", posicaoY);


        }

    }

    function moveinimigo2() {

        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", posicaoX - 3);


        if (posicaoX <= 0) {


            $("#inimigo2").css("left", 1200);



        }

    }

    function moveamigo() {

        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left", posicaoX + 1);


        if (posicaoX > 906) {


            $("#amigo").css("left", 0);



        }

    }


    function disparo() {

        if (podeAtirar == true) {

            podeAtirar = false;
            somDisparo.play();

            topo = parseInt($("#jogador").css("top"))
            posicaoX = parseInt($("#jogador").css("left"))
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;
            $("#fundoGame").append("<div id='disparo'></div");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);


            var tempoDisparo = window.setInterval(executaDisparo, 30 - velocidade);

        }//Fecha podeAtirar

        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css('left'));
            $("#disparo").css("left", posicaoX + 35);

            if (posicaoX > 1200) {

                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;

            }
        }

    }//Fecha disparo

    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));
        // jogador com o inimigo
        if (colisao1.length > 0) {

            energiaAtual--;

            inimigo1x = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css('top'));
            explosao1(inimigo1x, inimigo1Y);


            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 1200);
            $("#inimigo1").css("top", posicaoY);

        }

        if (colisao2.length > 0) {

            energiaAtual--;

            inimigo2x = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css('top'));
            explosao2(inimigo2x, inimigo2Y);

            $("#inimigo2").remove();


            reposicionaInimigo2();

        }

        if (colisao3.length > 0) {


            velocidade = velocidade + 0.4;
            pontos = pontos + 100;

            inimigo1x = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));

            explosao1(inimigo1x, inimigo1Y);
            $("#disparo").css("left", 2000);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 1200);
            $("#inimigo1").css("top", posicaoY);

        }

        if (colisao4.length > 0) {

            pontos = pontos + 50;

            inimigo2x = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();


            explosao2(inimigo2x, inimigo2Y);
            $("#disparo").css("left", 800);

            reposicionaInimigo2();

        }

        if (colisao5.length > 0) {

            somResgate.play();

            salvos++;

            reposicionaAmigo();
            $("#amigo").remove();

        }


        if (colisao6.length > 0) {

            perdidos++;

            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX, amigoY);
            $("#amigo").remove();



            reposicionaAmigo();


        }




    }//fim da função start

    function explosao1(inimigo1X, inimigo1Y) {
        //somExplosao.play();
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao1'></div>");
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        var div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width: 200, opacity: 0}, "slow");


        var tempoExplosao = window.setInterval(removeExplosao, 1000);


        function removeExplosao() {

            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    }

    //Principais variáveis do jogo
    var jogo = {};
    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 334);
    var podeAtirar = true;
    var fimdejogo = false;
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var energiaAtual = 3;
    var somDisparo = document.getElementById("somDisparo");
    var somExplosao = document.getElementById("somExplosao");
    var musica = document.getElementById("musica");
    var somPerdido = document.getElementById("somPerdido");
    var somResgate = document.getElementById("somResgate");

    musica.addEventListener("ended", function () {
        musica.currentTime = 0;
        musica.play();
    }, false);

    musica.play();

    var TECLA = {
        W: 87,
        S: 83,
        D: 68,
        A: 65,
        ENTER: 13
    }

    //touch
    $("#jogador")
    .hammer({ drag_max_touches : 0})
    .on ("touch drag", function(ev)  {
        var touches = ev.gesture.touches;
        

        ev.gesture.preventDefault();

        for(var t=0,len=touches.length; t<len; t++) {
              var target = $ (touches[t].target);
              target.css({
                zIndex: 1337,
                top: touches [t].pageY-50,
                left:touches [t].pageX-50
              });

    //Limitaçao movitaçao

    var topo = parseInt($("#jogador").css("top"));
    if (topo<=0) {
        $("#joogador").css("top",0);

    }
        if (topo>=410) {

            $("#jogador").css("top",434);

            }
        } 
    });


    

    //verifica se o usuário pressionou alguma tecla


    //*jogo.pressionou = [];*

    //detecta quando o usario pressiona uma tecla
    //tal que ... pressionada[x.which] = true sendo que x.which é o código da tecla 
    //pressionada


    //*$(document).keydown(function (e) {*


        //console.info(e.which);

        //*jogo.pressionou[e.which] = true;*
    //*});*

    //detecta quando o usuario solta a tecla
    //define o vetor de pressionou como false ...
    //tal que ... pressionada[x.which] = false sendo que x.which é o código da tecla 
    //pressionada

    //*$(document).keyup(function (e) {*
        //*jogo.pressionou[e.which] = false;*
    //*});*

    //Game loop
    jogo.timer = setInterval(loop, 30);//executar game loop a cada 30 milisegundos
    function loop() {
        moveFundo();
        disparo();
        //moveJogador();
        moveinimigo1();
        moveinimigo2();
        moveamigo();
        colisao();
        placar();
        energia();
    }

    function moveFundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $('#fundoGame').css("background-position", esquerda - 1);
    }//fim da função 

    //esta funcao tem por objetivo detectar que uma tecla foi pressionada
    //se a tecla W for pressionada o angulo y do jogador
    //é igual ao subtração de 10.

    //se a tecla S for pressionada o angulo y do jogador
    //é igual a adição de 10.

    function moveJogador() {
        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $('#jogador').css("top", topo - 20);

            if (topo <= 0) {
                $('#jogador').css('top', topo + 10);
            }
        }

        if (jogo.pressionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"));
            $('#jogador').css("top", topo + 20);

            if (topo >= 550) {
                $('#jogador').css('top', topo - 10);
            }
        }

        if (jogo.pressionou[TECLA.D]) {
            var topo = parseInt($("#jogador").css("left"));
            $('#jogador').css("left", topo + 20);

            if (topo >= 1205) {
                $('#jogador').css('left', topo);
            }
        }

        if (jogo.pressionou[TECLA.A]) {
            var topo = parseInt($("#jogador").css("left"));
            $('#jogador').css("left", topo - 20);

            if (topo <= 0) {
                $('#jogador').css('left', topo);



                //disparo();


                //CHAMA FUNCAO DESPARO 
                //IMPLEMENTACAO FUTURA

            }
        }

        if (jogo.pressionou[TECLA.ENTER]) {
            disparo();
        }
    }


    function explosao2(inimigo2x, inimigo2Y) {

        somExplosao.play();

        $("#fundoGame").append("<div id'explosao2'></div>");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2 = $("#explosao2");

        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2x);
        div2.animate({width: 200, opacity: 0}, "slow");
        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);


        function removeExplosao2() {

            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;
        }

    }

    function reposicionaInimigo2() {

        var tempoColisao4 = window.setInterval(reposiciona4, 1000);

        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;

            if (fimdejogo == false) {


                $("#fundoGame").append("<div id='inimigo2' class='anima5'></div");

            }
        }
    }


    function reposicionaAmigo() {

        var tempoAmigo = window.setInterval(reposiciona6, 6000);

        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;

            if (fimdejogo == false) {

                $("#fundoGame").append("<div id='amigo'class='anima3'></div>");



            }

        }

    }


    function explosao3(amigoX, amigoY) {

        somPerdido.play();

        $("#fundoGame").append("<div id='explosao3'class='anime4'></div>");
        $("#explosao3").css("top", amigoY);
        $("#explosao3").css("left", amigoX);

        var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);


        function resetaExplosao3() {

            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3 = null;

        }

    }


    function placar() {

        $('#placar').html("<h2> pontos:" + pontos + " salvos:" + salvos + " perdidos:" + perdidos + "</h2>");



    }

    function energia() {

        if (energiaAtual == 3) {

            $("#energia").css("background-image", "url(imgs/energia3.png)");

        }
        if (energiaAtual == 2) {

            $("#energia").css("background-image", "url(imgs/energia2.png)");

        }

        if (energiaAtual == 1) {

            $("#energia").css("background-image", "url(imgs/energia1.png)");

        }

        if (energiaAtual == 0) {

            $("#energia").css("background-image", "url(imgs/energia0.png)");

            gameOver();

        }


    }

    function gameOver() {

        fimdejogo = true;
        musica.pause();
        somGameover.play();


        window.clearInterval(jogo.timer);
        jogo.timer = null;


        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#amigo").remove();

        $("#fundoGame").append("<div id='fim'></div>");


        $("#fim").html("<h1> Game Over </h1><p>Sua pontuaçao foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>JogarNovamente</h3></div>");


    }


}

function reiniciaJogo() {

    somGameover.pause();
    $("#fim").remove();
    start();
}





