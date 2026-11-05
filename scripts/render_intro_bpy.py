"""
Teaching light to think - landing intro (Blender 5.x / bpy, Cycles).

A light pulse ignites at the centre, emits shock shells, inflates into a
procedural brain with folded cortex, neurons fire along synapse curves, and the
title fades in. Renders a PNG sequence; encode with ffmpeg afterwards.

Env vars (all optional):
  RX, RY       resolution            (default 1920x1080)
  SAMPLES      Cycles samples        (default 128)
  F0, F1       frame range           (default 1..240 = 8 s @ 30 fps)
  OUT          output dir for PNGs   (required)
  BLEND_OUT    optional .blend save path

Run:  python build_intro.py
"""
import os
import math
import random

import numpy as np
import bpy
import bmesh

# ----------------------------------------------------------------- config
RX = int(os.environ.get("RX", 1920))
RY = int(os.environ.get("RY", 1080))
SAMPLES = int(os.environ.get("SAMPLES", 128))
F0 = int(os.environ.get("F0", 1))
F1 = int(os.environ.get("F1", 240))
OUT = os.environ["OUT"]
BLEND_OUT = os.environ.get("BLEND_OUT", "")
FPS = 30

random.seed(7)
np.random.seed(7)


def F(t):
    """Seconds -> frame number."""
    return int(round(t * FPS)) + 1


# ----------------------------------------------------------------- scene reset
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

r = scene.render
r.engine = "CYCLES"
r.resolution_x = RX
r.resolution_y = RY
r.resolution_percentage = 100
r.fps = FPS
r.fps_base = 1.0
r.use_persistent_data = True
scene.frame_start = F0
scene.frame_end = F1
r.image_settings.file_format = "PNG"
r.image_settings.color_mode = "RGB"
r.image_settings.color_depth = "8"
r.filepath = os.path.join(OUT, "f_")

scene.view_settings.view_transform = "AgX"
try:
    scene.view_settings.look = "AgX - Medium High Contrast"
except TypeError:
    scene.view_settings.look = "None"
scene.view_settings.exposure = 0.0

c = scene.cycles
c.samples = SAMPLES
c.preview_samples = 16
c.use_denoising = True
c.max_bounces = 8
c.diffuse_bounces = 3
c.glossy_bounces = 4
c.transmission_bounces = 6
c.volume_bounces = 2
c.caustics_reflective = False
c.caustics_refractive = False

# ----------------------------------------------------------------- GPU
device_used = "CPU"
try:
    prefs = bpy.context.preferences.addons["cycles"].preferences
    for dtype in ("OPTIX", "CUDA"):
        try:
            prefs.compute_device_type = dtype
            prefs.get_devices()
            gpus = [d for d in prefs.devices if d.type == dtype]
            if gpus:
                for d in prefs.devices:
                    d.use = d.type == dtype
                c.device = "GPU"
                device_used = dtype
                break
        except Exception:
            continue
    c.denoiser = "OPTIX" if device_used == "OPTIX" else "OPENIMAGEDENOISE"
except Exception as e:  # fall back to CPU
    print("GPU setup failed, using CPU:", e)
    c.device = "CPU"
print("Cycles device:", device_used, "| samples:", SAMPLES, "| res:", RX, "x", RY)

# ----------------------------------------------------------------- world
world = bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes["Background"]
bg.inputs["Color"].default_value = (0.004, 0.005, 0.012, 1.0)
bg.inputs["Strength"].default_value = 1.0


# ----------------------------------------------------------------- helpers
def link_obj(obj):
    scene.collection.objects.link(obj)
    return obj


def new_mat(name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    return m


def ico_obj(name, subdiv, radius=1.0):
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=subdiv, radius=radius)
    me = bpy.data.meshes.new(name + "Mesh")
    bm.to_mesh(me)
    bm.free()
    for p in me.polygons:
        p.use_smooth = True
    return link_obj(bpy.data.objects.new(name, me))


