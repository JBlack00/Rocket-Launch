var mySound;

function playSound()
{
    mySound = new sound("audio/ButtonClick.mp3");
    mySound.play();
}

function PlayButton()
{
    document.getElementById("play_btn").click();//Calls this method when the play button is clicked in main menu
    setTimeout(soundTimer, 400);
    function soundTimer()
    {
        window.location.href = "index.html";//Opens the HTML (Game) screen
    }
}

function ScoreboardButton()
{
    document.getElementById("Scoreboard_btn").click();//Calls this method when the Scoreboard button is clicked in main menu
    setTimeout(soundTimer2, 400);
    function soundTimer2()
    {
        window.location.href = "Scoreboard.html";//Opens the Scoreboard screen
    }
}

function CreditsButton()
{
    document.getElementById("credits_btn").click();//Calls this method when the Credits button is clicked in main menu
    setTimeout(soundTimer3, 400);
    function soundTimer3()
    {
        window.location.href = "Credits.html";//Opens the Credits screen
    }
}

function ExitButton()
{
    document.getElementById("exit_btn").click();//Calls this method when the Exit button is clicked
    setTimeout(soundTimer4, 400);
    function soundTimer4()
    {
        window.location.href = "Menu.html";//Opens the Main Menu screen
    }
}

function sound(src)
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function()
    {
        this.sound.play();
    }
    this.stop = function()
    {
        this.sound.pause();
    }
}