import math
import struct
import wave

FREQS = [220, 262, 311, 370, 440, 523]  # one per ring step, low -> high
DURATION = 0.5
RATE = 22050
AMPLITUDE = 0.25

for i, freq in enumerate(FREQS):
    n_samples = int(RATE * DURATION)
    frames = bytearray()
    for s in range(n_samples):
        t = s / RATE
        fade = min(1.0, min(t, DURATION - t) * 20)  # quick fade in/out, avoid clicks
        sample = AMPLITUDE * fade * math.sin(2 * math.pi * freq * t)
        frames += struct.pack('<h', int(sample * 32767))
    path = f"src/assets/audio/ring-{i}.wav"
    with wave.open(path, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(RATE)
        wf.writeframes(bytes(frames))
    print(path)
