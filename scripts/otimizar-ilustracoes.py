"""Gera as versões leves das ilustrações das cangas para o site.

Lê os originais em public/cangas/ e grava WebP + PNG (com transparência)
em public/ilustracoes/. Rode de novo se a Ilma mandar arquivos novos:

    python3 scripts/otimizar-ilustracoes.py
"""
from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
ORIGEM = RAIZ / 'public' / 'cangas'
DESTINO = RAIZ / 'public' / 'ilustracoes'
DESTINO.mkdir(parents=True, exist_ok=True)

# nome do arquivo → largura máxima em px (2× o maior tamanho exibido)
ALVOS = {
    'coqueiro': 447,          # original já é pequeno (447×800): não ampliar
    'espreguicadeira': 420,   # exibida até ~200 px
    'estrela-do-mar': 240,    # exibida até ~110 px
    'listras-aquarela': 800,  # tile que se repete; manter 800×800 para não criar emenda
}

for nome, largura in ALVOS.items():
    im = Image.open(ORIGEM / f'{nome}.png').convert('RGBA')
    if im.width > largura:
        im = im.resize((largura, round(im.height * largura / im.width)), Image.LANCZOS)
    im.save(DESTINO / f'{nome}.webp', 'WEBP', quality=82, method=6)
    # PNG de reserva com paleta (mantém a transparência e fica bem menor)
    im.quantize(colors=256, method=Image.FASTOCTREE, dither=Image.FLOYDSTEINBERG).save(
        DESTINO / f'{nome}.png', optimize=True)
    for ext in ('webp', 'png'):
        kb = (DESTINO / f'{nome}.{ext}').stat().st_size / 1024
        print(f'{nome}.{ext}: {im.width}×{im.height}, {kb:.0f} KB')