def key(obj_or_data, path, t, value, index=-1):
    """Set a property and insert a keyframe at time t (seconds)."""
    owner = obj_or_data
    setattr(owner, path, value)
    owner.keyframe_insert(data_path=path, frame=F(t))


def key_socket(sock, t, value):
    sock.default_value = value
    sock.keyframe_insert("default_value", frame=F(t))


def key_index(obj, path, index, t, value):
    arr = getattr(obj, path)
    arr[index] = value
    obj.keyframe_insert(data_path=path, index=index, frame=F(t))


# ----------------------------------------------------------------- brain shape
def brain_shape(p):
    """Unit-sphere points -> procedural brain (hemispheres, fissure, cortex folds)."""
    x, y, z = p[:, 0], p[:, 1], p[:, 2]
    X = x * 1.00
    Y = y * 1.28
    Z = z * 0.90
    Z = np.where(z < 0, Z * 0.74, Z)  # flatter base
    fissure = np.exp(-((x / 0.10) ** 2)) * np.clip(z, 0.0, 1.0)
    Z = Z - 0.30 * fissure  # longitudinal fissure dip on top
    X = X * (1.0 - 0.10 * fissure)
    cereb = np.exp(-(((y + 0.80) / 0.42) ** 2) - (((z + 0.40) / 0.28) ** 2))
    Z = Z - 0.16 * cereb  # cerebellum pocket at the back-bottom
    base = np.stack([X, Y, Z], axis=1)

    fold = (
        0.036 * np.sin(7.0 * x + 1.3 * np.sin(4.0 * y))
        * np.sin(6.0 * y + 0.7 * np.cos(5.0 * z))
        * np.sin(6.5 * z + 0.4)
        + 0.012 * np.sin(14.0 * x * y + 11.0 * z + 0.3)
        + 0.006 * np.sin(20.0 * x + 17.0 * y * z + 1.1)
    )
    fold = fold * (1.0 - 0.6 * fissure)  # keep the midline smoother
    return base * (1.0 + fold[:, None])


# ----------------------------------------------------------------- core (light -> brain)
core = ico_obj("Core", subdiv=7, radius=1.0)  # ~164k verts: shape-key morph target
base_co = np.empty(len(core.data.vertices) * 3, dtype=np.float32)
core.data.vertices.foreach_get("co", base_co)
base_co = base_co.reshape(-1, 3)
core.shape_key_add(name="Basis", from_mix=False)
brain_sk = core.shape_key_add(name="Brain", from_mix=False)
brain_co = brain_shape(base_co.astype(np.float64)).astype(np.float32)
brain_sk.data.foreach_set("co", brain_co.ravel())

core_mat = new_mat("CoreMat")
nt = core_mat.node_tree
nodes, links = nt.nodes, nt.links
nodes.clear()
out = nodes.new("ShaderNodeOutputMaterial")
bsdf = nodes.new("ShaderNodeBsdfPrincipled")
links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
bsdf.inputs["Base Color"].default_value = (0.52, 0.34, 0.66, 1.0)
bsdf.inputs["Roughness"].default_value = 0.34
bsdf.inputs["Subsurface Weight"].default_value = 0.0
bsdf.inputs["Subsurface Scale"].default_value = 0.04
bsdf.inputs["Subsurface Radius"].default_value = (1.0, 0.45, 0.55)
bsdf.inputs["Emission Color"].default_value = (0.36, 0.90, 1.0, 1.0)
bsdf.inputs["Emission Strength"].default_value = 0.0
noise = nodes.new("ShaderNodeTexNoise")
noise.inputs["Scale"].default_value = 22.0
noise.inputs["Detail"].default_value = 9.0
noise.inputs["Roughness"].default_value = 0.6
bump = nodes.new("ShaderNodeBump")
bump.inputs["Strength"].default_value = 0.10
bump.inputs["Distance"].default_value = 0.02
links.new(noise.outputs["Fac"], bump.inputs["Height"])
links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
core.data.materials.append(core_mat)

