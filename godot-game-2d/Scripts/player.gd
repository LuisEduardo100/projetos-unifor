extends CharacterBody2D

class_name Player

signal healthChanged


const SPEED = 300.0
const JUMP_VELOCITY = -400.0

# Get the gravity from the project settings to be synced with RigidBody nodes.
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

@onready var button = $HBoxContainer/Button
@onready var button_2 = $HBoxContainer/Button2
@onready var button_3 = $HBoxContainer/Button3
@onready var ui_points = $UI_POINTS

@export var points = ScoreCode.pointsUi
@export var maxHealth = 3
@onready var currentHealth: int = maxHealth
@onready var animated_sprite_2d = $AnimatedSprite2D
@onready var area_collision_shape_2d = $Area2D/AreaCollisionShape2D
@onready var body_collision_shape_2d = $BodyCollisionShape2D
@onready var lv1_dialogue = $"../Boss_LV_1/Dialogue"
@onready var lv2_dialogue = $"../Boss_LV_2/Dialogue"
@onready var lv3_dialogue = $"../Boss_LV_3/Dialogue"
@export_group("Locomotion")
@export var run_speed_damping = 2.2
@export var speed = 100.0
@export var jump_velocity = -350
@export_group("")

@export_group("CameraSync")
@export var camera_sync = Camera2D
@export var should_camera_sync: bool = true
@export_group("")

func _ready():
	ui_points.set_score(points)

func _process(delta):
	if global_position.x > camera_sync.global_position.x && should_camera_sync:
		camera_sync.global_position.x = global_position.x
	if global_position.x < camera_sync.global_position.x && should_camera_sync:
		camera_sync.global_position.x = global_position.x

func _physics_process(delta):
	if not is_on_floor():
		velocity.y += gravity * delta
	
	if Input.is_action_just_pressed("jump") and is_on_floor():
		velocity.y = jump_velocity
	
	if Input.is_action_just_released("jump") and velocity.y < 0:
		velocity.y *= .5
		
	var direction = Input.get_axis("left", "right")
	
	if direction:
		velocity.x = lerp(velocity.x, speed * direction, run_speed_damping * delta)
	else:
		velocity.x = move_toward(velocity.x, 0, speed * delta)
	
	animated_sprite_2d.trigger_animation(velocity, direction)
	
	move_and_slide()

func _on_too_close_area_area_entered(area):
	velocity.x = 0
	velocity.y = 0
	speed = 0
	jump_velocity = 0
	
	var lv1 = get_tree().root.get_node("main")
	if lv1:
		lv1_dialogue.fill_questionary("first_boss", self)
		lv1_dialogue.visible = !lv1_dialogue.visible
		return
	var lv2 = get_tree().root.get_node("SecondPhase")
	if lv2:
		lv2_dialogue.fill_questionary("second_boss", self)
		lv2_dialogue.visible = !lv2_dialogue.visible
		return
	var lv3 = get_tree().root.get_node("ThirdPhase")
	if lv3:
		lv3_dialogue.fill_questionary("third_boss", self)
		lv3_dialogue.visible = !lv3_dialogue.visible
		return

func _on_area_2d_area_entered(area):
	currentHealth -= 1
	if currentHealth <= 0:
		#get_tree().reload_current_scene()
		get_tree().change_scene_to_file("res://Scenes/game_over_screen.tscn")
		ScoreCode.pointsUi = 0;
		return
	healthChanged.emit(currentHealth)
	respawn_player()

func respawn_player():
	var lv1 = get_tree().root.get_node("main")
	if lv1:
		var player_position = Vector2(329, 17)
		position = player_position
		return
	var lv2 = get_tree().root.get_node("SecondPhase")
	if lv2:
		var player_position = Vector2(-24, 12)
		position = player_position
		return
	var lv3 = get_tree().root.get_node("ThirdPhase")
	if lv3:
		var player_position = Vector2(-112, 29)
		position = player_position
		return

func add_points(quantity: int):
	ScoreCode.pointsUi += quantity
	ui_points.set_score(ScoreCode.pointsUi)

func _on_orange_area_entered(area):
	add_points(100)


func _on_orange_4_area_entered(area):
	add_points(100)


func _on_orange_5_area_entered(area):
	add_points(100)


func _on_orange_6_area_entered(area):
	add_points(100)


func _on_orange_3_area_entered(area):
	add_points(100)


func _on_orange_2_area_entered(area):
	add_points(100)


func _on_orange_7_area_entered(area):
	add_points(100)


func _on_orange_12_area_entered(area):
	add_points(100)


func _on_orange_13_area_entered(area):
	add_points(100)


func _on_orange_14_area_entered(area):
	add_points(100)


func _on_orange_15_area_entered(area):
	add_points(100)


func _on_orange_16_area_entered(area):
	add_points(100)


func _on_orange_9_area_entered(area):
	add_points(100)


func _on_orange_11_area_entered(area):
	add_points(100)


func _on_orange_10_area_entered(area):
	add_points(100)


func _on_orange_8_area_entered(area):
	add_points(100)
