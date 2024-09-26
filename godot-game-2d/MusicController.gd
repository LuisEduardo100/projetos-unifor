extends Node2D



func playMusic():
	$AudioStreamPlayer2D.play()	

func _on_audio_stream_player_2d_finished():
	playMusic()
