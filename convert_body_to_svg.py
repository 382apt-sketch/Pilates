#!/usr/bin/env python3
import json
import re

# React-body-highlighter의 근육 목록과 우리 근육 ID를 매핑
muscle_mapping = {
    # Front view
    'chest': 'pectoralis_major',
    'obliques': 'obliques',
    'abs': 'rectus_abdominis',
    'biceps': 'biceps',
    'triceps': 'triceps',
    'forearm': 'forearm',
    'front-deltoids': 'anterior_deltoid',
    'quadriceps': 'quadriceps',
    'adductor': 'adductors',
    'tibialis': 'tibialis_anterior',
    'calves': 'calves',
    'knees': 'knees',
    'head': 'head',
    'neck': 'neck',
    'hands': 'hands',
    'feet': 'feet',
    'ankles': 'ankles',
    
    # Back view
    'trapezius': 'upper_trapezius',
    'back-deltoids': 'posterior_deltoid',
    'upper-back': 'latissimus_dorsi',
    'lower-back': 'erector_spinae',
    'gluteal': 'gluteus_maximus',
    'hamstring': 'hamstrings',
}

# ViewBox for front and back
viewbox_front = "0 0 724 1448"
viewbox_back = "724 0 724 1448"

def create_svg_front():
    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox_front}" style="background: #f8f8f8;">
  <!-- 전면 인체 근육 맵 - react-body-highlighter 기반 -->
  <g id="body-outline" stroke="#dfdfdf" stroke-width="2" fill="none">
    <path d="M 309.48 168.91 Q 305.84 164.32 303.32 169.76 C 298.49 180.21 308.31 200.03 314.51 208.74 C 316.34 211.31 318.01 208.95 318.58 207.26 A 0.67 0.66 57.6 0 1 319.87 207.55 C 319.06 215.09 318.68 227.40 324.34 232.47 C 327.22 235.05 326.97 235.88 326.92 239.51 Q 326.68 255.16 323.97 266.82 Q 323.85 267.35 323.48 267.73 Q 308.61 282.73 290.26 293.23 C 278.34 300.05 267.53 299.26 253.00 298.03 Q 237.49 296.72 224.74 305.21 C 208.71 315.86 190.95 335.73 189.24 355.50"/>
  </g>
  
  <!-- 근육 그룹들 -->
'''
    
    # Add closing tag
    svg_content += '''</svg>'''
    
    return svg_content

def create_svg_back():
    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox_back}" style="background: #f8f8f8;">
  <!-- 후면 인체 근육 맵 - react-body-highlighter 기반 -->
  <g id="body-outline" stroke="#dfdfdf" stroke-width="2" fill="none">
    <path d="M 1028.14 166.45 Q 1021.22 166.96 1021.73 176.02 C 1022.38 187.38 1027.41 200.00 1034.70 209.56 A 0.95 0.95 0.0 0 0 1035.77 209.88"/>
  </g>
  
  <!-- 근육 그룹들 -->
</svg>'''
    
    return svg_content

# Generate SVG files
front_svg = create_svg_front()
back_svg = create_svg_back()

print("SVG files structure ready!")
print(f"Mapped muscles: {len(muscle_mapping)}")
