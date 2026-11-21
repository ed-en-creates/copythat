import { supabaseServer } from './supabase/server';

export { CATEGORY_LABELS } from './constants';

const FIELDS = 'id,slug,title,summary,category_slug,target_tools,tier,creator_name,license,preview_url,tested_model,tested_at,sort_order,published_at';

export async function listPrompts() {
  const sb = await supabaseServer();
  const { data, error } = await sb.from('prompts').select(FIELDS).eq('status', 'published').order('sort_order', { ascending: true });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function getPrompt(slug) {
  const sb = await supabaseServer();
  const { data } = await sb.from('prompts').select(FIELDS + ',body,preview_text').eq('slug', slug).eq('status', 'published').maybeSingle();
  if (!data) return null;
  let proBody = null;
  if (data.tier === 'pro') {
    const { data: pc } = await sb.from('prompt_pro_content').select('body').eq('prompt_id', data.id).maybeSingle();
    proBody = pc?.body ?? null;
  }
  return { ...data, proBody };
}
