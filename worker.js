export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Teste da conexão com o banco D1
    if (url.pathname === "/api/test-db") {
      try {
        const result = await env.DB
          .prepare("SELECT 1 AS ok")
          .first();

        return Response.json({
          success: true,
          database: "painel-eleitoral-db",
          result
        });
      } catch (error) {
        return Response.json(
          {
            success: false,
            error: error.message
          },
          { status: 500 }
        );
      }
    }

    // Serve o site normalmente
    return env.ASSETS.fetch(request);
  }
};
