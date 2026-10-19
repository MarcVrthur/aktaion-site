"""Prepare the illustrative WebP photos used by the Aktaion site.

Reads the original asset pack (read-only), normalises EXIF rotation and colour,
then writes two responsive WebP versions per photo into assets/img/photos/.

Usage:
    python prepare-photos.py [--source PATH] [--out PATH]
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image, ImageOps

PHOTOS = {
    "hero-atelier": "accueil/accueil-hero-equipe.webp",
    "secteur-public": "accueil/accueil-secteur-public.webp",
    "secteur-prive": "accueil/accueil-secteur-prive.webp",
    "terrain-collecte": "digitalisation/digit-collecte-terrain.webp",
    "formation-agents": "digitalisation/digit-formation-agents.webp",
    "planning-editorial": "marketing/marketing-calendrier-editorial.webp",
    "tournage": "marketing/marketing-tournage.webp",
    "atelier-cadrage": "methode/methode-etape-cadrage.webp",
    "atelier-production": "methode/methode-etape-production.webp",
    "atelier-validation": "methode/methode-etape-validation.webp",
    "atelier-livraison": "methode/methode-etape-livraison.webp",
    "bureaux-01": "agence/agence-bureaux-01.webp",
    "bureaux-02": "agence/agence-bureaux-02.webp",
    "equipe-large": "agence/agence-equipe.webp",
    "facade": "contact/contact-facade.webp",
    "data-presentation": "expertises/expertises-data-ia.webp",
    "digitalisation-atelier": "expertises/expertises-digitalisation.webp",
    "web-equipe": "expertises/expertises-web-mobile.webp",
    "audiovisuel-screens": "expertises/expertises-marketing-audiovisuel.webp",
    "web-cadrage": "services-web/web-atelier-cadrage.webp",
    "web-demo": "services-web/web-livraison-demo.webp",
    "realisation-video": "realisations/realisation-07.webp",
    "showreel": "marketing/marketing-showreel-poster.webp",
    "secteur-public-wide": "secteurs/secteurs-public.webp",
    "secteur-prive-wide": "secteurs/secteurs-prive.webp",
}

WIDTHS = (640, 1280)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--source",
        type=Path,
        default=Path(r"C:/Users/marca/Downloads/aktaion-assets"),
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=Path(__file__).resolve().parents[2] / "assets" / "img" / "photos",
    )
    args = parser.parse_args()

    args.out.mkdir(parents=True, exist_ok=True)
    manifest: dict[str, dict[str, int]] = {}

    for slug, relative in PHOTOS.items():
        source = args.source / relative
        if not source.exists():
            raise SystemExit(f"Missing source photo: {source}")

        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened)
            if image.mode not in ("RGB", "L"):
                image = image.convert("RGB")

            max_width = min(1280, max(640, image.width))
            out_width = 1280 if image.width >= 1200 else max_width
            height = round(image.height * out_width / image.width)

            for width in WIDTHS:
                # Never upscale beyond the source by more than a hair; the
                # 1280 slot is intentional for full-width layouts.
                target_width = width if width <= out_width else out_width
                target_height = round(image.height * target_width / image.width)
                resized = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
                destination = args.out / f"{slug}-{width}.webp"
                resized.save(
                    destination,
                    "WEBP",
                    quality=80,
                    method=6,
                    optimize=True,
                )

            manifest[slug] = {"w": out_width, "h": height}
            print(f"{slug:24s} {image.width}x{image.height} -> {out_width}x{height}")

    manifest_path = args.out / "photos.json"
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"\nWrote {len(PHOTOS)} photos to {args.out}")


if __name__ == "__main__":
    main()
