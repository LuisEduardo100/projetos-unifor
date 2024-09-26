extends CanvasLayer

class_name UI

@onready var center_container = $MarginContainer/CenterContainer
@onready var score_label = $MarginContainer/HBoxContainer/ScoreLabel
var pointsUi = 0;
func set_score(points: int):
	pointsUi = points;
	score_label.text = "PONTOS: %d" % pointsUi
