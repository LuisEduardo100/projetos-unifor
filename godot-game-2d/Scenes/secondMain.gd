extends Node

@onready var heartsContainer = $CanvasLayer/heartsContainer
@onready var player = $Player
@onready var music_mapa_2 = $MusicMapa2

# Called when the node enters the scene tree for the first time.
func _ready():
	music_mapa_2.play()
	heartsContainer.setMaxHearts(player.maxHealth)
	heartsContainer.updateHearts(player.currentHealth)
	player.healthChanged.connect(heartsContainer.updateHearts)
