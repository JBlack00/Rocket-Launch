/**
 * Created by daryl on 24/01/2018.
 */
var Rocket;
var Background;
var plane;
var Score;
var Cloud;
var LeftMoveButton;
var RightMoveButton;
var image;
var FuelGauge;
var canvas;

window.onload= function(e)
{
    gameManager.start();
    init();
    if(!window.location.hash)
    {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

var gameManager =
    {
    canvas : document.createElement("canvas"),
    clear : function()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

function init()
{
    // alignment is from left to right not the center of the image use the length to make it
    //center look at score for an example
    Background = new Prefab(document.documentElement.clientWidth,document.documentElement.clientHeight,0,0,0, "./images/background_01.png");
    Rocket = new Prefab(100, 125,document.documentElement.clientWidth-(document.documentElement.clientWidth*0.55),document.documentElement.clientHeight-(document.documentElement.clientHeight*0.15),0, "./images/RocketOff.png");
    Score = new Prefab(150,75,document.documentElement.clientWidth-(document.documentElement.clientWidth*0.55) ,document.documentElement.clientHeight-(document.documentElement.clientHeight*1),0, "./images/ScoreText.png");
    LeftMoveButton = new Prefab(100, 100,document.documentElement.clientWidth-(document.documentElement.clientWidth*0.75),document.documentElement.clientHeight-(document.documentElement.clientHeight*0.15),0, "./images/arrowLeft.png");
    RightMoveButton = new Prefab(100, 100,document.documentElement.clientWidth-(document.documentElement.clientWidth*0.25),document.documentElement.clientHeight-(document.documentElement.clientHeight*0.15),0, "./images/arrowRight.png");
    FuelGauge = new Prefab(50, 100,document.documentElement.clientWidth-(document.documentElement.clientWidth*0.24),document.documentElement.clientHeight-(document.documentElement.clientHeight * 0.25),0, "./images/FuelGauge.png");
}

function Prefab (width, height,x,y, z, Imag)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.z = z;
    this.image = new Image();
    this.image.src = Imag;
    ctx = gameManager.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}

//this will update the fuel using a bar rather than pictures, the picture is just an outline
function FuelGageUpdate()
{
}

function CloudsUpdate()
{
}
function ScoreUpdate()
{
}

function update()
{
    gameManager.clear();
    init();
}
