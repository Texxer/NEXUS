#!/usr/bin/env python3
"""Create minimal PNG and ICO files for Tauri"""

from PIL import Image
import os

# Create 32x32 red square PNG
img_32 = Image.new('RGB', (32, 32), color='red')
img_32.save('32x32.png')
print('Created 32x32.png')

# Create 128x128 red square PNG
img_128 = Image.new('RGB', (128, 128), color='red')
img_128.save('128x128.png')
print('Created 128x128.png')

# Create 128x128@2x red square PNG
img_256 = Image.new('RGB', (256, 256), color='red')
img_256.save('128x128@2x.png')
print('Created 128x128@2x.png')

# Create ICO from 32x32 image (ICO format requires special handling)
# PIL can convert PNG to ICO
img_icon = Image.new('RGB', (32, 32), color='red')
img_icon.save('icon.ico', format='ICO')
print('Created icon.ico')
