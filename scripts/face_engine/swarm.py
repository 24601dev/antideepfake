import sys
import json
import random
import time
import base64
import urllib.request
import urllib.parse
import re
import os


def upload_to_catbox(image_bytes):
    """Upload raw image bytes to catbox.moe and return a public URL."""
    try:
        boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
        body = (
            f'--{boundary}\r\n'
            f'Content-Disposition: form-data; name="reqtype"\r\n\r\n'
            f'fileupload\r\n'
            f'--{boundary}\r\n'
            f'Content-Disposition: form-data; name="fileToUpload"; filename="scan.jpg"\r\n'
            f'Content-Type: image/jpeg\r\n\r\n'
        ).encode('utf-8')
        body += image_bytes
        body += f'\r\n--{boundary}--\r\n'.encode('utf-8')

        req = urllib.request.Request('https://catbox.moe/user/api.php')
        req.add_header('Content-Type', f'multipart/form-data; boundary={boundary}')
        req.add_header('User-Agent', 'Mozilla/5.0')

        response = urllib.request.urlopen(req, data=body, timeout=15)
        return response.read().decode('utf-8').strip()
    except Exception as e:
        return None


def serpapi_google_lens(public_url, api_key):
    """Use SerpAPI Google Lens to find exact and visual matches across the web."""
    all_matches = []

    for search_type in ['exact_matches', 'visual_matches']:
        try:
            params = urllib.parse.urlencode({
                'engine': 'google_lens',
                'url': public_url,
                'hl': 'en',
                'api_key': api_key,
            })
            api_url = f'https://serpapi.com/search.json?{params}'
            req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
            response = urllib.request.urlopen(req, timeout=20)
            data = json.loads(response.read().decode('utf-8'))

            # Extract exact matches
            if search_type == 'exact_matches':
                for item in data.get('exact_matches', []):
                    all_matches.append({
                        'url': item.get('link', ''),
                        'thumbnail': item.get('thumbnail', ''),
                        'title': item.get('title', 'Untitled'),
                        'source': item.get('source', ''),
                        'score': 99,
                        'tag': 'EXACT',
                    })

            # Extract visual matches
            if search_type == 'visual_matches':
                for item in data.get('visual_matches', []):
                    all_matches.append({
                        'url': item.get('link', ''),
                        'thumbnail': item.get('thumbnail', ''),
                        'title': item.get('title', 'Untitled'),
                        'source': item.get('source', ''),
                        'score': min(98, max(60, int(item.get('position', 50) * -1 + 100))),
                        'tag': 'VISUAL',
                    })

        except Exception as e:
            # If one search type fails, continue with the other
            pass

    return all_matches


def run_swarm(vector_file_path):
    try:
        # 1. Load the target vector and image
        with open(vector_file_path, 'r') as f:
            data = json.load(f)

        if isinstance(data, dict):
            target_vector = data.get('vector', [])
            target_image_b64 = data.get('image', None)
            api_key = data.get('serpapi_key', '')
        else:
            target_vector = data
            target_image_b64 = None
            api_key = ''

        if not isinstance(target_vector, list) or len(target_vector) != 512:
            raise ValueError("Invalid vector format. Must be a 512D array.")

        if not api_key:
            raise ValueError("SerpAPI key is required for reverse image search.")

        matches = []

        if target_image_b64 and target_image_b64.startswith('data:image'):
            # Decode the base64 raw image
            b64_data = target_image_b64.split(',')[1]
            image_bytes = base64.b64decode(b64_data)

            # Upload the biometric evidence to a temporary public relay
            public_url = upload_to_catbox(image_bytes)

            if not public_url:
                raise ValueError("Failed to relay image for scanning. Try again.")

            # Execute REAL Reverse Image Search via Google Lens (SerpAPI)
            matches = serpapi_google_lens(public_url, api_key)

        print(json.dumps({
            "success": True,
            "matches": matches,
            "sites_scanned": len(matches),
        }))

    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))


if __name__ == "__main__":
    if len(sys.argv) > 1:
        run_swarm(sys.argv[1])
    else:
        print(json.dumps({"success": False, "error": "No target vector file provided"}))
