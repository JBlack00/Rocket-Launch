var Rocket ;
var Background = document.createElement("null");
var Background2;
var Background3;
var Background4;
var Score;
var LeftMoveButton;
var RightMoveButton;
var image;
var FuelGauge;
var canvas;
var prefabs =[];
var gameStarted = false;
var gamePause = false;
var LeftFingerDown = false;
var RightFingerDown = false;
var Seagull;
var Asteroid;
var Plane;
var Enemies= [];
var EnemySpawnTimer;
var FuelCanisterSpawnTimer;
var BoosterSpawnTimer;
var State;//State 1 = DaySky; State 2 = NightSky; State 3 = SpaceSky
var UIElements=[];
var offsetFuel;
var counter;
var Fadetimer ;
var Health;
var bgDelta;
var bgDelta2;
var bgDelta3;
var boosterTimer;
var counterMultiplier;

//call all start protocols like the game manager and to initialise
window.onload= function(e) {
    gameManager.start();
    init();
    if(!window.location.hash)
    {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}
//sets up the game manager with canvas data and the frames per second
var gameManager ={
    canvas : document.createElement("canvas"),
    clear : function()
    {
      //  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    start : function()
    {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        console.log("canvas" + this.canvas);
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNumber = 0;
        this.interval = setInterval(update, 20);
    }
}

//initialises all variables for the game
function init()
{
    Health = 3;
    offsetFuel= 40;
    Fadetimer = 1000;
    counterMultiplier = 0.3;
    boosterTimer = 4;

    Rocket = new Prefab(200, 225,document.documentElement.clientWidth-(document.documentElement.clientWidth*0.60),document.documentElement.clientHeight-(document.documentElement.clientHeight*0.22),0,0, "images/RocketOff.png","Rocket");
    Background = new PrefabDontCollide(document.documentElement.clientWidth,document.documentElement.clientHeight,0,0,-1,0, "images/background_01.png","Background");
    Background2 = new PrefabDontCollide(document.documentElement.clientWidth,document.documentElement.clientHeight,0,0,-2,0, "images/Background_DaySky.png","Background2");
    Background3 = new PrefabDontCollide(document.documentElement.clientWidth,document.documentElement.clientHeight,0,0,-3,0, "images/Background_NightSky.png","Background3");
    Background4 = new PrefabDontCollide(document.documentElement.clientWidth,document.documentElement.clientHeight,0,0,-4,0, "images/Background_SpaceSky.png","Background4");

    Score = new PrefabDontCollide(250,100,document.documentElement.clientWidth-(document.documentElement.clientWidth*1.01) ,document.documentElement.clientHeight-(document.documentElement.clientHeight*1),0,0, "images/ScoreText.png","Score");
    LeftMoveButton = new PrefabDontCollide(150, 150,document.documentElement.clientWidth-(document.documentElement.clientWidth*0.90),document.documentElement.clientHeight-(document.documentElement.clientHeight*0.20),0,0, "images/arrowLeft.png","LeftMoveButton");
    RightMoveButton = new PrefabDontCollide(150, 150,document.documentElement.clientWidth-(document.documentElement.clientWidth*0.25),document.documentElement.clientHeight-(document.documentElement.clientHeight*0.20),0,0, "images/arrowRight.png","RightMoveButton");
    FuelGauge = new PrefabDontCollide(90, 190,document.documentElement.clientWidth-(document.documentElement.clientWidth*0.97),document.documentElement.clientHeight-(document.documentElement.clientHeight * 0.94),0,0, "images/FuelGauge.png","FuelGauge");

    EnemySpawnTimer = Math.floor((Math.random() *50)+6);
    FuelCanisterSpawnTimer = Math.floor((Math.random() *50)+6);
    BoosterSpawnTimer = Math.floor((Math.random() *50)+6);

    counter =0;
    State = 0;

    bgDelta = 0.01;//speed for background transitions
    bgDelta2 = 0.01;//speed for background transitions
    bgDelta3 = 0.01;//speed for background transitions

    prefabs.push(Rocket);
    UIElements.push(Background4);
    UIElements.push(Background3);
    UIElements.push(Background2);
    UIElements.push(Background);
    UIElements.push(Score);
    UIElements.push(LeftMoveButton);
    UIElements.push(RightMoveButton);
    UIElements.push(FuelGauge);

    prefabs.push(new Prefab(100, 100, document.documentElement.clientWidth - (document.documentElement.clientWidth * 0.13), document.documentElement.clientHeight - (document.documentElement.clientHeight * 0.99), 0, 0, "images/PauseButton.png", "pauseButton"));
    prefabs.push(new Prefab(350, 150, document.documentElement.clientWidth - (document.documentElement.clientWidth * 0.5)-(350/2), document.documentElement.clientHeight - (document.documentElement.clientHeight * 0.8), 0, 0, "images/quitButton.png", "quitButton"));
}
//this spawns in necessary objects (objects that can hurt the player) at run time rather than at the start of the game
function InstantiateAtRuntime()
{
    EnemySpawnTimer = EnemySpawnTimer -0.1;

    if(EnemySpawnTimer <=0)
    {
        var StartPos = Math.random();
        EnemySpawnTimer = Math.floor((Math.random() *30)+5);
        console.log("State: " + State);
        //day sky
        if(State == 1)
        {   //spawn seagulls
            if (StartPos < 0.5)
            {
                Enemies.push(new Prefab(100, 100, document.documentElement.clientWidth - (document.documentElement.clientWidth * 0), document.documentElement.clientHeight - (document.documentElement.clientHeight * 0.80), 0,-2, "images/Seagull.png", "Seagull"));
            }
            else
            {
                Enemies.push(new Prefab(100, 100, document.documentElement.clientWidth - (document.documentElement.clientWidth * 1), document.documentElement.clientHeight - (document.documentElement.clientHeight * 0.80), 0,+2, "images/Seagull_01.png", "Seagull"));
            }
        }
        //night sky
        if(State == 2)
        {   //spawn planes
            if (StartPos < 0.5)
            {
                Enemies.push(new Prefab(200, 100, document.documentElement.clientWidth - (document.documentElement.clientWidth * 0), document.documentElement.clientHeight - (document.documentElement.clientHeight * 0.80), 0,-2, "images/Plane.png", "Plane"));
            }
            else
            {
                Enemies.push(new Prefab(200, 100, document.documentElement.clientWidth - (document.documentElement.clientWidth * 1), document.documentElement.clientHeight - (document.documentElement.clientHeight * 0.80), 0,+2, "images/Plane_01.png", "Plane"));
            }
        }
        //space sky
        if(State == 3)
        {   //spawn asteroids
            if (StartPos < 0.5)
            {
                Enemies.push(new Prefab(200, 200, document.documentElement.clientWidth - (document.documentElement.clientWidth * 0.20), document.documentElement.clientHeight - (document.documentElement.clientHeight * 1.2), 0,-2, "images/Asteroid.png", "Asteroid"));
            }
            else
            {
                Enemies.push(new Prefab(200, 200, document.documentElement.clientWidth - (document.documentElement.clientWidth * 0.80), document.documentElement.clientHeight - (document.documentElement.clientHeight * 1.2), 0,+2, "images/Asteroid.png", "Asteroid"));
            }
        }
    }

    for (i = 0; i < Enemies.length; i += 1)
    {
        Enemies[i].newPos();
        Enemies[i].gravity = 0.05;
        Enemies[i].update();
    }
}
//returns a mouse pos or in this case a touch pos (both are very much the same)
function getMousePos(e)
{
    var rect = gameManager.canvas.getBoundingClientRect();
    return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
    };
}
//returns a bool that checks if its within a position
function CheckButton(pos,rect)
{
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}
//sets up a prefab which will be used for most objects in game, but not all
function Prefab (width, height,x,y, z,speedx, Imag, tag)
{
    this.width = width;
    this.height = height;
    this.speedX = speedx;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.z = z;
    this.image = new Image();
    this.image.src = Imag;
    this.gravity =0;
    this.gravitySpeed =0;
    this.alpha = 1;
    this.tag = tag;

    this.update = function()
    {
        ctx = gameManager.context;

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
         ctx.globalAlpha = 1;
    }
    this.newPos = function()
    {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }
    this.CheckCollision = function(coll)
    {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var collleft = coll.x;
        var collright = coll.x + (coll.width);
        var colltop = coll.y;
        var collbottom = coll.y + (coll.height);
        var collision = true;
        if ((mybottom < colltop) || (mytop > collbottom) || (myright < collleft) || (myleft > collright))
        {
            collision = false;
        }
        return collision;
    }

    ctx = gameManager.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}
//this sets up prefabs (the objects that can't hurt the player - fuel and boosters) but they need to be spawned using timers and then be put in the array
function ElementPrefabs()
{
    FuelCanisterSpawnTimer = FuelCanisterSpawnTimer - 0.1;
    BoosterSpawnTimer = BoosterSpawnTimer- 0.1;
    //spawns fuel canister
    if (FuelCanisterSpawnTimer <= 0)
    {
        var StartPos = Math.random();
        FuelCanisterSpawnTimer = Math.floor((Math.random() * 100) + 1);
        prefabs.push(new Prefab(50, 100, document.documentElement.clientWidth - (document.documentElement.clientWidth * StartPos), document.documentElement.clientHeight - (document.documentElement.clientHeight * 1.2), 0, 0, "images/FuelCanister.png", "FuelCanister"));
    }
    //spawns booster
    if (BoosterSpawnTimer <= 0)
    {
        var StartPos = Math.random();
        BoosterSpawnTimer = Math.floor((Math.random() * 200) + 5);
        prefabs.push(new Prefab(150, 150, document.documentElement.clientWidth - (document.documentElement.clientWidth * StartPos), document.documentElement.clientHeight - (document.documentElement.clientHeight * 1.2), 0, 0, "images/booster.png", "Booster"));
    }
    for (i = 0; i < prefabs.length; i += 1)
    {
        if(prefabs[i].tag == "FuelCanister")
        {
            prefabs[i].newPos();
            prefabs[i].gravity = 0.02;
        }
        if(prefabs[i].tag == "Booster")
        {
            prefabs[i].newPos();
            prefabs[i].gravity = 0.02;
        }
    }
}
//this prefab is used like the other but for non collidable objects. There's advantages like rendering depth (which could be added). With this being different it keeps the prefab clean
function PrefabDontCollide (width, height,x,y, z,speedx, Imag, tag)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.z = z;
    this.speedX =speedx;
    this.speedY=0;
    this.image = new Image();
    this.image.src = Imag;
    this.tag = tag;
    this.alpha = 1;

    this.update = function()
    {
        ctx = gameManager.context;
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.globalAlpha = 1;
    }
    ctx = gameManager.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}
