// AI classification service using OpenRouter Chat Completions API
// Reads API key from process.env.OPENROUTER_API_KEY

const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

function buildPrompt(categories) {
  const extra = [
    'garbage accumulation',
    'streetlight outage',
    'sewage leakage',
    'pothole',
    'broken sidewalk',
    'illegal dumping',
    'waterlogging',
    'traffic signage damage'
  ];
  const all = [...categories, ...extra];
  const labels = all.map(s => s).join(', ');
  return (
    'Answer with ONE WORD ONLY: the category label for this image. ' +
    'Choose exactly one from this list: ' + labels + '. ' +
    'Respond with just the chosen label, no punctuation or explanation.'
  );
}

async function classifyImage(imageUrl, categories = [
  'Bad road',
  'Bad water supply',
  'poor drainage system',
  'poor building construction',
]) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set');
  }

  const prompt = buildPrompt(categories);

  const body = {
    model: 'allenai/molmo-2-8b:free',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: imageUrl } }
        ]
      }
    ]
  };

  const res = await fetch(OPENROUTER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  return content || '';
}

// Map AI category to government official role
function mapCategoryToRole(category) {
  const normalized = (category || '').toLowerCase().trim();
  
  const roleMap = {
    'bad road': 'Road Engineer',
    'pothole': 'Road Engineer',
    'broken sidewalk': 'Road Engineer',
    'traffic signage damage': 'Road Engineer',
    
    'bad water supply': 'Water Department',
    'waterlogging': 'Water Department',
    
    'poor drainage system': 'Drainage Department',
    'sewage leakage': 'Drainage Department',
    
    'poor building construction': 'Building Inspector',
    
    'garbage accumulation': 'Sanitation Department',
    'illegal dumping': 'Sanitation Department',
    
    'streetlight outage': 'Electrical Department',
  };

  return roleMap[normalized] || 'General Municipal Officer';
}

module.exports = {
  classifyImage,
  mapCategoryToRole,
};
