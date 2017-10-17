// // SoundCloud
//
// SC.initialize({
//   client_id: 'fd4e76fc67798bfa742089ed619084a6'
// });
//
// const playlist = [];
//
// SC.get("/tracks",{q: "Dogs"}).then(function(response){
//   console.log(response);
//   // play(0);
// });
//
// function play(index){
//   if( !playlist[index].player ) {
//     SC.stream(`/tracks/${playlist[index].id}`).then(function(player){
//       playlist[index].player = player;
//       player.play();
//     });
//   } else {
//     playlist[index].player.play();
//   }
// }
