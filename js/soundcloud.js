// SoundCloud
class SoundCloudJukebox{
  constructor(id){
    SC.initialize({
      client_id: id
    });
  }
}


var playlist = [];

SC.get("/tracks", {q: 'sashasashamarie'}).then(function(response){
  playlist = response;
});

function play(index){
  if( !playlist[index].player ) {
    SC.stream(`/tracks/${playlist[index].id}`).then(function(player){
      playlist[index].player = player;
      player.play();
    });
  } else {
    playlist[index].player.play();
  }
}
