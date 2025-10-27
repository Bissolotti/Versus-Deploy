import { serve } from "https://deno.land/x/sift@0.6.0/mod.ts";

// Função principal
serve(async (req) => {
  // ⚙️ CORS: permite todos os domínios (apenas para dev)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // Responde requisições OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return new Response(null, { headers, status: 204 });
  }

  try {
    const body = await req.json();
    const { question_id, choice } = body;

    // Aqui você faria a lógica real de salvar o voto no Supabase ou banco
    // Para exemplo, vamos retornar resultados fictícios
    const results = {
      A: choice === "A" ? 1 : 0,
      B: choice === "B" ? 1 : 0,
    };

    return new Response(JSON.stringify({ results }), {
      headers: { ...headers, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("Erro na função Vote:", err);
    return new Response(JSON.stringify({ error: "Erro ao processar voto" }), {
      headers: { ...headers, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
