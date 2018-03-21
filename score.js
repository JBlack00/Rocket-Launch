/**
 * Created by daryl on 13/03/2018.
 */
window.onload= function(e) {
var scoretext = document.getElementById("highscore");
scoretext.innerHTML= localStorage.HighScore;
}