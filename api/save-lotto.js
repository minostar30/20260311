const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return res.status(500).json({
      error: '환경변수가 설정되지 않았습니다. Vercel에서 SUPABASE_URL, SUPABASE_ANON_KEY를 설정해주세요.',
    });
  }

  const { main, bonus, source } = req.body;

  if (!main || !Array.isArray(main) || main.length !== 6 || typeof bonus !== 'number') {
    return res.status(400).json({ error: 'main(6개 배열), bonus(숫자)가 필요합니다.' });
  }

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from('lotto_recommendations')
    .insert({
      main_numbers: main.join(','),
      bonus_number: bonus,
      source: source || 'random',
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true, data });
}