pivot = link_obj(bpy.data.objects.new("Pivot", None))
core.parent = pivot

# core timeline
core.scale = (0.001, 0.001, 0.001)
core.keyframe_insert("scale", frame=F(0.0))
for t, s in [(0.50, 0.050), (1.20, 0.320), (2.00, 0.520), (2.60, 0.860), (3.60, 1.000)]:
    core.scale = (s, s, s)
    core.keyframe_insert("scale", frame=F(t))

brain_sk.value = 0.0
brain_sk.keyframe_insert("value", frame=F(1.8))
brain_sk.value = 1.0
brain_sk.keyframe_insert("value", frame=F(3.8))

sb = bsdf.inputs["Emission Strength"]
for t, v in [(0.0, 0.0), (0.45, 38.0), (1.0, 9.0), (1.9, 7.0), (2.8, 2.2), (3.7, 0.35), (8.0, 0.25)]:
    key_socket(sb, t, v)
key_socket(bsdf.inputs["Subsurface Weight"], 2.4, 0.0)
key_socket(bsdf.inputs["Subsurface Weight"], 3.8, 0.25)

pivot.rotation_euler = (0.0, 0.0, 0.0)
pivot.keyframe_insert("rotation_euler", frame=F(3.2))
pivot.rotation_euler = (0.0, 0.0, 0.55)
pivot.keyframe_insert("rotation_euler", frame=F(8.0))

# ----------------------------------------------------------------- light shells
shell_mat_nodes = []


def make_shell(name, t0, dur, s0, s1, peak):
    ob = ico_obj(name, subdiv=4, radius=1.0)
    m = new_mat(name + "Mat")
    nt2 = m.node_tree
    n2, l2 = nt2.nodes, nt2.links
    n2.clear()
    o2 = n2.new("ShaderNodeOutputMaterial")
    mix = n2.new("ShaderNodeMixShader")
    trans = n2.new("ShaderNodeBsdfTransparent")
    emis = n2.new("ShaderNodeEmission")
    lw = n2.new("ShaderNodeLayerWeight")
    lw.inputs["Blend"].default_value = 0.55
    pw = n2.new("ShaderNodeMath")
    pw.operation = "POWER"
    pw.inputs[1].default_value = 4.0
    emis.inputs["Color"].default_value = (0.42, 0.92, 1.0, 1.0)
    emis.inputs["Strength"].default_value = 0.0
    l2.new(lw.outputs["Facing"], pw.inputs[0])
    l2.new(pw.outputs["Value"], mix.inputs["Fac"])
    l2.new(trans.outputs["BSDF"], mix.inputs[1])
    l2.new(emis.outputs["Emission"], mix.inputs[2])
    l2.new(mix.outputs["Shader"], o2.inputs["Surface"])
    ob.data.materials.append(m)
    ob.scale = (s0, s0, s0)
    ob.keyframe_insert("scale", frame=F(t0))
    ob.scale = (s1, s1, s1)
    ob.keyframe_insert("scale", frame=F(t0 + dur))
    emis.inputs["Strength"].default_value = 0.0
    emis.inputs["Strength"].keyframe_insert("default_value", frame=F(t0))
    emis.inputs["Strength"].default_value = peak
    emis.inputs["Strength"].keyframe_insert("default_value", frame=F(t0 + 0.22))
    emis.inputs["Strength"].default_value = 0.0
    emis.inputs["Strength"].keyframe_insert("default_value", frame=F(t0 + dur))
    return ob


make_shell("ShellA", 0.85, 1.9, 0.25, 3.4, 4.0)
make_shell("ShellB", 1.45, 1.9, 0.25, 3.4, 3.0)
make_shell("ShellC", 2.15, 1.9, 0.25, 3.4, 2.2)

