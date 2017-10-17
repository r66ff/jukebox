// SoundCloud
class SoundCloudJukebox{
  constructor(id){
    this.id = id;
    this.SCplaylist = [];
  }
  initSC(){
    SC.initialize({
      client_id: this.id
    });
  }
  getTracksById(id){
    var promise = new Promise(function(resolve, reject){
      SC.get('/tracks/'+ id).then(function(response){
        resolve(response);
      });
    });
    return promise;
  }
  getTracksByTerm(term){
    var promise = new Promise(function(resolve, reject){
      SC.get('/tracks', {q: term}).then(function(response){
        var tracks = [];
        response.forEach(function(cur){
          tracks.push(cur);
        });
        resolve(tracks);
      });
    });
    return promise;
  }
  getPlaylist(){
    return this.SCplaylist;
  }
  setPlaylist(arr){
    for(var i = 0; i < arr.length; i++){
      this.SCplaylist.push(arr[i]);
    }
  }
  streamById(trackId){
    SC.stream('/tracks/' + trackId).then(function(player){
      console.log(player);
      player.play();
      // handle buttons clicks
      document.getElementById('play-sc').addEventListener('click', function(){
        player.play();
      });
      document.getElementById('pause-sc').addEventListener('click', function(){
        player.pause();
      });
      document.getElementById('stop-sc').addEventListener('click', function(){
        player.pause();
        player.seek(0);
      });
    });
  }
  displaySongsResult(song){
    var songEl = document.createElement('div');
    var link = document.createElement('a');
    link.href = song.permalink_url;
    var text = document.createTextNode(song.title);
    link.appendChild(text);
    songEl.appendChild(link);

    document.getElementById('soundcloud').appendChild(songEl);
  }
}

function init(){
  // create SC instance based on the App Id from the config file
  var sound = new SoundCloudJukebox(scId);
  // init the SC connection
  sound.initSC();
  // 336768726
  // get tracks based on the user input as a search and stream the first song
  document.getElementById('search').addEventListener('change', function(){
    var userInput = this.value;
    var tracks = sound.getTracksByTerm(userInput); // returns a promise
    tracks.then(function(result){
      sound.setPlaylist(result);
      var songs = sound.getPlaylist();
      songs.forEach(function(cur){
        sound.displaySongsResult(cur);
      });
      // stream first track from the result
      sound.streamById(songs[0].id);
    });
  });

  // get tracks based on the user input as a track id and stream the song
  document.getElementById('track-id').addEventListener('change', function(){
    var userInput = this.value;
    var songResult = sound.getTracksById(userInput); // returns a promise
    songResult.then(function(result){
      // display song info in the UI
      sound.displaySongsResult(result);
      // convert the result into an array and set the playlist
      var arr = [result];
      sound.setPlaylist(arr);
      // stream the track
      sound.streamById(userInput);
    });
  });

}
init();
