// // another way to handle array iteration
// var arr = [1,2,3,4];
// for(var i = 0; i < arr.length; i++){
//   console.log(arr[i]);
//   console.log(i);
//   console.log(arr);
// }
// arr.forEach(function(current, index, array){
//   console.log(current);
//   console.log(index);
//   console.log(array);
// });


// Jukebox Logic

// song constructor
var Song = function(path){
  this.src = path;
};
// main class Jukebox
class Jukebox{
  constructor(){
    // Jukebox variables: audio, playlist array
    this.player = document.createElement('AUDIO');
    this.playlist = [];
    this.playlist.push(new Song('music/Dezarie-Travelers.mp3'));
  }
  // Jukebox methods: play, pause, stop, upload, display playlist, append the audio element to the DOM
  displayPlaylist(){
    // clear what is inside of the playlist div already
    document.getElementById('playlist').innerHTML = '';
    // iterate through the playlist and append the children
    this.playlist.forEach(function(current, index){
      var html = '<div id="song-@id@">@path@</div>';
      html = html.replace('@id@', index);
      html = html.replace('@path@', current.src);
      document.getElementById('playlist').insertAdjacentHTML('beforeend', html);
    });
  }
  appendAudio(){
    this.player.src = this.playlist[0].src;
    document.getElementById('audio').appendChild(this.player);
    this.setUICurrent();
  }
  // sets the newly added song to be the current playing song
  setNewSong(){
    this.player.src = this.playlist[this.playlist.length - 1].src;
  }
  // handles the audio element src update on click on the song in the playlist
  setSong(path){
    this.player.src = path;
    this.setUICurrent();
  }
  // add the css classes to the current song based on the src attribute of the audio element
  setUICurrent(){
    // determine what song is playing based on what is in the audio src
    var path = document.getElementById('audio').childNodes[0].src;
    path = path.split('/');
    path = 'music/' + path[path.length -1];
    var sources = [];
    this.playlist.forEach(function(current){
      sources.push(current.src);
    });
    // in the DOM assign class current to this song
    document.getElementById('song-' + sources.indexOf(path)).classList.add('current');
  }
  play(){
    this.player.play();
  }
  pause(){
    this.player.pause();
  }
  stop(){
    this.player.pause();
    this.player.currentTime = 0;
  }
  upload(){
    // get the value of the input: actual path (the song must be in the project folder)
    var newPath = document.getElementById('upload').value;
    newPath = newPath.split('\\');
    // newPath = newPath.pop();
    newPath = 'music/' + newPath[newPath.length - 1];
    // add it to the playlist array
    this.playlist.push(new Song(newPath));
    // display it in the DOM
    this.displayPlaylist();
    // load the new song to the player
    this.setNewSong();
    // Indicate the new current song
    this.setUICurrent();
  }
}
// create a new instance of Jukebox and run the methods
function init(){
  var jukebox = new Jukebox();
  jukebox.displayPlaylist();
  jukebox.appendAudio();
  // event handlers
  document.getElementById('play').addEventListener('click', function(){
    jukebox.play();
  });
  document.getElementById('pause').addEventListener('click', function(){
    jukebox.pause();
  });
  document.getElementById('stop').addEventListener('click', function(){
    jukebox.stop();
  });
  document.getElementById('upload').addEventListener('change', function(){
    jukebox.upload();
  });
  // handle clicks on the playlist songs
  document.getElementById('playlist').addEventListener('click', function(event){
    // clear all the current classes from all the songs
    var allSongs = document.getElementById('playlist').childNodes;
    allSongs.forEach(function(current){
      current.classList.remove('current');
    });
    // load this song to the audio element
    jukebox.setSong(event.srcElement.innerHTML);
  });
}
init();
