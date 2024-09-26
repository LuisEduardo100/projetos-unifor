extends Node

@onready var heartsContainer = $CanvasLayer/heartsContainer
@onready var player = $Player
@onready var music_controller = $MusicController


# Called when the node enters the scene tree for the first time.
func _ready():
	music_controller.playMusic()
	heartsContainer.setMaxHearts(player.maxHealth)
	heartsContainer.updateHearts(player.currentHealth)
	player.healthChanged.connect(heartsContainer.updateHearts)
