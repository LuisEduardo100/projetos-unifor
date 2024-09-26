extends CanvasLayer

@onready var restart = $MarginContainer/PanelContainer/Rows/CenterContainer/VBoxContainer/Restart
@onready var quit = $MarginContainer/PanelContainer/Rows/CenterContainer/VBoxContainer/Quit
@onready var voce_ganhou_music = $VoceGanhouMusic

func _ready():
	restart.grab_focus()
	voce_ganhou_music.play()

func _on_restart_pressed():
	ScoreCode.pointsUi = 0
	get_tree().change_scene_to_file("res://Scenes/main.tscn")

func _on_quit_pressed():
	get_tree().quit()
	
