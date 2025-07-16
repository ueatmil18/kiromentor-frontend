async function explicarCodigo() {
  const codigo = document.getElementById('codigo').value.trim();
  const resultado = document.getElementById('resultado');

  if (!codigo) {
    resultado.innerText = "⚠️ Por favor, ingresá algún código.";
    return;
  }

  resultado.innerText = "⏳ Procesando...";

  try {
    const response = await fetch("https://kiromentor-backend.onrender.com/explicar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo })
    });

    if (!response.ok) {
      // Muestra el mensaje exacto según el código HTTP
      if (response.status === 405) {
        resultado.innerText = "❌ Error 405: Este endpoint solo acepta POST.";
      } else if (response.status === 500) {
        resultado.innerText = "❌ Error interno del servidor.";
      } else {
        resultado.innerText = `❌ Error ${response.status}: ${response.statusText}`;
      }
      return;
    }

    const data = await response.json();

    if (data.explicacion) {
      resultado.innerText = "✅ Explicación:\n" + data.explicacion;
    } else {
      resultado.innerText = "⚠️ No se recibió explicación válida.";
    }

  } catch (error) {
    resultado.innerText = "❌ No se pudo conectar al backend.";
    console.error("Error al conectar:", error);
  }
}
