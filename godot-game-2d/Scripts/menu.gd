extends Control

@onready var start_btn = $VBoxContainer2/StartBtn

func _ready():
	start_btn.grab_focus()

func _on_start_btn_pressed():
	get_tree().change_scene_to_file("res://Scenes/main.tscn")

func _on_quit_btn_pressed():
	get_tree().quit()
