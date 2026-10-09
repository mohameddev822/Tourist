import express from 'express';
import process from 'process';
import env from 'dotenv';
import cors from 'cors';

env.config();

const apiKey = process.env.API_KEY;
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const BASE = 'https://api.restcountries.com/countries/v5';

const LIST_FIELDS = 'names.common,codes.alpha_2,flag.emoji,flag.url_svg,region,subregion,capitals';

const ALLOWED_FILTERS = [
  'region', 'subregion', 'continents', 'capitals', 'borders',
  'languages', 'currencies', 'calling_codes', 'tlds',
  'cars.driving_side', 'units.measurement_system', 'units.temperature_scale', 'date.start_of_week',
  'landlocked', 'classification.sovereign', 'classification.dependency',
  'memberships.schengen', 'memberships.eu', 'memberships.eurozone', 'memberships.commonwealth',
  'memberships.nato', 'memberships.oecd', 'memberships.g7', 'memberships.g20', 'memberships.brics',
  'memberships.opec', 'memberships.african_union', 'memberships.asean', 'memberships.arab_league',
];

async function callApi(url, res) {
  try {
    const response = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(response.status).json({
        error: body?.errors?.[0]?.message || 'Upstream API error.',
      });
    }
    return res.json(body);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching country data.' });
  }
}


app.get('/express/countries', (req, res) => {
  const params = new URLSearchParams();

  const q = String(req.query.q ?? '').trim();
  if (q) params.set('q', q);

  for (const key of ALLOWED_FILTERS) {
    const value = req.query[key];
    if (typeof value === 'string' && value.trim()) params.set(key, value.trim());
  }

  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 24, 1), 100);
  const offset = Math.max(parseInt(req.query.offset, 10) || 0, 0);
  params.set('limit', String(limit));
  params.set('offset', String(offset));
  params.set('response_fields', LIST_FIELDS);

  return callApi(`${BASE}?${params.toString()}`, res);
});

app.get('/express/country/:code', (req, res) => {
  const { code } = req.params;
  if (!/^[a-z]{2}$/i.test(code)) {
    return res.status(400).json({ error: 'Invalid country code.' });
  }
  return callApi(`${BASE}/codes.alpha_2/${code}`, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));