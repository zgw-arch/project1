const SUPABASE_URL = "你的项目URL";
const SUPABASE_KEY = "你的anon密钥";
const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

export function getMessageList() {
  return sb
    .from('messages')
    .select('*')
    .order('create_time', { ascending: false })
}

export function addMessage(data) {
  return sb.from('messages').insert([data])
}

export function addVisitCount() {
  return sb.from('visit_count').select('*')
}
