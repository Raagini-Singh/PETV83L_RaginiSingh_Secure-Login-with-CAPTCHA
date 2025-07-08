import os
import random
import string
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Create output folder
os.makedirs("Hackdoor_Captcha/captcha-images", exist_ok=True)

# Set parameters
num_images = 10
captcha_length = 5
width = 250
height = 80
font_path = "C:\\Windows\\Fonts\\consola.ttf"  # <- Works on Windows

def random_text(length=5):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

def generate_captcha_image(text, filename):
    image = Image.new('RGB', (width, height), (0, 0, 0))
    draw = ImageDraw.Draw(image)

    try:
        font = ImageFont.truetype(font_path, 44)
    except:
        font = ImageFont.load_default()

    # Draw noise
    for _ in range(8):
        x1 = random.randint(0, width)
        y1 = random.randint(0, height)
        x2 = random.randint(0, width)
        y2 = random.randint(0, height)
        draw.line(((x1, y1), (x2, y2)), fill=(0, 255, 65), width=1)

    # Draw text
    x = 30
    for char in text:
        y_offset = random.randint(-10, 10)
        draw.text((x, 20 + y_offset), char, font=font, fill=(0, 255, 65))
        x += 40

    image = image.filter(ImageFilter.GaussianBlur(0.7))
    image.save(f"captcha-images/{filename}")

# Generate CAPTCHA images
for i in range(1, num_images + 1):
    text = random_text(captcha_length)
    filename = f"cap{i}.png"
    generate_captcha_image(text, filename)
    print(f"[+] Generated {filename} with text: {text}")
