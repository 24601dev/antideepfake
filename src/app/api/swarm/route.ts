import {NextRequest, NextResponse} from 'next/server';
import {exec} from 'child_process';
import {promisify} from 'util';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
    let tempFilePath = '';
    try {
        const body = await request.json();

        // This vector was created initially by engine.py in the /api/recognize route
        const targetVector = body.targetVector;
        const targetImage = body.targetImage; // Passed by the dashboard for verification deepfakes

        if (!targetVector || !Array.isArray(targetVector)) {
            return NextResponse.json({error: 'Valid Target Vector required'}, {status: 400});
        }

        // We write the complex math vector and the image to a highly secure temporary file
        // instead of passing it down a process arguments pipe which could get truncated
        const tempId = crypto.randomUUID();
        tempFilePath = path.join(process.cwd(), '.next', `temp_vector_${tempId}.json`);

        await fs.writeFile(tempFilePath, JSON.stringify({
            vector: targetVector,
            image: targetImage,
            serpapi_key: process.env.SERPAPI_KEY || ''
        }));

        const scriptPath = path.join(process.cwd(), 'scripts', 'face_engine', 'swarm.py');

        let stdout = '';
        try {
            // Initiate the Biometric Swarm matching engine via CLI execution
            const result = await execAsync(`python3 ${scriptPath} "${tempFilePath}"`);
            stdout = result.stdout;
        } catch (execError: any) {
            console.error('Swarm execution error:', execError.stderr || execError.message);
            throw new Error('Swarm script failed.');
        }

        const resultJSON = JSON.parse(stdout);

        if (!resultJSON.success) {
            return NextResponse.json({error: resultJSON.error}, {status: 500});
        }

        return NextResponse.json(resultJSON);

    } catch (error: any) {
        console.error('Swarm API error:', error);
        return NextResponse.json({error: 'Failed to complete web scan'}, {status: 500});
    } finally {
        // ALWAYS scrub the mathematical hash from the server disk!
        // This is AegisLens' core guarantee: Zero Knowledge Storage.
        if (tempFilePath) {
            try {
                await fs.unlink(tempFilePath);
            } catch (cleanupError) {
                console.warn(`Failed to execute protocol 7 wipe on ${tempFilePath}`, cleanupError);
            }
        }
    }
}
