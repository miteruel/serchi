import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  // Initialize Google Gen AI with server-side API key
  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  interface LiveSearchResult {
    title: string;
    url: string;
    displayUrl: string;
    snippet: string;
    suggestedLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'all';
    suggestedCategory: 'courses' | 'news' | 'projects' | 'tools' | 'literature' | 'media' | 'community';
  }

  /**
   * Real-time web search endpoint using Google Search Grounding with Gemini 3.8 Flash.
   * Discovers live links across the web related to Esperanto topics and events.
   */
  app.post('/api/live-search', async (req, res) => {
    const { query, language = 'eo', level } = req.body;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'Query is required' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Google Gemini API key not configured on server',
        results: []
      });
    }

    try {
      const prompt = `You are an expert Esperanto web indexer. Use Google Search grounding to discover active, real-world URLs, websites, articles, podcasts, or tools for Esperanto learners and speakers.
Target query: "${query}"
Optional level filter: "${level || 'any'}"

Please search Google for active, genuine web resources related to Esperanto matching this topic.
Format your answer as a JSON block (array of objects) with this exact schema:
[
  {
    "title": "Title of the website/resource",
    "url": "https://...",
    "displayUrl": "domain.com/path",
    "snippet": "Short descriptive summary of what this website provides in 1-2 sentences in ${language === 'es' ? 'Spanish' : language === 'en' ? 'English' : 'Esperanto'}",
    "suggestedLevel": "A1" | "A2" | "B1" | "B2" | "C1" | "all",
    "suggestedCategory": "courses" | "news" | "projects" | "tools" | "literature" | "media" | "community"
  }
]
Output ONLY valid JSON inside \`\`\`json ... \`\`\` or as raw JSON. Do not fabricate URLs; ensure they come from the real search grounding.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || '';
      
      // Also extract real Google Search grounding chunks
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const webSources: { title: string; url: string }[] = [];
      
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
          webSources.push({
            title: chunk.web.title,
            url: chunk.web.uri,
          });
        }
      });

      // Try to parse the JSON returned by the model
      let parsedResults: LiveSearchResult[] = [];
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const candidateJson = jsonMatch ? jsonMatch[1] : text;

      try {
        const parsed = JSON.parse(candidateJson);
        if (Array.isArray(parsed)) {
          parsedResults = parsed.map((item) => ({
            title: item.title || 'Esperanto Resource',
            url: item.url,
            displayUrl: item.displayUrl || (item.url ? new URL(item.url).hostname : 'esperanto.org'),
            snippet: item.snippet || '',
            suggestedLevel: item.suggestedLevel || 'all',
            suggestedCategory: item.suggestedCategory || 'projects',
          }));
        }
      } catch {
        // Fallback: build results from grounding chunks directly if JSON parse fails
        parsedResults = webSources.slice(0, 8).map((src) => {
          let domain = 'esperanto.org';
          try {
            domain = new URL(src.url).hostname;
          } catch {}

          return {
            title: src.title,
            url: src.url,
            displayUrl: domain,
            snippet: `Reta rimedo trovita per Google Search por "${query}".`,
            suggestedLevel: 'all',
            suggestedCategory: 'projects',
          };
        });
      }

      // Merge any unique grounding chunks that weren't in parsed results
      const existingUrls = new Set(parsedResults.map((r) => r.url.toLowerCase()));
      webSources.forEach((src) => {
        if (src.url && !existingUrls.has(src.url.toLowerCase())) {
          existingUrls.add(src.url.toLowerCase());
          let domain = 'esperanto.org';
          try {
            domain = new URL(src.url).hostname;
          } catch {}

          parsedResults.push({
            title: src.title,
            url: src.url,
            displayUrl: domain,
            snippet: `Aŭtentika retejo trovita per Google Search.`,
            suggestedLevel: 'all',
            suggestedCategory: 'projects',
          });
        }
      });

      return res.json({
        results: parsedResults.filter((r) => r.url && r.url.startsWith('http')),
        groundingCount: webSources.length,
      });
    } catch (error: any) {
      console.error('Error executing live Google search grounding:', error);
      return res.status(500).json({
        error: error.message || 'Error executing Google live search',
        results: [],
      });
    }
  });

  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
