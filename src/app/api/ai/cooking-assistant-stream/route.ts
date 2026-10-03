import { NextRequest } from 'next/server';
import { GeminiCookingService } from '../../../../../server/services/geminiCookingService.ts';
import { requireAuthUid } from '../../../../lib/api-helper.ts';

export async function POST(req: NextRequest) {
  try {
    await requireAuthUid(req);
    const body = await req.json();
    const { recipe, question, history, currentStepIndex, pantryItems, userPreferences } = body;
    if (!recipe || !question) {
      return new Response(JSON.stringify({ success: false, error: 'Recipe and question are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const encoder = new TextEncoder();
    const abortController = new AbortController();

    req.signal?.addEventListener('abort', () => {
      abortController.abort();
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of GeminiCookingService.chatCookingAssistantStream(
            { recipe, question, history, currentStepIndex, pantryItems, userPreferences },
            abortController.signal
          )) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          controller.close();
        } catch (streamErr: any) {
          controller.error(streamErr);
        }
      },
      cancel() {
        abortController.abort();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err?.message || 'Streaming failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
