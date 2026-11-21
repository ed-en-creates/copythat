// Which model made (or is meant to make) a prompt's result.
export function modelInfo(p) {
  const tools = p.target_tools || [];
  if (p.tested_model) {
    return { label: 'Made with', model: p.tested_model, tested: true, also: tools.filter((t) => !p.tested_model.toLowerCase().includes(t.toLowerCase())) };
  }
  return { label: 'Built for', model: tools[0] || 'Any model', tested: false, also: tools.slice(1) };
}
