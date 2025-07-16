async function explicarCodigo() {
    const codigo = document.getElementById('codigo').value;
    const resultado = document.getElementById('resultado');
  
    resultado.innerText = 'Procesando...';
  
    try {
      const res = await fetch('https://kiromentor-backend.onrender.com/explicar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ codigo })
      });
  
      const data = await res.json();
      resultado.innerText = data.explicacion || 'Sin respuesta';
    } catch (error) {
      resultado.innerText = 'Error al conectar con el servidor.';
      console.error(error);
    }
  }
  