# ----------------------------------------------------------------- haze (volumetric glow)
haze = ico_obj("Haze", subdiv=5, radius=3.0)
hm = new_mat("HazeMat")
nt3 = hm.node_tree
n3, l3 = nt3.nodes, nt3.links
n3.clear()
o3 = n3.new("ShaderNodeOutputMaterial")
pv = n3.new("ShaderNodeVolumePrincipled")
pv.inputs["Color"].default_value = (0.32, 0.82, 1.0, 1.0)
pv.inputs["Anisotropy"].default_value = 0.35
pv.inputs["Density"].default_value = 0.02
l3.new(pv.outputs["Volume"], o3.inputs["Volume"])
haze.data.materials.append(hm)
for t, v in [(0.0, 0.0), (0.5, 0.008), (1.2, 0.03), (2.2, 0.02), (3.8, 0.012), (8.0, 0.01)]:
    key_socket(pv.inputs["Density"], t, v)
haze.hide_render = False

# ----------------------------------------------------------------- synapses (fire along brain surface)
syn_mat = new_mat("SynapseMat")
nt4 = syn_mat.node_tree
n4, l4 = nt4.nodes, nt4.links
n4.clear()
o4 = n4.new("ShaderNodeOutputMaterial")
e4 = n4.new("ShaderNodeEmission")
e4.inputs["Color"].default_value = (0.55, 0.95, 1.0, 1.0)
e4.inputs["Strength"].default_value = 9.0
l4.new(e4.outputs["Emission"], o4.inputs["Surface"])

brain_pts = brain_co.astype(np.float64)
N = len(brain_pts)
sample = np.random.choice(N, 9000, replace=False)
syn_objs = []
for k in range(84):
    ia = int(np.random.choice(sample))
    A = brain_pts[ia]
    d = np.linalg.norm(brain_pts[sample] - A, axis=1)
    cand = sample[(d > 0.35) & (d < 0.95)]
    if len(cand) == 0:
        continue
    ib = int(np.random.choice(cand))
    B = brain_pts[ib]
    nA = A / np.linalg.norm(A)
    nB = B / np.linalg.norm(B)

    cd = bpy.data.curves.new(f"Synapse{k:02d}", "CURVE")
    cd.dimensions = "3D"
    cd.bevel_depth = 0.0075
    cd.bevel_resolution = 4
    cd.fill_mode = "FULL"
    sp = cd.splines.new("BEZIER")
    sp.bezier_points.add(1)
    p0, p1 = sp.bezier_points[0], sp.bezier_points[1]
    p0.handle_left_type = p0.handle_right_type = "FREE"
    p1.handle_left_type = p1.handle_right_type = "FREE"
    lift = 1.035
    p0.co = A * lift
    p1.co = B * lift
    p0.handle_right = A * lift + nA * 0.30
    p0.handle_left = A * lift - nA * 0.05
    p1.handle_left = B * lift + nB * 0.30
    p1.handle_right = B * lift - nB * 0.05
    cd.materials.append(syn_mat)

    ob = link_obj(bpy.data.objects.new(f"Synapse{k:02d}", cd))
    ob.parent = pivot
    syn_objs.append(ob)

    # travelling pulse: visible segment [start, end] sweeps along the curve
    t0 = random.uniform(3.6, 6.4)
    dur = random.uniform(0.7, 1.0)
    cd.bevel_factor_start = 0.0
    cd.keyframe_insert("bevel_factor_start", frame=F(0.0))
    cd.bevel_factor_end = 0.0
    cd.keyframe_insert("bevel_factor_end", frame=F(0.0))
    cd.bevel_factor_end = 0.0
    cd.keyframe_insert("bevel_factor_end", frame=F(t0))
    cd.bevel_factor_end = 1.0
    cd.keyframe_insert("bevel_factor_end", frame=F(t0 + dur))
    cd.bevel_factor_end = 1.0
    cd.keyframe_insert("bevel_factor_end", frame=F(8.5))
    cd.bevel_factor_start = 0.0
    cd.keyframe_insert("bevel_factor_start", frame=F(t0 + 0.5 * dur))
    cd.bevel_factor_start = 1.0
    cd.keyframe_insert("bevel_factor_start", frame=F(t0 + 1.5 * dur))
    cd.bevel_factor_start = 1.0
    cd.keyframe_insert("bevel_factor_start", frame=F(8.5))

