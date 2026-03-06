import {NextRequest, NextResponse} from 'next/server';

async function uploadToCatbox(base64Data: string): Promise<string | null> {
    try {
        const buffer = Buffer.from(base64Data, 'base64');
        const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';

        // Construct multipart form-data body
        const header = `--${boundary}\r\nContent-Disposition: form-data; name="reqtype"\r\n\r\nfileupload\r\n--${boundary}\r\nContent-Disposition: form-data; name="fileToUpload"; filename="scan.jpg"\r\nContent-Type: image/jpeg\r\n\r\n`;
        const footer = `\r\n--${boundary}--\r\n`;

        const bodyParts = [
            Buffer.from(header, 'utf-8'),
            buffer,
            Buffer.from(footer, 'utf-8')
        ];

        const body = Buffer.concat(bodyParts);

        const response = await fetch('https://catbox.moe/user/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
                'User-Agent': 'Mozilla/5.0'
            },
            body: body
        });

        if (!response.ok) return null;
        return (await response.text()).trim();
    } catch (e) {
        console.error('Catbox upload error', e);
        return null;
    }
}

async function serpapiGoogleLens(publicUrl: string, apiKey: string) {
    const allMatches: any[] = [];
    const searchTypes = ['exact_matches', 'visual_matches'];

    for (const searchType of searchTypes) {
        try {
            const params = new URLSearchParams({
                engine: 'google_lens',
                url: publicUrl,
                hl: 'en',
                api_key: apiKey
            });

            const response = await fetch(`https://serpapi.com/search.json?${params.toString()}`, {
                headers: {'User-Agent': 'Mozilla/5.0'}
            });
            const data = await response.json();

            if (searchType === 'exact_matches' && data.exact_matches) {
                for (const item of data.exact_matches) {
                    allMatches.push({
                        url: item.link || '',
                        thumbnail: item.thumbnail || '',
                        title: item.title || 'Untitled',
                        source: item.source || '',
                        score: 99,
                        tag: 'EXACT'
                    });
                }
            }

            if (searchType === 'visual_matches' && data.visual_matches) {
                for (const item of data.visual_matches) {
                    allMatches.push({
                        url: item.link || '',
                        thumbnail: item.thumbnail || '',
                        title: item.title || 'Untitled',
                        source: item.source || '',
                        score: Math.min(98, Math.max(60, (item.position || 50) * -1 + 100)),
                        tag: 'VISUAL'
                    });
                }
            }
        } catch (e) {
            console.error(`Serpapi error for ${searchType}`, e);
        }
    }
    return allMatches;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const targetVector = body.targetVector;
        const targetImage = body.targetImage; // Passed by the dashboard for verification deepfakes

        if (!targetVector || !Array.isArray(targetVector)) {
            return NextResponse.json({error: 'Valid Target Vector required'}, {status: 400});
        }

        const apiKey = process.env.SERPAPI_KEY || '';
        if (!apiKey) {
            return NextResponse.json({error: 'SerpAPI key is required for reverse image search'}, {status: 500});
        }

        let matches: any[] = [];

        if (targetImage && targetImage.startsWith('data:image')) {
            const b64Data = targetImage.split(',')[1];
            const publicUrl = await uploadToCatbox(b64Data);

            if (!publicUrl) {
                return NextResponse.json({error: 'Failed to relay image for scanning. Try again.'}, {status: 500});
            }

            matches = await serpapiGoogleLens(publicUrl, apiKey);
        }

        return NextResponse.json({
            success: true,
            matches: matches,
            sites_scanned: matches.length
        });

    } catch (error: any) {
        console.error('Swarm API error:', error);
        return NextResponse.json({error: 'Failed to complete web scan'}, {status: 500});
    }
}
