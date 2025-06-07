import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import type { ExecutionContext } from '@cloudflare/workers-types';

export default {
  async fetch(request: Request, env: unknown, ctx: ExecutionContext): Promise<Response> {
    try {
      return await getAssetFromKV({ request, waitUntil: ctx.waitUntil });
    } catch (e) {
      // カスタム404.htmlにフォールバック
      const notFoundResponse = await getAssetFromKV({
        request: new Request('/404.html', request),
        waitUntil: ctx.waitUntil,
      });

      return new Response(await notFoundResponse.text(), {
        status: 404,
        headers: notFoundResponse.headers,
      });
    }
  }
};