//starts the action of the game
function RocketGo()
{
    if(Health>0)
    {
       gameStarted = true;
    }
    console.log("gameStarted = true");
}
//if called moves the rocket prefab left
function moveLeft()
{
   Rocket.x += -7;
}
//if called moves the rocket prefab right
function moveRight()
{
    Rocket.x += +7;
}
//sets alpha of backgrounds when needed
function Fader()
{
    switch (State)
    {
     case 1:
         if(UIElements[3].alpha!=0)
         {
             UIElements[3].alpha += -bgDelta;
         }
         if (UIElements[3].alpha <= 0.1)
         {
             UIElements[3].alpha=0;
         }
         break;
     case 2:
         if(UIElements[2].alpha!=0)
         {
             UIElements[2].alpha += -bgDelta2;
         }
         if (UIElements[2].alpha <= 0.1)
         {
             UIElements[2].alpha=0;
         }
         break;
     case 3:
         if(UIElements[1].alpha!=0)
         {
             UIElements[1].alpha += -bgDelta3;
         }
         if (UIElements[1].alpha <= 0.1)
         {
             UIElements[1].alpha=0;
         }
         break;
    }
}
//makes sure the highscore stays the highest score
function CheckHighscore()
{
    if(localStorage.HighScore == null)
    {
        localStorage.HighScore =0;
    }
    if(localStorage.HighScore < counter)
    {
        localStorage.HighScore = parseInt(counter);
    }
    console.log("score: " + counter + " highScore " + localStorage.HighScore);
}
function Reset()
{
    while(Enemies.length)
    {
        Enemies.pop();
        console.log("pop this: "+ Enemies.length);
    }
    while(prefabs.length)
    {
        prefabs.pop();
        console.log("pop this: "+ prefabs.length);
    }
    while(UIElements.length)
    {
        UIElements.pop();
        console.log("pop this: "+ UIElements.length);
    }
    init();
}
//this allows us to set up a score multiplier when hitting booster prefabs
function BoosterGo()
{
    boosterTimer =3;
    for ( i = 0; i < prefabs.length; i += 1)
    {
        if(prefabs[i].tag == "Rocket")
        {}
        else
        {
            counter = counter + (counterMultiplier * 2);
        }
    }
}
//this may be the most important function as this plays every frame. all code within here needs to be played each frame
function update()
{
    var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    if (orientation.type === "landscape-primary" ||orientation.type === "landscape-secondary")
    {
        gamePause = true;
    }
    else
    {
        //gamePause = false;
    }
    //to pause the game
    if(gamePause==false)
    {
        gameManager.clear();

        for (i = 0; i < UIElements.length; i += 1)
        {
            UIElements[i].update();
        }
        for (i = 0; i < prefabs.length; i += 1)
        {
            if (prefabs[i].tag == "quitButton")
            {
            }
            else
            {
                prefabs[i].update();
            }
        }
        for (i = 0; i < UIElements.length; i += 1)
        {
            if(i>4)
            {
                UIElements[i].update();
            }
        }
        gameManager.canvas.addEventListener("touchstart", function (e)
        {
            if(gameStarted==false)
            {
                RocketGo();
                console.log("gameStarted");
            }
            if(Health<=0)
            {
                Reset();
            }
        },false);
        //when the game action starts
        if (gameStarted == true)
        {
            if(Health <=0)
            {
                gameStarted = false;
                CheckHighscore();
                prefabs[0].alpha =0;
                prefabs[0].image.src = "images/RocketOff.png";
                console.log("gameStarted = false");
            }
            if(boosterTimer == 4)
            {}
            else
            {
                boosterTimer = boosterTimer - 0.01;
            }
            if(boosterTimer <= 0)
            {
                boosterTimer =4;
            }

            prefabs[0].image.src = "images/RocketOn.png";
            prefabs[0].height =  300;
            counter = counter + 0.3;
            ctx.font = "55pt Calibri";//score text size and font
            ctx.fillStyle = "#ffffff";//score text colour (white)
            ctx.fillText(parseInt(counter), UIElements[1].x +210,UIElements[1].y + 75);

            //sets health on display
            var ShowHealth;
            switch(Health)
            {
                case 3:
                    ShowHealth =0.15;
                    break;
                case 2:
                    ShowHealth =0.10;
                    break;
                case 1:
                    ShowHealth =0.05;
                    break;
                case 0:
                    ShowHealth =0;
                    break;
                default:
                    ShowHealth =0.3;
                    break;
            }

            ctx.fillStyle = "#ff0000";
            ctx.fillRect(gameManager.canvas.getBoundingClientRect().width * 0.87,gameManager.canvas.getBoundingClientRect().height*0.24,gameManager.canvas.getBoundingClientRect().width *0.09,gameManager.canvas.getBoundingClientRect().height*-ShowHealth);

            //displays fuel so the player can see how much they have
            if(offsetFuel <= UIElements[7].height)
            {
                offsetFuel= offsetFuel+0.1;
            }
            //-UIElements[7].height
            if(offsetFuel <= 40)
            {
                offsetFuel = 40;
            }
            if(parseInt( offsetFuel)==190)
            {
                console.log("now");
                ctx.font = "90pt Calibri";
                ctx.fillStyle = "#ffffff";
                ctx.fillText("OUT OF FUEL",gameManager.canvas.getBoundingClientRect().width / 2 - 370,gameManager.canvas.getBoundingClientRect().height / 2 );
                gamePause =true;
            }
            ctx.fillStyle = "#000000";
            ctx.fillRect(UIElements[7].x,UIElements[7].y+offsetFuel,UIElements[7].width,UIElements[7].height - offsetFuel);

           //gets the controls for touching in real time
            gameManager.canvas.addEventListener("touchstart", function (e)
            {
                var mousePos = getMousePos(e);

                 if(CheckButton(mousePos,LeftMoveButton))
                 {
                      LeftFingerDown = true;
                 }
                 if(CheckButton(mousePos, RightMoveButton))
                 {
                     RightFingerDown = true;
                 }
                for (i = 0; i < prefabs.length; i += 1)
                {
                    if (prefabs[i].tag == "pauseButton")
                    {
                        if (CheckButton(mousePos, prefabs[i]))
                        {
                            gamePause = true;
                            console.log("pausing" + gamePause);
                        }
                    }
                }
            },false);
            gameManager.canvas.addEventListener("touchend", function (e)
            {
                LeftFingerDown = false;
                RightFingerDown = false;
            }, false);

            InstantiateAtRuntime();
            ElementPrefabs();

            //sets the pos given if touched from earlier
            if(LeftFingerDown ==true && prefabs[0].x >= 0)
            {
                moveLeft();
            }
            if(RightFingerDown == true &&  prefabs[0].x <= gameManager.canvas.getBoundingClientRect().width - prefabs[0].width)
            {
                moveRight();
            }

            Fadetimer = Fadetimer -1;

            switch(Fadetimer)
            {
                case 990:
                    State =1;
                    break;
                case 500:
                    State =2;
                    break;
                case 0:
                    State =3;
                    break;
            }

            Fader();
            //here is to check collision with everything else (or not if we don't want it to)
            for (i = 0; i < prefabs.length; i += 1)
            {
                if(boosterTimer <= 3)
                {
                    if(prefabs[i].tag != "Rocket")
                    {
                        prefabs[i].gravity = 0.16;
                    }
                }
               if(prefabs[0].CheckCollision(prefabs[i]))
               {
                   if(prefabs[i].tag =="Rocket")
                   {}
                   else
                   {
                        prefabs[i].alpha =0;
                   }
                   if(prefabs[i].tag =="FuelCanister")
                   {
                       prefabs[i].alpha =0;
                       prefabs[i].y =5000;
                       offsetFuel += -50;
                   }
                   if(prefabs[i].tag =="Booster")
                   {
                       prefabs[i].alpha =0;
                       prefabs[i].y = prefabs[i].y - 5000;
                       BoosterGo();
                   }
               }
            }
            for (i = 0; i < Enemies.length; i += 1)
            {
                if(boosterTimer <= 3)
                {
                    Enemies[i].gravity = 0.16;
                }
                if (prefabs[0].CheckCollision(Enemies[i]))
                {
                    Enemies[i].alpha =0;
                    Enemies[i].y =Enemies[i].y- 5000;
                    if(Enemies[i].tag =="Seagull")
                    {
                        Health = Health - 1;
                    }
                    else
                    {
                        Health = Health - 3;
                    }
                }
            }
        }
        else
        {//show correct text on screen given the health
            ctx.font = "90pt Calibri";
            ctx.fillStyle = "#ffffff";

            if(Health<=0)
            {
                ctx.fillText("YOU DIED FOOL", gameManager.canvas.getBoundingClientRect().width / 2 - 370,gameManager.canvas.getBoundingClientRect().height / 2);
            }
            else
            {
                ctx.fillText("TAP TO START", gameManager.canvas.getBoundingClientRect().width / 2 - 350, gameManager.canvas.getBoundingClientRect().height / 2);
            }
        }
    }
    else
        {
            CheckHighscore();
        //updates the buttons on pause to show on screen at the right time
        for (i = 0; i < prefabs.length; i += 1)
        {
            if (prefabs[i].tag == "quitButton")
            {
                prefabs[i].update();
            }
            //touch controls when the games paused
            gameManager.canvas.addEventListener("touchstart", function (e)
            {
                var mousePos = getMousePos(e);
                for (i = 0; i < prefabs.length; i += 1)
                {
                    if (prefabs[i].tag == "pauseButton")
                    {
                        if (CheckButton(mousePos, prefabs[i]))
                        {
                            gamePause = false;
                            console.log("pausing" + gamePause);
                        }
                    }
                    if (prefabs[i].tag == "quitButton")
                    {
                        if (CheckButton(mousePos, prefabs[i]))
                        {
                            window.location.href = "Menu.html";
                        }
                    }
                }
            }, false);
        }
        //displays text when out of fuel
        if(parseInt( offsetFuel)==190)
        {
            console.log("now");
            ctx.font = "90pt Calibri";
            ctx.fillStyle = "#ffffff";
            ctx.fillText("OUT OF FUEL",gameManager.canvas.getBoundingClientRect().width / 2 - 370,gameManager.canvas.getBoundingClientRect().height / 2);
            gamePause =true;
        }
    }
}