# ----------------------------------------------------------------- title
tc = bpy.data.curves.new("TitleText", "FONT")
tc.body = "Teaching light to think"
tc.size = 0.34
tc.align_x = "CENTER"
tc.align_y = "CENTER"
tc.space_character = 1.04
title = link_obj(bpy.data.objects.new("Title", tc))
title.location = (0.0, 0.0, -1.62)
title.rotation_euler = (math.radians(90.0), 0.0, 0.0)  # face the camera (-Y)

tm = new_mat("TitleMat")
nt5 = tm.node_tree
n5, l5 = nt5.nodes, nt5.links
n5.clear()
o5 = n5.new("ShaderNodeOutputMaterial")
b5 = n5.new("ShaderNodeBsdfPrincipled")
l5.new(b5.outputs["BSDF"], o5.inputs["Surface"])
b5.inputs["Base Color"].default_value = (0.02, 0.03, 0.04, 1.0)
b5.inputs["Emission Color"].default_value = (0.90, 0.97, 1.0, 1.0)
b5.inputs["Emission Strength"].default_value = 0.0
tc.materials.append(tm)
for t, v in [(4.3, 0.0), (5.4, 2.2), (6.9, 2.2), (7.7, 0.0), (8.5, 0.0)]:
    key_socket(b5.inputs["Emission Strength"], t, v)
title.keyframe_insert("location", frame=F(4.3))
title.location = (0.0, 0.0, -1.50)
title.keyframe_insert("location", frame=F(7.7))
title.location = (0.0, 0.0, -1.62)
title.keyframe_insert("location", frame=F(4.3))
title.location = (0.0, 0.0, -1.50)
title.keyframe_insert("location", frame=F(5.6))

# ----------------------------------------------------------------- lights
def area(name, loc, energy, size, color):
    ld = bpy.data.lights.new(name, "AREA")
    ld.energy = energy
    ld.size = size
    ld.color = color
    lo = link_obj(bpy.data.objects.new(name, ld))
    lo.location = loc
    lo.rotation_euler = (math.radians(60), 0.0, math.radians(-30))
    return lo


area("Key", (-4.0, -5.0, 4.0), 420.0, 4.0, (0.80, 0.90, 1.0))
area("Rim", (4.5, 5.0, 2.5), 280.0, 3.0, (1.0, 0.55, 0.85))
area("Fill", (3.5, -6.0, -2.0), 90.0, 6.0, (0.55, 0.75, 1.0))

# ----------------------------------------------------------------- camera
rig = link_obj(bpy.data.objects.new("CamRig", None))
target = link_obj(bpy.data.objects.new("CamTarget", None))
target.location = (0.0, 0.0, -0.10)
cam_data = bpy.data.cameras.new("Cam")
cam_data.lens = 35.0
cam_data.clip_end = 100.0
cam = link_obj(bpy.data.objects.new("Cam", cam_data))
cam.parent = rig
cam.location = (0.0, -6.6, 0.40)
con = cam.constraints.new("TRACK_TO")
con.target = target
con.track_axis = "TRACK_NEGATIVE_Z"
con.up_axis = "UP_Y"
scene.camera = cam

rig.rotation_euler = (0.0, 0.0, math.radians(-7.0))
rig.keyframe_insert("rotation_euler", frame=F(0.0))
rig.rotation_euler = (0.0, 0.0, math.radians(6.0))
rig.keyframe_insert("rotation_euler", frame=F(8.0))

# ----------------------------------------------------------------- go
if BLEND_OUT:
    bpy.ops.wm.save_as_mainfile(filepath=BLEND_OUT)

print("Rendering frames", F0, "->", F1, "to", OUT)
bpy.ops.render.render(animation=True, write_still=True)
print("DONE")
