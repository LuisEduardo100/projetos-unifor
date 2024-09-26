extends Area2D


@onready var anim = $AnimatedSprite2D
@onready var collision_shape_2d = $CollisionShape2D

func _ready():
	anim.play("orange")

func _on_area_entered(area):
	if area.name == "PlayerArea2D":
		$VoceGanhouMusic.play()
		var tween = create_tween()
		tween.tween_property(self, "position", position + Vector2(0, -20), 0.25)
		tween.tween_callback(self.queue_free)
