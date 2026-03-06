import {NextRequest, NextResponse} from 'next/server';
import {exec} from 'child_process';
import {promisify} from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
    try {
        const {image} = await request.json();

        if (!image) {
            return NextResponse.json({error: 'No image provided'}, {status: 400});
        }

        // Path to our Python engine
        const scriptPath = path.join(process.cwd(), 'scripts', 'face_engine', 'engine.py');

        // In a real production setup, we would:
        // 1. Save the image to a temp file
        // 2. Call the python script: python3 engine.py temp_image.jpg
        // 3. Parse the JSON output

        // For this architecture demo, we'll call the engine script
        // and let it return its vectorized result.
        let stdout = '';
        try {
            const result = await execAsync(`python3 ${scriptPath} "mock_call"`);
            stdout = result.stdout;
        } catch (execError: any) {
            console.error('Python execution error:', execError.stderr || execError.message);
            return NextResponse.json({
                error: 'Face engine failed to start',
                details: execError.stderr || execError.message
            }, {status: 500});
        }

        const result = JSON.parse(stdout);

        if (!result.success) {
            return NextResponse.json({error: result.error}, {status: 500});
        }

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('Recognition error:', error);
        return NextResponse.json({error: 'Failed to process face vector'}, {status: 500});
    }
}
