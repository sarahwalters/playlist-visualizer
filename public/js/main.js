$('.track').click(function(event) {
	var trackId = $(event.target).attr('id');
	$.ajax({
		url: 'https://api.spotify.com/v1/tracks/'+trackId,
		success: function (response) {
			var audio = new Audio();
			audio.src = response.preview_url;
			audio.play();
		}
	});
})