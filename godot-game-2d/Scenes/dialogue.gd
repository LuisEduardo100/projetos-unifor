extends CanvasLayer

@onready var rich_text_label = $RichTextLabel
@onready var button = $HBoxContainer/Button
@onready var button_2 = $HBoxContainer/Button2
@onready var button_3 = $HBoxContainer/Button3
@onready var hearts_container = $"../../CanvasLayer/heartsContainer"
@onready var sucessMusic = $"../sucess"
@onready var errorMusic = $"../error"

signal healthChanged

var current_correct_answer = ""
var current_boss_type = ""
var player_instance = null
var answers_needed_boss = 5
var answers_needed = 3
var answers_done = 1
var questions_asked = []

func fill_questionary(boss_type, player):
	current_boss_type = boss_type
	player_instance = player
	var json = JSON.new()
	var file = "Assets/" + boss_type + "_questions.json"
	var json_as_text = FileAccess.get_file_as_string(file)
	var json_as_dict = json.parse_string(json_as_text)

	var rng = RandomNumberGenerator.new()
	
	var q_index = rng.randi_range(0, len(json_as_dict) - 1)
	while q_index in questions_asked:
		q_index = rng.randi_range(0, len(json_as_dict) - 1)
	questions_asked.append(q_index)
	
	rich_text_label.bbcode_enabled = true
	rich_text_label.text = "[color=#000000]" + json_as_dict[q_index]["pergunta"] + "[/color]"
	button.text = json_as_dict[q_index]["opcoes"]["a"]
	button_2.text = json_as_dict[q_index]["opcoes"]["b"]
	button_3.text = json_as_dict[q_index]["opcoes"]["c"]
	current_correct_answer = json_as_dict[q_index]["resposta_verdadeira"]
	
	button.grab_focus()

func check_correct_answer(answer):
	if answer == current_correct_answer:
		sucessMusic.play()
		if current_boss_type == "first_boss":
			if answers_needed > answers_done:
				fill_questionary("first_boss", player_instance)
				answers_done += 1
			else:
				(player_instance as Player).get_tree().change_scene_to_file("res://Scenes/second_phase.tscn")
				pass
		elif current_boss_type == "second_boss": 
			if answers_needed > answers_done:
				fill_questionary("second_boss", player_instance)
				answers_done += 1
			else:
				(player_instance as Player).get_tree().change_scene_to_file("res://Scenes/third_phase.tscn")
		elif current_boss_type == "third_boss":
			if answers_needed_boss > answers_done:
				fill_questionary("third_boss", player_instance)
				answers_done += 1
			else:
				get_tree().change_scene_to_file("res://Scenes/you_win.tscn")
				pass
	else:
		errorMusic.play()
		(player_instance as Player).currentHealth -= 1
		if (player_instance as Player).currentHealth <= 0:
			get_tree().change_scene_to_file("res://Scenes/game_over_screen.tscn")
			return
		healthChanged.emit((player_instance as Player).currentHealth)
		hearts_container.updateHearts((player_instance as Player).currentHealth)

func _on_button_pressed():
	check_correct_answer("a")

func _on_button_2_pressed():
	check_correct_answer("b")

func _on_button_3_pressed():
	check_correct_answer("c")
